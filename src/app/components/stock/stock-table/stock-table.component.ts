import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {Observable} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {ContextService} from "../../../services/context/context.service";
import {StockService} from "../../../services/stock/stock.service";
import {MatTableDataSource} from "@angular/material/table";
import {environment} from "../../../../environments/environment";
import {StockResponseDTO} from "../../../classes/response/stock-response-dto";
import {PageSpring} from "../../../classes/common/page-spring";
import {Pagination} from "../../../classes/common/pagination";
import {StockRequestDTO} from "../../../classes/request/stock-request-dto";
import {PageEvent} from "@angular/material/paginator";
import {OperationType} from "../../../classes/type/operation-type";

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent implements AfterViewInit {

  stockList!: MatTableDataSource<StockResponseDTO>;
  pagination: Pagination = new Pagination(environment.pagination.defaultPage, environment.pagination.defaultPageSize, 0);
  displayedColumns = [
    "select",
    "productType",
    "chassisNumber",
    "commercialSeries",
    "model",
    "itemCode",
  ];

  //Events
  @Output()
  onPaginationChange: EventEmitter<Pagination> = new EventEmitter<Pagination>();
  @Output()
  onExport: EventEmitter<void> = new EventEmitter<void>();

  constructor(private spinner: NgxSpinnerService,
              private router: Router,
              private contextService: ContextService,
              private stockService: StockService) {
  }

  ngAfterViewInit(): void {
    this.spinner.show();
    this.loadStockProducts(this.stockService.getStockByFilter(this.getStockRequestDTO()));
  }

  loadStockProducts(products: Observable<PageSpring>) {
    products.subscribe({
      next: (pageSpringResult: PageSpring) => {
        this.stockList = new MatTableDataSource<StockResponseDTO>(pageSpringResult.content);

        this.pagination.totalElements = pageSpringResult.totalElements;
        this.pagination.pageSize = pageSpringResult.size;
        this.pagination.page = pageSpringResult.number;
      },
      error: (error: any) => this.contextService.openGenericDialog('warning', 'exceptions.table-search-error', error),
      complete: () => this.spinner.hide()
    });
  }

  clear() {
    this.stockList = new MatTableDataSource<StockResponseDTO>();
    this.pagination = new Pagination(0, 10, 0);
  }

  isNoItemSelected() {
    return this.stockList?.data.length < 1 || this.stockList?.data.filter((prod) => prod.checked).length < 1;
  }

  exportStockReport() {
    this.spinner.show();
    this.onExport.emit();
  }

  registerInvoice() {
    const selectedProducts: StockResponseDTO[] = this.stockList?.data.filter(prod => prod.checked);
    this.redirectToInvoiceEntry(OperationType.SALE, selectedProducts);
  }

  transfer() {
    const selectedProducts: StockResponseDTO[] = this.stockList?.data.filter(prod => prod.checked);
    this.redirectToInvoiceEntry(OperationType.TRANSFER, selectedProducts);
  }

  redirectToInvoiceEntry(operationType: OperationType, selectedProducts: StockResponseDTO[]) {
    this.contextService.setOperationType(operationType);
    this.router.navigate(['invoice-entry'], {
      state: {
        selectedProducts: selectedProducts,
        operationType: operationType
      }
    });
  }

  getStockRequestDTO(): StockRequestDTO {
    let filter = new StockRequestDTO();

    let dealer = this.contextService.getDealer();
    filter.dealerCNPJ = dealer.cnpj;
    filter.page = this.pagination.page;
    filter.size = this.pagination.pageSize;

    return filter;
  }

  onPageChange(event: PageEvent) {
    this.pagination.page = event.pageIndex;
    this.pagination.pageSize = event.pageSize;
    this.onPaginationChange.emit(this.pagination);
  }

}

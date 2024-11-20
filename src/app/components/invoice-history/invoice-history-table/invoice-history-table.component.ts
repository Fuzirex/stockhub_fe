import {AfterViewInit, Component, EventEmitter, Host, Output} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {InvoiceHistoryResponseDTO} from "../../../classes/response/invoice-history-response-dto";
import {Pagination} from "../../../classes/common/pagination";
import {environment} from "../../../../environments/environment";
import {InvoiceHistoryComponent} from "../invoice-history.component";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {UtilsService} from "../../../services/utils/utils.service";
import {ContextService} from "../../../services/context/context.service";
import {InvoiceService} from "../../../services/invoice/invoice.service";
import {StockResponseDTO} from "../../../classes/response/stock-response-dto";
import {Observable} from "rxjs";
import {PageSpring} from "../../../classes/common/page-spring";
import {InvoiceHistoryRequestDTO} from "../../../classes/request/invoice-history-request-dto";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-invoice-history-table',
  templateUrl: './invoice-history-table.component.html',
  styleUrls: ['./invoice-history-table.component.scss']
})
export class InvoiceHistoryTableComponent implements AfterViewInit {

  invoiceList!: MatTableDataSource<InvoiceHistoryResponseDTO>;
  pagination: Pagination = new Pagination(environment.pagination.defaultPage, environment.pagination.defaultPageSize, 0);
  displayedColumns = [
    "select",
    "number",
    "operationTypeDescription",
    "productType",
    "chassisNumber",
    "commercialSeries",
    "model",
    "itemCode",
    "emissionDate"
  ];

  //Events
  @Output()
  onPaginationChange: EventEmitter<Pagination> = new EventEmitter<Pagination>();
  @Output()
  onExport: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(@Host() private invoiceHistoryComponent: InvoiceHistoryComponent,
              private spinner: NgxSpinnerService,
              private router: Router,
              private utilsService: UtilsService,
              private contextService: ContextService,
              private invoiceService: InvoiceService) {
  }

  ngAfterViewInit(): void {
    this.spinner.show();
    this.loadInvoiceHistory(this.invoiceService.getInvoiceHistory(this.createInvoiceHistoryRequest()));
  }

  exportInvoiceHistoryReport() {
    this.spinner.show();
    this.onExport.emit();
  }

  returnInvoice() {
    const invoices = this.invoiceList?.data.filter(inv => inv.checked);

    if (invoices && invoices.length > 0) {

      let prods: StockResponseDTO[] = [];

      invoices.forEach(inv => {
        let p = new StockResponseDTO();

        p.productType = inv.productType;
        p.model = inv.model;
        p.itemCode = inv.itemCode;
        p.commercialSeries = inv.commercialSeries;
        p.chassisNumber = inv.chassisNumber;

        prods.push(p);
      });

      this.contextService.setOperationType('4');
      this.router.navigate(['invoiceentry'], {
        state: {
          selectedProducts: prods,
          operationType: 4
        }
      });
    }
  }

  clear() {
    this.invoiceList = new MatTableDataSource<InvoiceHistoryResponseDTO>();
    this.pagination = new Pagination(0, 10, 0);
  }

  loadInvoiceHistory(invoices: Observable<PageSpring>) {
    invoices.subscribe({
      next: (pageSpringResult: PageSpring) => {
        this.invoiceList = new MatTableDataSource<InvoiceHistoryResponseDTO>(pageSpringResult.content);

        this.pagination.totalElements = pageSpringResult.totalElements;
        this.pagination.pageSize = pageSpringResult.size;
        this.pagination.page = pageSpringResult.number;
      },
      error: (error: any) => this.contextService.openGenericDialog('warning', 'exceptions.table-search-error', error),
      complete: () => this.spinner.hide()
    });
  }

  createInvoiceHistoryRequest(): InvoiceHistoryRequestDTO {
    let request: InvoiceHistoryRequestDTO = new InvoiceHistoryRequestDTO();

    request.dealerCNPJ = this.contextService.getDealer().cnpj;
    request.emissionPeriod = this.utilsService.getEmissionPeriodDate(this.utilsService.getPeriods()[2]);

    request.page = this.pagination.page;
    request.size = this.pagination.pageSize;

    return request;
  }

  disableReturnBtn(): boolean {
    return this.invoiceList?.data.length < 1 ||
      this.invoiceList?.data.filter((inv) => inv.checked).length < 1 ||
      this.invoiceList?.data.filter((inv) => inv.checked && inv.operationType != 1).length > 0;
  }

  onPageChange(event: PageEvent) {
    this.pagination.page = event.pageIndex;
    this.pagination.pageSize = event.pageSize;
    this.onPaginationChange.emit(this.pagination);
  }

}
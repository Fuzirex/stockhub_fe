import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {StockService} from "../../../services/stock/stock.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ContextService} from "../../../services/context/context.service";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {PageSpring} from "../../../classes/common/page-spring";
import {environment} from "../../../../environments/environment";
import {StockRequestDTO} from "../../../classes/request/stock-request-dto";
import {ProductTypeResponseDTO} from "../../../classes/response/product-type-response-dto";
import {ProductTypeService} from "../../../services/product-type/product-type.service";

@Component({
  selector: 'app-stock-filter',
  templateUrl: './stock-filter.component.html',
  styleUrls: ['./stock-filter.component.scss']
})
export class StockFilterComponent implements OnInit {

  formGroup!: UntypedFormGroup;

  //Lists
  productTypeList!: Array<ProductTypeResponseDTO>;

  //Events
  @Output()
  onSearch: EventEmitter<Observable<PageSpring>> = new EventEmitter<Observable<PageSpring>>();
  @Output()
  onClear: EventEmitter<void> = new EventEmitter<void>();

  constructor(private productTypeService: ProductTypeService,
              private stockService: StockService,
              private spinner: NgxSpinnerService,
              //private reportService: ReportService,
              private contextService: ContextService,
              private formBuilder: UntypedFormBuilder) {
    this.loadProductTypes();
  }

  ngOnInit(): void {
    this.loadFormGroup();
  }

  loadFormGroup() {
    this.formGroup = this.formBuilder.group({
      chassisNumber: [{value: ''}],
      commercialSeries: [{value: ''}],
      productModel: [{value: ''}],
      itemCode: [{value: ''}],
      productType: [{value: ''}],
      negotiatedStatus: [{value: ''}],
    });

    this.formGroup.reset();
  }

  clear() {
    this.formGroup.reset();
    this.onClear.emit();
  }

  search(page?: number, pageSize?: number) {
    this.spinner.show();
    this.onSearch.emit(this.stockService.getStockByFilter(this.getStockRequest(page, pageSize)));
  }

  exportStockReport() {
    //this.reportService.exportStockReport(this.getStockReportRequest());
    this.spinner.hide();
  }

  loadProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe({
      next: (result: ProductTypeResponseDTO[]) => this.productTypeList = result,
      error: (error: any) => this.contextService.openGenericDialog('warning', 'exceptions.load-data-error', error),
      complete: () => this.spinner.hide()
    });
  }

  getStockRequest(page?: number, pageSize?: number): StockRequestDTO {
    let filter = new StockRequestDTO();

    filter.dealerCNPJ = this.contextService.getDealer().cnpj;
    filter.chassisNumber = this.formGroup.get('chassisNumber')?.value;
    filter.commercialSeries = this.formGroup.get('commercialSeries')?.value;
    filter.model = this.formGroup.get('productModel')?.value;
    filter.itemCode = this.formGroup.get('itemCode')?.value;
    filter.productType = this.formGroup.get('productType')?.value;

    filter.page = page ? page : environment.pagination.defaultPage;
    filter.size = pageSize ? pageSize : environment.pagination.defaultPageSize;

    return filter;
  }

  /*getStockReportRequest(): StockReportRequest {
    let filter = new StockReportRequest();

    filter.dealerCNPJ = this.contextService.getDealer().cnpj;
    filter.chassisNumber = this.formGroup.get('chassisNumber')?.value;
    filter.commercialSeries = this.formGroup.get('commercialSeries')?.value;
    filter.productModel = this.formGroup.get('productModel')?.value;
    filter.itemCode = this.formGroup.get('itemCode')?.value;
    filter.productType = this.formGroup.get('productType')?.value;

    return filter;
  }*/

}

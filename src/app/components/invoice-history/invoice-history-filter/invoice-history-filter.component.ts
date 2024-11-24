import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {forkJoin, Observable} from "rxjs";
import {PageSpring} from "../../../classes/common/page-spring";
import {ProductTypeService} from "../../../services/product-type/product-type.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ContextService} from "../../../services/context/context.service";
import {environment} from "../../../../environments/environment";
import {Period} from "../../../classes/common/period";
import {UtilsService} from "../../../services/utils/utils.service";
import {ProductTypeResponseDTO} from "../../../classes/response/product-type-response-dto";
import {InvoiceService} from "../../../services/invoice/invoice.service";
import {InvoiceOperationTypeResponseDTO} from "../../../classes/response/invoice-operation-type-response-dto";
import {InvoiceHistoryRequestDTO} from "../../../classes/request/invoice-history-request-dto";
import {ReportService} from "../../../services/report/report.service";
import {ReportInvoiceHistoryRequestDTO} from "../../../classes/request/report-invoice-history-request-dto";

@Component({
  selector: 'app-invoice-history-filter',
  templateUrl: './invoice-history-filter.component.html',
  styleUrls: ['./invoice-history-filter.component.scss']
})
export class InvoiceHistoryFilterComponent implements OnInit {

  formGroup!: UntypedFormGroup;

  //Lists
  operationTypeList!: InvoiceOperationTypeResponseDTO[];
  emissionPeriodList!: Period[];
  productTypeList!: ProductTypeResponseDTO[];

  //Events
  @Output()
  onSearch: EventEmitter<Observable<PageSpring>> = new EventEmitter<Observable<PageSpring>>();
  @Output()
  onClear: EventEmitter<void> = new EventEmitter<void>();


  constructor(private utilsService: UtilsService,
              private productTypeService: ProductTypeService,
              private invoiceService: InvoiceService,
              private spinner: NgxSpinnerService,
              private reportService: ReportService,
              private contextService: ContextService,
              private formBuilder: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    this.loadFormGroup();
    this.loadAdditionalValues();
  }

  loadFormGroup() {
    this.formGroup = this.formBuilder.group({
      chassisNumber: [{value: ''}],
      commercialSeries: [{value: ''}],
      productModel: [{value: ''}],
      itemCode: [{value: ''}],
      productType: [{value: ''}],
      emissionPeriod: [{value: ''}, Validators.required],
      operationType: [{value: ''}],
      invoiceNumber: [{value: ''}]
    });

    this.formGroup.reset();
  }

  loadAdditionalValues() {
    this.emissionPeriodList = this.utilsService.getPeriods();

    this.spinner.show();
    forkJoin({
      getProductTypeReq: this.productTypeService.getAllProductTypes(),
      getInvoiceOperationsReq: this.invoiceService.getInvoiceOperations()
    }).subscribe({
      next: (result: any) => {
        this.productTypeList = result.getProductTypeReq;
        this.operationTypeList = result.getInvoiceOperationsReq;
      },
      error: (error: any) => this.contextService.openGenericDialog('warning', 'exceptions.load-data-error', error),
      complete: () => this.spinner.hide()
    });

    //Default Values
    this.formGroup.get('emissionPeriod')?.setValue(this.emissionPeriodList[2]);
  }

  clear() {
    this.formGroup.reset();
    this.formGroup.get('emissionPeriod')?.setValue(this.emissionPeriodList[2]);
    this.onClear.emit();
  }

  search(page?: number, pageSize?: number) {
    this.spinner.show();
    this.onSearch.emit(this.invoiceService.getInvoiceHistory(this.createInvoiceHistoryRequest(page, pageSize)));
  }

  exportInvoiceHistoryReport() {
    this.reportService.exportInvoiceHistoryReport(this.getInvoiceHistoryReportRequest());
  }

  createInvoiceHistoryRequest(page?: number, pageSize?: number): InvoiceHistoryRequestDTO {
    let request: InvoiceHistoryRequestDTO = new InvoiceHistoryRequestDTO();

    request.dealerCNPJ = this.contextService.getDealer().cnpj;
    request.invoiceNumber = this.formGroup.get('invoiceNumber')?.value;
    request.chassisNumber = this.formGroup.get('chassisNumber')?.value;
    request.commercialSeries = this.formGroup.get('commercialSeries')?.value;
    request.productModel = this.formGroup.get('productModel')?.value;
    request.itemCode = this.formGroup.get('itemCode')?.value;
    request.operationType = this.formGroup.get('operationType')?.value;
    request.productType = this.formGroup.get('productType')?.value;
    request.emissionPeriod = this.utilsService.getEmissionPeriodDate((this.formGroup.get('emissionPeriod')?.value as Period));

    request.page = page ? page : environment.pagination.defaultPage;
    request.size = pageSize ? pageSize : environment.pagination.defaultPageSize;

    return request;
  }

  getInvoiceHistoryReportRequest(): ReportInvoiceHistoryRequestDTO {
    let filter = new ReportInvoiceHistoryRequestDTO();

    filter.dealerCNPJ = this.contextService.getDealer().cnpj;
    filter.invoiceNumber = this.formGroup.get('invoiceNumber')?.value;
    filter.chassisNumber = this.formGroup.get('chassisNumber')?.value;
    filter.commercialSeries = this.formGroup.get('commercialSeries')?.value;
    filter.productModel = this.formGroup.get('productModel')?.value;
    filter.itemCode = this.formGroup.get('itemCode')?.value;
    filter.operationType = this.formGroup.get('operationType')?.value;
    filter.productType = this.formGroup.get('productType')?.value;
    filter.emissionPeriod = this.utilsService.getEmissionPeriodDate((this.formGroup.get('emissionPeriod')?.value as Period));

    return filter;
  }

}

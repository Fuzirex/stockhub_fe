import {Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {DealerResponseDTO} from "../../classes/response/dealer-response-dto";
import {UtilsService} from "../../services/utils/utils.service";
import {InvoiceService} from "../../services/invoice/invoice.service";
import {ContextService} from "../../services/context/context.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Observable} from "rxjs";
import {CurrencyType} from "../../classes/type/currency-type";
import {DocumentType} from "../../classes/type/document-type";
import {LocationService} from "../../services/location/location.service";
import {LocationResponseDTO} from "../../classes/response/location-response-dto";
import {Router} from "@angular/router";
import {StockResponseDTO} from "../../classes/response/stock-response-dto";
import {OperationType} from "../../classes/type/operation-type";
import {CustomValidators} from "../../classes/validators/custom-validators";
import {InvoiceEntryProductTableComponent} from "./invoice-entry-product-table/invoice-entry-product-table.component";
import {DealerService} from "../../services/dealer/dealer.service";

@Component({
  selector: 'app-invoice-entry',
  templateUrl: './invoice-entry.component.html',
  styleUrls: ['./invoice-entry.component.scss']
})
export class InvoiceEntryComponent implements OnInit {

  @ViewChild(InvoiceEntryProductTableComponent)
  invoiceEntryProductTableComponent!: InvoiceEntryProductTableComponent;

  formGroup!: UntypedFormGroup;
  operationType!: OperationType;
  selectedProducts!: StockResponseDTO[];

  dealerListToTransfer!: DealerResponseDTO[];
  countryList!: LocationResponseDTO[];
  regionList!: LocationResponseDTO[];
  cityList!: LocationResponseDTO[];

  constructor(private formBuilder: UntypedFormBuilder,
              private spinner: NgxSpinnerService,
              private locationService: LocationService,
              private contextService: ContextService,
              private invoiceService: InvoiceService,
              private utilsService: UtilsService,
              private router: Router,
              private dealerService: DealerService) {
    this.loadValuesFromRedirect();
  }

  ngOnInit(): void {
    this.loadFormGroup();
    this.loadCountries();
    this.loadDealersToTransfer();
  }

  loadValuesFromRedirect() {
    let operation: OperationType = this.router.getCurrentNavigation()?.extras?.state?.['operationType'];
    let prods: StockResponseDTO[] = this.router.getCurrentNavigation()?.extras?.state?.['selectedProducts'];

    if (operation)
      this.operationType = operation;
    else
      this.operationType = OperationType.SALE;

    if (prods)
      this.selectedProducts = prods;
  }

  loadFormGroup() {
    const isSales = this.isOperationTypeSales();

    this.formGroup = this.formBuilder.group({
      // Invoice
      invoiceNumber: [{value: ''}, Validators.required],
      invoiceSeries: [{value: ''}, Validators.required],
      emissionDate: [{value: ''}, Validators.required],
      currencyType: [{value: ''}],
      invoiceValue: [{value: ''}, Validators.required],

      // Customer
      documentType: [{value: ''}, (isSales ? Validators.required : null)],
      legalNumber: [{value: ''}, (isSales ? Validators.required : null)],
      customerName: [{value: ''}, (isSales ? Validators.required : null)],
      country: [{value: ''}, (isSales ? Validators.required : null)],
      region: [{value: ''}, (isSales ? Validators.required : null)],
      city: [{value: ''}, (isSales ? Validators.required : null)],
      address: [{value: ''}],
      complement: [{value: ''}],

      // Transfer
      dealerToTransfer: [{value: ''}, this.isOperationTypeTransfer() ? [Validators.required] : null],
    });

    this.clearForm();
  }

  clearForm() {
    this.formGroup.reset();
    this.formGroup.get('legalNumber')?.disable();
    this.formGroup.get('invoiceValue')?.disable();
    this.formGroup.get('region')?.disable();
    this.formGroup.get('city')?.disable();

    this.regionList = [];
    this.cityList = [];
  }

  getCurrencyTypes() {
    return [CurrencyType.BRL, CurrencyType.USD, CurrencyType.EUR, CurrencyType.ARS];
  }

  getDocumentTypes() {
    return [DocumentType.CPF, DocumentType.CNPJ];
  }

  isOperationTypeSales(): boolean {
    return this.operationType === OperationType.SALE;
  }

  isOperationTypeReturn(): boolean {
    return this.operationType === OperationType.RETURN;
  }

  isOperationTypeTransfer(): boolean {
    return this.operationType === OperationType.TRANSFER;
  }

  sendInvoice() {
    if (this.formGroup.valid) {
      alert('To be done...');
      /*this.spinner.show();

      this.invoiceService.sendInvoiceEntry(this.createInvoiceEntry()).subscribe({
        next: (result: any) => {
          this.contextService.openGenericDialog('warning', 'successful-operation')
            ?.afterClosed().subscribe(exitParams => {
            this.invoiceEntryComponent.goBackLastPage();
          });
        },
        error: (error: any) => this.contextService.openGenericDialog('warning', 'exceptions.failed-operation', error),
        complete: () => this.spinner.hide()
      });*/
    } else {
      this.formGroup.markAllAsTouched();
      this.contextService.openGenericDialog('warning', 'exceptions.mandatory-fields-not-fulfilled');
    }
  }

  /*private createInvoiceEntry(): InvoiceEntryRequest {
    var invoiceEntry = new InvoiceEntryRequest();
    invoiceEntry.invoiceNumber = this.formGroup.get("invoiceNumber")?.value;
    invoiceEntry.emissionDate = this.formGroup.get("emissionDate")?.value;
    invoiceEntry.invoiceValue = this.formGroup.get("invoiceValue")?.value;
    invoiceEntry.currencyType = this.formGroup.get("currencyType")?.value;

    if (this.isOperationTypeSales()) {
      invoiceEntry.customerDocumentType = this.formGroup.get("documentType")?.value;
      invoiceEntry.customerLegalNumber = this.formGroup.get("legalNumber")?.value;
      invoiceEntry.customerName = this.formGroup.get("customerName")?.value;
      invoiceEntry.customerCountry = this.formGroup.get("country")?.value;
      invoiceEntry.customerRegion = this.formGroup.get("region")?.value;
      invoiceEntry.customerCity = this.formGroup.get("city")?.value;
      invoiceEntry.customerAddressName = this.formGroup.get("addressName")?.value;
      invoiceEntry.customerAddressDescription = this.formGroup.get("addressDescription")?.value;
    }

    if (this.isOperationTypeTransfer())
      invoiceEntry.dealerToTransfer = this.formGroup.get("dealerToTransfer")?.value;

    invoiceEntry.operationType = this.invoiceEntryComponent.operationType;
    invoiceEntry.products = this.invoiceEntryComponent.createInvoiceEntryStock();
    invoiceEntry.dealerCode = this.contextService.getCurrentDealer().dealerNumber;

    return invoiceEntry;
  }*/

  onCountryChange() {
    let country = this.formGroup.get("country")?.value;

    if (country) {
      this.formGroup.get("region")?.enable();
      this.loadRegions(this.locationService.getStates());
    } else {
      this.formGroup.get("region")?.disable();
      this.formGroup.get("city")?.disable();
      this.regionList = [];
    }

    this.cityList = [];
    this.formGroup.get("region")?.reset();
    this.formGroup.get("city")?.reset();
  }

  onRegionChange() {
    let region = this.formGroup.get("region")?.value;

    if (region) {
      this.formGroup.get("city")?.enable();
      this.loadCities(this.locationService.getCitiesByState(region));
    } else {
      this.formGroup.get("city")?.disable();
      this.cityList = [];
    }

    this.formGroup.get("city")?.reset();
  }

  onDocumentTypeChange() {
    let docType: DocumentType = this.formGroup.get('documentType')?.value;

    this.formGroup.get('legalNumber')?.reset();

    if (docType) {
      this.formGroup.get('legalNumber')?.enable();

      if (docType == DocumentType.CPF)
        this.formGroup.get('legalNumber')?.setValidators([Validators.required, CustomValidators.cpfValidator]);
      else
        this.formGroup.get('legalNumber')?.setValidators([Validators.required, CustomValidators.cnpjValidator]);
    } else
      this.formGroup.get('legalNumber')?.disable();
  }

  onCurrencyTypeChange() {
    let currencyType: DocumentType = this.formGroup.get('currencyType')?.value;

    if (currencyType) {
      this.formGroup.get('invoiceValue')?.enable();
    } else {
      this.formGroup.get('invoiceValue')?.reset();
      this.formGroup.get('invoiceValue')?.disable();
    }
  }

  loadRegions(response: Observable<LocationResponseDTO[]>) {
    this.spinner.show();

    response.subscribe({
      next: (result: LocationResponseDTO[]) => this.regionList = result,
      error: (error: any) => this.contextService.openGenericDialog('warning', 'exceptions.load-data-error', error),
      complete: () => this.spinner.hide()
    });
  }

  loadCities(response: Observable<LocationResponseDTO[]>) {
    this.spinner.show();

    response.subscribe({
      next: (result: LocationResponseDTO[]) => this.cityList = result,
      error: (error: any) => this.contextService.openGenericDialog('warning', 'exceptions.load-data-error', error),
      complete: () => this.spinner.hide()
    });
  }

  loadDealersToTransfer() {
    if (this.isOperationTypeTransfer()) {
      this.spinner.show();
      this.dealerService.getDealersToTransfer().subscribe({
        next: (result: DealerResponseDTO[]) => {
          let currentDealer = this.contextService.getDealer();
          this.dealerListToTransfer = result.filter(d => d.cnpj != currentDealer.cnpj);
        },
        error: (error: any) => this.contextService.openGenericDialog('warning', 'exceptions.load-data-error', error),
        complete: () => this.spinner.hide()
      });
    }
  }

  loadCountries() {
    if (this.isOperationTypeSales()) {
      this.spinner.show();
      this.locationService.getCountries().subscribe({
        next: (result: LocationResponseDTO[]) => this.countryList = result,
        error: (error: any) => this.contextService.openGenericDialog('warning', 'exceptions.load-data-error', error),
        complete: () => this.spinner.hide()
      });
    }
  }

  getLegalNumberMask() {
    let docType = this.formGroup.get('documentType')?.value;
    return this.utilsService.getLegalNumberMask(docType);
  }

  goBackLastPage() {
    if (this.isOperationTypeReturn())
      this.router.navigateByUrl('invoice-history');
    else
      this.router.navigateByUrl('stock');
  }

}

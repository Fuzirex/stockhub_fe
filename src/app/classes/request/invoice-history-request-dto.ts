export class InvoiceHistoryRequestDTO {

  dealerCNPJ!: string;
  invoiceNumber!: string;
  operationType!: number;
  emissionPeriod!: Date;

  productType!: string;
  productModel!: string;
  itemCode!: string;
  commercialSeries!: string;
  chassisNumber!: string;

  page!: number;
  size!: number;
}

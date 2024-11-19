import {ProductTypeResponseDTO} from "./product-type-response-dto";

export class InvoiceHistoryResponseDTO {

  dealerCNPJ!: string;
  invoiceNumber!: string;
  invoiceSeries!: string;
  operationType!: number;
  operationTypeDescription!: string;
  emissionDate!: Date;

  productType!: ProductTypeResponseDTO;
  model!: string;
  itemCode!: string;
  commercialSeries!: string;
  chassisNumber!: string;

  checked!: boolean;

}

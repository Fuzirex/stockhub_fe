import {ProductTypeResponseDTO} from "./product-type-response-dto";
import {OperationType} from "../type/operation-type";

export class InvoiceHistoryResponseDTO {

  dealerCNPJ!: string;
  invoiceNumber!: string;
  invoiceSeries!: string;
  operationType!: OperationType;
  operationTypeDescription!: string;
  emissionDate!: Date;

  productType!: ProductTypeResponseDTO;
  model!: string;
  itemCode!: string;
  commercialSeries!: string;
  chassisNumber!: string;

  checked!: boolean;

}

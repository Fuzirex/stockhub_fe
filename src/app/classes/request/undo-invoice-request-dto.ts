import {OperationType} from "../type/operation-type";

export class UndoInvoiceRequestDTO {

  dealerCNPJ!: string;
  invoiceNumber!: string;
  invoiceSeries!: string;
  operationType!: OperationType;
  chassisNumber!: string;

}

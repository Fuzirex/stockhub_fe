import {CurrencyType} from "../type/currency-type";
import {DocumentType} from "../type/document-type";
import {InvoiceEntryStockRequestDTO} from "./invoice-entry-stock-request-dto";
import {OperationType} from "../type/operation-type";

export class InvoiceEntryRequestDTO {

  invoiceNumber!: string;
  invoiceSeries!: string;
  emissionDate!: Date;
  invoiceValue!: number;
  currencyType!: CurrencyType;

  customerDocumentType!: DocumentType;
  customerLegalNumber!: string;
  customerName!: string;
  customerCountry!: number;
  customerState!: number;
  customerCity!: number;
  customerAddress!: string;
  customerComplement!: string;

  operationType!: OperationType;

  dealerCNPJ!: string;
  dealerToTransfer!: string;

  products!: InvoiceEntryStockRequestDTO[];

}

import {ProductTypeResponseDTO} from "./product-type-response-dto";

export class StockResponseDTO {

  chassisNumber!: string;
  model!: string;
  commercialSeries!: string;
  itemCode!: string;
  dealerCNPJ!: string;
  status!: number;
  productType!: ProductTypeResponseDTO;

  checked!: boolean;

}

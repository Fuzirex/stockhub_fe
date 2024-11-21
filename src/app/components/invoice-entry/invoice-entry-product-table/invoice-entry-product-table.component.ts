import {Component, Input} from '@angular/core';
import {StockResponseDTO} from "../../../classes/response/stock-response-dto";

@Component({
  selector: 'app-invoice-entry-product-table',
  templateUrl: './invoice-entry-product-table.component.html',
  styleUrls: ['./invoice-entry-product-table.component.scss']
})
export class InvoiceEntryProductTableComponent {

  @Input() selectedProducts: StockResponseDTO[] = [];

  displayedColumns = [
    "productType",
    "chassisNumber",
    "commercialSeries",
    "model",
    "itemCode"
  ];

}

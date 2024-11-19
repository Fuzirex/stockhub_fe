import {Component, ViewChild} from '@angular/core';
import {InvoiceHistoryTableComponent} from "./invoice-history-table/invoice-history-table.component";
import {InvoiceHistoryFilterComponent} from "./invoice-history-filter/invoice-history-filter.component";

@Component({
  selector: 'app-invoice-history',
  templateUrl: './invoice-history.component.html',
  styleUrls: ['./invoice-history.component.scss']
})
export class InvoiceHistoryComponent {

  @ViewChild(InvoiceHistoryTableComponent)
  invoiceHistoryTableComponent!: InvoiceHistoryTableComponent;

  @ViewChild(InvoiceHistoryFilterComponent)
  invoiceHistoryFilterComponent!: InvoiceHistoryFilterComponent;

  doFilterSearch() {
    this.invoiceHistoryFilterComponent.search();
  }

}

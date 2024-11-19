import {Component, OnInit, ViewChild} from '@angular/core';
import {StockTableComponent} from "./stock-table/stock-table.component";
import {StockFilterComponent} from "./stock-filter/stock-filter.component";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  @ViewChild(StockTableComponent)
  stockTableComponent!: StockTableComponent;

  @ViewChild(StockFilterComponent)
  stockFilterComponent!: StockFilterComponent;

  constructor() {
  }

  ngOnInit(): void {
  }
}

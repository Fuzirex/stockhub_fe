import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {StockComponent} from "./components/stock/stock.component";
import {InvoiceHistoryComponent} from "./components/invoice-history/invoice-history.component";
import {InvoiceEntryComponent} from "./components/invoice-entry/invoice-entry.component";

const routes: Routes = [
  {path: 'stock', component: StockComponent},
  {path: 'invoice-history', component: InvoiceHistoryComponent},
  {path: 'invoice-entry', component: InvoiceEntryComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

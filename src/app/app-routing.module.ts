import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {StockComponent} from "./components/stock/stock.component";
import {InvoiceHistoryComponent} from "./components/invoice-history/invoice-history.component";

const routes: Routes = [
  {path: 'stock', component: StockComponent},
  {path: 'invoice-history', component: InvoiceHistoryComponent},
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

import {Component} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {Navbar} from "./classes/navbar/navbar";
import {ContextService} from "./services/context/context.service";
import {OperationType} from "./classes/type/operation-type";
import {SideNavToggle} from "./classes/common/side-nav-toggle";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title: string = 'project-title';
  menus: Navbar[] = [];

  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(private router: Router,
              private contextService: ContextService) {
    this.loadHeaderTitle();
  }

  loadHeaderTitle() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd | any) => {
      switch (event.url) {
        case '/login':
          this.title = 'headers.login';
          break;

        case '/stock':
          this.title = 'headers.stock';
          break;

        case '/invoice-history':
          this.title = 'headers.invoice-history';
          break;

        case '/invoice-entry':
          let operationType: OperationType = this.contextService.getOperationType();

          if (operationType == OperationType.TRANSFER)
            this.title = 'headers.invoice-entry-transfer';
          else if (operationType == OperationType.RETURN)
            this.title = 'headers.invoice-entry-return';
          else
            this.title = 'headers.invoice-entry-sale';
          break;
      }

      this.loadAvailableMenus();
    });
  }

  loadAvailableMenus() {
    if (this.contextService.getToken()) {
      this.menus = [
        {
          routeLink: 'stock',
          icon: 'bi bi-boxes',
          label: 'headers.stock',
          items: []
        },
        {
          routeLink: 'invoice-history',
          icon: 'bi bi-receipt-cutoff',
          label: 'headers.invoice-history',
          items: []
        },
        {
          routeLink: 'logout',
          icon: 'bi bi-door-open',
          label: 'logout',
          items: []
        }
      ];
    } else {
      this.menus = [
        {
          routeLink: 'login',
          icon: 'bi bi-key',
          label: 'login',
          items: []
        }
      ];
    }
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  getBodyClass() : string {
    return (this.isSideNavCollapsed && this.screenWidth > 768) ? 'body-trimmed' : 'body-md-screen';
  }

}

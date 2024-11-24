import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Navbar} from "../../classes/navbar/navbar";
import {fade} from "../animations/fade";
import {ContextService} from "../../services/context/context.service";
import {CurrencyType} from "../../classes/type/currency-type";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [fade]
})
export class NavbarComponent implements OnInit {
  @Input() navData: Navbar[] = [];

  collapsed = false;
  screenWidth = 0;
  multiple = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768)
      this.collapsed = false;
  }

  constructor(public router: Router,
              private contextService: ContextService) {
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  closeSidenav(): void {
    this.collapsed = false;
  }

  handleClick(item: Navbar): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  getActiveClass(data: Navbar): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: Navbar): void {
    if (!this.multiple) {
      for (const modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }

  onNavigate(data: Navbar) {
    this.shrinkItems(data);

    if (data.routeLink == 'logout')
      this.logout();
    else {
      this.router.navigateByUrl(`${data.routeLink}`);
      if (this.collapsed && !this.multiple) this.closeSidenav();
    }
  }

  logout() {
    this.contextService.openConfirmationModal('warning', 'confirmations.logout-confirm')
      ?.afterClosed().subscribe(exitParams => {
      if (exitParams['accepted']) {
        this.contextService.clearUserAuthentication();
        this.router.navigateByUrl('login');
      }
    });
  }

  changeTranslation(lang: string) {
    this.contextService.configureLanguage(lang);
  }

}

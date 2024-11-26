import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Navbar} from "../../classes/navbar/navbar";
import {fade} from "../animations/fade";
import {ContextService} from "../../services/context/context.service";
import {SideNavToggle} from "../../classes/common/side-nav-toggle";

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

  @Output()
  onToggleSideNavEvent: EventEmitter<SideNavToggle> = new EventEmitter<SideNavToggle>();

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNavEvent.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth
      });
    }
  }

  constructor(public router: Router,
              private contextService: ContextService) {
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNavEvent.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth
    });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNavEvent.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth
    });
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

  onToggleSideNav(data: SideNavToggle): void {
    this.onToggleSideNavEvent.emit(data);
  }

}

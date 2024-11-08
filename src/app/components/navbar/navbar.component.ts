import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Navbar} from "../../classes/navbar/navbar";
import {fade} from "../animations/fade";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [fade]
})
export class NavbarComponent  implements OnInit {
  navData: Navbar[] = [
    {
      routeLink: 'login',
      icon: 'bi bi-key',
      label: 'login',
      items: []
    },
    {
      routeLink: 'stock',
      icon: 'bi bi-boxes',
      label: 'stock',
      items: []
    },
    {
      routeLink: 'test',
      icon: 'bi bi-xbox',
      label: 'test',
      items: []
    }
  ];

  @Output() onClick: EventEmitter<Navbar> = new EventEmitter();

  collapsed = false;
  screenWidth = 0;
  multiple = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768)
      this.collapsed = false;
  }

  constructor(public router: Router) {}

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
    this.onClick.emit(data);
    this.router.navigateByUrl(`${data.routeLink}`);
    if (this.collapsed && !this.multiple) this.closeSidenav();
  }
}

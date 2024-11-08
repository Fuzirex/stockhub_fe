import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import {fade} from "../../animations/fade";
import {submenu} from "../../animations/submenu";

@Component({
  selector: 'lib-sub-item',
  templateUrl: './sub-item.component.html',
  styleUrls: ['./sub-item.component.scss'],
  animations: [fade, submenu]
})
export class SubItemComponent {
  @Input() data: any = {
    routeLink: '',
    icon: '',
    label: '',
    items: []
  };

  @Input() collapsed = false;
  @Input() animating!: boolean;
  @Input() expanded?: boolean;
  @Input() multiple = false;

  @Output() closeSidenav: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router) {}

  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (const modelItem of this.data.items) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }

    item.expanded = !item.expanded;
  }

  onNavigate(route: string) {
    this.router.navigateByUrl(`${route}`);
    if (this.collapsed) this.closeSidenav.emit();
  }
}

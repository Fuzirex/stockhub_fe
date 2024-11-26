import {Component, Input} from '@angular/core';
import {ContextService} from "../../services/context/context.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() title!: string;
  @Input() isSideNavCollapsed = false;
  @Input() screenWidth = 0;

  constructor(private contextService: ContextService) {
  }

  getHeaderClass() : string {
    return (this.isSideNavCollapsed && this.screenWidth > 768) ? 'header-trimmed' : 'header-md-screen';
  }

  getDealerDisplayInfo() {
    let dealer = this.contextService.getDealer();

    return dealer.name + ' - ' + dealer.cnpj + ' - ' + dealer.cityDesc;
  }

}

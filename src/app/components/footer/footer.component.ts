import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @Input() isSideNavCollapsed = false;
  @Input() screenWidth = 0;

  getFooterClass() : string {
    return (this.isSideNavCollapsed && this.screenWidth > 768) ? 'footer-trimmed' : 'footer-md-screen';
  }

}

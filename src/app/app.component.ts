import {Component} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'project-title';

  constructor(private router: Router) {
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
      }
    });
  }

}

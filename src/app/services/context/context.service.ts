import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor(private translateService: TranslateService) {
  }

  configureLanguage(language: string) {
    let languageCode: string = (['pt', 'en', 'es'].includes(language)) ? language : 'en';

    this.translateService.use(languageCode);
    this.translateService.setDefaultLang(languageCode);
    this.setLanguage(languageCode);
  }

  setLanguage(language: string): void {
    sessionStorage.setItem('language', language);
  }

}

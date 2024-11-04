import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ContextService} from "../context/context.service";

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(private contextService: ContextService) {
  }

  init() {
    this.configureLanguage();

    return Promise.resolve(undefined);
  }

  private configureLanguage(): void {
    let fullLanguage = navigator.language || 'en-US';
    let language = fullLanguage.split('-')[0];

    this.contextService.configureLanguage(language);
  }
}

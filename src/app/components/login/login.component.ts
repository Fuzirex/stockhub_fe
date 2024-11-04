import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ContextService} from "../../services/context/context.service";
import {TranslateService} from "@ngx-translate/core";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contextService: ContextService,
    private spinner: NgxSpinnerService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    /*const {username, password} = this.loginForm.value;
    this.contextService.configureLanguage(username);*/
    this.spinner.show();

    /*if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      console.log("Username: " + username + " - Password: " + password);
    }*/
  }
}

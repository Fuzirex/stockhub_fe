import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ContextService} from "../../services/context/context.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private contextService: ContextService,
              private spinner: NgxSpinnerService) {
    this.loginForm = this.formBuilder.group({
      cnpj: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    //const {cnpj, password} = this.loginForm.value;
    this.router.navigateByUrl('stock');

    /*if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      console.log("Username: " + username + " - Password: " + password);
    }*/
  }

}

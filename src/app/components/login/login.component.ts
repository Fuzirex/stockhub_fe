import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ContextService} from "../../services/context/context.service";
import {NgxSpinnerService} from "ngx-spinner";
import {SecurityService} from "../../services/security/security.service";
import {LoginResponseDTO} from "../../classes/response/login-response-dto";
import {DealerService} from "../../services/dealer/dealer.service";
import {DealerResponseDTO} from "../../classes/response/dealer-response-dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private contextService: ContextService,
              private spinner: NgxSpinnerService,
              private securityService: SecurityService,
              private dealerService: DealerService) {
    this.checkIfIsAlreadyLogged();
    this.loadForm();
  }

  loadForm() {
    this.loginForm = this.formBuilder.group({
      cnpj: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.spinner.show();
      const {cnpj, password} = this.loginForm.value;

      this.securityService.generateToken(cnpj, password).subscribe({
        next: (result: LoginResponseDTO) => {
          this.contextService.setToken(result.token);
          this.loadDealerInfo(cnpj);
        },
        error: (error: any) => this.contextService.openGenericDialog('warning', 'exceptions.failed-operation', error),
        complete: () => this.spinner.hide()
      });
    }
  }

  loadDealerInfo(cnpj: string) {
    this.spinner.show();
    this.dealerService.getDealer(cnpj).subscribe({
      next: (result: DealerResponseDTO) => {
        this.contextService.setDealer(result);
        this.redirectToNextPage();
      },
      error: (error: any) => this.contextService.openGenericDialog('warning', 'exceptions.failed-operation', error),
      complete: () => this.spinner.hide()
    });
  }

  redirectToNextPage() {
    setTimeout(() => this.router.navigateByUrl('stock'), 500);
  }

  private checkIfIsAlreadyLogged() {
    if (this.contextService.getToken())
      this.router.navigateByUrl('stock');
  }
}

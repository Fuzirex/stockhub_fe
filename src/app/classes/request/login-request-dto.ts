export class LoginRequestDTO {

  cnpj!: string;
  password!: string;

  constructor(cnpj: string, password: string) {
    this.cnpj = cnpj;
    this.password = password;
  }

}

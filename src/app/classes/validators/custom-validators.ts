import {AbstractControl} from "@angular/forms";
import {CustomValidations} from "./custom-validations";

export class CustomValidators {

  static cpfValidator(control: AbstractControl) {
    if (control.value) {
      if (control.value.length == 11)
        return CustomValidations.validateCpf(control.value) ? null : {invalidLegalNumber: true};

      else return {invalidLegalNumber: true}

    } else return null;
  }

  static cnpjValidator(control: AbstractControl) {
    if (control.value) {
      if (control.value.length == 14)
        return CustomValidations.validateCnpj(control.value) ? null : {invalidLegalNumber: true};

      else return {invalidLegalNumber: true}

    } else return null;
  }

}

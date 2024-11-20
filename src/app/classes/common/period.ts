export class Period {
  translateCode: string;
  days: number;

  constructor(translateName: string, days: number) {
    this.translateCode = translateName;
    this.days = days;
  }
}

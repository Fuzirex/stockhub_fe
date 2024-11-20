import {Injectable} from '@angular/core';
import {Period} from "../../classes/common/period";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {
  }

  public getPeriods(): Period[] {
    let periods = [];

    periods.push(new Period("period.last-7-days", 7));
    periods.push(new Period("period.last-30-days", 30));
    periods.push(new Period("period.last-90-days", 90));
    periods.push(new Period("period.last-120-days", 120));
    periods.push(new Period("period.last-1-year", 365));
    periods.push(new Period("period.last-2-years", 730));

    return periods;
  }

  getEmissionPeriodDate(emissionPeriod: Period): Date {
    var date = new Date();
    date.setDate(date.getDate() - emissionPeriod.days);
    return date;
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MyConfig } from '../assets/config/config';

@Injectable({
  providedIn: 'root'
})
export class MoneyServiceService {

  config;

  constructor(private http : HttpClient) { 
    this.config = MyConfig
  }

  ping() : Observable<any> {
    return this.http.get(this.config.server + 'ping').pipe(
      map(x => {
        console.log(x);
        return x
      })
    );
  }


  getDates(startDate, endDate) : Observable<any> {
    let start_day = startDate.date.toString();
    start_day = start_day.length < 2 ? "0"+start_day : start_day;
    let start_month = startDate.month.toString();
    start_month = start_month.length < 2 ? "0"+start_month : start_month;
    let start_year = startDate.year.toString();
    let end_day = endDate.date.toString();
    end_day = end_day.length < 2 ? "0"+end_day : end_day;
    let end_month = endDate.month.toString();
    end_month = end_month.length < 2 ? "0"+end_month : end_month;
    let end_year = endDate.year.toString();
    return this.http.get(this.config.server + 'getDates?startdate=' + start_year+start_month+start_day + '&enddate=' + end_year+end_month+end_day).pipe(
      map((x : any) => {
        console.log(x);
        return x.getDatesResults;
      })
    )
  }

  

  

}

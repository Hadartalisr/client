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
    let start_month = (startDate.month+1).toString();
    start_month = start_month.length < 2 ? "0"+start_month : start_month;
    let start_year = startDate.year.toString();
    let end_day = endDate.date.toString();
    end_day = end_day.length < 2 ? "0"+end_day : end_day;
    let end_month = (endDate.month+1).toString();
    end_month = end_month.length < 2 ? "0"+end_month : end_month;
    let end_year = endDate.year.toString();
    return this.http.get(this.config.server + 'getDates?startdate=' + start_year+start_month+start_day + '&enddate=' + end_year+end_month+end_day).pipe(
      map((x : any) => {
        console.log(x);
        return x.getDatesResults;
      })
    )
  }


  getLongDates(startDate, endDate, amount) : Observable<any> {
    let start_day = startDate.date.toString();
    start_day = start_day.length < 2 ? "0"+start_day : start_day;
    let start_month = (startDate.month+1).toString();
    start_month = start_month.length < 2 ? "0"+start_month : start_month;
    let start_year = startDate.year.toString();
    let end_day = endDate.date.toString();
    end_day = end_day.length < 2 ? "0"+end_day : end_day;
    let end_month = (endDate.month+1).toString();
    end_month = end_month.length < 2 ? "0"+end_month : end_month;
    let end_year = endDate.year.toString();
    return this.http.get(this.config.server + 'getLongDates?startdate=' + start_year+start_month+start_day + 
      '&enddate=' + end_year+end_month+end_day + '&amount=' + amount).pipe(
      map((x : any) => {
        console.log(x);
        return x.getLongDatesResults;
      })
    )
  }

  ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';
    var row = "";

    for (var index in objArray[0]) {
        //Now convert each value to string and comma-separated
        row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
  }


}

import { Component, OnInit } from '@angular/core';
import { MoneyServiceService } from './money-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  
  startDate = undefined;
  endDate = undefined;

  dates;

  //columnDefs; 
  //rowData = undefined;

  isLoading : boolean = false;


  multi: any[] = [ ];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Datetime';
  showYAxisLabel = true;
  yAxisLabel = '$';
  autoScale = true;
  colorScheme = {
    domain: [
      '#980000',	'#ff0000'	,'#ff9900',	'#ffff00', '#00ff00',	'#00ffff'	,'#4a86e8'	,'#0000ff',	'#9900ff'	,'#ff00ff'
    ]
  };


  constructor(private MoneyService : MoneyServiceService){
  
  }

  ngOnInit(){
  }


  onChangeStartDate($event){
    this.startDate = $event.value._i;
  }


  onChangeEndDate($event){
    this.endDate = $event.value._i;
  }


  ping(){
    this.MoneyService.ping().subscribe();
  }


  getDates(){
    this.multi = [];
    this.isLoading = true;
    this.MoneyService.getDates(this.startDate, this.endDate).subscribe(x => {
      console.log(x)
      x.forEach(element => {
        let original_date = element.Datetime;
        let new_date = new Date(original_date);
        element.Datetime = new_date;
      });
      x = x.filter(x => !isNaN(x.Datetime.getTime()));
      this.dates = x;
    }, error => {

    },
    () => {
      this.isLoading = false;
    })
  }


  attChange(key, $event){
    console.log($event);
    let myKey = key;
    let checked = $event.checked;
    if (checked){
      if (["Open","Close","High","Low","trading_min","trading_max"].indexOf(myKey) > -1){
        let first = this.dates[0]["Open"];
        this.multi.push({
          name: myKey,
          series: this.dates.filter(x => x[myKey] != 0).map(x => { 
            let value = (x[myKey] - first )* Math.pow(10, 9);
            return {name: x.Datetime , value: value, tooltipText : x[myKey]};
          })
        })      
      }
      else if (["future_start"].indexOf(myKey) > -1){
        let first = this.dates[0]["Open"];
        this.multi.push({
          name: myKey,
          series: this.dates.filter(x => x[myKey] != 0).map(x => { 
            let value = (x[myKey] - first )* Math.pow(10, 9);
            return {name: x.Datetime , value: value, tooltipText : x[myKey]};
          })
        })      
      }
      else if (["trading_percents","max_percent"].indexOf(myKey) > -1){
        let first = this.dates[0]["Open"];
        this.multi.push({
          name: myKey,
          series: this.dates.map(x => { 
            let value = x[myKey] * Math.pow(10, 11);
            return {name: x.Datetime , value: value, tooltipText : x[myKey]};
          })
        })      
      }
      else {
        this.multi.push({
          name: myKey,
          series: this.dates.map(x => { 
            let value = x[myKey];
            return {name: x.Datetime , value: value };
          })
        })
      }
      let newMulti = this.multi;
      this.multi = [...newMulti];
    }
    else {
      let newMulti = this.multi.filter(x => x.name != myKey);
      this.multi = [...newMulti];
    }
  }


  getTooltip(m: any){
    console.log(m);
    return m.tooltipText;
  }


}


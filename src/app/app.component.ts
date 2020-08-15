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
  amount = undefined;
  dates;
  
  dataType : number = 0;

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

  // for the second module
  longDates;
  multi2: any[] = [ ];
  isLoading2 : boolean = false;


  constructor(private MoneyService : MoneyServiceService){
  
  }


  ngOnInit(){
  }


  changeDataType($event){
    console.log($event);
    this.dataType = $event.index;
  }


  formatLabel(value: number) {
    return Math.round(value / 1000000000) + 'bn';
    
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
    if(this.dataType == 0){ // golmi
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
    else if (this.dataType == 1){ // long days
      this.multi2 = [];
      this.isLoading2 = true;
      this.MoneyService.getLongDates(this.startDate, this.endDate, this.amount).subscribe(x => {
        console.log(x)
        x.forEach(element => {
          let original_date = element.Datetime;
          let new_date = new Date(original_date);
          element.Datetime = new_date;
        });
        x = x.filter(x => !isNaN(x.Datetime.getTime()));
        this.longDates = x;
      }, error => {
  
      },
      () => {
        this.isLoading2 = false;
      })
    }
    
  }


  attChange(key, $event){
    console.log($event);
    let m = this.dataType == 0 ? this.multi : this.multi2 ;
    let first = this.dataType == 0 ? this.dates[0]["Open"] : this.longDates[0]["Open"];
    let mySeries = this.dataType == 0 ? this.dates : this.longDates;
    let myKey = key;
    let checked = $event.checked;
    if (checked){
      if (["Open","Close","High","Low","trading_min","trading_max"].indexOf(myKey) > -1){
        
        m.push({
          name: myKey,
          series: mySeries.filter(x => x[myKey] != 0).map(x => { 
            let value = (x[myKey] - first )* Math.pow(10, 9);
            return {name: x.Datetime , value: value, tooltipText : x[myKey]};
          })
        })      
      }
      else if (["future_start"].indexOf(myKey) > -1){
        m.push({
          name: myKey,
          series: mySeries.filter(x => x[myKey] != 0).map(x => { 
            let value = (x[myKey] - first )* Math.pow(10, 9);
            return {name: x.Datetime , value: value, tooltipText : x[myKey]};
          })
        })      
      }
      else if (["trading_percents","max_percent"].indexOf(myKey) > -1){
        m.push({
          name: myKey,
          series: mySeries.map(x => { 
            let value = x[myKey] * Math.pow(10, 11);
            return {name: x.Datetime , value: value, tooltipText : x[myKey]};
          })
        })      
      }
      else {
        m.push({
          name: myKey,
          series: mySeries.map(x => { 
            let value = x[myKey];
            return {name: x.Datetime , value: value };
          })
        })
      }
      let newMulti = m;
      if (this.dataType == 0){
        this.multi = [...newMulti];
      }
      else if (this.dataType == 1){
        this.multi2 = [...newMulti];
      }
    }
    else {
      let newMulti = m.filter(x => x.name != myKey);
      if (this.dataType == 0){
        this.multi = [...newMulti];
      }
      else if (this.dataType == 1){
        this.multi2 = [...newMulti];
      }    
    }
  }


  getTooltip(m: any){
    console.log(m);
    return m.tooltipText;
  }


}


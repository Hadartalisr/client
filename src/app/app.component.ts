import { Component, OnInit } from '@angular/core';
import { MoneyServiceService } from './money-service.service';
import { SeriesHorizontal } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  
  startDate = undefined;
  endDate = undefined;
  amount = undefined;
  dates : any[];
  dataTitles = undefined;
  
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
  showYAxisLabel = false; // true;
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
    this.dataTitles = undefined;
    if(this.dataType == 0){ // golmi
      this.multi = [];
      this.isLoading = true;
      this.MoneyService.getDates(this.startDate, this.endDate).subscribe(x => {
        console.log(x)
        x.forEach(element => {
          let original_date : string = element.Datetime;
          let date_str = original_date.substring(0,10)+"T"+original_date.substring(11,13)+":00:00";
          let new_date = new Date(date_str);
          element.Datetime = new_date;
        });
        x = x.filter(x => !isNaN(x.Datetime.getTime()));
        this.dates = x;
        this.getDataTitles(this.dates[0]);
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
          let date_str = original_date.substring(0,10)+"T"+original_date.substring(11,13)+":00:00";
          let new_date = new Date(original_date);
          element.Datetime = new_date;
        });
        x = x.filter(x => !isNaN(x.Datetime.getTime()));
        this.longDates = x;
        this.getDataTitles(this.longDates[0]);
      }, error => {
  
      },
      () => {
        this.isLoading2 = false;
      })
    }
  }


  getDataTitles(date : any){
    let filterTitles = ["Datetime","Stock Splits", "date", "future_start", "index", "is_legal_date", "trading_index", "trading_min", "trading_max"];
    let titles = Object.keys(date).filter(x => (filterTitles.indexOf(x) < 0));
    this.dataTitles = titles;
  }


  attChange(key, $event){
    console.log($event);
    let first = this.dates[0][key] ;
    let myKey : string = key;
    let checked = $event.checked;
    if (checked){
      if (myKey.indexOf("trading_percents")> -1 || myKey.indexOf("max_percent")> -1){
        this.multi.push({
          name: myKey,
          series: this.dates.map(x => { 
            let value = x[myKey] * Math.pow(10, 11);
            return {name: x.Datetime , value: value, tooltipText : x[myKey]};
          })
        })      
      }
      else if (myKey.indexOf("usoil") > -1){
        first = this.dates.find(x => x[myKey] != 0);
        first = first == undefined ? 0 : first[myKey];
        this.multi.push({
          name: myKey,
          series: this.dates.filter(x => x[myKey] != 0).map(x => { 
            let value = x[myKey] != 0 ? (x[myKey] - first )* Math.pow(10, 10) : 0;
            return {name: x.Datetime , value: value, tooltipText : x[myKey]};
          })
        })      
      }
      else if (myKey.indexOf("snp") > -1 || myKey.indexOf("ta35") > -1){
        first = this.dates.find(x => x[myKey] != 0);
        first = first == undefined ? 0 : first[myKey];
        this.multi.push({
          name: myKey,
          series: this.dates.filter(x => x[myKey] != 0).map(x => { 
            let value = x[myKey] != 0 ? (x[myKey] - first )* Math.pow(10, 9) : 0;
            return {name: x.Datetime , value: value, tooltipText : x[myKey]};
          })
        })      
      }
      else if (myKey.indexOf("dax") > -1 ){
        first = this.dates.find(x => x[myKey] != 0);
        first = first == undefined ? 0 : first[myKey];
        this.multi.push({
          name: myKey,
          series: this.dates.filter(x => x[myKey] != 0).map(x => { 
            let value = x[myKey] != 0 ? (x[myKey] - first )* Math.pow(10, 11) : 0;
            return {name: x.Datetime , value: value, tooltipText : x[myKey]};
          })
        })      
      }
      else if (["future_start"].indexOf(myKey) > -1){
        this.multi.push({
          name: myKey,
          series: this.dates.filter(x => x[myKey] != 0).map(x => { 
            let value = (x[myKey] - first )* Math.pow(10, 9);
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
      if (this.dataType == 0){
        this.multi = [...newMulti];
      }
      else if (this.dataType == 1){
        this.multi2 = [...newMulti];
      }
    }
    else {
      let newMulti = this.multi.filter(x => x.name != myKey);
      if (this.dataType == 0){
        this.multi = [...newMulti];
      }
      else if (this.dataType == 1){
        this.multi2 = [...newMulti];
      }    
    }
  }

  transformLongDatetime(datetime: Date){
    let day = 1;
    let month = 2;
    let year = 1;
    let hour = datetime.getHours();
    if(hour < 18){
      day += 1;
    }
    return new Date(year, month, day, datetime.getHours(), datetime.getMinutes());
  }

  attLongChange(key, $event){
    console.log($event);
    let m = this.multi2 ;
    let first = this.longDates[0]["Open"];
    let mySeries = this.longDates;
    let myKey = key;
    let checked = $event.checked;
    if (checked){
      let i = 0;
      let index = this.longDates[0].trading_index;
      let newSeries = [];
      while (i < this.longDates.length){
        while (i < this.longDates.length && this.longDates[i].trading_index == index){
          let dt = this.transformLongDatetime(this.longDates[i].Datetime);
          newSeries.push({name: dt , value: this.longDates[i][myKey]})
          i++;
        } 
        let newData = {name : myKey+" "+this.longDates[i-1].date , series : newSeries}
        m.push(newData);
        if(i < this.longDates.length){
          index = this.longDates[i].trading_index;
        }
        newSeries = [];
      }
      /*

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
      }*/
      let newMulti = m;
      if (this.dataType == 0){
        this.multi = [...newMulti];
      }
      else if (this.dataType == 1){
        this.multi2 = [...newMulti];
      }
    }
    else {
      let newMulti = m.filter(x => x.name.indexOf(myKey) == -1);
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

  onLongDateSelect($event){
    console.log($event);
    let newMulti = this.multi2.filter(x => x.name.indexOf($event) == -1);
    this.multi2 = [...newMulti];
  }

  exportLongDatesToExcel(){
    let copy : any[] = [];
    for(let i = 0 ; i < this.multi2.length ; i ++){
      let newObj = {name : this.multi2[i].name , series : []} ;
      for(let j = 0 ; j < this.multi2[i].series.length ; j++){
        newObj.series.push(this.multi2[i].series[j].value);
      }
      copy.push(newObj);
    }
    console.log(copy);
    var csvData = this.MoneyService.ConvertToCSV(copy);
    var a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'longDates.csv';
    a.click();
    return 'success';
  }


}


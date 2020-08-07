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
    let myKey = key.key;
    let checked = $event.checked;
    if (checked){
      if (["Open","Close","High","Low"].indexOf(myKey) > -1){
        let first = this.dates[0][myKey];
        this.multi.push({
          name: myKey,
          series: this.dates.filter(x => x[myKey] != 0).map(x => { 
            let value = (x[myKey] - first )* Math.pow(10, 8);
            return {name: x.Datetime , value: value};
          })
        })      
      }
      else {
        this.multi.push({
          name: myKey,
          series: this.dates.map(x => { 
            let value = x[myKey];
            return {name: x.Datetime , value: value}
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


}


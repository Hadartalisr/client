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
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  autoScale = true;


  constructor(private MoneyService : MoneyServiceService){
  
  }

  ngOnInit(){
    /*
    this.columnDefs = [
      {field: 'Datetime' },
      {field: 'is_legal_date' },
      {field: 'issues_maturity_fedsoma_fedinv_mbs_swap' },
      {field: 'weekday' }
    ];*/
  }

  onChangeStartDate($event){
    this.startDate = $event.value._i;
  }

  onChangeEndDate($event){
    this.endDate = $event.value._i;
  }

  /*
  dateTickFormatting(val : any) : string {
    return val;
    //return " ";
  }*/

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
      this.multi.push({
        name: myKey,
        series: this.dates.filter( x => x[myKey] != 0).map((x, index) =>{ return {name: x.Datetime , value: x[myKey]}})
      })
      let newMulti = this.multi;
      this.multi = [...newMulti];
    }
    else {
      let newMulti = this.multi.filter(x => x.name != myKey);
      this.multi = [...newMulti];
    }
  }



}


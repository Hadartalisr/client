import { Component, OnInit } from '@angular/core';
import { MoneyServiceService } from './money-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  
  systemName : string = "ine";
  startDate = undefined;
  endDate = undefined;
  dates = undefined;

  columnDefs; 
  rowData = undefined;

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
  autoScale = false;



  constructor(private MoneyService : MoneyServiceService){
  
  }

  ngOnInit(){
    this.columnDefs = [
      {field: 'Datetime' },
      {field: 'is_legal_date' },
      {field: 'issues_maturity_fedsoma_fedinv_mbs_swap' },
      {field: 'weekday' }
    ];
  }

  onChangeStartDate($event){
    this.startDate = $event.value._i;
  }

  onChangeEndDate($event){
    this.endDate = $event.value._i;
  }

  ping(){
    this.isLoading = true;
    this.MoneyService.ping().subscribe(x => {
      console.log(x);
      this.isLoading = false;
    })
  }

  getDates(){
    this.multi = [];
    this.rowData = undefined
    this.isLoading = true;
    this.MoneyService.getDates(this.startDate, this.endDate).subscribe(x => {
      console.log(x)
      x.forEach(element => {
        element.Datetime = new Date(element.Datetime)
      });
      this.dates = x;
      this.rowData = this.dates;
      this.multi.push({
        name: 'issues_maturity_fedsoma_fedinv_mbs_swap',
        series: this.dates.map(x =>{ return {name: x.index , value: x.issues_maturity_fedsoma_fedinv_mbs_swap}})
      })
      console.log(this.multi)
      
    }, error => {

    },
    () => {
      this.isLoading = false;
    })
  }

}


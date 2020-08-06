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

  dateTickFormatting(val : any) : string {
    return this.dates[val].Datetime.toString();
    //return " ";
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
        element.Datetime = new Date(element.Datetime)
      });
      this.dates = x;
      this.multi.push({
        name: 'issues_maturity_fedsoma_fedinv_mbs_swap',
        series: this.dates.filter( x => x.issues_maturity_fedsoma_fedinv_mbs_swap != 0).map(x =>{ return {name: x.index , value: x.issues_maturity_fedsoma_fedinv_mbs_swap}})
      })
      console.log(this.multi)

    }, error => {

    },
    () => {
      this.isLoading = false;
    })
  }


  // those help to show the selected data
  OpenChange($event){
    console.log($event);
    let openChecked : Boolean = $event.checked;
    if (openChecked){
      this.multi.push({
        name: 'Open',
        series: this.dates.filter( x => x.Open != 0).map(x =>{ return {name: x.index , value: x.Open}})
      })
      let newMulti = this.multi;
      this.multi = [...newMulti];
    }
    else {
      let newMulti = this.multi.filter(x => x.name != 'Open');
      this.multi = [...newMulti];
    }
  }


  // those help to show the selected data
  CloseChange($event){
    console.log($event);
    let openChecked : Boolean = $event.checked;
    if (openChecked){
      this.multi.push({
        name: 'Close',
        series: this.dates.filter( x => x.Close != 0).map(x =>{ return {name: x.index , value: x.Close}})
      })
      let newMulti = this.multi;
      this.multi = [...newMulti];
    }
    else {
      let newMulti = this.multi.filter(x => x.name != 'Close');
      this.multi = [...newMulti];
    }
  }


  // those help to show the selected data
  swap_deltaChange($event){
    console.log($event);
    let openChecked : Boolean = $event.checked;
    if (openChecked){
      this.multi.push({
        name: 'swap_delta',
        series: this.dates.filter( x => x.swap_delta != 0).map(x =>{ return {name: x.index , value: x.swap_delta}})
      })
      let newMulti = this.multi;
      this.multi = [...newMulti];
    }
    else {
      let newMulti = this.multi.filter(x => x.name != 'swap_delta');
      this.multi = [...newMulti];
    }
  }
  
  // those help to show the selected data
  future_swapChange($event){
    console.log($event);
    let openChecked : Boolean = $event.checked;
    if (openChecked){
      this.multi.push({
        name: 'future_swap',
        series: this.dates.filter( x => x.future_swap != 0).map(x =>{ return {name: x.index , value: x.future_swap}})
      })
      let newMulti = this.multi;
      this.multi = [...newMulti];
    }
    else {
      let newMulti = this.multi.filter(x => x.name != 'future_swap');
      this.multi = [...newMulti];
    }
  }

  // those help to show the selected data
  issues_maturity_fedsoma_fedinv_mbs_swapChange($event){
    console.log($event);
    let openChecked : Boolean = $event.checked;
    if (openChecked){
      this.multi.push({
        name: 'issues_maturity_fedsoma_fedinv_mbs_swap',
        series: this.dates.filter( x => x.issues_maturity_fedsoma_fedinv_mbs_swap != 0).map(x =>{ return {name: x.index , value: x.issues_maturity_fedsoma_fedinv_mbs_swap}})
      })
      let newMulti = this.multi;
      this.multi = [...newMulti];
    }
    else {
      let newMulti = this.multi.filter(x => x.name != 'issues_maturity_fedsoma_fedinv_mbs_swap');
      this.multi = [...newMulti];
    }
  }  


}


import { Component, OnInit, Input } from '@angular/core';


export interface modelInterface {
  color : string;
  name : any;
  series : string;
  value : number;
  tooltipText? : string;
  displayName? : any;
}

@Component({
  selector: 'app-graph-tooltip',
  templateUrl: './graph-tooltip.component.html',
  styleUrls: ['./graph-tooltip.component.css']
})
export class GraphTooltipComponent implements OnInit {

  isLoading : boolean = true;
  @Input() model : modelInterface[];
  datetime : string;

  constructor() { }

  ngOnInit() {
    if (this.model.length > 0){
      console.log(this.model);
      this.datetime = this.getDisplayDatetime(this.model[0].name);
      this.updateDisplayNames();
      this.isLoading = false;
    }
  }

  getDisplayDatetime(datetime: any){
    return datetime.toLocaleString();
  }

  updateDisplayNames(){
    this.model.forEach(x => {
      if (["Open", "Close", "High", "Low"].indexOf(x.series) > -1){
        x.displayName = x.tooltipText;
      }
      else {
        x.displayName = x.value;
      }
    })
  }

  getColor(x : modelInterface){
    return {'background-color': x.color};
  }

}

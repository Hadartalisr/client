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
      if (x.series.indexOf("snp") > -1 || x.series.indexOf("dax") > -1 || x.series.indexOf("ta35") > -1 || x.series.indexOf("usoil") > -1 ){
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

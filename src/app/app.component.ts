import { Component, OnInit } from '@angular/core';
import { MoneyServiceService } from './money-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  
  systemName : string = "ine";
  columnDefs; 
  rowData;

  constructor(private MoneyService : MoneyServiceService){
  
  }

  ngOnInit(){
    this.columnDefs = [
      {field: 'make' },
      {field: 'model' },
      {field: 'price'}
    ];

    this.rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];

  }

}


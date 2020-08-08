import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDrawerContent, MatDrawer, MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from "ag-grid-angular";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { NgxChartsModule } from '@swimlane/ngx-charts'
import {LayoutModule, PanelBarModule, SplitterModule} from '@progress/kendo-angular-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { GraphTooltipComponent } from './graph-tooltip/graph-tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphTooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpClientModule,
    AgGridModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatMomentDateModule,
    MatProgressSpinnerModule,
    LayoutModule,
    NgxChartsModule,
    PanelBarModule, 
    SplitterModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [
    MatNativeDateModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

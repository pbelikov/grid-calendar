import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {LocalStorageModule} from "angular-2-local-storage";
import {PopoverModule} from "ngx-popover";

import { AppComponent } from './app.component';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { MonthComponent } from './components/month/month.component';
import { DayComponent } from './components/day/day.component';
import { TODOListComponent } from './components/todolist/todolist.component';

import { MakeDraggable } from './directives/make-draggable.directive';
import { MakeDroppable } from './directives/make-droppable.directive';

@NgModule({
  declarations: [
    AppComponent,
    CalendarHeaderComponent,
    MonthComponent,
    DayComponent,
    TODOListComponent,
    MakeDraggable,
    MakeDroppable
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PopoverModule,
    LocalStorageModule.withConfig({
      prefix: 'grid-calendar',
      storageType: 'localStorage'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

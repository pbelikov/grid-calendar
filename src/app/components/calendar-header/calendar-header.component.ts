import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

import DateTimeFormatOptions = Intl.DateTimeFormatOptions;

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.css']
})
export class CalendarHeaderComponent implements OnInit {
  private _calendarDate : Date;

  private FORWARD : string = 'FORWARD';
  private BACK : string = 'BACK';

  private month : string;
  private year : number;

  @Input()
  set calendarDate ( calendarDate : Date ) {
    this._calendarDate = calendarDate;
  }

  get calendarDate () : Date {
    return this._calendarDate;
  }

  @Output('onMonthChange') monthChange = new EventEmitter<Date>();

  constructor() {

  }

  private setMonthDisplay () : void {
    this.month = this.calendarDate.toLocaleString('en-us', <DateTimeFormatOptions>{month: 'long'});
  }

  private setYearDisplay () : void {
    this.year = this.calendarDate.getFullYear();
  }

  onDirectionClick (direction : string) : void {
    let newMonth = this.calendarDate.getMonth();
    switch (direction) {
      case this.FORWARD: {
        if (++newMonth > 11) {
          this.calendarDate.setFullYear(this.calendarDate.getFullYear()+1);
          newMonth = 0;
        }
        this.calendarDate.setMonth(newMonth);
        break;
      }
      case this.BACK: {
        if (--newMonth < 0) {
          this.calendarDate.setFullYear(this.calendarDate.getFullYear()-1);
          newMonth = 11;
        }
        this.calendarDate.setMonth(newMonth);
        break;
      }
    }
    this.setMonthDisplay();
    this.setYearDisplay();
    this.monthChange.emit(this.calendarDate);
  }

  ngOnInit() {
    this.setMonthDisplay();
    this.setYearDisplay();
  }

}

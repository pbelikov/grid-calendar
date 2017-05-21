import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {DayDate} from "../../classes/day-date";

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit, OnChanges {
  private _calendarDate : Date;
  private _currentDate : Date;

  @Input()
  set calendarDate ( calendarDate : Date ) {
    this._calendarDate = calendarDate;
  }

  get calendarDate () {
    return this._calendarDate;
  }

  @Input()
  set currentDate ( currentDate : Date ) {
    this._currentDate = currentDate;
  }

  get currentDate () {
    return this._currentDate;
  }

  weeks : Object[];
  days : DayDate[];
  selected : Date;
  highlited : Date;

  protected dayHeaders : string[];

  constructor() {
    // this.dayHeaders = this.dayHeaders.map(value => value.toUpperCase()); // overkill, moved to CSS
    this.dayHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.weeks = [];
  }

  private _addDays (date : Date, days : number = 1) : Date {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  private _buildWeek (start : Date, month : number) {
    let days : Object[] = [];
    let date : Date = new Date (start.setHours(0, 0, 0, 0));
    for (var i = 0; i < 7; i++) {
      days.push({
        date,
        month
      });
      date = this._addDays (date, 1);
    }
    return days;
  }

  private _buildMonth () {
    let month : number = this._calendarDate.getMonth();
    let firstDay : Date = this._calendarDate;

    // we'll get start date of month (weird part)
    while (firstDay.getDay() == 0 ? 7 : firstDay.getDay() >= 1) {
      if (firstDay.getDay() == 1) {
        break;
      } else {
        firstDay = this._addDays (firstDay, -1);
      }
    }

    // as soon as we know that there are 35 cells (5 weeks) in our monthly calendar ...
    for (let i=0; i < 5; i++) {
      this.weeks.push({days: this._buildWeek(firstDay, month)});
      firstDay = this._addDays (firstDay, 7);
    }
  }

  onDayClick (dayDate : Date) : void {
    this.selected = dayDate;
  }

  ngOnInit() {
    this.highlited = this._currentDate;
  }

  ngOnChanges(changes : any) {
    this.weeks = [];
    this.selected = null;
    this._buildMonth();
  }
}

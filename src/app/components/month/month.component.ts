import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {DayDate} from "../../classes/day-date";

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['month.component.scss']
})
export class MonthComponent implements OnInit, OnChanges {
  /*
   * PRIVATE variables
   * current date - day today
   * calendar date - used to define which month is currently selected
   */
  private _calendarDate : Date;
  private _currentDate : Date;

  /*
   * Getters, setters and inputs
   */

  @Input() set calendarDate ( calendarDate : Date ) {
    this._calendarDate = calendarDate;
  }

  get calendarDate () {
    return this._calendarDate;
  }

  @Input() set currentDate ( currentDate : Date ) {
    this._currentDate = currentDate;
  }

  get currentDate () {
    return this._currentDate;
  }

  /*
   * PUBLIC VARIABLES to manage interaction and render UI
   */
  weeks : Object[];
  days : DayDate[];
  selected : Date;
  highlited : Date;
  dayHeaders : string[];

  /*
   * CONSTRUCTOR
   * initializing headers of day (week: Monday -> Sunday)
   */
  constructor() {
    this.dayHeaders = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.weeks = [];
  }

  /*
   * Helper method to add days to some date
   */
  private _addDays (date : Date, days : number = 1) : Date {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /*
   * Helper method to build week: generates sequence of days and sets their attributes
   */
  private _buildWeek (start : Date, month : number) : DayDate[] {
    let days : DayDate[] = [];
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

  /*
   * Helper method to build month of weeks: generates sequence of weeks and sets their attributes
   */
  private _buildMonth () : void {
    let month : number = this._calendarDate.getMonth();
    let firstDay : Date = this._calendarDate;

    /* getting start date of month (weird part):
       not calendar one, but 35-cell one - not necessary this is 1st of, e.g., January
    */
    while (firstDay.getDay() == 0 ? 7 : firstDay.getDay() >= 1) {
      if (firstDay.getDay() == 1) {
        break;
      } else {
        firstDay = this._addDays (firstDay, -1);
      }
    }

    // there are 48 cells (6 weeks) in our monthly calendar (checked against various apps and tested against Jan-2017)
    for (let i=0; i < 6; i++) {
      this.weeks.push({days: this._buildWeek(firstDay, month)});
      firstDay = this._addDays (firstDay, 7);
    }
  }

  // handle click on day - set day as "selected"
  onDayClick (dayDate : Date) : void {
    this.selected = dayDate;
  }

  // highlighting "today" day
  ngOnInit() : void {
    this.highlited = this._currentDate;
  }

  // listening to change of month to refresh calendar
  ngOnChanges(changes : any) : void {
    this.weeks = [];
    this.selected = null;
    this._buildMonth();
  }
}

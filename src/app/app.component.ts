import {Component} from '@angular/core';


/*
 * This is root component of our Calendar application
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  /*
   * Private variables for current date (used for startup configuration of calendar)
   * and date, that is set using calendar controls (used to show necessary month)
   */
  private _calendarDate : Date;
  private _currentDate : Date;

  /*
   * SETTERS AND GETTERS
   */
  set calendarDate ( calendarDate : Date ) {
    this._calendarDate = calendarDate;
  }

  get calendarDate () : Date {
    return this._calendarDate;
  }

  set currentDate ( currentDate : Date ) {
    this._currentDate = currentDate;
  }

  get currentDate () : Date {
    return this._currentDate;
  }

  /*
   * CONTRUCTOR
   * Initializing current date and calendar date, truncating calendar date to 1st day of month
   * to avoid problems, related to 29th-31st days of month, which don't exists in some months
   */
  constructor() {
    this.currentDate = new Date ();
    this.calendarDate = new Date (this._currentDate.setHours(0, 0, 0, 0));
    this.calendarDate.setMonth(this.calendarDate.getMonth(), 1); // avoiding problems with 29th,30th,31st days
  }

  /*
   * Catching change of month
   */
  monthChanges (changeResult : any) : void {
    this.calendarDate = new Date (changeResult);
  }
}

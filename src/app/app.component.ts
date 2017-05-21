import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _calendarDate : Date;
  private _currentDate : Date;

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

  constructor() {
    this.currentDate = new Date ();
    this.calendarDate = new Date (this._currentDate.setHours(0, 0, 0, 0));
    this.calendarDate.setMonth(this.calendarDate.getMonth(), 1); // avoiding problems with 29th,30th,31st days
  }

  monthChanges (changeResult : any) : void {
    this.calendarDate = new Date (changeResult);
  }
}

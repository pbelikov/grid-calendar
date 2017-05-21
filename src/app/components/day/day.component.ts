import {Component, OnInit, Input, EventEmitter, Output, OnChanges, ElementRef} from '@angular/core';
import {DayDate} from "../../classes/day-date";
import {TODOItem} from "../../classes/todo-item";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['day.component.scss']
})
export class DayComponent implements OnInit, OnChanges {
  private _dayDate : DayDate;

  @Input() set dayDate (dayDate : DayDate) {
    this._dayDate = dayDate;
  }

  get dayDate () : DayDate {
    return this._dayDate;
  }

  private _selected : Date;

  @Input() set selected (selected : Date) {
    this._selected = selected;
  }

  get selected () {
    return this._selected;
  }

  private _highlited : Date;

  @Input() set highlited (highlited : Date) {
    this._highlited = highlited;
  }

  private _element : ElementRef;

  get element(): ElementRef {
    return this._element;
  }

  set element(value: ElementRef) {
    this._element = value;
  }

  private _refreshRequired : Date;

  get refreshRequired(): Date {
    return this._refreshRequired;
  }

  set refreshRequired(value: Date) {
    this._refreshRequired = value;
  }

  currentClasses = {};
  daySimple : number;
  droppedTodo : TODOItem;

  constructor(private elementRef: ElementRef) {

  }

  private _isCurrentMonth () : boolean {
    return this._dayDate.date.getMonth() == this._dayDate.month ? true : false;
  }

  private isSelected () : boolean {
    return this._selected == this._dayDate.date ? true : false;
  }

  private isHighlited () : boolean {
    return this._highlited.getUTCDate() == this._dayDate.date.getUTCDate() ? true : false;
  }

  onTodoListChange(event : any) {
    if (typeof event == "boolean") {
      this.refreshRequired = new Date();
    }
  }

  onDropTodo (event : any) {
    this.droppedTodo = event.payload;
  }

  ngOnInit() {
    this._element = this.elementRef;
    this.currentClasses =  {
      currentMonth: this._isCurrentMonth(),
      selectedDay: null,
      highlitedDay: this.isHighlited()
    };
  }

  ngOnChanges(changes : any) {
    this.currentClasses['selectedDay'] = this.isSelected();
  }
}

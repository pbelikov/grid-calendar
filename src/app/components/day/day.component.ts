import {Component, OnInit, Input, OnChanges, ElementRef} from '@angular/core';
import {DayDate} from "../../classes/day-date";
import {TODOItem} from "../../classes/todo-item";

/*
 * This component is used to render "day" with all the contents
 */
@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['day.component.scss']
})
export class DayComponent implements OnInit, OnChanges {
  /*
   * PRIVATE variables
   * date (date + month) - used to define whether day is in currently selected month and for further TODO-list logic
   * selected day - selected day
   * highlighted day - some important day ("today" in our case)
   * element - DOM-element reference
   * trigger to alert that refresh of contained todos is required
   */
  private _dayDate : DayDate;
  private _selected : Date;
  private _highlited : Date;
  private _element : ElementRef;
  private _refreshRequired : Date;

  /*
   * Getters, setters and inputs
   */

  @Input() set dayDate (dayDate : DayDate) {
    this._dayDate = dayDate;
  }

  get dayDate () : DayDate {
    return this._dayDate;
  }

  @Input() set selected (selected : Date) {
    this._selected = selected;
  }

  get selected () {
    return this._selected;
  }

  @Input() set highlited (highlited : Date) {
    this._highlited = highlited;
  }

  get element(): ElementRef {
    return this._element;
  }

  set element(value: ElementRef) {
    this._element = value;
  }

  get refreshRequired(): Date {
    return this._refreshRequired;
  }

  set refreshRequired(value: Date) {
    this._refreshRequired = value;
  }

  /*
   * PUBLIC VARIABLES to manage interaction
   */
  currentClasses = {};
  droppedTodo : TODOItem;

  /*
   * CONSTRUCTOR
   * ElementRef is injected
   */
  constructor(private elementRef: ElementRef) {

  }

  private _isCurrentMonth () : boolean {
    return this._dayDate.date.getMonth() == this._dayDate.month ? true : false;
  }

  private isSelected () : boolean {
    return this._selected == this._dayDate.date ? true : false;
  }

  private isHighlited () : boolean {
    return this._highlited.getTime() == this._dayDate.date.getTime() ? true : false;
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

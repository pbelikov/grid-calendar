import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { TODOItem } from '../../classes/todo-item';
import { TODOService } from '../../services/todo.service';

import {Error} from "tslint/lib/error";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['todolist.component.scss'],
  providers: [TODOService]
})
export class TODOListComponent implements OnInit, OnChanges {
  @Output('onTodoListChange') listChanged : EventEmitter<Boolean> = new EventEmitter();

  private _todos : TODOItem[];

  set todos (todos : TODOItem[]) {
    this._todos = todos;
  }

  get todos () {
    return this._todos;
  }

  @Input()  refreshRequired : Date = null;

  @Input() editable : boolean;

  private _dayDate : Date;

  get dayDate(): Date {
    return this._dayDate;
  }

  @Input() set dayDate(value: Date) {
    this._dayDate = value;
  }

  private _draggable : boolean;

  get draggable(): boolean {
    return this._draggable;
  }

  set draggable(value: boolean) {
    this._draggable = value;
  }

  @Input() droppedTodo : TODOItem;

  todoText : string;
  todoDOMClass : string = 'todoItemClass';

  constructor(private todoService: TODOService) {

  }

  getTODOList () : void {
    this.todoService.getList(this._dayDate).then(todos => {
      this.todos = todos;
      this.listChanged.emit(true);
    });
  }

  isEditable () : boolean {
    return this.editable;
  }

  isDraggable () : boolean {
    return this.draggable;
  }

  addTODO (event) : void {
    let emptyTodoException : Error;
    try {
      event.preventDefault();
      if (this.todoText.replace(/\s/g,'') === '') {
        throw emptyTodoException;
      }
      let todo = new TODOItem (this._dayDate, this.todoText, new Date());
      this.todoText = '';
      this.todoService.addToList(todo).then(() => this.getTODOList());
    } catch (emptyTodoException) {
      return;
    }
  }

  deleteTODO (todo : TODOItem) : void {
    this.todoService.deleteFromList(todo).then(() => this.getTODOList());
    return;
  }

  onDrop(event : any, data?: any) {
    if (data == undefined) {
      // if we just drop into empty space in day, then we just update date and put the item into beginning of the list
      this.todoService.changeTodoDate(event, this._dayDate).then(() => this.getTODOList());
    } else {
      // if another event is target, then we put new event above targeted one
      this.todoService.putAbove(event.payload, data).then(() => this.getTODOList());
    }
  }

  ngOnInit() {
    this._draggable = !this.editable;
    this.getTODOList();
  }

  ngOnChanges(changes : any) {
    if (changes.hasOwnProperty('droppedTodo')) {
      if (changes.droppedTodo.currentValue !== undefined) {
        this.onDrop(changes.droppedTodo.currentValue);
      }
    } else {
      this.getTODOList();
    }
  }
}

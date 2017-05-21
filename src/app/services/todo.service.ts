import { Injectable } from '@angular/core';

// Using angular-2-local-storage for comfortable interaction with browser's localStorage
import { LocalStorageService } from 'angular-2-local-storage';

import { TODOItem } from '../classes/todo-item';

@Injectable()
export class TODOService {

  data : TODOItem[];

  constructor(private _localStorageService: LocalStorageService) {
    this.data = [];
  }

  getList(date? : Date): Promise<TODOItem[]> {
    this.data = [];
    for (let key of this._localStorageService.keys()) {
      if (this._localStorageService.get(key) == null) {
        continue;
      }
      let element : TODOItem = <TODOItem>JSON.parse (this._localStorageService.get(key).toString());

      if (element == null) {
        continue;
      }
      if (!element.hasOwnProperty('day')) {
        continue;
      }

      if (date == undefined) {
        this.data.push(element);
        continue;
      }
      if (new Date (element['day']).getTime() == date.getTime()) {
        this.data.push(element);
      }
    }
    this.data.sort((a : TODOItem, b : TODOItem) => {
      return a.orderInDay > b.orderInDay ? 1 : 0;
    });
    return Promise.resolve(this.data);
  }

  addToList (todo : TODOItem) : Promise<Number> {
    let idArray : number[] = this._localStorageService.keys().map((key, index) => {
      if (this._localStorageService.get(key) == null) {
        return 0;
      }

      let element : TODOItem = <TODOItem>JSON.parse (this._localStorageService.get(key).toString());
      if (element == null) {
        return 0;
      }
      if (!element.hasOwnProperty('day')) {
        return 0;
      }
      return element.id;
    });
    if (idArray.length == 0) {
      todo.id = 1;
    } else {
      todo.id = Math.max.apply(null, idArray) + 1;
    }
    todo.orderInDay = this.data.length + 1;
    this._localStorageService.set((todo.id - 1).toString(), JSON.stringify(todo));
    this.data.push(todo);
    return Promise.resolve(todo.id);
  }

  deleteFromList (todo? : TODOItem) : Promise<Number> {
    this._localStorageService.remove((todo.id - 1).toString());
    for (let i=0;i<this.data.length;i++) {
      if (this.data[i].id == todo.id) {
        this.data.splice(i,1);
      }
    }
    return Promise.resolve(todo.id);
  }

  changeTodoDate (todo : TODOItem, date : Date) : Promise<Number> {
    todo.day = date;
    this._localStorageService.set((todo.id - 1).toString(), JSON.stringify(todo));
    return Promise.resolve(todo.id);
  }

  putAbove (newTodo : TODOItem, currentTodo : TODOItem) : Promise<Number> {
    newTodo.orderInDay = currentTodo.orderInDay;
    newTodo.day = currentTodo.day;
    for (let i=0;i<this.data.length;i++) {
      if (this.data[i].orderInDay > currentTodo.orderInDay) {
        this.data[i].orderInDay += 1;
        this._localStorageService.set((this.data[i].id - 1).toString(), JSON.stringify(this.data[i]));
      }
    }
    currentTodo.orderInDay++;
    this._localStorageService.set((newTodo.id - 1).toString(), JSON.stringify(newTodo));
    this._localStorageService.set((currentTodo.id - 1).toString(), JSON.stringify(currentTodo));
    return Promise.resolve(newTodo.id);
  }

  clear () : Promise<TODOItem[]> {
    this._localStorageService.clearAll();
    return Promise.resolve([]);
  }
}

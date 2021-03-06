# GridCalendar

> Framework: Angular 2

This is implementation of calendar with TODOs, that uses no external plugins to build calendar and implement drag-and-drop logic.

It still uses 2 external modules: [ngx-popover](https://github.com/pleerock/ngx-popover) for Popover and [angular-2-local-storage](https://github.com/phenomnomnominal/angular-2-local-storage) module is used for comfortable interaction with browser's localStorage.

### REPOSITORY

Repository is located here: [https://github.com/pbelikov/grid-calendar](https://github.com/pbelikov/grid-calendar)

### DEMO

Demo is available here: [https://pbelikov.github.io/grid-calendar/dist/index.html](https://pbelikov.github.io/grid-calendar/dist/index.html)

### Source structure

+ __classes/__
  + __day-date__ - class, that describes day
  + __drop-content__ - class to support drag-and-drop: defines structure of "dataTransfered" object
  + __todo-item__ - Class to describe our TODOItem
+ __components/__
  + __calendar-header/__ - header of the calendar
  + __day/__ - component to work with individual days
  + __month/__ - month (composed of days)
  + __todolist/__ - lists with TODOs in each day
+ __directives/__
  + __make-draggable.directive__ - directive that uses HTML5 API to make component draggable
  + __make-droppable.directive__ - directive that uses HTML5 API to convert component to dropzone
+ __services/__
  + __todo.service__ - service to make CRUD operations with TODOs
+ __app.component.ts__ - root component

### Usage notes

+ There are 5 to 6 rows in the calendar, depending on month. For example, May 2017 - 5 rows, January 2017 - 6 rows.
+ TODO item is always dropped on top of the day (even if day is the same) - it is made intentionally, to provide capability for faster prioritization of TODOs.
+ "Ctrl" in placeholder of add-todo textarea means exactly "Ctrl" button on keyboard.

### Known issues

+ Due to unknown browser's (Chrome 58, Edge) behaviour, when mouse leaves day it can (but sometimes not) still be marked as active, even though this feature is made with pure CSS. When you move mouse over and out one more time, everything gets OK.

## Build and run instructions

### Angular-CLI

Project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.4, so it contains some unit-testing and end-2-end specs that do not conform with application source code, so testing with karma and protractor will fail, but everything works.

### Development server setup

> Don't forget to install @angular/cli prerequisites before start

1. npm install -g @angular/cli
2. npm install

### Development server start

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Don't forget to put correct `base-href` with `--base-href` parameter.

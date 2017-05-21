# GridCalendar

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.4.

## Source structure

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

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

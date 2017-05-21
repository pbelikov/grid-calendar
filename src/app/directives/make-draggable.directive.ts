import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {DropContent} from "../classes/drop-content";

@Directive({
  selector: '[makeDraggable]'
})
export class MakeDraggable implements OnInit {
  @Input('makeDraggable') data: DropContent;
  @Input('isDraggable') draggable : boolean = true;
  @Input('helperClass') helperClass : string;

  dragClass : string = 'draggingElement';

  constructor(private _elementRef: ElementRef) {}

  ngOnInit() {
    // As soon as all 100+ tries with HostListener failed, I've made it with native JS
    // Problems included abscence of animation, partial event firing etc.
    let elementIsNotDraggableException = new Error('You are trying to make not draggable element');
    try {
      if (this.draggable == false) {
        throw elementIsNotDraggableException;
      }
      let element = this._elementRef.nativeElement;

      element.draggable == 'true';

      element.addEventListener('dragstart', (event) => {
        let random: number = Math.round(0.5 + Math.random() * 100000);
        let elementIdentifyingClass;
        if (!this.data.hasOwnProperty('id')) {
          elementIdentifyingClass = `${this.dragClass}-${random.toString()}`;
        } else {
          elementIdentifyingClass = `${this.helperClass}-${this.data['id']}`;
        }

        element.classList.add(this.dragClass);
        element.classList.add(elementIdentifyingClass);

        this.data.elementClass = elementIdentifyingClass;

        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text', JSON.stringify(this.data));
        event.dataTransfer.setData('elementClass', elementIdentifyingClass);
      });

      element.addEventListener('dragend', (e) => {
        e.preventDefault();
        element.classList.remove(this.dragClass);
      });
    } catch (elementIsNotDraggableException) {
      console.log (elementIsNotDraggableException.message);
    }
  }
}

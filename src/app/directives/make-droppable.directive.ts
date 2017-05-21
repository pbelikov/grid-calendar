import {Directive, ElementRef, OnInit, Input, Inject, Output, EventEmitter} from '@angular/core';
import {DropContent} from "../classes/drop-content";
import {DOCUMENT} from "@angular/platform-browser";

@Directive({
  selector: '[makeDroppable]'
})
export class MakeDroppable implements OnInit {
  @Input() dropContext : any;
  @Output() dropped: EventEmitter<any> = new EventEmitter();

  dropClass : string = 'draggingElementOverArea';

  constructor(private _elementRef: ElementRef,
              @Inject(DOCUMENT) private _document) {}

  ngOnInit() {
    // Story here is the same as with draggable, HostListener didn't work 100%
    // (I don't know why, but I've also moved to HTML5 here)
    let element = this._elementRef.nativeElement;

    element.addEventListener('dragenter', () => {
      element.classList.add(this.dropClass);
    });

    element.addEventListener('dragleave', () => {
      element.classList.remove(this.dropClass);
    });

    element.addEventListener('dragover', (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      return false;
    });

    element.addEventListener('drop', (event) => {
      event.stopPropagation();
      element.classList.remove(this.dropClass);

      let data : DropContent = new DropContent(this.dropContext['context'],
                                               JSON.parse(event.dataTransfer.getData('text')),
                                               JSON.parse(event.dataTransfer.getData('text'))['elementClass']
      );
      this.dropped.emit(data);

      // some direct DOM manipulation (I know that it's bad practice, but I'm stuck with drag and drop
      // for too long, so this solution is used
      this._document.getElementsByClassName(data.elementClass)[0].remove();

      return false;
    });
  }
}
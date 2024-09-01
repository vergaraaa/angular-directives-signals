import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  // private htmlElemet?: ElementRef<HTMLElement>;
  private _color: string = 'red';

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  constructor(private el: ElementRef<HTMLElement>) {
    // this.htmlElemet = el;
  }

  ngOnInit(): void {
    this.setStyle();
  }

  setStyle(): void {
    this.el.nativeElement.style.color = this._color;
    // if (!this.htmlElemet) return;
    // this.htmlElemet!.nativeElement.style.color = this._color;
  }
}

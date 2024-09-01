import { ValidationErrors } from '@angular/forms';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  // private htmlElemet?: ElementRef<HTMLElement>;
  constructor(private el: ElementRef<HTMLElement>) {
    // this.htmlElemet = el;
  }

  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  ngOnInit(): void {
    this.setStyle();
  }

  setStyle(): void {
    this.el.nativeElement.style.color = this._color;
    // if (!this.htmlElemet) return;
    // this.htmlElemet!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    // if (!this.htmlElemet) return;
    // this.htmlElemet!.nativeElement.style.color = this._color;

    if (!this._errors) {
      this.el.nativeElement.innerText = '';
      return;
    }

    const errors = Object.keys(this._errors);

    if (errors.includes('required')) {
      this.el.nativeElement.innerText = 'This field is required.';
      return;
    }

    if (errors.includes('minlength')) {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];

      this.el.nativeElement.innerText = `Min ${current}/${min} characters.`;
      return;
    }

    if (errors.includes('email')) {
      this.el.nativeElement.innerText = 'This field must be an email.';
      return;
    }
  }
}

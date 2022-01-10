import { Directive, AfterContentInit, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'input[appAutofocus]'
})
export class AutofocusDirective implements AfterContentInit {
  private focus = true;
  public _focus = true;

  


  @Input('appAutofocus')
  public focused: boolean = false;

  constructor(public element: ElementRef<HTMLElement>) {
  }

  ngAfterContentInit(): void {
    // ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    if (this.focused) {
      setTimeout(() => this.element.nativeElement.focus(), 0);
    }
  }

}

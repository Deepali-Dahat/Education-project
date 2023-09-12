import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAllPlaceholder]'
})
export class AllPlaceholderDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('input') onInput() {
    const value = this.el.nativeElement.value;
    if (!value) {
      this.renderer.setAttribute(this.el.nativeElement, 'placeholder', 'Please enter your new question');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'placeholder');
    }
  }
}

import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Lang } from 'src/app/modules/core/enums/lang.enum';
import { TranslationService } from 'src/app/modules/core/services/translation/translation.service';

@Directive({
  selector: '[RtlDir]'
})
export class RtlDirDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2,
    private translationService: TranslationService) {
    this.switchElementDirection();
  }

  /**
   * used to switch rtl class based on the chosen language from TranslationService.
   */
  switchElementDirection() {
    this.translationService.currentLanguage$.subscribe(language => {
      switch (language) {
        case Lang.english:
          this.renderer.removeClass(this.elRef.nativeElement, 'rtl');
          break;
        case Lang.arabic:
          this.renderer.addClass(this.elRef.nativeElement, 'rtl');
          break;
        default:
          break;
      }
    })
  }


}

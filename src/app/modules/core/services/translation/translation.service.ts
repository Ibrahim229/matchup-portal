import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Lang } from '../../enums/lang.enum';

@Injectable()
export class TranslationService {
  currentLanguage = new BehaviorSubject<any>(null);

  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  /**
   * Initialization the language assignments with files for the third party service
   * then set the language across the app
   */
  initLanguage() {
    const language = this.getLanguage();
    this.translate.setDefaultLang(language);
    this.setLanguage(language);
  }

  /**
   * set the language across the app
   * save the language in the local storage
   */
  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem(Lang.DEFAULT_LANGUAGE, lang);
    this.currentLanguage.next(lang);
  }

  /**
   * get the language from local storage, if none set language to English
   */
  getLanguage(): string {
    if (!localStorage.getItem(Lang.DEFAULT_LANGUAGE)) {
      localStorage.setItem(Lang.DEFAULT_LANGUAGE, Lang.english);
    }
    return localStorage.getItem(Lang.DEFAULT_LANGUAGE) as string;
  }

  /**
   * get the last updated language
   */
  get currentLanguage$(): Observable<string> {
    return this.currentLanguage.asObservable();
  }
}

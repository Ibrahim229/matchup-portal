import { Component, OnInit } from '@angular/core';
import { Lang } from 'src/app/modules/core/enums/lang.enum';
import { TranslationService } from 'src/app/modules/core/services/translation/translation.service';
import { LoaderService } from 'src/app/modules/shared/services/loader/loader.service';

@Component({
  selector: 'account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.scss']
})
export class AccountLayoutComponent implements OnInit {
  currentLang = ''

  constructor(private translationService: TranslationService, public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.getLang()
  }

  changeLang(lang: Lang | string) {
    this.translationService.setLanguage(lang)
  }

  getLang() {
    this.translationService.currentLanguage$.subscribe(res => {
      this.currentLang = res
    })
  }

  get Lang() {
    return Lang
  }

}

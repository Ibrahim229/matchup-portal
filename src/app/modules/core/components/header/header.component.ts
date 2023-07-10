import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation/translation.service';
import { Lang } from '../../enums/lang.enum';
import { AuthLogicService } from '../../services/auth-logic/auth-logic.service';
import { UserData } from '../../_models/login-response';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentLanguage!: string;
  isMenuOpened: boolean = false;
  currentUser!: UserData;

  constructor(
    private translationService: TranslationService,
    private authLogicService: AuthLogicService
  ) {}

  ngOnInit(): void {
    this.currentLanguage = this.translationService.getLanguage();
    this.currentUser = JSON.parse(
      localStorage.getItem('currentUser') as string
    );
  }

  changeLang(lang: Lang | string) {
    this.translationService.setLanguage(lang);
    this.currentLanguage = lang;
  }

  handleLogout() {
    this.authLogicService.logout();
  }
}

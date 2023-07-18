import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation/translation.service';
import { RoleType } from '../../enums/role.enum';
import { isHasRole } from 'src/app/modules/shared/utils/isHasRole';

@Component({
  selector: 'content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent implements OnInit {
  RoleType = RoleType;

  menuItems = [
    this.isHasRole(RoleType.Admin) && {
      id: 'PITCH',
      label: 'PITCH.PITCHES_MANAGEMENT',
      iconClasses: 'fa fa-light fa-house fa-fw',
      route: '/pitches/',
    },
    this.isHasRole(RoleType.Super_Admin) && {
      id: 'ACCOUNT_MANAGEMET',
      label: 'ACCOUNT.ACCOUNT_MANAGEMENT',
      iconClasses: 'fa fa-solid fa-users fa-fw',
      route: '/account/',
    },
    this.isHasRole(RoleType.Super_Admin) && {
      id: 'RECOMMENDATION',
      label: 'PITCH.RECOMMENDATIONS',
      iconClasses: 'fa fa-regular fa-bookmark fa-fw',
      route: '/recommendations/',
    },
    this.isHasRole(RoleType.Super_Admin) && {
      id: 'ANALYTICS',
      label: 'LABELS.ANALYTICS',
      iconClasses: 'fa fa-solid fa-chart-simple fa-fw',
      route: '/portal/analytics',
    },
    // !this.isHasRole(RoleType.Tenant) && {
    //   id: 'PROPERTIES',
    //   label: 'LABELS.PROPERTIES',
    //   iconClasses: 'fa fa-light fa-building fa-fw',
    //   route: '/property/',
    // },
    // {
    //   id: 'RESEDENTIAL_CONTRACTS',
    //   label: 'LABELS.RESIDENTIAL_CONTRACTS',
    //   iconClasses: 'fa fa-light fa-file-contract fa-fw',
    //   route: '/contracts/residential',
    // },
    // {
    //   id: 'COMMERCIAL_CONTRACTS',
    //   label: 'LABELS.COMMERCIAL_CONTRACTS',
    //   iconClasses: 'fa fa-light fa-file-signature fa-fw',
    //   route: '/contracts/commercial',
    // },
    // {
    //   id: 'HANDING_OVER_UNITS',
    //   label: 'LABELS.HANDING_OVER_UNITS',
    //   iconClasses: 'fa fa-light fa-building-flag fa-fw',
    //   route: '/units/handing',
    // },
    // {
    //   id: 'RECEIVING_UNITS',
    //   label: 'LABELS.RECEIVING_UNITS',
    //   iconClasses: 'fa fa-light fa-house-circle-check fa-fw',
    //   route: '/units/receive',
    // },
    // this.isHasRole(RoleType.Super_Admin) && {
    //   id: 'PAYMENTS',
    //   label: 'PAYMENTS.PAYMENTS',
    //   iconClasses: 'fa fa-solid fa-credit-card fa-fw',
    //   route: '/payments/',
    // },
  ];
  constructor(private translationService: TranslationService) {
    // translationService.setLanguage('en');
  }
  ngOnInit(): void {}

  isHasRole(role: RoleType) {
    return isHasRole(role);
  }
}

import { Component, OnInit } from '@angular/core';
import { RoleType } from 'src/app/modules/core/enums/role.enum';
import { InputTypes } from 'src/app/modules/shared/enums/form-input-types.enum';
import { Subscriptions } from 'src/app/modules/shared/utils/subscriptions';
import { AccountService } from '../../services/account/account.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { TranslationService } from 'src/app/modules/core/services/translation/translation.service';
import { IDataTable } from 'src/app/modules/shared/_models/data-table.model';
import { ConfirmationDialog } from 'src/app/modules/shared/_models/dialog-confirmation.model';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/confirm-dialog/confirm-dialog.component';
import { isHasRole } from 'src/app/modules/shared/utils/isHasRole';
import { RegisterUserModalComponent } from '../../components/register-user-modal/register-user-modal.component';

@Component({
  selector: 'app-portal-analytics',
  templateUrl: './portal-analytics.component.html',
  styleUrls: ['./portal-analytics.component.scss'],
})
export class PortalAnalyticsComponent implements OnInit{
  usersTable$: Observable<IDataTable<any>> = of({
    data: [],
    pageIndex: 0,
    length: 0,
    emptyState: 'No Data Found!',
  });
  subs = new Subscriptions();
  InputTypes = InputTypes;
  RoleType = RoleType;

  constructor(
    private accountService: AccountService,
    public dialog: MatDialog,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.subs.add = this.translationService.currentLanguage$.subscribe(() => {
      this.getSystemAnalytics();
    });
  }

  getSystemAnalytics() {
    this.subs.add = this.accountService.getSystemAnalytics().subscribe((res) => {
      this.usersTable$ = of({
        data: res,
        pageIndex: 1,
        length: res.length,
        emptyState: 'LABELS.NO_DATA',
      });
    });
  }

  isHasRole(role: RoleType) {
    return isHasRole(role);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

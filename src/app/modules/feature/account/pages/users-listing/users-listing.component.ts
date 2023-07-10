import { Component, OnInit } from '@angular/core';
import { IDataTable } from 'src/app/modules/shared/_models/data-table.model';
import { Observable, debounceTime, of } from 'rxjs';
import { ConfirmationDialog } from 'src/app/modules/shared/_models/dialog-confirmation.model';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslationService } from 'src/app/modules/core/services/translation/translation.service';
import { Subscriptions } from 'src/app/modules/shared/utils/subscriptions';
import { RoleType } from 'src/app/modules/core/enums/role.enum';
import { isHasRole } from 'src/app/modules/shared/utils/isHasRole';
import { AccountService } from '../../services/account/account.service';
import { InputTypes } from 'src/app/modules/shared/enums/form-input-types.enum';
import { RegisterUserModalComponent } from '../../components/register-user-modal/register-user-modal.component';

@Component({
  selector: 'users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss'],
})
export class UsersListingComponent implements OnInit {
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
      this.getAdminUsers();
    });
  }

  getAdminUsers() {
    this.subs.add = this.accountService.getAdminUsers().subscribe((res) => {
      this.usersTable$ = of({
        data: res,
        pageIndex: 1,
        length: res.length,
        emptyState: 'LABELS.NO_DATA',
      });
    });
  }

  handleRemoveUser(userId: string) {
    const dialogData: ConfirmationDialog = {
      title: `ACTIONS.DELETE_USER`,
      message: 'LABELS.FORM.ARE_YOU_SURE',
      actionLabel: 'ACTIONS.DELETE',
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '550px',
      minWidth: '500px',
      data: dialogData,
    });
    return dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.subs.add = this.accountService.deleteUser(userId).subscribe(() => {
          this.getAdminUsers();
        });
      } else {
        return res;
      }
    });
  }

  handleRegisterUser() {
    const dialogRef = this.dialog.open(RegisterUserModalComponent, {
      maxWidth: '550px',
      minWidth: '500px',
      disableClose: true,
    });
    return dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getAdminUsers();
      } else {
        return res;
      }
    });
  }

  isHasRole(role: RoleType) {
    return isHasRole(role);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

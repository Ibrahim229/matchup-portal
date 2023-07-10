import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDataTable } from 'src/app/modules/shared/_models/data-table.model';
import { Observable, of } from 'rxjs';
import { InputTypes } from 'src/app/modules/shared/enums/form-input-types.enum';
import { TranslationService } from 'src/app/modules/core/services/translation/translation.service';
import { Lang } from 'src/app/modules/core/enums/lang.enum';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmationDialog } from 'src/app/modules/shared/_models/dialog-confirmation.model';
import { MatDialog } from '@angular/material/dialog';
import { RoleType } from 'src/app/modules/core/enums/role.enum';
import { Subscriptions } from 'src/app/modules/shared/utils/subscriptions';
import { isHasRole } from 'src/app/modules/shared/utils/isHasRole';
import { PitchService } from '../../services/pitch/pitch.service';
import { ToastrService } from 'src/app/modules/shared/services/toastr/toastr.service';
import { ToastrTypes } from 'src/app/modules/shared/enums/toastrTypes';

@Component({
  selector: 'pitch-listing',
  templateUrl: './pitch-listing.component.html',
  styleUrls: ['./pitch-listing.component.scss'],
})
export class PitchListingComponent implements OnInit, OnDestroy {
  pitchTable$: Observable<IDataTable<any>> = of({
    data: [],
    length: 0,
    pageSize: 0,
    pageIndex: 0,
    emptyState: 'No Data Found!',
  });
  subs = new Subscriptions();
  RoleType = RoleType;
  currentLang!: string;
  Lang = Lang;
  InputTypes = InputTypes;

  constructor(
    private pitchService: PitchService,
    public dialog: MatDialog,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPitches();
  }

  handleRemovePitch(pitchId: string) {
    const dialogData: ConfirmationDialog = {
      title: `PITCH.DELETE_PITCH`,
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
        this.pitchService.deletePitch(pitchId).subscribe((res) => {
          if (res.deleted) {
            this.toastrService.showToastr(res.message, ToastrTypes.success);
            this.getPitches();
          }
        });
      } else {
        return res;
      }
    });
  }

  getPitches() {
    this.subs.add = this.pitchService.getPitches().subscribe((res) => {
      this.pitchTable$ = of({
        data: res,
        length: res.length,
        pageIndex: 1,
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

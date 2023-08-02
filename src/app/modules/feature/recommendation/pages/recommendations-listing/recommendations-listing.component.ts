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
import { InputTypes } from 'src/app/modules/shared/enums/form-input-types.enum';
import { RecommenrdationService } from '../../services/recommendation/recommendation.service';
import { AddRecommendationModalComponent } from '../../components/add-recommendation-modal/add-recommendation-modal.component';
import { ToastrService } from 'src/app/modules/shared/services/toastr/toastr.service';
import { ToastrTypes } from 'src/app/modules/shared/enums/toastrTypes';

@Component({
  selector: 'recommendations-listing',
  templateUrl: './recommendations-listing.component.html',
  styleUrls: ['./recommendations-listing.component.scss'],
})
export class RecommendationsListingComponent implements OnInit {
  recommendationsTable$: Observable<IDataTable<any>> = of({
    data: [],
    pageIndex: 0,
    length: 0,
    emptyState: 'No Data Found!',
  });
  subs = new Subscriptions();
  InputTypes = InputTypes;
  RoleType = RoleType;

  constructor(
    private recommendationService: RecommenrdationService,
    public dialog: MatDialog,
    private translationService: TranslationService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.subs.add = this.translationService.currentLanguage$.subscribe(() => {
      this.getRecommendations();
    });
  }

  getRecommendations() {
    this.subs.add = this.recommendationService
      .getRecommendations()
      .subscribe((res) => {
        this.recommendationsTable$ = of({
          data: res,
          pageIndex: 1,
          length: res.length,
          emptyState: 'LABELS.NO_DATA',
        });
      });
  }

  handleRemoveRecommendation(recommendationID: string) {
    const dialogData: ConfirmationDialog = {
      title: `RECOMMENDATIONS.DELETE_RECOMMENDATION`,
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
        this.subs.add = this.recommendationService
          .deleteRecommendation(recommendationID)
          .subscribe((res) => {
            if (!res.error) {
              this.toastrService.showToastr(res.message, ToastrTypes.success);
              this.getRecommendations();
            }
          });
      } else {
        return res;
      }
    });
  }

  handleAddRecommendation() {
    const dialogRef = this.dialog.open(AddRecommendationModalComponent, {
      maxWidth: '550px',
      minWidth: '500px',
      disableClose: true,
    });
    return dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getRecommendations();
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

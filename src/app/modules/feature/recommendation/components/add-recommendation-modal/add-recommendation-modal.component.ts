import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InputTypes } from 'src/app/modules/shared/enums/form-input-types.enum';
import { RegisterUserModalComponent } from '../../../account/components/register-user-modal/register-user-modal.component';
import { AccountService } from '../../../account/services/account/account.service';
import { RecommenrdationService } from '../../services/recommendation/recommendation.service';
import { Subscriptions } from 'src/app/modules/shared/utils/subscriptions';
import { ToastrService } from 'src/app/modules/shared/services/toastr/toastr.service';
import { ToastrTypes } from 'src/app/modules/shared/enums/toastrTypes';

@Component({
  selector: 'add-recommendation-modal',
  templateUrl: './add-recommendation-modal.component.html',
  styleUrls: ['./add-recommendation-modal.component.scss'],
})
export class AddRecommendationModalComponent implements OnInit {
  InputTypes = InputTypes;
  isNewRecommendationSubmitting = false;
  selectedPitch = new FormControl('', Validators.required);
  recommendationsList = [];
  subs = new Subscriptions();
  isLoadingRecommendations = false;

  constructor(
    public dialogRef: MatDialogRef<RegisterUserModalComponent>,
    private recommendationService: RecommenrdationService,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.subs.add = this.recommendationService
      .getRecommendationsListing()
      .subscribe((res) => {
        if (!res.error) {
          this.recommendationsList = res;
        }
      });
  }

  getRecommendationsListing() {
    this.isLoadingRecommendations = true;
    this.subs.add = this.recommendationService
      .getRecommendationsListing()
      .subscribe((res) => {
        if (!res.error) {
          this.recommendationsList = res;
          this.isLoadingRecommendations = false;
        }
      });
  }

  onAddRecommendation() {
    this.isNewRecommendationSubmitting = true;
    this.recommendationService
      .addRecommendation(this.selectedPitch.value)
      .subscribe((res) => {
        if (!res.error) {
          this.toastrService.showToastr(res.message, ToastrTypes.success);
          this.dialogRef.close(true);
        }
        this.isNewRecommendationSubmitting = false;
      });
  }

  onDismiss() {
    this.dialogRef.close(true);
  }
}

import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InputTypes } from 'src/app/modules/shared/enums/form-input-types.enum';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslationService } from 'src/app/modules/core/services/translation/translation.service';
import { Subscriptions } from 'src/app/modules/shared/utils/subscriptions';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'src/app/modules/shared/services/toastr/toastr.service';
import { PitchService } from '../../services/pitch/pitch.service';
import { Lang } from 'src/app/modules/core/enums/lang.enum';
import { GroundType } from '../../enums/ground-type.enum';
import { PitchSetting } from '../../enums/pitch-setting.enum';
import { GoogleMap } from '@angular/google-maps';
import { ToastrTypes } from 'src/app/modules/shared/enums/toastrTypes';
import { numbersOnlyValidator } from 'src/app/modules/shared/utils/custom-validator';
import { ConfirmationDialog } from 'src/app/modules/shared/_models/dialog-confirmation.model';
import { ConfirmDialogComponent } from 'src/app/modules/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'add-edit-pitch',
  templateUrl: './add-edit-pitch.component.html',
  styleUrls: ['./add-edit-pitch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditPitchComponent implements OnInit, OnDestroy, AfterViewInit {
  addEditPitch!: FormGroup;
  currentLang!: string;
  InputTypes = InputTypes;
  stepperOrientation: Observable<StepperOrientation>;
  selectedIndex: number = 0;
  allowedTypes = ['pdf', 'png', 'jpeg', 'tiff'];
  subs = new Subscriptions();
  editMode: boolean = false;
  oldAttachments: any[] = [];
  pitchId: any;
  Lang = Lang;
  groundTypes = [GroundType.GRASS, GroundType.TARTAN];
  pitchSettingTypes = [PitchSetting.INDOOR, PitchSetting.OUTDOOR];
  pitchAttachments = [];
  testFiles = [];
  options: google.maps.MapOptions = {
    center: { lat: 30.033333, lng: 31.233334 },
    zoom: 13,
  };
  @ViewChild('mapSearchField') searchField: ElementRef;
  @ViewChild(GoogleMap) map: GoogleMap;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  addedAttachments = [];

  constructor(
    private fb: FormBuilder,
    private pitchService: PitchService,
    private translationService: TranslationService,
    breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.addEditPitch = this.fb.group({
      pitchDetails: this.fb.group({
        id: [null],
        name: ['', [Validators.required]],
        description: [''],
        price: [
          null,
          [Validators.required, numbersOnlyValidator(), Validators.min(1)],
        ],
        groundType: ['', [Validators.required]],
        pitchSetting: ['', [Validators.required]],
        playersNumber: [
          '',
          [
            Validators.required,
            numbersOnlyValidator(),
            Validators.min(1),
            Validators.max(11),
          ],
        ],
        location: this.fb.group({
          type: 'Point',
          coordinates: [''],
        }),
      }),
      attachments: this.fb.group({
        images: [''],
      }),
    });

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.pitchId = params['id'];
    });

    this.subs.add = this.translationService.currentLanguage$.subscribe(
      (language) => {
        this.currentLang = language;
      }
    );
    this.pitchId && this.getPitchDetails();
  }

  ngAfterViewInit(): void {
    const searchBox = new google.maps.places.SearchBox(
      this.searchField.nativeElement
    );
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchField.nativeElement
    );

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    });
  }

  getPitchDetails() {
    this.editMode = true;
    this.pitchService.getPitches().subscribe((res: any) => {
      const pitches = res;
      const currentPitch = pitches.find((pitch) => pitch._id === this.pitchId);
      const pitchRes = {
        pitchDetails: {
          id: currentPitch._id,
          name: currentPitch.name,
          description: currentPitch.description,
          price: currentPitch.price,
          groundType: currentPitch.groundType,
          pitchSetting: currentPitch.pitchSetting,
          playersNumber: currentPitch.playersNumber,
          location: {
            type: 'Point',
            coordinates: currentPitch.coordinates,
          },
        },
        attachments: {
          images: currentPitch.pitchPic,
        },
      };

      this.addEditPitch.patchValue(pitchRes);
      this.markerPositions.push({
        lat: currentPitch.location.coordinates[0],
        lng: currentPitch.location.coordinates[1],
      });
      this.oldAttachments = currentPitch.pitchPic;
    });
  }

  onAttachmentsChange(selectedFiles: any) {
    this.pitchAttachments = selectedFiles;
    this.oldAttachments = selectedFiles;
  }

  onAppendAttachmentsChange(addedAttachments) {
    this.addedAttachments = addedAttachments;
  }

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions = [];
    if (this.markerPositions.length === 0)
      this.markerPositions.push(event.latLng.toJSON());
  }

  onSelection(e: StepperSelectionEvent) {
    this.selectedIndex = e.selectedIndex;
  }

  handleNext() {
    this.selectedIndex < 3 && this.selectedIndex++;
  }

  handleBack() {
    this.selectedIndex > 0 && this.selectedIndex--;
  }

  handleCancel() {
    this.router.navigateByUrl('/pitches');
  }

  formControl(subForm: string, key: string) {
    return this.addEditPitch?.get(subForm)?.get(key) as FormControl;
  }

  formGroup(key: string) {
    return this.addEditPitch?.get(key) as FormGroup;
  }

  OnRemoveAttachment(imageToRemove) {
    const dialogData: ConfirmationDialog = {
      title: `PITCH.DELETE_IMAGE`,
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
        const payload = {
          imageUrl: imageToRemove.item,
        };
        this.pitchService
          .deletePitchAttachment(this.pitchId, payload)
          .subscribe((res) => {
            if (res.deleted) {
              this.toastrService.showToastr(res.message, ToastrTypes.success);
              // this.pitchAttachments.splice(imageToRemove.index, 1);
              this.oldAttachments.splice(imageToRemove.index, 1);
              this.cdr.detectChanges();
            }
          });
      } else {
        return res;
      }
    });
  }

  onSubmitPitch(form: FormGroup) {
    const formData = new FormData();

    if (this.addedAttachments.length > 0 && this.editMode) {
      for (let i = 0; i < this.addedAttachments.length; i++) {
        const file = this.addedAttachments[i];
        formData.append('images', file, file.name);
      }
    } else if (!this.editMode) {
      for (let i = 0; i < this.pitchAttachments.length; i++) {
        const file = this.pitchAttachments[i];
        formData.append('images', file, file.name);
      }
    }

    formData.append('name', this.formControl('pitchDetails', 'name').value);
    formData.append(
      'description',
      this.formControl('pitchDetails', 'description').value
    );
    formData.append('price', this.formControl('pitchDetails', 'price').value);
    formData.append(
      'groundType',
      this.formControl('pitchDetails', 'groundType').value
    );
    formData.append(
      'pitchSetting',
      this.formControl('pitchDetails', 'pitchSetting').value
    );
    formData.append(
      'playersNumber',
      this.formControl('pitchDetails', 'playersNumber').value
    );

    const coords = [this.markerPositions[0].lat, this.markerPositions[0].lng];
    this.formControl('pitchDetails', 'location')
      .get('coordinates')
      .setValue(coords);

    formData.append(
      'location',
      JSON.stringify(this.formControl('pitchDetails', 'location').value)
    );

    let selectedService;
    if (this.editMode) {
      selectedService = this.pitchService.editPitch(this.pitchId, formData);
    } else {
      selectedService = this.pitchService.createPitch(formData);
    }
    selectedService.subscribe(
      (res) => {
        if (!res.ok) {
          this.toastrService.showToastr(res.message, ToastrTypes.success);
          this.router.navigateByUrl('/pitches');
        }
      },
      () => {
        this.toastrService.showToastr(
          `An error occured when executing the create statement ,try again !`,
          ToastrTypes.error
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

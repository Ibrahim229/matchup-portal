import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from 'src/app/modules/core/services/translation/translation.service';
import { Subscriptions } from 'src/app/modules/shared/utils/subscriptions';
import { PitchService } from '../../services/pitch/pitch.service';
import { Url } from 'src/app/modules/shared/_models/url.enum';
declare var $: any; // Declare the jQuery variable

@Component({
  selector: 'property-details',
  templateUrl: './pitch-details.component.html',
  styleUrls: ['./pitch-details.component.scss'],
})
export class PitchDetailsComponent implements OnInit, OnDestroy {
  pitchId: string;
  pitchDetails: any;
  currentLang: string;
  subs = new Subscriptions();
  @ViewChild('carousel') carousel: ElementRef;
  selectedIndex = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translationService: TranslationService,
    private pitchService: PitchService
  ) {
    this.subs.add = this.translationService.currentLanguage$.subscribe(
      (language) => {
        this.currentLang = language;
      }
    );
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.pitchId = params['id'];
      this.getPitchDetails();
    });
  }

  getPitchDetails() {
    this.pitchService.getPitches().subscribe((res: any) => {
      const pitches = res;
      this.pitchDetails = pitches.find((pitch) => pitch._id === this.pitchId);
    });
  }

  generateMapImageUrl(location) {
    const zoom = 17;
    const imageSize = '600x300';
    const markerParams = `&markers=color:red%7C${location?.coordinates[0]},${location?.coordinates[1]}`;

    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${location?.coordinates[0]},${location?.coordinates[1]}&zoom=${zoom}&size=${imageSize}&key=${Url.GOOGLE_MAP_API_KEY}${markerParams}`;

    return url;
  }

  prevSlide() {
    $(this.carousel.nativeElement).carousel('prev');
  }

  nextSlide() {
    $(this.carousel.nativeElement).carousel('next');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

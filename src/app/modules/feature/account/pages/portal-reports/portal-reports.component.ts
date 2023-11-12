import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  firstDateOfMonth,
  lastDateOfMonth,
} from '@syncfusion/ej2-angular-schedule';
import {
  Observable,
  combineLatest,
  debounceTime,
  map,
  of,
  startWith,
} from 'rxjs';

import {
  Filters,
  Status,
} from 'src/app/modules/feature/account/models/reports.model';
import { AccountService } from 'src/app/modules/feature/account/services/account/account.service';
import { InputTypes } from 'src/app/modules/shared/enums/form-input-types.enum';
import { Subscriptions } from 'src/app/modules/shared/utils/subscriptions';

@Component({
  selector: 'portal-reports',
  templateUrl: './portal-reports.component.html',
  styleUrls: ['./portal-reports.component.scss'],
})
export class PortalReportsComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly accountService = inject(AccountService);
  private readonly subs = new Subscriptions();
  public readonly InputTypes = InputTypes;

  private currentDate = new Date();
  public statusList = [
    { key: Status.Booked, value: 'Booked' },
    { key: Status.Cancelled, value: 'Cancelled' },
  ];
  public filters = this.fb.group({
    search: '',
    startDate: firstDateOfMonth(this.currentDate),
    endDate: lastDateOfMonth(this.currentDate),
    status: Status.Booked,
  });
  public reportsData$: Observable<any> = of({
    data: [],
    emptyState: 'No Data Found!',
  });

  ngOnInit(): void {
    this.subs.add = this.filters.controls.search.valueChanges
      .pipe(debounceTime(300))
      .subscribe((search) => {
        const filters = { ...this.filters.value, search };
        this.getSystemReports(filters);
      });

    this.subs.add = combineLatest({
      status: this.filters.controls.status.valueChanges.pipe(
        startWith(Status.Booked)
      ),
      endDate: this.filters.controls.endDate.valueChanges.pipe(
        startWith(lastDateOfMonth(this.currentDate))
      ),
    }).subscribe((filters) => {
      if (filters.endDate !== null && filters.status !== null) {
        this.getSystemReports({ ...this.filters.value, ...filters });
      }
    });
  }

  private getSystemReports(filters: Filters) {
    this.reportsData$ = this.accountService.getSystemReports(filters).pipe(
      map((response) => ({
        data: response?.items ?? [],
      }))
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

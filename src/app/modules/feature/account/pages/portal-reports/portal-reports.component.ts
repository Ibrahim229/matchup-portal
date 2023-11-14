import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { firstDateOfMonth, lastDateOfMonth } from '@syncfusion/ej2-angular-schedule';
import { Observable, combineLatest, debounceTime, map, of, startWith } from 'rxjs';

import { Filters, Status } from 'src/app/modules/feature/account/models/reports.model';
import { AccountService } from 'src/app/modules/feature/account/services/account/account.service';
import { InputTypes } from 'src/app/modules/shared/enums/form-input-types.enum';
import { Subscriptions } from 'src/app/modules/shared/utils/subscriptions';

type Sort = 'asc' | 'desc' | null;

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
    { key: Status.Current, value: 'Current' },
    { key: Status.Booked, value: 'Booked' },
    { key: Status.Cancelled, value: 'Cancelled' },
  ];
  public filters = this.fb.group({
    search: '',
    startDate: firstDateOfMonth(this.currentDate),
    endDate: lastDateOfMonth(this.currentDate),
    status: Status.Current,
    countOrder: this.fb.control<Sort>(null),
    startDateOrder: this.fb.control<Sort>(null),
    rateOrder: this.fb.control<Sort>(null),
    paymentOrder: this.fb.control<Sort>(null),
  });
  public reportsData$: Observable<any> = of({
    data: [],
    emptyState: 'No Data Found!',
  });

  ngOnInit(): void {
    this.subs.add = this.filters.controls.search.valueChanges.pipe(debounceTime(300)).subscribe((search) => {
      const filters = { ...this.filters.value, search };
      this.getSystemReports(filters);
    });

    this.subs.add = combineLatest({
      status: this.filters.controls.status.valueChanges.pipe(startWith(Status.Current)),
      endDate: this.filters.controls.endDate.valueChanges.pipe(startWith(lastDateOfMonth(this.currentDate))),
      countOrder: this.filters.controls.countOrder.valueChanges.pipe(startWith(null)),
      startDateOrder: this.filters.controls.startDateOrder.valueChanges.pipe(startWith(null)),
      rateOrder: this.filters.controls.rateOrder.valueChanges.pipe(startWith(null)),
      paymentOrder: this.filters.controls.paymentOrder.valueChanges.pipe(startWith(null)),
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

  public toggleSort(key: keyof typeof this.filters.controls) {
    const control = this.filters.get(key) as FormControl<Sort>;
    const oldValue = control.value;

    switch (oldValue) {
      case 'asc':
        control.setValue('desc');
        break;

      case 'desc':
        control.setValue(null);
        break;

      case null:
        control.setValue('asc');
        break;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

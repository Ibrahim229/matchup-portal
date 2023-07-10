import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  TemplateRef,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IDataTable } from '../../_models/data-table.model';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnChanges {
  @Input() dataSource!: IDataTable<unknown>;
  @Input() pagination = true;
  @Output() pageChange = new EventEmitter<PageEvent>();
  @ContentChild('tableHead') tableHead!: TemplateRef<Element> | null;
  @ContentChild('tableRows') tableRows!: TemplateRef<Element> | null;
  length = 0;
  pageIndex = 0;
  pageSize = 12;

  constructor() {}

  ngOnChanges(): void {
    this.length = this.dataSource?.length;
    this.pageIndex = this.dataSource?.pageIndex - 1;
    this.pageSize = this.dataSource?.pageSize || this.pageSize;
  }

  getData(event?: PageEvent) {
    this.pageChange.emit(event);
    return event;
  }
}

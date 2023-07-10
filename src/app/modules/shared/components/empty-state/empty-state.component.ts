import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEmptyState } from '../../_models/empty-state.model';
@Component({
  selector: 'empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent implements OnInit {
  @Input() emptyStateConfig!: IEmptyState;
  @Output() buttonClick: EventEmitter<null> = new EventEmitter<null>();
  constructor() {}

  ngOnInit(): void {}
}

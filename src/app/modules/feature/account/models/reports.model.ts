export enum Status {
  Current = 'Active',
  Booked = 'OutDated',
  Cancelled = 'Cancelled',
}

export type Filters = Partial<{
  search: string;
  startDate: Date;
  endDate: Date;
  status: Status;
}>;

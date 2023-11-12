export enum Status {
  Booked = 'OutDated',
  Cancelled = 'Cancelled',
}

export type Filters = Partial<{
  search: string;
  startDate: Date;
  endDate: Date;
  status: Status;
}>;

import { LookupType } from '../enums/lookup-type.enum';

export interface LookupPayload {
  dataObjectEnum: LookupType;
  request: string;
}

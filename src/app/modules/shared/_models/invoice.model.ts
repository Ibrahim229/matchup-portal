export interface Invoice {
  issuingDate: Date;
  dueDate: Date;
  totalInvoiceValue: number;
  totalTenantInvoiceValue: number;
  feesInvoiceValue: number;
  rentInvoiceValue: number;
  TaxesAmount: number;
  managementOperationRatio: number;
  refundableInsurance: number;
}

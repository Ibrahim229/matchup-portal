import { PaymentWay } from '../enums/payment-way.enum';
import { Invoice } from '../_models/invoice.model';

export function generateInstallmentPlanTable(
  issuingDate: Date,
  servicesFees: number,
  rentalFees: number,
  installmentPlan: PaymentWay,
  monthDifference: number,
  totalTaxesAmount: number = 0,
  insuranceAmount: number = 0,
  managementOperationPercent: number
): Invoice[] {
  const invoices: Invoice[] = [];

  let currentIssuingDate = new Date(issuingDate);
  let currentDueDate = new Date(
    issuingDate.getTime() + 10 * 24 * 60 * 60 * 1000
  );

  let totalInvoiceValue: number;
  let numOfInstallments: number;
  let numOfDays: number;
  let TaxesAmount: number;

  if (installmentPlan === PaymentWay.Monthly) {
    numOfInstallments = 12;
    numOfDays = 30000;
    numOfInstallments = monthDifference;
  } else if (installmentPlan === PaymentWay.Quarterly) {
    numOfInstallments = 4;
    numOfDays = 90000;
    numOfInstallments = monthDifference / 3;
  } else if (installmentPlan === PaymentWay.SemiAnnual) {
    numOfInstallments = 2;
    numOfDays = 182000;
    numOfInstallments = monthDifference / 6;
  } else {
    numOfInstallments = 1;
    numOfDays = 365000;
  }

  totalInvoiceValue = +(
    (servicesFees + rentalFees) /
    Math.round(numOfInstallments)
  ).toFixed(2);

  if (totalTaxesAmount > 0) {
    TaxesAmount = +(totalTaxesAmount / Math.round(numOfInstallments)).toFixed(
      2
    );
  }

  invoices.push({
    issuingDate: currentIssuingDate,
    dueDate: currentDueDate,
    totalInvoiceValue:
      numOfInstallments === 0
        ? (servicesFees + rentalFees) / 1
        : totalInvoiceValue,
    totalTenantInvoiceValue: totalInvoiceValue + insuranceAmount,
    feesInvoiceValue: +(servicesFees / Math.round(numOfInstallments)).toFixed(
      2
    ),
    rentInvoiceValue: 0,
    TaxesAmount: TaxesAmount ? TaxesAmount : 0,
    managementOperationRatio: +Math.round(
      totalInvoiceValue * (managementOperationPercent / 100) +
        totalInvoiceValue * (managementOperationPercent / 100) * 0.15
    ),
    refundableInsurance: insuranceAmount,
  });

  for (let i = 1; i < numOfInstallments; i++) {
    currentIssuingDate = new Date(
      currentIssuingDate.getTime() + 1 * 24 * 60 * 60 * numOfDays
    );
    currentDueDate = new Date(
      currentIssuingDate.getTime() + 10 * 24 * 60 * 60 * 1000
    );
    // let missingTotalAmount;
    // let missingTaxAmount;
    // if (i === numOfInstallments - 1) {
    //   missingTotalAmount = +(
    //     servicesFees +
    //     rentalFees -
    //     (totalInvoiceValue * numOfInstallments - 1)
    //   ).toFixed(2);
    //   missingTaxAmount = +(
    //     totalTaxesAmount -
    //     (TaxesAmount * numOfInstallments - 1)
    //   ).toFixed(2);
    // }
    invoices.push({
      issuingDate: currentIssuingDate,
      dueDate: currentDueDate,
      totalInvoiceValue:
        i === numOfInstallments - 1 ? totalInvoiceValue : totalInvoiceValue,
      feesInvoiceValue: +(servicesFees / Math.round(numOfInstallments)).toFixed(
        2
      ),
      totalTenantInvoiceValue:
        i === numOfInstallments - 1 ? totalInvoiceValue : totalInvoiceValue,
      rentInvoiceValue: 0,
      TaxesAmount: i === numOfInstallments - 1 ? TaxesAmount : TaxesAmount,
      managementOperationRatio: +Math.round(
        totalInvoiceValue * (managementOperationPercent / 100) +
          totalInvoiceValue * (managementOperationPercent / 100) * 0.15
      ),
      refundableInsurance: 0,
    });
  }
  return invoices;
}

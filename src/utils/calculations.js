// Functions to perform calculations (NOI, CoC, etc.)

// Calculate the monthly mortgage payment based on loan amount, interest rate, and loan term
export function calculateMortgagePayment(loanAmount, interestRate, term) {
  const rate = interestRate / 12;
  const numOfPayments = term * 12;
  const monthlyPayment =
    (loanAmount * rate * Math.pow(1 + rate, numOfPayments)) /
    (Math.pow(1 + rate, numOfPayments) - 1);

  return monthlyPayment;
}

// Estimate the expenses (tax, insurance, maintenance, etc.) based on property and rental data
export function estimateExpenses(property, rentalData) {
  const tax = property.propertyTaxRate * property.price;
  const insurance = property.insuranceRate * property.price;
  const maintenance = rentalData.maintenanceCost;
  const managementFees = rentalData.managementFeeRate * rentalData.grossRent;

  return {
    tax,
    insurance,
    maintenance,
    managementFees,
  };
}

// Calculate Net Operating Income (NOI) based on rental data and expenses
export function calculateNOI(rentalData, expenses) {
  const grossRent = rentalData.grossRent;
  const totalExpenses =
    expenses.tax +
    expenses.insurance +
    expenses.maintenance +
    expenses.managementFees;

  return grossRent - totalExpenses;
}

// Calculate Cash-on-Cash return (CoC) based on NOI, downPayment, and mortgage payment
export function calculateCoC(NOI, downPayment, mortgagePayment) {
  const annualNOI = NOI * 12;
  const annualMortgagePayment = mortgagePayment * 12;
  const cashFlow = annualNOI - annualMortgagePayment;

  return (cashFlow / downPayment) * 100;
}

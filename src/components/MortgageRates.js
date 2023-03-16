import React from "react";

const MortgageRates = ({ mortgageData }) => {
  const { insurance_rate, property_tax_rate, average_rates } = mortgageData;

  return (
    <div>
      <h2>Mortgage Rates</h2>
      <table>
        <thead>
          <tr>
            <th>Loan Type</th>
            <th>Term (Years)</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {average_rates.map((rateObj) => (
            <tr key={rateObj.loan_type.loan_id}>
              <td>{rateObj.loan_type.display_name}</td>
              <td>{rateObj.loan_type.term}</td>
              <td>{(rateObj.rate * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Insurance Rate: {(insurance_rate * 100).toFixed(2)}% | Property Tax
        Rate: {(property_tax_rate * 100).toFixed(2)}%
      </p>
    </div>
  );
};

export default MortgageRates;

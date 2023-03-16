import React from "react";

const PropertyForm = ({ onDownPaymentChange, onMortgageTermChange }) => {
  const handleDownPaymentChange = (event) => {
    onDownPaymentChange(event.target.value);
  };

  const handleMortgageTermChange = (event) => {
    onMortgageTermChange(event.target.value);
  };

  return (
    <form>
      <div>
        <label htmlFor="downPayment">Down Payment:</label>
        <input
          type="number"
          id="downPayment"
          name="downPayment"
          step="0.01"
          min="0"
          onChange={handleDownPaymentChange}
        />
      </div>
      <div>
        <label htmlFor="mortgageTerm">Mortgage Term (years):</label>
        <input
          type="number"
          id="mortgageTerm"
          name="mortgageTerm"
          min="1"
          onChange={handleMortgageTermChange}
        />
      </div>
    </form>
  );
};

export default PropertyForm;

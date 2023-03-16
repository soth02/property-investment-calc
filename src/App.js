import React, { useState, useEffect } from "react";
import PropertyMap from "./components/PropertyMap";
import PropertyForm from "./components/PropertyForm";
import Results from "./components/Results";
import MortgageRates from "./components/MortgageRates";
import { MapContainerProvider } from "./contexts/MapContainerContext";
import { fetchRentalData, fetchCurrentMortgageRates } from "./services/api";
import {
  calculateMortgagePayment,
  estimateExpenses,
  calculateNOI,
  calculateCoC,
} from "./utils/calculations";

function App() {
  const [propertyList, setPropertyList] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [downPayment, setDownPayment] = useState(0);
  const [mortgageTerm, setMortgageTerm] = useState(30);
  const [rentalData, setRentalData] = useState(null);
  const [mortgageData, setMortgageData] = useState(null);
  const [NOI, setNOI] = useState(0);
  const [CoC, setCoC] = useState(0);
  const [postalCode, setPostalCode] = useState("98006");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const rentalData = await fetchRentalData();
    const mortgageData = await fetchCurrentMortgageRates(postalCode);
    setRentalData(rentalData);
    setMortgageData(mortgageData.data.loan_analysis.market.mortgage_data);
  };

  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };

  const refreshMortgageRates = async () => {
    const mortgageData = await fetchCurrentMortgageRates(postalCode);
    setMortgageData(mortgageData.data.loan_analysis.market.mortgage_data);
  };

  return (
    <MapContainerProvider>
      <div className="App">
        <h1>Property Investment Calculator</h1>
        <label htmlFor="postal-code">Postal Code: </label>
        <input
          id="postal-code"
          type="text"
          value={postalCode}
          onChange={handlePostalCodeChange}
        />
        <button onClick={refreshMortgageRates}>Refresh Mortgage Rates</button>
        <PropertyMap
          propertyList={propertyList}
          onPropertySelect={setSelectedProperty}
        />
        <PropertyForm
          onDownPaymentChange={setDownPayment}
          onMortgageTermChange={setMortgageTerm}
        />
        {mortgageData ? (
          <MortgageRates mortgageData={mortgageData} />
        ) : (
          <p>Loading mortgage rates...</p>
        )}
        <Results NOI={NOI} CoC={CoC} />
      </div>
    </MapContainerProvider>
  );
}

export default App;

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
  const defaultProperty = {
    price: 500000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
  };

  const [propertyList, setPropertyList] = useState([
    {
      id: 1,
      price: 500000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2500,
      latitude: 47.6101,
      longitude: -122.2015,
    },
  ]);

  const [selectedProperty, setSelectedProperty] = useState(defaultProperty);
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

  useEffect(() => {
    if (!selectedProperty || !rentalData || !mortgageData) return;

    const mortgagePayment = calculateMortgagePayment(
      selectedProperty.price - downPayment,
      getSelectedMortgageRate(),
      mortgageTerm
    );
    const expenses = estimateExpenses(selectedProperty, rentalData);
    const NOI = calculateNOI(rentalData, expenses);
    const CoC = calculateCoC(NOI, downPayment, mortgagePayment);

    setNOI(NOI);
    setCoC(CoC);
  }, [selectedProperty, downPayment, mortgageTerm, rentalData, mortgageData]);

  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };

  const refreshMortgageRates = async () => {
    const mortgageData = await fetchCurrentMortgageRates(postalCode);
    setMortgageData(mortgageData.data.loan_analysis.market.mortgage_data);
  };

  function getSelectedMortgageRate() {
    if (!mortgageData || !mortgageData.average_rates) return 0;

    const selectedRate = mortgageData.average_rates.find(
      (rate) => rate.loan_type.term === mortgageTerm
    );
    return selectedRate ? selectedRate.rate : 0;
  }

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

import React, { useState, useEffect } from "react";
import PropertyMap from "./components/PropertyMap";
import PropertyForm from "./components/PropertyForm";
import Results from "./components/Results";
import { MapContainerProvider } from "./contexts/MapContainerContext";
import {
  fetchPropertyDataFromMLS,
  fetchRentalData,
  fetchCurrentMortgageRates,
} from "./services/api";
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
  const [mortgageRates, setMortgageRates] = useState(null);
  const [NOI, setNOI] = useState(0);
  const [CoC, setCoC] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const propertyData = await fetchPropertyDataFromMLS();
      const rentalData = await fetchRentalData();
      const mortgageRates = await fetchCurrentMortgageRates();
      setPropertyList(propertyData);
      setRentalData(rentalData);
      setMortgageRates(mortgageRates);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedProperty || !rentalData || !mortgageRates) return;

    const mortgagePayment = calculateMortgagePayment(
      selectedProperty.price,
      downPayment,
      mortgageTerm,
      mortgageRates
    );
    const expenses = estimateExpenses(selectedProperty, rentalData);
    const NOI = calculateNOI(rentalData, expenses);
    const CoC = calculateCoC(NOI, downPayment, mortgagePayment);

    setNOI(NOI);
    setCoC(CoC);
  }, [selectedProperty, downPayment, mortgageTerm, rentalData, mortgageRates]);

  return (
    <MapContainerProvider>
      <div className="App">
        <h1>Property Investment Calculator</h1>
        <PropertyMap
          propertyList={propertyList}
          onPropertySelect={setSelectedProperty}
        />
        <PropertyForm
          onDownPaymentChange={setDownPayment}
          onMortgageTermChange={setMortgageTerm}
        />
        <Results NOI={NOI} CoC={CoC} />
      </div>
    </MapContainerProvider>
  );
}

export default App;

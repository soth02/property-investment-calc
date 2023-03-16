const MLS_API_BASE_URL = "https://example-mls-api.com";
const RENTAL_API_BASE_URL = "https://example-rental-api.com";
const MORTGAGE_RATE_API_BASE_URL = "https://realty-in-us.p.rapidapi.com";

const MLS_API_KEY = "your-mls-api-key";
const RENTAL_API_KEY = "your-rental-api-key";
const MORTGAGE_RATE_API_KEY = "";

// ... Other API fetching functions ...

// Functions to fetch data from MLS, rental, and mortgage rate APIs
export async function fetchPropertyDataFromMLS() {
  // Mock property data for postal code 98006
  return [
    {
      id: 1,
      latitude: 47.5534,
      longitude: -122.1598,
      price: 900000,
    },
    {
      id: 2,
      latitude: 47.5619,
      longitude: -122.1491,
      price: 1200000,
    },
  ];
}

export async function fetchRentalData() {
  // Mock rental data
  return {
    monthlyRent: 3500,
    vacancyRate: 0.05,
    annualRentIncrease: 0.03,
  };
}

export async function fetchCurrentMortgageRates(postalCode) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": MORTGAGE_RATE_API_KEY,
      "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com",
    },
  };

  const url = `${MORTGAGE_RATE_API_BASE_URL}/mortgage/v2/check-rates?postal_code=${postalCode}`;
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Error fetching mortgage rates: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

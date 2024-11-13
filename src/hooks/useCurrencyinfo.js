import { useEffect, useState } from 'react';

function useCurrencyInfo(baseCurrency) {
  const [currencyInfo, setCurrencyInfo] = useState({});
  const API_KEY = "2defac4667cba8496b27cda6"; // Your API key

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`);
        const data = await response.json();

        if (data.result === "success") {
          setCurrencyInfo(data.conversion_rates); // Set conversion rates object
        } else {
          console.error("Error in response:", data.error_type);
          setCurrencyInfo({});
        }
      } catch (error) {
        console.error("Error fetching currency data:", error);
        setCurrencyInfo({});
      }
    };

    fetchCurrencyData();
  }, [baseCurrency]);

  return currencyInfo;
}

export default useCurrencyInfo;

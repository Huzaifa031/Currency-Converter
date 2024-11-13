import { useState } from 'react';
import InputBox from './components/InputBox';
import './App.css';
import useCurrencyInfo from './hooks/useCurrencyinfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const Currencyinfo = useCurrencyInfo(from);
  const options = Object.keys(Currencyinfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * Currencyinfo[to]);
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-blue-800 to-blue-400"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-1/3">
        <div className="w-full max-w-md mx-auto bg-white bg-opacity-60 border border-gray-300 rounded-2xl p-8 shadow-xl backdrop-blur-md">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold text-black mb-4 tracking-wide">Global Currency Converter</h1>
            <p className="text-lg text-black opacity-90">Stay ahead with accurate currency conversions</p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}>
            {/* From Currency */}
            <div className="w-full mb-6">
              <InputBox
                label="From"
                amount={amount}
                CurrencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>

            {/* Swap Button */}
            <div className="relative mb-6">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full bg-blue-600 text-white px-6 py-3 shadow-xl hover:bg-blue-500 transition duration-200 ease-in-out"
                onClick={swap}
              >
                Swap
              </button>
            </div>

            {/* To Currency */}
            <div className="w-full mb-6">
              <InputBox
                label="To"
                amount={convertedAmount}
                CurrencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
              />
            </div>

            {/* Convert Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:from-blue-500 hover:to-green-400 transition-all duration-300"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

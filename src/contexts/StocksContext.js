import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StocksContext = React.createContext();

export const StocksProvider = ({ children }) => {
  const [symbol, setSymbol] = useState([]);
  const [savedData, setSavedDate] = useState(false); // load data on initial render as well

  let _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@List");
      console.log("Retrieved list");

      if (value !== null) {
        setSymbol(JSON.parse(value));
      }
    } catch (error) {
      console.log("Error encountered: ", error);
    } finally {
      setSavedDate(true);
    }
  };

  useEffect(() => {
    _retrieveData();
  }, []);

  return (
    <StocksContext.Provider
      value={{
        symbol,
        setSymbol,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};

export const useStocksContext = () => {
  const { symbol, setSymbol } = useContext(StocksContext);

  // checks if symbol exists, and adds newSymbol to the watchlist
  function addToWatchlist(newSymbol) {
    if (!symbol) {
      AsyncStorage.setItem("@List", JSON.stringify(newSymbol));
      setSymbol([newSymbol]);
      return;
    }

    if (symbol.includes(newSymbol)) {
      alert("Stock is already in your Watchlist");
      return;
    }

    setSymbol((state) => {
      const updatedState = [...state, newSymbol];
      AsyncStorage.setItem("@List", JSON.stringify(updatedState));
      return updatedState;
    });
  }

  // delete stock from watchlist
  function removeFromWatchlist(symbolToRemove) {
    setSymbol((state) => {
      const symbolIdx = state.findIndex((symbol) => symbol === symbolToRemove);

      if (symbolIdx === -1) {
        alert("Stock does not exist");
        return;
      }

      const updatedState = [...state];
      updatedState.splice(symbolIdx, 1);
      AsyncStorage.setItem("@List", JSON.stringify(updatedState));

      return updatedState;
    });
  }

  return {
    ServerURL: "http://127.0.0.1:3000",
    watchList: symbol,
    addToWatchlist,
    removeFromWatchlist,
  };
};

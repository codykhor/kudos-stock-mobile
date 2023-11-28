import React, { useState, useEffect } from "react";
import { useStocksContext } from "../contexts/StocksContext";
import { useRoute } from "@react-navigation/core";
import { API_KEY_FMP } from "@env";

export function useQuote() {
  const [quote, setQuote] = useState([]);
  const [loading, setLoading] = useState(true);
  const { watchList } = useStocksContext();

  // get stock quote

  const url = `https://financialmodelingprep.com/api/v3/quote/${watchList}?apikey=${API_KEY_FMP}`;

  useEffect(
    (watchList) => {
      // fetch quote data from the server for any new symbols added to the watchlist
      fetch(url)
        .then((resp) => resp.json())
        .then((json) => setQuote(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    },
    [watchList]
  );

  return [quote, loading];
}

export function useQuoteDetails() {
  // pass symbol chosen
  const route = useRoute();
  const { symbol } = route.params;
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);

  const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${API_KEY_FMP}`;

  useEffect(
    (watchList) => {
      // fetch quote data from the server for any new symbols added to the watchlist and save in local StocksScreen state
      fetch(url)
        .then((resp) => resp.json())
        .then((json) => setDetails(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    },
    [symbol]
  );

  return [details, loading];
}

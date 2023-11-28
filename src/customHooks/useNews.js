import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import { API_KEY_MAR } from "@env";

export function useNews() {
  // pass symbol chosen
  const route = useRoute();
  const { symbol } = route.params;

  // get stock history info
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // const API_KEY = "TQxHjzjAgD7uYpSeA973IwoFpt12U7sr244GfdQl";
  const url = `https://api.marketaux.com/v1/news/all?symbols=${symbol}&filter_entities=true&language=en&api_token=${API_KEY_MAR}`;

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => {
        const newsData = json.data; // initial - get info from the past 100 days
        setNews(newsData);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return [news, loading];
}

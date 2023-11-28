import React, { useState, useEffect } from "react";
import { useStocksContext } from "../contexts/StocksContext";

export function useSearch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ServerURL } = useStocksContext();

  useEffect(() => {
    // link from Express
    fetch(ServerURL + "/api/stocklist")
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return [data, loading];
}

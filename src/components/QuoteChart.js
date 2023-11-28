import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useRoute } from "@react-navigation/core";
import { scaleSize } from "../constants/Layout";
import { API_KEY_FMP } from "@env";

export function QuoteChart() {
  // pass symbol chosen
  const route = useRoute();
  const { symbol } = route.params;

  // get stock history info
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${API_KEY_FMP}`;

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => {
        const slicedHistory = json.historical.slice(0, 7); // initial - get info from the past 100 days
        setHistory(slicedHistory);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // extract date from API
  const labels = history.map((item) => {
    const date = new Date(item.date);
    const day = date.getDate();
    return day.toString();
  });

  let price = history.map((item) => item.close);

  const data = {
    labels: labels,
    datasets: [
      {
        data: price,
        color: (opacity = 1) => `rgba(37, 94, 184, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // code adapted from react native chart kit
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.7,
    color: (opacity = 1) => `rgba(233, 236, 239, ${opacity})`,
    barPercentage: 0.5,
  };

  return (
    <View>
      <View style={styles.textBlock}>
        <Text style={styles.text}>Closing Price of Last 7 Days</Text>
      </View>
      {!loading && price.length > 0 ? (
        <LineChart
          data={data}
          width={scaleSize(400)}
          height={220}
          chartConfig={chartConfig}
        />
      ) : (
        <Text style={styles.loading}>Content is loading</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#8d99ae",
    fontWeight: "600",
  },
  textBlock: {
    alignItems: "center",
    paddingVertical: scaleSize(15),
  },
  loading: {
    color: "#61a5c2",
    fontStyle: "italic",
    marginHorizontal: scaleSize(15),
    marginTop: scaleSize(10),
  },
});

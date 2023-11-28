import React from "react";
import { useQuoteDetails } from "../customHooks/useQuote";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { scaleSize } from "../constants/Layout";

export function QuoteDetailSection() {
  // get quote info
  const [details, loading] = useQuoteDetails();

  return (
    <View>
      {loading ? (
        <Text style={styles.loading}>Content is loading</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={details}
          renderItem={({ item }) => (
            <View>
              <View style={styles.listTitle}>
                <Text style={styles.listSymbol}>{item.symbol}</Text>
                <Text style={styles.listName}>{item.name}</Text>
              </View>
              <View style={styles.lineHorizontal}></View>
              <View>
                <View style={styles.listMain}>
                  <Text style={styles.listPrice}>{item.price.toFixed(2)}</Text>
                  <Text
                    style={
                      item.changesPercentage >= 0
                        ? styles.positive
                        : styles.negative
                    }
                  >
                    {item.changesPercentage.toFixed(2)}%
                  </Text>
                </View>
              </View>
              <View style={styles.lineHorizontal}></View>
              <View style={styles.container}>
                <View style={styles.listSubtitle}>
                  <Text style={styles.listSubtitle}>Open</Text>
                  <Text style={styles.listSubtitle}>High</Text>
                  <Text style={styles.listSubtitle}>Low</Text>
                </View>
                <View style={styles.listInfo}>
                  <Text style={styles.listInfo}>{item.open}</Text>
                  <Text style={styles.listInfo}>{item.dayHigh}</Text>
                  <Text style={styles.listInfo}>{item.dayLow}</Text>
                </View>
                <View style={styles.listSubtitle}>
                  <Text style={styles.listSubtitle}>Vol</Text>
                  <Text style={styles.listSubtitle}>P/E</Text>
                  <Text style={styles.listSubtitle}>Mkt Cap</Text>
                </View>
                <View style={styles.listInfo}>
                  <Text style={styles.listInfo}>
                    {(item.volume / 1e6).toFixed(2)}M
                  </Text>
                  <Text style={styles.listInfo}>{item.pe}</Text>
                  <Text style={styles.listInfo}>
                    {(item.marketCap / 1e9).toFixed(1)}B
                  </Text>
                </View>
                <View style={styles.listSubtitle}>
                  <Text style={styles.listSubtitle}>52W H</Text>
                  <Text style={styles.listSubtitle}>52W L</Text>
                  <Text style={styles.listSubtitle}>Avg Vol</Text>
                </View>
                <View style={styles.listInfo}>
                  <Text style={styles.listInfo}>{item.yearHigh}</Text>
                  <Text style={styles.listInfo}>{item.yearLow}</Text>
                  <Text style={styles.listInfo}>
                    {(item.avgVolume / 1e6).toFixed(2)}M
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.symbol}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    color: "#61a5c2",
    fontStyle: "italic",
    marginHorizontal: scaleSize(15),
    marginTop: scaleSize(10),
  },
  listTitle: {
    flex: 1,
    flexDirection: "row",
    gap: scaleSize(15),
    paddingHorizontal: scaleSize(15),
    paddingVertical: scaleSize(15),
    alignItems: "center",
    justifyContent: "flex-start",
  },
  listSymbol: {
    fontSize: scaleSize(22),
    fontWeight: "bold",
    color: "white",
  },
  listName: {
    fontSize: scaleSize(14),
    color: "#ced4da",
    textAlignVertical: "center",
  },
  lineHorizontal: {
    marginHorizontal: scaleSize(15),
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
    borderBottomWidth: 1.2,
    width: "90%",
  },
  listMain: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: scaleSize(15),
    paddingHorizontal: scaleSize(15),
    paddingVertical: scaleSize(15),
  },
  listPrice: {
    fontWeight: "bold",
    color: "white",
  },
  positive: {
    fontWeight: "bold",
    color: "green",
  },
  negative: {
    fontWeight: "bold",
    color: "red",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scaleSize(15),
    paddingVertical: scaleSize(15),
  },
  listSubtitle: {
    color: "#8d99ae",
    fontWeight: "600",
    fontSize: scaleSize(13),
    paddingBottom: scaleSize(4),
  },
  listInfo: {
    color: "white",
    fontWeight: "400",
    fontSize: scaleSize(13),
    paddingBottom: scaleSize(4),
  },
});

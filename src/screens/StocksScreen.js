import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { useNavigation } from "@react-navigation/core";
import { useQuote } from "../customHooks/useQuote";
import { scaleSize } from "../constants/Layout";
import { FlatList } from "react-native-gesture-handler";

export default function StocksScreen({ route }) {
  const navigation = useNavigation();
  const { removeFromWatchlist } = useStocksContext();
  const [quote] = useQuote();

  const handleItemPress = (symbol) => {
    navigation.push("Stock Details", { symbol });
  };

  const handleLongPress = (symbol) => {
    removeFromWatchlist(symbol);
    alert("Stock removed from Watchlist.");
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={quote}
      renderItem={({ item }) => (
        <TouchableHighlight
          onPress={() => {
            handleItemPress(item.symbol);
          }}
          onLongPress={() => {
            handleLongPress(item.symbol);
          }}
        >
          <View style={styles.listContainer}>
            <View style={styles.listTitle}>
              <Text style={styles.listSymbol}>{item.symbol}</Text>
              <Text style={styles.listName}>{item.name}</Text>
            </View>
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
        </TouchableHighlight>
      )}
      keyExtractor={(item) => item.symbol}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scaleSize(15),
    paddingVertical: scaleSize(15),
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
    borderBottomWidth: 1.2,
  },
  listTitle: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  listSymbol: {
    fontSize: scaleSize(18),
    fontWeight: "bold",
    color: "white",
  },
  listName: {
    fontSize: scaleSize(12),
    color: "#ced4da",
  },
  listMain: {
    flexDirection: "column",
    alignItems: "flex-end",
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
});

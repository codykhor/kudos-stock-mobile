import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import { FlatList } from "react-native-gesture-handler";
import { SearchBar } from "../components/SearchBar";
import { scaleSize } from "../constants/Layout";
import { useSearch } from "../customHooks/useSearch";

export function SearchResults({ navigation }) {
  const { addToWatchlist } = useStocksContext();

  const [term, setTerm] = useState(""); // set search term
  const [data, loading] = useSearch();

  // to show search results
  const filteredRes = useMemo(() => {
    return term
      ? data.filter((s) => {
          return s.symbol.includes(term);
        })
      : data;
  }, [term, data]);

  const handleSymbolSearch = (search) => {
    setTerm(search);
  };

  const handleItemPress = (newSymbol) => {
    addToWatchlist(newSymbol);
    navigation.navigate("Stocks");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SearchBar onSearch={handleSymbolSearch} />
        {term !== "" && (
          <Text style={styles.text}>
            We have found {filteredRes.length} results
          </Text>
        )}
        {term !== "" && (
          <View>
            {loading ? (
              <Text style={styles.text}>Content is loading</Text>
            ) : (
              <FlatList
                data={filteredRes}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableWithoutFeedback
                    onPress={() => handleItemPress(item.symbol)}
                  >
                    <View style={styles.listContainer}>
                      <Text style={styles.listSymbol}>{item.symbol}</Text>
                      <Text style={styles.listName}>{item.name}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}
                keyExtractor={(item) => item.symbol}
              />
            )}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "#61a5c2",
    fontStyle: "italic",
    marginHorizontal: scaleSize(15),
    marginTop: scaleSize(10),
  },
  listContainer: {
    flex: 1,
    marginHorizontal: scaleSize(15),
  },
  listSymbol: {
    fontSize: scaleSize(18),
    fontWeight: "bold",
    color: "white",
    marginTop: scaleSize(5),
  },
  listName: {
    fontSize: scaleSize(12),
    color: "#ced4da",
    marginBottom: scaleSize(5),
  },
});

import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { scaleSize } from "../constants/Layout";
import { useNews } from "../customHooks/useNews";

export function QuoteNews() {
  const [news, loading] = useNews();

  return (
    <View>
      {loading ? (
        <Text style={styles.loading}>Content is loading</Text>
      ) : (
        <FlatList
          data={news}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          renderItem={({ item }) => (
            <View styles={styles.listMain}>
              <View style={styles.listContainer}>
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listIndustry}>{item.snippet}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.uuid}
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
  listMain: {
    justifyContent: "space-evenly",
  },
  listContainer: {
    paddingLeft: scaleSize(15),
    width: scaleSize(350),
  },
  listTitle: {
    fontSize: scaleSize(18),
    fontWeight: "bold",
    color: "#98c1d9",
    marginTop: scaleSize(5),
  },
  listIndustry: {
    fontSize: scaleSize(14),
    fontWeight: "400",
    color: "white",
    marginTop: scaleSize(5),
  },
});

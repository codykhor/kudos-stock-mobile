import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function SearchBar({ onSearch = () => {} }) {
  const [innerSearch, setInnerSearch] = useState("");
  return (
    <View style={styles.backgroundStyle}>
      <Ionicons name="search" style={styles.iconStyle} />
      <TextInput
        style={styles.inputStyle}
        placeholder="Search"
        autoCapitalize="characters"
        autoCorrect={false}
        value={innerSearch}
        onChangeText={(term) => setInnerSearch(term)}
        onEndEditing={() => onSearch(innerSearch)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#e5e5e5",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    marginTop: 18,
    flexDirection: "row",
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 32,
    alignSelf: "center",
    marginHorizontal: 5,
  },
});

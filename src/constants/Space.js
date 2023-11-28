import React from "react";
import { View, StyleSheet } from "react-native";
import { scaleSize } from "../constants/Layout";

export function Space({ children }) {
  return <View style={styles.space}>{children}</View>;
}

const styles = StyleSheet.create({
  space: {
    margin: scaleSize(15),
  },
});

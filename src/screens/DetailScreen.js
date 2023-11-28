import React from "react";
import { View } from "react-native";
import { QuoteDetailSection } from "../components/QuoteDetailSection";
import { QuoteChart } from "../components/QuoteChart";
import { QuoteNews } from "../components/QuoteNews";

export default function DetailScreen() {
  return (
    <View>
      <QuoteDetailSection />
      <QuoteChart />
      <QuoteNews />
    </View>
  );
}

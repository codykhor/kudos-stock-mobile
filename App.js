import * as React from "react";
import { Platform, StyleSheet, View, StatusBar } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import { StocksProvider } from "./src/contexts/StocksContext";
import "react-native-gesture-handler";
import DetailScreen from "./src/screens/DetailScreen";

const Stack = createStackNavigator();

export default function App(props) {
  return (
    <View style={styles.container}>
      <StocksProvider>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <NavigationContainer theme={DarkTheme}>
          {/* <BottomTabNavigator /> */}
          <Stack.Navigator>
            <Stack.Screen
              name=" "
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Stock Details" component={DetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </StocksProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

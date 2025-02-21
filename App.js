import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import LoginScreen from "./components/Loginpage/login";
import HomeScreen from "./components/HomePage/Home";
import Footer from "./components/Footer";
import Food from "./components/Foods/FoodHome";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Noir_Regular: require("./fonts/Noir_regular.otf"),
    Noir_Bold: require("./fonts/Noir_medium.otf"), 
  });

  if (!fontsLoaded) {
    return (
      <Text>No fonts Loaded</Text>
    );
  }

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Food" component={Food} />
        </Stack.Navigator>

        <Footer />
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Noir_Bold", 
    fontSize: 18,
  },
});

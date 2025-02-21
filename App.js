import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from "@expo-google-fonts/montserrat";
import Footer from "./components/Footer";
import HomeScreen from "./HomePage/HomePage";
import LoginScreen from "./components/Loginpage/login";

const Stack = createStackNavigator();

function HomeScreenWithFooter({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <HomeScreen navigation={navigation} />
      <Footer />
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_Regular: Nunito_400Regular,
    Nunito_Bold: Nunito_700Bold,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreenWithFooter} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Nunito_Regular",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

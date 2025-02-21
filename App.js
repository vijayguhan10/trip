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
import HomeScreen from "./components/Homepage/Home";
import LoginScreen from "./components/Loginpage/login";
import Traintrackingscreen from "./components/Traintracking/traintracking"
import Places from "./components/Placestovisit/places";
import Shopping from "./components/shopping/shopping";
const Stack = createStackNavigator();

function HomeScreenWithFooter({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <HomeScreen navigation={navigation} />
      <Footer />
    </View>
  );
}
function Traintrackingscreenwithfooter({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Traintrackingscreen navigation={navigation} />
      <Footer />
    </View>
  );
}
function Placesscreenwithfooter({navigation}){
  return (
    <View style={{ flex: 1 }}>
      <Places navigation={navigation} />
      <Footer />
    </View>
  );
}
function Shoppingwithfooter({navigation}){
  return (
    <View style={{ flex: 1 }}>
      <Shopping navigation={navigation} />
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
      <Stack.Navigator initialRouteName="Shopping" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreenWithFooter} />
        <Stack.Screen name="Traintracking" component={Traintrackingscreenwithfooter} />
        <Stack.Screen name="Places" component={Placesscreenwithfooter} />
        <Stack.Screen name="Shopping" component={Shoppingwithfooter} />
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

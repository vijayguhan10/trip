import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import LoginScreen from "./components/Loginpage/login";
import Traintrackingscreen from "./components/Traintracking/traintracking";
import Places from "./components/Placestovisit/places";
import Shopping from "./components/shopping/shopping";
import FoodHome from "./components/Foods/FoodHome";
import Footer from "./components/Footer";
import HomeScreen from "./components/Homepage/Homepage";
import Overview from "./components/Activities/Overview";
import DetailedScreen from "./components/Activities/DetailedScreen";
import BookASlot from "./components/Activities/BookASlot";
const Stack = createStackNavigator();

function HomeScreenWithFooter({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <HomeScreen navigation={navigation} />
      <Footer />
    </View>
  );
}
function ActiviesOverview() {
  return (
    <View style={{ flex: 1 }}>
      <Overview />
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
function Placesscreenwithfooter({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Places navigation={navigation} />
      <Footer />
    </View>
  );
}
function Shoppingwithfooter({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Shopping navigation={navigation} />
      <Footer />
    </View>
  );
}
function FoodHomewithfooter({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <FoodHome navigation={navigation} />
      <Footer />
    </View>
  );
}
function MountainIndetail() {
  return (
    <View style={{ flex: 1 }}>
      <DetailedScreen />
      <Footer />
    </View>
  );
}
function SlotBooking() {
  return (
    <View style={{ flex: 1 }}>
      <BookASlot />
      <Footer />
    </View>
  );
}
export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Noir_Regular: require("./assets/fonts/Comfortaa-VariableFont_wght.ttf"),
    Noir_Bold: require("./assets/fonts/noir.ttf"),
  });
  if (fontsLoaded) {
    console.log("fonts loaded sucessfully : ", fontsLoaded);
  }
  if (!fontsLoaded && !fontError) {
    return <Text>Error in loading the fonts</Text>;
  }
  if (fontError) {
    console.error("Font loading error:", fontError);
    return <Text>Error loading fonts</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreenWithFooter} />
        <Stack.Screen
          name="Traintracking"
          component={Traintrackingscreenwithfooter}
        />
        <Stack.Screen name="Places" component={Placesscreenwithfooter} />
        <Stack.Screen name="Shopping" component={Shoppingwithfooter} />
        <Stack.Screen name="Food" component={FoodHomewithfooter} />
        <Stack.Screen name="Activities" component={ActiviesOverview} />
        <Stack.Screen name="DetailedScreen" component={MountainIndetail} />
        <Stack.Screen name="SlotBooking" component={SlotBooking} />
      </Stack.Navigator>
      <StatusBar style="auto" />
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
    fontFamily: "    Noir_Regular",
    fontSize: 18,
  },
});

import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import LoginScreen from "./components/Loginpage/login";
import Traintrackingscreen from "./components/Traintracking/traintracking"
import Places from "./components/Placestovisit/places";
import Shopping from "./components/shopping/shopping";
import FoodHome from "./components/Foods/FoodHome"
import HomeScreen from "./components/Homepage/Homepage";
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
function FoodHomewithfooter({navigation}){
  return (
    <View style={{ flex: 1 }}>
      <FoodHome navigation={navigation} />
      <Footer />
    </View>
  );
}
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
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreenWithFooter} />
        <Stack.Screen name="Traintracking" component={Traintrackingscreenwithfooter} />
        <Stack.Screen name="Places" component={Placesscreenwithfooter} />
        <Stack.Screen name="Shopping" component={Shoppingwithfooter} />
        <Stack.Screen name="Food" component={FoodHomewithfooter} />
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
    fontFamily: "Noir_Bold", 
    fontSize: 18,
  },
});

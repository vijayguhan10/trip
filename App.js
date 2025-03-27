import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import LoginScreen from "./components/Loginpage/login";
import Traintrackingscreen from "./components/Traintracking/traintracking";
import Places from "./components/Placestovisit/places";
import Shopping from "./components/shopping/shopping";
import FoodHome from "./components/Foods/FoodHome";
import HomeScreen from "./components/Homepage/Homepage";
import Footer from "./components/Footer";
import ThingsToCarry from "./components/Thingstocarrry/things";
import Bookings from "./components/Mybookings/Bookings";
import Profilescreen from "./components/profile/profilepage";
import Fooddetails from "./components/Fooddetails/Fooddetails";
import Overview from "./components/Activities/Overview";
import DetailedScreen from "./components/Activities/DetailedScreen";
import BookASlot from "./components/Activities/BookASlot";
import OnboardingScreen from "./components/Landingpage/Landingpage";
import Booktable from "./components/Fooddetails/Booktable";
import Productscreen from "./components/Products/productscreen";
import PlacesIndetail from "./components/Placestovisit/PlacesIndeail";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";

// import { API_URL, SECRET_KEY } from '@env'
// console.log(API_URL);

const Stack = createStackNavigator();

function HomeScreenWithFooter({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <HomeScreen navigation={navigation} />
      <Footer />
    </View>
  );
}
function ActiviesOverview({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Overview navigation={navigation} />
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
function ThingsToCarrywithfooter({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <ThingsToCarry navigation={navigation} />
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
function Mybookingswithfooter({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Bookings navigation={navigation} />
      <Footer />
    </View>
  );
}
function Profilescreenwithfooter({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Profilescreen navigation={navigation} />
      <Footer />
    </View>
  );
}

function Fooddetailswithfooter({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Fooddetails navigation={navigation} />
      <Footer />
    </View>
  );
}
function Booktablewithfooter({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Booktable navigation={navigation} />
      <Footer />
    </View>
  );
}
function PlacesDetailed({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <PlacesIndetail navigation={navigation} />
      <Footer />
    </View>
  );
}
function Productscreenwithfooter({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Productscreen navigation={navigation} />
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
  const [initialRoute, setInitialRoute] = useState(null);

  
  const [fontsLoaded, fontError] = useFonts({
    Noir_Regular: require("./assets/fonts/Comfortaa-VariableFont_wght.ttf"),
    Noir_Bold: require("./assets/fonts/noir.ttf"),

    LufgaBlack: require("./assets/fonts/lufga/LufgaBlack.ttf"),
    LufgaBlackItalic: require("./assets/fonts/lufga/LufgaBlackItalic.ttf"),
    LufgaBold: require("./assets/fonts/lufga/LufgaBold.ttf"),
    LufgaBoldItalic: require("./assets/fonts/lufga/LufgaBoldItalic.ttf"),
    LufgaExtraBold: require("./assets/fonts/lufga/LufgaExtraBold.ttf"),
    LufgaExtraBoldItalic: require("./assets/fonts/lufga/LufgaExtraBoldItalic.ttf"),
    LufgaExtraLight: require("./assets/fonts/lufga/LufgaExtraLight.ttf"),
    LufgaExtraLightItalic: require("./assets/fonts/lufga/LufgaExtraLightItalic.ttf"),
    LufgaItalic: require("./assets/fonts/lufga/LufgaItalic.ttf"),
    LufgaLight: require("./assets/fonts/lufga/LufgaLight.ttf"),
    LufgaLightItalic: require("./assets/fonts/lufga/LufgaLightItalic.ttf"),
    LufgaMedium: require("./assets/fonts/lufga/LufgaMedium.ttf"),
    LufgaMediumItalic: require("./assets/fonts/lufga/LufgaMediumItalic.ttf"),
    LufgaRegular: require("./assets/fonts/lufga/LufgaRegular.ttf"),
    LufgaSemiBold: require("./assets/fonts/lufga/LufgaSemiBold.ttf"),
    LufgaSemiBoldItalic: require("./assets/fonts/lufga/LufgaSemiBoldItalic.ttf"),
    LufgaThin: require("./assets/fonts/lufga/LufgaThin.ttf"),
    LufgaThinItalic: require("./assets/fonts/lufga/LufgaThinItalic.ttf"),
  });
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

          if (decodedToken.exp > currentTime) {
            setInitialRoute("Home");
          } else {
            await AsyncStorage.removeItem("token"); // Remove expired token
            setInitialRoute("Login");
          }
        } else {
          setInitialRoute("Login");
        }
      } catch (error) {
        console.error("Error checking token:", error);
        setInitialRoute("Login");
      }
    };

    checkAuth();
  }, []);
  if (initialRoute === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
        initialRouteName={initialRoute} 
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
        <Stack.Screen name="Things" component={ThingsToCarrywithfooter} />
        <Stack.Screen name="Mybookings" component={Mybookingswithfooter} />
        <Stack.Screen name="Indetail" component={PlacesDetailed} />
        <Stack.Screen name="Profile" component={Profilescreenwithfooter} />
        <Stack.Screen name="Fooddetails" component={Fooddetailswithfooter} />
        <Stack.Screen name="Booktable" component={Booktablewithfooter} />
        <Stack.Screen name="Activities" component={ActiviesOverview} />
        <Stack.Screen name="DetailedScreen" component={MountainIndetail} />
        <Stack.Screen name="SlotBooking" component={SlotBooking} />
        <Stack.Screen name="Landingpage" component={OnboardingScreen} />
        <Stack.Screen name="Products" component={Productscreenwithfooter} />
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
    fontFamily: "Noir_Regular",
    fontSize: 18,
  },
});

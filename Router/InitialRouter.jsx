import { createStackNavigator } from "@react-navigation/stack";
import { useRoute } from "@react-navigation/native";
import { View } from "react-native";
import LoginScreen from "../components/Loginpage/login";
import Traintrackingscreen from "../components/Traintracking/traintracking";
import Places from "../components/Placestovisit/places";
import Shopping from "../components/shopping/shopping";
import FoodHome from "../components/Foods/FoodHome";
import HomeScreen from "../components/Homepage/Homepage";
import ThingsToCarry from "../components/Thingstocarrry/things";
import Bookings from "../components/Mybookings/Bookings";
import Profilescreen from "../components/profile/profilepage";
import Fooddetails from "../components/Fooddetails/Fooddetails";
import Overview from "../components/Activities/Overview";
import DetailedScreen from "../components/Activities/DetailedScreen";
import BookASlot from "../components/Activities/BookASlot";
import OnboardingScreen from "../components/Landingpage/Landingpage";
import Booktable from "../components/Fooddetails/Booktable";
import Productscreen from "../components/Products/productscreen";
import PlacesIndetail from "../components/Placestovisit/PlacesIndeail";
import Footer from "../components/Footer";
const Stack = createStackNavigator();

export const withFooter = (Component) => {
  return ({ navigation }) => (
    <View style={{ flex: 1 }}>
      <Component navigation={navigation} />
      <Footer />
    </View>
  );
};

const InitialRouter = ({initialRoute}) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRoute} 
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={withFooter(HomeScreen)} />
      <Stack.Screen
        name="Traintracking"
        component={withFooter(Traintrackingscreen)}
      />
      <Stack.Screen name="Places" component={withFooter(Places)} />
      <Stack.Screen name="Shopping" component={withFooter(Shopping)} />
      <Stack.Screen name="Food" component={withFooter(FoodHome)} />
      <Stack.Screen name="Things" component={withFooter(ThingsToCarry)} />
      <Stack.Screen name="Mybookings" component={withFooter(Bookings)} />
      <Stack.Screen name="Indetail" component={withFooter(PlacesIndetail)} />
      <Stack.Screen name="Profile" component={withFooter(Profilescreen)} />
      <Stack.Screen name="Fooddetails" component={withFooter(Fooddetails)} />
      <Stack.Screen name="Booktable" component={withFooter(Booktable)} />
      <Stack.Screen name="Activities" component={withFooter(Overview)} />
      <Stack.Screen
        name="DetailedScreen"
        component={withFooter(DetailedScreen)}
      />
      <Stack.Screen name="SlotBooking" component={withFooter(BookASlot)} />
      <Stack.Screen name="Landingpage" component={OnboardingScreen} />
      <Stack.Screen name="Products" component={withFooter(Productscreen)} />
    </Stack.Navigator>
  );
};

export default InitialRouter;

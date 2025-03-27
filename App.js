import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import InitialRouter from "./Router/InitialRouter";

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
            await AsyncStorage.removeItem("authToken"); // Corrected key
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

  if (!fontsLoaded && !fontError) {
    return <Text>Loading fonts...</Text>;
  }

  if (fontError) {
    console.error("Font loading error:", fontError);
    return <Text>Error loading fonts</Text>;
  }

  return (
    <NavigationContainer>
      <InitialRouter initialRoute={initialRoute} />
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

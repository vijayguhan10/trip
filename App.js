import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from "@expo-google-fonts/montserrat";
import Footer from "./components/Footer";
import HomeScreen from "./components/HomePage";
export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_Regular: Nunito_400Regular,
    Nunito_Bold: Nunito_700Bold,
  });
  return (
    <View style={styles.container}>
      <HomeScreen />
      <StatusBar style="auto" />
      <Footer />
    </View>
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

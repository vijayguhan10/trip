import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Switch,
  ScrollView,
} from "react-native";
import Header from "./Header";
import FoodList from "./FoodList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const FoodHome = () => {
  return (
    <View style={styles.container}>
      <Header />
      <FoodList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  
});

export default FoodHome;

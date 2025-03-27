import React,{useState} from "react";
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
const FoodHome = ({navigation}) => {
  const [vegMode, setVegMode] = useState(false); // Lift state up

  return (
    <View style={styles.container}>
      <Header  vegMode={vegMode} setVegMode={setVegMode} />
      <FoodList navigation={navigation} vegMode={vegMode} />
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

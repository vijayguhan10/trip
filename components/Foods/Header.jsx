import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SearchBar, Switch } from "react-native-elements";
import { Icon } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Header = ({ vegMode, setVegMode }) => {
 
  const toggleVegMode = (value) => {
    setVegMode(value); // Update state when toggled
    console.log("Veg Mode:", value); // Debugging log
  };

  return (
    <View>
      <View style={styles.header}>
        <SearchBar
          placeholder="Search"
          onChangeText={(search) => console.log(search)}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInput}
        />
<Text style={styles.vegtext}>{vegMode ? "Veg\nMode" : "Non-Veg\nMode"}</Text>
<Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={vegMode ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleVegMode} // Update state when toggled
          value={vegMode} // Use state for value
        />
      </View>
      <View style={styles.Topbarcontainer}>
        <Text style={styles.Popularity}>#popular</Text>
        <Text style={styles.Popularity}>#Nearby</Text>
        <Text style={styles.Popularity}>+</Text>
        <TouchableOpacity style={styles.button}>
          <Icon name="map" color="#FFF6F6" size={24} />
          <Text style={styles.LocationButton}>Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: hp("5%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: wp("2.5%"),
    backgroundColor: "rgb(255, 255, 255)",
  },
  searchBarContainer: {
    width: wp("70%"),
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarInput: {
    backgroundColor: "#EFEFEF",
    borderRadius: wp("1.5%"),
    height: hp("5%"),
  },
  Topbarcontainer: {
    flexDirection: "row",
    gap: wp("1%"),
    width: wp("70%"),
    alignItems: "center",
  },
  Popularity: {
    height: hp("5%"),
    backgroundColor: "#EFEFEF",
    marginLeft: wp("2%"),
    flexDirection: "row",
    color: "black",
    padding: wp("2.5%"),
    borderRadius: wp("2%"),
    fontFamily: "LufgaMedium",
  },
  button: {
    height: hp("5%"),
    backgroundColor: "#0D6EFD",
    flexDirection: "row",
    color: "white",
    padding: wp("2.5%"),
    borderRadius: wp("2%"),
    marginLeft: wp("11%"),
  },
  LocationButton: {
    color: "white",
    fontFamily: "LufgaRegular",
  },
  vegtext: {
    fontFamily: "LufgaSemiBoldItalic",
  },
});

export default Header;

import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button, SearchBar, Switch, Map } from "react-native-elements";
import { Icon } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Header = () => {
  return (
    <View>
      <View style={styles.header}>
        <SearchBar
          placeholder="Search"
          onChangeText={(search) => console.log(search)}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInput}
        />
        <Text style={styles.vegtext}>Veg{"\n"}Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={false ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) => console.log(value)}
          value={false}
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
      {/* <Image
        style={styles.HeaderImage}
        source={{
          uri: "https://s3-alpha-sig.figma.com/img/ddaa/adb6/c6c98e2fe207d9f625a7f037d2d90ed3?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cs71l8dA0S20wpvfWJB2CUBLFYMSrUMJxnRF6qRWmVUpInwFQw2FmePNJiwpqsoR6njU5MzdFZtRVMopuQJEffYsmEpDhXVRFu0Lh5LrU3-z5putfMToKj4vPRgloaxxN7yHteqCaNekbvu05QJfc4iCh7yiQG26ptdnYoI1LhfYYIItpxX4Bm0bk9HreQwRhCk0VPOW-CNTwRDM8KVR7Y0SZfSjLmaV8lFV8ekv101ZxhF3zYpilRtmJNWHXuB9KcgeKghoFSbSTGe7Fcnb4FLly~lts34SgtXpHjTgxq2u84K7zt6G90GKg3SX2ot-5hc~jSPd4ZQNc585xu9vIA__",
        }}
      /> */}
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
    fontFamily:"LufgaMedium"
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
    fontFamily:"LufgaRegular"
  },
  HeaderImage: {
    width: wp("96%"),
    height: hp("20%"),
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp("3%"),
    marginLeft: wp("2%"),
    borderTopLeftRadius: wp("4%"),
    borderTopRightRadius: wp("4%"),
    alignContent: "center",
  },
  vegtext:{
    fontFamily:"LufgaSemiBoldItalic"
  }
});

export default Header;

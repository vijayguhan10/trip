import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native"; 
const Sidebar = ({ isSidebarOpen }) => {
  const navigation = useNavigation(); 
  return (
    <View style={[styles.container, { width: isSidebarOpen ? wp("80%") : 0 }]}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://your-image-url.com" }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.userName}>Hii Dinu</Text>
          <Text style={styles.userEmail}>dinu@gmail.com</Text>
        </View>
      </View>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}  onPress={() => navigation.navigate(item.screen)} >
            <Icon
              name={item.icon}
              type={item.type}
              size={hp("3%")}
              style={{
                marginLeft: wp("4%"),
                borderRadius: wp("5%"),
                width: wp("7%"),
                height: hp("3.6%"),
                backgroundColor: "#F4F1EC",
              }}
            />
            <Text style={styles.menuText}>{item.label}</Text>
            <Icon name="chevron-right" type="feather" size={hp("2.5%")} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.supportcontainerOuter}>
        <View style={styles.supportcontainer}>
          <View style={styles.iconWrapper}>
            <Icon name="log-out" type="feather" size={hp("3%")} color="#000" />
          </View>
          <Text style={styles.logoutText}>Log out</Text>
        </View>
        <View style={styles.supportcontainer}>
          <View style={styles.iconWrapper}>
            <Icon name="log-out" type="feather" size={hp("3%")} color="#000" />
          </View>
          <Text style={styles.logoutText}>Log out</Text>
        </View>
      </View>
      <View style={styles.logoutButton}>
        <Icon name="log-out" type="feather" size={hp("3%")} />
        <Text style={styles.logoutText}>Log out</Text>
      </View>
    </View>
  );
};

const menuItems = [
  { label: "Live Train Tracking", icon: "train", type: "material", screen: "Traintracking" },
  { label: "Train on Food", icon: "fastfood", type: "material", screen: "Food" },
  { label: "Places to Visit", icon: "location-pin", type: "entypo", screen: "Places" },
  { label: "Shopping", icon: "shopping-bag", type: "feather", screen: "Shopping" },
  { label: "Things to Carry", icon: "fastfood", type: "material-community", screen: "Home" },
  { label: "My Bookings", icon: "calendar", type: "feather", screen: "Home" },
  { label: "My Profile", icon: "user", type: "feather", screen: "Home" },
];
const styles = StyleSheet.create({
  container: {
    fontSize: hp("1%"),
    backgroundColor: "#fff",
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("9%"),
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
    // width: wp("80%"),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("2%"),
  },
  profileImage: {
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("6%"),
    marginRight: wp("4%"),
  },
  userName: {
    fontWeight: "bold",
  },
  userEmail: {
    color: "gray",
  },
  menuContainer: {
    // flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp("0.3%"),
    paddingVertical: hp("1.6%"),
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: wp("2%"),
  },
  menuText: {
    flex: 1,
    fontSize: hp("1.5%"),
    marginLeft: wp("4%"),
  },
  logoutButton: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    paddingVertical: hp("1.6%"),
    paddingLeft: wp("5%"),
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginTop: hp("5%"),
  },
  supportcontainerOuter: {
    marginTop:hp("1%"),
    borderColor: "#F4F1EC",
    borderRadius: hp("1.5%"),
    borderWidth: wp("0.4%"),
    flexDirection: "row",
    justifyContent: "center",
    gap: wp("7%"),
  },
  supportcontainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "#D1FFFF",
    borderRadius: 50,
    padding: hp("1%"),
    borderWidth: 2,
    borderColor: "white",
  },

  logoutText: {
    fontSize: hp("1.5%"),
    marginLeft: wp("3%"),
  },
});

export default Sidebar;

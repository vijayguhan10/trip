import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Sidebar = () => {
  return (
    <View style={styles.container}>
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
          <TouchableOpacity key={index} style={styles.menuItem}>
            <Icon name={item.icon} type={item.type} size={hp("3%")} />
            <Text style={styles.menuText}>{item.label}</Text>
            <Icon name="chevron-right" type="feather" size={hp("2.5%")} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Icon name="headset" type="material" size={hp("3%")} />
          <Text style={styles.footerText}>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Icon name="notifications" type="material" size={hp("3%")} />
          <Text style={styles.footerText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Icon name="log-out" type="feather" size={hp("3%")} />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const menuItems = [
  { label: "Live Train Tracking", icon: "train", type: "material" },
  { label: "Train on Food", icon: "fastfood", type: "material" },
  { label: "Places to visit", icon: "location-pin", type: "entypo" },
  { label: "Shopping", icon: "shopping-bag", type: "feather" },
  { label: "Things to Carry", icon: "suitcase", type: "material-community" },
  { label: "My bookings", icon: "calendar", type: "feather" },
  { label: "My Profile", icon: "user", type: "feather" },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: wp("20%") },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("2%"),
  },
  profileImage: { width: wp("15%"), height: wp("15%"), borderRadius: 50 },
  userName: { fontSize: hp("2.5%"), fontWeight: "bold" },
  userEmail: { fontSize: hp("2%"), color: "gray" },
  menuContainer: { flex: 1 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("1.5%"),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: { flex: 1, fontSize: hp("2%"), marginLeft: wp("4%") },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: hp("2%"),
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  footerItem: { alignItems: "center" },
  footerText: { fontSize: hp("1.8%"), marginTop: hp("0.5%") },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp("1.5%"),
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginTop: hp("2%"),
  },
  logoutText: { fontSize: hp("2%"), marginLeft: wp("3%") },
});

export default Sidebar;

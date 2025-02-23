import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get the current route

  return (
    <View style={styles.bottomNavigation}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={[
            styles.iconContainer,
            route.name === item.screen && styles.activeIcon, // Highlight based on route
          ]}
          onPress={() => {
            navigation.navigate(item.screen);
          }}
        >
          <Icon
            name={item.name}
            type={item.type}
            size={30}
            color={route.name === item.screen ? "#fff" : "#444"} // Change icon color
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const menuItems = [
  { name: "home", type: "material", screen: "Home" },
  { name: "restaurant", type: "material", screen: "Food" },
  { name: "money", type: "material", screen: "Activities"},
  { name: "currency-rupee", type: "material", screen: "Products" },
];

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  bottomNavigation: {
    width: width,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 10,
  },
  activeIcon: {
    backgroundColor: "#0D6EFD",
  },
});

export default Footer;

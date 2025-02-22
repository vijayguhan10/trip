import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const [activeIcon, setActiveIcon] = useState("home");
  const navigation = useNavigation(); 

  return (
    <View style={styles.bottomNavigation}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={[
            styles.iconContainer,
            activeIcon === item.name && styles.activeIcon,
          ]}
          onPress={() => {
            setActiveIcon(item.name);
            if (item.screen) {
              navigation.navigate(item.screen);
            }
          }}
        >
          <Icon
            name={item.name}
            type={item.type}
            size={30}
            color={activeIcon === item.name ? "#fff" : "#444"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const menuItems = [
  { name: "home", type: "material", screen: "Home" }, // Navigate to Home
  { name: "restaurant", type: "material", screen: "Food" }, // Navigate to Food
  { name: "money", type: "material",screen:"Activity" }, // No navigation for now
  { name: "currency-rupee", type: "material" }, // No navigation for now
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

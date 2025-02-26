import React from "react";
import { View, StyleSheet } from "react-native";
import Footer from "./components/Footer";

const Layout = ({ children, showFooter }) => {
  return (
    <View style={styles.container}>
      {children}
      {showFooter && <Footer />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Layout;

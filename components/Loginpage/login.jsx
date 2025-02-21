import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function LoginScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#F5E5C0", "#DCE2F0", "#A3C7F4"]} 
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.logo}>trrip</Text>

        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Start Your Next Adventure with 4TRIP</Text>

        <Text style={styles.label}>Booking ID</Text>
        <TextInput style={styles.input} placeholder="Enter your booking ID" placeholderTextColor="#B0B0B0" />

        <Text style={styles.label}>Last name</Text>
        <TextInput style={styles.input} placeholder="Last name" placeholderTextColor="#B0B0B0" />

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate("Home")} 
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.helpText}>Not able to login? Call your travel agent</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    width: wp("87%"),
    padding: hp("3%"),
    borderRadius: wp("4%"),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
  },
  logo: {
    fontSize: wp("11%"),
    fontWeight: "bold",
    color: "#009688",
    marginBottom: hp("1%"),
  },
  title: {
    fontSize: wp("5.8%"),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp("1%"),
  },
  subtitle: {
    fontSize: wp("3.5%"),
    color: "#666",
    marginBottom: hp("2%"),
  },
  label: {
    alignSelf: "flex-start",
    fontSize: wp("3.8%"),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp("0.5%"),
  },
  input: {
    width: "100%",
    height: hp("6%"),
    borderRadius: wp("2%"),
    backgroundColor: "#F5F5F5",
    paddingHorizontal: wp("4%"),
    fontSize: wp("4%"),
    marginBottom: hp("2%"),
  },
  button: {
    width: "100%",
    backgroundColor: "#00C853",
    paddingVertical: hp("2%"),
    borderRadius: wp("2%"),
    alignItems: "center",
    marginTop: hp("1%"),
  },
  buttonText: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    color: "#fff",
  },
  helpText: {
    fontSize: wp("3%"),
    color: "#666",
    marginTop: hp("1%"),
  },
});

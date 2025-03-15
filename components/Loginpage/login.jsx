import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { API_URL } from "@env";
import ToastManager, { Toast } from "toastify-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function LoginScreen({ navigation }) {
  const [bookingId, setBookingId] = useState("");
  const [lastName, setLastName] = useState("");

  const handleLogin = async () => {
    console.log("hello",bookingId,lastName)
    console.log(API_URL)
    try {
      const response = await axios.post(`${API_URL}/booking/verify`, {
        booking_id:bookingId,
        name:lastName,
      });
      console.log("Login successful:", response.data);
      const token = response.data.token; 
      await AsyncStorage.setItem("authToken", token);
      Toast.success("Login successful");
      setTimeout(()=>{
        navigation.navigate("Home");

      },[3000])
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <LinearGradient
      colors={["#F5E5C0", "#DCE2F0", "#A3C7F4"]}
      style={styles.container}
    >  <ToastManager />
      <View style={styles.card}>
        <Image
          style={{ width: hp("30%"), height: hp("20%") }}
          source={{
            uri: "https://s3-alpha-sig.figma.com/img/02c3/4fd3/b73ef0a13ece73c6ebac7abdfd912bd1?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=CXaEkDLOiAuPPT4qooIZwshz-8yltiGaw6pFuS74qEjYU6PGTjKsDKdJsJ6qnHOdE0T31aSmc2ONCNLiqS~2pY4BpqmEMQbBwM5EsOy~Mgso-l2UQLm2JSOCtpwS1L2MHxUSDXL5Ajw98Ds2AwkMyeObtj16-n8fLh~U0oRQ205lugO0lHpMqYMxnI6M6eK3ylvpnhqBbmtR0pbg8atIWOs2H9S9l7DYrPeteqAjgB0d3KMbVv62X7~8JX6FiYYpMTK5bwUtJ9GFzboxoQ69eQsoXcAGG4wxwekgXuUkp7w5u4VRPlKITQNazK3jVyieNas0Gh-7LoSmDaAcjTCvDg__",
          }}
        />

        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Start Your Next Adventure with 4TRIP</Text>

        <Text style={styles.label}>Booking ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your booking ID"
          placeholderTextColor="#B0B0B0"
          value={bookingId}
          onChangeText={setBookingId}
        />

        <Text style={styles.label}>Last name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last name"
          placeholderTextColor="#B0B0B0"
          value={lastName}
          onChangeText={setLastName}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
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

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useState } from "react";
import { API_URL } from "@env";
import ToastManager, { Toast } from "toastify-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import {jwtDecode} from "jwt-decode"; // Import jwt-decode

const Profilescreen = ({ navigation }) => {
   const [bookingId, setBookingId] = useState("");
     const[token,settoken]=useState();
     const[data,setdata]=useState();
     const [agentLogo, setAgentLogo] = useState("");
const[companyname,setcompanyname]=useState();
   
   useEffect(()=>{
    const getdata=async()=>{
      const authToken = await AsyncStorage.getItem("authToken");
      settoken(authToken);
      if (authToken) {
        const decodedToken = jwtDecode(authToken);
        setAgentLogo(decodedToken.agent_logo);
      }
      const response = await axios.get(
        `${API_URL}/booking/profile`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, 
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        JSON.stringify(response.data, null, 2)
      );
      setdata(response.data);

      const companyName = data.agent_id.company_name;
      console.log(companyName); 
      setcompanyname(companyName)
     
     
    }
    getdata();
   },[])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: agentLogo }} style={styles.profileImage} />

          <Text style={styles.profileName}>{data?.agent_id?.company_name}</Text>
        </View>
        <View style={styles.top}></View>

        <View style={styles.input}>
          <Text style={styles.textStyle}>{data?.name}</Text>
        </View>
        <View style={styles.input}>
          <Text style={styles.textStyle}>{data?.agent_id?.company_name}</Text>
        </View>
        <View style={styles.input}>
          <Text style={styles.textStyle}>{data?.agent_id?.name}</Text>
        </View>

        <View style={styles.phoneContainer}>
          <Ionicons
            name="call"
            size={20}
            color="#000"
            style={styles.phoneIcon}
          />
          <Text style={styles.textStyle}>+91 {data?.phone_number}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5F7FF",
    padding: hp("2%"),
    paddingTop: hp("7%"),
  },
  backButton: {
    marginLeft: wp("5%"),
  },
  headerText: {
    fontSize: wp("5%"),
    fontWeight: "600",
    marginLeft: wp("3%"),
    color: "#000",
    fontFamily:"LufgaSemiBold"
  },
  profileContainer: {
    alignItems: "center",

    padding: hp("3%"),
  },
  profileHeader: {
    flexDirection: "row", 
    alignItems: "center", 
    gap: wp("3%"), 
    marginRight:"auto"
  },
  profileImage: {
    width: wp("28%"),
    height: hp("15%"),
    borderRadius: wp("12.5%"),
    resizeMode: "cover",
  },
  profileName: {
    fontSize: wp("7%"),
    fontWeight: "600",
    fontFamily: "LufgaMedium",

  },
  top:{
marginTop:hp("2%")
  },
  input: {
    marginTop:hp("1%"),
    width: "100%",
    height: hp("6%"),
    backgroundColor: "#eceaea85",
    borderRadius: 10,
    paddingHorizontal: wp("4%"),
    marginVertical: hp("1%"),
    color: "#000",
    fontFamily:"LufgaBold"
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eceaea85",
    width: "100%",
    height: hp("6%"),
    borderRadius: 10,
    paddingHorizontal: wp("4%"),
    marginTop: hp("1%"),
  },
  phoneIcon: {
    marginRight: wp("3%"),
  },
  phoneText: {
    fontSize: wp("4%"),
  },
  inputphone:{
    flex: 1, 
    height: hp("6%"),
    borderRadius: 10,
    paddingHorizontal: wp("2%"),
    color: "#000",
  },
  
});

export default Profilescreen;

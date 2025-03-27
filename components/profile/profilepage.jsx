import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useState } from "react";
import { API_URL } from "@env";
import ToastManager, { Toast } from "toastify-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
const Profilescreen = ({ navigation }) => {
   const [bookingId, setBookingId] = useState("");
     const[token,settoken]=useState();
     const[data,setdata]=useState();
   
   useEffect(()=>{
    const getdata=async()=>{
      const authToken = await AsyncStorage.getItem("authToken");
      settoken(authToken);
      const response = await axios.get(
        `${API_URL}/booking/profile`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, 
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setdata(response.data);

     
    }
    getdata();
   },[])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      
      <View style={styles.profileContainer}>
  <View style={styles.profileHeader}>
    <Image
      source={{ 
        uri: "https://s3-alpha-sig.figma.com/img/44b3/9dae/f7b8d9642d79c4d7aa93f9b95ca7a006?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VbWRgFdKRgubmu4OCPj40WLsnzqhAOym7l-qC34kfgGWTOpKb4wny2X8bI~P04jxYprVcVUbDUtxFFqkOz6JGiKhbCzWTb~RZLInR~ex0fZd~Y5vJ~~YuePtIBoROXfUgAuHVcF84l-JjLsUzNCP7-DBifgICfsoQxoZ~W906MyT-SIwQ0hsQvapnk0azm~xZenRIz5oCNHPYxdnayXZNt-32j9fFKnrcsWvcGLZqP9CLkndE03fA11urIdA1Yl0QCFl3m4a-RSA3jR1YIX5RDC9UdyKxx07M5d9Tg1HHkB5LUFRBRs2TCrKPQAJ2paoAUV1oFakggEY7~CeYt8qOw__",
      }}
      style={styles.profileImage}
    />
    <Text style={styles.profileName}>Travino</Text>
  </View>
  <View style={styles.top}></View>

  <View style={styles.input}>
    <Text style={styles.textStyle}>John Doe</Text>
  </View>
  <View style={styles.input}>
    <Text style={styles.textStyle}>XYZ Agency</Text>
  </View>
  <View style={styles.input}>
    <Text style={styles.textStyle}>Michael Smith</Text>
  </View>

  <View style={styles.phoneContainer}>
    <Ionicons name="call" size={20} color="#000" style={styles.phoneIcon} />
    <Text style={styles.textStyle}>+91 xxxxxxxxx</Text>
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

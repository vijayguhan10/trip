import React, { useState, useEffect } from "react";
import { Rating } from "react-native-ratings";
import ToastManager, { Toast } from "toastify-react-native";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,  TextInput,

} from "react-native";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import axios from 'axios';
import { API_URL } from "@env";

const DetailedScreen = () => {
  const navigation = useNavigation();
    const route = useRoute();
    const [modalVisible, setModalVisible] = useState(false);
      const [reviewTitle, setReviewTitle] = useState("");
      const [reviewText, setReviewText] = useState("");
     
  const activity=route.params?.activity;
  const locationId=route.params?.locationid;
  const [rating, setRating] = useState(0);
  const[activityid,setactivityid]=useState();
  const [fillallfield, setFillAllField] = useState("");
  const handlesubmit=async()=>{
    const authToken = await AsyncStorage.getItem("authToken");
    const locationId = await AsyncStorage.getItem("locationid");
    if (!rating || !reviewText || !reviewTitle) {
      setFillAllField("⚠ Fill all fields before submitting.");
      
      setTimeout(() => {
        setFillAllField("");
      }, 5000);
  
      return;
    }
    setFillAllField(""); 
    console.log(rating,activityid)
    const response=await axios.post(`${API_URL}/review`,{business_id:activityid,business_type:"Task",title:reviewTitle,rating:rating,description:reviewText},{
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
    if(response.status===201){
      setModalVisible(false);
      setRating(0);
      setReviewTitle("")
      setReviewText("")
      Toast.success("Review added");
    }
  
  }
  const setmodalopen=(activityid)=>{
    setactivityid(activityid)
    setModalVisible(true);
  }
  return (
    <ScrollView>
            <ToastManager />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{activity.name}</Text>
          <Text style={styles.activityRating}>{activity.customer_rating}★</Text>
        </View>

        <Image
          source={{
            uri: activity.image_url[0],
          }}
          style={styles.image}
        />
        <Text style={styles.ImageHeading}>{activity.description}</Text>
        <Text style={styles.subtitle}>What's Included</Text>
        {activity.whatsincluded.map((item, index) => (
          <Text key={index} style={styles.listItem}>
            • {item}
          </Text>
        ))}

        <Text style={styles.subtitle}>Additional Information</Text>
        {Object.entries(activity.additional_info).map(([key, value], index) => (
          <Text key={index} style={styles.listItem}>
            • {key}: {value}
          </Text>
        ))}

        <View>
          <Text style={styles.subtitle}>Time Slots:</Text>
          <View style={{ marginLeft: wp("5%") }}>
            {activity.slots.map((item, index) => (
              <Text key={index} style={styles.listItem}>
                • {item}
              </Text>
            ))}
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            marginBottom: 80,
            flexDirection: "row",
            gap: 8,
          }}
        >
          <TouchableOpacity
            style={styles.bookSlotButton}
            onPress={() => {
              navigation.navigate("SlotBooking",{activity});
            }}
          >
            <Text style={styles.bookSlotText}>Book a Slot</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addReviewButton}
            onPress={() => setmodalopen(activity._id)}
          >
            <Text style={styles.addReviewText}>Add Review</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" size={15} color="white" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Add Review</Text>
            {fillallfield ? <Text style={styles.errorText}>{fillallfield}</Text> : null}

            <Text style={styles.inputLabel}>Rating</Text>
            <Rating
        type="star"
        ratingCount={5}
        imageSize={30}
        startingValue={rating}
        onFinishRating={(value) => setRating(value)}
        style={{ marginBottom: hp("2%") }}
      />

            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter review title..."
              placeholderTextColor="#999"
              value={reviewTitle}
              onChangeText={setReviewTitle}
            />

            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Write your review..."
              placeholderTextColor="#999"
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              numberOfLines={5}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handlesubmit}
            >
              <Text style={styles.submitButtonText}>Add Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp("5%"),
    flex: 1,
    padding: wp("3%"),
    color: "#574f4f",
    backgroundColor: " #ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginBottom: wp("2%"),
     fontFamily:"LufgaExtraLight"
  },
  activityRating: {
    marginRight: wp("2%"),
    fontSize: wp("4%"),
    backgroundColor: "#71de92",
    width: wp("14%"),
    borderRadius: wp("1%"),
    textAlign: "center",
    color: "white",
    paddingVertical: hp("0.5%"),
  },
  image: {
    width: "100%",
    height: hp("16%"),
    marginBottom: hp("3%"),
    borderRadius: hp("0.5%"),
  },
  description: {
    marginBottom: hp("3%"),
  },
  subtitle: {
    flexDirection: "row",
    fontSize: wp("4%"),
    fontWeight: "bold",
    marginTop: hp("2%"),
    marginBottom: wp("1%"),
  },
  included: {
    marginBottom: hp("3%"),
  },
  info: {
    marginBottom: hp("3%"),
  },
  timeSlots: {
    marginBottom: hp("3%"),
  },

  list: {
    color: "#888",
    listStyleType: "disc",
    marginLeft: wp("3%"),
  },
  listItem: {
    fontSize: wp("4%"),
    color: "#888",
    marginLeft: wp("3%"),
    marginBottom: hp("0.5%"),
  },
  ImageHeading: {
    fontSize: wp("4%"),
    color: "#888",
    marginBottom: hp("0.5%"),
     fontFamily:"LufgaItalic"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("3%"),
    paddingHorizontal: wp("3%"),
  },
  bookSlotButton: {
    width: "60%",
    backgroundColor: "#00D084",
    borderRadius: wp("2%"),
    alignItems: "center",
    justifyContent: "center",
    height: hp("5%"),
    fontSize: hp("5%"),
  },
  bookSlotText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addReviewButton: {
    width: "30%",
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: wp("2%"),
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: hp("0.1%"),
    height: hp("5%"),
    fontSize: hp("5%"),
  },
  addReviewText: {
    color: "#black",

    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: wp("90%"),
    backgroundColor: "white",
    padding: wp("5%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: hp("1.5%"),
    right: wp("3%"),
    backgroundColor: "red",
    borderRadius: wp("5%"),
    padding: wp("2%"),
  },
  modalTitle: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    marginBottom: hp("2%"),
  },
  inputLabel: {
    alignSelf: "flex-start",
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
    color: "#444",
  },
  input: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: hp("2%"),
    borderRadius: wp("2%"),
    fontSize: hp("2%"),
    marginBottom: hp("2%"),
  },
  descriptionInput: {
    height: hp("15%"),
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "rgba(0, 208, 132, 1)",
    padding: hp("2%"),
    borderRadius: wp("3%"),
    width: "100%",
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: hp("2%"),
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
    textAlign: "center",
  },
  
});

export default DetailedScreen;

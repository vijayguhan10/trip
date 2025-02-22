import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
const DetailedScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Mountain Adventure Hike</Text>
          <Text style={styles.activityRating}>4.6★</Text>
        </View>

        <Image
          source={{
            uri: "https://www.hotel-hartweger.at/media/img/slides/weblication/wThumbnails/51b5a2b6-3b2d8ab5@2048w.jpg",
          }}
          style={styles.image}
        />
        <Text style={styles.ImageHeading}>
          Embark on an exhilarating Mountain Adventure Hike and immerse yourself
          in nature! This full-day hike takes you through breathtaking trails,
          lush forests, and awe-inspiring mountain views.
        </Text>
        <Text style={styles.subtitle}>What's Included</Text>
        {[
          "Experienced guide and hiking team",
          "Safety gear (helmets, walking sticks)",
          "Refreshment stops with snacks and drinks",
          "Photography breaks at scenic points",
          "First-aid assistance and emergency support",
        ].map((item, index) => (
          <Text key={index} style={styles.listItem}>
            • {item}
          </Text>
        ))}

        <Text style={styles.subtitle}>Additional Information</Text>
        {[
          "Duration: Full Day (Approx. 8 hours)",
          "Age Requirement: 15+",
          "Difficulty Level: Intermediate to Advanced",
          "Dress Code: Hiking boots, layered clothing, and a small backpack",
          "Accessibility: Not wheelchair accessible (rough terrain)",
        ].map((item, index) => (
          <Text key={index} style={styles.listItem}>
            • {item}
          </Text>
        ))}

        <View>
          <Text style={styles.subtitle}>Time Slots:</Text>
          <View style={{ marginLeft: wp("5%") }}>
            {["6:00 AM - 2:00 PM", "8:00 AM - 4:00 PM"].map((item, index) => (
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
              navigation.navigate("SlotBooking");
            }}
          >
            <Text style={styles.bookSlotText}>Book a Slot</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addReviewButton}
            onPress={() => console.log("Add Review Pressed")}
          >
            <Text style={styles.addReviewText}>Add Review</Text>
          </TouchableOpacity>
        </View>
      </View>
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
});

export default DetailedScreen;

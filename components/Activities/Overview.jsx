import React from "react";
import { View, Text, Image, ScrollView, StyleSheet,TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
const activities = [
  {
    id: "1",
    name: "Mountain Hike",
    rating: 3.7,
    price: 200,
    image:
      "https://media.istockphoto.com/id/531024681/photo/biker-riding-on-a-mountain-trail.jpg?s=612x612&w=0&k=20&c=5qKs63LJU_lZwqMFQ9kiQdQueg-rz9GCBkuI-qzFNEw=",
  },
  {
    id: "2",
    name: "4 wheel ride",
    rating: 4.7,
    price: 200,
    image:
      "https://media.istockphoto.com/id/531024681/photo/biker-riding-on-a-mountain-trail.jpg?s=612x612&w=0&k=20&c=5qKs63LJU_lZwqMFQ9kiQdQueg-rz9GCBkuI-qzFNEw=",
  },
  {
    id: "7",
    name: "Mountain Hike",
    rating: 3.7,
    price: 200,
    image:
      "https://media.istockphoto.com/id/531024681/photo/biker-riding-on-a-mountain-trail.jpg?s=612x612&w=0&k=20&c=5qKs63LJU_lZwqMFQ9kiQdQueg-rz9GCBkuI-qzFNEw=",
  },
  {
    id: "9",
    name: "4 wheel ride",
    rating: 4.7,
    price: 200,
    image:
      "https://media.istockphoto.com/id/531024681/photo/biker-riding-on-a-mountain-trail.jpg?s=612x612&w=0&k=20&c=5qKs63LJU_lZwqMFQ9kiQdQueg-rz9GCBkuI-qzFNEw=",
  },
  {
    id: "3",
    name: "Mountain Hike",
    rating: 3.7,
    price: 200,
    image:
      "https://media.istockphoto.com/id/531024681/photo/biker-riding-on-a-mountain-trail.jpg?s=612x612&w=0&k=20&c=5qKs63LJU_lZwqMFQ9kiQdQueg-rz9GCBkuI-qzFNEw=",
  },
  {
    id: "5",
    name: "4 wheel ride",
    rating: 4.7,
    price: 200,
    image:
      "https://media.istockphoto.com/id/531024681/photo/biker-riding-on-a-mountain-trail.jpg?s=612x612&w=0&k=20&c=5qKs63LJU_lZwqMFQ9kiQdQueg-rz9GCBkuI-qzFNEw=",
  },
];

const Overview = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchBar
          placeholder="Search"
          onChangeText={(search) => console.log(search)}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInput}
        />
      </View>
      <ScrollView>
        <Text style={styles.sectionTitle}>Must try Activities</Text>
        {activities.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={styles.activityCard}
            onPress={() => navigation.navigate("DetailedScreen")}
          >
            <Image
              source={{ uri: activity.image }}
              style={styles.activityImage}
            />
            <View style={styles.RatingFlex}>
              <Text style={styles.activityName}>{activity.name}</Text>
              <Text style={styles.activityRating}>{activity.rating}★</Text>
            </View>
            <Text style={styles.activityPrice}>
              Avg. ₹{activity.price} for one
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)",
    padding: wp("2%"),
  },
  searchBar: {
    flexDirection: "row",
    borderRadius: wp("1%"),
    marginBottom: hp("2%"),
    marginTop: hp("3%"),
    marginRight: wp("2%"),
  },
  RatingFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginBottom: hp("2%"),
    marginLeft: wp("2%"),
  },
  activityCard: {
    backgroundColor: "#ffffff",
    borderRadius: wp("1%"),
    marginBottom: hp("2%"),
    padding: wp("2%"),
  },
  activityImage: {
    width: "100%",
    height: hp("25%"),
    borderTopRightRadius: wp("1%"),
    borderTopLeftRadius: wp("1%"),
    marginBottom: hp("1%"),
  },
  activityName: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    paddingRight: wp("2%"),
    paddingLeft: wp("2%"),
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
  activityPrice: {
    fontSize: wp("3.5%"),
    paddingBottom: hp("1%"),
    paddingLeft: wp("2%"),
    color: "#666",
  },
  searchBarContainer: {
    width: wp("97%"),
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarInput: {
    backgroundColor: "#EFEFEF",
    borderRadius: wp("1.5%"),
    height: hp("5%"),
  },
});

export default Overview;

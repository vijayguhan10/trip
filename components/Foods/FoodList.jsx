import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button, Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import LottieView from "lottie-react-native";
import loadingAnimation from "../Animation - 1743617296128.json";

const categories = [
  {
    id: "1",
    name: "Lunch",
    icon: require("../../assets/lunch.jpg"),
  },
  {
    id: "2",
    name: "Dinner",
    icon: require("../../assets/dinner.jpg"),
  },
  {
    id: "3",
    name: "All",
    icon: require("../../assets/all.jpg"),
  },
  {
    id: "4",
    name: "Fast Food",
    icon: require("../../assets/fastfood.jpg"),
  },
  {
    id: "5",
    name: "Chat",
    icon: require("../../assets/food.jpg"),
  },
];

const FoodList = ({ navigation, vegMode }) => {
  const [Restaturnts, SetRestaurunts] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [token, settoken] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const GetFood = async (category = null) => {
    try {
      setLoading(true);
      console.log("api url data : ", API_URL);
      const authToken = await AsyncStorage.getItem("authToken");
      settoken(authToken);

      const destinationId = await AsyncStorage.getItem("locationid");
      if (!destinationId) throw new Error("Destination ID not found");

      const response = await axios.get(
        `${API_URL}/restaurant?location_id=${destinationId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      let filteredRestaurants = response.data;
      if (vegMode) {
        console.log("Filtering veg restaurants");
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
          restaurant.category.some(cat => cat.toLowerCase() === "veg")
        );
      } else {
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
          restaurant.category.some(cat => cat.toLowerCase().includes("non-veg"))
        );
      }
      if (category) {
        filteredRestaurants = filteredRestaurants.filter(restaurant =>
          restaurant.category.includes(category.toLowerCase())
        );
      }
  
      SetRestaurunts(filteredRestaurants);
    } catch (error) {
      console.error("Error fetching places:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetFood();
  }, [vegMode]);

  if (Loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={loadingAnimation}
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/food.jpg")}
          style={styles.headerImage}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.heading}>Dine Anytime!</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: "10px" }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item.name);
              GetFood(item.name);
            }}
          >
            <View style={styles.categoryItem}>
              <Image source={item.icon} style={styles.categoryIcon} />
              <Text style={styles.categoryname}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.subHeading}>Must try Restaurants</Text>
      {Restaturnts.length === 0 ? (
        <Text style={{ textAlign: "center", fontSize: 18, marginTop: 20, color: "red" }}>
          No Restaurants Available
        </Text>
      ) : (
        <FlatList
          data={Restaturnts}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: hp("10%") }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Fooddetails", { restaurant_id: item._id, shop: item })
              }
            >
              <Card style={styles.card}>
                <Card.Cover
                  source={{
                    uri: item.image_url?.[0] || "https://via.placeholder.com/150",
                  }}
                  style={styles.cardImage}
                />
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    {`${item.discount}%off` || "N/A"}
                  </Text>
                </View>
                <Card.Content>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={styles.title}>{item.business_name}</Text>
                    <Text style={styles.ratings}>5.6</Text>
                  </View>

                  <Text
                    style={{
                      color: "#666462",
                      fontWeight: "bold",
                      borderBottomColor: "#E5E5E5",
                      borderBottomWidth: 2,
                      paddingBottom: 10,
                      marginBottom: 10,
                      marginTop: 5,
                    }}
                  >
                    {item.category?.join(" • ") || "No categories available"}
                  </Text>

                  <View style={styles.infoRow}>
                    <Text>{item.location_name || "Unknown"}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        color: "#666462",
                      }}
                    >
                      <Text
                        style={{
                          borderRightColor: "#666462",
                          borderRightWidth: 1,
                          height: 16,
                          marginRight: 5,
                        }}
                      ></Text>
                      <MaterialIcons name="access-time" size={16} />
                    </View>
                    <Text>
                      {" "}
                      {`${item.businessHours.openingTime}-${item.businessHours.closingTime}` ||
                        "N/A"}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF6F6", padding: wp("3%") },
  heading: { fontSize: wp("6%"), fontFamily: "LufgaLightItalic" },
  subHeading: {
    fontSize: wp("4.5%"),
    fontFamily: "LufgaLightItalic",
    marginTop: hp("1.5%"),
  },
  categoryItem: {
    alignItems: "center",
    marginRight: wp("4%"),
    marginTop: hp("3%"),
  },
  categoryIcon: { width: wp("18%"), height: wp("18%"), borderRadius: wp("4%") },
  card: { marginVertical: hp("3%"), borderRadius: wp("3%") },
  cardImage: {
    height: hp("20%"),
    borderTopLeftRadius: wp("3%"),
    borderTopRightRadius: wp("3%"),
  },
  title: { fontSize: wp("4%"), fontWeight: "bold" },
  ratings: {
    backgroundColor: "rgb(14, 184, 121)",
    width: wp("12%"),
    borderRadius: wp("2%"),
    color: "white",
    textAlign: "center",
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginTop: hp("1%") },
  discountBadge: {
    position: "absolute",
    top: hp("-1.7%"),
    right: wp("3%"),
    bottom: hp("2.5%"),
    backgroundColor: "rgba(228, 27, 27, 0.87)",
    padding: wp("1.5%"),
    borderRadius: wp("12%"),
    height: wp("12%"),
    width: wp("12%"),
    textAlign: "center",
  },
  discountText: { color: "white", fontWeight: "bold" },
  categoryname: {
    fontFamily: "LufgaLight",
    marginTop: hp("1%"),
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerImage: {
    width: wp("96%"),
    height: hp("20%"),
    borderRadius: 10,
    alignContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingAnimation: {
    width: 200,
    height: 200,
  },
});
export default FoodList;

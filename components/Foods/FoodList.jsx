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
const categories = [
  {
    id: "1",
    name: "Lunch",
    icon: "https://s3-alpha-sig.figma.com/img/077a/148f/c9ece92889af67f39b9a01d2cf43f156?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cWOrlcwojX1PtxQLw4WfC4-tK31JQ-kg0qvZXC10OjK8fUrCVww1kaC301naV8p4tIoxGLMKA-vS4Z6xV8KcUrjYShin1qr222ZgNZIJTJbziYE1Rv~H8SImZpc3Cjrty~Xo2k7lsaGJhGLcfVFkzTbflJSUXTuoIR6zwa03DkAR1sw5y0SLvFXLllD-P3eBr5v29-0Ck5PyNANECiSgA7di1bcxjAxIV02OvXCU9ImDkDhMea4cynGiKJmRM7rEtWmCUkqW-Bhj3KX~r2C7TKGD0Fjd9GuJrf2x31pRA9ic7bG0GU~GE2YZdE9wUBpWDTlomSYl2xV1GmNTfKKVsA__",
  },
  {
    id: "2",
    name: "Dinner",
    icon: "https://s3-alpha-sig.figma.com/img/19e6/b238/6ad8e427c2882b88c9567f4dab4af7ba?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ObfMf9aVvDb63iJUflCj9FWP1Aq-TB-6gRBTETt9Lspl93QRHm6O6cJ~BgvpUz7SDbm-CUNDXpiDsPrBpPtieHru8VgxBT74nxDcgzHDYUExzyOxp7w6EvUmVdu-y3CgAy0PggAsqI-OdS6ZNtggUA~D0GGJLC0mskbdNcHL8snZh3Vr9j-qAJ-kZwMxuJcLtJdr7WOo2yM0kO4CD7~dmFj6pwKon6pPzIbg6kZB~LVrwiNuiKjnZrn9m43Q9yC0jd81Z0-xw686cwkjV5IknNOD~B25u5LHBxVKxTLoShDGd824UyqZ40xADgo5tprB0b9nVegoUd2QMiL~H8Q1ng__",
  },
  {
    id: "3",
    name: "All",
    icon: "https://s3-alpha-sig.figma.com/img/ddaa/adb6/c6c98e2fe207d9f625a7f037d2d90ed3?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cs71l8dA0S20wpvfWJB2CUBLFYMSrUMJxnRF6qRWmVUpInwFQw2FmePNJiwpqsoR6njU5MzdFZtRVMopuQJEffYsmEpDhXVRFu0Lh5LrU3-z5putfMToKj4vPRgloaxxN7yHteqCaNekbvu05QJfc4iCh7yiQG26ptdnYoI1LhfYYIItpxX4Bm0bk9HreQwRhCk0VPOW-CNTwRDM8KVR7Y0SZfSjLmaV8lFV8ekv101ZxhF3zYpilRtmJNWHXuB9KcgeKghoFSbSTGe7Fcnb4FLly~lts34SgtXpHjTgxq2u84K7zt6G90GKg3SX2ot-5hc~jSPd4ZQNc585xu9vIA__",
  },
  {
    id: "4",
    name: "fastfood",
    icon: "https://s3-alpha-sig.figma.com/img/3cc1/1424/4c79939ba1eb1e30443d7439a9d515d2?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=reD7QXGqkc7nJil7Ib7w~4D1o4xbiNwMAR8XtdzP7pAqKK6k-tMysyqP0oui3BlctN9yjev4f1lF1Y9uV4WM~RHsg~oVKx6GNBwR7SWUUrW3z~nAEE6HtPV7sSO8q8r8MsxkKQhlXGiEv1Mq0LTBfGdlvKlFZRg7TiIPeNDO-4gD3ZJwk5KzHYz22SEon9ogEEk-sRr2BOyQ6MWlvI-eRQmv0yhbs2NiU59RlUe3tR4Rp8RP7y8l2oTUiRIn2b6i6HX3YY1tPZAe7~ViOiO~FfboG~DktC4lPc7DwGqwDH9wXWfMc1N4i9NMKbPXiOPsIezJKDKUB2bkKvKJ7YPSBQ__",
  },
  {
    id: "5",
    name: "chat",
    icon: "https://media.istockphoto.com/id/525340605/photo/sev-puri-chat-item-india.jpg?s=612x612&w=0&k=20&c=GjfkN1SoKtHtY0G_YthWt-3okpM7gbLBCOKXAJKV3gc=",
  },
];

const FoodList = ({ navigation }) => {
  const [Restaturnts, SetRestaurunts] = useState([]);
  const [Loading, setLoading] = useState([]);
  const [token, settoken] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const GetFood = async (category = null) => {
    try {
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

      console.log(
        "Response data for the food : ",
        JSON.stringify(response.data, null, 2)
      );

      if (!Array.isArray(response.data)) {
        throw new Error("Invalid API Response: Expected an array");
      }

      if (category) {
        const filteredRestaurants = response.data.filter((restaurant) =>
          restaurant.category.includes(category.toLowerCase())
        );
        SetRestaurunts(filteredRestaurants);
      } else {
        SetRestaurunts(response.data);
      }
    } catch (error) {
      console.error("Error fetching places:", error.message || error);
    }
  };

  useEffect(() => {
    GetFood();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: "https://s3-alpha-sig.figma.com/img/ddaa/adb6/c6c98e2fe207d9f625a7f037d2d90ed3?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cs71l8dA0S20wpvfWJB2CUBLFYMSrUMJxnRF6qRWmVUpInwFQw2FmePNJiwpqsoR6njU5MzdFZtRVMopuQJEffYsmEpDhXVRFu0Lh5LrU3-z5putfMToKj4vPRgloaxxN7yHteqCaNekbvu05QJfc4iCh7yiQG26ptdnYoI1LhfYYIItpxX4Bm0bk9HreQwRhCk0VPOW-CNTwRDM8KVR7Y0SZfSjLmaV8lFV8ekv101ZxhF3zYpilRtmJNWHXuB9KcgeKghoFSbSTGe7Fcnb4FLly~lts34SgtXpHjTgxq2u84K7zt6G90GKg3SX2ot-5hc~jSPd4ZQNc585xu9vIA__",
          }}
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
              <Image source={{ uri: item.icon }} style={styles.categoryIcon} />
              <Text style={styles.categoryname}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.subHeading}>Must try Restaurants</Text>
      <FlatList
        data={Restaturnts}
        keyExtractor={(item) => item._id} // Fix key extractor
        contentContainerStyle={{ paddingBottom: hp("10%") }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Fooddetails", { restaurant_id: item._id,shop:item })
            }
          >
            <Card style={styles.card}>
              <Card.Cover
                source={{
                  uri: item.image_url?.[0] || "https://via.placeholder.com/150",
                }} // Fix field name
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
                  </Text>{" "}
                  {/* Add fallback */}
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
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
});
export default FoodList;

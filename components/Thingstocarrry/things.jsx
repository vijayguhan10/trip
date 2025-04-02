import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Icon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { API_URL } from "@env";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const ICONS = {
  Bag: "briefcase",
  "Water Bottle": "water",
  "First Aid Kit": "medkit",
  Flashlight: "flashlight",
  Snacks: "fast-food",
  Camera: "camera",
  "Power Bank": "battery-charging",
  Umbrella: "umbrella",
  Sunscreen: "sunny",
  "Hat": "hat",
  "Walking Shoes": "walk",
  Map: "map",
};

export default function ThingsToCarry({ navigation }) {
  const [itemsToCarry, setItemsToCarry] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getThingsToCarry = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) throw new Error("No token found");

        const decodedToken = jwtDecode(token);
        const locationId = decodedToken.location_id;

        if (!locationId) throw new Error("Location ID not found in token");

        const response = await axios.get(
          `${API_URL}/things-to-carry/${locationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setItemsToCarry(response.data.data);
      } catch (error) {
        console.error("Error fetching things to carry:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getThingsToCarry();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" type="feather" size={24} color="#000" />
          </TouchableOpacity>
          <Image
            source={{
              uri: "https://s3-alpha-sig.figma.com/img/44b3/9dae/f7b8d9642d79c4d7aa93f9b95ca7a006",
            }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.headerText}>Hii Dinu</Text>
            <Text style={styles.headerSubText}>Good morning</Text>
          </View>
          <View style={styles.searchIcon}>
            <Icon name="search" size={30} />
          </View>
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Ionicons name="list" size={wp("5%")} color="#0066FF" />
        <Text style={styles.titleText}>Things to carry</Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0066FF"
          style={{ marginTop: hp("5%") }}
        />
      ) : (
        <FlatList
          data={itemsToCarry}
          numColumns={3}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <LinearGradient
                colors={["#4c669f", "#3b5998", "#192f6a"]}
                style={styles.gradientIconContainer}
              >
                <Ionicons
                  name={ICONS[item.name] || "help-circle"}
                  size={wp("8%")}
                  color="#fff"
                />
              </LinearGradient>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingHorizontal: wp("5%"),
    paddingBottom: hp("2%"),
    paddingTop: hp("7%"),
    backgroundColor: "#fde3e370",
  },
  backButton: { marginVertical: hp("1%") },
  profileImage: {
    width: wp("18%"),
    height: hp("7%"),
    borderRadius: wp("12.5%"),
    alignSelf: "center",
    resizeMode: "cover",
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"),
  },
  headerText: { fontSize: hp("2.5%"), fontWeight: "600", color: "#000" },
  headerSubText: { fontSize: hp("2%"), fontWeight: "600" },
  searchIcon: { marginLeft: "auto" },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("2%"),
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
  },
  titleText: { fontSize: wp("4%"), color: "#0066FF", fontWeight: "500" },
  listContainer: { padding: wp("3%") },
  itemContainer: {
    width: wp("28%"),
    marginHorizontal: wp("2%"),
    marginVertical: hp("1%"),
    alignItems: "center",
  },
  gradientIconContainer: {
    width: wp("15%"),
    height: wp("15%"),
    borderRadius: wp("7.5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: { fontSize: wp("3.5%"), color: "#333", textAlign: "center" },
});

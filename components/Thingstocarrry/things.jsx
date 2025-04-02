import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
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
import LottieView from "lottie-react-native";
import loadingAnimation from "../Animation - 1743617296128.json";

const ICONS = {
  Bag: "briefcase",
  "Water Bottle": "water",
  "First Aid Kit": "medkit",
  Flashlight: "flashlight",
  Snacks: "fast-food",
  Camera: "camera",
  "Power Bank": "battery-charging", // Fixed typo in icon name
  Umbrella: "umbrella",
  Sunscreen: "sunny",
  "Hat": "hat",
  "Walking Shoes": "walk",
  Map: "map",
};

export default function ThingsToCarry({ navigation }) {
  const [itemsToCarry, setItemsToCarry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [agentLogo, setAgentLogo] = useState("");
const[name,setName]=useState();
  useEffect(() => {
    const getThingsToCarry = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("authToken");
        if (!token) throw new Error("No token found");

        const decodedToken = jwtDecode(token);
        const locationId = decodedToken.location_id;
        setAgentLogo(decodedToken.agent_logo);
        const name=AsyncStorage.getItem("lastName");
        setName(name);
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
        
        console.log("API Response:", response.data);
        if (response.data && response.data.data) {
          setItemsToCarry(response.data.data);
        } else {
          console.warn("Unexpected API response structure");
          setItemsToCarry([]);
        }
      } catch (error) {
        console.error("Error fetching things to carry:", error.message);
        setItemsToCarry([]);
      } finally {
        setLoading(false);
      }
    };

    getThingsToCarry();
  }, []);

  if (loading) {
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
            source={agentLogo}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.headerText}>{name}</Text>
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

      {itemsToCarry.length > 0 ? (
        <FlatList
          data={itemsToCarry}
          numColumns={3}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          style={styles.flatList}
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
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No items to carry</Text>
            </View>
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items to carry</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  header: {
    paddingHorizontal: wp("5%"),
    paddingBottom: hp("2%"),
    paddingTop: hp("7%"),
    backgroundColor: "#fde3e370",
  },
  backButton: { 
    marginVertical: hp("1%") 
  },
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
  headerText: { 
    fontSize: hp("2.5%"), 
    fontWeight: "600", 
    color: "#000" 
  },
  headerSubText: { 
    fontSize: hp("2%"), 
    fontWeight: "600" 
  },
  searchIcon: { 
    marginLeft: "auto" 
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("2%"),
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
  },
  titleText: { 
    fontSize: wp("4%"), 
    color: "#0066FF", 
    fontWeight: "500" 
  },
  flatList: {
    flex: 1,
  },
  listContainer: { 
    padding: wp("3%"),
    flexGrow: 1,
  },
  itemContainer: {
    width: wp("28%"),
    marginHorizontal: wp("2%"),
    marginVertical: hp("1%"),
    alignItems: "center",
    justifyContent: 'center',
  },
  gradientIconContainer: {
    width: wp("15%"),
    height: wp("15%"),
    borderRadius: wp("7.5%"),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp('1%'),
  },
  itemText: { 
    fontSize: wp("3.5%"), 
    color: "#333", 
    textAlign: "center",
    marginTop: hp('0.5%'),
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: wp('4%'),
    color: '#666',
  }
});
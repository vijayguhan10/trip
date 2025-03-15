import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import axios from "axios";
import { Icon } from "react-native-elements";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Sidebar from "../SideBar";

const activities = [
  {
    id: "1",
    title: "Activity 1",
    image:
      "https://img.freepik.com/premium-photo/sunset-view-mountains-mountains_865967-1116351.jpg",
  },
  {
    id: "2",
    title: "Activity 2",
    image:
      "https://www.treksandtrails.org/system/images/000/510/515/42febd05a4c462bbf831f6e444ef3801/x600gt/Kalavantin-Durg.jpg?1628950718",
  },
];
const destinations = [
  {
    id: "1",
    title: "Shaniwar Wada",
    imageUri:
      "https://www.treksandtrails.org/system/images/000/510/515/42febd05a4c462bbf831f6e444ef3801/x600gt/Kalavantin-Durg.jpg?1628950718",
    navigate: true,
  },
  {
    id: "2",
    title: "Sinhagad Fort",
    imageUri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtD6NqBnrOrK4UcNa9X3uBuRFBx1TcXBcn2Q&s",
  },
  {
    id: "3",
    title: "Mulshi Dam",
    imageUri:
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?ixid=M3wxMzcxOTN8MHwxfHNlYXJjaHwyfHxtb3VudGFpbiUyMHBlYWt8ZW58MHx8fHwxNjg0MTQ4OTI3fDA&ixlib=rb-4.0.3&fm=jpg&w=3300&h=2200&fit=max",
  },
  {
    id: "4",
    title: "Mulshi Dam",
    imageUri:
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?ixid=M3wxMzcxOTN8MHwxfHNlYXJjaHwyfHxtb3VudGFpbiUyMHBlYWt8ZW58MHx8fHwxNjg0MTQ4OTI3fDA&ixlib=rb-4.0.3&fm=jpg&w=3300&h=2200&fit=max",
  },
];
const HomeScreen = ({ navigation }) => {
  const [topDestinations, setTopDestinations] = useState([]);
  const [topActivities, setTopActivities] = useState([]);

  const GetPlaces = async () => {
    try {
      const destinationId = await AsyncStorage.getItem("locationid");
      if (!destinationId) throw new Error("Destination ID not found");

      const response = await axios.get(
        `${API_URL}/destination/${destinationId}`
      );
      if (!response.data || !response.data.data)
        throw new Error("Invalid API Response");

      const places = response.data.data || [];
      console.log("Fetched Places:", JSON.stringify(places, null, 2));

      const destinations = places.filter((place) => !place.top_activities);
      const activities = places.filter((place) => place.top_activities);
      setTopDestinations(destinations);
      setTopActivities(activities);
    } catch (error) {
      console.error("Error fetching places:", error.message || error);
    }
  };

  useEffect(() => {
    GetPlaces();
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log("Sidebar state:", isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={closeSidebar}>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={toggleSidebar} style={{ padding: 10 }}>
              <Icon
                name={isSidebarOpen ? "close" : "menu"}
                size={28}
                color="#000"
              />
            </TouchableOpacity>

            <Image
              source={{
                uri: "https://s3-alpha-sig.figma.com/img/44b3/9dae/f7b8d9642d79c4d7aa93f9b95ca7a006?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VbWRgFdKRgubmu4OCPj40WLsnzqhAOym7l-qC34kfgGWTOpKb4wny2X8bI~P04jxYprVcVUbDUtxFFqkOz6JGiKhbCzWTb~RZLInR~ex0fZd~Y5vJ~~YuePtIBoROXfUgAuHVcF84l-JjLsUzNCP7-DBifgICfsoQxoZ~W906MyT-SIwQ0hsQvapnk0azm~xZenRIz5oCNHPYxdnayXZNt-32j9fFKnrcsWvcGLZqP9CLkndE03fA11urIdA1Yl0QCFl3m4a-RSA3jR1YIX5RDC9UdyKxx07M5d9Tg1HHkB5LUFRBRs2TCrKPQAJ2paoAUV1oFakggEY7~CeYt8qOw__",
              }}
              style={styles.profileImage}
            />
            <Icon name="search" size={28} color="#000" style={styles.search} />
          </View>

          <Text style={styles.welcomeText}>Welcome!</Text>
          <ScrollView contentContainerStyle={{ paddingBottom: hp("10%") }}>
            <View style={styles.weatherContainer}>
              <View style={styles.wetherLocation}>
                <Text style={styles.locationText}>📍 Pune, India</Text>
                <Text style={styles.DateText}>Thursday, October 10</Text>
              </View>
              <View style={styles.WetherReportContainer}>
                <Image
                  source={{
                    uri: "https://static.vecteezy.com/system/resources/thumbnails/008/854/797/small_2x/sunny-and-rainy-cloudy-day-weather-forecast-icon-meteorological-sign-3d-render-png.png",
                  }}
                  style={styles.weatherIcon}
                />
                <View style={styles.WetherReport}>
                  <Text style={styles.temperatureText}>
                    19°<Text style={styles.celcius}>C</Text>
                  </Text>
                  <Text>Rainy</Text>
                </View>
              </View>
            </View>

            <View style={styles.categoriesContainer}>
              <CategoryItem title="Restaurants" />
              <CategoryItem title="Activities" />
              <CategoryItem title="Shopping" />
            </View>

            <Text style={styles.sectionTitle}>Top Destinations</Text>
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {topDestinations.map((item) => (
                  <TouchableOpacity
                    key={item._id}
                    onPress={() =>
                      navigation.navigate("Indetail", { destination: item })
                    }
                  >
                    <DestinationItem
                      title={item.place_name}
                      imageUri={item.image_urls[0]}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View>
              <Text style={styles.Activitytext}>Top Activities</Text>
              <FlatList
                data={topActivities}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Indetail", { destination: item })
                    }
                  >
                    <Image
                      style={styles.ActivityImage}
                      source={{ uri: item.image_urls[0] }}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          </ScrollView>
        </View>

        {isSidebarOpen && <Sidebar isSidebarOpen={isSidebarOpen} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const CategoryItem = ({ title }) => (
  <TouchableOpacity style={styles.categoryItem}>
    <Image
      source={{
        uri: "https://s3-alpha-sig.figma.com/img/185c/3420/3e95a903e1dde7cea8c778376c9a3708?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hHmN0jPQyC1APrQ4wxzyFkFQQ3-cY28w9xF5sJIkcqFMMomxJdbgsIOqvcnRk52ZaEGtTOUW41IvFENbdv~PuruxSp~MvFHRlOsUY0xaDRG4g1AdkfRBdYCGjzSI0T9P3I3kzeGVjqGgevUz0jCRoYMgfbO82oQwIdqjcye0XOJ2LPUzJmUK7RH2~CfNZML9PNpqzGdQJlOQVusv7SUnm24rCZZsrTJnNm0B7icy8PCqT1VBNEeCCISbfn82g89Y6WmcBw3zbRUm8~qLPqb8lYuqy65hG4UXrfrlB0miu-c1vSVTehUSQXrV99anFhXpV~iazcZjDft3kEWccjp32Q__",
      }}
      style={styles.categoryImage}
    />
    <Text style={styles.categorytitle}>{title}</Text>
  </TouchableOpacity>
);

const DestinationItem = ({ title, imageUri }) => {
  console.log("DestinationItem:", title, imageUri);
  return (
    <View style={styles.destinationItem}>
      <Image source={{ uri: imageUri }} style={styles.destinationImage} />
      <Text style={styles.destinationText}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    fontFamily: "Noir_Regular",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: wp("5%"),
    paddingTop: hp("8%"),
  },
  menu: {
    marginLeft: 10,
  },
  profileImage: {
    width: wp("18%"),
    height: hp("7%"),
    borderRadius: wp("12.5%"),
    alignSelf: "center",
    resizeMode: "cover",
  },
  search: {
    // flex: 1,
    alignItems: "flex-end",
  },
  welcomeText: {
    fontSize: wp("6%"),
    fontWeight: "light",
    textAlign: "center",
    marginLeft: wp("3%"),
    fontFamily: "LufgaSemiBold",
  },
  weatherContainer: {
    alignItems: "center",
    marginVertical: hp("2.5%"),
    marginLeft: wp("1.5%"),
    flexDirection: "row",
  },
  wetherLocation: {
    flexDirection: "column",
  },
  locationText: { fontSize: wp("4%"), fontFamily: "Noir_Regular" },
  DateText: { paddingLeft: wp("6%"), fontFamily: "LufgaLight" },
  weatherIcon: { width: wp("20%"), height: hp("6%") },
  WetherReport: {
    flexDirection: "column",
  },
  WetherReportContainer: {
    flexDirection: "row",
    marginLeft: wp("15%"),
  },
  temperatureText: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    fontFamily: "LufgaItalic",
  },
  celcius: { fontSize: wp("2.5%"), position: "relative", bottom: hp("4%") },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: hp("1.5%"),
  },
  sectionTitle: {
    fontSize: wp("5%"),
    fontWeight: "light",
    marginLeft: wp("5%"),
    color: "grey",
    marginTop: hp("2%"),
    marginBottom: hp("2%"),
  },
  Activitytext: {
    fontSize: wp("5%"),
    fontWeight: "light",
    marginLeft: wp("5%"),
    color: "grey",
    fontFamily: "Noir_Regular",
  },
  destinationsContainer: {
    flexDirection: "row",
    padding: wp("2.5%"),
  },
  categoryItem: {
    alignItems: "center",
  },
  categoryImage: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("2.5%"),
  },
  destinationItem: {
    marginRight: wp("2.5%"),
  },
  destinationImage: {
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: wp("2.5%"),
  },
  destinationText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    position: "relative",
    bottom: hp("3.5%"),
    fontFamily: "LufgaItalic",
  },
  ActivityImage: {
    width: wp("90%"),
    height: hp("30%"),
    borderRadius: wp("4%"),
    alignSelf: "center",
    resizeMode: "cover",
    marginVertical: hp("1%"),
  },
  categorytitle: {
    fontFamily: "LufgaItalic",
  },
});

export default HomeScreen;

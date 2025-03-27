
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
import * as Location from "expo-location";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Sidebar from "../SideBar";
const WEATHER_API_KEY = "4b9b8688eca407ea3546cf525c8f03cb";
const HomeScreen = ({ navigation }) => {
  const [topDestinations, setTopDestinations] = useState([]);
  const [topActivities, setTopActivities] = useState([]);
  const [token, setToken] = useState();
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Loading location...");
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const [cityName, setCityName] = useState("Pune");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activities, setactivities] = useState([]);
  const[locationid,setlocationid]=useState();
    useEffect(() => {
        const getactivities = async () => {
          try {
            const authToken = await AsyncStorage.getItem("authToken");
            const locationId = await AsyncStorage.getItem("locationid");
            setlocationid(locationId);
            if (!authToken || !locationId) {
              console.error("Auth token or Location ID missing");
              return;
            }
      
            const response = await axios.get(`${API_URL}/task`, {
              params: { 
                location_id: locationId,
                id_deleted: false 
              },
            });
            
      
            console.log("👼👼👼👼",JSON.stringify(response.data,null,2));
            if (response.data && Array.isArray(response.data)) {
              
              setactivities(response.data);

            } else {
              console.error("Unexpected API response format", response.data.transformedTasks);
            }
          } catch (error) {
            console.error("Error fetching shops:", error);
          }
        };
      
        getactivities();
      }, []);
  const formatDate = () => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const today = new Date();
    return today.toLocaleDateString("en-US", options);
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      clear: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
      clouds: "https://cdn-icons-png.flaticon.com/512/414/414927.png",
      rain: "https://cdn-icons-png.flaticon.com/512/4150/4150904.png",
      snow: "https://cdn-icons-png.flaticon.com/512/6428/6428699.png",
      thunderstorm: "https://cdn-icons-png.flaticon.com/512/5902/5902602.png",
      drizzle: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
      mist: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
      default: "https://cdn-icons-png.flaticon.com/512/979/979585.png",
    };

    condition = condition.toLowerCase();
    return icons[condition] || icons["default"];
  };

  const fetchWeatherData = async (city = "Pune") => {
    try {
      setLoadingWeather(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
      );

      const data = response.data;
      setWeatherData({
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main,
        icon: getWeatherIcon(data.weather[0].main),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
      setLocation(`${data.name}, ${data.sys.country}`);
      setCityName(data.name);
    } catch (error) {
      setWeatherData({
        temp: 25,
        condition: "Clear",
        icon: getWeatherIcon("clear"),
        humidity: 60,
        windSpeed: 5,
      });
      setLocation("Pune, India");
    } finally {
      setLoadingWeather(false);
    }
  };

  const getCityFromCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_API_KEY}`
      );
      if (response.data && response.data.length > 0) {
        return response.data[0].name;
      }
      return "Pune";
    } catch (error) {
      return "Pune";
    }
  };

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return "Pune";
      }

      let location = await Location.getCurrentPositionAsync({});
      const city = await getCityFromCoords(
        location.coords.latitude,
        location.coords.longitude
      );
      return city;
    } catch (error) {
      return "Pune";
    }
  };

  const GetPlaces = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      setToken(authToken);
      const destinationId = await AsyncStorage.getItem("locationid");
      if (!destinationId) throw new Error("Destination ID not found");

      const response = await axios.get(
        `${API_URL}/destination/${destinationId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data || !response.data.data)
        throw new Error("Invalid API Response");

      const places = response.data.data || [];
      const destinations = places.filter((place) => !place.top_activities);
      const activities = places.filter((place) => place.top_activities);
      setTopDestinations(destinations);
      setTopActivities(activities);
    } catch (error) {}
  };

  useEffect(() => {
    const init = async () => {
      setCurrentDate(formatDate());
      const city = await getCurrentLocation();
      await fetchWeatherData(city);
      await GetPlaces();
    };
    init();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const WeatherDisplay = () => {
    if (loadingWeather || !weatherData) {
      return <View style={styles.WetherReportContainer}></View>;
    }

    return (
      <View style={styles.WetherReportContainer}>
        <Image source={{ uri: weatherData.icon }} style={styles.weatherIcon} />
        <View style={styles.WetherReport}>
          <Text style={styles.temperatureText}>
            {weatherData.temp}°<Text style={styles.celcius}>C</Text>
          </Text>
          <Text>{weatherData.condition}</Text>
         
        </View>
      </View>
    );
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
                <Text style={styles.locationText}>📍 {location}</Text>
                <Text style={styles.DateText}>{currentDate}</Text>
              </View>
              <WeatherDisplay />
            </View>

            <View style={styles.categoriesContainer}>
              <CategoryItem title="Restaurants" />
              <CategoryItem title="Activities" />
              <CategoryItem title="Shopping" />
            </View>

            <Text style={styles.sectionTitle}>Top Destinations</Text>
            <View style={{marginLeft:wp('5%')}}>
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
  weatherIcon: { width: wp("15%"), height: hp("5%") },
  WetherReport: {
    flexDirection: "column",
  },
  WetherReportContainer: {
    flexDirection: "row",
    marginLeft: wp("12%"),
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

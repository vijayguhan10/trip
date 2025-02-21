import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Sidebar from "../SideBar";

const HomeScreen = () => {
  const [fontsLoaded] = useFonts({
    Nunito_Regular: Montserrat_400Regular,
    Nunito_Bold: Nunito_700Bold,
  });

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

          {/* Top Destinations */}
          <Text style={styles.sectionTitle}>Top Destinations</Text>
          <ScrollView nestedScrollEnabled={true} style={styles.container}>
            {/* Horizontal ScrollView for Destinations */}
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.destinationsContainer}
              >
                <DestinationItem
                  title="Shaniwar Wada"
                  imageUri="https://www.treksandtrails.org/system/images/000/510/515/42febd05a4c462bbf831f6e444ef3801/x600gt/Kalavantin-Durg.jpg?1628950718"
                />
                <DestinationItem
                  title="Sinhagad Fort"
                  imageUri="https://www.treksandtrails.org/system/images/000/510/515/42febd05a4c462bbf831f6e444ef3801/x600gt/Kalavantin-Durg.jpg?1628950718"
                />
                <DestinationItem
                  title="Mulshi Dam"
                  imageUri="https://www.treksandtrails.org/system/images/000/510/515/42febd05a4c462bbf831f6e444ef3801/x600gt/Kalavantin-Durg.jpg?1628950718"
                />
              </ScrollView>
            </View>

            {/* Top Activities Section */}
            <View>
              <Text style={styles.Activitytext}>Top activities</Text>
              <Image
                style={styles.ActivityImage}
                source={{
                  uri: "https://www.treksandtrails.org/system/images/000/510/515/42febd05a4c462bbf831f6e444ef3801/x600gt/Kalavantin-Durg.jpg?1628950718",
                }}
              />
              <Image
                style={styles.ActivityImage}
                source={{
                  uri: "https://www.treksandtrails.org/system/images/000/510/515/42febd05a4c462bbf831f6e444ef3801/x600gt/Kalavantin-Durg.jpg?1628950718",
                }}
              />
            </View>
          </ScrollView>
        </View>

        {/* Sidebar */}
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
    <Text>{title}</Text>
  </TouchableOpacity>
);

const DestinationItem = ({ title, imageUri }) => (
  <View style={styles.destinationItem}>
    <Image source={{ uri: imageUri }} style={styles.destinationImage} />
    <Text style={styles.destinationText}>{title}</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    fontFamily: "Nunito_Regular",
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
    flex: 1,
    alignItems: "flex-end",
  },
  welcomeText: {
    fontSize: wp("6%"),
    fontWeight: "light",
    textAlign: "center",
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
  locationText: { fontSize: wp("4%") },
  DateText: { paddingLeft: wp("6%") },
  weatherIcon: { width: wp("20%"), height: hp("6%") },
  WetherReport: {
    flexDirection: "column",
  },
  WetherReportContainer: {
    flexDirection: "row",
    marginLeft: wp("15%"),
  },
  temperatureText: { fontSize: wp("5%"), fontWeight: "bold" },
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
  },
  ActivityImage: {
    width: wp("90%"),
    height: hp("30%"),
    borderRadius: wp("4%"),
    alignSelf: "center",
    resizeMode: "cover",
  },
});

export default HomeScreen;

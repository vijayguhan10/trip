import React, { useState } from "react";
import {
  View,
  Text,
  Image,
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
    setIsSidebarOpen(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView  contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Icon
              name={isSidebarOpen ? "close" : "menu"}
              size={28}
              color="#000"
              style={styles.menu}
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.destinationsContainer}
        >
          <DestinationItem
            title="Shaniwar Wada"
            imageUri="https://s3-alpha-sig.figma.com/img/f503/9a20/56c3d6d65717ebff3a5e4d954e1195d1?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iSMXdZ9vkLqinkvRR1lYViJ8TbPq~EztQzokgSTTrI0rBzhk6IssOe6m6zExYJIZKVEDg2mFlYCx3ajy96qq7VRFUiiTWLXPzbHjQYY49PJSCjVCX5aaQ5zKzd-MhhpU9VnKPWkFJ1FxKLGpkmVH6TDQj91vOQjnckz~6TEj41ncD-rmOIoaErF3rYQwU6IuBVMs4fsa0hEMgTo~CPVv4hg6Cun~N8KTMoZUBFdnWjHhHkp8ky9Dqt8t4zXZxIsT7DzBxgL6kOHPYVimWFrTbjE48C~SU~kUtj8nQ5tgQTZlDatwDLZbJjYZ7zZGJrX9Eg3gH3S5jkpTOspAs17PiA__"
          />
          <DestinationItem
            title="Sinhagad Fort"
            imageUri="https://s3-alpha-sig.figma.com/img/fbb8/2ac0/0f3c6f9433c726fd4c053bc5cec480cd?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ptX0NAvw3V6pL~6G6HuwPpodZmFCN8FpQHWXke9NuxutGLS8k7XEk3m2KkPx0UtS0LmKI5j4iVlu32UHsOxSOwho1tihu917QLzE2IltE78CfGscNx-DEA6LZ8LorEz99N-xDN23KALJZ~ZVAlu1ulmOM4uyAB7mdnYn9KchvLb16aFrH64u8ZusvPw6wbY2FcYBkX5kmicuuA5eMNIaZXfZ3tfxmThKYdR52IdsQSBCjgQNRS4udd78oNWczFvankGFsLgQwGYWOaZ1OzvRl6a9g8OEFD2imD~P-bSxbUy01OesC3KKtxpzH65wmpBpaP-w~sCZEqW50VkpzljyZg__"
          />
          <DestinationItem
            title="Mulshi Dam"
            imageUri="https://s3-alpha-sig.figma.com/img/f9c0/a682/af11738aa1662da967e0edb28ae3c965?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XKkLi9OD3-KqQdLGTERCUQDEMdDWjr2S3lbk75uVuzDxGv4kJ5ooe8Bjyc-rz1hWi3yypzrB3dugVjA4n8d1GCyx~ZGliyptN2L6CJt~qWaXqtFW5ZnqJ5wGCzypKfUZuZgHkmZD-B-oKeyrfpMI6S2M9jVoZmYOSCRg52JIA7U~7f~MG1--oLBBJsYYllG0dtlTB5WjjrZyb3z0wzWEYP-eL7auA8UzaKdBCUolSq7kbex5H6TqtOvtBqo9zgUZOJpKmyFF91HfA4MR-iQoNFTqJVso9SYd27jblMSZnbtjqOtRJGWeGpNNon5PEAo1IAgiBSLHgL6kKY7UFO5~kA__"
          />{" "}
          <DestinationItem
            title="Shaniwar Wada"
            imageUri="https://s3-alpha-sig.figma.com/img/f503/9a20/56c3d6d65717ebff3a5e4d954e1195d1?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iSMXdZ9vkLqinkvRR1lYViJ8TbPq~EztQzokgSTTrI0rBzhk6IssOe6m6zExYJIZKVEDg2mFlYCx3ajy96qq7VRFUiiTWLXPzbHjQYY49PJSCjVCX5aaQ5zKzd-MhhpU9VnKPWkFJ1FxKLGpkmVH6TDQj91vOQjnckz~6TEj41ncD-rmOIoaErF3rYQwU6IuBVMs4fsa0hEMgTo~CPVv4hg6Cun~N8KTMoZUBFdnWjHhHkp8ky9Dqt8t4zXZxIsT7DzBxgL6kOHPYVimWFrTbjE48C~SU~kUtj8nQ5tgQTZlDatwDLZbJjYZ7zZGJrX9Eg3gH3S5jkpTOspAs17PiA__"
          />
          <DestinationItem
            title="Sinhagad Fort"
            imageUri="https://s3-alpha-sig.figma.com/img/fbb8/2ac0/0f3c6f9433c726fd4c053bc5cec480cd?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ptX0NAvw3V6pL~6G6HuwPpodZmFCN8FpQHWXke9NuxutGLS8k7XEk3m2KkPx0UtS0LmKI5j4iVlu32UHsOxSOwho1tihu917QLzE2IltE78CfGscNx-DEA6LZ8LorEz99N-xDN23KALJZ~ZVAlu1ulmOM4uyAB7mdnYn9KchvLb16aFrH64u8ZusvPw6wbY2FcYBkX5kmicuuA5eMNIaZXfZ3tfxmThKYdR52IdsQSBCjgQNRS4udd78oNWczFvankGFsLgQwGYWOaZ1OzvRl6a9g8OEFD2imD~P-bSxbUy01OesC3KKtxpzH65wmpBpaP-w~sCZEqW50VkpzljyZg__"
          />
          <DestinationItem
            title="Mulshi Dam"
            imageUri="https://s3-alpha-sig.figma.com/img/f9c0/a682/af11738aa1662da967e0edb28ae3c965?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XKkLi9OD3-KqQdLGTERCUQDEMdDWjr2S3lbk75uVuzDxGv4kJ5ooe8Bjyc-rz1hWi3yypzrB3dugVjA4n8d1GCyx~ZGliyptN2L6CJt~qWaXqtFW5ZnqJ5wGCzypKfUZuZgHkmZD-B-oKeyrfpMI6S2M9jVoZmYOSCRg52JIA7U~7f~MG1--oLBBJsYYllG0dtlTB5WjjrZyb3z0wzWEYP-eL7auA8UzaKdBCUolSq7kbex5H6TqtOvtBqo9zgUZOJpKmyFF91HfA4MR-iQoNFTqJVso9SYd27jblMSZnbtjqOtRJGWeGpNNon5PEAo1IAgiBSLHgL6kKY7UFO5~kA__"
          />
        </ScrollView>
        <View>
          <Text style={styles.Activitytext}>Top activities</Text>
          <Image
            style={styles.ActivityImage}
            source={{
              uri: "https://lh5.googleusercontent.com/p/AF1QipPYMyxJF3wm6ZLl677rA9grsbqA-eQ92n8WmimX=w675-h390-n-k-no",
            }}
          ></Image>
        </View>
      </ScrollView>

      {/* Sidebar */}
      {isSidebarOpen && <Sidebar />}
    </View>
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
    flex: 1,
    alignItems: "flex-start",
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

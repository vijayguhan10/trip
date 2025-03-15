import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const PlacesIndetail = () => {
  const route = useRoute();
  const destination = route.params?.destination || {};
  console.log("Destination  data reached:", destination);
  const reviews = [
    { id: "1", text: "Great place to relax!" },
    { id: "2", text: "Loved the beaches!" },
  ];
  const RestauruntsScroll = ({ title, imageUri }) => (
    <View style={styles.destinationItem}>
      <Image source={{ uri: imageUri }} style={styles.destinationImage} />
      <Text style={styles.destinationText}>{title}</Text>
    </View>
  );
  const NearbyPlaces = ({ title, imageUri }) => (
    <View style={styles.destinationItem}>
      <Image source={{ uri: imageUri }} style={styles.NearbyPlacesImage} />
      <Text style={styles.NearbyText}>{title}</Text>
    </View>
  );
  const restaurants = [
    {
      id: "1",
      name: "Sumba Seafood",
      imgurl:
        "https://s3-alpha-sig.figma.com/img/b064/fcdc/7ea59e6efe339a1120620f2975b65eb3?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FyEKPl6gCySTfS5IWrzKGfsyluZiUt~gwojhWY0t1KQxRxMO7rDbkGM-SEXWPQMX2ac60acqMxqDVLikKzFRkQlqope9ppb6RFOWRX6Odeu8Z5eyZAw1E5irOhIJFpAHm3GwXJQQNEqc6RUMUviEAN4rgjuFMPJKEfqpeJX~HswG~CAHJMxjtWkunzQBbMRv3oHrr5O9H5g-KCwqPzgGpfNL4Q4-0npNWUgFx7ZFXhv3kbs7EXY6XrmaNOahkX4dU03VDDkNE4kYwch7VkaewJMU50gwx~zbKQ13X2w-i6oEluRVCLp23stkeIKm6LVREGRwJMTOUs116hIWdVwpRg__",
    },
    {
      id: "2",
      name: "Sumba Seafood",
      imgurl:
        "https://assets.simplotel.com/simplotel/image/upload/x_0,y_0,w_1920,h_1080,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/swosti-group/Front_Elevation_Swosti_Puri_lngcbu",
    },
  ];
  const NearbyPlacesjson = [
    {
      id: "1",
      name: "Sumba Seafood",
      imgurl:
        "https://as2.ftcdn.net/v2/jpg/01/92/08/35/1000_F_192083524_wiLk7eg2Y0mxHa17Gai4slZpUTuYzXTm.jpg",
    },
    {
      id: "2",
      name: "Sumba Seafood",
      imgurl:
        "https://img.freepik.com/free-photo/beautiful-natural-landscape_23-2151922760.jpg",
    },
    {
      id: "11",
      name: "Sumba Seafood",
      imgurl:
        "https://as2.ftcdn.net/v2/jpg/01/92/08/35/1000_F_192083524_wiLk7eg2Y0mxHa17Gai4slZpUTuYzXTm.jpg",
    },
    {
      id: "3",
      name: "Sumba Seafood",
      imgurl:
        "https://img.freepik.com/free-photo/beautiful-natural-landscape_23-2151922760.jpg",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          source={{
            uri: destination.image_urls[0],
          }}
          style={styles.image}
        />
        <View style={{ padding: 14 }}>
          <View style={styles.infoContainer}>
            <Text style={styles.rating}>★ 4.1 (2233 reviews)</Text>
            <View style={styles.flexfortime}>
              <Text style={styles.title}>{destination.place_name}</Text>
              <Text style={styles.info}>
                Best time to visit:{"\n"}
                <Text style={styles.subInfo}>
                  {destination.best_time_to_visit}
                </Text>
              </Text>
            </View>
            <Text style={styles.description}>{destination.short_summary}</Text>
          </View>

          <View style={styles.mapContainer}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/2560px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG",
              }}
              style={styles.mapimage}
            />
            {/* <Text style={styles.description}>{destination.short_summary}</Text> */}
          </View>

          <Text style={styles.title}>Recommended Restaurants</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            style={styles.scrollContainer}
          >
            {restaurants.map((items) => (
              <RestauruntsScroll
                key={items.id}
                title={items.name}
                imageUri={items.imgurl}
              />
            ))}
          </ScrollView>

          <Text style={styles.title}>Nearby Places</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            style={styles.scrollContainer}
            contentContainerStyle={{ paddingBottom: hp("10%") }}
          >
            {NearbyPlacesjson.map((items) => (
              <NearbyPlaces
                key={items.id}
                title={items.name}
                imageUri={items.imgurl}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 16,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderWidth: 1,
    borderColor: "transparent",
  },
  flexfortime: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 21,
  },
  rating: {
    fontSize: 18,
    color: "hsl(47, 100.00%, 50.00%)",
  },
  mapimage: {
    width: "100%",
    height: 90,
    borderRadius: 6,
  },
  info: {
    backgroundColor: "black",
    fontFamily: "LufgaThin",

    width: 140,
    fontSize: 14,
    color: "white",
    textAlign: "center",
    position: "relative",
    bottom: 30,
    borderRadius: 5,
    padding: 10,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subInfo: {
    fontFamily: "LufgaThin",
    fontSize: 12,
    color: "white",
    textAlign: "center",
    display: "block",
    marginTop: 5,
  },
  mapContainer: {
    marginBottom: 16,
  },
  description: {
    fontFamily: "LufgaRegular",

    color: "rgba(64, 64, 64, 0.73)",
    fontSize: 10,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  reviewItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  reviewText: {
    fontSize: 16,
  },
  restaurantItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  restaurantName: {
    fontSize: 16,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  destinationItem: {
    marginRight: wp("2.5%"),
  },
  destinationImage: {
    width: wp("80%"),
    height: wp("50%"),
    borderRadius: wp("2.5%"),
  },
  NearbyPlacesImage: {
    width: wp("40%"),
    height: wp("50%"),
    borderRadius: wp("2.5%"),
  },
  destinationText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    position: "relative",
    bottom: hp("7.5%"),
    right: 18,
    fontFamily: "Noir_Regular",
    fontSize: 25,
  },
  NearbyText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    position: "relative",
    bottom: hp("3.5%"),
    // right: 18,
    fontFamily: "LufgaThin",
    fontSize: 15,
  },
  restautntscroll: {
    flexDirection: "row",
  },
});

export default PlacesIndetail;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
} from "react-native";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Rating } from "react-native-ratings";
import ToastManager, { Toast } from "toastify-react-native";
// const topPicks = [
//   {
//     image:
//       "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&h=200&fit=crop",
//     title: "Masala Dosa",
//     description:
//       "It's traditionally filled with a spiced potato mixture made with onions, mustard seeds, curry leaves, and turmeric.",
//     price: "149",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&h=200&fit=crop",
//     title: "Masala Dosa",
//     description:
//       "It's traditionally filled with a spiced potato mixture made with onions, mustard seeds, curry leaves, and turmeric.",
//     price: "149",
//   },
// ];

// const recommendedDishes = [
//   {
//     image:
//       "https://images.unsplash.com/photo-1630383249896-424e482df921?w=100&h=100&fit=crop",
//     title: "Steam Idli",
//     description:
//       "Idli is a traditional South Indian dish made from fermented rice and urad dal (black gram) batter, steamed into soft, fluffy cakes.",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1630383249896-424e482df921?w=100&h=100&fit=crop",
//     title: "Medu Wada",
//     description:
//       "Medu Wada is a South Indian doughnut-shaped fritter made with urad dal, crispy on the outside and soft inside.",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1630383249896-424e482df921?w=100&h=100&fit=crop",
//     title: "Medu Wada",
//     description:
//       "Medu Wada is a South Indian doughnut-shaped fritter made with urad dal, crispy on the outside and soft inside.",
//   },
// ];

const DishCard = ({ image, title, description, price }) => (
  <TouchableOpacity style={styles.dishCard}>
    <Image source={{ uri: image }} style={styles.dishImage} />
    <View style={styles.overlay}>
      <View style={styles.vegIcon}>
        <View style={styles.vegSquare}>
          <View style={styles.vegDot} />
        </View>
      </View>
      <Text style={styles.dishTitle}>{title}</Text>
      <Text style={styles.dishDescription} numberOfLines={2}>
        {description}
      </Text>
      <Text style={styles.dishPrice}>₹{price}</Text>
    </View>
  </TouchableOpacity>
);

const Fooddetails = ({ navigation }) => {
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [shopFood, setShopFood] = useState([]);
    const [fillallfield, setFillAllField] = useState("");
    const [rating, setRating] = useState(0);
  const[Shopid,setshopid]=useState();
  const restaurntId = route.params?.restaurant_id;
  const shop = route.params?.shop;
  console.log("Restaurant Id reached:", restaurntId);
  const handlesubmit=async()=>{
    console.log("😍😍😍😍")
    const authToken = await AsyncStorage.getItem("authToken");
    const locationId = await AsyncStorage.getItem("locationid");
    if (!rating || !reviewText || !reviewTitle) {
      setFillAllField("⚠ Fill all fields before submitting.");
      
      setTimeout(() => {
        setFillAllField("");
      }, 5000);
  
      return;
    }
    setFillAllField(""); 
    console.log(rating,Shopid)
    console.log("😍😍😍😍")
    const response=await axios.post(`${API_URL}/review`,{business_id:Shopid,business_type:"Restaurant",title:reviewTitle,rating:rating,description:reviewText},{
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
    if(response.status===201){
      setModalVisible(false);
      setRating(0);
      setReviewTitle("")
      setReviewText("")
      Toast.success("Review added");
    }
  
  }
  const handleopenmodal=(shopid)=>{
    console.log(shopid)
    setshopid(shopid);
    setModalVisible(true);
  }
  const GetFood = async () => {
    try {
      console.log("API URL data:", API_URL);
      const authToken = await AsyncStorage.getItem("authToken");

      const response = await axios.get(
        `${API_URL}/dish?restaurant_id=${restaurntId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "Response for the Shop Food:",
        JSON.stringify(response.data, null, 2)
      );

      if (!Array.isArray(response.data)) {
        throw new Error("Invalid API Response: Expected an array");
      }

      // Set the shopFood state with the API response
      setShopFood(response.data);
    } catch (error) {
      console.error("Error fetching dishes:", error.message || error);
    }
  };

  useEffect(() => {
    GetFood();
  }, []);

  // Map shopFood to topPicks and recommendedDishes
  const topPicks = shopFood.map((item) => ({
    id: item._id,
    title: item.name,
    description: item.description,
    image: item.image_url,
    price: item.price,
  }));

  const recommendedDishes = shopFood.map((item) => ({
    id: item._id,
    title: item.name,
    description: item.description,
    image: item.image_url,
    category: item.category,
    price: item.price,
  }));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ToastManager />
      <View style={styles.icon}>
        <Icon
          name="arrow-left"
          type="feather"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.secondrow}>
        <View style={styles.vegContainer}>
          <View style={styles.square}>
            <View style={styles.circle} />
          </View>
          <Text style={styles.vegText}>Pure Vegetarian</Text>
        </View>

        <View style={styles.ratings}>
          <Text style={styles.ratingText}>4.7</Text>
          <Icon name="star" color="white" size={18} style={styles.starIcon} />
        </View>
      </View>
      <View>
        <Text style={styles.headertext}>{shop.business_name}</Text>
      </View>
      <View style={styles.thirdrow}>
        <Text>
          {shop.businessHours.openingTime}-{shop.businessHours.closingTime}
        </Text>
        <Text>{shop?.single_line_address}</Text>
        <TouchableOpacity
          style={styles.bookatablebutton}
          onPress={() => navigation.navigate("Booktable")}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Book a Table
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fourthrow}>
        <View style={styles.searchbar}>
          <Icon name="search" style={{ paddingLeft: wp("3%") }} />
          <TextInput
            style={styles.searchinput}
            placeholder="Search for dishes"
          />
        </View>
        <TouchableOpacity
          style={styles.reviewbutton}
          onPress={()=>{handleopenmodal(shop._id)}}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Add review</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          <TouchableOpacity style={styles.categoryButton}>
            <Icon name="grid" type="feather" size={18} color="black" />
            <Text style={styles.categoryText}>All</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryButton}>
            <Icon name="trending-up" type="feather" size={18} color="black" />
            <Text style={styles.categoryText}>Popular</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryButton}>
            <Icon name="flag" type="feather" size={18} color="black" />
            <Text style={styles.categoryText}>South Indian</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryButton}>
            <Icon name="coffee" type="feather" size={18} color="black" />
            <Text style={styles.categoryText}>Chinese</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryButton}>
            <Icon name="heart" type="feather" size={18} color="black" />
            <Text style={styles.categoryText}>Desserts</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.topratedsection}>
        <Text style={styles.topPicksHeading}>Top Picks</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.topPicksContainer}
        >
          {topPicks.map((dish) => (
            <DishCard
              key={dish.id}
              image={dish.image}
              title={dish.title}
              description={dish.description}
              price={dish.price}
            />
          ))}
        </ScrollView>
      </View>
      {recommendedDishes.map((dish) => {
        console.log("dishes to be mapped : ", JSON.stringify(dish, null, 2));

        return (
          <View key={dish.id} style={styles.recommendedItem}>
            {dish.category === "veg" ? (
              <View style={styles.vegIcon}>
                <View style={styles.vegSquare}>
                  <View style={styles.vegDot} />
                </View>
              </View>
            ) : (
              <View style={styles.NonIcon}>
                <View style={styles.NonSquare}>
                  <View style={styles.NonDot} />
                </View>
              </View>
            )}

            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{dish.title}</Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                <Text style={styles.itemDescription}>{dish.description}</Text>
              </View>
            </View>

            <Image
              source={{ uri: dish.image }}
              style={styles.recommendedImage}
            />
          </View>
        );
      })}
       <Modal visible={modalVisible} transparent animationType="slide">
             <View style={styles.modalOverlay}>
               <View style={styles.modalContainer}>
                 <TouchableOpacity
                   style={styles.closeButton}
                   onPress={() => setModalVisible(false)}
                 >
                   <Icon name="close" size={15} color="white" />
                 </TouchableOpacity>
     
                 <Text style={styles.modalTitle}>Add Review</Text>
                 {fillallfield ? <Text style={styles.errorText}>{fillallfield}</Text> : null}
     
                 <Text style={styles.inputLabel}>Rating</Text>
                 <Rating
             type="star"
             ratingCount={5}
             imageSize={30}
             startingValue={rating}
             onFinishRating={(value) => setRating(value)}
             style={{ marginBottom: hp("2%") }}
           />
     
                 <Text style={styles.inputLabel}>Title</Text>
                 <TextInput
                   style={styles.input}
                   placeholder="Enter review title..."
                   placeholderTextColor="#999"
                   value={reviewTitle}
                   onChangeText={setReviewTitle}
                 />
     
                 <Text style={styles.inputLabel}>Description</Text>
                 <TextInput
                   style={[styles.input, styles.descriptionInput]}
                   placeholder="Write your review..."
                   placeholderTextColor="#999"
                   value={reviewText}
                   onChangeText={setReviewText}
                   multiline
                   numberOfLines={5}
                 />
     
                 <TouchableOpacity
                   style={styles.submitButton}
                   onPress={handlesubmit}
                 >
                   <Text style={styles.submitButtonText}>Add Review</Text>
                 </TouchableOpacity>
               </View>
             </View>
           </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: wp("4%"),
  },
  icon: {
    marginRight: "auto",
    marginTop: hp("5%"),
  },
  secondrow: {
    marginTop: hp("3%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vegContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("2%"),
  },
  square: {
    width: wp("6%"),
    height: wp("6%"),
    backgroundColor: "#ebebeb",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "green",
  },
  circle: {
    width: wp("3%"),
    height: wp("3%"),
    backgroundColor: "#rgba(0, 208, 132, 1)",
    borderRadius: 50,
    alignSelf: "center",
  },
  vegText: {
    fontSize: hp("2%"),
    color: "black",
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#rgba(0, 208, 132, 1)",
    padding: wp("0.7%"),
    borderRadius: wp("1%"),
  },
  ratingText: {
    fontSize: hp("2.2%"),
    fontWeight: "bold",
    color: "#333",
    marginRight: wp("1%"),
    paddingLeft: wp("1.1%"),
  },
  starIcon: {
    marginTop: 2,
  },
  headertext: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    marginTop: hp("1.4%"),
  },
  thirdrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("1%"),
  },
  bookatablebutton: {
    backgroundColor: "#rgba(0, 208, 132, 1)",
    paddingVertical: wp("2%"),
    paddingHorizontal: wp("6%"),
    borderRadius: wp("2%"),
    alignItems: "center",
    justifyContent: "center",
  },
  fourthrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("1%"),
  },
  reviewbutton: {
    backgroundColor: "#rgba(0, 208, 132, 1)",
    paddingVertical: wp("2%"),
    paddingHorizontal: wp("6%"),
    borderRadius: wp("2%"),
    alignItems: "center",
    justifyContent: "center",
  },
  searchbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e5e5e57c",
    width: wp("55%"),
    borderRadius: wp("3%"),
  },
  horizontalScroll: {
    marginTop: hp("2%"),
    flexDirection: "row",
    height: hp("4%"),
    alignItems: "center",
  },
  categoryButton: {
    paddingVertical: hp("0.5%"),
    paddingHorizontal: wp("5%"),
    borderRadius: wp("2%"),
    marginRight: wp("2%"),
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 10,
  },
  categoryText: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    color: "#333",
  },

  topratedsection: {
    marginTop: hp("2%"),
  },
  topPicksHeading: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    color: "black",
    marginBottom: hp("1%"),
  },
  topPicksScroll: {
    flexDirection: "row",
    gap: wp("4%"),
  },
  foodCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: wp("45%"),
    padding: wp("2%"),
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    overflow: "hidden",
  },
  foodImage: {
    width: "100%",
    height: hp("15%"),
    borderRadius: 10,
  },
  foodDetails: {
    paddingVertical: hp("1%"),
  },
  foodTitle: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    color: "#333",
  },
  foodDescription: {
    fontSize: hp("1.5%"),
    color: "#777",
  },
  foodPrice: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    color: "#000",
    marginTop: hp("1%"),
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  topPicksContainer: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  dishCard: {
    width: 280,
    height: 180,
    marginRight: 16,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  dishImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(43, 42, 42, 0.5)",
    justifyContent: "flex-end",
    padding: 16,
    borderRadius: 12,
  },

  vegIcon: {
    marginBottom: 8,
  },
  vegSquare: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: "#00A877",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  vegDot: {
    width: 8,
    height: 8,
    backgroundColor: "#00A877",
    borderRadius: 4,
  },
  NonIcon: {
    marginBottom: 89,
  },
  NonSquare: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: "rgb(250, 132, 112)",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  NonDot: {
    width: 8,
    height: 8,
    backgroundColor: "rgb(219, 51, 21)",
    borderRadius: 4,
  },
  dishTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  dishDescription: {
    fontSize: 12,
    color: "#ffffff",
    opacity: 0.8,
    marginBottom: 8,
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  recommendedSection: {
    paddingTop: hp("2%"),
  },
  recommendedHeading: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
  },
  recommendedItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: wp("4%"),
    borderRadius: 12,
    marginBottom: 12,
    marginTop:15,
    borderWidth: 1,
    borderColor: "#E6DED9",
  },

  vegIcon: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#00A877",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginRight: 8,
  },

  vegDot: {
    width: 10,
    height: 10,
    backgroundColor: "#00A877",
    borderRadius: 5,
  },

  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop:5,
    maxWidth: "70%",
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  itemDescription: {
    fontSize: 12,
    color: "#777",
    lineHeight: 16,
    maxWidth: "110%",
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "left",
  },

  recommendedImage: {
    width: wp("25%"),
    height: wp("30%"),
    borderRadius: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: wp("90%"),
    backgroundColor: "white",
    padding: wp("5%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: hp("1.5%"),
    right: wp("3%"),
    backgroundColor: "red",
    borderRadius: wp("5%"),
    padding: wp("2%"),
  },
  modalTitle: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    marginBottom: hp("2%"),
  },
  inputLabel: {
    alignSelf: "flex-start",
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
    color: "#444",
  },
  input: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: hp("2%"),
    borderRadius: wp("2%"),
    fontSize: hp("2%"),
    marginBottom: hp("2%"),
  },
  descriptionInput: {
    height: hp("15%"),
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "rgba(0, 208, 132, 1)",
    padding: hp("2%"),
    borderRadius: wp("3%"),
    width: "100%",
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: hp("2%"),
    fontWeight: "bold",
  },
});

export default Fooddetails;

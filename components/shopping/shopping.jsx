import { View, Text, FlatList, Image, TextInput, StyleSheet,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
const ShopCard = ({id, image, title, location, distance, discount, rating,navigation,description,mapurl})=>{
  const handlePress = () => {
    console.log(description)
    navigation.navigate("Products", { shopId: id,description:description,mapurl:mapurl });
  };

  return(
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>

    <View style={styles.card}>
    <Image source={{ uri: image }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <View style={styles.titleRow}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>
      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={wp('4%')} color="#666" />
        <Text style={styles.locationText}>{location}</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.distanceText}>Contact Us · {distance}</Text>
        <Text style={styles.discountText}>{discount}% off</Text>
      </View>
    </View>
  </View>
  </TouchableOpacity>
  )
}
 


const topRatedShops = [
  { id: '1', image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d", title: "Artisan Bazaar", location: "Downtown", distance: "0.7 km", discount: 40, rating: "4.7★" },
  { id: '2', image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a", title: "SA Centre", location: "Uptown", distance: "1.2 km", discount: 50, rating: "4.8★" },
  { id: '3', image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a", title: "SA Centre", location: "Uptown", distance: "1.2 km", discount: 50, rating: "4.8★" },
];

const allShops = [
  { id: '3', image: "https://images.unsplash.com/photo-1560807707-8cc77767d783", title: "Mega Mall", location: "City Square", distance: "2.5 km", discount: 35, rating: "4.5★" },
  { id: '4', image: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f", title: "ShopEase Plaza", location: "Market Street", distance: "3.1 km", discount: 30, rating: "4.6★" },
  { id: '5', image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", title: "City Mart", location: "Old Town", distance: "4.0 km", discount: 20, rating: "4.3★" },
];

export default function ShoppingScreen({navigation}) {
 
    const[token,settoken]=useState();
    const[shops,setshops]=useState([]);
  
    useEffect(() => {
      const getShops = async () => {
        try {
          const authToken = await AsyncStorage.getItem("authToken");
          const locationId = await AsyncStorage.getItem("locationid");
    
          if (!authToken || !locationId) {
            console.error("Auth token or Location ID missing");
            return;
          }
    
          const response = await axios.get(`${API_URL}/shop`, {
            params: { location_id: locationId },
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          });
    
          if (response.data && Array.isArray(response.data)) {
            setshops(response.data);
            console.log(response.data);
          } else {
            console.error("Unexpected API response format", response.data);
          }
        } catch (error) {
          console.error("Error fetching shops:", error);
        }
      };
    
      getShops();
    }, []);
    
    const combinedData = [
      { type: "header", title: "Shops Near You" },
      ...shops.map(shop => ({
        id: shop._id,
        image: shop.image_url[0] || "https://via.placeholder.com/150",
        title: shop.business_name,
        location: shop.city,
        distance: `${shop.address}`,
        discount: shop.discount,
        rating: `${shop.customer_rating}★`,
        description: shop.description,
        mapurl:shop.map_url
      })),
    ];
    

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={wp("5%")} color="#666" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#666" />
      </View>

      <FlatList
  data={combinedData}
  keyExtractor={(item) => item.id || Math.random().toString()}
  renderItem={({ item }) => 
    item.type === 'header' ? (
      <Text style={styles.sectionTitle}>{item.title}</Text>
    ) : (
      <ShopCard {...item} navigation={navigation} />
    )
  }
  ListFooterComponent={<View style={{ height: hp("10%") }} />}
  showsVerticalScrollIndicator={false}
/>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('4%'),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    backgroundColor: '#fff',
    marginBottom: hp('1.2%'),
    marginTop: hp('3%'),
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3%'),
  },
  searchIcon: {
    position: 'absolute',
    left: wp('3%'),
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: hp('5%'),
    backgroundColor: '#f5f5f5',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('10%'),
    fontSize: wp('4%'),
  },
  sectionTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginVertical: hp('1%'),
    color: '#333',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    marginBottom: hp('2%'),
    overflow: 'hidden',
    elevation: 2,
    padding: wp('2.5%'),
  },
  cardImage: {
    width: '100%',
    height: hp('15%'),
    borderRadius: wp('2%'),
  },
  cardContent: {
    padding: wp('3%'),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
  },
  cardTitle: {
    fontSize: wp('4%'),
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  locationText: {
    marginLeft: wp('1%'),
    color: '#666',
    fontSize: wp('3.5%'),
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distanceText: {
    color: '#666',
    fontSize: wp('3.2%'),
  },
  discountText: {
    color: '#00b894',
    fontWeight: '600',
    fontSize: wp('3.5%'),
  },
  ratingBadge: {
    backgroundColor: '#00b894',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('3%'),
  },
  ratingText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: wp('3%'),
  },
});

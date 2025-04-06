import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity,TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import LottieView from "lottie-react-native";
import loadingAnimation from "../Animation - 1743617296128.json";

function ActivityCard({ activity, navigation, locationid }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const imageWidth = wp('90%');
    const newIndex = Math.round(contentOffset / imageWidth);
    setCurrentImageIndex(newIndex);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.imageScroller}
          pagingEnabled
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {activity.image_url.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('DetailedScreen', { activity, locationid })}
            >
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.imageIndicators}>
          {activity.image_url.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentImageIndex && styles.indicatorActive
              ]}
            />
          ))}
        </View>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{activity.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={wp('4%')} color="#FFD700" />
            <Text style={styles.rating}>{activity.customer_rating}</Text>
          </View>
        </View>
        <Text style={styles.price}>Avg ₹ {activity.price} for one</Text>
      </View>
    </View>
  );
}

export default function Overview({ navigation }) {
  const [activities, setActivities] = useState([]);
  const [locationid, setLocationid] = useState();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getactivities = async () => {
      try {
        setLoading(true);
        const authToken = await AsyncStorage.getItem("authToken");
        const locationId = await AsyncStorage.getItem("locationid");
        setLocationid(locationId);
        
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
        
        if (response.data && Array.isArray(response.data)) {
          setActivities(response.data);
        } else {
          console.error("Unexpected API response format", response.data?.transformedTasks);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };
  
    getactivities();
  }, []);
  const filteredActivities = activities.filter(activity =>
    activity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
    <View style={styles.container}>
      <View style={styles.header}>
      <View style={styles.searchBar}>
  <Ionicons name="search-outline" size={wp('5%')} color="#666" />
  <TextInput
    style={styles.searchInput}
    placeholder="Search by name"
    placeholderTextColor="#999"
    value={searchQuery}
    onChangeText={setSearchQuery}
  />
</View>

        <Text style={styles.headerTitle}>Must Try Activities</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp("10%") }}
      >
     {filteredActivities && filteredActivities.length > 0 ? (
  filteredActivities.map((activity) => (
            <ActivityCard 
              key={activity._id} 
              activity={activity} 
              navigation={navigation} 
              locationid={locationid}
            />
          ))
        ) : (
          <View style={styles.noActivitiesContainer}>
            <Text style={styles.noActivitiesText}>No activities available</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: hp('8%')
  },
  header: {
    paddingHorizontal: wp('5%'),
    marginBottom: hp('2.5%')
  },
  headerTitle: {
    fontSize: wp('5%'),
    fontWeight: '400',
    fontFamily:"Noir_Regular"
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: wp('2.5%'),
    borderRadius: wp('2.5%'),
    marginBottom: hp('1.5%')
  },
  searchText: {
    marginLeft: wp('2.5%'),
    color: '#666',
    fontSize: wp('3.5%')
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: wp('5%')
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: wp('4%'),
    marginBottom: hp('2%'), 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  },
  imageContainer: {
    position: 'relative',
  },
  imageScroller: {
    height: hp('15%'),
    borderTopLeftRadius: wp('4%'),
    borderTopRightRadius: wp('4%')
  },
  image: {
    width: wp('90%'),
    height: hp('14%'), 
    borderTopLeftRadius: wp('4%'),
    borderTopRightRadius: wp('4%')
  },
  imageIndicators: {
    position: 'absolute',
    bottom: hp('1%'),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp('1%')
  },
  indicator: {
    width: wp('1.5%'),
    height: wp('1.5%'),
    borderRadius: wp('0.75%'),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  indicatorActive: {
    backgroundColor: '#fff',
    width: wp('2%'),
    height: wp('2%'),
    borderRadius: wp('1%'),
  },
  cardContent: {
    padding: wp('3%')
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('0.6%')
  },
  title: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    fontFamily:"LufgaBold"
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('3%')
  },
  rating: {
    marginLeft: wp('1%'),
    fontWeight: '600',
    color: '#666',
    fontSize: wp('3.5%')
  },
  price: {
    color: '#666',
    fontSize: wp('3.5%')
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
  searchInput: {
    flex: 1,
    marginLeft: wp('2.5%'),
    fontSize: wp('3.5%'),
    color: '#000'
  },
  
});
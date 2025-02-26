import { View, Text, ScrollView, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useState } from 'react';

const activities = [
  {
    id: '1',
    title: 'Mountain Hike',
    price: '200',
    rating: '4.7',
    images: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1000',
      'https://images.unsplash.com/photo-1527856263669-12c3a0af2aa6?q=80&w=1000',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000'
    ]
  },
  {
    id: '2',
    title: '4 Wheel Ride',
    price: '300',
    rating: '4.8',
    images: [
      'https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?q=80&w=1000',
      'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=1000',
      'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?q=80&w=1000'
    ]
  },
  {
    id: '3',
    title: 'Rock Climbing',
    price: '250',
    rating: '4.6',
    images: [
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=1000',
      'https://images.unsplash.com/photo-1601224335112-483e8de232fa?q=80&w=1000',
      'https://images.unsplash.com/photo-1516592066927-de81b1a3db20?q=80&w=1000'
    ]
  },
  {
    id: '4',
    title: 'Rock Climbing',
    price: '250',
    rating: '4.6',
    images: [
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=1000',
      'https://images.unsplash.com/photo-1601224335112-483e8de232fa?q=80&w=1000',
      'https://images.unsplash.com/photo-1516592066927-de81b1a3db20?q=80&w=1000'
    ]
  },
  {
    id: '5',
    title: 'Rock Climbing',
    price: '250',
    rating: '4.6',
    images: [
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=1000',
      'https://images.unsplash.com/photo-1601224335112-483e8de232fa?q=80&w=1000',
      'https://images.unsplash.com/photo-1516592066927-de81b1a3db20?q=80&w=1000'
    ]
  },
];

function ActivityCard({ activity,navigation }) {
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
          {activity.images.map((image, index) => (
             <TouchableOpacity
             key={index}
             onPress={() => navigation.navigate('DetailedScreen', { activity })}
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
          {activity.images.map((_, index) => (
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
          <Text style={styles.title}>{activity.title}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={wp('4%')} color="#FFD700" />
            <Text style={styles.rating}>{activity.rating}</Text>
          </View>
        </View>
        <Text style={styles.price}>Avg ₹ {activity.price} for one</Text>
      </View>
    </View>
  );
}

export default function Overview({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={wp('5%')} color="#666" />
          <Text style={styles.searchText}>Search</Text>
        </View>
        <Text style={styles.headerTitle}>Must Try Activities</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:hp("10%")}}
      >
        {activities.map(activity => (
          <ActivityCard key={activity.id} activity={activity} navigation={navigation}/>
        ))}
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
  }
});
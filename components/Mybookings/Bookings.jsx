import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

const Bookings = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headertext}>My booking</Text>
        </View>
      </View>
      
      <ScrollView style={styles.maincontent} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Trip details</Text>
        
        <View style={styles.tripDetailContainer}>
          <Text style={styles.tripLabel}>Travino</Text>
          <Text style={styles.tripLabel}>World tour package</Text>
          <View style={styles.infoRow}>
            <Text style={styles.tripInfo}>Total members: 5</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </View>
          <Text style={styles.tripInfo}>Adults: 3 | Kids: 2</Text>
          <Text style={styles.tripInfo}>Trip duration: 2 days 1 night</Text>
        </View>
        
        <View style={styles.tripDetailContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.tripLabel}>List of locations covered:</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </View>
          <Text style={styles.tripInfo}>• Sumba Island</Text>
          <Text style={styles.tripInfo}>• ID Beach</Text>
          <Text style={styles.tripInfo}>• Sunset mountains</Text>
        </View>
        
        <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadText}>Download itinerary</Text>
          <Ionicons name="download-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      
        
        <TouchableOpacity style={styles.historybutton}>
        <Text style={styles.historytext}>My history </Text>
        </TouchableOpacity>
      
        
      
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#E5F7FF',
    paddingTop:hp("5%")
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
  },
  headertext: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    marginLeft: wp('3%'),
    color: '#000',
  },
  maincontent: {
    flex: 1,
    padding: wp('5%'),
  },
  heading: {
    fontSize: wp('5%'),
    fontWeight: '600',
    marginBottom: hp('2%'),
    color: '#000',
  },
  tripDetailContainer: {
    padding: wp('4%'),
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginBottom: hp('2%'),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripLabel: {
    fontSize: wp('4%'),
    fontWeight: '600',
    marginBottom: hp('2%'),
    color: '#000',
    backgroundColor: '#F8F8F8',
    paddingVertical: wp('2%'), 
    borderRadius: 6,
    marginBottom: hp('1%'),
  },
  tripInfo: {
    fontSize: wp('3.8%'),
    color: '#666',
    marginBottom: hp('0.5%'),
    backgroundColor: '#F8F8F8', 
    paddingVertical: wp('2%'), 
    borderRadius: 6, 
  },
  downloadButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('2%'),
    backgroundColor: '#F8F8F8',
    padding: wp('5%'),
    borderRadius: 8,
  },
  downloadText: {
    fontSize: wp('4%'),
    color: '#007AFF',
  },
  historybutton: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: hp('2%'),
    backgroundColor: '#03d11e',
    padding: wp('5%'),
    borderRadius: 8,
  },
  
  historytext: {
    textAlign: 'center', // Ensure text is centered
    fontSize: wp('4%'), // Optional: Adjust font size for consistency
    color: '#fff', // Optional: Adjust text color
  }
  
  
});

export default Bookings;

import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, Switch, ScrollView } from 'react-native';
import Header from './Header';
import FoodList from './FoodList';
const FoodHome = () => {
  return (
    <View style={styles.container}>
      <Header/>
      <FoodList/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchBar: {
    width: '70%',
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  locationButton: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  restaurantCard: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  restaurantInfo: {
    flex: 1,
    marginLeft: 10,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  restaurantDetails: {
    color: '#666',
  },
  restaurantLocation: {
    color: '#999',
  },
  stars: {
    flexDirection: 'row',
    marginTop: 5,
  },
  discount: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default FoodHome;
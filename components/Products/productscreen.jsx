import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';

const PRODUCTS = [
  {
    id: '1',
    name: 'Handmade Clay Pottery Set',
    price: '₹1449',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '2',
    name: 'Handmade Clay Pottery Set',
    price: '₹1449',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '3',
    name: 'Handmade Clay Pottery Set',
    price: '₹1449',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
  }
];

const ProductItem = ({ item }) => (
  <View style={styles.productItem}>
    <Image source={{ uri: item.image }} style={styles.productImage} />
    <View style={styles.productInfo}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
  </View>
);

const Productscreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <View style={styles.firstrow}>
          <Text style={styles.headertext}>Artisan Bazaar</Text>
          <View style={styles.rating}>
            <Text style={styles.ratingtext}>3.7</Text>
            <Icon
              name="star"
              type="font-awesome"
              color="white"
              size={hp("2.5%")}
              style={styles.starIcon}
            />
          </View>
        </View>
        <View style={styles.secondrow}>
          <Text style={styles.secondrowtext}>
            Artisan Bazaar is a vibrant marketplace offering handcrafted
            products sourced directly from local artisans.
          </Text>
        </View>
        <View style={styles.thirdrow}>
          <TouchableOpacity style={styles.visitingusbutton}>
            <Text style={styles.visitingustext}>Visiting Us?</Text>
          </TouchableOpacity>
          <View style={styles.iconcontainer}>
            <Icon
              name="map-marker"
              type="font-awesome"
              color="black"
              size={hp("3%")}
              style={styles.locationicon}
            />
          </View>
        </View>
        <View style={styles.fourthrow}>
          <View style={styles.searchcontainer}>
            <Icon
              name="search"
              type="font-awesome"
              color="#666"
              size={20}
              style={styles.searchicon}
            />
            <TextInput style={styles.input} placeholder="Search" />
          </View>
          <View style={styles.filtercontainer}>
            <Icon name="sliders" type="font-awesome" color="white" size={20} />
          </View>
        </View>
        <View style={styles.fifthrow}>
          <FlatList
            data={PRODUCTS}
            renderItem={({ item }) => <ProductItem item={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: hp("10%") }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FC",
  },
  innercontainer: {
    marginLeft: wp("5%"),
    flex: 1,
  },
  firstrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("6%"),
  },
  headertext: {
    fontSize: hp("3%"),
    marginLeft: wp("2%"),
    fontWeight: "bold",
    fontFamily:"LufgaBold"
  },
  rating: {
    backgroundColor: "rgba(0, 208, 132, 1)",
    marginRight: wp("4%"),
    paddingLeft: wp("3%"),
    paddingRight: wp("3%"),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp("2%"),
    flexDirection: "row",
  },
  ratingtext: {
    color: "#fff",
    fontSize: hp("2.2%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  starIcon: {
    marginLeft: wp("2%"),
  },
  secondrow: {
    marginTop: hp("2%"),
    maxWidth: wp("90%"),
  },
  secondrowtext: {
    fontSize: wp("4%"),
    fontFamily:"Noir_Regular"
  },
  thirdrow: {
    marginTop: hp("2%"),
    flexDirection: "row",
  },
  visitingusbutton: {
    backgroundColor: "rgba(0, 208, 132, 1)",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("8%"),
    borderRadius: wp("5%"),
    alignItems: "center",
   

  },
  visitingustext: {
    color: "#ffff",
     fontFamily:"LufgaMedium" 
  },
  iconcontainer: {
    marginLeft: wp("4%"),
    padding: wp("2%"),
    paddingLeft: wp("3%"),
    paddingRight: wp("3%"),
    backgroundColor: "#ffffff",
    borderRadius: wp("3%"),
  },
  fourthrow: {
    marginTop: hp("3%"),
    flexDirection: "row",
  },
  searchcontainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    width: wp("65%"),
    borderRadius: wp("3%"),
    paddingHorizontal: wp("3%"),
  },
  searchicon: {
    marginRight: wp("2%"),
  },
  input: {
    flex: 1,
    paddingVertical: hp("1.5%"),
  },
  filtercontainer: {
    backgroundColor: "rgba(46, 139, 87, 1)",
    padding: wp("4%"),
    marginLeft: wp("7%"),
    borderRadius: wp("3%"),
    justifyContent: "center",
    alignItems: "center",
  },
  fifthrow: {
    marginTop: hp("3%"),
    flex: 1,
  },
  productItem: {
    backgroundColor: "#fff",
    borderRadius: wp("3%"),
    marginBottom: hp("2%"),
    marginRight: wp("5%"),
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: hp("20%"),
    resizeMode: "cover",
  },
  productInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("1%"),
    width: "100%",
  },
  
  productName: {
    fontSize: wp("4%"),
    fontWeight: "500",
    flexShrink: 1, 
     fontFamily:"LufgaItalic"
  },
  productPrice: {
    fontSize: wp("4%"),
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: hp("2%"),
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  navItem: {
    alignItems: "center",
  },
});

export default Productscreen;
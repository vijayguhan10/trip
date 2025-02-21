import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from "react-native-elements";

const placesData = [
  { id: '1', title: 'Place 1', image: 'https://s3-alpha-sig.figma.com/img/f503/9a20/56c3d6d65717ebff3a5e4d954e1195d1?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iSMXdZ9vkLqinkvRR1lYViJ8TbPq~EztQzokgSTTrI0rBzhk6IssOe6m6zExYJIZKVEDg2mFlYCx3ajy96qq7VRFUiiTWLXPzbHjQYY49PJSCjVCX5aaQ5zKzd-MhhpU9VnKPWkFJ1FxKLGpkmVH6TDQj91vOQjnckz~6TEj41ncD-rmOIoaErF3rYQwU6IuBVMs4fsa0hEMgTo~CPVv4hg6Cun~N8KTMoZUBFdnWjHhHkp8ky9Dqt8t4zXZxIsT7DzBxgL6kOHPYVimWFrTbjE48C~SU~kUtj8nQ5tgQTZlDatwDLZbJjYZ7zZGJrX9Eg3gH3S5jkpTOspAs17PiA__' },
  { id: '2', title: 'Place 2', image: 'https://s3-alpha-sig.figma.com/img/f503/9a20/56c3d6d65717ebff3a5e4d954e1195d1?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iSMXdZ9vkLqinkvRR1lYViJ8TbPq~EztQzokgSTTrI0rBzhk6IssOe6m6zExYJIZKVEDg2mFlYCx3ajy96qq7VRFUiiTWLXPzbHjQYY49PJSCjVCX5aaQ5zKzd-MhhpU9VnKPWkFJ1FxKLGpkmVH6TDQj91vOQjnckz~6TEj41ncD-rmOIoaErF3rYQwU6IuBVMs4fsa0hEMgTo~CPVv4hg6Cun~N8KTMoZUBFdnWjHhHkp8ky9Dqt8t4zXZxIsT7DzBxgL6kOHPYVimWFrTbjE48C~SU~kUtj8nQ5tgQTZlDatwDLZbJjYZ7zZGJrX9Eg3gH3S5jkpTOspAs17PiA__' },
  { id: '3', title: 'Place 3', image: 'https://s3-alpha-sig.figma.com/img/f503/9a20/56c3d6d65717ebff3a5e4d954e1195d1?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iSMXdZ9vkLqinkvRR1lYViJ8TbPq~EztQzokgSTTrI0rBzhk6IssOe6m6zExYJIZKVEDg2mFlYCx3ajy96qq7VRFUiiTWLXPzbHjQYY49PJSCjVCX5aaQ5zKzd-MhhpU9VnKPWkFJ1FxKLGpkmVH6TDQj91vOQjnckz~6TEj41ncD-rmOIoaErF3rYQwU6IuBVMs4fsa0hEMgTo~CPVv4hg6Cun~N8KTMoZUBFdnWjHhHkp8ky9Dqt8t4zXZxIsT7DzBxgL6kOHPYVimWFrTbjE48C~SU~kUtj8nQ5tgQTZlDatwDLZbJjYZ7zZGJrX9Eg3gH3S5jkpTOspAs17PiA__' },
  { id: '4', title: 'Place 4', image: 'https://s3-alpha-sig.figma.com/img/f503/9a20/56c3d6d65717ebff3a5e4d954e1195d1?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iSMXdZ9vkLqinkvRR1lYViJ8TbPq~EztQzokgSTTrI0rBzhk6IssOe6m6zExYJIZKVEDg2mFlYCx3ajy96qq7VRFUiiTWLXPzbHjQYY49PJSCjVCX5aaQ5zKzd-MhhpU9VnKPWkFJ1FxKLGpkmVH6TDQj91vOQjnckz~6TEj41ncD-rmOIoaErF3rYQwU6IuBVMs4fsa0hEMgTo~CPVv4hg6Cun~N8KTMoZUBFdnWjHhHkp8ky9Dqt8t4zXZxIsT7DzBxgL6kOHPYVimWFrTbjE48C~SU~kUtj8nQ5tgQTZlDatwDLZbJjYZ7zZGJrX9Eg3gH3S5jkpTOspAs17PiA__' },
  { id: '5', title: 'Place 5', image: 'https://s3-alpha-sig.figma.com/img/f503/9a20/56c3d6d65717ebff3a5e4d954e1195d1?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iSMXdZ9vkLqinkvRR1lYViJ8TbPq~EztQzokgSTTrI0rBzhk6IssOe6m6zExYJIZKVEDg2mFlYCx3ajy96qq7VRFUiiTWLXPzbHjQYY49PJSCjVCX5aaQ5zKzd-MhhpU9VnKPWkFJ1FxKLGpkmVH6TDQj91vOQjnckz~6TEj41ncD-rmOIoaErF3rYQwU6IuBVMs4fsa0hEMgTo~CPVv4hg6Cun~N8KTMoZUBFdnWjHhHkp8ky9Dqt8t4zXZxIsT7DzBxgL6kOHPYVimWFrTbjE48C~SU~kUtj8nQ5tgQTZlDatwDLZbJjYZ7zZGJrX9Eg3gH3S5jkpTOspAs17PiA__' },
  { id: '6', title: 'Place 6', image: 'https://s3-alpha-sig.figma.com/img/f503/9a20/56c3d6d65717ebff3a5e4d954e1195d1?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iSMXdZ9vkLqinkvRR1lYViJ8TbPq~EztQzokgSTTrI0rBzhk6IssOe6m6zExYJIZKVEDg2mFlYCx3ajy96qq7VRFUiiTWLXPzbHjQYY49PJSCjVCX5aaQ5zKzd-MhhpU9VnKPWkFJ1FxKLGpkmVH6TDQj91vOQjnckz~6TEj41ncD-rmOIoaErF3rYQwU6IuBVMs4fsa0hEMgTo~CPVv4hg6Cun~N8KTMoZUBFdnWjHhHkp8ky9Dqt8t4zXZxIsT7DzBxgL6kOHPYVimWFrTbjE48C~SU~kUtj8nQ5tgQTZlDatwDLZbJjYZ7zZGJrX9Eg3gH3S5jkpTOspAs17PiA__' },
];

const Places = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" type="feather" size={24} color="#000" />
          </TouchableOpacity>
          <Image
            source={{ 
                uri: "https://s3-alpha-sig.figma.com/img/44b3/9dae/f7b8d9642d79c4d7aa93f9b95ca7a006?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VbWRgFdKRgubmu4OCPj40WLsnzqhAOym7l-qC34kfgGWTOpKb4wny2X8bI~P04jxYprVcVUbDUtxFFqkOz6JGiKhbCzWTb~RZLInR~ex0fZd~Y5vJ~~YuePtIBoROXfUgAuHVcF84l-JjLsUzNCP7-DBifgICfsoQxoZ~W906MyT-SIwQ0hsQvapnk0azm~xZenRIz5oCNHPYxdnayXZNt-32j9fFKnrcsWvcGLZqP9CLkndE03fA11urIdA1Yl0QCFl3m4a-RSA3jR1YIX5RDC9UdyKxx07M5d9Tg1HHkB5LUFRBRs2TCrKPQAJ2paoAUV1oFakggEY7~CeYt8qOw__",
            }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.headerText}>Hii Dinu</Text>
            <Text style={styles.headerSubText}>Good morning</Text>
          </View>
          <View style={styles.searchIcon}>
            <Icon name="search" size={30} />
          </View>
        </View>
      </View>
 <View style={styles.visit}>
    <Icon name="gps-fixed" style={styles}/><Text style={styles.visittext}>Places to visit</Text>
 </View>
      <FlatList
        data={placesData}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.placeContainer}>
            <Image source={{ uri: item.image }} style={styles.placeImage} />
            <View style={styles.overlay}>
              <Text style={styles.placeText}>{item.title}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: wp("5%"),
    paddingBottom: hp("2%"),
    paddingTop: hp("7%"),
    borderBottomWidth: hp("0.0%"),
    backgroundColor: "#fde3e370",
  },
  backButton: {
    marginVertical: hp("1%"),
  },
  profileImage: {
    width: wp("18%"),
    height: hp("7%"),
    borderRadius: wp("12.5%"),
    alignSelf: "center",
    resizeMode: "cover",
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"),
  },
  headerText: {
    fontSize: hp("2.5%"),
    fontWeight: "600",
    color: "#000",
  },
  headerSubText: {
    fontSize: hp("2%"),
    fontWeight: "600",
  },
  searchIcon: {
    marginLeft: "auto",
  },
  visit: {
    marginTop:hp("1%"),
    flexDirection: "row", 
    alignItems: "center",
    justifyContent:'center',
    gap: 5, 
    padding:wp("3%")
  },  
  visittext:{
  color:"#093acb"
  },
  locicon:{
    color:"#093acb"
  },
  placeContainer: {
    flex: 1,
    margin: wp("1.5%"),
    marginTop:hp("3%"),
    position: "relative",
  },
  placeImage: {
    width: wp("30%"),
    height: hp("23%"),
    borderRadius: wp("3%"),
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: hp("1%"),
    borderBottomLeftRadius: wp("3%"),
    borderBottomRightRadius: wp("3%"),
    alignItems: "center",
  },
  placeText: {
    color: "#fff",
    fontSize: hp("2%"),
    fontWeight: "bold",
  },
});

export default Places;

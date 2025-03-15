import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import { API_URL } from "@env";
import { useEffect } from 'react';
const itemsToCarry = [
  { 
    id: '1', 
    title: 'Aadhar card', 
    image: 'https://images.unsplash.com/photo-1621844061203-3f31a2a7d6ad'
  },
  { 
    id: '2', 
    title: 'Passport', 
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b'
  },
  { 
    id: '3', 
    title: 'Cap', 
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b'
  },
  { 
    id: '4', 
    title: 'Watch', 
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
  },
  { 
    id: '5', 
    title: 'Raincoat', 
    image: 'https://images.unsplash.com/photo-1583744946564-b52d31e89f11'
  },
  { 
    id: '6', 
    title: 'Side bag', 
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62'
  },
  { 
    id: '7', 
    title: 'Charger', 
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0'
  },
  { 
    id: '8', 
    title: 'Slippers', 
    image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33'
  },
  { 
    id: '9', 
    title: 'Rubber shoes', 
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'
  },
];

export default function ThingsToCarry({navigation}) {
  // useEffect(()=>{
  //  const getdata=async()=>{
  //  const response=await axios.get(`${API_URL}/`);
  //  }
  //  getdata();
  // },[])
  return (
    <SafeAreaView style={styles.container}>
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

      <View style={styles.titleContainer}>
        <Ionicons name="list" size={wp('5%')} color="#0066FF" />
        <Text style={styles.titleText}>Things to carry</Text>
      </View>

      <FlatList
        data={itemsToCarry}
        numColumns={3}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'),
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  titleText: {
    fontSize: wp('4%'),
    color: '#0066FF',
    fontWeight: '500',
  },
  listContainer: {
    padding: wp('3%'),
  },
  itemContainer: {
    width: wp('28%'),
    marginHorizontal: wp('2%'),
    marginVertical: hp('1%'),
    alignItems: 'center',
  },
  itemImage: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
    marginBottom: hp('1%'),
  },
  itemText: {
    fontSize: wp('3.5%'),
    color: '#333',
    textAlign: 'center',
  },
  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: hp('2%'),
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tabItem: {
    padding: wp('2%'),
  },
});
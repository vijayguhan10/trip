import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Avatar, Button, Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

const categories = [
  {
    id: "1",
    name: "Lunch",
    icon: "https://s3-alpha-sig.figma.com/img/077a/148f/c9ece92889af67f39b9a01d2cf43f156?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cWOrlcwojX1PtxQLw4WfC4-tK31JQ-kg0qvZXC10OjK8fUrCVww1kaC301naV8p4tIoxGLMKA-vS4Z6xV8KcUrjYShin1qr222ZgNZIJTJbziYE1Rv~H8SImZpc3Cjrty~Xo2k7lsaGJhGLcfVFkzTbflJSUXTuoIR6zwa03DkAR1sw5y0SLvFXLllD-P3eBr5v29-0Ck5PyNANECiSgA7di1bcxjAxIV02OvXCU9ImDkDhMea4cynGiKJmRM7rEtWmCUkqW-Bhj3KX~r2C7TKGD0Fjd9GuJrf2x31pRA9ic7bG0GU~GE2YZdE9wUBpWDTlomSYl2xV1GmNTfKKVsA__",
  },
  {
    id: "2",
    name: "Dinner",
    icon: "https://s3-alpha-sig.figma.com/img/19e6/b238/6ad8e427c2882b88c9567f4dab4af7ba?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ObfMf9aVvDb63iJUflCj9FWP1Aq-TB-6gRBTETt9Lspl93QRHm6O6cJ~BgvpUz7SDbm-CUNDXpiDsPrBpPtieHru8VgxBT74nxDcgzHDYUExzyOxp7w6EvUmVdu-y3CgAy0PggAsqI-OdS6ZNtggUA~D0GGJLC0mskbdNcHL8snZh3Vr9j-qAJ-kZwMxuJcLtJdr7WOo2yM0kO4CD7~dmFj6pwKon6pPzIbg6kZB~LVrwiNuiKjnZrn9m43Q9yC0jd81Z0-xw686cwkjV5IknNOD~B25u5LHBxVKxTLoShDGd824UyqZ40xADgo5tprB0b9nVegoUd2QMiL~H8Q1ng__",
  },
  {
    id: "3",
    name: "Near me",
    icon: "https://s3-alpha-sig.figma.com/img/ddaa/adb6/c6c98e2fe207d9f625a7f037d2d90ed3?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cs71l8dA0S20wpvfWJB2CUBLFYMSrUMJxnRF6qRWmVUpInwFQw2FmePNJiwpqsoR6njU5MzdFZtRVMopuQJEffYsmEpDhXVRFu0Lh5LrU3-z5putfMToKj4vPRgloaxxN7yHteqCaNekbvu05QJfc4iCh7yiQG26ptdnYoI1LhfYYIItpxX4Bm0bk9HreQwRhCk0VPOW-CNTwRDM8KVR7Y0SZfSjLmaV8lFV8ekv101ZxhF3zYpilRtmJNWHXuB9KcgeKghoFSbSTGe7Fcnb4FLly~lts34SgtXpHjTgxq2u84K7zt6G90GKg3SX2ot-5hc~jSPd4ZQNc585xu9vIA__",
  },
  {
    id: "4",
    name: "Fast food",
    icon: "https://s3-alpha-sig.figma.com/img/3cc1/1424/4c79939ba1eb1e30443d7439a9d515d2?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=reD7QXGqkc7nJil7Ib7w~4D1o4xbiNwMAR8XtdzP7pAqKK6k-tMysyqP0oui3BlctN9yjev4f1lF1Y9uV4WM~RHsg~oVKx6GNBwR7SWUUrW3z~nAEE6HtPV7sSO8q8r8MsxkKQhlXGiEv1Mq0LTBfGdlvKlFZRg7TiIPeNDO-4gD3ZJwk5KzHYz22SEon9ogEEk-sRr2BOyQ6MWlvI-eRQmv0yhbs2NiU59RlUe3tR4Rp8RP7y8l2oTUiRIn2b6i6HX3YY1tPZAe7~ViOiO~FfboG~DktC4lPc7DwGqwDH9wXWfMc1N4i9NMKbPXiOPsIezJKDKUB2bkKvKJ7YPSBQ__",
  },
];

const restaurants = [
  {
    id: "1",
    name: "Chai Point",
    image:"https://s3-alpha-sig.figma.com/img/08d2/2162/5813d538f9c3792f884fee9c99bddd9f?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tW1jQ6U4IpdbpYfIHntWrD6ayUYiaG94nyFwCTepTPcr3FzeUYxO6IHG52iACTUnriT38TCpeojUPDu79uLKh459w62oezbixXV2Zw2m4Dg0SA5eKgRN6VPPAblwUyMYdMdBJFC--obms14n1TGK6-D4~ig6vCZ6swQb0aFNn9jq3IL3etYMmIYZB96LWSMYKjup6ASKcmtO9nFGebFNkKgvTZFn-FHIDgEH6Wn7DFQAg5KmOAOejuY1Un5M~If0VEsIlDLws4dhdFgtcusIu1isfB6lR2WNULj6cLPmM74IjPK1iibW7ldLYmCvvByIMV53PZQnQJyhD26cDqIEew__",
    rating: "3.7",
    description: "Tea • Coffee • 200 for one",
    location: "Viman nagar",
    distance: "0.7 Km",
    time: "30 mins Away",
    discount: "50% Off",
    
  },
  {
    id: "2",
    name: "Chai Point",
    image:
      "https://s3-alpha-sig.figma.com/img/ddaa/adb6/c6c98e2fe207d9f625a7f037d2d90ed3?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cs71l8dA0S20wpvfWJB2CUBLFYMSrUMJxnRF6qRWmVUpInwFQw2FmePNJiwpqsoR6njU5MzdFZtRVMopuQJEffYsmEpDhXVRFu0Lh5LrU3-z5putfMToKj4vPRgloaxxN7yHteqCaNekbvu05QJfc4iCh7yiQG26ptdnYoI1LhfYYIItpxX4Bm0bk9HreQwRhCk0VPOW-CNTwRDM8KVR7Y0SZfSjLmaV8lFV8ekv101ZxhF3zYpilRtmJNWHXuB9KcgeKghoFSbSTGe7Fcnb4FLly~lts34SgtXpHjTgxq2u84K7zt6G90GKg3SX2ot-5hc~jSPd4ZQNc585xu9vIA__",
    rating: "3.7",
    description: "Tea • Coffee • 200 for one",
    location: "Viman nagar",
    distance: "0.7 Km",
    time: "30 mins Away",
    discount: "50% Off",
  },
  {
    id: "3",
    name: "Chai Point",
    image:
      "https://s3-alpha-sig.figma.com/img/fa6b/43cd/759a70baf1e572512a70f3b7d734fdd3?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bRiLetpGMo-aJiNuiMXOUviPbuU5IiBt~UDYcHhegzpiEZUZd69MBVabt1dt~WPNPcxkniS-VoSn3kDaWH3ECrd7o7SFnI5RrfI4hfWMFJftAHzmjNKVDSMF3BfyatZyaJ2f9gaWtF0vy1IifmE~F2Nx8spM~2Afhb6aG-i-fKwLNxv8-Y6q~FZbSNDyw5e4sN3wcG3ifCrO8k0oec1xNZN9Bh3WozDVaGXDW-jZQ0N64aG6~tipBGCOdb2oGxZ-R4hnBNjDkLdin5P3lx9crnk~LVRScBP-3dby75YwRq29~SKvhRxbqyH99QV4iC3DnRE7n6sCE-lcKJi-ENuigw__",
    rating: "3.7",
    description: "Tea • Coffee • 200 for one",
    location: "Viman nagar",
    distance: "0.7 Km",
    time: "30 mins Away",
    discount: "50% Off",
  },
  {
    id: "4",
    name: "Chai Point",
    image:
      "https://s3-alpha-sig.figma.com/img/ddaa/adb6/c6c98e2fe207d9f625a7f037d2d90ed3?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cs71l8dA0S20wpvfWJB2CUBLFYMSrUMJxnRF6qRWmVUpInwFQw2FmePNJiwpqsoR6njU5MzdFZtRVMopuQJEffYsmEpDhXVRFu0Lh5LrU3-z5putfMToKj4vPRgloaxxN7yHteqCaNekbvu05QJfc4iCh7yiQG26ptdnYoI1LhfYYIItpxX4Bm0bk9HreQwRhCk0VPOW-CNTwRDM8KVR7Y0SZfSjLmaV8lFV8ekv101ZxhF3zYpilRtmJNWHXuB9KcgeKghoFSbSTGe7Fcnb4FLly~lts34SgtXpHjTgxq2u84K7zt6G90GKg3SX2ot-5hc~jSPd4ZQNc585xu9vIA__",
    rating: "3.7",
    description: "Tea • Coffee • 200 for one",
    location: "Viman nagar",
    distance: "0.7 Km",
    time: "30 mins Away",
    discount: "50% Off",
  },
  {
    id: "5",
    name: "Chai Point",
    image:
      "https://s3-alpha-sig.figma.com/img/ddaa/adb6/c6c98e2fe207d9f625a7f037d2d90ed3?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cs71l8dA0S20wpvfWJB2CUBLFYMSrUMJxnRF6qRWmVUpInwFQw2FmePNJiwpqsoR6njU5MzdFZtRVMopuQJEffYsmEpDhXVRFu0Lh5LrU3-z5putfMToKj4vPRgloaxxN7yHteqCaNekbvu05QJfc4iCh7yiQG26ptdnYoI1LhfYYIItpxX4Bm0bk9HreQwRhCk0VPOW-CNTwRDM8KVR7Y0SZfSjLmaV8lFV8ekv101ZxhF3zYpilRtmJNWHXuB9KcgeKghoFSbSTGe7Fcnb4FLly~lts34SgtXpHjTgxq2u84K7zt6G90GKg3SX2ot-5hc~jSPd4ZQNc585xu9vIA__",
    rating: "3.7",
    description: "Tea • Coffee • 200 for one",
    location: "Viman nagar",
    distance: "0.7 Km  ",
    time: "30 mins Away",
    discount: "50% Off",
  },
];

const FoodList = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Dine Anytime!</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Image source={{ uri: item.icon }} style={styles.categoryIcon} />
            <Text>{item.name}</Text>
          </View>
        )}
      />

      <Text style={styles.subHeading}>Must try Restaurants</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{item.discount}</Text>
            </View>
            <Card.Content>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.ratings}>5.6</Text>
              </View>

              <Text
                style={{
                  color: "#666462",
                  fontWeight: "bold",
                  borderBottomColor: "#E5E5E5",
                  borderBottomWidth: 2,
                  paddingBottom: 10,
                  marginBottom: 10,
                  marginTop: 5,
                }}
              >
                {item.description}
              </Text>

              <View style={styles.infoRow}>
                <Text>
                  {item.location} • {item.distance}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    color: "#666462",
                  }}
                >
                  <Text
                    style={{
                      borderRightColor: "#666462",
                      borderRightWidth: 1,
                      height: 16,
                      marginRight: 5,
                    }}
                  ></Text>
                  <MaterialIcons name="access-time" size={16} />
                </View>

                <Text> {item.time}</Text>
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF6F6", padding: 10 },
  heading: { fontSize: 22, fontWeight: "bold" },
  subHeading: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  categoryItem: { alignItems: "center", marginRight: 15 },
  categoryIcon: { width: 70, height: 70, borderRadius: 15 },
  card: { marginVertical: 10, borderRadius: 10 },
  cardImage: { height: 150, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  title: { fontSize: 16, fontWeight: "bold" },
  ratings: {
    backgroundColor: "rgb(14, 184, 121)",
    width: 50,
    borderRadius: 5,
    color: "white",
    textAlign: "center",
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  discountBadge: {
    position: "absolute",
    top: -13,
    right: 10,
    bottom: 20,
    backgroundColor: "rgba(228, 27, 27, 0.87)",
    padding: 5,
    borderRadius: 500,
    height: 50,
    width: 50,
    textAlign: "center",
  },
  discountText: { color: "white", fontWeight: "bold" },
});

export default FoodList;

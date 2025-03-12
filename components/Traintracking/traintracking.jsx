import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
const TrainTrackingScreen = ({ navigation }) => {
  const [pnrNumber, setPnrNumber] = useState("");
  const [pnrStatusData, setPnrStatusData] = useState(null);
  const [loading, setLoading] = useState(false);

  const trains = [
    {
      id: "1",
      code: "KTS/MDA-1122",
      status: "Arrival Now",
      location: "Aluthgama",
    },
    {
      id: "2",
      code: "KTS/MDA-1122",
      status: "Arrival in 30 min",
      location: "Aluthgama",
    },
    {
      id: "3",
      code: "KTS/MDA-1122",
      status: "Arrival in 30 min",
      location: "Aluthgama",
    },
    {
      id: "4",
      code: "KTS/MDA-1122",
      status: "Arrival in 30 min",
      location: "Aluthgama",
    },
    {
      id: "5",
      code: "KTS/MDA-1122",
      status: "Arrival in 30 min",
      location: "Aluthgama",
    },
    {
      id: "6",
      code: "KTS/MDA-1122",
      status: "Arrival in 30 min",
      location: "Aluthgama",
    },
  ];

  const fetchPnrStatus = async (pnrNumber) => {
    const url = "https://www.confirmtkt.com/pnr-status/4735524770";

    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" type="feather" size={24} color="#000" />
          </TouchableOpacity>
          <Image
            source={{
              uri: "https://s3-alpha-sig.figma.com/img/44b3/9dae/f7b8d9642d79c4d7aa93f9b95ca7a006?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VbWRgFdKRgubmu4OCPj40WLsnzqhAOym7l-qC34kfgGWTOpKb4wny2X8bI~P04jxYprVcVUbDUtxFFqkOz6JGiKhbCzWTb~RZLInR~ex0fZd~Y5vJ~~YuePtIBoROXfUgAuHVcF84l-JjLsUzNCP7-DBifgICfsoQxoZ~W906MyT-SIwQ0hsQvapnk0azm~xZenRIz5oCNHPYxdnayXZNt-32j9fFKnrcsWvcGLZqP9CLkndE03fA11urIdA1Yl0QCFl3m4a-RSA3jR1YIX5RDC9UdyKxx07M5d9Tg1HHkB5LUFRBRs2TCrKPQAJ2paoAUV1oFakggEY7~CeYt8qOw__",
            }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.headerText}>Track Your Train</Text>
            <Text style={styles.headerSubText}>
              Enter your train details to get real-time tracking information
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Icon name="minus" type="entypo" size={40} color="#c5c5c5" />
      </View>

      <View style={styles.content}>
        <Text style={styles.inputLabel}>PNR number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your PNR"
          placeholderTextColor="#A0A0A0"
          value={pnrNumber}
          onChangeText={setPnrNumber}
        />

        <TouchableOpacity style={styles.trackButton} onPress={fetchPnrStatus}>
          <Text style={styles.trackButtonText}>Track my train</Text>
        </TouchableOpacity>

        {pnrStatusData ? (
          <ScrollView>
            <View style={styles.pnrTable}>
              <View style={styles.pnrTableRow}>
                <Text style={styles.pnrTableHeader}>Passenger</Text>
                <Text style={styles.pnrTableHeader}>Current Status</Text>
                <Text style={styles.pnrTableHeader}>Booking Status</Text>
              </View>
              {pnrStatusData.passengers.map((passenger, index) => (
                <View key={index} style={styles.pnrTableRow}>
                  <Text style={styles.pnrTableCell}>{passenger.no}</Text>
                  <Text style={styles.pnrTableCell}>
                    {passenger.current_status}
                  </Text>
                  <Text style={styles.pnrTableCell}>
                    {passenger.booking_status}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        ) : (
          <FlatList
            data={trains}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.trainItem}>
                <View style={styles.trainIconContainer}>
                  <Icon
                    name="train"
                    type="font-awesome"
                    size={20}
                    color="#000"
                  />
                </View>
                <View style={styles.trainInfo}>
                  <Text style={styles.trainCode}>{item.code}</Text>
                  <View style={styles.statusContainer}>
                    <Icon
                      name={
                        item.status === "Arrival Now" ? "check-circle" : "clock"
                      }
                      type="feather"
                      size={14}
                      color={
                        item.status === "Arrival Now" ? "#0BB07B" : "#FF6B6B"
                      }
                      style={styles.statusIcon}
                    />
                    <Text
                      style={[
                        styles.trainStatus,
                        {
                          color:
                            item.status === "Arrival Now"
                              ? "#0BB07B"
                              : "#FF6B6B",
                        },
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
                <View style={styles.locationContainer}>
                  <Text style={styles.trainLocation}>{item.location}</Text>
                  <Icon
                    name="chevron-right"
                    type="feather"
                    size={20}
                    color="#A0A0A0"
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
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
    paddingBottom: hp("4%"),
    paddingTop: hp("7%"),
    borderBottomWidth: hp("0.0%"),
    borderBottomColor: "black",
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
    fontSize: hp("2.2%"),
    fontWeight: "600",
    color: "#000",
  },
  headerSubText: {
    fontSize: hp("1.6%"),
    color: "#666",
    marginTop: hp("0.6%"),
    flexWrap: "wrap",
    width: wp("60%"),
    textAlign: "left",
    flexShrink: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: wp("5%"),
    marginTop: hp("1%"),
  },
  inputLabel: {
    fontSize: hp("1.8%"),
    fontWeight: "500",
    color: "#000",
    marginBottom: hp("1%"),
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: hp("1.8%"),
    borderRadius: 12,
    marginBottom: hp("2%"),
    fontSize: hp("1.8%"),
  },
  trackButton: {
    backgroundColor: "#00C853",
    padding: hp("2%"),
    borderRadius: 12,
    alignItems: "center",
    marginBottom: hp("3%"),
  },
  trackButtonText: {
    color: "#fff",
    fontSize: hp("2%"),
    fontWeight: "600",
  },
  trainItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: hp("2%"),
    borderRadius: 12,
    marginBottom: hp("1.5%"),
  },
  trainIconContainer: {
    backgroundColor: "#fff",
    padding: wp("3%"),
    borderRadius: 8,
    marginRight: wp("3%"),
  },
  trainInfo: {
    flex: 1,
  },
  trainCode: {
    fontSize: hp("1.8%"),
    fontWeight: "600",
    color: "#000",
    marginBottom: hp("0.5%"),
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIcon: {
    marginRight: wp("1%"),
  },
  trainStatus: {
    fontSize: hp("1.6%"),
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("2%"),
  },
  trainLocation: {
    fontSize: hp("1.8%"),
    color: "#000",
  },
  pnrTable: {
    marginTop: hp("2%"),
  },
  pnrTableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: hp("1.5%"),
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  pnrTableHeader: {
    fontSize: hp("2%"),
    fontWeight: "600",
    color: "#000",
  },
  pnrTableCell: {
    fontSize: hp("1.8%"),
    color: "#000",
  },
});

export default TrainTrackingScreen;

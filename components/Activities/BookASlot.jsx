import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import ToastManager, { Toast } from "toastify-react-native";
export default function BookASlot() {

  const route = useRoute();
  const [activity, setActivity] = useState();
  
  useEffect(() => {
    console.log("😂😂😂😂")
    if (route.params?.activity) { 
      console.log("😂😂😂😂",route.params?.activity._id)
      console.log(route.params?.activity)

      setActivity(route.params?.activity);
    }
  }, [route.params]);

  
  const [participants, setParticipants] = useState(1);
  const [basePrice, setBasePrice] = useState(100);
  const [amount, setAmount] = useState(basePrice * participants);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const updateParticipants = (change) => {
    setParticipants((prev) => {
      const newCount = Math.max(1, prev + change);
      setAmount(newCount * basePrice);
      return newCount;
    });
  };
  const submit = async () => {
    const authToken = await AsyncStorage.getItem("authToken");
  
    // Validation checks before proceeding
    if (!selectedDate) {
      Toast.error("Please select a date");
      return;
    }
    if (!selectedTime) {
      Toast.error("Please select a time");
      return;
    }
    if (!participants || participants < 1) {
      Toast.error("Please select at least one participant");
      return;
    }
    if (!activity?._id) {
      Toast.error("Invalid activity. Please try again");
      return;
    }
  
    console.log("Booking Confirmed!");
    console.log("Date:", selectedDate.toDateString());
    console.log("Time:", `${selectedTime.getHours()}:${selectedTime.getMinutes()}`);
    console.log("Participants:", participants);
  
    try {
      const response = await axios.post(
        `${API_URL}/reservation/book`,
        {
          date: selectedDate.toDateString(),
          bookedTime: `${selectedTime.getHours()}:${selectedTime.getMinutes()}`,
          totalMembers: participants,
          business_id: activity._id,
          type: "Task",
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 201) {
        Toast.success("Booking successful");
      } else {
        Toast.error("Some error occurred");
      }
  
      console.log("Booking Response:", response.data);
    } catch (error) {
      console.error("Error confirming booking:", error);
      Toast.error("Failed to confirm booking. Please try again.");
    }
  };
  
  
  return (
    <SafeAreaView style={styles.safeArea}>
        <ToastManager />

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Icon name="arrow-back" type="material" size={wp("6%")} />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: hp("4%"),
                flexDirection: "row",
                justifyContent: "center",
                marginLeft: wp("5%"),
              }}
            >
              Book A Slot
            </Text>
            <View style={{ marginRight: 4 }}>
              <View style={styles.hamburgerContainer}>
                <Icon
                  name="close"
                  type="material-community"
                  size={wp("6%")}
                  color="#fff"
                />
              </View>
            </View>
          </View>
          <Text
            style={[
              styles.label,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#f5f5f5",
                padding: wp("4%"),
                borderRadius: 8,
                marginBottom: hp("2%"),
                margin: wp("4%"),
              },
            ]}
          >
            {activity?.name}
       
          </Text>
          <Text style={styles.label2}>Enter the data</Text>
          <Pressable
            style={styles.input}
            onPress={() => setDatePickerVisibility(true)}
          >
            <Text style={styles.inputText}>{selectedDate.toDateString()}</Text>
            <Icon name="calendar" type="material-community" size={wp("6%")} />
          </Pressable>
          <DatePickerModal
            locale="en"
            mode="single"
            visible={isDatePickerVisible}
            onDismiss={() => setDatePickerVisibility(false)}
            date={selectedDate}
            onConfirm={(params) => {
              setSelectedDate(params.date);
              setDatePickerVisibility(false);
            }}
          />

          <Text style={styles.label2}>Enter the Time</Text>
          <Pressable
            style={styles.input}
            onPress={() => setTimePickerVisibility(true)}
          >
            <Text style={styles.inputText}>
              {selectedTime
                ? `${selectedTime.getHours()}:${selectedTime.getMinutes()}`
                : "Select Time"}
            </Text>
            <Icon name="clock" type="feather" size={wp("6%")} />
          </Pressable>
          <TimePickerModal
            visible={isTimePickerVisible}
            onDismiss={() => setTimePickerVisibility(false)}
            onConfirm={(params) => {
              setSelectedTime(new Date(0, 0, 0, params.hours, params.minutes));
              setTimePickerVisibility(false);
            }}
            hours={selectedTime ? selectedTime.getHours() : 12}
            minutes={selectedTime ? selectedTime.getMinutes() : 0}
          />

          <View style={{ flexDirection: "row" }}>
            <Text
              style={[
                styles.label,
                styles.label2,
                { marginTop: wp("6%"), marginLeft: wp("5%") },
              ]}
            >
              Number of Participants
            </Text>
            <View style={styles.participantsContainer}>
              <TouchableOpacity
                onPress={() => updateParticipants(-1)}
                style={styles.participantButton}
              >
                <Icon name="remove" type="material" size={wp("6%")} />
              </TouchableOpacity>
              <Text style={styles.participantsCount}>{participants}</Text>
              <TouchableOpacity
                onPress={() => updateParticipants(1)}
                style={styles.participantButton}
              >
                <Icon name="add" type="material" size={wp("6%")} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.label2}>
            Reserve Your Slot with a Small Advance!
          </Text>
          {/* <Text
            style={[
              styles.label,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#f5f5f5",
                padding: wp("4%"),
                borderRadius: 8,
                marginBottom: hp("2%"),
                margin: wp("4%"),
              },
            ]}
          >
            Total Amount to be Payable : ₹${amount}
          </Text> */}
          <TouchableOpacity style={styles.confirmButton} onPress={submit}>
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "rgb(247, 241, 241)" },
  container: { flex: 1, padding: wp("4%") },
  form: {
    flexDirection: "column",
    gap: hp("0.6%"),
    margin: wp("0.1%"),
    backgroundColor: "white",
    borderRadius: wp("1%"),
    borderWidth: 0.1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: wp("5%"), fontWeight: "600" },
  input: {
    margin: wp("4%"),
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: wp("4%"),
    borderRadius: 8,
    marginBottom: hp("2%"),
  },
  inputText: { fontSize: wp("4%"), color: "#666" },
  label: {
    fontSize: wp("4.5%"),
    fontWeight: "500",
    marginBottom: hp("1%"),
    color: " #000000",
  },
  label2: {
    fontSize: wp("4.5%"),
    fontWeight: "500",
    marginBottom: hp("1%"),
    color: "rgb(136, 131, 131)",
    marginLeft: wp("5%"),
  },
  participantsContainer: {
    margin: wp("4%"),
    width: wp("33%"),
    height: hp("5%"),
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: wp("2%"),
    borderRadius: 8,
    marginBottom: hp("2%"),
  },
  participantButton: {
    backgroundColor: " #f5f5f5",
    padding: wp("2%"),
    borderRadius: 8,
  },
  participantsCount: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#fff",
    paddingVertical: hp("0.5%"),
    paddingHorizontal: wp("3%"),
    borderRadius: 4,
    overflow: "hidden",
  },

  confirmButton: {
    backgroundColor: "#00C853",
    padding: wp("4%"),
    borderRadius: 8,
    alignItems: "center",
    marginTop: hp("2%"),
    marginBottom: hp("1%"),
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: wp("4.5%"),
    fontWeight: "bold",
  },
  hamburgerContainer: {
    backgroundColor: "red", 
    borderRadius: 50, 
    width: wp("8%"), 
    height: wp("8%"), 
    justifyContent: "center",
    marginTop:hp("1%"),
    marginRight:wp("1%"),
    alignItems: "center",
    elevation: 4, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

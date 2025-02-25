import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput,Modal,TouchableOpacity,Image} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Icon } from "react-native-elements";
import { DatePickerModal } from "react-native-paper-dates";

const Booktable = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon name="arrow-left" type="feather" size={24} color="black" onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.maincontainer}>
        <View style={styles.header}>
          <Text style={styles.headertext}>Book a table now {"\n"}to get 20% on {"\n"}your order</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Total members</Text>
          <TextInput style={styles.input} placeholder="Enter members" placeholderTextColor="#999" />
          <Text style={styles.label}>Day</Text>
          <Pressable style={styles.input} onPress={() => setDatePickerVisibility(true)}>
            <Text style={styles.inputText}>{selectedDate.toDateString()}</Text>
            <Icon name="calendar" type="material-community" size={wp("6%")}/>
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
          <Text style={styles.label}>Time</Text>
          <TextInput style={styles.input} placeholder="Select time" placeholderTextColor="#999" />
          <Text style={styles.reserveText}>Reserve Your Table with a Small Advance!</Text>
          <TextInput style={styles.input} placeholder="Enter Amount - ₹ 100" placeholderTextColor="#999" />
        </View>
        <Pressable style={styles.button} onPress={()=>setModalVisible(true)}>
          <Text style={styles.buttonText}>Book My Table</Text>
        </Pressable>
      </View>
      <Modal visible={modalVisible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.successPopup}>
                   <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                     <Icon name="close" size={15} color="white" />
                   </TouchableOpacity>


          <Image
            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-qYFE9pg-7oly7Ge7LnDsuqIPQmvdbwae4g&s" }} 
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.successText}>Thank you! Booking has been Confirmed!</Text>
          <Text style={styles.subText}>Please check your inbox for table confirmation details.</Text>
        </View>
      </View>
    </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: wp("4%"),
  },
  icon: {
    marginRight: "auto",
    marginTop: hp("5%"),
  },
  maincontainer: {
    width: wp("90%"),
    backgroundColor: "#f7f5f4",
    padding: wp("5%"),
    borderRadius: wp("5%"),
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    marginTop: hp("3%"),
  },
  headertext: {
    fontSize: wp("7%"),
    fontWeight: "600",
    color: "#000",
    marginBottom: hp("2%"),
  },
  form: {
    marginTop: hp("2%"),
  },
  label: {
    fontSize: wp("4%"),
    fontWeight: "500",
    marginBottom: hp("0.5%"),
  },
  input: {
    backgroundColor: "#fff",
    padding: hp("1.5%"),
    borderRadius: wp("2%"),
    marginBottom: hp("2%"),
    fontSize: wp("4%"),
    color: "#000",
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: {
    fontSize: wp("4%"),
    color: "#000",
  },
  reserveText: {
    fontSize: wp("4%"),
    fontWeight: "500",
    textAlign: "center",
    marginVertical: hp("1%"),
  },
  button: {
    backgroundColor: "#rgba(0, 208, 132, 1)",
    padding: hp("2%"),
    borderRadius: wp("2%"),
    alignItems: "center",
    marginTop: hp("2%"),
  },
  buttonText: {
    color: "#fff",
    fontSize: wp("5%"),
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  successPopup: {
    width: wp("85%"),
    backgroundColor: "white",
    padding: wp("5%"),
    borderRadius: wp("4%"),
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: hp("2%"),
    right: wp("4%"),
    backgroundColor: "red",
    borderRadius: wp("5%"),
    width: wp("8%"),
    height: wp("8%"),
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    color: "white",
    fontSize: wp("5%"),
    fontWeight: "bold",
  },
  image: {
    width: wp("70%"),
    height: hp("20%"),
    marginBottom: hp("2%"),
  },
  successText: {
    fontSize: hp("2.2%"),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: hp("1%"),
  },
  subText: {
    fontSize: hp("1.8%"),
    textAlign: "center",
    color: "gray",
  },
});

export default Booktable;

import {
  View, Text, SafeAreaView, Dimensions, TouchableOpacity, Image, StyleSheet, Modal, ActivityIndicator,
  Settings
} from 'react-native'
import React, { useState } from 'react'
import GlobalStyles from '../../assets/styles/GlobalStyles';
import customFonts from '../../assets/fonts/Fonts';
import colors from '../../assets/colors/Colors';
import { getFormatedDate } from "react-native-modern-datepicker";
import DatePicker from "react-native-modern-datepicker";
import InviteDatePopup from '../../Components/InviteDatePopup';
import ApisPath from '../../lib/ApisPath/ApisPath';


const { height, width } = Dimensions.get('window');


export default function ReserveNightScreen({ navigation, route }) {

  const dateId = route.params.dateId
  console.log('selected date id is', dateId)

  const [numberofGuest, setNumberofGuest] = useState(2)
  const [startedDate, setStartedDate] = useState('')
  const [openDatePicker, setOpenDatePicker] = useState('')
  const [openTimePicker, setOpenTimePicker] = useState('')
  const [selectedDate, setSelectedDate] = useState("Select date");
  const [loadImage, setloadImage] = useState(false)
  const [showIndicator, setShowIndicator] = useState(false)
  const [time, setTime] = useState("Select time");
  const [error, setError] = useState(null);


  const [openModal, setOpenModal] = useState(false)
  const [selectedDateProfile, setSelectedDateProfile] = useState(null)


  const bookDate = async () => {

    if (time === "Select time" || selectedDate === "Select date" || !numberofGuest || !selectedDateProfile) {
      setError("Enter all cridentials")
      return
     
    }

    setShowIndicator(true)
    const data = Settings.get("USER")

    if (data) {
      let d = JSON.parse(data)

      let body = JSON.stringify({
        datePlaceId: dateId,
        date: selectedDate,
        time: time,
        numberOfGuests: numberofGuest,
        dateUserId: selectedDateProfile.id
      })

      try {
        const result = await fetch(ApisPath.ApiBookDate, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + d.token
          },
          body: body
        })
        if (result) {
          setShowIndicator(false)
          let json = await result.json()
          if (json.status === true) {
            console.log('book date data', json.data)
            navigation.navigate('TabBarContainer')
          } else {
            console.log('json message is', json.message)
          }
        }
      } catch (error) {
        console.log('error finding in book a date', error)
      }
    }

  }


  const increment = () => {
    setError(null)
    setNumberofGuest(numberofGuest + 1)
  }
  const decrement = () => {
    if (numberofGuest > 2) {
      setError(null)
      setNumberofGuest(numberofGuest - 1)
    } else {
      null
    }

  }


  const today = new Date();

  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "DD/MM/YYYY"
  );


  function handleChangeDate(propDate) {
    setStartedDate(propDate);
    setOpenDatePicker(!openDatePicker)
  }


  const handleOnPressDate = () => {
    setOpenDatePicker(!openDatePicker);
  };

  const handleOnPressTime = () => {
    setOpenTimePicker(!openTimePicker);
  };
  function handleChangeTime(propDate) {
    // setStartedDate(propDate);
    setOpenTimePicker(!openTimePicker)
  }

  const closeModal = (user) => {
    console.log('selected date profile', user)
    setSelectedDateProfile(user)
    setOpenModal(false)
  }
  return (
    <SafeAreaView>
      <View style={{ alignItems: 'center', height: height - 85 / 930 * height, width: width, flexDirection: 'column', justifyContent: 'space-between' }}>
        <View style={{ alignItems: 'center', flexDirection: 'column', gap: 32 / 930 * height }}>
          <View style={{ width: width - 60 / 430 * width, flexDirection: 'row', alignItems: 'center', gap: 20 / 430 * width }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}
            >
              <View style={GlobalStyles.backBtn}>
                <Image source={require('../../assets/images/backArrow.png')}
                  style={GlobalStyles.backBtnImage}
                />
              </View>
            </TouchableOpacity>
            <Text style={{ fontSize: 24, fontFamily: customFonts.meduim }}>Reserve a date night</Text>

          </View>


          <TouchableOpacity style={GlobalStyles.textInput}
            onPress={handleOnPressDate}
          >
            <View style={{
              flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',

            }}>
              <Text style={{ color: '#000', fontSize: 14, fontFamily: customFonts.meduim }}>
                {selectedDate}
              </Text>

              <Image source={require('../../assets/images/calender.png')}
                style={{ height: 24 / 930 * height, width: 24 / 930 * height }}
              />
            </View>

          </TouchableOpacity>


          <TouchableOpacity style={GlobalStyles.textInput}
            onPress={handleOnPressTime}
          >
            <View style={{
              flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',

            }}>
              <Text style={{ color: '#000', fontSize: 14, fontFamily: customFonts.meduim }}>
                {time}
              </Text>

              <Image source={require('../../assets/images/clock.png')}
                style={{ height: 24 / 930 * height, width: 24 / 930 * height }}
              />
            </View>

          </TouchableOpacity>

          <View style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 50 / 430 * width,

          }}>
            <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>Number of guests:</Text>
            <View style={{
              width: 200 / 430 * width, alignItems: 'center', justifyContent: 'center', paddingVertical: 12 / 930 * height, borderRadius: 10,
              paddingHorizontal: 16 / 430 * width, flexDirection: 'row', justifyContent: 'space-between', borderColor: colors.greyText, borderWidth: 1
            }}>
              <TouchableOpacity
                onPress={increment}
              >
                <Image source={require('../../assets/images/addcircle.png')}
                  style={{ height: 24 / 930 * height, width: 24 / 930 * height }}
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 14, fontFamily: customFonts.meduim }}>
                {numberofGuest}
              </Text>
              <TouchableOpacity
                onPress={decrement}>
                <Image source={require('../../assets/images/minuscircle.png')}
                  style={{ height: 24 / 930 * height, width: 24 / 930 * height }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {
            selectedDateProfile ? (
              <>
                <Image source={selectedDateProfile && { uri: selectedDateProfile.profile_image }} style={{
                  height: 370 / 930 * height, width: 370 / 430 * width, resizeMode: 'cover', borderRadius: 10, borderWidth: 1

                }}
                  onLoadStart={() => { setloadImage(true) }}
                  onLoadEnd={() => {
                    setloadImage(false)
                  }}
                />
                {
                  loadImage ? (
                    <ActivityIndicator style={{ position: 'absolute', bottom: 130, left: 150 }} size={'large'} color={colors.blueColor} />
                  ) : null
                }

              </>


            ) : (
              <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { backgroundColor: 'transparent', borderWidth: 2 }]}
                onPress={() => {
                  setOpenModal(true)
                  setError(null)
                }}
              >
                <Text style={[GlobalStyles.btnText, { color: '#000' }]}>
                  Invite your date
                </Text>
              </TouchableOpacity>
            )
          }


          <InviteDatePopup visible={openModal} close={closeModal} />

          <Modal
            animationType="slide"
            transparent={true}
            visible={openDatePicker}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  // minimumDate={startDate}
                  selected={startedDate}
                  onDateChanged={handleChangeDate}
                  onSelectedChange={(date) => {
                    setSelectedDate(date)
                    setError(null)

                  }}
                  options={{
                    backgroundColor: "#1c1c1c",
                    textHeaderColor: "#469ab6",
                    textDefaultColor: "#FFFFFF",
                    selectedTextColor: "#FFF",
                    mainColor: "#469ab6",
                    textSecondaryColor: "#FFFFFF",
                    borderColor: "gray",
                  }}
                />

                <TouchableOpacity onPress={handleOnPressDate}
                  style={{ backgroundColor: 'grey', paddingVertical: 10, borderRadius: 20, paddingHorizontal: 15 }}>
                  <Text style={{ color: "white" }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={openTimePicker}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <DatePicker
                mode="time"
                minuteInterval={1}
                onTimeChange={selectedTime => {
                  setError(null)
                  setTime(selectedTime)
                  setOpenTimePicker(!openTimePicker)
                  console.log('selected time is', selectedTime)
                }}
                options={{
                  backgroundColor: "#1c1c1c",
                  textHeaderColor: "#469ab6",
                  textDefaultColor: "#FFFFFF",
                  selectedTextColor: "#FFF",
                  mainColor: "#469ab6",
                  textSecondaryColor: "#FFFFFF",
                  borderColor: "gray",
                }}
              />
            </View>
          </View>
        </Modal>
        {
          error && <Text style={GlobalStyles.errorText}>{error}</Text>
        }
        {
          showIndicator ? (
            <ActivityIndicator size={'large'} color={colors.blueColor} />
          ) : (
            <TouchableOpacity style={GlobalStyles.reqtengularBtn}
              onPress={bookDate}
            >
              <Text style={GlobalStyles.btnText}>
                Reserve a date night
              </Text>
            </TouchableOpacity>
          )
        }





      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#1c1c1c",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.50,
    shadowRadius: 7,
    elevation: 5,
  },

})
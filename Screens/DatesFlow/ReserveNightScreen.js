import {
  View, Text, SafeAreaView, Dimensions, TouchableOpacity, Image, StyleSheet, Modal, ActivityIndicator,
  Settings,DeviceEventEmitter
} from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyles from '../../assets/styles/GlobalStyles';
import customFonts from '../../assets/fonts/Fonts';
import colors from '../../assets/colors/Colors';
import { getFormatedDate } from "react-native-modern-datepicker";
import DatePicker from "react-native-modern-datepicker";
import InviteDatePopup from '../../Components/InviteDatePopup';
import ApisPath from '../../lib/ApisPath/ApisPath';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('window');
const placholder = require('../../assets/images/imagePlaceholder.webp')
import { BroadcastEvents } from '../../models/Constants';
import { ShowMessage } from '../../Services/Snakbar/ShowMessage';


export default function ReserveNightScreen({ navigation, route }) {

  const data = route.params.data
  const sourceMoment = moment.unix(1636765200);
  const sourceDate = sourceMoment.local().toDate();
  // console.log('selected date is', data)

  const [numberofGuest, setNumberofGuest] = useState(2)
  const [startedDate, setStartedDate] = useState('')
  const [openDatePicker, setOpenDatePicker] = useState('')
  const [openTimePicker, setOpenTimePicker] = useState('')
  const [loadImage, setloadImage] = useState(false)
  const [showIndicator, setShowIndicator] = useState(false)
  const [time, setTime] = useState(sourceDate);
  const [error, setError] = useState(null);


  const [openModal, setOpenModal] = useState(false)
  const [selectedDateProfile, setSelectedDateProfile] = useState(null)
  const [date, setDate] = useState(sourceDate);
  const [showPicker, setShowPicker] = useState(false);



  useEffect(() => {
    const updateData = () => {
      console.log('user id is', data.date.id)
      setNumberofGuest(2)
      setSelectedDateProfile({ id: data.userId })
    }

    if (data.from === "ChatScreen") {
      updateData()

    }
  }, [])


  const bookDate = async () => {

    if (!numberofGuest || !selectedDateProfile) {
      setError("Enter all credentials")
      return

    }

    setShowIndicator(true)

    const userData = await AsyncStorage.getItem("USER")

    if (userData) {
      let d = JSON.parse(userData)

      let body = JSON.stringify({
        datePlaceId: data.date.id,
        date: date,
        time: time,
        numberOfGuests: numberofGuest,
        dateUserId: selectedDateProfile.id
      })
      console.log('body data is', body)
      // return
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
            ShowMessage("Congrats, date invite is sent",colors.blueColor,"white")
            if (data.from === "ChatScreen") {
                DeviceEventEmitter.emit(BroadcastEvents.EventUpcomingDateAdded,json.data)
                navigation.pop(2)
              return
            }

            route.params.invitedDate(json.data)
            navigation.pop()
            // navigation.navigate('TabBarContainer')
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
    // console.log('selected date profile', user)
    setSelectedDateProfile(user)
    setOpenModal(false)
  }


  const formatDate = (dateString) => {
    return moment(dateString).format("MM-DD-YYYY")
  };
  function handleChangeDate(event, selectedDate) {
    const currentDate = selectedDate || date;
    console.log('current date is', currentDate)
    setDate(currentDate);
    setOpenTimePicker(false)

    console.log("Formatted date is ", formatDate(currentDate))
  }
  function handleChangeTime(event, selectedDate) {
    const currentDate = selectedDate || date;
    console.log('current time is', currentDate)

    setTime(currentDate);
    setOpenTimePicker(false)
    // console.log("Formatted time is ", formatDate(currentDate))
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
            <Text style={{ fontSize: 24, fontFamily: customFonts.meduim }}>{data.from === 'ChatScreen' ? "Select date & time" : "Reserve a date night"}</Text>

          </View>
          {
            data.from === "ChatScreen" ? (

              <Text style={{ color: '#000', fontSize: 14, fontFamily: customFonts.meduim, textAlign: 'left', width: width - 50 / 430 * width }}>
                Please select date and time
              </Text>
            ) : ''
          }

          <View style={styles.dateTimePickerContainer}>

            <Text style={styles.text}>
              Select date
            </Text>

            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              minimumDate={new Date()}
              mode={'date'}
              is24Hour={false}
              display="default"
              onChange={handleChangeDate}
              style={styles.dateTimePicker}
            // width = {400}
            />

          </View>



          <View style={styles.dateTimePickerContainer}>
            <Text style={styles.text}>
              Select time
            </Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={time}
              minimumDate={new Date()}
              mode={"time"}
              is24Hour={false}
              display="default"
              onChange={handleChangeTime}
              style={styles.dateTimePicker}
            // width = {400}
            />

          </View>
          {
            data.from !== "ChatScreen" ? (
              <>
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
                      <Image source={selectedDateProfile && selectedDateProfile.profile_image ? { uri: selectedDateProfile.profile_image } : placholder}
                        style={{
                          height: 370 / 930 * height, width: 370 / 430 * width, resizeMode: 'cover', borderRadius: 10, borderWidth: 1

                        }}
                        onLoadStart={() => { setloadImage(true) }}
                        onLoadEnd={() => {
                          setloadImage(false)
                        }}
                      />
                      {
                        loadImage ? (
                          <ActivityIndicator style={{ position: 'absolute', bottom: 160, left: 180 }} size={'large'} color={colors.blueColor} />
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
              </>
            ) : ''
          }

          <InviteDatePopup visible={openModal} close={closeModal} />

        </View>


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
                {data.from === 'ChatScreen' ? "Invite" : "Reserve a date night"}
              </Text>
            </TouchableOpacity>
          )
        }





      </View>
    </SafeAreaView >

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

  dateTimePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width - 50,
    borderWidth: 2,
    borderColor: colors.greyText,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    color: '#000',
    fontSize: 18,
    fontFamily: customFonts.meduim
  },
  clockIcon: {
    height: 24 / 930 * height,
    width: 24 / 930 * height,
  },
  dateTimePicker: {
    // position: 'absolute',
    // top: 0,
    // width: width - 50,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },

})
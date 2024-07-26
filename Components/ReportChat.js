import {
  View, Text, SafeAreaView, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform,
  FlatList, TextInput, TouchableWithoutFeedback, Keyboard,
  ActivityIndicator
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import GlobalStyles from '../assets/styles/GlobalStyles';
import customFonts from '../assets/fonts/Fonts';
import colors from '../assets/colors/Colors';
import ApisPath from '../lib/ApisPath/ApisPath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { ShowMessage } from '../Services/Snakbar/ShowMessage';
const { height, width } = Dimensions.get('window');
const selectedImage = require('../assets/images/selectedCircle.png');
const unselectedImage = require('../assets/images/unselectedCircle.png');


export default function ReportChat({ navigation, route }) {

  const userId = route.params.userId

  const [selected, setSelected] = useState('')
  const [marginTop, setmarginTop] = useState(0);
  const [loading, setLoading] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState('');

  let inputRef = useRef(null)


  const reports = [
    {
      id: 1,
      reason: 'Harassment',
    },
    {
      id: 2,
      reason: 'Inappropriate content',
    },
    {
      id: 3,
      reason: 'Violation of terms',
    },
    {
      id: 4,
      reason: 'Offensive language',
    },
    {
      id: 5,
      reason: 'Threats',
    },
    {
      id: 6,
      reason: 'Privacy concerns',
    },
    {
      id: 7,
      reason: 'Others',
    },
  ]

  const reportUser = async () => {
    const data = await AsyncStorage.getItem("USER")
    setLoading(true)
    try {
      if (data) {
        let d = JSON.parse(data)
        let reason = ''
        if (selected.reason === "Others") {
          reason = additionalInfo
        } else {
          reason = selected.reason
        }
        let body = {
          reportedUserId: userId,
          reportReason: reason
        }
        console.log('body is', body)
        const result = await fetch(ApisPath.ApiReportUser, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + d.token
          },
          body: JSON.stringify(body)
        })

        if (result) {
          setLoading(false)
          let json = await result.json()
          if (json.status === true) {
            console.log('report sent',)
            ShowMessage("User reported",colors.blueColor)
            navigation.goBack()

          } else {
            console.log('report user message is', json.message)
          }
        }
      }
    } catch (e) {
      console.log('error finding in block user', e)
    }

  }



  useEffect(() => {
    console.log("Use Effect")
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      console.log("Keyboard show")
      setmarginTop(-100);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      console.log("Keyboard hide")
      setmarginTop(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onPressHandle = (item) => {
    if (item.id === 7) {
      inputRef.current.focus()
    }
    setSelected(item)
  }

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback style={{ height: height, width: width, alignItems: 'center' }} onPress={() => {
        // console.log("Pressed Touchable")
        Keyboard.dismiss()
      }} >

        <View style={{ height: height, width: width, alignItems: 'center', marginTop: marginTop }}>

          <View style={{ width: width - 60 / 430 * width, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
              <TouchableOpacity onPress={() => {
                navigation.goBack()
              }}>
                <View style={GlobalStyles.backBtn}>
                  <Image source={require('../assets/images/backArrow.png')}
                    style={GlobalStyles.backBtnImage}
                  />
                </View>
              </TouchableOpacity>

              <Text style={{ fontSize: 24, fontFamily: customFonts.meduim }}>Report</Text>

            </View>
            {
              loading ? (
                <ActivityIndicator size={'small'} color={colors.blueColor} />
              ) : (
                <TouchableOpacity onPress={() => {
                  reportUser()
                }}>
                  <Text style={{ fontSize: 18, fontFamily: customFonts.meduim, color: colors.blueColor }}>Send</Text>
                </TouchableOpacity>

              )
            }

          </View>

          <View style={{ width: width - 60 / 430 * width, alignItems: 'flex-start', marginTop: 27 / 930 * height, gap: 15, flexDirection: 'column' }}>
            <Text style={{ fontSize: 16, fontFamily: customFonts.semibold }}>Why do you want to report this user?</Text>

            <FlatList
              scrollEnabled={false}
              data={reports}
              renderItem={({ item }) => (
                <TouchableOpacity key={item.id}
                  onPress={() => onPressHandle(item)} style={{ alignSelf: 'flex-start' }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: 16 / 930 * height }}>

                    <Image source={selected.id === item.id ? selectedImage : unselectedImage}
                      style={GlobalStyles.backBtnImage}
                    />


                    <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>
                      {item.reason}
                    </Text>

                  </View>
                </TouchableOpacity>
              )}

            />

            <TextInput placeholder='Additional information'
              ref={inputRef}
              value={additionalInfo}
              onChangeText={(text) => {
                setAdditionalInfo(text)
              }}
              style={{
                height: 150 / 930 * height, width: width - 60 / 430 * width, borderWidth: 1,
                borderColor: colors.greyText, borderRadius: 10, paddingVertical: 30 / 930 * height, paddingHorizontal: 16 / 430 * width
              }}
              multiline
              textAlignVertical='top'
            />

          </View>


        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>


  )
}
import { View, Text, Dimensions, TouchableOpacity, SafeAreaView, Settings, ActivityIndicator } from 'react-native'
import React, { useState } from 'react';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import customFonts from '../../assets/fonts/Fonts';
import ApisPath from '../../lib/ApisPath/ApisPath';
import colors from '../../assets/colors/Colors';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('window')

export default function GotMatch({ navigation, route }) {

  const data = route.params.data
  console.log('data from prev screen', data.user.id)

  const [loading, setLoading] = useState(false)


  const createChat = async () => {
    setLoading(true)
    try {
      const userdata = await AsyncStorage.getItem("USER")
      if (userdata) {
        let d = JSON.parse(userdata)
        let body = JSON.stringify({
          userId: data.user.id
        })

        const result = await fetch(ApisPath.ApiCreateChat, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + d.token
          },
          body: body
        })

        if (result) {
          setLoading(false)
          let json = await result.json();
          console.log('lson is ', json)

          if (json.status === true) {
            console.log('chat created', json.data)
            navigation.navigate('ChatScreen', {
              data: {
                chat: json.data,
                from: 'Match'
              }
            })
          } else {
            console.log('create chat message is', json.message)
          }
        }
      }

    } catch (e) {
      console.log('error finding in create chat', e)
    }
  }

  return (
    <SafeAreaView>
      <View style={[GlobalStyles.container, { justifyContent: 'flex-start' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, width: width - 60 }}>
          <TouchableOpacity onPress={() => {
            navigation.goBack()
          }}>
            <View style={GlobalStyles.backBtn}>
              <Image source={require('../../assets/images/close.png')}
                style={GlobalStyles.backBtnImage}
              />
            </View>
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontFamily: customFonts.meduim }}>
            {data.user.first_name} {data.user.last_name}
          </Text>
        </View>
        <Image source={require('../../assets/images/heart.png')}
          style={{ width: 304 / 430 * width, height: 304 / 930 * height, resizeMode: 'contain', tintColor: '#e6e6e6', marginTop: 120 }}
        />

        <Text style={{ fontSize: 28, fontFamily: customFonts.semibold, marginTop: 25 }}>You got a match!</Text>
        <Text style={{ fontSize: 16, fontFamily: customFonts.regular, marginTop: 8, marginBottom: 40 }}>
          You both liked each other.
        </Text>
        {
          loading ? (
            <ActivityIndicator size={'large'} color={colors.blueColor} />
          ) : (
            <TouchableOpacity style={GlobalStyles.reqtengularBtn}
              onPress={() => {
                createChat()
              }}
            >
              <Text style={GlobalStyles.btnText}>
                Start a message
              </Text>
            </TouchableOpacity>
          )
        }

      </View>
    </SafeAreaView>
  )
}
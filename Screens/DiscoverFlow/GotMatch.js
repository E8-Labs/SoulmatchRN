import { View, Text, Dimensions, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import customFonts from '../../assets/fonts/Fonts'
const { height, width } = Dimensions.get('window')
export default function GotMatch() {
  return (
  <SafeAreaView>
    <View style={[GlobalStyles.container,{justifyContent:'flex-start'}]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, width: width - 60 }}>
        <TouchableOpacity >
          <View style={GlobalStyles.backBtn}>
            <Image source={require('../../assets/images/close.png')}
              style={GlobalStyles.backBtnImage}
            />
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontFamily: customFonts.meduim }}>
          Isabella Taylor
        </Text>
      </View>
      <Image source={require('../../assets/images/heart.png')}
        style={{ width: 304 / 430 * width, height: 304 / 930 * height, resizeMode: 'contain', tintColor: '#e6e6e6',marginTop:120 }}
      />

      <Text style={{ fontSize: 28, fontFamily: customFonts.semibold, marginTop: 25 }}>You got a match!</Text>
      <Text style={{ fontSize: 16, fontFamily: customFonts.regular, marginTop: 8,marginBottom:40 }}>
        You both liked each other.
      </Text>

      <TouchableOpacity style = {GlobalStyles.reqtengularBtn}>
        <Text style = {GlobalStyles.btnText}>
          Start a message
        </Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}
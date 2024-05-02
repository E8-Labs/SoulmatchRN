import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import customFonts from '../../assets/fonts/Fonts'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import colors from '../../assets/colors/Colors';
import DatesContainer from '../DatesFlow/DatesContainer';

const { height, width } = Dimensions.get('window')

export default function DatesMain() {

  


  return (
    <View style={{ alignItems: 'center', height: height, backgroundColor: 'white' }}>

      <View style={{
        backgroundColor: 'white', height: 110 / 930 * height, width: width,
      }}>
        <View style={{
          alignItems: 'flex-end', flexDirection: 'row', height: 110 / 930 * height, width: width - 50, alignSelf: 'center', paddingBottom: 10,
          justifyContent: 'space-between',
        }}>
          <Text style={{ fontSize: 23, fontFamily: customFonts.meduim }}>Dates</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <TouchableOpacity>
              <Image source={require('../../assets/images/searchIcon.png')}
                style={GlobalStyles.backBtnImage}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../assets/images/setting.png')}
                style={GlobalStyles.backBtnImage}
              />
            </TouchableOpacity>

          </View>
        </View>
      </View>

      <DatesContainer/>

      
    </View>

  )
}
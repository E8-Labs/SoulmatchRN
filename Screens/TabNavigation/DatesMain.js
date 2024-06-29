import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { Image } from 'expo-image';
import customFonts from '../../assets/fonts/Fonts'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import colors from '../../assets/colors/Colors';
import DatesContainer from '../DatesFlow/DatesContainer';
import DatesFilterPopup from '../../Components/DatesFilterPopup';

const { height, width } = Dimensions.get('window')

export default function DatesMain(props) {

  const [showmodal,setShowModal] = useState(false)
const closeModal = () =>{
  setShowModal(false)
}


  return (
    <View style={{ alignItems: 'center', height: height, backgroundColor: 'white' }}>

      <View style={{
        backgroundColor: 'white', height: 110 / 930 * height, width: width,
      }}>
        <View style={{
          alignItems: 'flex-end', flexDirection: 'row', height: 110 / 930 * height, width: width , alignSelf: 'center', paddingBottom: 10,
          justifyContent: 'space-between',paddingLeft:20
        }}>
          <Text style={{ fontSize: 23, fontFamily: customFonts.meduim }}>Dates</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <TouchableOpacity>
              <Image source={require('../../assets/images/searchIcon.png')}
                style={GlobalStyles.backBtnImage}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={()=>{
                setShowModal(true)
              }}
            >
              <Image source={require('../../assets/images/setting.png')}
                style={GlobalStyles.backBtnImage}
              />
            </TouchableOpacity>

            <DatesFilterPopup visible={showmodal} close={closeModal}/>

          </View>
        </View>
      </View>

      <DatesContainer navigation={props.navigation}/>

      
    </View>

  )
}
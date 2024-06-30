import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions, TextInput, FlatList } from 'react-native';
import { Image } from 'expo-image';
import customFonts from '../../assets/fonts/Fonts'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import colors from '../../assets/colors/Colors';
import DatesContainer from '../DatesFlow/DatesContainer';
import DatesFilterPopup from '../../Components/DatesFilterPopup';
import { usePermissions } from 'expo-notifications';

const { height, width } = Dimensions.get('window')

export default function DatesMain(props) {

  const [showmodal, setShowModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchDates, setSearchDates] = useState('');
  const [dateFilters, setDateFilters] = useState({})


  const closeModal = (filters) => {
    if (filters) {
      console.log('filters recevied from popup are', filters)

      setDateFilters(filters)
    }
    setShowModal(false)
  }

  return (
    <View style={{ alignItems: 'center', height: height, backgroundColor: 'white' }}>

      <View style={{
        backgroundColor: 'white', height: showSearch ? 180 / 930 * height : 110 / 930 * height, width: width,
      }}>
        <View style={{
          alignItems: 'flex-end', flexDirection: 'row', height: 110 / 930 * height, width: width, alignSelf: 'center', paddingBottom: 10,
          justifyContent: 'space-between', paddingLeft: 20
        }}>
          <Text style={{ fontSize: 23, fontFamily: customFonts.meduim }}>Dates</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>

            <TouchableOpacity
              onPress={() => {
                setShowSearch(!showSearch)
              }}
            >
              <Image source={require('../../assets/images/searchIcon.png')}
                style={GlobalStyles.backBtnImage}
              />
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => {
                setShowModal(true)
              }}
            >
              <Image source={require('../../assets/images/setting.png')}
                style={GlobalStyles.backBtnImage}
              />
            </TouchableOpacity>

            <DatesFilterPopup visible={showmodal} close={closeModal} />

          </View>
        </View>
        {showSearch &&
          <View style={{ width: width, alignItems: 'center', marginBottom: 50 }}>
            <View style={{
              flexDirection: 'row', width: width - 50, alignItems: 'center', height: 50, justifyContent: 'center',
              padding: 16, borderRadius: 10, gap: 10, backgroundColor: '#f5f5f5',
              marginTop: 20
            }}>
              <TouchableOpacity style={{ width: 30 / 430 * width, height: 30 / 930 * height, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../assets/Images3/searchIcon.png')} style={{ height: 55 / 930 * height, width: 55 / 930 * width, resizeMode: 'contain' }} />
              </TouchableOpacity>
              <TextInput
                value={searchDates}
                onChangeText={(e) => setSearchDates(e)}
                style={{
                  width: 304 / 430 * width,
                  fontSize: 14, fontWeight: '500', fontFamily: customFonts.medium
                }}
                placeholder='Search' />
            </View>
          </View>
        }
      </View>

      <DatesContainer style={{ marginTop: showSearch ? 80 : 0 }} navigation={props.navigation}
        search={searchDates} showSearch={showSearch} filters={dateFilters}
      />


    </View>

  )
}

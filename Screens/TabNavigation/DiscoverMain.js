import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, Image, StyleSheet, TouchableOpacity, Settings } from 'react-native'
import CardContainerMain from '../DiscoverFlow/CardSwipContainer/CardContainerMain'
import customFonts from '../../assets/fonts/Fonts';
import LikesList from '../DiscoverFlow/LikesList';
import FilterPopup from '../../Components/FilterPopup';
import DiscoverGotMatch from '../../Components/DiscoverGotMatch';
import ProfileDetail from '../DiscoverFlow/ProfileDetail';
import ApisPath from '../../lib/ApisPath/ApisPath';
import { useFocusEffect } from '@react-navigation/native';


const { height, width } = Dimensions.get("window");

export default function DiscoverMain(props) {

  const [openModal, setOpenModal] = useState(false);
  const [discovers, setDiscovers] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      console.log("Use Focus Effect")
      getDiscover()
    }, [])
  );

  useEffect(() => {
    // getDiscover()
  }, [])

  const getDiscover = async () => {
    console.log('getting discover users')
    const data = Settings.get("USER")
    try {
      if (data) {
        let d = JSON.parse(data)

        const result = await fetch(ApisPath.ApiGetDiscover, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + d.token
          }
        })
        if (result) {
          let json = await result.json();
          if (json.status === true) {
            console.log('discover users are ', json.data)
            setDiscovers(json.data)
          } else {
            console.log('json message is', json.message)
          }
        }
      }
    } catch (error) {
      console.log('error finding in get discover', error)
    }

  }

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'transparent' }}>

      <ProfileDetail data={discovers} fromScreen={'Main'} onMenuClick={(data) => {
        if (data.navigate === 'LikesList') {
          props.navigation.navigate("LikesList")
        } else if (data.navigate === 'GotMatch') {
          props.navigation.navigate("GotMatch", {
            data: data
          })
        }
        else if (data.navigate === 'Logout') {
          props.navigation.push("LoginUser")

        } else if (data.navigate === 'Notifications') {
          props.navigation.navigate("NotificationsScreen", {

          })
        }
      }}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 28 / 930 * height,
    width: 28 / 930 * height,
    resizeMode: 'contain'
  }
})

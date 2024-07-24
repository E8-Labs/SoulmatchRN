import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Settings, ActivityIndicator } from 'react-native'
import { Image } from 'expo-image';
import CardContainerMain from '../DiscoverFlow/CardSwipContainer/CardContainerMain'
import customFonts from '../../assets/fonts/Fonts';
import LikesList from '../DiscoverFlow/LikesList';
import FilterPopup from '../../Components/FilterPopup';
import DiscoverGotMatch from '../../Components/DiscoverGotMatch';
import ProfileDetail from '../DiscoverFlow/ProfileDetail';
import ApisPath from '../../lib/ApisPath/ApisPath';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../assets/colors/Colors';
import DiscoverLoading from '../../Services/ProfileServices/DiscoverLoading';

const { height, width } = Dimensions.get("window");

export default function DiscoverMain(props) {

const MatchLimit = 3
  const [discovers, setDiscovers] = useState([]);
  const [loading, setLoading] = useState(false)
  const [exceedeMatches, setExceedeMatches] = useState(false)


  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log("Use Focus Effect")
  //     getDiscover()

  //   }, [])
  // );

  useEffect(() => {
    getDiscover()
  }, [])

  const getDiscover = async () => {
    console.log('getting discover users')
    setLoading(true)
    const data = await AsyncStorage.getItem("USER")
    // try {
    if (data) {
      let d = JSON.parse(data)
      console.log('user matches are', d.user.totalMatches)
      if (d.user.totalMatches >= MatchLimit) {
        setExceedeMatches(true)
        setLoading(false)
        return
      }
      let filters = await AsyncStorage.getItem("FilterDiscovers")

      let body = ''
      let discoverFilter = ''

      if (filters) {
        discoverFilter = JSON.parse(filters)
        console.log('filters from local on discover screen', discoverFilter)
        body = JSON.stringify(discoverFilter)
      } else {
        body = ''
      }

      const result = await fetch(ApisPath.ApiGetDiscover, {
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
        if (json.status === true) {
          console.log('discover users are ', json.data)
          setDiscovers(json.data)
        } else {
          console.log('json message is', json.message)
          // if(json.message === "You've exceeded the maximum match limit"){
          //   setExceedeMatches(true)
          // }
        }
      }
    } else {
      console.log('no filters found')
    }

    // } catch (error) {
    //   console.log('error finding in get discover', error)
    // }
  }




  const pickAddress = (address) => {
    console.log('address is ', address)
    setCityName(address.city)
    setStateName(address.state)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'transparent' }}>
      {
        loading ? (
          <DiscoverLoading />
        ) : (
          <ProfileDetail exceedeMatches={exceedeMatches} navigation={props.navigation} data={discovers} fromScreen={'Main'} filtersData={(data) => {
            console.log('filters data is ', data)
            if (data.getDiscover === true) {
              getDiscover()
            }
          }}
            ProfileMatched={async () => {
              const data = await AsyncStorage.getItem("USER")
              if (data) {
                let d = JSON.parse(data)
                d.user.totalMatches += 1
                console.log('user matches are', d.user.totalMatches)
                if (d.user.totalMatches >= MatchLimit) {
                  setExceedeMatches(true)
                }
                AsyncStorage.setItem("USER",JSON.stringify(d))
              }
            }}
          LastProfileSwiped={() => {
              setDiscovers([])
              getDiscover()
            }}

            onMenuClick={(data) => {
              if (data.navigate === 'LikesList') {
                props.navigation.navigate("LikesList",{
                  ProfileMatched: async () => {
                    const data = await AsyncStorage.getItem("USER")
                    if (data) {
                      let d = JSON.parse(data)
                      d.user.totalMatches += 1
                      console.log('user matches are', d.user.totalMatches)
                      if (d.user.totalMatches >= MatchLimit) {
                        setExceedeMatches(true)
                      }
                      AsyncStorage.setItem("USER",JSON.stringify(d))
                    }
                  }
                })
              } else if (data.navigate === 'GotMatch') {
                props.navigation.navigate("GotMatch", {
                  data: data
                })
              }
              else if (data.navigate === 'Logout') {
                props.navigation.push("LoginUser")

              } else if (data.navigate === 'Notifications') {
                props.navigation.navigate("NotificationsScreen")
              } else if (data.navigate === 'VideoPlayer') {
                props.navigation.navigate("VideoPlayer", {
                  data: data
                })
              } else if (data.navigate === 'AddressPicker') {
                props.navigation.navigate('AddressPicker', {
                  PickAddress: pickAddress
                })
              } else if (data.navigate === 'ViewMyMatchesScreen') {
                props.navigation.navigate("ViewMyMatchesScreen", {
                  data: data
                })
              }
            }}
          />
        )
      }


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

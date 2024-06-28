import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions, FlatList, SafeAreaView, Settings, ActivityIndicator } from 'react-native'
import { Image } from 'expo-image'

import GlobalStyles from '../../assets/styles/GlobalStyles'
import customFonts from '../../assets/fonts/Fonts'
import colors from '../../assets/colors/Colors'
import ApisPath from '../../lib/ApisPath/ApisPath'
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('window')

const placholder = require('../../assets/images/imagePlaceholder.webp')

const likeImage = require('../../assets/images/like.png')
const unlikeImage = require('../../assets/images/unLike.png')
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function LikesList(props) {

  const [selected, setSelected] = useState('')
  const [likes, setLikes] = useState([])
  const [showIndidator, setShowIndicator] = useState(false)
  const [loadImage, setLoadImage] = useState(false)

  useEffect(() => {
    getProfiles()
  }, [])


  const getProfiles = async () => {
    const data =await AsyncStorage.getItem("USER")

    setShowIndicator(true)
    try {
      console.log('trying to get profiles who likes me')
      if (data) {
        let d = JSON.parse(data)
        // console.log('user data', d)
        const result = await fetch(ApisPath.ApiGetProfileLikes, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + d.token
          }
        })

        if (result) {
          setShowIndicator(false)
          // console.log('result is', result)
          let json = await result.json()
          if (json.status === true) {
            console.log('Profiles who likes me are', json.data)
            setLikes(json.data)
            const likedProfiles = json.data.filter(user => user.isLiked).map(user => user.id)
            setSelected(likedProfiles)
          } else {
            console.log('json message is', json.messsage)
          }
        }
      } else {
        console.log('no data stored in local')
      }
    } catch (error) {
      console.log('error finding in gettinng profiles', error)
    }

  }

  const likeUserProfile = async (item) => {
    console.log('trying to likes profile')

    const user = await AsyncStorage.getItem("USER")
    try {
      if (user) {
        let d = JSON.parse(user)
        
        // return
        let body = JSON.stringify({
          user_id: item.id,
          status: "liked"
        })

        const result = await fetch(ApisPath.ApiLikeProfile, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + d.token
          },
          body: body
        })
        if (result) {
          let json = await result.json()
          if (json.status === true) {
            console.log('profile liked', json)
            setSelected(prev => [...prev, item.id])
              let match = ""
              likes.forEach((user)=>{
                
                if(user.id === item.id){
                    match = user
                }
              })
              console.log('liked user profile is', match)
            if(json.match === true){
              

              props.navigation.navigate("GotMatch",{
                data:{
                  navigate: 'GotMatch',
                  user: match
                }
              })
            }
           
          } else {
            console.log('json message', json.message)
          }
        }
      }
    } catch (error) {
      console.log('error finding in like profile', error)
    }



    console.log('Liked:', item.id);

  };
  const disLikeUserProofile = async (item) => {
    console.log('trying to dislikes profile')

    const user = await AsyncStorage.getItem("USER")
    try {
        if (user) {
            let d = JSON.parse(user)

            let body = JSON.stringify({
                user_id: item.id,
                status: "rejected"
            })

            const result = await fetch(ApisPath.ApiLikeProfile, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + d.token
                },
                body: body
            })
            if (result) {
                let json = await result.json()
                if (json.status === true) {
                    console.log('profile disliked', json.data)
                    setSelected(prev => prev.filter(id => id !== item.id))
                    
                    
                } else {
                    console.log('json message', json.message)
                }
            }
        }
    } catch (error) {
        console.log('error finding in like profile', error)
    }


    console.log('Rejected:', item.id);

};




  const onpressHandle = (item) => {
    const selectedIndex = selected.indexOf(item.id)
    if (selectedIndex > -1) {
      setSelected(prevItem => prevItem.filter(i => i != item.id))
      disLikeUserProofile(item)
    } else {
      setSelected(prevItem => [...prevItem, item.id])
      likeUserProfile(item)
    }
  }
  return (
    <SafeAreaView>
      <View style={{ width: width, height: height, alignItems: 'center' }}>

        <View style={{ flexDirection: 'row', gap: 20, margin: 20, width: width - 60, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => {
            props.navigation.goBack()
          }}>
            <View style={GlobalStyles.backBtn}>
              <Image source={require('../../assets/images/backArrow.png')}
                style={GlobalStyles.backBtnImage}
              />
            </View>
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontFamily: customFonts.meduim }}>Likes</Text>
        </View>

        <View style={{ height: height * 0.8 }}>
          {
            showIndidator ? (
              <ActivityIndicator size={'large'} style={{ height: height * 0.7 }} color={colors.blueColor} />
            ) : (
              <>
                {
                  likes.length > 0 ? (
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      scrollEnabled={true}
                      data={likes}
                      renderItem={({ item }) => (
                        <View style={{ width: width - 60, borderWidth: 1, borderColor: colors.greyText, borderRadius: 10, padding: 13, marginTop: 13 / 930 * height }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => {
                              props.navigation.navigate("SelectedProfile", {
                                data:{
                                  user:item,
                                  from:'LikesList'
                                }
                              })
                            }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}>
                                <Image
                                  onLoadStart={() => { setLoadImage(true) }}
                                  onLoadEnd={() => {
                                    setLoadImage(false)
                                  }}
                                  placeholder={blurhash}
                                  contentFit="cover"
                                  transition={1000}
                                  source={item.profile_image ? { uri: item.profile_image } : placholder}
                                  style={{ height: 46, width: 46, borderRadius: 25 }}
                                />
                                {
                                  loadImage ? (
                                    <ActivityIndicator size={'small'} color={colors.blueColor} style={{ marginLeft: -50/430*width, }} />
                                  ) : <></>
                                }
                                <Text numberOfLines={2} style={{ fontSize: 16, fontFamily: customFonts.meduim,width:200/430*width }}>
                                  {item.first_name} {item.last_name}
                                </Text>
                              </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => onpressHandle(item)}>
                              <View style={GlobalStyles.likeBtn}>
                                <Image source={selected.includes(item.id) ? likeImage : unlikeImage}
                                  style={GlobalStyles.likeBtnImage}
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    />
                  ) : (
                    <Text style={{ fontSize: 18, fontFamily: customFonts.meduim, marginTop: 20 }}>
                      There is no profile who likes you
                    </Text>
                  )
                }

              </>

            )
          }

        </View>
      </View>
    </SafeAreaView>
  )
}

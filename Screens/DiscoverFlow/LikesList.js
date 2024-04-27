import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native'

import GlobalStyles from '../../assets/styles/GlobalStyles'
import customFonts from '../../assets/fonts/Fonts'
import colors from '../../assets/colors/Colors'

const { height, width } = Dimensions.get('window')

const likeImage = require('../../assets/images/like.png')
const unlikeImage = require('../../assets/images/unLike.png')

export default function LikesList(props) {

  const [selected, setSelected] = useState('')

  const likes = [
    {
      id: 1,
      name: "Isabella Taylor",
      image: require('../../assets/images/profileImage.png')
    },
    {
      id: 2,
      name: "Isabella Taylor",
      image: require('../../assets/images/profileImage.png')
    },
    {
      id: 3,
      name: "Isabella Taylor",
      image: require('../../assets/images/profileImage.png')
    },
    {
      id: 4,
      name: "Isabella Taylor",
      image: require('../../assets/images/profileImage.png')
    },
    {
      id: 5,
      name: "Isabella Taylor",
      image: require('../../assets/images/profileImage.png')
    },
    {
      id: 6,
      name: "Isabella Taylor",
      image: require('../../assets/images/profileImage.png')
    },
    {
      id: 7,
      name: "Isabella Taylor",
      image: require('../../assets/images/profileImage.png')
    },
    {
      id: 8,
      name: "Isabella Taylor",
      image: require('../../assets/images/profileImage.png')
    },
  ]

  const onpressHandle = (item) => {
    const selectedIndex = selected.indexOf(item.id)
    if (selectedIndex > -1) {
      setSelected(prevItem => prevItem.filter(i => i != item.id))
    } else {
      setSelected(prevItem => [...prevItem, item.id])
    }
  }
  return (
    <View style={{ width: width, height: height, alignItems: 'center' }}>

      <View style={{ flexDirection: 'row', gap: 20, marginTop: 30, width: width - 60, }}>
        <TouchableOpacity onPress={()=>{
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

      <View style={{ height: height * 0.86 }}>

        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          data={likes}
          renderItem={({ item }) => (
            <View style={{ width: width - 60, borderWidth: 1, borderColor: colors.greyText, borderRadius: 10, padding: 13, marginTop: 13 / 930 * height }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={()=>{
                  props.navigation.navigate("ProfileDetail",{
                    fromScreen:"LikesList"
                  })
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}>
                    <Image source={item.image}
                      style={{ height: 46, width: 46, borderRadius: 25 }}
                    />
                    <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>
                      {item.name}
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
      </View>
    </View>
  )
}

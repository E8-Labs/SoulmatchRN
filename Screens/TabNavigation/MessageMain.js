import React from 'react'
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native'
import customFonts from '../../assets/fonts/Fonts'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import MessagesList from '../ChatFlow/MessagesList'

const { height, width } = Dimensions.get('window')

export default function MessageMain(props) {
  return (
    <View style={{ alignItems: 'center', height: height,backgroundColor:'white' }}>

      <View style={{
        backgroundColor: 'white', height: 110 / 930 * height, width: width, shadowColor: '#000', shadowOffset: {
          width: 0,
          height: 5
        }, shadowRadius: 5, shadowOpacity: 0.04,
      }}>
        <View style={{
          alignItems: 'flex-end', flexDirection: 'row', height: 110 / 930 * height, width: width - 50, alignSelf: 'center', paddingBottom: 10,
          justifyContent: 'space-between',
        }}>
          <Text style={{ fontSize: 23, fontFamily: customFonts.meduim }}>Messages</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <TouchableOpacity>
              <Image source={require('../../assets/images/searchIcon.png')}
                style={GlobalStyles.backBtnImage}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../assets/images/moreIcon.png')}
                style={GlobalStyles.backBtnImage}
              />
            </TouchableOpacity>

          </View>
        </View>
      </View>

      <MessagesList navigate={(chat) => {
        console.log("User selected ", chat)
        props.navigation.navigate("ChatScreen",{
          data:{
            chat:chat,
            from:'message'
          }
        })
      }}/>

    </View>
  )
}

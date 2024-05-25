import React from 'react'
import { View, Text, Settings, TouchableOpacity, Dimensions } from 'react-native'
import colors from '../../assets/colors/Colors'

const { height, width } = Dimensions.get('window');


export default function ProfileMain(props) {

  const logoutUser = async () => {
    console.log('trying to logout')
    try {
      Settings.set({ USER: null })
      props.navigation.navigate('LoginUser')
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <View style={{flexDirection: 'row', height: height, width: width, alignItems: 'center', justifyContent: 'center' }}>
      
      <TouchableOpacity style = {{}} 
        onPress={()=>{
         logoutUser()
        }}
      >
        <Text style = {{color:colors.blueColor,fontSize:20}}>
          logout
        </Text>
      </TouchableOpacity>
    </View>
  )
}
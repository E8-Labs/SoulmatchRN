import React from 'react'
import { View, Text, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native'
import CardContainerMain from '../DiscoverFlow/CardSwipContainer/CardContainerMain'
import customFonts from '../../assets/fonts/Fonts';
import LikesList from '../DiscoverFlow/LikesList';


const { height, width } = Dimensions.get("window");


export default function DiscoverMain(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, width: width - 30, justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 24, fontFamily: customFonts.meduim }}>Emily Grace</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 / 430 * width }}>
          <TouchableOpacity onPress={()=>{
            props.navigation.navigate("LikesList")
          }}>
            <Image source={require('../../assets/images/profileLike.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Image source={require('../../assets/images/bell.png')}
              style={styles.image}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image source={require('../../assets/images/setting.png')}
              style={styles.image}
            />
          </TouchableOpacity>


        </View>
      </View>
      <CardContainerMain />
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

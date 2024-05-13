import React ,{useState}from 'react'
import { View, Text, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native'
import CardContainerMain from '../DiscoverFlow/CardSwipContainer/CardContainerMain'
import customFonts from '../../assets/fonts/Fonts';
import LikesList from '../DiscoverFlow/LikesList';
import FilterPopup from '../../Components/FilterPopup';
import DiscoverGotMatch from '../../Components/DiscoverGotMatch';
import ProfileDetail from '../DiscoverFlow/ProfileDetail';


const { height, width } = Dimensions.get("window");



export default function DiscoverMain(props) {

const [openModal, setOpenModal] = useState(false);

const closeModal = () =>{
  setOpenModal(false)
}

  return (
    <View style={{ flex: 1, alignItems: 'center',backgroundColor:'transparent' }}>
      <View style={{ flexDirection: 'row', marginTop: 60 / 930 * height, width: width - 30, justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 24, fontFamily: customFonts.meduim }}>Emily Grace</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 / 430 * width }}>
          <TouchableOpacity onPress={() => {
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

          <TouchableOpacity onPress={() => {
              setOpenModal(true)
          }}>
            <Image source={require('../../assets/images/setting.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <FilterPopup visible ={openModal} close = {closeModal}/>


        </View>
      </View>
      <ProfileDetail fromScreen = {'Main'} />
      {/* <CardContainerMain /> */}
      {/* <DiscoverGotMatch/> */}
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

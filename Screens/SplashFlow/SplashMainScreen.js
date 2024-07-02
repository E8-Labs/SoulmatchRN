import React, { useEffect } from "react";
import { View, Text, Dimensions, Settings, Alert } from "react-native";
import { Image } from "expo-image";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile } from "../../Services/ProfileServices/GetProfile";
import {NavigateLogedUser} from '../../Services/user/NavigateLogedUser'
import customFonts from "../../assets/fonts/Fonts";

const SplashMainScreen = (props) => {
    const { height, width } = Dimensions.get('window')


    useEffect(() => {

        const checkUserDetails = async() =>{
            try{
                let from = "Splash"
              let u =  await NavigateLogedUser(props.navigation,from)
              if(u === "SlideScreen"){
                props.navigation.navigate("SlideContainer")
              }
            } catch(e){
                // alert(e)
                console.log('error finding to navigate user', e)
            }
        }

        checkUserDetails()

    })


    return (
        <View style={GlobalStyles.container}>

            <Image source={require("../../assets/images/logo.png")}
                style={{ height: 81 / 930 * height, width: 98 / 930 * height, resizeMode: 'contain' }}
            />
            <Text style={{ fontSize: 38, fontWeight: '400' ,fontFamily: customFonts.meduim}}>soulmatch</Text>

        </View>
    )
}

export default SplashMainScreen
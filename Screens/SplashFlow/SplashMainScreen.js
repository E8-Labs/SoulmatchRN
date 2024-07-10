import React, { useEffect } from "react";
import { View, Text, Dimensions, Settings, Alert } from "react-native";
import { Image } from "expo-image";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile } from "../../Services/ProfileServices/GetProfile";
import {NavigateLogedUser} from '../../Services/user/NavigateLogedUser'
import customFonts from "../../assets/fonts/Fonts";
import Purchases from 'react-native-purchases';

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


    // const initializePurchases = async () => {
    //     Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
    
    //     try {
    //       if (Platform.OS === 'ios') {
    //         const data = await AsyncStorage.getItem("USER");
    //         let user = null;
    //         if (data) {
    //           let d = JSON.parse(data);
    //           user = d.user;
    //           await Purchases.configure({ apiKey: RevenueCatApiKey, appUserID: `${user.id}` });
    //           console.log("Initialized user with id:", user.id);
    
    //           try {
    //             const customerInfo = await Purchases.getCustomerInfo();
    //             if (typeof customerInfo.entitlements.active["premium"] != "undefined") {
    //               console.log("User subscribed to plan ", customerInfo.entitlements.active["premium"]);
    //             } 
    //             // access latest customerInfo
    //           } catch (e) {
    //            // Error fetching customer info
    //           }
    //           fetchProducts();
    //         }
    //       } else if (Platform.OS === 'android') {
    //         await Purchases.configure({ apiKey: RevenueCatApiKey });
    //         fetchProducts();
    //       }
    //     } catch (error) {
    //       console.error('Failed to initialize purchases:', error);
    //     }
    //   };


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
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  DeviceEventEmitter,
  Easing,
  Animated
} from 'react-native';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import customFonts from '../../assets/fonts/Fonts';
import ApisPath from '../../lib/ApisPath/ApisPath';
import colors from '../../assets/colors/Colors';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BroadcastEvents, placholder } from '../../models/Constants';

const { height, width } = Dimensions.get('window');

export default function GotMatch({ navigation, route }) {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const colorValue = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(-width/2 - 100)).current;
  const translateX2 = useRef(new Animated.Value(width + 100)).current;

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const data = route.params.data
  console.log('data from prev screen', data.user.id)

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: width / 2 - 300,
      duration: 400,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateX2, {
      toValue: width / 2 - 140,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleValue, {
            toValue: 0.3,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true
          }),
          Animated.timing(colorValue, {
            toValue: 1,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: false
          })
        ]),
        Animated.parallel([
          Animated.timing(scaleValue, {
            toValue: 1.0,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true
          }),
          Animated.timing(colorValue, {
            toValue: 0,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: false
          })
        ])
      ])
    ).start();
  }, [scaleValue, colorValue]);

  useEffect(()=>{
    const getUser = async () =>{
      const data = await AsyncStorage.getItem("USER")
      if(data){
        let d = JSON.parse(data)
        setUser(d)
      }
    }
    getUser()
  },[])

  

  const createChat = async () => {
    setLoading(true);
    try {
      const userdata = await AsyncStorage.getItem("USER");
      if (userdata) {
        let d = JSON.parse(userdata);
        let body = JSON.stringify({
          userId: data.user.id
        });

        const result = await fetch(ApisPath.ApiCreateChat, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + d.token
          },
          body: body
        });

        if (result) {
          setLoading(false);
          let json = await result.json();
          console.log('json is ', json);

          if (json.status === true) {
            console.log('chat created', json.data);
            DeviceEventEmitter.emit(BroadcastEvents.EventCreateChat, json.data);
            navigation.navigate('ChatScreen', {
              data: {
                chat: json.data,
                from: 'Match'
              }
            });
          } else {
            console.log('create chat message is', json.message);
          }
        }
      }
    } catch (e) {
      console.log('error finding in create chat', e);
    }
  };

  
  const interpolatedColor = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E6E6E650', '#6050DC']
  });

  return (
    <SafeAreaView>
      <View style={[GlobalStyles.container, { justifyContent: 'flex-start',backgroundColor:colors.transparent }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, width: width - 60 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={GlobalStyles.backBtn}>
              <Image source={require('../../assets/images/close.png')}
                style={GlobalStyles.backBtnImage}
              />
            </View>
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontFamily: customFonts.meduim }}>
            {data.user.first_name} {data.user.last_name}
          </Text>
        </View>

        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Animated.Image
            source={require('../../assets/images/heart.png')}
            style={{
              width: 484 / 430 * width,
              height: 484 / 930 * height,
              resizeMode: 'contain',
              tintColor: interpolatedColor,
              marginTop: 60
            }}
          />
        </Animated.View>

        <Animated.View style={[{ transform: [{ translateX }] },styles.box]}>
        <Image source={{uri:data.user.profile_image?data.user.profile_image:placholder}}
            style={[styles.image,{transform: [{ rotate: '-20deg' }]}]}
          />
        </Animated.View>
        <Animated.View style={[{ transform: [{ translateX: translateX2 }] },styles.box]}>
          <Image source={{uri:user&&user.user.profile_image?user.user.profile_image:placholder}}
            style={styles.image}
          />
        </Animated.View>


        <Text style={{ fontSize: 28, fontFamily: customFonts.semibold, marginTop: 25 }}>You got a match!</Text>
        <Text style={{ fontSize: 16, fontFamily: customFonts.regular, marginTop: 8, marginBottom: 40 }}>
          You both liked each other.
        </Text>
        {
          loading ? (
            <ActivityIndicator size={'large'} color={colors.blueColor} />
          ) : (
            <TouchableOpacity style={GlobalStyles.reqtengularBtn}
              onPress={createChat}
            >
              <Text style={GlobalStyles.btnText}>
                Start a message
              </Text>
            </TouchableOpacity>
          )
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 100,
    width: 100,
    borderRadius: 20,
    position: 'absolute',
    top: height * 0.25
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },image:{
    borderRadius: 100, height: 180, width: 120,resizeMode:'cover', 
    transform: [{ rotate: '20deg' }],borderWidth:3,borderColor:'white' , shadowColor: 'black', shadowOffset: {
      width: 3,
      height: 3
  }, shadowRadius: 10, shadowOpacity: 1,
  }
});

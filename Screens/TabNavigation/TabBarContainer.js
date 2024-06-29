import React, { useEffect ,useState,useRef } from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, Platform, Alert,  } from "react-native";
import { Image } from "expo-image";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { UpdateProfile } from "../../Services/ProfileServices/UpdateProfile";

import DiscoverMain from "./DiscoverMain";
import MessageMain from "./MessageMain";
import DatesMain from "./DatesMain";
import ProfileMain from "./ProfileMain";

const Tab = createBottomTabNavigator()

const { height, width } = Dimensions.get('window')

const tab1 = require('../../assets/images/tab1.png');
const tab2 = require('../../assets/images/tab2.png');
const tab3 = require('../../assets/images/tab3.png');
const tab4 = require('../../assets/images/tab4.png');

const actDicsover = require('../../assets/images/activeDiscover.png');
const dicsover = require('../../assets/images/discover.png');
const activeMessage = require('../../assets/images/activeMessage.png');
const message = require('../../assets/images/message.png');
const actDates = require('../../assets/images/activeDates.png');
const dates = require('../../assets/images/dates.png');
const actProfile = require('../../assets/images/activeProfile.png');
const profile = require('../../assets/images/profile.png');





const getBgImage = (index) => {
    if (index === 0) {
        return tab1
    } else if (index === 1) {
        return tab2
    } else if (index === 2) {
        return tab3
    } else if (index === 3) {
        return tab4
    }
}

const getMarginLeft = (index) => {
    if (index === 0) {
        return 25 / 430 * width
    } else if (index === 1) {
        return 11 / 430 * width
    }
}

const getMarginRight = (index) => {
    if (index === 2) {
        return 13 / 430 * width
    } else if (index === 3) {
        return 25 / 430 * width
    }
}
const getImage = (index, isFocused) => {
    if (index === 0) {
        if (isFocused) {
            return actDicsover
        }
        return dicsover
    } else if (index === 1) {
        if (isFocused) {
            return activeMessage
        }
        return message
    } else if (index === 2) {
        if (isFocused) {
            return actDates
        }
        return dates
    } else if (index === 3) {
        if (isFocused) {
            return actProfile
        }
        return profile
    }
}



function MyTabBar({ state, descriptors, navigation }) {
    // console.log("State of tabbar is ", state)
    return (
        <View style={{ flexDirection: 'row', backgroundColor: 'transparent', height: 90 / 930 * height }}>
            <ImageBackground
                source={getBgImage(state.index)}
                style={{ flex: 1, backgroundColor: "transparent", marginTop: -10, resizeMode: 'contain', justifyContent: 'center', flexDirection: 'row', alignItems: 'flex-end', height: 116 / 930 * height }}
            >
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };
                    return (
                        <TouchableOpacity key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}
                        >
                            <View style={{ alignItems: 'center', }}>
                                <Image source={getImage(index, isFocused)}
                                    style={{
                                        width: isFocused ? 64 : 48, marginRight: getMarginRight(index),
                                        height: isFocused ? 64 : 48, marginLeft: getMarginLeft(index)
                                        // marginBottom: isFocused ? 50 / 930 * height : 15 / 930 * height
                                    }}>
                                </Image>
                                <Text style={{
                                    color: isFocused ? '#673ab7' : '#222', marginBottom: 40 / 930 * height, marginRight: getMarginRight(index),
                                    marginTop: isFocused ? 35 / 930 * height : 0, fontSize: 12, marginLeft: getMarginLeft(index), fontWeight: '400'
                                }}>
                                    {isFocused ? label : ''}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ImageBackground>

        </View>
    );
}





export default function TabBarContainer() {


    const [expoPushToken, setExpoPushToken] = useState('');
    const [channels, setChannels] = useState([]);
    const [notification, setNotification] = useState(undefined);
    const notificationListener = useRef();
    const responseListener = useRef();
    
    useEffect(()=>{
        getNotificationPermission()
    },[])
    
    useEffect(() => {
      registerForPushNotificationsAsync().then(
        (token) => token && setExpoPushToken(token)
      );

      
    
      if (Platform.OS === 'android') {
        Notifications.getNotificationChannelsAsync().then((value) =>
          setChannels(value ?? [])
        );
      }
    
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });
    
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });
    
      return () => {
        if (notificationListener.current) {
          Notifications.removeNotificationSubscription(notificationListener.current);
        }
        if (responseListener.current) {
          Notifications.removeNotificationSubscription(responseListener.current);
        }
      };
    }, []);


  const getNotificationPermission = async () => {

    console.log('enter in function')
    registerForPushNotificationsAsync().then(
        async(token) => {
            if (token) {
                setExpoPushToken(token)
            }
            console.log('token', token)
            // Alert.alert("fcm token is ",token )
            let body = JSON.stringify({
                fcm_token: token
            })
            try {
                await UpdateProfile(body);
            } catch (error) {
                console.error('Error updating profile:', error);
                setError('Failed to update profile.');
            }
        }
    );
}
    
    
    
    
    async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here', test: { test1: 'more data' } },
      },
      trigger: { seconds: 2 },
    });
    }
    
    async function registerForPushNotificationsAsync() {
    let token;
    
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      // EAS projectId is used here.
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error('Project ID not found');
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(token);
      } catch (e) {
        token = `${e}`;
      }
    } else {
    //   alert('Must use physical device for Push Notifications');
    }
    
    return token;
    }
    
    
    


    return (

        <Tab.Navigator initialRouteName="DiscoverMain"
            screenOptions={{
                headerShown: false
            }}
            
            tabBar={props =>
                <MyTabBar {...props} />} >
            <Tab.Screen name="Discover" component={DiscoverMain}
                options={{
                   
                    tabBarShowLabel: true,
                    tabBarIcon: ({ focused }) =>
                        <Image source={require('../../assets/images/activeDiscover.png')}
                            style={styles.image}
                        />

                }}
            />
            <Tab.Screen name="Messages" component={MessageMain}
                options={{
                    tabBarShowLabel: true,
                    tabBarIcon: ({ focused }) =>
                        <Image source={require('../../assets/images/activeDiscover.png')}
                            style={styles.image}
                        />

                }}
            />

            <Tab.Screen name="Dates" component={DatesMain}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        <Image source={require('../../assets/images/activeDiscover.png')}
                            style={styles.image}
                        />

                }}
            />
            <Tab.Screen name="Profile" component={ProfileMain}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        <Image source={require('../../assets/images/activeDiscover.png')}
                            style={styles.image}
                        />

                }}
            />
        </Tab.Navigator>
        // </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 50,
        width: 50,

    }
})
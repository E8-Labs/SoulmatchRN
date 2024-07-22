import React, { useEffect ,useState,useRef } from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, Platform,  } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import Dashboard from "../Dashboard";
import User from "../User";
import Dates from "../Dates";
import Profile from "../Profile";
import { Image } from "expo-image";

import { UpdateProfile } from "../../../../Services/ProfileServices/UpdateProfile";

//code of screens used

// import DiscoverMain from "./DiscoverMain";
// import MessageMain from "./MessageMain";
// import DatesMain from "./DatesMain";
// import ProfileMain from "./ProfileMain";

const Tab = createBottomTabNavigator()

const { height, width } = Dimensions.get('window')

const tab1 = require('../../../../assets/Images3/tab1.png');
const tab2 = require('../../../../assets/Images3/tab2.png');
const tab3 = require('../../../../assets/Images3/tab3.png');
const tab4 = require('../../../../assets/Images3/tab4.png');

const astDashboard = require('../../../../assets/Images3/actDashboard.png');
const dashboard = require('../../../../assets/Images3/dashboard.png');
const actUsers = require('../../../../assets/Images3/actUsers.png');
const users = require('../../../../assets/Images3/users.png');
const actDates = require('../../../../assets/Images3/actDates.png');
const dates = require('../../../../assets/Images3/dates.png');
const actProfile = require('../../../../assets/Images3/actProfile.png');
const profile = require('../../../../assets/Images3/profile.png');





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
            return astDashboard
        }
        return dashboard
    } else if (index === 1) {
        if (isFocused) {
            return actUsers
        }
        return users
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
                                ? options.title : route.name;

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
                            style={{backgroundColor: 'transparent', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}
                        >
                            <View style={{ alignItems: 'center', backgroundColor: 'transparent',}}>
                                <Image source={getImage(index, isFocused)}
                                    style={{
                                        width: isFocused ? 60 : 30, marginRight: getMarginRight(index),
                                        height: isFocused ? 60 : 30, marginLeft: getMarginLeft(index),
                                        backgroundColor: 'transparent',
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





export default function AdminTabBarContainer(props) {



    const [expoPushToken, setExpoPushToken] = useState('');
    const [channels, setChannels] = useState([]);
    const [notification, setNotification] = useState(undefined);
    const notificationListener = useRef();
    const responseListener = useRef();


   
    useEffect(() => {
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            const notData = response.notification.request.content.data;
            
            console.log("notification data is", notData);
            let data = notData.notification;
            let additionalData = notData.additional;
            if (data && data.type) {
                handleNotification(data, additionalData);
            }
        });

        return () => subscription.remove();
    }, []);

    const handleNotification = (data, additionalData) => {
        switch (data.type) {
            case 'Like':
                props.navigation.navigate("LikesList");
                break;
            case 'Message':
                props.navigation.navigate("ChatScreen", {
                    data: {
                        chat: additionalData,
                        from: 'Notification', 
                    },
                    LastMessage: () => { console.log("Here") }
                });
                break;
            case 'Match':
                props.navigation.navigate("GotMatch", {
                    data: {
                        user: additionalData
                    }
                });
                break;
            case 'DateInvite':
            case 'Dislike':
            case 'NewUser':
            case 'DateInviteToAdmin':
            case 'ReportedUser':
                props.navigation.navigate("NotificationsScreen");
                break;
            default:
                console.warn('Unknown notification type');
        }
        // Clear the notification response after handling
        Notifications.dismissAllNotificationsAsync();
    };



    useEffect(() => {
        getNotificationPermission()
    }, [])

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
            async (token) => {
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
                // alert('Failed to get push token for push notification!');
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

        <Tab.Navigator initialRouteName="Dashboard"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: 'transparent',
                },
            }}
            
            tabBar={props =>
                <MyTabBar {...props} />} >
            <Tab.Screen name="Dashboard" component={Dashboard}
                options={{
                   
                    tabBarShowLabel: true,
                    tabBarIcon: ({ focused }) =>
                        <Image source={require('../../../../assets/Images3/actDashboard.png')}
                            style={styles.image}
                        />

                }}
            />
            <Tab.Screen name="Users" component={User}
                options={{
                    tabBarShowLabel: true,
                    tabBarIcon: ({ focused }) =>
                        <Image source={require('../../../../assets/Images3/actDashboard.png')}
                            style={styles.image}
                        />

                }}
            />

            <Tab.Screen name="Dates" component={Dates}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        <Image source={require('../../../../assets/Images3/actDashboard.png')}
                            style={styles.image}
                        />

                }}
            />
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        <Image source={require('../../../../assets/Images3/actDashboard.png')}
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
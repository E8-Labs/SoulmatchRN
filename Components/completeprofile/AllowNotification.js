import React, { useEffect, useState, useRef } from 'react'
import { View, Image, TouchableOpacity, Text, Dimensions, Platform, Settings } from 'react-native'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import ApisPath from '../../lib/ApisPath/ApisPath';
import GlobalStyles from '../../assets/styles/GlobalStyles';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const AllowNotification = ({ navigation }) => {

    const [expoPushToken, setExpoPushToken] = useState('');

    const updateProfile = async (token) => {
        console.log('trying to update profile', token)
        const data = Settings.get("USER")
        try {
            if (data) {
                let d = JSON.parse(data)
                let body = JSON.stringify({
                    fcm_token: token
                })
                console.log('boddy is ', body)
                // return

                const result = await fetch(ApisPath.ApiUpdateProfile, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + d.token
                    },
                    body: body
                })
                if (result) {
                    let json = await result.json()
                    if (json.status === true) {
                        console.log('updated profile data is', json.data)
                        d.user=json.data
                        Settings.set({
                            USER:JSON.stringify(d)
                        })
                        navigation.navigate("CongratulationsScreen")
                    } else {
                        console.log('json message is', json.message)
                    }
                }
            }

        } catch (error) {
            console.log('error finding in update profile', error)
        }
    }


    const getNotificationPermission = () => {

        console.log('enter in function')
        registerForPushNotificationsAsync().then(
            (token) => {
                if (token) {
                    setExpoPushToken(token)
                }
                console.log('token', token)
                updateProfile(token)
            }
        );
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
            alert('Must use physical device for Push Notifications');
        }

        return token;
    }


    const { height, width } = Dimensions.get('window')
    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: 370 / 430 * width }}>
                <View style={{ marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={GlobalStyles.backBtn}
                        onPress={() => navigation.pop()}
                    >
                        <View>
                            <Image source={require('../../assets/images/backArrow.png')} style={GlobalStyles.backBtnImage} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '500', fontSize: 24, marginLeft: 20 / 430 * width }}>
                        Complete your profile
                    </Text>
                </View>
                {/* Code for progressbar */}
                <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <Image source={require('../../assets/notification.png')}
                     style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                </View>
                <View style={{ display: 'flex', height: height * 0.76, flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View style={{ marginTop: 40 / 930 * height }}>
                        <Text style={{ fontSize: 20, fontWeight: '500' }}>
                            Allow notifications
                        </Text>
                        <View style={{ marginTop: 100 / 930 * height, display: 'flex', alignItems: 'center' }}>
                            <Image source={require('../../assets/notification.png')} style={{resizeMode:'contain', height: 160 / 930 * height, width: 160 / 430 * width, }} />
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333', marginTop: 20 / 930 * height }}>
                                Please allow us to send you
                            </Text>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333' }}>
                                notifications
                            </Text>
                        </View>
                    </View>


                    <View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    getNotificationPermission()
                                    // AllowNot()
                                    // navigation.navigate('PackagePlan');
                                    // handlePopup();
                                }}
                                style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                    Allow
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 20 / 930 * height, width: '100%', display: 'flex', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {

                                    navigation.navigate('CongratulationsScreen');
                                }}
                                style={{ height: 54 / 930 * height, width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                <Text style={{ color: '#666666', fontWeight: '500', fontSize: 18 }}>
                                    Not now
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AllowNotification

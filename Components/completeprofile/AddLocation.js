import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, TouchableWithoutFeedback, Dimensions, Modal, Settings, ActivityIndicator, Alert } from 'react-native'
import * as Location from 'expo-location';
import ApisPath from '../../lib/ApisPath/ApisPath';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import colors from '../../assets/colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';

const AddLocation = ({ navigation }) => {
    const { height, width } = Dimensions.get('window')

    //code for Modal
    const [openModal, setOpenModal] = useState(false)
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [address, setAddress] = useState(null);
    const [showIndicator, setShowIndicator] = useState(false)

    const getLocation = async () => {
        setOpenModal(false)
       
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        if (location) {
            setShowIndicator(true)

            let reverseGeocode = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });

            if (reverseGeocode.length > 0) {
                setAddress(reverseGeocode[0]);
                let userLocation = {
                    lat:location.coords.latitude,
                    lang :location.coords.longitude,
                    city:reverseGeocode[0].city,
                    state:reverseGeocode[0].region
                }
                updateProfile(userLocation)
            }
            
        }
    };

    const updateProfile = async (userLocation) => {
        console.log('trying to update profile')
        const data = await AsyncStorage.getItem("USER")
        try {
            if (data) {
                let d = JSON.parse(data)

                let body = JSON.stringify({
                    lat: userLocation.lat,
                    lang:userLocation.lang,
                    state:userLocation.state,
                    city:userLocation.city
                })
                console.log('body', body)
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
                    setShowIndicator(false)
                    let json = await result.json()
                    if (json.status === true) {
                        console.log('profile udated', json.data)
                        d.user = json.data
                                   AsyncStorage.setItem("userLocation", JSON.stringify({d}))
                        if(data.from === "Splash"){
                            navigation.replace('TabBarContainer')
                        }
                        navigation.navigate('AllowNotification')
                    } else {
                        console.log('json message is', json.message)
                    }
                }
            }
        } catch (error) {
            console.log('error finding update profile', error)
        }
    }

    let text = 'Waiting..';
    if (errorMsg) {
       Alert.alert('Allow location from settings ');
    } else if (location) {
        text = JSON.stringify(location);
    }

    const handleModalclick = () => {
        setOpenModal(true);
    }

    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: 370 / 430 * width }}>
                <View style={{ marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}>
                        <View style={GlobalStyles.backBtn}>
                            <Image source={require('../../assets/images/backArrow.png')}
                                style={GlobalStyles.backBtnImage}
                            />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '500', fontSize: 24, marginLeft: 20 / 430 * width }}>
                        Complete your profile
                    </Text>
                </View>
                {/* Code for progressbar */}
                <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <Image source={require('../../assets/location.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
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
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                </View>
                <View style={{ display: 'flex', height: height * 0.76, flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View style={{ marginTop: 40 / 930 * height }}>
                        <Text style={{ fontSize: 20, fontWeight: '500' }}>
                        Please share your location
                        </Text>
                        {/* <Text>{location.coords.latitude}</Text>
                        {address && (
                            <Text>City: {address.region}</Text>
                        )} */}
                        <View style={{ marginTop: 150 / 930 * height, display: 'flex', alignItems: 'center' }}>
                            <Image source={require('../../assets/location.png')} />
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333', marginTop: 20 / 930 * height }}>
                                You need to enable location to use
                            </Text>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333' }}>
                                SoulMatch app.
                            </Text>
                        </View>
                    </View>


                    <View>
                        <View>
                            {
                                showIndicator ? (
                                    <ActivityIndicator size={'large'} color={colors.blueColor} />
                                ) : (
                                    <TouchableOpacity
                                        onPress={getLocation}
                                        style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                            Allow location
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }

                        </View>
                        <View style={{ marginTop: 20 / 930 * height, width: '100%', display: 'flex', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={()=>{
                                    navigation.navigate("AllowNotification")
                                }}
                                style={{ height: 54 / 930 * height, width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                <Text style={{ color: '#666666', fontWeight: '500', fontSize: 18 }}>
                                    Not now, later
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Code for Modal */}
                        <Modal
                            visible={openModal}
                            transparent={true}
                            onRequestClose={() => setOpenModal(false)}>
                            <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000010' }}>
                                    <TouchableWithoutFeedback onPress={() => { }}>
                                        <View style={{ height: '48%', width: 370 / 430 * width, borderRadius: 10, backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80%', justifyContent: 'space-between' }}>
                                                <Image source={require('../../assets/locationwarning.png')} style={{ height: 160 / 930 * height, width: 160 / 430 * width, resizeMode: 'contain' }} />
                                                <View>
                                                    <Text style={{ color: '#333333', fontWeight: '500', fontSize: 16 }}>
                                                        Location Not Enabled, Please Enable
                                                    </Text>
                                                    <Text style={{ color: '#333333', fontWeight: '500', fontSize: 16 }}>
                                                        Location Sharing to Use SoulMatch
                                                    </Text>
                                                </View>
                                                <View>
                                                    <TouchableOpacity
                                                        onPress={getLocation}
                                                        style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 318 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                                            Allow location
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>

                    </View>
                </View>
            </View>
        </View>
    )
}

export default AddLocation

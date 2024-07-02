import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, Platform, Keyboard, TouchableWithoutFeedback, Dimensions, Modal, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import customFonts from '../../../assets/fonts/Fonts';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutPopup from '../../../Components/LogoutPopup';
import GlobalStyles from '../../../assets/styles/GlobalStyles';
import { Image } from 'expo-image';
import Apis from '../apis/Apis';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../ui/RangeSlider/Colors';

const Profile = ({ navigation }) => {
    const { height, width } = Dimensions.get('window')

    const [openModal, setOpenModal] = useState(false);
    //data from local storage
    const [profileData, setProfileData] = useState("");
    //data from getprofile api
    const [userProfileData, setUserProfileData] = useState('');
    const [profileImg, setProfileImg] = useState(null);
    //code for image loader
    const [imgLoading, setImgLoading] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            getprofile();
        }, [])
    )

    const handleAccountDetails = () => {
        navigation.navigate('AccountDetails', {
            user: userProfileData,
            imageUpdated: () => {
                console.log("Setting profile iamge null")
                setProfileImg(null)
            }
        })
    };

    const handleChangePassword = () => {
        navigation.navigate('ChangePassword')
    }

    const logoutUser = async () => {
        try {
            await AsyncStorage.removeItem("USER")
            await AsyncStorage.removeItem("UserAnswers")
            console.log('logout successfully')
            navigation.navigate("LoginUser")
        } catch (e) {
            console.log('finding error in logout user', e)
        }
        finally {
            setOpenModal(false)
        }
    }

    //code for calling getprofile api
    const getprofile = async () => {
        console.log("Getting profile data")
        try {
            // const AuthToken = profileData.token;
            let profileResult = await AsyncStorage.getItem("USER");
            const data = JSON.parse(profileResult);
            console.log('Auth token for admmin profile is :', data.token);
            setUserProfileData(data.user)
            setProfileImg(data.user.profile_image)
        } catch (error) {
            console.error('Error occured is :', error);
        }
    }



    return (
        <View style={{ display: 'flex', alignItems: 'center', height: height }}>
            {/*change if the screen is irResponsive height: height s*/}
            <View style={{ width: width - 50 }}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#FFFFFF"
                    translucent={false}
                />
                <View style={{ height: height * 0.9, marginTop: 60 }}>
                    <Text style={{ fontWeight: '500', fontSize: 24, fontFamily: customFonts.medium }}>
                        Profile
                    </Text>
                    <View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={profileImg ? { uri: userProfileData.profile_image } : require('../../../assets/Images3/imagePlaceholder.webp')}
                                onLoadStart={() => {
                                    setImgLoading(true);
                                }}
                                onLoadEnd={() => {
                                    setImgLoading(false);
                                }}
                                style={{
                                    width: 148 / 430 * width, height: 148 / 930 * height, resizeMode: 'cover',
                                    marginTop: 50 / 930 * height, borderRadius: 100
                                }} />

                            {
                                imgLoading ?
                                    <View style={{ marginTop: -80 / 930 * height, height: 100 / 930 * height, }}>
                                        <ActivityIndicator size={'small'} color={colors.blueColor} style={{}} />
                                    </View> : null
                            }

                        </View>
                    </View>

                    <TouchableOpacity onPress={handleAccountDetails} style={{ marginTop: 30 }}>
                        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, padding: 14, borderRadius: 8, borderColor: '#E6E6E6' }}>
                            <View style={{ flexDirection: 'row', gap: 20 }}>
                                <Image source={require('../../../assets/Images3/men.png')} style={{ height: 24, width: 24, resizeMode: 'contain' }} />
                                <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.medium, color: '#333333' }}>
                                    Account details
                                </Text>
                            </View>
                            <Image source={require('../../../assets/Images3/forwardIcon.png')} style={{ height: 18, width: 9, resizeMode: 'contain' }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleChangePassword} style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, padding: 14, borderRadius: 8, borderColor: '#E6E6E6' }}>
                            <View style={{ flexDirection: 'row', gap: 20 }}>
                                <Image source={require('../../../assets/Images3/lock.png')} style={{ height: 24, width: 24, resizeMode: 'contain' }} />
                                <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.medium, color: '#333333' }}>
                                    Change password
                                </Text>
                            </View>
                            <Image source={require('../../../assets/Images3/forwardIcon.png')} style={{ height: 18, width: 9, resizeMode: 'contain' }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ position: 'absolute', bottom: 120 }}
                        onPress={() => setOpenModal(true)}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', borderWidth: 1, padding: 14, borderRadius: 8, borderColor: '#E01F1F50' }}>
                            <View style={{ flexDirection: 'row', gap: 20, width: '100%' }}>
                                <Image source={require('../../../assets/Images3/logout.png')} style={{ height: 24, width: 24, resizeMode: 'contain' }} />
                                <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.medium, color: '#E01F1F' }}>
                                    Logout
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <Modal
                        visible={openModal}
                        transparent={true}
                        animationType='slide'
                    // onRequestClose={() => setOpenModal(false)}
                    >
                        <View style={{
                            height: height, alignItems: 'center', backgroundColor: '#00000050', justifyContent: 'flex-end', width: width
                        }}>
                            <View style={{
                                height: height * 0.33, backgroundColor: 'white', alignItems: 'center', width: width, borderRadius: 20, alignItems: 'center',
                                paddingTop: 20
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 60 }}>
                                    <Text style={{ fontSize: 20 }}>Logout</Text>
                                    <TouchableOpacity onPress={() => setOpenModal(false)}>
                                        <Image source={require('../../../assets/images/close.png')}
                                            style={{ height: 24, width: 24 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={GlobalStyles.divider}></View>

                                <Text style={{ marginTop: 40 / 930 * height, fontSize: 20 }}>Are you sure you want to logout?</Text>

                                <View style={{
                                    width: width - 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                                    marginTop: 50
                                }}>
                                    <TouchableOpacity style={{
                                        height: 48 / 930 * height, width: 173 / 430 * width, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
                                        borderWidth: 2,
                                    }}
                                        onPress={() => setOpenModal(false)}
                                    >
                                        <Text style={{
                                            fontSize: 16,
                                        }}> Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={logoutUser}

                                        style={{
                                            height: 48 / 930 * height, width: 173 / 430 * width, backgroundColor: 'red', borderRadius: 10, alignItems: 'center', justifyContent: 'center'
                                        }}
                                    >
                                        <Text style={{
                                            fontSize: 16, color: '#f8edda'
                                        }}> Yes, logout</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </View>
                    </Modal>
                </View>
            </View>
        </View>
    )
}

export default Profile

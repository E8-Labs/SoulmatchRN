import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, Platform, Keyboard, TouchableWithoutFeedback, Dimensions, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import customFonts from '../../../assets/fonts/Fonts';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutPopup from '../../../Components/LogoutPopup';
import GlobalStyles from '../../../assets/styles/GlobalStyles';
import { Image } from 'expo-image';

const Profile = ({ navigation }) => {
    const { height, width } = Dimensions.get('window')

    const [image, setImage] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const ImageUrl = result.assets[0].uri;
            console.log('Image url recieved is', ImageUrl)
            setImage(ImageUrl)
            console.log(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    }

    const handleAccountDetails = () => {
        navigation.navigate('AdminAccountDetails')
    }

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
                        {image ?
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={{ uri: image }} style={{ width: 148 / 430 * width, height: 148 / 930 * height, resizeMode: 'cover', marginTop: 50 / 930 * height, borderRadius: 100 }} />
                                <Text style={{ fontWeight: '500', fontSize: 18, fontFamily: customFonts.medium, marginTop: 20 }}>
                                    Username
                                </Text>
                            </View> :
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                <TouchableOpacity onPress={pickImage}>
                                    <Image source={require('../../../assets/Images3/uploadImage.png')}
                                        style={{ height: 148 / 930 * height, width: 148 / 430 * width, resizeMode: 'contain' }}
                                    />
                                </TouchableOpacity>
                            </View>
                        }
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

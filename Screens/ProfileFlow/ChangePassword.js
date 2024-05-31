import {
    View, Text, TouchableOpacity, Dimensions, StyleSheet, Settings, TextInput, Keyboard, TouchableWithoutFeedback, ActivityIndicator

} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Image } from 'expo-image';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import colors from '../../assets/colors/Colors';
import customFonts from '../../assets/fonts/Fonts';
import ApisPath from '../../lib/ApisPath/ApisPath';

export default function ChangePassword({navigation,route}) {
    const { height, width } = Dimensions.get('window')
    const eye = require('../../assets/images/eye.png')
    const eyeslash = require('../../assets/images/eye-slash.png')
    
    const [currentPass, setCurrentPass] = useState(null);
    const [newPass, setNewPass] = useState(null);
    const [confirmPass, setConfirmPass] = useState(null);
    const [error, setError] = useState(null);
    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const [showPassword3, setShowPassword3] = useState(false)


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ height: height, width: width, alignItems: 'center', }}>
                <View style={{ width: width - 60, marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
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
                        Change Password
                    </Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', }}>

                    <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 20, fontFamily: customFonts.meduim }}>Current password</Text>

                    <View style={[GlobalStyles.textInput,
                    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                        <TextInput
                            autoCapitalize='none'
                            autoCorrect={false} spellCheck={false}
                            placeholder='Enter Password'
                           
                            style={{ width: 300 / 430 * width, }}
                            secureTextEntry={!showPassword1}
                            onChangeText={(text) => {
                                setCurrentPass(text)
                                setError("")
                            }}
                        />

                        <TouchableOpacity onPress={() => {
                            setShowPassword1(!showPassword1)
                        }}>
                            <Image source={showPassword1 ? eye : eyeslash}
                                style={{ height: 24 / 930 * height, width: 24 / 930 * height }}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 20, fontFamily: customFonts.meduim }}>New password</Text>

                    <View style={[GlobalStyles.textInput,
                    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                        <TextInput
                            autoCapitalize='none'
                            autoCorrect={false} spellCheck={false}
                            placeholder='Enter Password'
                           
                            style={{ width: 300 / 430 * width, }}
                            secureTextEntry={!showPassword2}
                            onChangeText={(text) => {
                                setNewPass(text)
                                setError("")
                            }}
                        />

                        <TouchableOpacity onPress={() => {
                            setShowPassword2(!showPassword2)
                        }}>
                            <Image source={showPassword2 ? eye : eyeslash}
                                style={{ height: 24 / 930 * height, width: 24 / 930 * height }}
                            />
                        </TouchableOpacity>
                    </View>



                    <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 20, fontFamily: customFonts.meduim }}>Confirm new password</Text>

                    <View style={[GlobalStyles.textInput,
                    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                        <TextInput
                            autoCapitalize='none'
                            autoCorrect={false} spellCheck={false}
                            placeholder='Enter Password'
                           
                            style={{ width: 300 / 430 * width, }}
                            secureTextEntry={!showPassword3}
                            onChangeText={(text) => {
                                setConfirmPass(text)
                                setError("")
                            }}
                        />

                        <TouchableOpacity onPress={() => {
                            setShowPassword3(!showPassword3)
                        }}>
                            <Image source={showPassword3 ? eye : eyeslash}
                                style={{ height: 24 / 930 * height, width: 24 / 930 * height }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* 
                {
                    showIndicator ? ( */}
                {/* <ActivityIndicator size={'large'} color={colors.blueColor} style={{ marginTop: 50 / 930 * height }} /> */}
                {/* ) : ( */}
                <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { marginTop: 30 }]}
                    // onPress={updateProfile}
                >
                    <Text style={GlobalStyles.btnText}>Save</Text>
                </TouchableOpacity>
                {/* )
                } */}
            </View>
        </TouchableWithoutFeedback>
    )
}
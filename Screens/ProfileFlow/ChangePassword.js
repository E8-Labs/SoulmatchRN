import {
    View, Text, TouchableOpacity, Dimensions, StyleSheet, Alert, TextInput, Keyboard, TouchableWithoutFeedback, ActivityIndicator

} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Image } from 'expo-image';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import colors from '../../assets/colors/Colors';
import customFonts from '../../assets/fonts/Fonts';
import ApisPath from '../../lib/ApisPath/ApisPath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShowMessage } from '../../Services/Snakbar/ShowMessage';

export default function ChangePassword({ navigation, route }) {
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
    const [loading, setLoading] = useState(false)


    const changePassword = async () => {
        if (!currentPass || !newPass || !confirmPass) {
            setError("Enter all cridentials")
            return
        }
        if (confirmPass !== newPass) {
            setError("Password must be same")
            return
        }
        try {
            setLoading(true)
            const data = await AsyncStorage.getItem("USER")

            if (data) {
                let d = JSON.parse(data)
                let body = JSON.stringify({
                    oldPassword: currentPass,
                    newPassword: newPass
                })

                const result = await fetch(ApisPath.ApiChangePassword, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + d.token
                    },
                    body: body
                })
                if (result) {
                    setLoading(false)
                    let json = await result.json()
                    if (json.status === true) {
                        console.log('password changed ')
                        ShowMessage("Password changed",colors.blueColor)
                        navigation.goBack()
                       
                    } else {
                        setError(json.message)
                        console.log('json message is ', json.message)
                    }
                }
            }
        } catch (e) {
            console.log('error fnding in change password ', e)
        }

    }


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
                {
                    error && <Text style={[GlobalStyles.errorText, { marginTop: 20, textAlign: 'flex-start', width: width - 60 }]}>{error}</Text>
                }

                {
                    loading ? (
                        <ActivityIndicator size={'large'} color={colors.blueColor} style={{ marginTop: 50 / 930 * height }} />
                    ) : (
                        <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { marginTop: 50 / 930 * height }]}
                            onPress={changePassword}
                        >
                            <Text style={GlobalStyles.btnText}>Save</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        </TouchableWithoutFeedback>
    )
}
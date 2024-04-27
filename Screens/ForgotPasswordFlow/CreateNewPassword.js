import React, { useState } from 'react'
import { View, Text, Dimensions, TextInput, TouchableOpacity, Image, SafeAreaView, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import colors from '../../assets/colors/Colors';
import customFonts from '../../assets/fonts/Fonts';

const { height, width } = Dimensions.get("window");

const selectedImage = require('../../assets/images/selected.png')
const unselectedImage = require('../../assets/images/unSelected.png')
const eye = require('../../assets/images/eye.png')
const eyeslash = require('../../assets/images/eye-slash.png')

export default function CreateNewPassword(props) {

    const [password1, setPassword1] = useState("")
    const [passwordFocused1, setPasswordFocused1] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordFocused, setPasswordFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword1, setShowPassword1] = useState(false)
    const [error, setError] = useState("")

    const resetPassword = () => {
        if (password && password1) {

            if (password === password1) {
                props.navigation.navigate("SuccessfullyPasswordChanged")
            } else {
                setError("Password must be same")
            }
        } else {
            setError("Enter all cridentials")
        }
    }

    const getBorderColor = () => {
        if (error) {
            return "red"
        }
        if (passwordFocused) {
            return colors.blueColor

        } else
            return colors.greyText
    }

    const getBtnColor = () => {
        if (password1 && password) {
            return colors.blueColor
        } else {
            return colors.lightColor
        }
    }
    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, flexDirection: 'column', }}>
                <TouchableWithoutFeedback style={GlobalStyles.container} onPress={Keyboard.dismiss}>
                    <View style={[GlobalStyles.container, { justifyContent: 'flex-start' }]}>
                        <View style={{ width: width - 40, marginTop: 50, alignSelf: 'center' }}>
                            <TouchableOpacity  style = {{alignSelf:'flex-start'}} onPress={() => props.navigation.goBack()}>
                                <View style={GlobalStyles.backBtn}>
                                    <Image source={require('../../assets/images/backArrow.png')}
                                        style={GlobalStyles.backBtnImage}
                                    />
                                </View>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 28, fontWeight: '700', marginTop: 30, fontFamily: customFonts.semibold }}>
                                Create new password
                            </Text>

                            <Text style={[GlobalStyles.splashMeduimText, { marginTop: 10 }]}>
                                Your new password must be different from previous used passwords.
                            </Text>

                            <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 20, fontFamily: customFonts.meduim }}>Password</Text>

                            <View style={[GlobalStyles.textInput,
                            { borderColor: passwordFocused1 ? colors.blueColor : colors.greyText, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                                <TextInput
                                    placeholder='Enter Password'
                                    onFocus={() => {
                                        setPasswordFocused1(true)
                                        setPasswordFocused(false)
                                    }}
                                    style={{}}
                                    secureTextEntry={!showPassword1}
                                    onChangeText={(text) => {
                                        setPassword1(text)
                                        setError(false)
                                    }}
                                />

                                <TouchableOpacity
                                 onPress={() => {
                                    setShowPassword1(!showPassword1)
                                }}>
                                    <Image source={showPassword1 ? eye : eyeslash}
                                        style={{ height: 24 / 930 * height, width: 24 / 930 * height }}
                                    />
                                </TouchableOpacity>
                            </View>

                            <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 20, fontFamily: customFonts.meduim }}>Confirm Password</Text>

                            <View style={[GlobalStyles.textInput,
                            { borderColor: getBorderColor(), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                                <TextInput
                                    placeholder='Confirm Password'
                                    onFocus={() => {
                                        setPasswordFocused(true)
                                        setPasswordFocused1(false)
                                    }}
                                    style={{}}
                                    secureTextEntry={!showPassword}
                                    onChangeText={(text) => {
                                        setPassword(text)
                                        setError(false)
                                    }}
                                />

                                <TouchableOpacity onPress={() => {
                                    setShowPassword(!showPassword)
                                }}>
                                    <Image source={showPassword ? eye : eyeslash}
                                        style={{ height: 24 / 930 * height, width: 24 / 930 * height }}
                                    />
                                </TouchableOpacity>
                            </View>


                            <Text style={GlobalStyles.errorText}>{error}</Text>
                            <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { marginTop: 50 / 924 * height, backgroundColor: getBtnColor() }]}
                                onPress={resetPassword}
                            >
                                <Text style={GlobalStyles.btnText}>
                                    Reset Password
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

import React, { useState } from 'react'
import { View, Text, Dimensions, TextInput, TouchableOpacity, Image, SafeAreaView, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Settings, ActivityIndicator } from 'react-native'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import colors from '../../assets/colors/Colors';
import customFonts from '../../assets/fonts/Fonts';
import ApisPath from '../../lib/ApisPath/ApisPath'
import AddLocation from '../../Components/completeprofile/AddLocation';
import TabBarContainer from '../TabNavigation/TabBarContainer';

const { height, width } = Dimensions.get("window");

const selectedImage = require('../../assets/images/selected.png')
const unselectedImage = require('../../assets/images/unSelected.png')
const eye = require('../../assets/images/eye.png')
const eyeslash = require('../../assets/images/eye-slash.png')

export default function LoginUser(props) {

    const [selected, setSelected] = useState(false)
    const [email, setEmail] = useState("")
    const [emailFocused, setEmailFocused] = useState(false)
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [passwordFocused, setPasswordFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [indicator, setIndicator] = useState(false)

    const getBtnColor = () => {
        if (email && password) {
            return colors.blueColor
        } else {
            return colors.lightColor
        }
    }

    const loginUser = async () => {


        if (email && password) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const validEmail = emailRegex.test(email);

            if (!validEmail) {
                setError("Enter valid email")
            } else {
                setIndicator(true)
                // call login api
                try {
                    console.log('tryig login user')

                    let body = JSON.stringify({
                        email: email, password: password
                    })

                    const result = await fetch(ApisPath.ApiLoginUser, {
                        method: 'post',
                        headers: { "Content-Type": "application/json" },
                        body: body
                    })
                    if (result) {
                        setIndicator(false)
                        let json = await result.json();
                        if (json.status === true) {
                            console.log('User logged in ', json.data)
                            Settings.set({ USER: JSON.stringify(json.data) })

                            // check profile complition
                            let data = json.data.user

                            if (data.profile_completion === 1) {
                                console.log('profile_completion_comment', data.profile_completion_comment)
                                props.navigation.navigate('UploadIntroVideo')
                            }
                            else if (data.profile_completion === 2) {
                                console.log('profile_completion_comment', data.profile_completion_comment)
                                props.navigation.navigate('UploadMedia')
                            }
                            else if (data.profile_completion === 3) {

                                //here user will add zodiac,age,height,school,job and interest

                                console.log('profile_completion_comment', data.profile_completion_comment)
                                props.navigation.navigate('AddZodiac')

                            } else if (data.profile_completion === 10) {

                                // if last condition runs then profile complition comment will 11

                                console.log('profile_completion_comment', data.profile_completion_comment)
                                props.navigation.navigate("AddLocation")
                            }

                            else if (data.profile_completion === 11) {

                                // if last condition runs then profile complition comment will 11

                                console.log('profile_completion_comment', data.profile_completion_comment)
                                props.navigation.navigate("TabBarContainer")
                            }



                            console.log('profile_completion_comment 2', data.profile_completion_comment)
                            // props.navigation.navigate('TabBarContainer')
                        } else {
                            console.log('json mesasage', json.message)
                            setError(json.message)
                        }
                    }
                } catch (error) {
                    console.log('error finding', error)
                }
            }

        } else {
            setError("Enter all cridentials")
        }
    }
    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, flexDirection: 'column', }}>
                <TouchableWithoutFeedback style={GlobalStyles.container} onPress={Keyboard.dismiss}>
                    <View style={[{ flexDirection: 'column', height: height,marginTop:20/930*height }]}>
                        <View style={{ justifyContent: 'space-between', height: height * 0.8, }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                                <View style={{ width: width - 40, marginTop: 0, alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 28, fontFamily: customFonts.semibold }}>
                                        Welcome back!
                                    </Text>

                                    <Text style={[GlobalStyles.splashMeduimText, { marginTop: 5 }]}>
                                        Please enter your details to sign in.
                                    </Text>

                                    <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 20, fontFamily: customFonts.meduim }}>Email</Text>

                                    <TextInput
                                        autoCapitalize='none'
                                        autoCorrect={false} spellCheck={false}
                                        placeholder='Enter Email'
                                        onFocus={() => {
                                            setEmailFocused(true)
                                            setPasswordFocused(false)
                                        }}
                                        onChangeText={(text) => {
                                            setEmail(text)
                                            setError("")
                                        }}
                                        style={[GlobalStyles.textInput, { borderColor: emailFocused ? colors.blueColor : colors.greyText }]}

                                    />

                                    <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 20, fontFamily: customFonts.meduim }}>Password</Text>

                                    <View style={[GlobalStyles.textInput,
                                    { borderColor: passwordFocused ? colors.blueColor : colors.greyText, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                                        <TextInput
                                            autoCapitalize='none'
                                            autoCorrect={false} spellCheck={false}
                                            placeholder='Enter Password'
                                            onFocus={() => {
                                                setPasswordFocused(true)
                                                setEmailFocused(false)
                                            }}
                                            style={{ width: 300 / 430 * width, }}
                                            secureTextEntry={!showPassword}
                                            onChangeText={(text) => {
                                                setPassword(text)
                                                setError("")
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

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setSelected(!selected)
                                                }}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Image source={selected ? selectedImage : unselectedImage}
                                                        style={{ height: 20, width: 20, resizeMode: 'contain' }}
                                                    />
                                                    <Text style={[GlobalStyles.splashMeduimText, { paddingLeft: 10 }]}>Remember me</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => props.navigation.navigate("GetEmail")}
                                        >
                                            <Text style={{ fontSize: 14, fontWeight: '500', color: colors.blueColor, fontFamily: customFonts.meduim }}>
                                                Forgot password?
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    {
                                        indicator ? (
                                            <ActivityIndicator size={"large"} style={{ marginTop: 30 / 930 * height }} color={colors.blueColor} />
                                        ) : (
                                            <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { marginTop: 30 / 924 * height, backgroundColor: getBtnColor() }]}
                                                onPress={loginUser}
                                            >
                                                <Text style={GlobalStyles.btnText}>
                                                    Sign in
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    }



                                </View>
                                <View style={{ alignItems: 'center', flexDirection: 'row', gap: 5, marginTop: 35 / 924 * height }}>
                                    <Text style={GlobalStyles.splashMeduimText}>Don't have an account?</Text>
                                    <TouchableOpacity style={{}}
                                        onPress={() => props.navigation.navigate("UploadImage")}
                                    >
                                        <Text style={{ color: colors.blueColor, fontSize: 14, fontWeight: '500', fontFamily: customFonts.meduim }}>
                                            Sign up
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 45, marginTop: 30 / 930 * height, }}>
                                    <Image source={require('../../assets/images/Line.png')}
                                        style={{ height: 1, width: 170 / 430 * width, }}
                                    />
                                    <Text style={{ color: colors.greyLightText, fontSize: 14, fontWeight: '400', fontFamily: customFonts.meduim }}>or</Text>
                                    <Image source={require('../../assets/images/Line.png')}
                                        style={{ height: 1, width: 170 / 430 * width, }}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18 / 430 * width, marginTop: 50 / 924 * height }}>
                                    <TouchableOpacity>

                                        <View style={{ borderWidth: 1, borderRadius: 10, borderColor: colors.greyText, padding: 18 }}>
                                            <Image source={require('../../assets/images/google.png')}
                                                style={{ height: 25 / 930 * height, width: 25 / 924 * height, resizeMode: 'contain' }}
                                            />

                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity>

                                        <View style={{ borderWidth: 1, borderRadius: 10, borderColor: colors.greyText, padding: 18 }}>
                                            <Image source={require('../../assets/images/facebook.png')}
                                                style={{ height: 26 / 930 * height, width: 26 / 924 * height, }}
                                            />
                                        </View>

                                    </TouchableOpacity>
                                    <TouchableOpacity>

                                        <View style={{ borderWidth: 1, borderRadius: 10, borderColor: colors.greyText, padding: 18 }}>
                                            <Image source={require('../../assets/images/apple.png')}
                                                style={{ height: 28 / 930 * height, width: 25 / 924 * height, resizeMode: 'contain' }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', width: width }}>
                            <View style={{ flexDirection: 'row', width: width - 45, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={[{ fontSize: 12, }]}>By signing up you agree to our </Text>
                                <TouchableOpacity>
                                    <Text style={[GlobalStyles.splashMeduimText, { fontSize: 12, color: '#000', fontWeight: '500', fontFamily: customFonts.meduim }]}>
                                        Terms
                                    </Text>
                                </TouchableOpacity>
                                <Text style={[GlobalStyles.splashMeduimText, { fontSize: 12 }]}> and </Text>
                                <TouchableOpacity>
                                    <Text style={[GlobalStyles.splashMeduimText, { fontSize: 12, color: '#000', fontWeight: '500', fontFamily: customFonts.meduim }]}>
                                        Conditions
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            <TouchableOpacity>
                                <Text style={[GlobalStyles.splashMeduimText, { fontSize: 12, color: '#000', fontWeight: '500', fontFamily: customFonts.meduim }]}>
                                    and Privacy Policy
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

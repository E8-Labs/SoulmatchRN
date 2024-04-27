import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import colors from '../../assets/colors/Colors';
import customFonts from '../../assets/fonts/Fonts';


const { height, width } = Dimensions.get("window");

const eye = require('../../assets/images/eye.png')
const eyeslash = require('../../assets/images/eye-slash.png')

export default function RegisterUser(props) {

    const [email, setEmail] = useState("")
    const [emailFocused, setEmailFocused] = useState(false)
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [passwordFocused, setPasswordFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const registerUser = () => {
        if (email && password) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const validEmail = emailRegex.test(email);

            if (!validEmail) {
                setError("Enter valid email")
            } else {


                // call regiser api
            }
        } else {
            setError("Enter all cridentials")
        }
    }
    const getBtnColor = () => {
        if (email && password) {
            return colors.blueColor
        } else {
            return colors.lightColor
        }
    }
    return (
        <SafeAreaView>
            <View style={[GlobalStyles.container, { justifyContent: 'flex-start' }]}>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 3 }}>
                    <View style={{ width: width - 45, marginTop: 50, alignSelf: 'center' }}>
                        <Text style={{ fontSize: 28,fontFamily: "PoppinsBold"}}>
                            Create an account
                        </Text>

                        <Text style={[GlobalStyles.splashMeduimText, { marginTop: 10 }]}>
                            Please enter your details to continue
                        </Text>

                        <Text style={{ fontSize: 12, fontWeight: '500', marginTop: 20 }}>Email</Text>

                        <TextInput
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

                        <Text style={{ fontSize: 12, fontWeight: '500', marginTop: 20 }}>Password</Text>
                        <View style={[GlobalStyles.textInput,
                        { borderColor: passwordFocused ? colors.blueColor : colors.greyText, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                            <TextInput
                                placeholder='Enter Password'
                                onFocus={() => {
                                    setPasswordFocused(true)
                                    setEmailFocused(false)
                                }}
                                style={{}}
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

                        <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { marginTop: 50 / 924 * height, backgroundColor: getBtnColor() }]}
                            onPress={registerUser}
                        >
                            <Text style={GlobalStyles.btnText}>
                                Sign up
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'row', gap: 5, marginTop: 35 / 924 * height }}>
                        <Text style={GlobalStyles.splashMeduimText}>Already have an account?</Text>
                        <TouchableOpacity style={{}}
                            onPress={() => {
                                props.navigation.navigate("LoginUser")
                            }}
                        >
                            <Text style={{ color: colors.blueColor, fontSize: 14, fontWeight: '500', }}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 45, marginTop: 50 / 930 * height, }}>
                        <Image source={require('../../assets/images/Line.png')}
                            style={{ height: 1, width: 170 / 430 * width, }}
                        />
                        <Text style={{ color: colors.greyText, fontSize: 14, fontWeight: '400' }}>or</Text>
                        <Image source={require('../../assets/images/Line.png')}
                            style={{ height: 1, width: 170 / 430 * width, }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18 / 430 * width, marginTop: 40 / 924 * height }}>
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
                <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', width: width - 45, alignSelf: 'center' }}>
                        <Text style={[GlobalStyles.splashMeduimText, { fontSize: 12 }]}>By signing up you agree to our </Text>
                        <TouchableOpacity>
                            <Text style={[GlobalStyles.splashMeduimText, { fontSize: 12, color: '#000', fontWeight: '500' }]}>
                                Terms
                            </Text>
                        </TouchableOpacity>
                        <Text style={[GlobalStyles.splashMeduimText, { fontSize: 12 }]}> and </Text>
                        <TouchableOpacity>
                            <Text style={[GlobalStyles.splashMeduimText, { fontSize: 12, color: '#000', fontWeight: '500' }]}>
                                Conditions
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity>
                        <Text style={[GlobalStyles.splashMeduimText, { fontSize: 12, color: '#000', fontWeight: '500' }]}>
                            and Privacy Policy
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
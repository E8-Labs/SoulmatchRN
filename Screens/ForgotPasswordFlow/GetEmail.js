import React, { useState } from 'react';
import { View, Text, Dimensions, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform, Settings, ActivityIndicator } from 'react-native'
import GlobalStyles from '../../assets/styles/GlobalStyles';
import colors from '../../assets/colors/Colors';
import { Image } from 'expo-image';
import customFonts from '../../assets/fonts/Fonts';
import ApisPath from '../../lib/ApisPath/ApisPath';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { height, width } = Dimensions.get("window");

export default function GetEmail(props) {


    const [emailFocused, setEmailFocused] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [showIndicator, setShowIndicator] = useState(false);

    const getBtnColor = () => {
        if (email) {
            return colors.blueColor
        } else {
            return colors.lightColor
        }
    }
    const sendCond = async () => {
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const validEmail = emailRegex.test(email);

            if (!validEmail) {
                setError("Enter valid email")
            } else {
                setShowIndicator(true)
                try {
                    console.log('sending reset code')
                    
                        let body = JSON.stringify({ email: email })

                        const result = await fetch(ApisPath.ApiSendResetCode, {
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: body
                        })

                        if (result) {
                            setShowIndicator(false)
                            let json = await result.json();
                            if (json.status === true) {
                                console.log('code sent successfuly')
                                props.navigation.navigate("EmailVerification",{
                                    email:email
                                })
                            } else {
                                setError(json.message)
                                console.log('code sent message', json.message)
                            }
                        }
                    // }

                } catch (error) {
                    console.log('error finding in sending reset code', error)
                }

                // props.navigation.navigate("EmailVerification", {
                //     email: email
                // })
                // call login api
            }
        } else {
            setError("Enter Email")
        }
    }

    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, flexDirection: 'column', }}>
                <TouchableWithoutFeedback style={GlobalStyles.container} onPress={Keyboard.dismiss}>
                    <View style={[GlobalStyles.container, { justifyContent: 'flex-start' }]}>
                        <View style={{ width: width - 40, marginTop: 0, alignSelf: 'center' }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-start' }} onPress={() => props.navigation.goBack()}>
                                <View style={GlobalStyles.backBtn}>
                                    <Image source={require('../../assets/images/backArrow.png')}
                                        style={GlobalStyles.backBtnImage}
                                    />
                                </View>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 28, fontFamily: customFonts.semibold, marginTop: 30 }}>
                                Forgot Password
                            </Text>

                            <Text style={[GlobalStyles.splashMeduimText, { marginTop: 10 }]}>
                                Enter email address you used to register with.
                            </Text>

                            <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 20, fontFamily: customFonts.meduim }}>Email</Text>

                            <TextInput
                                placeholder='Email address'
                                autoFocus={true}
                                autoCapitalize='none'
                                autoCorrect={false} spellCheck={false}
                                onFocus={() => {
                                    setEmailFocused(true)

                                }}
                                onChangeText={(text) => {
                                    setEmail(text)
                                    setError("")
                                }}
                                style={[GlobalStyles.textInput, { borderColor: emailFocused ? colors.blueColor : colors.greyText }]}

                            />
                            <Text style={GlobalStyles.errorText}>{error}</Text>

                            {
                                showIndicator ? (
                                    <ActivityIndicator size={'large'} style={{ marginTop: 60 / 930 * height }} color={colors.blueColor} />
                                ) : (
                                    <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { marginTop: 60 / 924 * height, backgroundColor: getBtnColor() }]}
                                        onPress={sendCond}
                                    >
                                        <Text style={GlobalStyles.btnText}>
                                            Send Code
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }


                        </View>


                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

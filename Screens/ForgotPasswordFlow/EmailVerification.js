import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Dimensions, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import colors from '../../assets/colors/Colors';
import customFonts from '../../assets/fonts/Fonts';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApisPath from '../../lib/ApisPath/ApisPath';

const { height, width } = Dimensions.get("window");

export default function EmailVerification({ route, navigation }) {
    const email = route.params.email
    console.log('email from prev screen', email)


    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);


    const [input1Foucused, setinput1Foucused] = useState(false)
    const [input2Foucused, setinput2Foucused] = useState(false)
    const [input3Foucused, setinput3Foucused] = useState(false)
    const [input4Foucused, setinput4Foucused] = useState(false)

    const [input1Vlaue, setinput1Vlaue] = useState("")
    const [input2Vlaue, setinput2Vlaue] = useState("")
    const [input3Vlaue, setinput3Vlaue] = useState("")
    const [input4Vlaue, setinput4Vlaue] = useState("")
    const [error, setError] = useState(null)
    const [code, setCode] = useState(null)
    const [showIndicator, setShowIndicator] = useState(false)


    const handelInputChange = (text, ref, inputVlaue) => {
        inputVlaue(text)
        if (text.length === 1 && ref) {
            ref.current.focus()
        }
    };

    const handleBorderColor1 = (text) => {
        if (text.length === 1) {
            setinput1Foucused(true)
        } else {
            setinput1Foucused(false)
        }
    }
    const handleBorderColor2 = (text) => {
        if (text.length === 1) {
            setinput2Foucused(true)
        } else {
            setinput2Foucused(false)
        }
    }

    const handleBorderColor3 = (text) => {
        if (text.length === 1) {
            setinput3Foucused(true)
        } else {
            setinput3Foucused(false)
        }
    }

    const handleBorderColor4 = (text) => {
        if (text.length === 1) {
            setinput4Foucused(true)
        } else {
            setinput4Foucused(false)
        }
    }

    useEffect(() => {
        setCode(input1Vlaue + input2Vlaue + input3Vlaue + input4Vlaue)
    }, [input1Vlaue, input2Vlaue, input3Vlaue, input4Vlaue])


    const resendCode = async () => {
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

                } else {
                    setError(json.message)
                    console.log('code sent message', json.message)
                }
            }
            // }

        } catch (error) {
            console.log('error finding in sending reset code', error)
        }

    }

    const handleNext = () => {
        if (!code) {
            setError("Enter Code")
            return
        }
        navigation.navigate('ResetPassword', {
            user: {
                email: email,
                code: code
            }
        })
    }

    const hideEmail = (email) => {
        let splitEmail = email.split('@')
        console.log('first characters of email ', splitEmail[0])
        console.log('last characters of email ', splitEmail[1])

        let firstPart = splitEmail[0]
        let secondPart = splitEmail[1]
        let halfLenght = firstPart.length / 2

        let hiddenPart = ''
        let visiblePart = ''

        for (let i = 0; i < firstPart.length; i++) {
            if (i < halfLenght) {
                visiblePart = visiblePart + firstPart[i]
            } else {
                hiddenPart = hiddenPart + "."
            }
        }

        let hiddenEmail = visiblePart + hiddenPart + "@" + secondPart

        console.log('hidden email is', hiddenEmail)

        return hiddenEmail

    };


    const getBtnColor = () =>{
        if(input1Vlaue && input2Vlaue && input3Vlaue&& input4Vlaue ){
            return colors.blueColor
        }else{
            return colors.lightColor
        }
    }


    return (
        <SafeAreaView>
            <View style={[GlobalStyles.container, { justifyContent: 'flex-start' }]}>
                <View style={{ width: width - 50, marginTop: 20, alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'flex-start' }}>
                        <View style={GlobalStyles.backBtn}>
                            <Image source={require('../../assets/images/backArrow.png')}
                                style={GlobalStyles.backBtnImage}
                            />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 28, fontWeight: '700', marginTop: 30, fontFamily: customFonts.semibold }}>
                        Verification
                    </Text>

                    <Text style={[GlobalStyles.splashMeduimText, { marginTop: 10, width: width * 0.75 }]}>
                        Please enter the 4 digit code sent to your
                        email {hideEmail(email)}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 54 / 930 * height, justifyContent: 'space-between' }}>
                        <View style={[styles.inputStyle, { borderColor: input1Foucused ? colors.blueColor : colors.greyText }]}>
                            <TextInput placeholder=""
                                autoFocus={true}
                                style={{ fontSize: 32 }}
                                keyboardType="numeric"
                                maxLength={1}
                                onfoucus={() => setinput1Foucused(true)}
                                ref={input1Ref}
                                onChangeText={(text) => {
                                    handelInputChange(text, input2Ref, setinput1Vlaue)
                                    handleBorderColor1(text)
                                    setError(null)
                                }}
                            />
                        </View>

                        <View style={[styles.inputStyle, { borderColor: input2Foucused ? colors.blueColor : colors.greyText }]}>
                            <TextInput placeholder=""
                                style={{ fontSize: 32 }}
                                keyboardType="numeric"

                                maxLength={1}
                                // onfoucus = 
                                ref={input2Ref}
                                onChangeText={(text) => {
                                    handelInputChange(text, input3Ref, setinput2Vlaue)
                                    handleBorderColor2(text)
                                    setError(null)
                                }}
                            />
                        </View>
                        <View style={[styles.inputStyle, { borderColor: input3Foucused ? colors.blueColor : colors.greyText }]}>
                            <TextInput placeholder=""

                                style={{ fontSize: 32 }}
                                keyboardType="numeric"
                                maxLength={1}
                                // onfoucus = 
                                ref={input3Ref}
                                onChangeText={(text) => {
                                    handelInputChange(text, input4Ref, setinput3Vlaue)
                                    handleBorderColor3(text)
                                    setError(null)
                                }}
                            />
                        </View>
                        <View style={[styles.inputStyle, { borderColor: input4Foucused ? colors.blueColor : colors.greyText }]}>
                            <TextInput placeholder=""
                                style={{ fontSize: 32 }}
                                keyboardType="numeric"
                                maxLength={1}
                                // onfoucus = 
                                ref={input4Ref}
                                onChangeText={(text) => {
                                    handelInputChange(text, null, setinput4Vlaue)
                                    handleBorderColor4(text)
                                    setError(null)
                                }}
                            />
                        </View>
                    </View>
                    {
                        error && <Text style={[GlobalStyles.errorText, { marginTop: 20 }]}>{error}</Text>
                    }

                    <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { marginTop: 60 / 924 * height ,backgroundColor:getBtnColor()}]}
                        onPress={handleNext}
                    >
                        <Text style={GlobalStyles.btnText}>
                            Verify
                        </Text>
                    </TouchableOpacity>

                </View>

                <View style={{ alignItems: 'center', flexDirection: 'row', gap: 5, marginTop: 80 / 924 * height }}>
                    <Text style={GlobalStyles.splashMeduimText}>
                        {showIndicator ? "Trying to resend code" : "If you didn't receive a code? "}

                    </Text>

                    {
                        showIndicator ? (
                            <ActivityIndicator color={colors.blueColor} size={'small'} />
                        ) : (
                            <TouchableOpacity style={{}}
                                onPress={resendCode}
                            >
                                <Text style={{ color: colors.blueColor, fontSize: 14, fontWeight: '500', }}>
                                    Resend Code
                                </Text>
                            </TouchableOpacity>
                        )
                    }

                </View>


            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: '#eeeeee',
        height: 80 / 930 * height,
        width: 80 / 430 * width,
        borderWidth: 1,
        borderColor: "#e6e6e6",
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
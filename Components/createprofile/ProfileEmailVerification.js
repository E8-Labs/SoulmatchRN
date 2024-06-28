import React from 'react';
import { useRef, useState,useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Settings, ActivityIndicator } from 'react-native'
import GlobalStyles from '../../assets/styles/GlobalStyles';
import ApisPath from '../../lib/ApisPath/ApisPath';
import { err } from 'react-native-svg';
import colors from '../../assets/colors/Colors';
const ProfileEmailVerification = ({ navigation, route }) => {

    const { height, width } = Dimensions.get('window');


    const [Code1, setCode1] = useState('');
    const [Code2, setCode2] = useState('');
    const [Code3, setCode3] = useState('');
    const [Code4, setCode4] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [btnPosition, setBtnPosition] = useState(height*0.61);

    const code = Code1 + Code2 + Code3 + Code4
    console.log('code', code)
    //data getting from previous screen
    const user = route.params.user;
    user.code = code.toString()


    const ProfileEmail = user.UserEmail;
    const ProfileFirstName = user.ProfileFirstName;
    const ProfileLastName = user.ProfileLastName;
    const ProfileImage = user.ProfileImage

    // console.log('Email recieved from previous screen is', user);

    //code for checking the verification code entered by the user


    //code for entering verification code
    const inputref1 = useRef(null);
    const inputref2 = useRef(null);
    const inputref3 = useRef(null);
    const inputref4 = useRef(null);

    const handleInputRef = (text, ref) => {
        if (text.length === 1 && ref) {
            ref.current.focus();
        }
    }

    //Code for changing bordercolor
    const [input, setInput] = useState(false);
    const [input2, setInput2] = useState(false);
    const [input3, setInput3] = useState(false);
    const [input4, setInput4] = useState(false);

    const handleBordercolor1 = (text, setState, ref) => {
        setState(text);
        console.log('Value entered is', Code1)
        if (text.length === 1 && ref) {
            setInput(true);
            ref.current.focus();
        } else {
            setInput(false);
        }
    }

    const handleBordercolor2 = (text, setState, ref) => {
        setState(text);
        console.log('Value 2 stored is', Code2);
        if (text.length === 1) {
            setInput2(true);
            ref.current.focus();
        } else {
            setInput2(false);
        }
    }

    const handleBordercolor3 = (text, setState, ref) => {
        setState(text);
        if (text.length === 1) {
            setInput3(true)
            ref.current.focus();
        } else {
            setInput3(false)
        }
    }

    const handleBordercolor4 = (text, setState) => {
        setState(text);
        if (text.length === 1) {
            setInput4(true)
        } else {
            setInput4(false)
        }
    }

    //code for changing border color when input is focused

    const [focusInput1, setFocusInput1] = useState(false);
    const [focusInput2, setFocusInput2] = useState(false);
    const [focusInput3, setFocusInput3] = useState(false);
    const [focusInput4, setFocusInput4] = useState(false);

    const handlefocusInput1 = () => {
        setFocusInput1(true)
        setFocusInput2(false)
        setFocusInput3(false)
        setFocusInput4(false)
    }
    const handlefocusInput2 = () => {
        setFocusInput2(true)
        setFocusInput1(false)
        setFocusInput3(false)
        setFocusInput4(false)
    }
    const handlefocusInput3 = () => {
        setFocusInput3(true)
        setFocusInput2(false)
        setFocusInput4(false)
        setFocusInput1(false)
    }
    const handlefocusInput4 = () => {
        setFocusInput4(true)
        setFocusInput1(false)
        setFocusInput2(false)
        setFocusInput3(false)
    }

    //code to pass data to Next Screen

   

    const verifyEmail = async () => {
        if (code.length < 4) {
            setError("Enter verify code")

        } else {
            try {
                console.log('trying to verify email')
                setLoading(true)
                let body = JSON.stringify({
                    email: user.email,
                    code: code
                })
                console.log('body is', body)
                const result = await fetch(ApisPath.ApiVerifyEmail, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                })
                // console.log('result is', result)
                if (result) {
                    setLoading(false)
                    let json = await result.json()

                    if (json.status === true) {
                        navigation.navigate('CreatePassword', {
                                user: user
                            })
                        console.log('email verified ', json)
                    } else {
                        console.log('email verify message is', json.message)
                        setError(json.message)
                    }

                }
            } catch (e) {
                console.log('error finding in verify email', e)
            }
        }
    }

    
  useEffect(() => {
    // console.log("Use Effect")
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
    //   console.log("Keyboard show")
      setBtnPosition(height * 0.3);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
    //   console.log("Keyboard hide")
    setBtnPosition(height * 0.61);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
    

    return (
        <TouchableWithoutFeedback style={{ display: 'flex', alignItems: 'center', height: height }} onPress={Keyboard.dismiss} >
            <View style={{ display: 'flex', alignItems: 'center'}}>
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
                            Create Profile
                        </Text>
                    </View>
                    {/* Code for progressbar */}
                    <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                        <Image source={require('../../assets/Message2.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                        <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                        <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                        <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                        <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    </View>
                    <View style={{ marginTop: 40 / 930 * height }}>
                        <Text style={{ fontWeight: '500', fontSize: 20 }}>
                            Please verify your email
                        </Text>
                        <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333', marginTop: 30 / 930 * height }}>
                            Please enter the 4 digit code sent to your mail {user.email}
                        </Text>
                    </View>
                    {/* Code for Input Verification Code */}
                    <View style={{ display: 'flex', height:btnPosition, flexDirection: 'column', justifyContent: 'space-between' }}>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 / 930 * height }}>
                                <TextInput keyboardType='numeric'
                                    onFocus={handlefocusInput1}
                                    maxLength={1}
                                    autoFocus={true}
                                    ref={inputref1}
                                    onChangeText={(text) => {
                                        handleBordercolor1(text, setCode1, inputref2)

                                        setError(null)
                                    }
                                    }
                                    style={{
                                        width: 78 / 430 * width,
                                        height: 78 / 930 * height,
                                        borderWidth: 1,
                                        borderColor: input || focusInput1 ? '#6050Dc' : '#CCCCCC',
                                        borderRadius: 10,
                                        padding: 17,
                                        // marginBottom: 10,
                                        marginTop: 10 / 930 * height,
                                        color: '#333333',
                                        fontWeight: '500',
                                        backgroundColor: '#E6E6E680',
                                        textAlign: 'center'
                                    }} />
                                <TextInput keyboardType='numeric'
                                    maxLength={1}
                                    ref={inputref2}
                                    onFocus={handlefocusInput2}
                                    onChangeText={(text) => {
                                        handleBordercolor2(text, setCode2, inputref3)
                                        setError(null)
                                    }
                                    }
                                    style={{
                                        width: 78 / 430 * width,
                                        height: 78 / 930 * height,
                                        borderWidth: 1,
                                        borderColor: input2 || focusInput2 ? '#6050Dc' : '#CCCCCC',
                                        borderRadius: 10,
                                        padding: 17,
                                        // marginBottom: 10,
                                        marginTop: 10 / 930 * height,
                                        color: '#333333',
                                        fontWeight: '500',
                                        backgroundColor: '#E6E6E680',
                                        textAlign: 'center'
                                    }} />
                                <TextInput keyboardType='numeric'
                                    onFocus={handlefocusInput3}
                                    maxLength={1}
                                    ref={inputref3}
                                    onChangeText={(text) => {
                                        handleBordercolor3(text, setCode3, inputref4)
                                        setError(null)
                                    }
                                    }
                                    style={{
                                        width: 78 / 430 * width,
                                        height: 78 / 930 * height,
                                        borderWidth: 1,
                                        borderColor: input3 || focusInput3 ? '#6050Dc' : '#CCCCCC',
                                        borderRadius: 10,
                                        padding: 17,
                                        // marginBottom: 10,
                                        marginTop: 10 / 930 * height,
                                        color: '#333333',
                                        fontWeight: '500',
                                        backgroundColor: '#E6E6E680',
                                        textAlign: 'center'
                                    }} />
                                <TextInput keyboardType='numeric'
                                    onFocus={handlefocusInput4}
                                    maxLength={1}
                                    ref={inputref4}
                                    onChangeText={(text) => {
                                        handleBordercolor4(text, setCode4)
                                        setError(null)
                                    }
                                    }
                                    style={{
                                        width: 78 / 430 * width,
                                        height: 78 / 930 * height,
                                        borderWidth: 1,
                                        borderColor: input4 || focusInput4 ? '#6050Dc' : '#CCCCCC',
                                        borderRadius: 10,
                                        padding: 17,
                                        // marginBottom: 10,
                                        marginTop: 10 / 930 * height,
                                        color: '#333333',
                                        fontWeight: '500',
                                        backgroundColor: '#E6E6E680',
                                        textAlign: 'center'
                                    }} />
                            </View>

                            <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', marginTop: 40 / 930 * height }}>
                                <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '400', color: '#666666' }}>
                                    If you didn't recieve a code?
                                </Text>
                                <TouchableOpacity style={{ marginLeft: 5 }}>
                                    <Text style={{ color: '#0A74DA', fontWeight: '500', fontSize: 14, }}>
                                        Resend code
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'flex-start', marginTop: -50, alignItems: 'center', gap: 20 }}>
                            {
                                error && <Text style={GlobalStyles.errorText}>{error}</Text>
                            }
                            {
                                loading ? (
                                    <ActivityIndicator size={'large'} color={colors.blueColor} />
                                ) : (
                                    <TouchableOpacity onPress={verifyEmail} style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}

                                    >
                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                            Next
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }

                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ProfileEmailVerification

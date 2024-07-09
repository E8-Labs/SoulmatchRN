import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Dimensions, TextInput, Settings, ActivityIndicator,TouchableWithoutFeedback,
    Keyboard
 } from 'react-native';
import ApisPath from '../../lib/ApisPath/ApisPath';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import colors from '../../assets/colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';

const AddEmail = ({ navigation, route }) => {


    const { height, width } = Dimensions.get('window');
    const [saveemail, setSaveemail] = useState('')
    const [focusEmail, setFocusEmail] = useState(false)
    const [indicattor, setIndicator] = useState(false)
    const [emailError, setEmailError] = useState(null)
    const [emailExists, setEmailExists] = useState(false);
    const [emailNotExists, setEmailNotExists] = useState(false);
    const [btnPosition,setBtnPosition] = useState(height*0.61)
    const timerRef = useRef(null);
    //getting data from previous screen
    const user = route.params.user;
    user.email = saveemail

    console.log('Name recieved from previous screen is', user);

    useEffect(() => {
        if (saveemail) {
            // Clear the previous timer
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            // Set a new timer
            timerRef.current = setTimeout(() => {
                checkEmailExistence(saveemail);
            }, 1000);

            // Cleanup function to clear the timer when component unmounts
            return () => clearTimeout(timerRef.current);
        }
    }, [saveemail]);

    const checkEmailExistence = async () => {
        try {
            const ApiUrl = ApisPath.ApiCheckEmailExistance
            const response = await fetch(ApiUrl, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "email": saveemail })
            });
            if (response.ok) {
                let data = await response.json();
                if (data.status === true) {
                    console.log('Data recieved from api is', data.status)
                    setEmailExists(true);
                    setEmailNotExists(false);
                } else if (data.status === false) {
                    setEmailExists(false);
                    setEmailNotExists(true);
                    console.log('Email doesnot exists')
                }
            } else {
                console.warn('Api is not working')
            }
        } catch (error) {
            console.warn(error)
        }
    }

    const handleEmailfocus = () => {
        setFocusEmail(true);
        setEmailError(false)
    }

    const handlesaveemail = (saveEmail) => {
        setEmailError(false);
        setSaveemail(saveEmail);
        // console.log('Email stored is', saveemail);
    };

    //code for Getting email Verification code


    const handleNextClick = async () => {
        
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const validEmail = emailRegex.test(saveemail);

            if (!validEmail) {
                setEmailError("Enter valid email")
            }
        if(!saveemail){
            setEmailError("Enter email")
            return
        }
        if(emailError || emailNotExists){
            return
        }
        try {
            setIndicator(true)
            let data = await AsyncStorage.getItem("USER")
            // if (data) {
            //     let d = JSON.parse(data)
            //     console.log('user data from local ', d)

            //code for api
            const Apiurl = ApisPath.ApiSendVerificationEmail;
            // const Link = "http://13.58.134.250:8004/api/users/send_verification_email"
            // const AuthToken = d.token;
            console.log('Email for verification is', saveemail)
            const response = await fetch(Apiurl, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({ "email": saveemail })
            });
            // console.log('Btn is working')
            // console.log('Auth token is', AuthToken);
            if (response) {
                setIndicator(false)
                const Data = await response.json();
                if (Data.status === true)
                    console.log('Response is', Data);
                navigation.navigate("ProfileEmailverification", {
                    user: user
                })
            } else {
                console.log('Error:', response.status, response.statusText);
                const errorData = await response.json(); // If server returns error message in JSON
                console.log('Error Data:', errorData);
            }
        }
        // }
        catch (error) {
            setIndicator(false)
            console.log('Error is', error)
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
        <TouchableWithoutFeedback style={{
            height: height, alignItems: 'center'
        }}
            onPress={Keyboard.dismiss}
        >
        <View style={{ display: 'flex', alignItems: 'center' }}>
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
                    <Image source={require('../../assets/messagesvg.svg')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                    <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                </View>
                {/* Lower section code */}
                <Text style={{ fontWeight: '500', fontSize: 20, marginTop: 40 / 930 * height }}>
                    What's your email?
                </Text>
                <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333', marginTop: 40 / 930 * height }}>
                    Email
                </Text>
                {/*<Text>
                    {username.FirstName}
    </Text>*/}
                <View style={{ display: 'flex', height: btnPosition, flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View>
                        <View>
                            <TextInput placeholder='Enter email' keyboardType='email-address' onFocus={handleEmailfocus}
                                onChangeText={handlesaveemail}
                                value={saveemail}
                                autoCapitalize='none'
                                returnKeyType='done'
                                autoCorrect={false}
                                spellCheck={false}
                                style={{
                                    width: 370 / 430 * width,
                                    height: 52,
                                    borderWidth: 1,
                                    borderColor: focusEmail ? '#6050DC' : '#CCCCCC',
                                    borderRadius: 10,
                                    padding: 17,
                                    marginTop: 10 / 930 * height,
                                    color: '#333333',
                                    fontWeight: '500',
                                }} />
                            <View>
                                {emailError ? <View>
                                    <Text style={{ color: '#E01F1F', fontSize: 14, fontWeight: '500', marginTop: 5 / 930 * height }}>
                                       {emailError}
                                    </Text>
                                </View> : ''}
                                {
                                    emailExists &&
                                    <View>
                                        <Text style={{ color: 'green', fontSize: 15, fontWeight: '500', marginTop: 5 / 930 * height }}>
                                            Email available
                                        </Text>
                                    </View>
                                }
                                {
                                    emailNotExists &&
                                    <View>
                                        <Text style={{ color: '#E01F1F', fontSize: 15, fontWeight: '500', marginTop: 5 / 930 * height }}>
                                            Email already taken
                                        </Text>
                                    </View>
                                }
                            </View>
                            {/* {emailError ? <View>
                                <Text style={{ color: '#E01F1F', fontSize: 14, fontWeight: '500', marginTop: 5 / 930 * height }}>
                                    Please enter email
                                </Text>
                            </View> : ''} */}
                        </View>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'flex-end' }}>

                        {
                            indicattor ? (
                                <ActivityIndicator size={'large'} color={colors.blueColor} />
                            ) : (
                                <TouchableOpacity onPress={handleNextClick} style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                    <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>Next</Text>
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

export default AddEmail

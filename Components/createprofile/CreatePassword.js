import React from 'react';
import { useState } from 'react';
import { Dimensions, Text, View, Image, TouchableOpacity, TextInput, Settings, ActivityIndicator, TouchableWithoutFeedback, Keyboard, } from 'react-native'
import ApisPath from '../../lib/ApisPath/ApisPath';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import colors from '../../assets/colors/Colors';
const CreatePassword = ({ navigation, route }) => {

    //verification getting from previous screen
    const user = route.params.user;

    console.log('user from previous screen is', user)

    const { height, width } = Dimensions.get('window');

    //code for focus color change for input1
    const [passwordInput, setPasswordInput] = useState(false)
    const [showIndicator, setShowIndicator] = useState(false)

    const passwordFocus = () => {
        setPasswordInput(true);
        setPasswordInput2(false);
        setEmptyPasswordfielderror(false);
        setSamePasswordError(false);
    }

    //code for hide and show password for input1

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPasswordclick = () => {
        setShowPassword(!showPassword);
    }

    //code for focus color change for input1
    const [passwordInput2, setPasswordInput2] = useState(false)

    const passwordFocus2 = () => {
        setPasswordInput2(true);
        setPasswordInput(false);
        setEmptyPasswordfielderror(false);
        setSamePasswordError(false);
    }

    //code for hide and show password for input2

    const [showPassword2, setShowPassword2] = useState(false);

    const handleShowPasswordclick2 = () => {
        setShowPassword2(!showPassword2);
    }

    //Variables for show and hide password image
    const eye = require('../../assets/eye.png');
    const showeye = require('../../assets/showeye.png');

    //code for saving text of password input

    const [savePassword1, setSavepassword1] = useState('')

    const handleSavepassword1 = (savePassword12) => {
        setSavepassword1(savePassword12)
        console.log('User Password is', savePassword1)
    }

    const [savePassword2, setSavepassword2] = useState('')

    const handleSavepassword2 = (savePassword2) => {
        setSavepassword2(savePassword2)
        // console.log('User Password is', savePassword2)
    }

    //code for validation

    const [samePasswordError, setSamePasswordError] = useState(false);
    const [emptyPasswordfielderror, setEmptyPasswordfielderror] = useState(false);




    const registerUser = async () => {
        setShowIndicator(true)
        const data = Settings.get("USER")
        try {
            console.log('trying to register')
            // if (data) {
            //     let d = JSON.parse(data)
            const formdata = new FormData();
            formdata.append("first_name", user.FirstName);
            formdata.append("last_name", user.LastName);
            formdata.append("email", user.email);
            formdata.append("password", savePassword1);
            formdata.append("image", {
                name: "imageName",
                type: 'JPEG',
                uri: user.UserProfileImage
            });
            console.log('form data is', formdata)

            const result = await fetch(ApisPath.ApiRegisterUser, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + d.token
                },
                body: formdata
            })

            // return

            if (result) {
                setShowIndicator(false)
                console.log('result', result)
                let json = await result.json()
                if (json.status === true) {
                    console.log('user registered and user data is', json.data)
                    Settings.set({ USER: JSON.stringify(json.data) })
                    navigation.navigate('CongratsScreen');
                } else {
                    console.log(' json message is', json.message)
                }
            }
            // }
        } catch (error) {
            console.log('error finding in register user', error)
        }
    }

    const handleNextClick = () => {
        if (savePassword1.length === 0 || savePassword2.length === 0) {
            // console.log('Please enter password')
            setEmptyPasswordfielderror(true)
        } else if (savePassword1 === savePassword2) {
            registerUser()
            // 
            // console.log('Both passwords match')

        } else if (savePassword1 !== savePassword2) {
            // console.log('Please enter same password')
            setSamePasswordError(true)
        }
    }




    return (
        <TouchableWithoutFeedback 
            style = {{height:height}} onPress={Keyboard.dismiss}
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
                        <Image source={require('../../assets/Message2.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                        <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                        <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                        <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                        <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    </View>
                    <View style={{ marginTop: 40 / 930 * height }}>
                        <Text style={{ fontWeight: '500', fontSize: 20 }}>
                            Please create password
                        </Text>
                    </View>

                    {/* Code for password input fields */}
                    <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333', marginTop: 40 / 930 * height }}>
                        Password
                    </Text>
                    <View onFocus={passwordFocus} style={{ flexDirection: 'row', width: 370 / 430 * width, height: 63 / 930 * height, borderWidth: 1, borderColor: passwordInput ? '#6050DC' : '#cccccc', marginTop: 10 / 930 * height, borderRadius: 10, display: 'flex', alignItems: 'center' }}>
                        <TextInput placeholder='Enter Password' secureTextEntry={!showPassword}
                            onChangeText={handleSavepassword1}
                            value={savePassword1}
                            style={{
                                width: 325 / 430 * width,
                                // height: 52 / 930 * height,
                                padding: 17,
                                color: '#333333',
                                fontWeight: '500',
                                // borderWidth: 1
                            }} />
                        <TouchableOpacity onPress={handleShowPasswordclick} style={{ height: 24 / 930 * height, width: 24 / 430 * width, borderColor: 'red' }}>
                            <Image source={showPassword ? eye : showeye} style={{ height: 24 / 930 * height, width: 24 / 430 * width, paddingRight: 21 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333', marginTop: 30 / 930 * height }}>
                        Confirm Password
                    </Text>
                    <View onFocus={passwordFocus2} style={{ flexDirection: 'row', width: 370 / 430 * width, height: 63 / 930 * height, borderWidth: 1, borderColor: passwordInput2 ? '#6050DC' : '#cccccc', marginTop: 10 / 930 * height, borderRadius: 10, display: 'flex', alignItems: 'center' }}>
                        <TextInput placeholder='Enter Password' secureTextEntry={!showPassword2}
                            onChangeText={handleSavepassword2}
                            value={savePassword2}
                            style={{
                                width: 325 / 430 * width,
                                // height: 52 / 930 * height,
                                padding: 17,
                                color: '#333333',
                                fontWeight: '500',
                            }} />
                        <TouchableOpacity onPress={handleShowPasswordclick2} style={{ height: 24 / 930 * height, width: 24 / 430 * width, borderColor: 'red' }}>
                            <Image source={showPassword2 ? eye : showeye} style={{ height: 24 / 930 * height, width: 24 / 430 * width, paddingRight: 21 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ display: 'flex', height: height * 0.40, flexDirection: 'column', justifyContent: 'space-between' }}>
                        <View>
                            <View>
                                {emptyPasswordfielderror ? <View>
                                    <Text style={{ color: '#E01F1F', fontSize: 14, fontWeight: '500', marginTop: 5 / 930 * height }}>
                                        Enter Password
                                    </Text>
                                </View> : <View></View>}
                            </View>
                            <View>
                                {samePasswordError ? <View>
                                    <Text style={{ color: '#E01F1F', fontSize: 14, fontWeight: '500', marginTop: 5 / 930 * height }}>
                                        Enter Same Password
                                    </Text>
                                </View> : <View></View>}
                            </View>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {
                                showIndicator ? (
                                    <ActivityIndicator size={'large'} color={colors.blueColor} />
                                ) : (
                                    <TouchableOpacity onPress={handleNextClick} style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
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

export default CreatePassword

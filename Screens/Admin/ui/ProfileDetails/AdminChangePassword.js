import React, { useState } from 'react'
import { View, Dimensions, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, Platform, Keyboard, Text, StatusBar, TouchableOpacity, Image } from 'react-native'
import customFonts from '../../../../assets/fonts/Fonts'

const AdminChangePassword = ({ navigation }) => {
    const { height, width } = Dimensions.get('window')
    const handleBack = () => {
        navigation.pop()
    }
    const [passwordInput, setPasswordInput] = useState(false)
    const [samePasswordError, setSamePasswordError] = useState(false);
    const [emptyPasswordfielderror, setEmptyPasswordfielderror] = useState(false);

    const passwordFocus = () => {
        setPasswordInput(true);
        setPasswordInput2(false);
        setEmptyPasswordfielderror(false);
        setSamePasswordError(false);
    }
    const [savePassword1, setSavepassword1] = useState('')

    const handleSavepassword1 = (savePassword12) => {
        setSavepassword1(savePassword12)
        console.log('User Password is', savePassword1)
    }
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPasswordclick = () => {
        setShowPassword(!showPassword);
    }
    const [passwordInput2, setPasswordInput2] = useState(false)

    const passwordFocus2 = () => {
        setPasswordInput2(true);
        setPasswordInput(false);
        setEmptyPasswordfielderror(false);
        setSamePasswordError(false);
    }
    const [savePassword2, setSavepassword2] = useState('')

    const handleSavepassword2 = (savePassword2) => {
        setSavepassword2(savePassword2)
        // console.log('User Password is', savePassword2)
    }
    const [showPassword2, setShowPassword2] = useState(false);

    const handleShowPasswordclick2 = () => {
        setShowPassword2(!showPassword2);
    }

    const Eyeoff = require('../../../../assets/Images3/Eyeoff.png');
    const showeye = require('../../../../assets/Images3/showeye.png');

    const handleSaveClick = () => {
        if (savePassword1.length === 0 || savePassword2.length === 0) {
            // console.log('Please enter password')
            setEmptyPasswordfielderror(true)
        } else if (savePassword1 === savePassword2) {
            navigation.navigate('CreateProfilecomplete');
            // console.log('Both passwords match')
        } else if (savePassword1 !== savePassword2) {
            // console.log('Please enter same password')
            setSamePasswordError(true)
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ display: 'flex', alignItems: 'center', height: height, marginTop: 60 }}>
                    {/*change if the screen is irResponsive height: height s*/}
                    <View style={{ width: width - 50 }}>
                        <StatusBar
                            barStyle="dark-content"
                            backgroundColor="#FFFFFF"
                            translucent={false}
                        />
                        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', marginTop: 20 }}>
                            <TouchableOpacity onPress={handleBack} style={{ height: 47 / 930 * height, width: 47 / 430 * width }}>
                                <View style={{ height: 47 / 930 * height, width: 47 / 430 * width, borderWidth: 1, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={require('../../../../assets/Images3/backIcon.png')} style={{ height: 18, width: 9, resizeMode: 'contain' }} />
                                </View>
                            </TouchableOpacity>
                            <Text style={{ fontWeight: '500', fontSize: 24, fontFamily: customFonts.meduim }}>
                                Create new password
                            </Text>
                        </View>
                        <Text style={{ fontWeight: '400', fontSize: 16, fontFamily: customFonts.regular, color: '#666666', marginTop: 20 }}>
                            Your new password must be different from previous used passwords.
                        </Text>
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
                                <Image source={showPassword ? Eyeoff : showeye} style={{ height: 24 / 930 * height, width: 24 / 430 * width, paddingRight: 21 }} />
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
                                <Image source={showPassword2 ? Eyeoff : showeye} style={{ height: 24 / 930 * height, width: 24 / 430 * width, paddingRight: 21 }} />
                            </TouchableOpacity>
                        </View>
                        {emptyPasswordfielderror ? <View>
                            <Text style={{ color: '#E01F1F', fontSize: 14, fontWeight: '500', marginTop: 5 / 930 * height }}>
                                Enter Password
                            </Text>
                        </View> : <View></View>}
                        {samePasswordError ? <View>
                            <Text style={{ color: '#E01F1F', fontSize: 14, fontWeight: '500', marginTop: 5 / 930 * height }}>
                                Password must be same
                            </Text>
                        </View> : <View></View>}
                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity onPress={handleSaveClick} style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default AdminChangePassword

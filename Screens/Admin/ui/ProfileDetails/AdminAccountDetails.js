import React from 'react'
import { View, Dimensions, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, Platform, Keyboard, Text, StatusBar, TouchableOpacity, Image } from 'react-native'
import customFonts from '../../../../assets/fonts/Fonts'
import Apis from '../../apis/Apis'

const AdminAccountDetails = ({ navigation }) => {
    const { height, width } = Dimensions.get('window')
    const handleBack = () => {
        navigation.pop()
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ display: 'flex', alignItems: 'center', height: height }}>
                    {/*change if the screen is irResponsive height: height s*/}
                    <View style={{ width: width - 50, marginTop: 60 }}>
                        <StatusBar
                            barStyle="dark-content"
                            backgroundColor="#FFFFFF"
                            translucent={false}
                        />
                        <View style={{ display: 'flex', height: height * 0.65, flexDirection: 'column', justifyContent: 'space-between' }}>
                            <View>
                                <View style={{ flexDirection: 'row', gap: 20, marginTop: 20, alignItems: 'center' }}>
                                    <TouchableOpacity onPress={handleBack} style={{ height: 47 / 930 * height, width: 47 / 430 * width }}>
                                        <View style={{ height: 47 / 930 * height, width: 47 / 430 * width, borderWidth: 1, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require('../../../../assets/Images3/backIcon.png')} style={{ height: 18, width: 9, resizeMode: 'contain' }} />
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={{ fontWeight: '500', fontSize: 24, fontFamily: customFonts.medium }}>
                                        Account details
                                    </Text>
                                </View>
                                <View style={{ alignItems: 'center', marginTop: 50 }}>
                                    <Image source={require('../../../../assets/Images3/olivia.png')} style={{ height: 140 / 930 * height, width: 140 / 430 * width, borderRadius: 70, resizeMode: 'contain' }} />
                                </View>
                                <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333', marginTop: 10 }}>
                                    First Name
                                </Text>
                                <TextInput placeholder='First Name'
                                    style={{
                                        width: 370 / 430 * width,
                                        height: 52,
                                        borderWidth: 1,
                                        borderColor: '#CCCCCC',
                                        borderRadius: 10,
                                        padding: 17,
                                        // marginBottom: 10,
                                        marginTop: 10 / 930 * height,
                                        // color: '#999999',
                                        fontWeight: '500',
                                    }}
                                />
                                <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333', marginTop: 10 }}>
                                    Last Name
                                </Text>
                                <TextInput placeholder='Last Name'
                                    style={{
                                        width: 370 / 430 * width,
                                        height: 52,
                                        borderWidth: 1,
                                        borderColor: '#CCCCCC',
                                        borderRadius: 10,
                                        padding: 17,
                                        // marginBottom: 10,
                                        marginTop: 10 / 930 * height,
                                        // color: '#999999',
                                        fontWeight: '500',
                                    }}
                                />
                                <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333', marginTop: 10 }}>
                                    Email
                                </Text>
                                <TextInput placeholder='Enter Email'
                                    style={{
                                        width: 370 / 430 * width,
                                        height: 52,
                                        borderWidth: 1,
                                        borderColor: '#CCCCCC',
                                        borderRadius: 10,
                                        padding: 17,
                                        // marginBottom: 10,
                                        marginTop: 10 / 930 * height,
                                        // color: '#999999',
                                        fontWeight: '500',
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <TouchableOpacity style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                    <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                        Save
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default AdminAccountDetails

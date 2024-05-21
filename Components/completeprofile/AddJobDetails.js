import React, { useState } from 'react'
import {
    View, TouchableOpacity, TouchableWithoutFeedback, Image, Text, KeyboardAvoidingView, Platform, Keyboard, Dimensions
    , TextInput,
    Settings,
    ActivityIndicator
} from 'react-native'
import customFonts from '../../assets/fonts/Fonts';
import ApisPath from '../../lib/ApisPath/ApisPath';

const { height, width } = Dimensions.get('window');


const AddJobDetails = ({ navigation, route }) => {
    const [jobTitle, setJobTitle] = useState(null);
    const [company, setCompany] = useState(null)
    const [error, setError] = useState(null)
    const [showIndicator, setShowIndicator] = useState(false)


    const user = route.params.user

    console.log('user data from prev screens', user)

    const handleNext = async () => {
        setShowIndicator(true)
        if (!jobTitle) {
            setError("Select your jog title")
        } else if (!company) {
            setError("Select your company")
        } else {

            let body = JSON.stringify({
                zodiac: user.Zodiac,
                age: user.age,
                gender: user.gender,
                school: user.school,
                job_title:jobTitle,
                company: company

            })

            const data = Settings.get("USER")
            try {
                if (data) {
                    let d = JSON.parse(data)
                    console.log('user data is', d)
                    const result = await fetch(ApisPath.ApiUpdateProfile, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + d.token
                        },
                        body: body
                    })
                    if (result) {
                        setShowIndicator(false)
                        let json =await result.json();
                        if (json.status === true) {

                            console.log('user profile', json.data)
                            navigation.navigate('EnhancementQuestions')
                        }
                        else {
                            console.log('json message', json)
                        }
                    }
                }
            } catch (error) {
                console.log('error finding in updating profile', error)
            }
        }

    }

    return (
        // <KeyboardAvoidingView
        //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ height: height }}>
            <View style={{ display: 'flex', alignItems: 'center' }}>
                <View style={{ width: 370 / 430 * width }}>
                    <View style={{ marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.pop()}>
                            <Image source={require('../../assets/Backbutton.png')} style={{ resizeMode: 'contain' }} />
                        </TouchableOpacity>
                        <Text style={{ fontWeight: '500', fontSize: 24, marginLeft: 20 / 430 * width }}>
                            Complete your profile
                        </Text>
                    </View>
                    {/* Code for progressbar */}
                    <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                        <Image source={require('../../assets/workicon.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                        <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                        <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                        <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                        <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                        <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                        <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                        <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                        <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                        <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                        <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                        <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                        <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                        <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    </View>
                    <View style={{ marginTop: 40 / 930 * height }}>
                        <Text style={{ fontSize: 20, fontWeight: '500' }}>
                            What do you for work?
                        </Text>
                    </View>

                    <View style={{ display: 'flex', height: height * 0.65, flexDirection: 'column', justifyContent: 'space-between' }}>
                        <View style={{ marginTop: 50 / 930 * height }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333' }}>
                                Job title
                            </Text>
                            <TextInput placeholder='Enter your job title'
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
                                onChangeText={(item) => {
                                    setError(null)
                                    setJobTitle(item)
                                }}
                            />
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333', marginTop: 40 / 930 * height }}>
                                Company name
                            </Text>
                            <TextInput placeholder='Enter your company name'
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
                                onChangeText={(item) => {
                                    setError(null)
                                    setCompany(item)
                                }}
                            />
                            {
                                error && <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, color: 'red', marginTop: 10 }}>{error}</Text>
                            }
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'flex-end', width: width - 50 }}>
                            {
                                showIndicator ? (
                                    <ActivityIndicator size={'large'} />
                                ) : (
                                    <TouchableOpacity
                                        onPress={handleNext}
                                        style={{
                                            backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10
                                        }}>
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
        // </KeyboardAvoidingView>
    )
}

export default AddJobDetails

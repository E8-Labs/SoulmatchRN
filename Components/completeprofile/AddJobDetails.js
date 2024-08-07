import React, { useEffect, useState } from 'react'
import {
    View, TouchableOpacity, TouchableWithoutFeedback, Text, KeyboardAvoidingView, Platform, Keyboard, Dimensions
    , TextInput,
    Settings,
    ActivityIndicator
} from 'react-native';
import customFonts from '../../assets/fonts/Fonts';
import ApisPath from '../../lib/ApisPath/ApisPath';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import colors from '../../assets/colors/Colors';
import { UpdateProfile } from '../../Services/ProfileServices/UpdateProfile';
import { Image } from 'expo-image';

const { height, width } = Dimensions.get('window');


const AddJobDetails = ({ navigation, route }) => {

    const data = route.params.data

    const [jobTitle, setJobTitle] = useState(null);
    const [company, setCompany] = useState(null)
    const [error, setError] = useState(null)
    const [showIndicator, setShowIndicator] = useState(false)
    const [loading, setLoading] = useState(false)
    const [btnPosition, setBtnPosition] = useState(data.from === "Profile" ? height * 0.78 : height * 0.7)


    useEffect(() => {
        if (data.from === 'Profile') {
            setCompany(data.user.company)
            setJobTitle(data.user.job_title)
        }
    }, [])

    // const user = route.params.user
    // user.jobTitle = jobTitle,
    // user.company = company

    // console.log('user data from prev screens', user)

    const handleNext = async () => {
        // setShowIndicator(true)
        if (!jobTitle) {
            setError("Select your job title")
        } else if (!company) {
            setError("Select your company")
        } else {

            setLoading(true)
            let body = JSON.stringify({
                job_title: jobTitle,
                company: company
            })

            try {
                await UpdateProfile(body);
                if (data.from === 'Profile') {
                    navigation.goBack()
                } else {
                    navigation.navigate('GetInterest', {
                        data: {
                            from: 'JobDetails',
                            user: ''
                        }
                    });
                }

            } catch (error) {
                console.error('Error updating profile:', error);
                setError('Failed to update profile.');
            } finally {
                setLoading(false);
            }
        }


    }
    useEffect(() => {
        // console.log("Use Effect")
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            if (data.from === 'Profile') {
                setBtnPosition(height * 0.5);
            } else {
                setBtnPosition(height * 0.37);

            }
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            //   console.log("Keyboard hide")
            if (data.from === 'Profile') {
                setBtnPosition(height * 0.78);
            } else {
                setBtnPosition(height * 0.7);

            }
        });
    })


    return (
        // <KeyboardAvoidingView
        //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ height: height }}>
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
                    {data.from === "Profile"? "Work": "Complete your profile"}
                           
                        </Text>
                    </View>
                    {/* Code for progressbar */}
                    {
                        data.from !== "Profile" ?(

                        
                    
                    <View style={{ flexDirection: 'row', marginTop: 20 / 930 * height, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                        <Image source={require('../../assets/workiconsvg.svg')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
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
                        ):null
                        }
                    <View style={{ marginTop: 20 / 930 * height }}>
                        <Text style={{ fontSize: 20, fontWeight: '500' }}>
                            What do you do for work?
                        </Text>
                    </View>

                    <View style={{ display: 'flex', height: btnPosition, flexDirection: 'column', justifyContent: 'space-between' }}>
                        <View style={{ marginTop: 50 / 930 * height }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333' }}>
                                Job title
                            </Text>
                            <TextInput placeholder='Enter your job title' autoCorrect={false} autoComplete='none' style={{
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
                                spellCheck={false}
                                value={jobTitle}
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
                                }} autoCorrect={false} autoComplete='none'
                                spellCheck={false}
                                value={company}
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
                                loading ? (
                                    <ActivityIndicator size={'large'} color={colors.blueColor} style={{ marginTop: 70 / 930 * height }} />
                                ) : (
                                    <TouchableOpacity onPress={handleNext}
                                        style={{
                                            backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginTop: 70 / 930 * height
                                        }}>
                                        {
                                            data.from === 'Profile' ? (
                                                <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>Save</Text>
                                            ) : (
                                                <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>Next</Text>
                                            )
                                        }

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

import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions, TextInput, Settings, ActivityIndicator } from 'react-native';
import ApisPath from '../../lib/ApisPath/ApisPath';

const AddEmail = ({ navigation, route }) => {

    
    const { height, width } = Dimensions.get('window');
    const [saveemail, setSaveemail] = useState('')
    const [focusEmail, setFocusEmail] = useState(false)
    const [indicattor, setIndicator] = useState(false)
    //getting data from previous screen
    const user = route.params.name;
    user.email = saveemail
    // const UserFirstName = username.FirstName;
    // const UserLastName = username.LastName;
    // const UserImage = username.UserProfileImage;
    console.log('Name recieved from previous screen is', saveemail);
    // console.log('Image recieved on addname screen is', UserImage)

    const handleEmailfocus = () => {
        setFocusEmail(true);
        setEmailError(false)
    }

    //checking email availability

    // if (saveemail.length === 0) {
    //     setEmailError(true);
    //     console.log('Please enter email');
    // } else {
    //     navigation.navigate('UploadprofilePassword', {
    //         Email: {
    //             UserEmail: saveemail,
    //             ProfileFirstName: UserFirstName,
    //             ProfileLastName: UserLastName,
    //             ProfileImage: UserImage
    //         }
    //     })
    // }


    const handlesaveemail = (saveEmail) => {
        setEmailError(false);
        setSaveemail(saveEmail);
        // console.log('Email stored is', saveemail);
    };

    //code for Getting email Verification code
    const [emailError, setEmailError] = useState(false)

    const handleNextClick = async () => {
        try {
            setIndicator(true)
            let data = Settings.get("USER")
            if (data) {
                let d = JSON.parse(data)
                // console.log('user data from local ', d)

                //code for api
                const Apiurl = ApisPath.ApiSendVerificationEmail;
                // const Link = "http://13.58.134.250:8004/api/users/send_verification_email"
                const AuthToken = d.token;
                console.log('Email for verification is', saveemail)
                const response = await fetch(Apiurl, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthToken
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
        }
        catch (error) {
            console.log('Error is', error)
        }

    }

    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: 370 / 430 * width }}>
                <View style={{ marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../../assets/Backbutton.png')} style={{ resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '500', fontSize: 24, marginLeft: 20 / 430 * width }}>
                        Create Profile
                    </Text>
                </View>
                {/* Code for progressbar */}
                <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <Image source={require('../../assets/message.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
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
                <View style={{ display: 'flex', height: height * 0.58, flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View>
                        <TextInput placeholder='Saraahdie@gmail.com' keyboardType='email-address' onFocus={handleEmailfocus}
                            onChangeText={handlesaveemail}
                            value={saveemail}
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
                                    Please enter email
                                </Text>
                            </View> : ''}
                        </View>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'flex-end' }}>

                        {
                            indicattor ? (
                                <ActivityIndicator size={'large'} />
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
    )
}

export default AddEmail

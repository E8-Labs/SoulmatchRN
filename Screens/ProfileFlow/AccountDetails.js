import {
    View, Text, TouchableOpacity, Dimensions, StyleSheet, Settings, TextInput, Keyboard, TouchableWithoutFeedback, ActivityIndicator

} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Image } from 'expo-image';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import colors from '../../assets/colors/Colors';
import customFonts from '../../assets/fonts/Fonts';
import ApisPath from '../../lib/ApisPath/ApisPath';

import * as ImagePicker from 'expo-image-picker';



const { height, width } = Dimensions.get('window')
const placholder = require('../../assets/images/imagePlaceholder.webp')


export default function AccountDetails({ navigation, route }) {
    const user = route.params.user
    // console.log('user from prev screen is', user)

    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [error, setError] = useState(null);
    const [marginTop, setmarginTop] = useState(null);
    const [showIndicator, setShowIndicator] = useState(false);
    const [showIndicator2, setShowIndicator2] = useState(false);
    const [image, setImage] = useState(user.profile_image);
    const [loadImage, setLoadImage] = useState(false);

    useEffect(() => {
        // console.log("Use Effect")
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            console.log("Keyboard show")
            setmarginTop(-100);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            console.log("Keyboard hide")
            setmarginTop(0);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);


    const pickImage = async () => {
        setError(null)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
        });

        if (!result.canceled) {
            const ImageUrl = result.assets[0].uri;
            console.log('Image url recieved is', ImageUrl)
            setImage(ImageUrl)
            uploadImage(ImageUrl)
            console.log(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    }

    const uploadImage = async (imageUrl) => {
        setShowIndicator(true)
        const formdata = new FormData();

        formdata.append("image", {
            name: "image.png",
            type: 'image/png',
            uri: imageUrl
        });

        // Log form data entr
        console.log('formdata is', formdata);

        // return


        try {
            const data = Settings.get("USER")

            if (data) {
                let d = JSON.parse(data)
                //  console.log('user data is', d)
                const result = await fetch(ApisPath.ApiUpdateProfile, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + d.token
                    },
                    body: formdata
                })

                if (result) {
                    console.log('api result is', result)

                    setShowIndicator(false)
                    let json = await result.json();
                    if (json.status === true) {

                        console.log('user profile', json.data)
                        d.user = json.data
                        Settings.set({
                            USER: JSON.stringify(d)
                        })
                        navigation.goBack()
                    }
                    else {
                        console.log('json message', json.message)
                    }
                }
            }
        } catch (error) {
            setShowIndicator(false)
            console.log('error finding in updating profile', error)
        }
    }

    const updateProfile = async () => {
        setShowIndicator2(true)
        let body = JSON.stringify({
            first_name: firstName,
            last_name: lastName
        })

        // Log form data entries
        console.log('formdata is', body);

        // return


        try {
            const data = Settings.get("USER")

            if (data) {
                let d = JSON.parse(data)
                //  console.log('user data is', d)
                const result = await fetch(ApisPath.ApiUpdateProfile, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + d.token
                    },
                    body: body
                })

                if (result) {
                    console.log('api result is', result)

                    setShowIndicator2(false)
                    let json = await result.json();
                    if (json.status === true) {

                        console.log('user profile', json.data)
                        d.user = json.data
                        Settings.set({
                            USER: JSON.stringify(d)
                        })
                        navigation.goBack()
                    }
                    else {
                        console.log('json message', json.message)
                    }
                }
            }
        } catch (error) {
            setShowIndicator2(false)
            console.log('error finding in updating profile', error)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ height: height, width: width, alignItems: 'center', marginTop: marginTop, }}>
                <View style={{ width: width - 60, marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
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
                        Account details
                    </Text>
                </View>
                {
                    showIndicator ? (
                        <View style={{
                            height: 140 / 930 * height, width: 140 / 930 * height, borderWidth: 1, borderColor: colors.blueColor, borderRadius: 70,
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                            <ActivityIndicator size={'small'} color={colors.blueColor} style={{ marginTop: 0 / 930 * height }} />
                        </View>
                    ) : (
                        <TouchableOpacity onPress={pickImage}>
                            <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 33 / 930 * height }}>
                                <Image source={image ? { uri: image } : placholder}
                                    style={{ height: 140 / 930 * height, width: 140 / 930 * height, resizeMode: 'cover', borderRadius: 70 }}
                                />
                                <Image source={require('../../assets/images/edit.png')}
                                    onLoadStart={() => {
                                        setLoadImage(true)
                                    }}
                                    onLoadEnd={() => {
                                        setLoadImage(false)
                                    }}
                                    style={{
                                        height: 28 / 930 * height, width: 28 / 930 * height, resizeMode: 'contain', position: 'absolute', bottom: 10, right: 5
                                    }}
                                />
                                {
                                    loadImage ? (
                                        <View style = {{ marginTop: -80/930*height, height: 100 / 930 * height, }}>
                                            <ActivityIndicator size={'small'} color={colors.blueColor} style={{}} />
                                        </View>
                                    ) : null
                                }
                            </View>
                        </TouchableOpacity>
                    )
                }



                <View style={{ flexDirection: 'column', alignItems: 'flex-start', }}>

                    <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 20, fontFamily: customFonts.meduim }}>First name</Text>

                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false} spellCheck={false}
                        placeholder='Enter First Name'
                        value={firstName}
                        onChangeText={(text) => {
                            setFirstName(text)
                            setError("")
                        }}
                        style={[GlobalStyles.textInput,]}

                    />

                    <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 20, fontFamily: customFonts.meduim }}>Last name</Text>

                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false} spellCheck={false}
                        placeholder='Enter Last Name'
                        value={lastName}
                        onChangeText={(text) => {
                            setLastName(text)
                            setError("")
                        }}
                        style={[GlobalStyles.textInput,]}

                    />



                    <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 20, fontFamily: customFonts.meduim }}>Email</Text>

                    <TextInput
                        editable={false}
                        autoCapitalize='none'
                        autoCorrect={false} spellCheck={false}
                        placeholder='Enter Email'
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text)
                            setError("")
                        }}
                        style={[GlobalStyles.textInput,]}
                    />
                </View>

                {
                    showIndicator2 ? (
                        <ActivityIndicator size={'large'} color={colors.blueColor} style={{ marginTop: 50 / 930 * height }} />
                    ) : (
                        <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { marginTop: 30 }]}
                            onPress={updateProfile}
                        >
                            <Text style={GlobalStyles.btnText}>Save</Text>
                        </TouchableOpacity>
                    )
                }


            </View>
        </TouchableWithoutFeedback>

    )
}
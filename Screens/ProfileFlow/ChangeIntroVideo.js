import {
    View, Text, TouchableOpacity, Dimensions, StyleSheet, Settings, TextInput, Keyboard, TouchableWithoutFeedback, ActivityIndicator

} from 'react-native'
import React, { useState, useEffect } from 'react'
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import colors from '../../assets/colors/Colors';
import customFonts from '../../assets/fonts/Fonts';
import ApisPath from '../../lib/ApisPath/ApisPath';

export default function ChangeIntroVideo({ navigation, route }) {

    const user = route.params.user
    console.log('user from prev screen', user)
    const { height, width } = Dimensions.get('window')


    const [video, setVideo] = useState(null);
    const [error, setError] = useState(null);
    const [showIndicator, setShowIndicator] = useState(false);
    const [image, setImage] = useState(null);

    const generateThumbnail = async (url) => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                url,
                {
                    time: 15000,
                }
            );
            setImage(uri);
        } catch (e) {
            console.warn(e);
        }
    };
   
    const captureVideo = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setVideo(result.assets[0].uri);
            setPopup(false)
            generateThumbnail(result.assets[0].uri)
            uploadVideo()
        }
    };

    const uploadVideo = async () => {
       
        const formdata = new FormData()
        formdata.append(
            "media", {
            name: "imageName",
            uri: video,
            type: 'video/mp4'
        });
        formdata.append("thumbnail", {
            name: "thumbnail.jpg",
            uri: image,
            type: 'image/jpeg',
        });

        setShowIndicator(true)
        try {
            console.log('trying to upload video ', formdata)
            const data = Settings.get("USER")
            if (data) {
                let d = JSON.parse(data)
                const result = await fetch(ApisPath.ApiUploadIntroVideo, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + d.token,
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formdata
                })
                if (result) {
                    console.log('api called')
                    setShowIndicator(false)
                    console.log(result)
                    let json = await result.json();
                    console.log('json ', json)
                    if (json.status === true) {
                        console.log('video uploaded')
                        d.user = json.data
                        Settings.set({
                            USER: JSON.stringify(d)
                        })
                        navigation.navigate('UploadMedia')
                    } else {
                        console.log('json message is', json.message)
                    }
                }
            }
        } catch (error) {
            console.log('error finding in video upload', error)
        }
    }
    return (
        <View style={{ height: height, width: width, alignItems: 'center', }}>
            <View style={{ justifyContent: 'space-between', width: width - 60, marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <View style={GlobalStyles.backBtn}>
                        <Image source={require('../../assets/images/backArrow.png')}
                            style={GlobalStyles.backBtnImage}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={{ fontWeight: '500', fontSize: 24, }}>
                    Intro video
                </Text>

                <TouchableOpacity>
                    <Text style={{ color: colors.blueColor, fontSize: 18 }}>Save</Text>
                </TouchableOpacity>
            </View>

            <Image source={{ uri: user.intro_video_thumbnail }}
                style={{ height: 370 / 930 * height, width: width - 60, resizeMode: 'cover', marginTop: 33 / 930 * height, borderRadius: 4 }}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30, width: width - 60 }}>
                <TouchableOpacity style={{
                    height: 48 / 930 * height, width: 170 / 430 * width, borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center'
                }}>
                    <Text style={{ fontSize: 16 }}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    // onPress={captureVideo}
                style={{
                    height: 48 / 930 * height, width: 170 / 430 * width, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.blueColor
                }}>
                    <Text style={{ fontSize: 16, color: 'white' }}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
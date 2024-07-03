import {
    View, Text, TouchableOpacity, Dimensions, StyleSheet, Settings,
    TextInput, Keyboard, TouchableWithoutFeedback, ActivityIndicator, Modal

} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import colors from '../../assets/colors/Colors';
import customFonts from '../../assets/fonts/Fonts';
import ApisPath from '../../lib/ApisPath/ApisPath';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Video, ResizeMode, AVPlaybackStatu0s } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';


const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const { height, width } = Dimensions.get('window')

export default function ChangeIntroVideo({ navigation, route }) {

    const user = route.params.user
    // console.log('user from prev screen', user)



    let videoSource = ''
    let thumbnail = ''

    useEffect(() => {
        if (user&&user.introVideo !== null) {
            videoSource = user.intro_video
            thumbnail = user.intro_video_thumbnail
        }

        //     setIntroVideo(videoSource)
    }, [])
    // console.log('intro video ', user.intro_video_thumbnail)

    const [popup, setPopup] = useState(false)

    const [video, setVideo] = useState(null);
    const [error, setError] = useState(null);
    const [showIndicator, setShowIndicator] = useState(false);
    const [showIndicator2, setShowIndicator2] = useState(false);
    const [loadVideo, setLoadVideo] = useState(false);
    const [image, setImage] = useState(null);
    const [introVideo, setIntroVideo] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [duration, setDuration] = useState(0);
    const videoRef = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const ref = useRef(null);

    const formatDuration = (durationMillis) => {
        const totalSeconds = Math.floor(durationMillis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    useEffect(() => {
        console.log('intro video is', videoSource)
        setVideo(videoSource)
        setImage(thumbnail)
    }, [])



    const generateThumbnail = async (url) => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                url,
                {
                    time: 15000,
                }
            );
            setImage(uri);
            return uri
        } catch (e) {
            console.warn(e);
            return null
        }
    };
    const pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 0.5,
            videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
            videoExportPreset: ImagePicker.VideoExportPreset.H264_960x540,
        });

        if (!result.canceled) {
            const ImageUrl = result.assets[0].uri;
            // console.log("Base 64 image ", result.assets[0].base64)
            console.log('Image url recieved is', ImageUrl)
            setPopup(false)
            setVideo(ImageUrl)
            const thumbnail = await generateThumbnail(ImageUrl)
            // console.log(result.assets[0].uri);
            // const introVideo = { video: ImageUrl, thumbnail: thumbnail }
            // uploadVideo(introVideo)
        } else {
            setPopup(false)
            alert('You did not select any video.');
        }
    }

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
            const ImageUrl = result.assets[0].uri;
            // console.log("Base 64 image ", result.assets[0].base64)
            console.log('Image url recieved is', ImageUrl)
            setPopup(false)
            setVideo(ImageUrl)
            const thumbnail = await generateThumbnail(ImageUrl)
            // console.log(result.assets[0].uri);
            // const introVideo = { video: ImageUrl, thumbnail: thumbnail }
            // uploadVideo(introVideo)
        }else{
            setPopup(false)
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

        setShowIndicator2(true)
        try {
            // console.log('trying to upload video ', introVideo.video)
            // console.log('trying to upload video ', introVideo.thumbnail)
            // return
            const data = await AsyncStorage.getItem("USER")
            if (data) {
                let d = JSON.parse(data)
                console.log('user data is', d.user.id)
                const result = await fetch(ApisPath.ApiUploadIntroVideo, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + d.token,
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formdata
                })
                // return
                if (result) {
                    console.log('api called')
                    setShowIndicator2(false)
                    console.log(result)
                    let json = await result.json();
                    console.log('json ', json)
                    if (json.status === true) {
                        console.log('video uploaded')
                        setVideo(json.data.intro_video)
                        d.user = json.data
                        AsyncStorage.setItem("USER", JSON.stringify(d))
                        navigation.goBack()
                        // navigation.navigate('UploadMedia')
                    } else {
                        console.log('json message is', json.message)
                    }
                }
            }
        } catch (error) {
            console.log('error finding in video upload', error)
        }
    }


    const deleteIntro = async () => {
        if (!video || !image) {
            return
        }
        console.log('trying to delete intro video ', video)

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

        setShowIndicator2(true)
        try {
            console.log('trying to delete video ', video)
            // console.log('trying to upload video ', introVideo.thumbnail)
            // return
            const data = await AsyncStorage.getItem("USER")
            if (data) {
                let d = JSON.parse(data)
                console.log('user data is', d.user.id)
                const result = await fetch(ApisPath.ApiDeleteIntro, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + d.token,
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formdata
                })
                // return
                if (result) {
                    console.log('api called')
                    setShowIndicator2(false)
                    console.log(result)
                    let json = await result.json();
                    // console.log('json ', json)
                    if (json.status === true) {
                        console.log('video deleted')
                        setVideo(null)
                        setDuration(0)
                        d.user = json.data
                        AsyncStorage.setItem("USER", JSON.stringify(d))

                        // navigation.navigate('UploadMedia')
                    } else {
                        console.log('json message is', json.message)
                    }
                }
            }
        } catch (error) {
            console.log('error finding in delete video', error)
        }
    }

    const togglePlayback = () => {
        setIsPlaying(!isPlaying); // Toggle the isPlaying state
    };
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
                {
                    showIndicator2 ? (
                        <ActivityIndicator size={'small'} color={colors.blueColor} />
                    ) : (
                        <TouchableOpacity
                            onPress={() => {
                                uploadVideo()
                            }}
                        >
                            <Text style={{ color: colors.blueColor, fontSize: 18 }}>Save</Text>
                        </TouchableOpacity>
                    )
                }


            </View>
            {/* <TouchableOpacity onPress={togglePlayback}> */}
            {
                showIndicator ? (
                    <ActivityIndicator size={'large'} color={colors.blueColor} style={{ height: 300 }} />
                ) : (
                    video && video ? (
                        <>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('VideoPlayer', {
                                        data: {
                                            url: video
                                        }
                                    })
                                }}
                            >
                                <Image source={{ uri: image }}
                                    onLoadStart={() => { setLoadVideo(true) }}
                                    onLoadEnd={() => {
                                        setLoadVideo(false)
                                    }}
                                    placeholder={blurhash}
                                    contentFit="cover"
                                    transition={1000}
                                    style={{ height: 230 / 930 * height, width: 350 / 430 * width, borderRadius: 10, marginTop: 60 }}
                                />
                                <Image source={require('../../assets/images/playIcon.png')}
                                    style={{ height: 50, width: 50, position: 'absolute', bottom: 90 / 930 * height, left: 150 / 430 * width }}
                                />
                            </TouchableOpacity>


                            {
                                loadVideo ? (
                                    <ActivityIndicator size={'large'} color={colors.blueColor} style={{ height: 250, marginTop: -250 }} />
                                ) : <></>
                            }

                        </>

                    ) : (
                        <View style={{ height: 370 / 930 * height, width: width - 60, marginTop: 100 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setPopup(true)
                                }}
                            >
                                <View style={{ alignItems: 'center' }}>
                                    <Image source={require('../../assets/uploadvideoicon22.png')} style={{ height: 149, width: 149, resizeMode: 'contain' }} />
                                    <Text style={{ marginTop: 30 / 930 * height, fontWeight: '600', fontSize: 16 }}>
                                        Upload
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )

                )
            }
            {/* </TouchableOpacity> */}


            {
                video && video ? (
                    <View style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 50, width: width - 60 }}>
                        {/* 
                        {
                            showIndicator2 ? (
                                <ActivityIndicator color={colors.blueColor} size={'large'} style={{ width: 170 / 430 * width, }} />
                            ) : (
                                <TouchableOpacity onPress={deleteIntro}
                                    style={{
                                        height: 48 / 930 * height, width: 170 / 430 * width, borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center'
                                    }}>
                                    <Text style={{ fontSize: 16 }}>Remove</Text>
                                </TouchableOpacity>
                            )
                        } */}

                        <TouchableOpacity
                            onPress={() => {
                                setPopup(true)
                            }}
                            style={GlobalStyles.reqtengularBtn}>
                            <Text style={GlobalStyles.btnText}>Edit</Text>
                        </TouchableOpacity>
                    </View>

                ) : null
            }


            <Modal
                visible={popup}
                transparent={true}
                animationType='slide'
                style={{}}
            >
                <View style={{ height: height, width: width, backgroundColor: '#B3B3B380', display: 'flex', alignItems: 'center', justifyContent: "flex-end" }}>
                    <View style={{ height: 358 / 930 * height, backgroundColor: 'white', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 25, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 20 }}>
                        <View style={{ width: 370 / 430 * width }}>
                            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 20 / 930 * height }}>
                                <Text style={{ fontWeight: '500', fontSize: 20 }}>
                                    Upload
                                </Text>
                                <TouchableOpacity onPress={() => setPopup(false)} style={{ marginRight: 10 }}>
                                    <Image source={require('../../assets/crossicon.png')} style={{ height: 20 / 930 * height, width: 20 / 430 * width, resizeMode: 'contain', }} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ height: 0.1, borderWidth: 0.2, borderColor: '#E6E6E6', width: '100%', marginTop: 20 / 930 * height }}></View>

                        {/* code for social links */}

                        <View style={{ flexDirection: 'row', gap: 30 }}>
                            <TouchableOpacity onPress={pickVideo}>
                                <View style={{ height: 120 / 930 * height, width: 126 / 430 * width, borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                                    <Image source={require('../../assets/galleryicon.png')} style={{ height: 35 / 930 * height, width: 35 / 430 * width }} />
                                    <Text style={{ fontWeight: '500', fontSize: 14, color: '#4D4D4D' }}>
                                        Gallery
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={captureVideo}>
                                <View style={{ height: 120 / 930 * height, width: 126 / 430 * width, borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                                    <Image source={require('../../assets/cameraicon.png')} style={{ height: 35 / 930 * height, width: 35 / 430 * width }} />
                                    <Text style={{ fontWeight: '500', fontSize: 14, color: '#4D4D4D' }}>
                                        Camera
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: 370 / 430 * width }}>
                            <TouchableOpacity
                                onPress={() => {
                                    // navigation.navigate('AddAge');
                                }}
                                style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                    Upload
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    durationContainer: {
        position: 'absolute',
        top: height * 0.5,
        left: 50 / 430 * width,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 5,
        padding: 5,
    },
    durationText: {
        color: 'white',
        fontSize: 14,
    },
    activityIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
    },
});

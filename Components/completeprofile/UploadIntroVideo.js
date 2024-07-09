import React, { useState } from 'react'
import { Dimensions, Text, View, TouchableOpacity, Modal, Settings, ActivityIndicator } from 'react-native'
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as ImagePicker from 'expo-image-picker';
import ApisPath from '../../lib/ApisPath/ApisPath';
import colors from '../../assets/colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';

const UploadIntroVideo = ({ navigation }) => {
    const { height, width } = Dimensions.get('window');
    //test code for popup
    const [popup, setPopup] = useState(false)
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
            generateThumbnail(ImageUrl)
            console.log(result.assets[0].uri);
        } else {
            setPopup(false)
            alert('You did not select any video.');
        }
    }
    const handlePopup = () => {
        if (video) {
            navigation.navigate("VideoPlayer", {
                data: {
                    url: video
                }
            })
            return
        }
        setError(null)
        setPopup(true)
    }
    const captureVideo = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Please allow Soulmatch camera access to complite profile');
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
            generateThumbnail(ImageUrl)
            console.log(result.assets[0].uri);
        } else {
            setPopup(false)
            // alert('You did not select any video.');
        }
    };

    const uploadVideo = async () => {
        if (!video) {
            setError('Select any video')
            return
        }
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
            const data = await AsyncStorage.getItem("USER")
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
                        console.log('video uploaded', json.data)
                        d.user = json.data
                        AsyncStorage.setItem("userLocation", JSON.stringify({ d }))

                        navigation.navigate('UploadMedia', {
                            data: {
                                from: 'IntroVideo'
                            }
                        })
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
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: 370 / 430 * width }}>
                <Text style={{ fontWeight: '500', fontSize: 24, marginTop: 80 / 930 * height }}>
                    Complete your profile
                </Text>
                {/* Code for progressbar */}
                <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <Image source={require('../../assets/videoiconsvg.svg')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                </View>
                {/* Code for upload video icon */}
                <View style={{ marginTop: 40 / 930 * height }}>
                    <Text style={{ fontWeight: '500', fontSize: 20 }}>
                        Please add your intro video.
                    </Text>
                    {/* Adjustment code for next button */}
                    <View style={{ display: 'flex', height: height * 0.65, flexDirection: 'column', justifyContent: 'space-between' }}>
                        <View style={{ display: 'flex', alignItems: 'center', marginTop: 50 / 930 * height }}>



                            <TouchableOpacity onPress={() => handlePopup()}>
                                {
                                    video ? (
                                        <>
                                            <Image source={{ uri: image }} style={{ height: 149, width: 149, resizeMode: 'cover', borderRadius: 80 }} />
                                            <Image source={require('../../assets/images/playIcon.png')}
                                                style={{ height: 50, width: 50, position: 'absolute', bottom: 50 / 930 * height, left: 50 / 430 * width }}
                                            />
                                        </>
                                    ) : (
                                        <View style={{ alignItems: 'center' }}>
                                            <Image source={require('../../assets/uploadvideoicon22.png')} style={{ height: 149, width: 149, resizeMode: 'contain' }} />
                                            <Text style={{ marginTop: 30 / 930 * height, fontWeight: '600', fontSize: 16 }}>
                                                Upload
                                            </Text>
                                        </View>



                                    )
                                }

                            </TouchableOpacity>




                        </View>
                        <View style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {
                                error ? (
                                    <Text style={{ fontSize: 17, color: 'red', textAlign: 'center', marginBottom: 10 }}> {error}</Text>
                                ) : (
                                    <></>
                                )
                            }
                            {
                                showIndicator ? (
                                    <ActivityIndicator size={'large'} color={colors.blueColor} />
                                ) : (
                                    <TouchableOpacity
                                        onPress={uploadVideo}
                                        style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                            Next
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }


                            {/* Code for Modal */}
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
                    </View>
                </View>
            </View>
        </View>
    )
}

export default UploadIntroVideo

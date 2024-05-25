import React, { useEffect, useState } from 'react'
import {
    Dimensions, View, TouchableOpacity, Text, Modal, Settings, ActivityIndicator,
    FlatList, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform
} from 'react-native'
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as ImagePicker from 'expo-image-picker';
import ApisPath from '../../lib/ApisPath/ApisPath';
import colors from '../../assets/colors/Colors';
import customFonts from '../../assets/fonts/Fonts';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import { Image } from 'expo-image';

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const UploadMedia = ({ navigation }) => {

    const { height, width } = Dimensions.get('window');

    const [popup, setPopup] = useState(false)
    const [popup2, setPopup2] = useState(false)
    const [loadImage, setLoadImage] = useState(false)
    const handleModalclick = () => {
        setPopup(true);
        setError(null)
    }

    const [media, setMedia] = useState([]);
    const [selectedMedia, setselectedMedia] = useState(null);
    const [selectedMediaType, setselectedMediaType] = useState(null);
    const [error, setError] = useState(null);
    const [showIndicator, setShowIndicator] = useState(false);
    const [showIndicator2, setShowIndicator2] = useState(false);
    const [caption, setCaption] = useState(null);
    const [thumbnail, setThumnail] = useState(null);
    const [modalHeight, setModalHeight] = useState(null)

    useEffect(() => {
        console.log("Use Effect")
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            console.log("Keyboard show")
            setModalHeight(height * 0.9);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            console.log("Keyboard hide")
            setModalHeight(height * 0.56);
        });
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
          };
    }, [])


    const generateThumbnail = async (url) => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                url,
                {
                    time: 15000,
                }
            );
            return uri
            // setImage(uri);
        } catch (e) {
            console.log(e);
            return null

        }
    };

    const pickMedia = async () => {
        setPopup(false)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 0.5,
            videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
            videoExportPreset: ImagePicker.VideoExportPreset.H264_960x540,
        });

        if (!result.canceled) {
            const ImageUrl = result.assets[0].uri;
            console.log('selected media type', result.assets[0].type)
            console.log('Image url recieved is', ImageUrl)
            // setPopup(false)
            setPopup2(true)
            let thumb = await generateThumbnail(ImageUrl)
            setThumnail(thumb)
            setselectedMedia(result.assets[0].uri)
            setselectedMediaType(result.assets[0].type)

            // if (result.assets[0].type === 'video') {
            //     let thumb = await generateThumbnail(ImageUrl)
            //     console.log("Thumb image is ", thumb)
            //     setMedia([...media, { media: result.assets[0].uri, type: result.assets[0].type, caption: "hello", thumbnail: thumb }]);
            // }
            // else {
            //     setMedia([...media, { media: result.assets[0].uri, type: result.assets[0].type, caption: "", thumbnail: null }]);
            // }

            console.log(result.assets[0].uri);
        } else {
            setPopup(false)
            alert('You did not select any video.');
        }
    }

    const captureMedia = async () => {
        setPopup(false)
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setPopup2(true)
            let thumb = await generateThumbnail(ImageUrl)
            setThumnail(thumb)
            console.log("Thumbnail is")
            setselectedMedia(result.assets[0].uri)
            setselectedMediaType(result.assets[0].type)

        }
    };

    const uploadMedia = async () => {
        console.log('enter in function')
        if (!selectedMedia) {
            setError('Select any video')
            return
        }

        console.log('enter in function 2')


        const formdata = new FormData()
        formdata.append("media", {
            name: "imageName",
            uri: selectedMedia,
            type: selectedMediaType
        });
        if (thumbnail) {
            formdata.append("thumbnail", {
                name: "imageName",
                uri: thumbnail,
                type: 'image/jpeg'
            });
        }
        setShowIndicator(true)

        try {
            console.log('trying to upload video', formdata)
            const data = Settings.get("USER")
            // console.log("Data of usr is ", data)
            if (data) {
                let d = JSON.parse(data)


                const result = await fetch(ApisPath.ApiUploadMedia, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + d.token,
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formdata
                })
                // return
                if (result) {
                    setShowIndicator(false)

                    let json = await result.json();
                    console.log('json ', json)
                    if (json.status === true) {
                        console.log('video uploaded')
                        setPopup2(false)

                        if (json.data.type === 'video') {
                            // let thumb = await generateThumbnail(selectedMedia)
                            // console.log("Thumb image is ", thumb)
                            setMedia([...media, { media: json.data.url, type: json.data.type, caption: caption, thumbnail: json.data.thumb_url }]);
                            setCaption('')
                        }
                        else {
                            setMedia([...media, { media: json.data.url, type: json.data.type, caption: caption, thumbnail: null }]);
                            setCaption('')
                        }

                    } else {
                        console.log('json message is', json.message)
                    }
                }
            }
        } catch (error) {
            console.log('error finding in upload media', error)
        }
    }

    const deleteMedia = async (media, type) => {
        setShowIndicator2(true)
        const data = Settings.get('USER')
        try {
            console.log(`deleting media ${media} of type ${type}`)

            if (data) {
                let d = JSON.parse(data)
                const formdata = JSON.stringify({ "media_url": media });

                const result = await fetch(ApisPath.ApiDeleteMedia, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + d.token
                    },
                    body: formdata
                })
                if (result) {
                    setShowIndicator2(false)
                    console.log('result is', result)
                    let json = await result.json()
                    if (json.status === true) {
                        setMedia(json.data)
                        console.log('media deleted', json.data)
                    } else {
                        console.log('json message', json.message)
                    }
                }
            }
        } catch (error) {
            console.log('error finding in delete media', error)
        }

    }

    return (
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
                        Complete your profile
                    </Text>
                </View>
                {/* Code for progressbar */}
                <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <Image source={require('../../assets/uploadpic.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
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
                </View>


                {/* Code to upload media */}
                <View style={{ marginTop: 40 / 930 * height }}>
                    <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'flex-end' }}>
                        <Text style={{ fontWeight: '500', fontSize: 20 }}>
                            Please upload media
                        </Text>
                        <Text style={{ fontWeight: '500', fontSize: 12, color: '#999999', paddingBottom: 3 / 930 * height, marginLeft: 4 / 430 * width }}>
                            (photos/ videos)
                        </Text>
                    </View>
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>


                    <View style={{ display: 'flex', alignItems: 'center', marginTop: 50 / 930 * height }}>

                    </View>
                    <FlatList style={{ height: height * 0.53, width: width }} showsVerticalScrollIndicator={false}
                        data={[{ type: 'Button' }, ...media]}
                        renderItem={function (itemAtIndex) {
                            let item = itemAtIndex.item;
                            console.log("Showing ", item)

                            return (
                                <View>
                                    {
                                        item.type === 'Button' ? (
                                            <TouchableOpacity onPress={handleModalclick}>
                                                {/*<Image source={require('../../assets/uploadmedia3.png')} />*/}
                                                <View style={{ borderWidth: 2, width: 370 / 430 * width, height: 200 / 930 * height, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#33333320', borderStyle: 'dashed', }}>
                                                    <Image source={require('../../assets/addicon.png')} style={{ height: 20 / 930 * height, width: 20 / 430 * width, resizeMode: 'contain' }} />
                                                </View>
                                            </TouchableOpacity>
                                        ) : (
                                            <>
                                                {
                                                    showIndicator2 ? (
                                                        <ActivityIndicator size={'large'} style={{ marginTop: 50, marginRight: 50 }} />
                                                    ) : (
                                                        <View style={{ width: width, backgroundColor: 'transparent', marginTop: 5 }}>
                                                           
                                                            <View style={{
                                                                width: 370 / 430 * width, paddingVertical: 16 / 930 * height, paddingHorizontal: 16 / 430 * width,
                                                                borderWidth: 1, borderColor: colors.greyText, borderRadius: 10, marginTop: 30 / 930 * height, gap: 10

                                                            }}>


                                                                {
                                                                    item.caption && <Text style={{ fontSize: 16, fontFamily: customFonts.regular, color: 'black' }}>
                                                                        {item.caption}
                                                                    </Text>
                                                                }
                                                                <Image source={{ uri: item.type === "video" ? item.thumbnail : item.media }}
                                                                    onLoadStart={() => { setLoadImage(true) }}
                                                                    onLoadEnd={() => {
                                                                        setLoadImage(false)
                                                                    }}
                                                                    placeholder={blurhash}
                                                                    contentFit="cover"
                                                                    transition={1000}
                                                                    style={{ resizeMode: 'cover', width: 338 / 430 * width, height: 232 / 930 * height, borderRadius: 10, }}
                                                                />
                                                                {
                                                                    loadImage && <ActivityIndicator size={'large'} style = {{position:'relative',top:-130}} />
                                                                }

                                                            </View>
                                                            <TouchableOpacity onPress={() => deleteMedia(item.media, item.type)}
                                                                style={{
                                                                    position: 'absolute', alignSelf: 'flex-start', right: 52, top: 25
                                                                }}  >
                                                                <Image source={require('../../assets/closeButton.png')}
                                                                    style={{ height: 24 / 930 * height, width: 24 / 930 * height, resizeMode: 'contain', }}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                    )
                                                }

                                            </>


                                        )
                                    }
                                </View>
                            )
                        }}

                    />

                    <View>
                        {
                            error && <Text style = {[GlobalStyles.errorText,{textAlign:'center'}]}>{error}</Text>                       }
                        <TouchableOpacity onPress={() => {
                            if(media.length > 0){
                                navigation.navigate('AddZodiac')
                            } else{
                                setError('Upload media')
                            }
                            
                        }}
                            style={{
                                marginTop: 10, backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10
                            }}

                        >
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Code for Modal */}

                <Modal
                    visible={popup2}
                    transparent={true}
                    animationType='slide'
                    style={{}}
                >
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ height: height * 0.6, }}>
                        <TouchableWithoutFeedback style={{ height: height }} onPress={() => Keyboard.dismiss()}>
                            <View style={{ height: height, width: width, backgroundColor: '#B3B3B380', display: 'flex', alignItems: 'center', justifyContent: "flex-end" }}>
                                <View style={{ height: modalHeight, backgroundColor: 'white', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 25, alignItems: 'center', paddingBottom: 20 }}>
                                    <View style={{ width: 370 / 430 * width }}>
                                        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 20 / 930 * height }}>
                                            <Text style={{ fontWeight: '500', fontSize: 20 }}>
                                                Upload
                                            </Text>
                                            <TouchableOpacity onPress={() => setPopup2(false)} style={{ marginRight: 10 }}

                                            >
                                                <Image source={require('../../assets/crossicon.png')} style={{ height: 24 / 930 * height, width: 24 / 430 * width, resizeMode: 'contain', }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{ height: 0.1, borderWidth: 0.2, borderColor: '#E6E6E6', width: '100%', marginTop: 20 / 930 * height }}></View>

                                    <Image source={{ uri: selectedMediaType === 'video' ? thumbnail : selectedMedia }} style={{ height: 140, width: 140, borderRadius: 10 }} />

                                    <View style={{ width: width - 60, alignItems: 'flex-start', flexDirection: 'column', gap: 10 }}>
                                        <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, textAlign: 'left' }}>Caption</Text>
                                        <View style={{
                                            width: 370 / 430 * width, borderColor: '#f5f5f5', paddingVertical: 15 / 930 * height, borderRadius: 10,
                                            paddingHorizontal: 20 / 430 * width, borderWidth: 1
                                        }}>
                                            <TextInput placeholder='Enter a caption' value={caption}
                                                textAlignVertical='center'
                                                multiline
                                                onChangeText={(item) => {
                                                    setCaption(item)
                                                }}
                                            />
                                        </View>
                                    </View>
                                    {
                                        showIndicator ? (
                                            <ActivityIndicator size={'large'} />
                                        ) : (
                                            <TouchableOpacity
                                                onPress={uploadMedia}
                                                style={{ marginTop: 40, backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                                <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                                    Upload
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    }

                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </Modal>


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
                                        <Image source={require('../../assets/crossicon.png')} style={{ height: 24 / 930 * height, width: 24 / 430 * width, resizeMode: 'contain', }} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ height: 0.1, borderWidth: 0.2, borderColor: '#E6E6E6', width: '100%', marginTop: 20 / 930 * height }}></View>

                            {/* code for social links */}

                            <View style={{ flexDirection: 'row', gap: 30 }}>
                                <TouchableOpacity style={{ height: 120 / 930 * height, width: 126 / 430 * width, borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                                    onPress={pickMedia}
                                >
                                    <Image source={require('../../assets/galleryicon.png')} style={{ height: 35 / 930 * height, width: 35 / 430 * width, resizeMode: 'contain' }} />
                                    <Text style={{ fontWeight: '500', fontSize: 14, color: '#4D4D4D' }}>
                                        Gallery
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 120 / 930 * height, width: 126 / 430 * width, borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                                    onPress={captureMedia}
                                >
                                    <Image source={require('../../assets/cameraicon.png')} style={{ height: 35 / 930 * height, width: 35 / 430 * width, resizeMode: 'contain' }} />
                                    <Text style={{ fontWeight: '500', fontSize: 14, color: '#4D4D4D' }}>
                                        Camera
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: 370 / 430 * width }}>
                                <TouchableOpacity
                                    // onPress={() => {
                                    //     navigation.navigate('CompleteprofileAddzodiac');
                                    // }}
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
    )
}

export default UploadMedia

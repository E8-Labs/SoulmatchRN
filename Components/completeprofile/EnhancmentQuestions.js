import React, { useState, useEffect } from 'react'
import {
    Dimensions, View, TouchableOpacity, Text, FlatList, Modal, TextInput, TouchableWithoutFeedback,
    Settings, Keyboard, ActivityIndicator,
    Alert
} from 'react-native'
import AddEnhancementAnswer from './AddEnhancementAnswer';
import ApisPath from '../../lib/ApisPath/ApisPath';
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Image } from 'expo-image';
import colors from '../../assets/colors/Colors';
import GlobalStyles from '../../assets/styles/GlobalStyles';


const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const EnhancmentQuestions = ({ navigation }) => {
    const { height, width } = Dimensions.get('window');
    const [sIndex, setSIndex] = useState(null);
    const [CheckBox, setCheckBox] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [media, setMedia] = useState(null);
    const [thumb, setThumb] = useState(null);
    const [mediaType, setMediaType] = useState(null)
    const [showIndicator, setShowIndicator] = useState(null)
    const [showIndicator2, setShowIndicator2] = useState(null)
    const [OpenModal, setOpenModal] = useState(null);
    const [answerText, setAnswerText] = useState(null)
    const [loadImage, setLoadImage] = useState(false)


    // questions[0].answer = json.data;

    const radioInactive = require('../../assets/RadioInactive.png')
    const radioActive = require('../../assets/RadioActive.png')


    useEffect(() => {
        getQuestions()
    }, [])

    const getQuestions = async () => {
        setShowIndicator2(true)
        try {
            const data = Settings.get('USER')
            if (data) {
                let d = JSON.parse(data)

                const result = await fetch(ApisPath.ApiGetQuestions, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + d.token
                    }
                })
                if (result) {
                    let json = await result.json()
                    if (json.status === true) {
                        setShowIndicator2(false)
                        console.log('enancmennt questions are', json.data)
                        setQuestions(json.data)
                    } else {
                        console.log('json messagw', object)

                    }
                }
            }



        } catch (error) {
            console.log('error findng in get questions', error)
        }
    }

    const generateThumbnail = async (url) => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                url,
                {
                    time: 15000,
                }
            );
            console.log('genrated thumnail is', uri)
            setThumb(uri);
        } catch (e) {
            console.log(e);
        }
    };


    const captureVideo = async (item) => {
        if (CheckBox.length > 2) {
            Alert.alert("You can select maximum 3 questions")
            return
        }
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
            // setMedia(result.assets[0].uri);
            const ImageUrl = result.assets[0].uri;
            generateThumbnail(ImageUrl)
            // setThumb(thumbnail)
            // setMedia(result.assets[0].uri)
            setMediaType(result.assets[0].type)
            let mediaSelected = { uri: ImageUrl, thumb: thumb, text: null, type: result.assets[0].type }
            uploadMedia(item, mediaSelected)

            console.log(result.assets[0].uri);
        }
    };



    const pickMedia = async (item) => {
        if (CheckBox.length > 2) {
            Alert.alert("You can select maximum 3 questions")
            return
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
            videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
            videoExportPreset: ImagePicker.VideoExportPreset.H264_960x540,
        });

        if (!result.canceled) {
            const ImageUrl = result.assets[0].uri;
            console.log('selected media type', result.assets[0].type)
            console.log('Image url recieved is', ImageUrl)
            generateThumbnail(ImageUrl)
            // setThumb(thumbnail)
            // setMedia(result.assets[0].uri)
            setMediaType(result.assets[0].type)
            let mediaSelected = { uri: ImageUrl, thumb: thumb, text: null, type: result.assets[0].type }
            uploadMedia(item, mediaSelected)

            console.log(result.assets[0].uri);
        } else {
            alert('You did not select any video.');
        }
    }



    const uploadMedia = async (item, mediaSelected) => {
        console.log('enter in function 2', mediaSelected)
        console.log('ansered questions length', CheckBox.length)
        // return



        // return 
        const formdata = new FormData()

        if (mediaSelected.uri) {

            formdata.append("media", {
                name: "imageName",
                uri: mediaSelected.uri,
                type: mediaSelected.type
            });
        }
        if (mediaSelected.thumb) {
            formdata.append("thumbnail", {
                name: "imageName",
                uri: mediaSelected.thumb,
                type: 'image/jpeg'
            });
        }
        if (mediaSelected.text) {
            console.log('Uploading text ', mediaSelected.text)
            formdata.append("answerText", mediaSelected.text);
        } else {
            console.log('can not upload text ', mediaSelected.text)
        }
        formdata.append("questionId", item.id);
        setShowIndicator(true)
        console.log('trying to upload media', mediaSelected)
        // return
        try {

            // return
            const data = Settings.get("USER")
            // console.log("Data of usr is ", data)
            if (data) {
                let d = JSON.parse(data)


                const result = await fetch(ApisPath.ApiAddAnswer, {
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
                        console.log('media uploaded', json.data)
                        updateQuestionMedia(item.id, json.data);
                        handleCheckboxclick(item.id)
                        // setMedia(json.data)

                    } else {
                        console.log('json message is', json.message)
                    }
                }
            }
        } catch (error) {
            console.log('error finding in video upload', error)
        }
    }
    const updateQuestionMedia = (questionId, mediaData) => {
        setQuestions(prevQuestions => {
            return prevQuestions.map(q => {
                if (q.id === questionId) {
                    return { ...q, media: mediaData };
                }
                return q;
            });
        });
    };



    const handleCheckboxclick = (itemId) => {
        // Toggle the selection state for the clicked item
        // if (CheckBox.includes(itemId)) {
        //     setCheckBox(CheckBox.filter(id => id !== itemId));
        // } else {
        setCheckBox([...CheckBox, itemId]);
        // }
    };

    //Code for modal


    const openModalclick = (item) => {
        console.log('modal data ', item)

        setOpenModal(item)
    }

    const closeModal = (text) => {
        if (text) {
            console.log('answer text is', text)
            let mediaSelected = { uri: "", thumb: '', text: text, type: "text" }
            uploadMedia(OpenModal, mediaSelected)
        }
        setOpenModal(null);
        setAnswerText('');
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
                    <Image source={require('../../assets/questionmark.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
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
                </View>
                <View style={{ marginTop: 40 / 930 * height }}>
                    <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'flex-end', width: 370 / 430 * width }}>
                        <Text style={{ fontWeight: '500', fontSize: 19 }}>
                            Profile Enhancement Questions
                        </Text>
                        <Text style={{ fontWeight: '500', fontSize: 11, color: '#999999', paddingBottom: 3 / 930 * height, marginLeft: 4 / 430 * width }}>
                            (Optional)
                        </Text>
                    </View>
                    <Text style={{ fontWeight: '500', fontSize: 14, color: '#666666', paddingBottom: 3 / 930 * height, marginTop: 20 / 930 * height }}>
                        Select up to 3 max
                    </Text>
                </View>

                <View>

                    {/* Flat list code goes here */}
                    {
                        showIndicator2 ? (
                            <ActivityIndicator size={'large'}  style={{ height: height * 0.55 }}/>
                        ) : (
                            <FlatList showsVerticalScrollIndicator={false}
                                style={{ height: height * 0.55 }}
                                data={questions}
                                renderItem={({ item, index }) => (
                                    <View style={{ width: 370 / 430 * width, borderWidth: 1, borderColor: '#E6E6E6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30 / 930 * height, borderRadius: 10, padding: 12 }}>
                                        <View style={{ height: 105 / 930 * height, width: 345 / 430 * width, marginBottom: 9 / 930 * height }}>
                                            {/* <TouchableOpacity onPress={() => {}} style={{ height: 24 / 930 * height, width: 24 / 430 * width, marginTop: 5 }}> */}
                                            <View>
                                                <Image source={CheckBox.includes(item.id) ? radioActive : radioInactive}
                                                    style={{ height: 24 / 930 * height, width: 24 / 430 * width, resizeMode: 'contain' }} />
                                            </View>
                                            {/* </TouchableOpacity> */}
                                            <Text style={{ fontWeight: '500', fontSize: 16, marginTop: 10 / 930 * height }}>
                                                {item.title}
                                            </Text>
                                            <Text style={{ fontWeight: '500', fontSize: 12, color: '#4D4D4D' }}>
                                                {item.text}
                                            </Text>
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            {
                                                item.media ? (
                                                    item.media.answerImage ? (
                                                        <>
                                                            {
                                                                item.media.questionId === (index + 1).toString() && (
                                                                    <>
                                                                        <Image source={{ uri: item.media.answerImage }}
                                                                            onLoadStart={() => { setLoadImage(true) }}
                                                                            onLoadEnd={() => {
                                                                                setLoadImage(false)
                                                                            }}
                                                                            placeholder={blurhash}
                                                                            contentFit="cover"
                                                                            transition={1000}
                                                                            style={{ width: 340 / 430 * width, height: 208 / 930 * width }}
                                                                        />
                                                                        {/* {
                                                                    loadImage ? (
                                                                        <ActivityIndicator size={'large'} color={colors.blueColor} style={{marginTop:-50 }} />
                                                                    ) : <></>
                                                                } */}
                                                                    </>
                                                                )
                                                            }

                                                        </>

                                                    ) : (
                                                        item.media.answerVideo ? (
                                                            <Image source={{ uri: item.media.videoThumbnail }}
                                                                style={{ width: 340 / 430 * width, height: 208 / 930 * height }} />
                                                        ) : (
                                                            item.media.answerText && (
                                                                <>
                                                                    {
                                                                        item.media.questionId === (index + 1).toString() ? (
                                                                            <View style={{
                                                                                backgroundColor: '#F5F5F5', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 4, width: 330 / 430 * width
                                                                            }}>
                                                                                <Text>{item.media.answerText}</Text>
                                                                            </View>
                                                                        ) : null
                                                                    }

                                                                </>
                                                            )

                                                        )
                                                    )
                                                ) : null

                                            }

                                        </View>

                                        <View style={{ height: 38 / 930 * height, width: 345 / 430 * width, marginTop: 8, display: 'flex', alignItems: 'flex-end' }}>
                                            <View style={{ width: 130 / 430 * width, flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>
                                                <TouchableOpacity style={{ width: 36 / 430 * width }} onPress={() => {
                                                    if (CheckBox.length > 2) {
                                                        Alert.alert("You can select maximum 3 questions")
                                                        return
                                                    } else {
                                                        openModalclick(item)
                                                    }

                                                }}>
                                                    <Image source={require('../../assets/text.png')} style={{ height: 36 / 930 * height, width: 36 / 430 * width, resizeMode: 'contain' }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ width: 36 / 430 * width }}
                                                    onPress={() => {
                                                        pickMedia(item)
                                                    }}
                                                >
                                                    <Image source={require('../../assets/newupload.png')} style={{ height: 36 / 930 * height, width: 36 / 430 * width, resizeMode: 'contain' }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ width: 36 / 430 * width }}
                                                    onPress={() => captureVideo(item)}
                                                >
                                                    <Image source={require('../../assets/videoicon2.png')} style={{ height: 36 / 930 * height, width: 36 / 430 * width, resizeMode: 'contain' }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )}
                                keyExtractor={item => item.id}
                            />

                        )
                    }


                    <View style={{ marginTop: 15 / 930 * height }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('AddLocation');
                            }}
                            style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* code for modal */}

                <Modal
                    transparent={true}
                    visible={OpenModal !== null}
                    animationType='fade'
                    onRequestClose={() => closeModal()}
                >

                    <TouchableWithoutFeedback style={{ height: height, }} onPress={() => Keyboard.dismiss()}>
                        <View style={{ height: height, gap: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000080' }}>

                            {/* Code for uper section of modal */}
                            <View style={{ height: 320 / 930 * height, width: 380 / 430 * width, backgroundColor: '#ffffff', borderRadius: 10, display: 'flex', alignItems: 'center', padding: 20 }}>
                                <View style={{ width: 350 / 430 * width, height: '100%' }}>
                                    <View style={{ width: '100%', height: 73 / 930 * height, justifyContent: 'space-between' }}>
                                        <Text style={{ fontWeight: '500', fontSize: 16 }}>
                                            {OpenModal && OpenModal.title}
                                        </Text>
                                        <Text style={{ fontWeight: '500', fontSize: 12, color: '#4D4D4D' }}>
                                            {OpenModal && OpenModal.text}
                                        </Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            onChangeText={(text) => setAnswerText(text)}
                                            multiline
                                            numberOfLines={5}
                                            textAlignVertical='top'
                                            style={{ height: 177 / 930 * height, width: 350 / 430 * width, borderWidth: 1, borderColor: '#6050DC', padding: 15, alignItems: 'flex-start', marginTop: 30, justifyContent: 'flex-start', borderRadius: 10 }} />
                                    </View>
                                </View>
                            </View>
                            {/* Code for send msg */}
                            <View style={{ height: 115 / 930 * height, width: 350 / 430 * width }}>
                                <View>
                                    <TouchableOpacity
                                        onPress={() => closeModal(answerText)}
                                        style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 350 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>
                                            Save
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        onPress={() => closeModal()}
                                        style={{ height: 54 / 930 * height, width: 350 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                        <Text style={{ fontWeight: '500', fontSize: 16 }}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

            </View>
        </View>
    )
}

export default EnhancmentQuestions

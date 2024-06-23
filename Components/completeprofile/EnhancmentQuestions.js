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
import { getProfile } from '../../Services/ProfileServices/GetProfile';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const EnhancmentQuestions = ({ navigation, route }) => {

    const { height, width } = Dimensions.get('window');

    const data = route.params.data
    console.log('data from prev screen is', data.user.answers)

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
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const [justifyContent, setJustifyContent] = useState('center')

    // questions[0].answer = json.data;

    const radioInactive = require('../../assets/RadioInactive.png')
    const radioActive = require('../../assets/RadioActive.png')





    useEffect(() => {
        getQuestions()

        if (data.from === 'Profile') {

            const userAnswers = data.user.answers;
            let updatedQuestions = []
            console.log('ansers ara', userAnswers)

            let found = -1
            for (let i = 0; i < questions.length; i++) {
                let item = questions[i];
                for (let j = 0; j < userAnswers.length; j++) {
                    let element = userAnswers[j];

                    if (item.id === element.questionId) {
                        updatedQuestions.push(element)
                        console.log('answer found', item.id)
                    }
                    else {
                        updatedQuestions.push(item)
                    }
                }
            }
            console.log("Updated questions are ", updatedQuestions)
            setQuestions(updatedQuestions)
            

            // const mergedData = questions.map(question => {
            //     return {
            //         ...questions,
            //         media: userAnswers.filter(answer => {
            //             // console.log('testing', answer)
            //             answer.questionId === question.id
            //         })
            //     };
            // });
            // setQuestions(mergedData)
            //    console.log('updated questions data', mergedData)
        }

    }, [])

    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         setLoading(true);
    //         setError(null);
    //         try {
    //             const data = await getProfile();
    //             setUser(data);
    //             setMedia(data.media)
    //         } catch (err) {
    //             setError(err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchProfile()
    // }, [])
    useEffect(() => {
        console.log('questions array after updating', questions)
    }, [questions])

    const getQuestions = async () => {
        setShowIndicator2(true)
        console.log('trying to get questions')
        try {
            const data =await AsyncStorage.getItem("USER")

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
                        let ans = await AsyncStorage.getItem("UserAnswers")
                        if(ans){
                            let userAnswers = JSON.parse(ans)
                            console.log('user answers from local are ', userAnswers)
                            updateQuestionMedia(json.data, userAnswers.updatedQuestions);
                        }else{
                            console.log('user answers are not found')
                            updateQuestionMedia(json.data,d.user.answers);
                        }
                        // setQuestions(json.data)
                        
                    } else {
                        console.log('json message', json.message)
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
            return uri
        } catch (e) {
            console.log(e);
            return null
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
            let thumbnail = await generateThumbnail(ImageUrl)
            // setThumb(thumbnail)
            // setMedia(result.assets[0].uri)
            let type = result.assets[0].type
            setMediaType(type)
            let mediaSelected = { uri: ImageUrl, thumb: thumbnail, text: null, type: type }
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

        setShowIndicator(true)
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

        console.log('trying to upload media', mediaSelected)
        // return
        try {

            // return
            const data = await AsyncStorage.getItem("USER")
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
                    // console.log('json ', json)
                    if (json.status === true) {
                        console.log('media uploaded', json.data)
                        updateQuestionMedia(questions, json.data);
                        // handleCheckboxclick(item.id)
                        // setMedia(json.data)

                    } else {
                        Alert.alert(json.message)
                        console.log('json message is', json.message)
                    }
                }
            }
        } catch (error) {
            console.log('error finding in video upload', error)
        }
    }
    const updateQuestionMedia = (dbQuestions, mediaData) => {
        console.log("Media data is ", mediaData)
        let updatedQuestions = []
        let questionIds = []

        // let found = -1
        for (let i = 0; i < dbQuestions.length; i++) {
            let item = dbQuestions[i];
            let found = false;
            for (let j = 0; j < mediaData.length; j++) {
                let answer = mediaData[j]
                if (item.id === answer.questionId && !questionIds.includes(answer.questionId)) {
                    updatedQuestions.push(answer)
                    found = true;
                    questionIds.push(answer.questionId)

                }
            }
            if (!found) {
                updatedQuestions.push(item)
            }
        }
        console.log("Updated questions are ", updatedQuestions)
        setQuestions(updatedQuestions)
        AsyncStorage.setItem("UserAnswers",JSON.stringify({updatedQuestions}))

    };

    const hasAnswer = (question) => {
        let answered = false;
        if ((question.answerVideo !== undefined && question.answerVideo !== null) ||
            (question.answerImage !== undefined && question.answerImage !== null) ||
            (question.answerText !== undefined && question.answerText !== null)) {
            answered = true;
            console.log("here we go", CheckBox)

            // setCheckBox([...CheckBox,question.id]);
        }
        console.log(`Question ${question.id} has answer ${question.answerImage} ${question.answerVideo} ${question.answerText}`)
        return answered;
    }



    const handleCheckboxclick = (itemId) => {
        // Toggle the selection state for the clicked item
        // if (CheckBox.includes(itemId)) {
        //     setCheckBox(CheckBox.filter(id => id !== itemId));
        // } else {

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


    useEffect(() => {
        console.log("Use Effect")
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setJustifyContent("fext-start")
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setJustifyContent('center')
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);


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
                        {data.from === "Profile"? "Profile Enhancement...": "Complete your profile"}
                    </Text>
                </View>
                {/* Code for progressbar */}
                {
                    data.from !== "Profile" ? (
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
                    ) : null
                }

                <View style={{ marginTop: 40 / 930 * height }}>
                    <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'flex-end', width: 370 / 430 * width }}>
                        <Text style={{ fontWeight: '500', fontSize: 19 }}>
                            Profile Enhancement Questions
                        </Text>
                        <Text style={{ fontWeight: '500', fontSize: 11, color: '#999999', paddingBottom: 3 / 930 * height, marginLeft: 4 / 430 * width }}>
                            {/* (Optional) */}
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
                            <ActivityIndicator size={'large'} color={colors.blueColor} style={{ height: data.from === "Profile" ? height * 0.67 : height * 0.55 }} />
                        ) : (
                            <FlatList showsVerticalScrollIndicator={false}
                                keyExtractor={item => item.id}
                                style={{ height: data.from === "Profile" ? height * 0.67 : height * 0.55 }}
                                data={questions}
                                renderItem={({ item, index }) => (
                                    <View style={{ width: 370 / 430 * width, borderWidth: 1, borderColor: '#E6E6E6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30 / 930 * height, borderRadius: 10, padding: 12 }}>
                                        <View style={{ height: 105 / 930 * height, width: 345 / 430 * width, marginBottom: 9 / 930 * height }}>
                                            {/* <TouchableOpacity onPress={() => {}} style={{ height: 24 / 930 * height, width: 24 / 430 * width, marginTop: 5 }}> */}
                                            <View>
                                                <Image source={hasAnswer(item) ? radioActive : radioInactive}
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

                                                // item ? (
                                                // showIndicator ? (
                                                //     <ActivityIndicator size={'large'} />
                                                // ) : (
                                                item.answerImage ? (
                                                    <>
                                                        {
                                                            // item.questionId === (index + 1).toString() && (
                                                            <>
                                                                <Image source={{ uri: item.answerImage }}
                                                                    onLoadStart={() => { setLoadImage(true) }}
                                                                    onLoadEnd={() => {
                                                                        setLoadImage(false)
                                                                    }}
                                                                    placeholder={blurhash}
                                                                    contentFit="cover"
                                                                    transition={1000}
                                                                    style={{ width: 340 / 430 * width, height: 208 / 930 * width }}
                                                                />

                                                                {
                                                                    loadImage ? (
                                                                        <ActivityIndicator size={'small'} color={colors.blueColor} style={{ marginTop: -50 }} />
                                                                    ) : <></>
                                                                }
                                                            </>
                                                            // )
                                                        }

                                                    </>

                                                ) : (
                                                    item.answerVideo ? (
                                                        <Image source={{ uri: item.videoThumbnail }}
                                                            style={{ width: 340 / 430 * width, height: 208 / 930 * height }} />
                                                    ) : (
                                                        item.answerText && (
                                                            // <>
                                                            //     {
                                                            //         item.questionId === (index + 1).toString() ? (
                                                            <View style={{
                                                                backgroundColor: '#F5F5F5', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 4, width: 330 / 430 * width
                                                            }}>
                                                                <Text>{item.answerText}</Text>
                                                            </View>
                                                            // ) : null
                                                            // }

                                                            // </>
                                                        )

                                                    )
                                                )
                                                // )
                                                // ) : null


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

                            />

                        )
                    }


                    <View style={{ marginTop: 15 / 930 * height }}>
                        <TouchableOpacity
                            onPress={() => {
                                if( data.from === 'Profile'){
                                    navigation.goBack()
                                    return
                                }
                                navigation.navigate('AddLocation',{
                                    data:{
                                        from:'Questions'
                                    }
                                });
                            }}
                            style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                            {
                                data.from === 'Profile' ? (
                                    <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                        Save
                                    </Text>
                                ) : (
                                    <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                        Next
                                    </Text>
                                )
                            }

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
                        <View style={{ height: height, gap: 20, display: 'flex', alignItems: 'center', justifyContent: justifyContent, backgroundColor: '#00000080' }}>

                            {/* Code for uper section of modal */}
                            <View style={{ marginTop: 70 / 930 * height, height: 320 / 930 * height, width: 380 / 430 * width, backgroundColor: '#ffffff', borderRadius: 10, display: 'flex', alignItems: 'center', padding: 20 }}>
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
            {showIndicator &&
                <View style={{
                    width: width, height: height, position: 'absolute',
                    justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                    <ActivityIndicator size="large" color={colors.blueColor} />
                </View>
            }

        </View>
    )
}

export default EnhancmentQuestions

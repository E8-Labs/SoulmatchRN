import {
    View, Text, Dimensions, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleSheet,
    TextInput, Modal, TouchableWithoutFeedback, Keyboard,
    Settings,
    ScrollView,
    ActivityIndicator
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import customFonts from '../../assets/fonts/Fonts'
import colors from '../../assets/colors/Colors'
import MoreOptionsPopup from '../../Components/MoreOptionsPopup'
import AddButtonPopup from '../../Components/AddButtonPopup'
import BlockPopup from '../../Components/BlockPopup'
import {
    Pusher,
    PusherMember,
    PusherChannel,
    PusherEvent,
} from '@pusher/pusher-websocket-react-native';
import ApisPath from '../../lib/ApisPath/ApisPath';
import { Image } from 'expo-image'
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage'


const { height, width } = Dimensions.get('window');

const activeImage = require('../../assets/images/activeSendIcon.png');
const inactiveImage = require('../../assets/images/inActiveSendIcon.png');

const activeMore = require('../../assets/images/activeMoreIcon.png')
const more = require('../../assets/images/moreIcon.png')
const activeAdd = require('../../assets/images/activeAddIcon.png')
const add = require('../../assets/images/addIcon.png')


export default function ChatScreen({ navigation, route }) {
    let listViewRef;


    const data = route.params.data
    let chat = data.chat
    // console.log('chat from prev screen is ', chat)

    const [currentUser, setCurrentUser] = useState(null)
    const [openModal, setOpenModal] = useState(false);
    const [openModal3, setOpenModal3] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [openModal4, setOpenModal4] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [thumbnail, setThumnail] = useState(null);
    const [selectedMedia, setselectedMedia] = useState(null);
    const [selectedMediaType, setselectedMediaType] = useState(null);
    const [recording, setRecording] = useState();
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [openImage, setOpenImage] = useState(null);
    const [loadImage, setLoadImage] = useState(false);

    const iceBreakers = [
        {
            id: 1,
            text: "Dream travel destination?"
        },
        {
            id: 2,
            text: "Favorite weekend getaway?"
        },
        {
            id: 3,
            text: "Dream dinner Spot?"
        },
    ]



    async function startRecording() {
        try {
            if (permissionResponse.status !== 'granted') {
                console.log('Requesting permission..');
                await requestPermission();
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync(
            {
                allowsRecordingIOS: false,
            }
        );
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
    }

    async function SubscribeChatEvents() {
        let channel = `chat-channel-${chat.id}`;
        console.log("Subscribing Event ", channel);
        const pusher = Pusher.getInstance();

        await pusher.init({
            apiKey: "404f727e86e2044ed1f4",
            cluster: "us3"
        });

        await pusher.connect();
        await pusher.subscribe({
            channelName: channel,
            onEvent: (event) => {
                console.log(`Event received: ${event}`);
                let newMessage = JSON.parse(event.data);
                console.log("New message received: ", newMessage);

                setMessages(prevMessages => {
                    console.log("Previous messages: ", prevMessages);

                    // Check if the message already exists
                    const messageExists = prevMessages.some(item => item.timestamp === newMessage.timestamp);

                    // If the message exists, update it
                    if (messageExists) {
                        return prevMessages.map(item =>
                            item.timestamp === newMessage.timestamp ? newMessage.message : item
                        );
                    } else {
                        // If the message does not exist, add it to the array
                        return [...prevMessages, newMessage.message];
                    }
                });
            }
        });
    }
    const closeModal2 = () => {
        setOpenModal2(false)
    }
    const closeModal = () => {
        setOpenModal(false)
    }
    const closeModal3 = () => {
        console.log("Closing modal 3")
        setOpenModal3(false)
    }

    useEffect(() => {
        console.log("latest messages array is ", messages)
    }, [messages])


    useEffect(() => {
        //call getmessages api
        getMessages()
        // createChat()
        SubscribeChatEvents()
    }, [])

    const fromCurrentUser = (message) => {
        if (currentUser && currentUser.user.id === message.userId) {
            return true
        }
        return false
    }

    const getMessages = async () => {
        console.log('trying to get messages')
        const data = await AsyncStorage.getItem("USER")

        try {
            if (data) {
                console.log('chat id ', chat.id)
                let d = JSON.parse(data)
                setCurrentUser(d)
                const ApiUrl = `https://plurawlapp.com/soulmatch/api/chat/get_messages?chatId=${chat.id}`
                console.log(ApiUrl)
                const result = await fetch(ApisPath.ApiGetMessages + `?chatId=${chat.id}`, {
                    method: 'get',
                    headers: {
                        'Authorization': 'Bearer ' + d.token,
                        'Content-Type': 'application/json',
                    }
                })
                if (result) {
                    let json = await result.json()
                    if (json.status === true) {
                        console.log('get messages list is', json.data)
                        let mess = []
                        setMessages(json.data)
                        // json.data.forEach(msg => {
                        //     console.log('id is', msg.userId, d.user.id )
                        //     if (msg.userId === d.user.id) {
                        //         console.log('mesaage is', msg + d.user.id)
                        //         setMessages(prevMesg => [...prevMesg, { message]);
                        //     }else{
                        //         setMessages(prevMesg => [...prevMesg, { from: 'freind', message: msg,  }]);

                        //     }
                        // });
                        // setMessages(prevMesg => [...prevMesg, ...json.data.map((msg, index) => ({ from: 'friend', message: msg, id: `${chat.id}-${index}` }))]);
                    } else {
                        console.log('get message json message is', json.message)
                    }
                }
            }
        } catch (e) {
            console.log('error finding in get messages ', e)
        }

    }

    const sendMessage = async (message) => {
        if (!message) {
            return;
        }

        let time = moment().toISOString();
        const newMessage = { userId: currentUser.user.id, timestamp: time, content: message, id: `${chat.id}-${messages.length}` };

        setMessages(prevMesg => [...prevMesg, newMessage]);
        setMessage('');
        try {
            console.log('trying to send message');
            const data = await AsyncStorage.getItem("USER")
                ;
            if (data) {
                let d = JSON.parse(data);
                let body = JSON.stringify({
                    chatId: chat.id,
                    content: message,
                    timestamp: time
                });
                const result = await fetch(ApisPath.ApiSendMessage, {
                    method: 'post',
                    headers: {
                        'Authorization': 'Bearer ' + d.token,
                        'Content-Type': 'application/json',
                    },
                    body: body
                });
                if (result) {
                    let json = await result.json();
                    if (json.status === true) {
                        console.log('message sent ', json.data);

                    } else {
                        console.log('message sent json message', json.message);
                    }
                }
            }
        } catch (e) {
            console.log('error finding in send message', e);
        }
    };


    const sendMedia = async (selectedMedia) => {

        let time = moment().toISOString();
        console.log('selected midia is', selectedMedia)
        const newMessage = { userId: currentUser.user.id, timestamp: time, image_url: selectedMedia.media, thumb_url: selectedMedia.thumbnail, id: `${chat.id}-${messages.length}` };

        setMessages(prevMesg => [...prevMesg, newMessage]);


        // return
        try {
            const data = await AsyncStorage.getItem("USER")

            if (data) {
                console.log('trying to send media')
                let d = JSON.parse(data)
                const formdata = new FormData()

                formdata.append("chatId", chat.id);
                formdata.append("timestamp", time)
                formdata.append("media", {
                    name: "media.jpg",
                    uri: selectedMedia.media,
                    type: selectedMedia.type === "video" ? "video" : 'image/jpeg',
                });

                if (selectedMedia.type === "video") {

                    formdata.append("thumbnail", {
                        name: "thumbnail.jpg",
                        uri: selectedMedia.thumbnail,
                        type: 'image/jpeg',
                    });
                }
                // console.log('form data is', selectedMedia.thumbnail)
                const result = await fetch(ApisPath.ApiSenMedia, {
                    method: 'post',
                    headers: {
                        'Authorization': 'Bearer ' + d.token,
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formdata
                })

                if (result) {
                    console.log('api called')
                    let json = await result.json()
                    if (json.status === true) {
                        console.log('media send data is', json.data)
                    } else {
                        console.log('media send message is', json.message)
                    }
                }
            }
        } catch (e) {
            console.log('error finding in send media ', e)
        }
    }


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (event) => {
                setMessages(prevMessages => [...prevMessages, { from: "none", id: `${chat.id}-${messages.length}loading` }]);
            }
        );
        // Remove the listener when component unmounts
        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);


    const pickMedia = async () => {

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
            // setPopup2(true)
            let thumb = await generateThumbnail(ImageUrl)
            setThumnail(thumb)
            setselectedMedia(result.assets[0].uri)
            setselectedMediaType(result.assets[0].type)
            const selectedMedia = {
                media: ImageUrl, thumbnail: thumb, type: result.assets[0].type
            }
            setOpenModal(false)
            sendMedia(selectedMedia)

            console.log(result.assets[0].uri);
        } else {
            // setPopup(false)
            setOpenModal(false)

        }
    }

    const captureMedia = async () => {
        setOpenModal(false)
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
            const ImageUrl = result.assets[0].uri;
            // setPopup2(true)
            let thumb = await generateThumbnail(ImageUrl)
            setThumnail(thumb)
            console.log("Thumbnail is")
            setselectedMedia(result.assets[0].uri)
            setselectedMediaType(result.assets[0].type)

        }
    };

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

    const getMessageType = (item) => {
        if (item.thumb_url) {
            return "video"
        } else if (item.image_url) {
            return "image"
        } else if (item.content) {
            return "text"
        }
    }


    const renderItem = (item) => {
        // console.log('item is', item)
        if (fromCurrentUser(item)) {
            if (getMessageType(item) === "text") {
                return (
                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>

                        <View style={{
                            backgroundColor: colors.blueColor, padding: 10, marginLeft: '45%', borderRadius: 5,
                            marginTop: 5, marginRight: "5%", maxWidth: '50%', alignSelf: 'flex-end', borderRadius: 20,

                            // width: 207 / 430 * width, backgroundColor: colors.blueColor, marginTop: 15, borderRadius: 18,
                            // paddingHorizontal: 12, paddingVertical: 8, gap: 3, alignItems: 'flex-start', flexDirection: 'column'
                        }}>
                            <Text style={{ fontSize: 14, fontFamily: customFonts.regular, color: 'white' }}>
                                {item.content}
                            </Text>
                            <View style={styles.rightArrow}></View>
                            <View style={styles.rightArrowOverlap}></View>
                            <Text style={{
                                fontSize: 10, fontFamily: customFonts.regular, textAlign: 'right', width: 175 / 430 * width,
                                paddingRight: 10 / 430 * width, color: 'white'
                            }}>
                                {moment(item.createdAt).format('h:mm')}
                            </Text>
                        </View>

                    </View>
                )
            }
            else if (getMessageType(item) === "video") {
                console.log("This is video message")
                return (
                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>

                        <View style={{
                            backgroundColor: colors.transparent, padding: 10, marginLeft: '45%', borderRadius: 5,
                            marginTop: 5, marginRight: "5%", maxWidth: '50%', alignSelf: 'flex-end', borderRadius: 20,

                            // width: 207 / 430 * width, backgroundColor: colors.blueColor, marginTop: 15, borderRadius: 18,
                            // paddingHorizontal: 12, paddingVertical: 8, gap: 3, alignItems: 'flex-start', flexDirection: 'column'
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("VideoPlayer", {
                                        data: {
                                            url: item.image_url
                                        }
                                    })
                                }}
                            >
                                <Image source={{ uri: item.thumb_url }}
                                    style={{ height: 200, width: 200, backgroundColor: colors.transparent,borderRadius:10 }}
                                />
                                <Image source={require('../../assets/images/playIcon.png')}
                                    style={{ height: 50, width: 50, position: 'absolute', bottom: 80 / 930 * height, left: 80 / 430 * width }}
                                />
                            </TouchableOpacity>

                            {/* <View style={styles.rightArrow}></View>
                            <View style={styles.rightArrowOverlap}></View> */}
                            <Text style={{
                                fontSize: 10, fontFamily: customFonts.regular, textAlign: 'right', width: 175 / 430 * width,
                                paddingRight: 10 / 430 * width
                            }}>
                                {moment(item.createdAt).format('h:mm')}
                            </Text>

                        </View>

                    </View>
                )
            }
            else if (getMessageType(item) === "image") {
                return (
                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>

                        <View style={{
                            backgroundColor: colors.transparent, padding: 10, marginLeft: '45%', borderRadius: 5,
                            marginTop: 5, marginRight: "5%", maxWidth: '50%', alignSelf: 'flex-end', borderRadius: 20,

                            // width: 207 / 430 * width, backgroundColor: colors.blueColor, marginTop: 15, borderRadius: 18,
                            // paddingHorizontal: 12, paddingVertical: 8, gap: 3, alignItems: 'flex-start', flexDirection: 'column'
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setOpenImage(item.image_url)
                                }}
                            >
                                <Image source={{ uri: item.image_url }}
                                    style={{ height: 200, width: 200, resizeMode: 'cover', borderRadius: 20 }}
                                    onLoadStart={() => {
                                        setLoadImage(true)
                                    }}
                                    onLoadEnd={() => {
                                        setLoadImage(false)
                                    }}
                                />

                                {/* {
                                        loadImage?(
                                            <View>
                                                <ActivityIndicator size={'small'} color={colors.blueColor} 
                                                style = {{marginTop:-100/930*height}}/>
                                            </View>
                                        ):null
                                    } */}
                            </TouchableOpacity>
                            {/* <View style={styles.rightArrow}></View>
                            <View style={styles.rightArrowOverlap}></View> */}
                            <Text style={{
                                fontSize: 10, fontFamily: customFonts.regular, textAlign: 'right', width: 175 / 430 * width,
                                paddingRight: 10 / 430 * width
                            }}>
                                {moment(item.createdAt).format('h:mm')}
                            </Text>
                        </View>

                    </View>
                )
            }
        }
        else {

            if (getMessageType(item) === "text") {
                return (
                    <View style={{ alignItems: 'flex-start', width: width - 50, marginTop: 10 }}>

                     <View style={{
                        backgroundColor: "#F5F5F5", padding: 10, borderRadius: 5, marginTop: 5, marginLeft: "5%",
                        maxWidth: '50%', alignSelf: 'flex-start', borderRadius: 20,
                        //maxWidth: 500,
                        //padding: 14,
                        //alignItems:"center",

                    }}>
                            <Text style={{ fontSize: 14, fontFamily: customFonts.regular, }}>
                                {item.content}
                            </Text>
                            <View style={styles.leftArrow}></View>
                            <View style={styles.leftArrowOverlap}></View>
                            <Text style={{
                                fontSize: 10, fontFamily: customFonts.regular, textAlign: 'right', width: 175 / 430 * width,
                                paddingRight: 10 / 430 * width, color: 'black'
                            }}>
                                {moment(item.createdAt).format('h:mm')}
                            </Text>
                        </View>

                    </View>
                )
            } else if (getMessageType(item) === "video") {
                console.log("This is video message")
                return (
                    <View style={{ alignItems: 'flex-start', width: width - 50, marginTop: 10 }}>

                             <View style={{
                                backgroundColor:colors.transparent, padding: 10, borderRadius: 5, marginTop: 5, marginLeft: "5%",
                                maxWidth: '50%', alignSelf: 'flex-start', borderRadius: 20,
                                //maxWidth: 500,
                                //padding: 14,
                                //alignItems:"center",
        
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("VideoPlayer", {
                                        data: {
                                            url: item.image_url
                                        }
                                    })
                                }}
                            >
                                <Image source={{ uri: item.thumb_url }}
                                    style={{ height: 200, width: 200, backgroundColor: colors.transparent }}
                                />
                                <Image source={require('../../assets/images/playIcon.png')}
                                    style={{ height: 50, width: 50, position: 'absolute', bottom: 80 / 930 * height, left: 50 / 430 * width }}
                                />
                            </TouchableOpacity>

                            {/* <View style={styles.rightArrow}></View>
                            <View style={styles.rightArrowOverlap}></View> */}
                            <Text style={{
                                fontSize: 10, fontFamily: customFonts.regular, textAlign: 'right', width: 175 / 430 * width,
                                paddingRight: 10 / 430 * width
                            }}>
                                {moment(item.createdAt).format('h:mm')}
                            </Text>

                        </View>

                    </View>
                )
            } else if (getMessageType(item) === "image") {
                return (
                    <View style={{ alignItems: 'flex-start', width: width - 50, marginTop: 10 }}>

                             <View style={{
                                backgroundColor: colors.transparent, padding: 10, borderRadius: 5, marginTop: 5, marginLeft: "5%",
                                maxWidth: '50%', alignSelf: 'flex-start', borderRadius: 20,
                                //maxWidth: 500,
                                //padding: 14,
                                //alignItems:"center",
        
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setOpenImage(item.image_url)
                                }}
                            >
                                <Image source={{ uri: item.image_url }}
                                    style={{ height: 200, width: 200, resizeMode: 'cover', borderRadius: 20 }}
                                    onLoadStart={() => {
                                        setLoadImage(true)
                                    }}
                                    onLoadEnd={() => {
                                        setLoadImage(false)
                                    }}
                                />

                                {/* {
                                        loadImage?(
                                            <View>
                                                <ActivityIndicator size={'small'} color={colors.blueColor} 
                                                style = {{marginTop:-100/930*height}}/>
                                            </View>
                                        ):null
                                    } */}
                            </TouchableOpacity>
                            {/* <View style={styles.rightArrow}></View>
                            <View style={styles.rightArrowOverlap}></View> */}
                            <Text style={{
                                fontSize: 10, fontFamily: customFonts.regular, textAlign: 'right', width: 175 / 430 * width,
                                paddingRight: 10 / 430 * width
                            }}>
                                {moment(item.createdAt).format('h:mm')}
                            </Text>
                        </View>

                    </View>
                )
            }

            // return (
            //     <View style={{ alignItems: 'flex-start', width: width - 50, marginTop: 10 }}>

            //         <View style={{
            //             backgroundColor: "#F5F5F5", padding: 10, borderRadius: 5, marginTop: 5, marginLeft: "5%",
            //             maxWidth: '50%', alignSelf: 'flex-start', borderRadius: 20,
            //             //maxWidth: 500,
            //             //padding: 14,
            //             //alignItems:"center",

            //         }}>
            //             <Text style={{ fontSize: 14, fontFamily: customFonts.regular }}>
            //                 {item.content ? item.content : item.content}
            //             </Text>
            //             <View style={styles.leftArrow}></View>
            //             <View style={styles.leftArrowOverlap}></View>
            //             <Text style={{
            //                 fontSize: 10, fontFamily: customFonts.regular, textAlign: 'right', width: 175 / 430 * width,
            //                 paddingRight: 10 / 430 * width
            //             }}>
            //                 {moment(item.createdAt).format('h:mm')}
            //             </Text>
            //         </View>
            //     </View>
            // )
        }
    }




    return (


        <View style={{ alignItems: 'center', height: height, backgroundColor: 'white' }}>

            <View style={{
                backgroundColor: 'white', height: 120 / 930 * height, width: width, shadowColor: '#000', shadowOffset: {
                    width: 0,
                    height: 5
                }, shadowRadius: 5, shadowOpacity: 0.04,
            }}>
                <View style={{
                    alignItems: 'flex-end', flexDirection: 'row', height: 120 / 930 * height, width: width - 50 / 430 * width, alignSelf: 'center', paddingBottom: 13 / 930 * height,
                    justifyContent: 'space-between',
                }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row', width: width - 50 / 430 * width, justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', gap: 15 / 430 * width }}>
                            <TouchableOpacity onPress={() => {
                                if (data.from === "Match") {
                                    navigation.pop(2)
                                    return
                                }
                                navigation.goBack()
                            }}>
                                <View style={GlobalStyles.backBtn}>
                                    <Image source={require('../../assets/images/backArrow.png')}
                                        style={GlobalStyles.backBtnImage}
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("ProfileDetail", {
                                    fromScreen: "ChatScreen"
                                })
                            }}>
                                <View style={{ alignItems: 'center', flexDirection: 'row', gap: 12 / 430 * width }}>
                                    <Image source={{ uri: chat.users[0].profile_image }}
                                        style={{ height: 46 / 930 * height, width: 46 / 930 * height, borderRadius: 25 }}
                                    />

                                    <Text numberOfLines={1} style={{
                                        fontSize: 20, fontFamily: customFonts.meduim, width: 170 / 430 * width,
                                    }}>
                                        {chat.users[0].first_name} {chat.users[0].last_name}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 / 430 * width }}>
                            <TouchableOpacity>
                                <Image source={require('../../assets/images/videoCall.png')}
                                    style={GlobalStyles.backBtnImage}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setOpenModal2(true)
                            }}>
                                <Image source={openModal2 ? activeMore : more}
                                    style={GlobalStyles.backBtnImage}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
            <MoreOptionsPopup visible={openModal2} close={closeModal2} handleMenu={(menu) => {

                if (menu === "Block") {
                    console.log("Menu selected is ", menu)
                    closeModal2()
                    setOpenModal3(true)
                } else if (menu === "Report") {
                    console.log("Menu selected is ", menu)

                    navigation.navigate('ReportChat')
                    closeModal2()
                } else if (menu === "InviteDate") {
                    console.log("Menu selected is ", menu)

                    navigation.navigate('InviteDateFromChatScreen')
                    closeModal2()
                }
            }} />

            <Modal
                visible={openModal3}
                transparent={true}
                animationType='slide'
            >
                <TouchableWithoutFeedback onPress={() => {
                    setOpenModal3(false)
                }}
                >
                    <View style={{ height: height, width: width, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000050' }}>

                        <View style={{
                            backgroundColor: 'white', justifyContent: 'space-between', gap: 15 / 930 * height,
                            alignItems: 'flex-start', borderRadius: 10, paddingHorizontal: 25, paddingVertical: 25,
                        }}>
                            <Text style={{ fontSize: 20, fontFamily: customFonts.meduim }}>Block Sarah Doe?</Text>
                            <Text style={{ fontSize: 14, fontFamily: customFonts.regular }}>Are you sure you want to block Sarah Doe?</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: 320 / 430 * width, justifyContent: 'space-between', alignSelf: 'center', marginTop: 10 }}>
                                <TouchableOpacity onPress={() => { setOpenModal3(false) }}
                                    style={{
                                        width: 150 / 430 * width, alignItems: 'center', justifyContent: 'center',
                                        borderWidth: 1, borderRadius: 10, borderColor: '#000', paddingVertical: 12, paddingHorizontal: 16,
                                    }}
                                >
                                    <Text style={{ fontSize: 14, fontFamily: customFonts.meduim }}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { setOpenModal3(false) }}
                                    style={{
                                        alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 16,
                                        borderRadius: 10, backgroundColor: '#E01F1F', width: 150 / 430 * width
                                    }}
                                >
                                    <Text style={{ fontSize: 14, fontFamily: customFonts.meduim, color: 'white' }}>Yes, block</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            {/* <View style={{ alignItems: 'center', height: height * 0.75, }}> */}

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ height: height * 0.87, }}
            >

                {/* <View style={{ height: height * 0.77, width: width - 50, alignItems: 'center', justifyContent: 'flex-end' }}>
                    


                </View> */}

                <FlatList
                    showsVerticalScrollIndicator={false}
                    ref={(ref) => {
                        listViewRef = ref;
                    }}
                    onContentSizeChange={() => {
                        console.log("Content size changed")
                        if (listViewRef !== null) {
                            listViewRef._listRef._scrollRef.scrollToEnd({ animated: true })
                        }
                        setMessages(prevMessages => {

                            let array = prevMessages.filter((item) => {
                                return item.from !== "none"
                            })

                            return array
                        });
                    }}
                    data={messages}
                    renderItem={({ item }) => (renderItem(item))}

                />

                {
                    messages.length === 0 ? (
                        <>
                            <Text style={{ fontSize: 14, textAlign: 'center' }}>Select an ice breaker</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, width: width - 50, marginTop: 25 / 930 * height }}>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {
                                        iceBreakers.map((item) => (
                                            <TouchableOpacity onPress={() => {
                                                sendMessage(item.text)
                                            }}>
                                                <View style={{
                                                    paddingVertical: 12 / 930 * height, paddingHorizontal: 14 / 430 * height, borderWidth: 1, borderRadius: 50,
                                                    borderColor: colors.greyText, marginLeft: 10
                                                }}
                                                >
                                                    <Text style={{ fontSize: 16, color: colors.blueColor }}>{item.text}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            </View>

                        </>
                    ) : null
                }


                <View style={{
                    flexDirection: 'row', alignItems: 'center', height: 90 / 930 * height, backgroundColor: 'transparent',
                    width: width, justifyContent: 'center', paddingHorizontal: 10, gap: 8
                }}>
                    <TouchableOpacity onPress={() => {
                        setOpenModal(true)
                    }}>
                        <Image source={openModal ? activeAdd : add}
                            style={{ height: 24, width: 24 }}
                        />
                    </TouchableOpacity>

                    {/* <AddButtonPopup visible={openModal} close={closeModal} /> */}

                    <View style={{
                        width: 246 / 430 * width, backgroundColor: '#f5f5f5', paddingVertical: 10, borderRadius: 10,
                        paddingHorizontal: 16,
                    }}>
                        <TextInput placeholder='Send message....' value={message}

                            multiline
                            onChangeText={(item) => {
                                setMessage(item)
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={recording ? stopRecording : startRecording}
                    >
                        <Image source={require('../../assets/images/micIcon.png')}
                            style={{ height: 24, width: 24, tintColor: recording ? colors.blueColor : 'black' }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => sendMessage(message)}
                    >
                        <Image source={message ? activeImage : inactiveImage}
                            style={{ height: 52, width: 52, }}
                        />
                    </TouchableOpacity>

                    {/* add buutton popup */}

                    <Modal
                        visible={openModal}
                        transparent={true}
                        animationType='fade'
                    >
                        <TouchableWithoutFeedback onPress={() => {
                            setOpenModal(false)
                        }}>
                            <View style={{ height: height, width: width, }}>

                                <View style={{
                                    shadowColor: colors.blueColor, shadowOffset: {
                                        width: 3,
                                        height: 3
                                    }, shadowRadius: 10, shadowOpacity: 0.3,
                                    height: 100 / 930 * height, width: 180 / 430 * width, backgroundColor: 'white', position: 'absolute', bottom: 75, left: 30,
                                    alignItems: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 / 430 * width,
                                }}>
                                    <View style={{ flexDirection: 'column', alignItems: 'center', gap: 10 / 930 * height }}>
                                        <TouchableOpacity onPress={() => {
                                            captureMedia()
                                        }}>
                                            <Image source={require('../../assets/images/camera.png')}
                                                style={{ height: 52 / 930 * height, width: 52 / 930 * height, }}
                                            />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 14 / 930 * height, fontFamily: customFonts.regular }}>Camera</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'center', gap: 10 / 930 * height }}>
                                        <TouchableOpacity onPress={() => {
                                            pickMedia()
                                        }}>
                                            <Image source={require('../../assets/images/gallery.png')}
                                                style={{ height: 52 / 930 * height, width: 52 / 930 * height, }}
                                            />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 14 / 930 * height, fontFamily: customFonts.regular }}>Gallery</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                    </Modal>

                    {/* open image modal */}

                    <Modal
                        visible={openImage !== null}
                        animationType='fade'
                        transparent={true}
                    >

                        <View style={{ height: height, width: width, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ height: height * 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: 'grey', position: 'absolute', top: 0, borderRadius: 50, height: 40, width: 40, right: 10,
                                        alignItems: 'center', justifyContent: 'center'
                                    }}
                                    onPress={() => {
                                        setOpenImage(null)
                                    }} >
                                    <Image source={require('../../assets/images/close.png')}
                                        style={{ height: 30, width: 30 }}
                                    />
                                </TouchableOpacity>
                                <Image source={{ uri: openImage }}
                                    style={{ height: height * 0.5, width: width - 30, borderRadius: 5 }}
                                />
                            </View>
                        </View>
                    </Modal>
                </View>


            </KeyboardAvoidingView>
        </View>
    )
}
const styles = StyleSheet.create({
    rightArrow: {
        position: "absolute",
        backgroundColor: colors.blueColor,
        //backgroundColor:"red",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomLeftRadius: 25,
        right: -10
    },

    rightArrowOverlap: {
        position: "absolute",
        backgroundColor: "white",
        //backgroundColor:"green",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomLeftRadius: 18,
        right: -20
    },
    leftArrow: {
        position: "absolute",
        backgroundColor: "#F5F5F5",
        //backgroundColor:"red",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomRightRadius: 25,
        left: -10
    },

    leftArrowOverlap: {
        position: "absolute",
        backgroundColor: "#fff",
        //backgroundColor:"green",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomRightRadius: 18,
        left: -20
    }
})
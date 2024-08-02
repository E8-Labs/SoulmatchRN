import {
    View, Text, Dimensions, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleSheet,
    TextInput, Modal, TouchableWithoutFeedback, Keyboard,
    ScrollView, ActivityIndicator,
    DeviceEventEmitter
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import customFonts from '../../assets/fonts/Fonts'
import colors from '../../assets/colors/Colors'
import MoreOptionsPopup from '../../Components/MoreOptionsPopup'
import { Image } from 'expo-image'
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    Pusher,
    PusherMember,
    PusherChannel,
    PusherEvent,
} from '@pusher/pusher-websocket-react-native';
import ApisPath from '../../lib/ApisPath/ApisPath';
import { Ionicons } from '@expo/vector-icons';
import VoiceMessagePlayer from '../../Components/VoiceMessagePlayer'
import { ImageViewer } from '../../Components/ImageViewer'
import { getProfile } from '../../Services/ProfileServices/GetProfile'
import { BroadcastEvents, placholder } from '../../models/Constants'
import { ShowMessage } from '../../Services/Snakbar/ShowMessage'



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

    console.log('user from messages list screen', data.chat)

    const [currentUser, setCurrentUser] = useState(null)
    const [openModal, setOpenModal] = useState(false);
    const [openModal3, setOpenModal3] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [thumbnail, setThumnail] = useState(null);
    const [loading, setLoading] = useState(false)
    const [recording, setRecording] = useState();
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [openImage, setOpenImage] = useState(false);
    const [loadImage, setLoadImage] = useState(false);
    const [recordingPopup, setRecordingPopup] = useState(false);
    const [visible, setIsVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState(null)
    const [user, setUser] = useState(null)

    // useEffect(()=>{
    //     console.log("Image url changed ", imageUrl)
    // }, [imageUrl])


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
                await requestPermission();
            }
            else {
                if (recording) {
                    console.warn('Recording is already in progress');
                    return;
                }

                setRecordingPopup(true);
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });

                const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
                setRecording(recording);
            }

        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        setRecording(undefined);
        setRecordingPopup(false);

        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
        const uri = recording.getURI();
        console.log("Recorded message ", uri)

        let time = moment().toISOString();
        let media = { voice: uri }
        sendMedia(media, true)
        // const newMessage = { userId: currentUser.user.id, timestamp: time, content: "", voice: uri, id: `${chat.id}-${messages.length}` };
        // setMessages(prevMesg => [...prevMesg, newMessage]);
    }

    const pusherRef = useRef(null);
    const pusher = '';
    let channel = '';

    async function SubscribeChatEvents(chatId, setMessages) {
        channel = `chat-channel-${chatId}`;
        console.log("Subscribing Event ", channel);
        pusher = Pusher.getInstance();

        await pusher.init({
            apiKey: "404f727e86e2044ed1f4",
            cluster: "us3"
        });

        await pusher.connect();
        let sub = await pusher.subscribe({
            channelName: channel,
            onEvent: (event) => {
                console.log(`Event received: ${event}`);
                let newMessage = JSON.parse(event.data);

                setMessages(prevMessages => {
                    const messageExists = prevMessages.some(item => item.timestamp === newMessage.timestamp);

                    if (messageExists) {
                        return prevMessages.map(item =>
                            item.timestamp === newMessage.timestamp ? newMessage.message : item
                        );
                    } else {
                        return [...prevMessages, newMessage.message];
                    }
                });
            },
            onSubscriptionSucceeded: (event) => {
                console.log("Subscribed success ", event)
            }
        });
        console.log("Event response ", sub)
        return () => {
            pusher
            pusher.subscribe(channel)
            pusher.disconnect()
        };
    }

    const closeModal2 = () => {
        setOpenModal2(false)
    }
    const closeModal = () => {
        setOpenModal(false)
    }
    const closeModal3 = () => {
        setOpenModal3(false)
    }

    useEffect(() => {
        //console.log("latest messages array is ", messages)
    }, [messages])

    useEffect(() => {
        const getMessages = async () => {
            const data = await AsyncStorage.getItem("USER")
            try {
                if (data) {
                    let d = JSON.parse(data)
                    setCurrentUser(d)
                    const ApiUrl = `https://plurawlapp.com/soulmatch/api/chat/get_messages?chatId=${chat.id}`
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
                            setMessages(json.data)
                        }
                    }
                }
            } catch (e) {
                //console.log('error finding in get messages ', e)
            }
        };

        getMessages();

        (async () => {
            if (pusherRef.current) {
                console.log('Disconnecting pusher')
                await pusherRef.current.unsubscribe(`chat-channel-${chat.id}`);
                pusherRef.current.disconnect();
            }

            pusherRef.current = await SubscribeChatEvents(chat.id, setMessages);
        })();

        return () => {
            if (pusherRef.current) {
                console.log('Disconnecting pusher unsub')
                pusherRef.current.unsubscribe(`chat-channel-${chat.id}`);
                pusherRef.current.disconnect();
            }
        }
    }, []);

    const fromCurrentUser = (message) => {
        if (currentUser && currentUser.user.id === message.userId) {
            // console.log('message from me')
            return true
        }
        return false
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
            const data = await AsyncStorage.getItem("USER");
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
                        //console.log('message sent ', json.data);
                    }
                }
            }
        } catch (e) {
            //console.log('error finding in send message', e);
        }
    };

    const sendMedia = async (selectedMedia, voice = false) => {
        let time = moment().toISOString();
        let newMessage = {}
        if (voice) {
            console.log("Sending Voice message")
            newMessage = {
                userId: currentUser.user.id, timestamp: time, image_url: null,
                thumb_url: null, voice: selectedMedia.voice, id: `${chat.id}-${messages.length}`
            };
        }
        else {
            newMessage = {
                userId: currentUser.user.id, timestamp: time, image_url: selectedMedia.media,
                thumb_url: selectedMedia.thumbnail, image_width: 200, image_height: 200, id: `${chat.id}-${messages.length}`
            };
        }

        setMessages(prevMesg => [...prevMesg, newMessage]);

        try {
            const data = await AsyncStorage.getItem("USER");
            if (data) {
                let d = JSON.parse(data);
                const formdata = new FormData();

                formdata.append("chatId", chat.id);
                formdata.append("timestamp", time);
                if (voice) {
                    formdata.append("media", {
                        name: "voice.m4a",
                        uri: selectedMedia.voice,
                        type: "audio/m4a",
                    });
                }
                else {
                    formdata.append("media", {
                        name: "media.jpg",
                        uri: selectedMedia.media,
                        type: selectedMedia.type === "video" ? "video" : 'image/jpeg',
                    });
                }

                if (selectedMedia.type === "video") {
                    formdata.append("thumbnail", {
                        name: "thumbnail.jpg",
                        uri: selectedMedia.thumbnail,
                        type: 'image/jpeg',
                    });
                }
                const result = await fetch(ApisPath.ApiSenMedia, {
                    method: 'post',
                    headers: {
                        'Authorization': 'Bearer ' + d.token,
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formdata
                })

                if (result) {

                    let json = await result.json();
                    console.log("Media Message Sent ", json)
                    if (json.status === true) {
                        //console.log('media send data is', json.data);
                    }
                }
            }
        } catch (e) {
            console.log('error finding in send media ', e);
        }
    }

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
            let thumb = await generateThumbnail(ImageUrl);
            setThumnail(thumb);
            // setselectedMedia(result.assets[0].uri);
            // setselectedMediaType(result.assets[0].type);
            const selectedMedia = {
                media: ImageUrl, thumbnail: thumb, type: result.assets[0].type
            }
            setOpenModal(false);
            sendMedia(selectedMedia);
        } else {
            setOpenModal(false);
        }
    }

    const captureMedia = async () => {
        // setOpenModal(false);
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
            let thumb = await generateThumbnail(ImageUrl);
            setThumnail(thumb);
            // setselectedMedia(result.assets[0].uri);
            // setselectedMediaType(result.assets[0].type);
            const selectedMedia = {
                media: ImageUrl, thumbnail: thumb, type: result.assets[0].type
            }
            setOpenModal(false);
            sendMedia(selectedMedia);
        } else {
            setOpenModal(false)
        }
    };

    const blockUser = async () => {
        console.log('trying to block')
        const data = await AsyncStorage.getItem("USER")

        // DeviceEventEmitter.emit(BroadcastEvents.EventBlock, {message: "User Blocked"})
        // setOpenModal3(false)
        // navigation.goBack()
        setLoading(true)
        // return
        try {
            if (data) {
                let d = JSON.parse(data)
                let body = JSON.stringify({
                    blockedUserId: chat.users[0].id,
                    blockReason: ''
                })
                const result = await fetch(ApisPath.ApiBlockUser, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + d.token
                    },
                    body: body
                })

                if (result) {
                    setLoading(false)
                    let json = await result.json()
                    if (json.status === true) {
                        console.log('user blocked',)
                        // ShowMessage("User blocked successfully")
                        DeviceEventEmitter.emit(BroadcastEvents.EventBlock, { message: "User Blocked" })
                        setOpenModal3(false)
                        navigation.goBack()
                    } else {
                        console.log('block user message is', json.message)
                    }
                }
            }
        } catch (e) {
            setLoading(false)
            console.log('error finding in block user', e)
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
            return uri;
        } catch (e) {
            //console.log(e);
            return null;
        }
    };


    const getMessageType = (item) => {
        if (item.voice) {
            return "voice"
        }
        else if (item.thumb_url) {
            return "video"
        } else if (item.image_url) {
            return "image"
        } else if (item.content) {
            return "text"
        }
    }

    const voiceBubbal = (item) => {

        <View style={[styles.voicecontainer, styles.fromMe]}>
            <View style={styles.messageContent}>
                <Text style={styles.messageText}>{item.message}</Text>
            </View>

        </View>


    }

    const renderItem = (item) => {
        let imageHeight = 200;
        let imageWidth = width * 0.7;
        if (item.image_width !== null && item.image_height !== null) {
            imageHeight = item.image_height * imageWidth / item.image_width;
        }
        const type = getMessageType(item)
        if (fromCurrentUser(item)) {
            if (type === "voice") {
                // console.log('voice uri is', item.timestamp)
                return (
                    <VoiceMessagePlayer uri={item.voice} timestamp={item.timestamp} />
                )
            }
            if (getMessageType(item) === "text") {
                return (
                    <View style={{ alignItems: 'flex-end', marginTop: 10,width: width}}>
                        <View style={{
                            backgroundColor: colors.blueColor, padding: 10,
                            marginTop: 5, marginRight: "5%", maxWidth: '70%', alignSelf: 'flex-end', borderRadius: 11, borderBottomEndRadius: 15
                        }}>
                            <Text style={{ fontSize: 14, fontFamily: customFonts.regular, color: 'white' }}>
                                {item.content}
                            </Text>
                            <View style={styles.rightArrow}></View>
                            <View style={styles.rightArrowOverlap}></View>

                        </View>
                        <Text style={{
                            fontSize: 10, fontFamily: customFonts.regular, textAlign: 'right',
                            paddingRight: 20 / 430 * width, color: 'grey', paddingTop: 3
                        }}>
                            {moment(item.createdAt).format('h:mm')}
                        </Text>
                    </View>
                )
            }
            else if (getMessageType(item) === "video") {
                return (
                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                        <View style={{
                            backgroundColor: colors.transparent, padding: 10, marginLeft: '45%', borderRadius: 5,
                            marginTop: 5, marginRight: "5%", maxWidth: '75%', alignSelf: 'flex-end', borderRadius: 20,
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
                                    style={{ height: 200, width: 200, backgroundColor: colors.transparent, borderRadius: 10 }}
                                />
                                <Image source={require('../../assets/images/playIcon.png')}
                                    style={{ height: 50, width: 50, position: 'absolute', bottom: 80 / 930 * height, left: 80 / 430 * width }}
                                />
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 10, fontFamily: customFonts.regular, textAlign: 'right',
                                marginTop: 10 / 430 * width, color: 'grey'
                            }}>
                                {moment(item.createdAt).format('h:mm')}
                            </Text>
                        </View>
                    </View>
                )
            }
            else if (getMessageType(item) === "image") {
                return (
                    <View style={{ alignItems: 'flex-end', marginTop: 10, width: width }}>
                        <View style={{
                            backgroundColor: colors.transparent, padding: 10, borderRadius: 5,
                            marginTop: 5, marginRight: "2%", alignSelf: 'flex-end', borderRadius: 20,
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setImageUrl(item.image_url)
                                    setOpenImage(true)
                                }}
                            >
                                <Image source={{ uri: item.image_url }}
                                    style={{ height: imageHeight, width: imageWidth, resizeMode: 'cover', borderRadius: 20 }}
                                    onLoadStart={() => {

                                        setLoadImage(true)
                                    }}
                                    onLoadEnd={() => {
                                        setLoadImage(false)
                                    }}
                                />
                                {
                                    loadImage ? (
                                        <View>
                                            <ActivityIndicator size={'small'} color={colors.blueColor}
                                                style={{ marginTop: -100 / 930 * height }} />
                                        </View>
                                    ) : null
                                }
                            </TouchableOpacity>

                            <ImageViewer swipeToCloseEnabled={true} visible={imageUrl !== null} close={() => { setImageUrl(null) }} url={imageUrl} />
                            <Text style={{
                                fontSize: 10, fontFamily: customFonts.regular, textAlign: 'right',
                                paddingTop: 10 / 430 * width, color: 'grey'
                            }}>
                                {moment(item.createdAt).format('h:mm')}
                            </Text>
                        </View>
                    </View>
                )
            }
        }
        else {
            if (type === "voice") {
                // console.log('voice uri is', item.createdAt)
                return (
                    <VoiceMessagePlayer uri={item.voice} timestamp={item.createdAt} fromMe={false} />
                )
            }
            if (getMessageType(item) === "text") {
                return (
                    <View style={{ alignItems: 'flex-start', width: width - 50, marginTop: 10 }}>
                        <View style={{
                            backgroundColor: "#F5F5F5", padding: 10, borderRadius: 11, borderBottomStartRadius: 15, marginTop: 5, marginLeft: "5%",
                            maxWidth: '70%', alignSelf: 'flex-start',
                        }}>
                            <Text style={{ fontSize: 14, fontFamily: customFonts.regular, }}>
                                {item.content}
                            </Text>
                            <View style={styles.leftArrow}></View>
                            <View style={styles.leftArrowOverlap}></View>

                        </View>
                        <Text style={{
                            fontSize: 10, fontFamily: customFonts.regular, textAlign: 'right',
                            paddingLeft: 20 / 430 * width, color: 'grey', paddingTop: 3
                        }}>
                            {moment(item.createdAt).format('h:mm')}
                        </Text>
                    </View>
                )
            } else if (getMessageType(item) === "video") {
                return (
                    <View style={{ alignItems: 'flex-start', width: width - 50, marginTop: 10 }}>
                        <View style={{
                            backgroundColor: colors.transparent, padding: 10, borderRadius: 5, marginTop: 5, marginLeft: "5%",
                            maxWidth: '70%', alignSelf: 'flex-start', borderRadius: 20,
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
                                    style={{ height: 200, width: 200, backgroundColor: colors.transparent, borderRadius: 20 }}
                                />
                                <Image source={require('../../assets/images/playIcon.png')}
                                    style={{ height: 50, width: 50, position: 'absolute', bottom: 80 / 930 * height, left: 80 / 430 * width }}
                                />
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 10, fontFamily: customFonts.regular, textAlign: 'right',
                                paddingTop: 10 / 430 * width, color: 'grey'
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
                            backgroundColor: colors.transparent, padding: 10, borderRadius: 5, maxWidth: '70%',
                            marginTop: 5, marginRight: "2%", alignSelf: 'flex-start', borderRadius: 20
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setImageUrl(item.image_url)
                                    setOpenImage(true)
                                }}
                            >
                                <Image source={{ uri: item.image_url }}
                                    style={{ height: imageHeight, width: imageWidth, resizeMode: 'cover', borderRadius: 20 }}
                                    onLoadStart={() => {
                                        setLoadImage(true)
                                    }}
                                    onLoadEnd={() => {
                                        setLoadImage(false)
                                    }}
                                />
                                {
                                    loadImage ? (
                                        <View>
                                            <ActivityIndicator size={'small'} color={colors.blueColor}
                                                style={{ marginTop: -100 / 930 * height }} />
                                        </View>
                                    ) : null
                                }
                            </TouchableOpacity>
                            <ImageViewer swipeToCloseEnabled={true} visible={imageUrl !== null} close={() => { setImageUrl(null) }} url={imageUrl} />
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: imageWidth }}>
                                <Text style={{
                                    fontSize: 10, fontFamily: customFonts.regular, textAlign: 'right',
                                    paddingTop: 10 / 430 * width, paddingRight: 5, color: 'grey'
                                }}>
                                    {moment(item.createdAt).format('h:mm')}
                                </Text>
                            </View>
                        </View>
                    </View>
                )
            }
        }
    }

    const handleGoBack = () => {
        if (data.from === "Match") {
            navigation.pop(2)
            return
        }
        console.log('last message is ', messages[messages.length - 1])
        // return
        route.params.LastMessage(messages[messages.length - 1])
        navigation.goBack()
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
                                handleGoBack()
                            }}>
                                <View style={GlobalStyles.backBtn}>
                                    <Image source={require('../../assets/images/backArrow.png')}
                                        style={GlobalStyles.backBtnImage}
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                // navigation.navigate("SelectedProfile", {
                                //     data:{
                                //         user:user,
                                //         from:'ChatScreen'
                                //     }
                                // })
                            }}>
                                <View style={{ alignItems: 'center', flexDirection: 'row', gap: 12 / 430 * width }}>
                                    <Image source={chat.users[0] ? { uri: chat.users[0].profile_image } : placholder}
                                        style={{ height: 46 / 930 * height, width: 46 / 930 * height, borderRadius: 25 }}
                                    />
                                    <Text numberOfLines={1} style={{
                                        fontSize: 20, fontFamily: customFonts.meduim, width: 170 / 430 * width,
                                    }}>
                                        {chat.users[0] && chat.users[0].first_name} {chat.users[0] && chat.users[0].last_name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 / 430 * width }}>
                            <TouchableOpacity style = {{opacity:0}}>
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
                    closeModal2();
                    setOpenModal3(true);
                } else if (menu === "Report") {
                    navigation.navigate('ReportChat', {
                        userId: chat.users[0] && chat.users[0].id
                    });
                    closeModal2();
                } else if (menu === "InviteDate") {
                    navigation.navigate('InviteDateFromChatScreen', {
                        data: {
                            userId: chat.users[0] && chat.users[0].id
                        }
                    });
                    closeModal2();
                }
            }} />
            <Modal
                visible={openModal3}
                transparent={true}
                animationType='slide'
            >
                <TouchableWithoutFeedback onPress={() => {
                    setOpenModal3(false)
                }}>
                    <View style={{ height: height, width: width, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000050' }}>
                        <View style={{
                            backgroundColor: 'white', justifyContent: 'space-between', gap: 15 / 930 * height,
                            alignItems: 'flex-start', borderRadius: 10, paddingHorizontal: 25, paddingVertical: 25,
                        }}>
                            <Text style={{ fontSize: 20, fontFamily: customFonts.meduim }}>Block {chat.users[0] && chat.users[0].first_name} {chat.users[0] && chat.users[0].last_name}?</Text>
                            <Text style={{ fontSize: 14, fontFamily: customFonts.regular }}>Are you sure you want to block {chat.users[0] && chat.users[0].first_name} {chat.users[0] && chat.users[0].last_name}?</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: 320 / 430 * width, justifyContent: 'space-between', alignSelf: 'center', marginTop: 10 }}>
                                <TouchableOpacity onPress={() => { setOpenModal3(false) }}
                                    style={{
                                        width: 150 / 430 * width, alignItems: 'center', justifyContent: 'center',
                                        borderWidth: 1, borderRadius: 10, borderColor: '#000', paddingVertical: 12, paddingHorizontal: 16,
                                    }}
                                >
                                    <Text style={{ fontSize: 14, fontFamily: customFonts.meduim }}>Cancel</Text>
                                </TouchableOpacity>
                                {
                                    loading ? (
                                        <ActivityIndicator color={colors.blueColor} size={'small'} style={{ width: 150 / 430 * width }} />
                                    ) : (
                                        <TouchableOpacity onPress={() => {
                                            blockUser()
                                        }}
                                            style={{
                                                alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 16,
                                                borderRadius: 10, backgroundColor: '#E01F1F', width: 150 / 430 * width
                                            }}
                                        >
                                            <Text style={{ fontSize: 14, fontFamily: customFonts.meduim, color: 'white' }}>Yes, block</Text>
                                        </TouchableOpacity>
                                    )
                                }

                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ height: height * 0.87, }}
            >
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ref={(ref) => {
                        listViewRef = ref;
                    }}
                    onContentSizeChange={() => {
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
                    !chat.users[0] && chat.users[0].blockedByMe || chat.users[0] && chat.users[0].blockedMe ? (
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
                    ) : null
                }

                {
                    chat.users[0] && chat.users[0].blockedMe ? (
                        <View style={{ height: 70 / 930 * height, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 14, fontFamily: customFonts.meduim, color: colors.blueColor }}>
                                This user has blocked you
                            </Text>
                        </View>
                    ) : (chat.users[0] && chat.users[0].blockedByMe ? (
                        <View style={{ height: 70 / 930 * height, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 14, fontFamily: customFonts.meduim, color: colors.blueColor }}>
                                You have blocked this user
                            </Text>
                        </View>
                    ) : (
                        < View style={{
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

                            {/* record voice popup */}
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={recordingPopup}
                                onRequestClose={() => { }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <TouchableOpacity style={styles.stopButton} >
                                            <Image source={require('../../assets/images/recordinAnimations.gif')}
                                                style={{ height: 50, width: 80 }}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.modalText}>Recording...</Text>
                                        <TouchableOpacity style={{ marginTop: 20 }}
                                            onPress={() => {
                                                stopRecording()
                                            }}
                                        >
                                            <Image source={require('../../assets/images/micIcon.png')}
                                                style={{ height: 30, width: 30, tintColor: 'red' }}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </Modal>


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
                        </View>
                    ))
                }

            </KeyboardAvoidingView >
        </View >
    )
}
const styles = StyleSheet.create({
    rightArrow: {
        position: "absolute",
        backgroundColor: colors.blueColor,
        width: 20,
        height: 20,
        bottom: 0,
        borderBottomLeftRadius: 25,
        right: -10
    },
    rightArrowOverlap: {
        position: "absolute",
        backgroundColor: "white",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomLeftRadius: 18,
        right: -20
    },
    leftArrow: {
        position: "absolute",
        backgroundColor: "#F5F5F5",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomRightRadius: 25,
        left: -10
    },
    leftArrowOverlap: {
        position: "absolute",
        backgroundColor: "#fff",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomRightRadius: 18,
        left: -20
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // width:300
    },
    modalView: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
        width: 300 / 430 * width,
        height: 180 / 930 * height


    },
    stopButton: {
        marginBottom: 20,
    },
    modalText: {
        color: '#333333',
        textAlign: 'center',
        fontSize: 16,
    }, voicecontainer: {
        maxWidth: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    fromMe: {
        alignSelf: 'flex-end',
        backgroundColor: '#007AFF',
    },
    messageContent: {
        flex: 1,
    },
    messageText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    playButton: {
        marginLeft: 8,
        padding: 8,
        backgroundColor: '#4CD964',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

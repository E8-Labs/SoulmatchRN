import {
    View, Text, Dimensions, FlatList, TouchableOpacity, Settings, ActivityIndicator,
    Animated, Easing, StyleSheet, TextInput, Keyboard, DeviceEventEmitter
} from 'react-native'
import { Image } from 'expo-image';
import React, { useCallback, useState, useEffect, useRef } from 'react'
import colors from '../../assets/colors/Colors';
import customFonts from '../../assets/fonts/Fonts';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import ApisPath from '../../lib/ApisPath/ApisPath';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { BroadcastEvents } from '../../models/Constants';

const placholder = require('../../assets/images/imagePlaceholder.webp')

const { height, width } = Dimensions.get('window');
const profile = require('../../assets/images/profileImage.png')
const searchIcon = require('../../assets/images/searchIcon.png')
const closeIcon = require('../../assets/images/close.png')


export default function MessagesList({ navigation }) {

    const searchWidth = useRef(new Animated.Value(0)).current; // Initial width of the search field
    const searchOpacity = useRef(new Animated.Value(0)).current;
    const textInputRef = useRef(null);

    const [messageList, setMesssageList] = useState([])
    const [loadImage, setLoadImage] = useState(false)
    const [showIndicator, setShowIndicator] = useState(false)
    const [user, setUser] = useState(false)
    const [showKeyboard, setShowKeyboard] = useState(false)
    const [search, setSearch] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [filteredMessages, setFilteredMessages] = useState([]);

    useEffect(() => {
        const listener = DeviceEventEmitter.addListener(BroadcastEvents.EventCreateChat, (data) => {
            console.log('chat object received from broad cast', data)
            getMessagesList()


        })
        return () => {
            listener.remove()
        }
    }, [])

    useEffect(() => {
        console.log("Fitlered messages chagned ", filteredMessages)
    }, [filteredMessages])

    useEffect(() => {
        getMessagesList()
        console.log('rearranged messasges list is', messageList)
    }, [])


    const searchUserName = (search) => {
        setSearch(search);
        setIsSearching(true);

        if (search.trim() === '') {
            setFilteredMessages(messageList); // Show all messages if search is empty
        } else {
            const filtered = messageList.filter((chat) => {
                let user = chat.users[0]
                if (user.first_name.toLowerCase().includes(search.toLowerCase()) || user.last_name.toLowerCase().includes(search.toLowerCase())) {
                    return chat
                }
            }
            );
            console.log("Filtered chats are", filtered)
            setFilteredMessages(filtered); // Update filtered messages
        }
    };

    const getLastMessageObject = (lastMsg) => {
        console.log('last message from chat screen is', lastMsg)

        if (lastMsg) {
            const index = messageList.findIndex(message => message.id === lastMsg.chatId)
            if (index !== -1) {
                let chat = messageList[index];
                console.log('chat found at  ', index)
                // if (typeof messageList[index] != 'undefined') {
                messageList[index].lastMessage = lastMsg
                // }
            }
            let at = 0
            messageList.sort((a, b) => {
                console.log(`-----------------${at}------------------`)
                console.log("A ", a)
                console.log("B ", b)
                console.log('-----------------------------------')
                at += 1
                if (a.lastMessage && b.lastMessage) {
                    return new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
                }
                return false
            });
        }
    }


    const handleOnPress = (item) => {
        readAllMessages(item)
        navigation.navigate("ChatScreen", {
            data: {
                chat: item,
                from: 'message'
            },
            LastMessage: getLastMessageObject
        })


    }

    const getMessagesList = async () => {
        setShowIndicator(true)
        const data = await AsyncStorage.getItem("USER")

        try {
            console.log('trying to get messages list')
            if (data) {
                let d = JSON.parse(data)

                const result = await fetch(ApisPath.ApiGetMessagesList, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + d.token
                    }
                })

                if (result) {
                    setShowIndicator(false)
                    let json = await result.json()
                    if (json.status === true) {
                        console.log('get messages list is', json.data)
                        setMesssageList(json.data)
                        setFilteredMessages(json.data)

                    } else {
                        console.log('json message is', json.message)

                    }
                }
            }
        } catch (error) {
            console.log('error finding in get messages list ', error)
        }
    }

    const readAllMessages = async (item) => {

        // console.log('item is', item)
        // return

        const data = await AsyncStorage.getItem("USER")
        try {
            if (data) {
                let d = JSON.parse(data)


                let body = JSON.stringify({
                    chatid: item.id
                })

                const result = await fetch(ApisPath.ApiReadAll, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + d.token
                    },
                    body: body
                })

                if (result) {
                    let json = await result.json()

                    if (json.status === true) {
                        item.unread = 0
                        console.log('all messages readed ')
                    } else {
                        console.log('json message of read all messages is', json.message)
                    }
                }
            }
        } catch (e) {
            console.log('error finding in read messages is', e)
        }

    }


    const getLastMessage = (item) => {
        let message = item.lastMessage
        if (message) {
            if (message.content) {
                return message.content
            } else if (message.voice) {
                return "Voice message"
            } else if (message.thumb_url) {
                return "Video"
            } else if (message.image_url) {
                return "Image"
            }
        }
    }


    const handleSearchPress = () => {

        if (isSearching) {
            Keyboard.dismiss()
            setSearch('')
            textInputRef.current?.setNativeProps({ text: '' });
            setShowKeyboard(false)
        } else {
            setShowKeyboard(true)
            textInputRef.current?.focus()
        }
        setIsSearching(prev => !prev)

        Animated.parallel([
            Animated.timing(searchWidth, {
                toValue: isSearching ? 0 : 260 / 430 * width, // Change 250 to the desired width of the search field
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
            Animated.timing(searchOpacity, {
                toValue: isSearching ? 0 : 1, // Change opacity for smooth transition
                duration: 50,
                delay: isSearching ? 300 : 30,
                easing: Easing.linear,
                useNativeDriver: false,
            })
        ]).start();
    }

    const renderEmptyListComponent = () => (
        <View style={{ alignItems: 'center', width: width, height: height * 0.76, justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, fontFamily: customFonts.meduim, color: 'grey' }}>
                {isSearching ? 'No matches found' : 'No chats'}
            </Text>
        </View>
    );

    const height = 900; // Adjust height as needed to fit all items
    const width = 430; // Adjust width as needed
    const itemCount = 9; // Number of times to repeat the circle and rectangle

    const circleRadius = 30;
    const circleX = 50; // X position of the circle
    const circleYStart = 30; // Y position of the first circle
    const rectX = 90; // X position of the rectangle
    const rectYStart = 20; // Y position of the first rectangle
    const gapBetweenItems = 80; // Vertical gap between each circle-rectangle pair



    const renderItems = () => {
        return Array.from({ length: itemCount }).map((_, index) => (
            <React.Fragment key={index}>
                <Circle
                    cx={circleX}
                    cy={circleYStart + index * gapBetweenItems}
                    r={circleRadius}
                />
                <Rect
                    x={rectX}
                    y={circleYStart + index * gapBetweenItems - circleRadius + 10}
                    rx={5}
                    ry={5}
                    width={200}
                    height={10}
                />
                <Rect
                    x={rectX}
                    y={circleYStart + index * gapBetweenItems - circleRadius + 35}
                    rx={5}
                    ry={5}
                    width={100}
                    height={10}
                />
            </React.Fragment>
        ));
    };



    return (

        <View style={{ width: width, height: height, alignItems: 'center' }}>

            <View style={{ alignItems: 'center', height: height, backgroundColor: 'white' }}>

                <View style={{
                    backgroundColor: '#fff', height: 110 / 930 * height, width: width, shadowColor: 'grey', shadowOffset: {
                        width: 0,
                        height: 5
                    }, shadowRadius: 5, shadowOpacity: 0.4,
                }}>
                    <View style={{
                        alignItems: 'flex-end', flexDirection: 'row', height: 110 / 930 * height, width: width - 50, alignSelf: 'center', paddingBottom: 10,
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{ fontSize: 23, fontFamily: customFonts.meduim }}>Messages</Text>
                        <Animated.View style={[styles.searchContainer, { width: searchWidth, opacity: searchOpacity }]}>
                            <View style={styles.searchInput}>
                                <TextInput
                                    style={{ width: 200 / 430 * width, backgroundColor: 'transparent' }}
                                    ref={textInputRef}
                                    autoCorrect={false} autoComplete='none'
                                    spellCheck={false}
                                    placeholder="Search"
                                    placeholderTextColor="#aaa"
                                    autoFocus={showKeyboard}
                                    Value={search}
                                    onChangeText={searchUserName}

                                // onFocus={() => setShowKeyboard(true)}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        handleSearchPress()
                                        // setSearch('')
                                    }}
                                >
                                    <Image source={closeIcon}
                                        style={{ height: 20, width: 20 }}
                                    />
                                </TouchableOpacity>

                            </View>
                        </Animated.View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                            {
                                !isSearching &&
                                <TouchableOpacity style={{ paddingBottom: 0 }}
                                    onPress={() => {
                                        handleSearchPress()
                                    }}
                                >
                                    <Image source={searchIcon}
                                        style={GlobalStyles.backBtnImage}
                                    />
                                </TouchableOpacity>
                            }
                            <TouchableOpacity>
                                <Image source={require('../../assets/images/moreIcon.png')}
                                    style={GlobalStyles.backBtnImage}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'center', width: width, height: height * 0.76, paddingBottom: 10, backgroundColor: 'white' }}>
                    {
                        showIndicator ? (
                            <ContentLoader
                                height={height}
                                width={width}
                                speed={1}
                                backgroundColor={'#D5D0F6'}
                                foregroundColor={'#ececec'}
                            // viewBox="0 0 380 70"

                            >
                                {renderItems()}
                            </ContentLoader>
                        ) : (
                            filteredMessages && filteredMessages.length > 0 ? (
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={filteredMessages}
                                    renderItem={({ item }) => (
                                        <>
                                            <TouchableOpacity onPress={() => handleOnPress(item)} >
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 60, alignSelf: 'center', paddingTop: 20, }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                                        <Image source={item.users[0] ? { uri: item.users[0].profile_image } : placholder}
                                                            onLoadStart={() => {
                                                                setLoadImage(true)
                                                            }}
                                                            onLoadEnd={() => {
                                                                setLoadImage(false)
                                                            }}
                                                            style={{
                                                                resizeMode: 'cover', height: 46 / 930 * height, width: 46 / 930 * height,
                                                                opacity: item.unread ? 100 : 0.8, borderRadius: 25
                                                            }}
                                                        />
                                                        {
                                                            loadImage ? (
                                                                <View style={{
                                                                    height: 46 / 930 * height, width: 46 / 430 * width, marginLeft: -50, alignItems: 'center', justifyContent: 'center'
                                                                }}>
                                                                    <ActivityIndicator style={{}} size={'small'} color={colors.blueColor} />
                                                                </View>
                                                            ) : null
                                                        }

                                                        <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 3 }}>
                                                            <Text style={{ fontSize: 14, fontFamily: customFonts.meduim, color: item.unread ? "#000" : colors.unreadColor }}>
                                                                {item.users[0] && item.users[0].first_name} {item.users[0] && item.users[0].last_name}
                                                            </Text>
                                                            <Text numberOfLines={1} lineBreakMode='tail' style={{
                                                                fontSize: 12, fontFamily: customFonts.regular, width: 230 / 430 * width, color: item.unread ? "#000" : colors.unreadColor
                                                            }}>
                                                                {getLastMessage(item)}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                                                        <Text style={{ fontSize: 12, fontFamily: customFonts.regular, color: item.unread ? "#000" : colors.unreadColor }}>
                                                            {item.lastMessage ? moment(item.lastMessage.createdAt).format('h:mm A') : ''}
                                                        </Text>
                                                        {
                                                            item.unread ? (
                                                                <View style={{ backgroundColor: colors.blueColor, height: 20, borderRadius: 50, width: 20, alignItems: 'center', justifyContent: 'center' }}>
                                                                    <Text style={{ fontSize: 10, fontFamily: customFonts.meduim, color: 'white' }}>{item.unread}</Text>
                                                                </View>
                                                            ) : ''
                                                        }
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                            <View style={[GlobalStyles.divider]}></View>
                                        </>



                                    )}

                                />
                            ) : (
                                renderEmptyListComponent()
                            )

                        )
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        alignSelf: 'center',
        overflow: 'hidden',
        marginLeft: 10,
        marginRight: 10,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: 280 / 430 * width,
        marginTop: 60 / 930 * height
    },
    searchInput: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})
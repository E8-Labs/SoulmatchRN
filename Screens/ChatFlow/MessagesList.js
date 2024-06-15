import { View, Text, Dimensions, FlatList, TouchableOpacity, Settings, ActivityIndicator } from 'react-native'
import { Image } from 'expo-image';
import React, { useCallback, useState } from 'react'
import colors from '../../assets/colors/Colors';
import customFonts from '../../assets/fonts/Fonts';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import ApisPath from '../../lib/ApisPath/ApisPath';
import { useEffect } from 'react';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('window');
const profile = require('../../assets/images/profileImage.png')

export default function MessagesList({ navigate }) {

    const [messageList, setMesssageList] = useState([])
    const [loadImage, setLoadImage] = useState(false)
    const [showIndicator, setShowIndicator] = useState(false)
    const [user, setUser] = useState(false)
useFocusEffect(
    useCallback(()=>{
        getMessagesList()
    },[])
)


    const getMessagesList = async () => {
        setShowIndicator(true)
        const data =await AsyncStorage.getItem("USER")

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

                    } else {
                        console.log('json message is', json.message)

                    }
                }
            }
        } catch (error) {
            console.log('error finding in get messages list ', error)
        }
    }



    return (
        <View style={{ width: width, height: height, alignItems: 'center' }}>

            <View style={{ flexDirection: 'column', alignItems: 'center', width: width, height: height * 0.76, paddingBottom: 10, backgroundColor: 'white' }}>
                {
                    showIndicator ? (
                        <View style={{ alignItems: 'center', width: width, height: height * 0.76, justifyContent: 'center' }}>
                            <ActivityIndicator color={colors.blueColor} size={'large'} />
                        </View>
                    ) : (
                        messageList && messageList.length > 0 ? (
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={messageList}
                                renderItem={({ item }) => (
                                    <>
                                        <TouchableOpacity onPress={() => {
                                            navigate(item)
                                        }} >
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 60, alignSelf: 'center', paddingTop: 20, }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                                    <Image source={{ uri: item.users[0].profile_image }}
                                                        onLoadStart={() => {
                                                            setLoadImage(true)
                                                        }}
                                                        onLoadEnd={() => {
                                                            setLoadImage(false)
                                                        }}
                                                        style={{
                                                            resizeMode: 'cover', height: 46 / 930 * height, width: 46 / 430 * width,
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
                                                            {item.users[0].first_name} {item.users[0].last_name}
                                                        </Text>
                                                        <Text numberOfLines={1} lineBreakMode='tail' style={{
                                                            fontSize: 12, fontFamily: customFonts.regular, width: 230 / 430 * width, color: item.unread ? "#000" : colors.unreadColor
                                                        }}>
                                                            {item.lastMessage ? item.lastMessage.content : ''}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                                                    <Text style={{ fontSize: 12, fontFamily: customFonts.regular, color: item.unread ? "#000" : colors.unreadColor }}>
                                                        {moment(item.createdAt).format('h:mm A')}
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
                            <View style = {{ alignItems: 'center', width: width, height: height * 0.76, justifyContent: 'center'}}>
                                <Text style = {{fontSize:20}}>No chats</Text>
                            </View>
                        )

                    )
                }
            </View>
        </View>
    )
}
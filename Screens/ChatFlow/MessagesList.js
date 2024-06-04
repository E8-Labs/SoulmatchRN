import { View, Text, Dimensions, FlatList, Image, TouchableOpacity, Settings } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/Colors';
import customFonts from '../../assets/fonts/Fonts';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import ApisPath from '../../lib/ApisPath/ApisPath';
import { useEffect } from 'react';

const { height, width } = Dimensions.get('window');
const profile = require('../../assets/images/profileImage.png')

export default function MessagesList({ navigate }) {

useEffect(()=>{
    getMessagesList()
},[])

    const messagesList = [
        {
            id: 1,
            name: "Sarah Doe",
            profileImage: profile,
            time: "12:25 AM",
            unread: 8,
            lastMessage: "Haha, yes I’ve seen your profile you are very interesting personality"
        },
        {
            id: 2,
            name: "Sarah Doe",
            profileImage: profile,
            time: "12:25 AM",
            unread: 12,
            lastMessage: "Haha, yes I’ve seen your profile you are very interesting personality"
        },
        {
            id: 3,
            name: "Sarah Doe",
            profileImage: profile,
            time: "12:25 AM",
            unread: 0,
            lastMessage: "Haha, yes I’ve seen your profile you are very interesting personality"
        },
        {
            id: 4,
            name: "Sarah Doe",
            profileImage: profile,
            time: "12:25 AM",
            unread: 0,
            lastMessage: "Haha, yes I’ve seen your profile you are very interesting personality"
        },
        {
            id: 5,
            name: "Sarah Doe",
            profileImage: profile,
            time: "12:25 AM",
            unread: 0,
            lastMessage: "Haha, yes I’ve seen your profile you are very interesting personality"
        },
        {
            id: 6,
            name: "Sarah Doe",
            profileImage: profile,
            time: "12:25 AM",
            unread: 0,
            lastMessage: "Haha, yes I’ve seen your profile you are very interesting personality"
        },
        {
            id: 7,
            name: "Sarah Doe",
            profileImage: profile,
            time: "12:25 AM",
            unread: 0,
            lastMessage: "Haha, yes I’ve seen your profile you are very interesting personality"
        },
        {
            id: 8,
            name: "Sarah Doe",
            profileImage: profile,
            time: "12:25 AM",
            unread: 0,
            lastMessage: "Haha, yes I’ve seen your profile you are very interesting personality"
        },
        {
            id: 9,
            name: "Sarah Doe",
            profileImage: profile,
            time: "12:25 AM",
            unread: 0,
            lastMessage: "Haha, yes I’ve seen your profile you are very interesting personality"
        },
        {
            id: 10,
            name: "Sarah Doe",
            profileImage: profile,
            time: "12:25 AM",
            unread: 0,
            lastMessage: "Haha, yes I’ve seen your profile you are very interesting personality"
        },
        {
            id: 11,
            name: "Sarah Doe",
            profileImage: profile,
            time: "12:25 AM",
            unread: 0,
            lastMessage: "Haha, yes I’ve seen your profile you are very interesting personality"
        },
        {
            id: 12,
            name: "Sarah Doe",
            profileImage: profile,
            time: "12:25 AM",
            unread: 0,
            lastMessage: "Haha, yes I’ve seen your profile you are very interesting personality"
        },
    ]


    const getMessagesList = async () => {
        const data = Settings.get('USER')
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
                    let json = await result.json()
                    if (json.status === true) {
                        console.log('get messages list is', json.data)
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
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={messagesList}
                    renderItem={({ item }) => (
                        <>
                            <TouchableOpacity onPress={() => {
                                navigate(item)
                            }} >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 60, alignSelf: 'center', paddingTop: 20, }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                        <Image source={item.profileImage}
                                            style={{ resizeMode: 'contain', height: 46 / 930 * height, width: 46 / 430 * width, opacity: item.unread ? 100 : 0.8 }}
                                        />

                                        <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 3 }}>
                                            <Text style={{ fontSize: 14, fontFamily: customFonts.meduim, color: item.unread ? "#000" : colors.unreadColor }}>
                                                {item.name}
                                            </Text>
                                            <Text numberOfLines={1} lineBreakMode='tail' style={{
                                                fontSize: 12, fontFamily: customFonts.regular, width: 230 / 430 * width, color: item.unread ? "#000" : colors.unreadColor
                                            }}>
                                                {item.lastMessage}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                                        <Text style={{ fontSize: 12, fontFamily: customFonts.regular, color: item.unread ? "#000" : colors.unreadColor }}>
                                            {item.time}
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
            </View>
        </View>
    )
}
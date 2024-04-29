import { View, Text, Dimensions, FlatList, Image } from 'react-native'
import React from 'react'

const { height, width } = Dimensions.get('window');
const profile = require('../../assets/images/profileImage.png')

export default function MessagesList() {



    const messagesList = [
        {
            id: 1,
            name: "Sarah Doe",
            profileImage: profile,
            time: "12:25 AM",
            unread: 5,
            lastMessage: "Haha, yes I’ve seen your profile...."
        }
    ]
    return (
        <View style={{ marginTop: 50, width: width, height: height, alignItems: 'center' }}>
            <Text>hello world</Text>
            <View style={{ flexDirection: 'column', alignItems: 'center', width: width - 60 }}>
                <FlatList
                    data={messagesList}
                    renderItem={({ item }) => (

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 60, alignSelf: 'center', }}>
                            <Image source={item.profileImage}
                                style={{ height: 46 / 930 * height, width: 46 / 430 * width }}
                            />
                            <Text>{item.name}</Text>
                            <View style={{ flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                                
                            </View>
                        </View>

                    )}

                />
            </View>
        </View>
    )
}
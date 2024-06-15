import { View, Text, SafeAreaView, Modal, Dimensions, TouchableOpacity, Settings, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image';

import customFonts from '../assets/fonts/Fonts';
import GlobalStyles from '../assets/styles/GlobalStyles';
import ApisPath from '../lib/ApisPath/ApisPath';
import colors from '../assets/colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
const placholder = require('../assets/images/imagePlaceholder.webp')

const { height, width } = Dimensions.get('window');
const profile = require('../assets/images/card1.png');

export default function InviteDatePopup({ visible, close }) {

    const [myMatch, setMyMatch] = useState([])
    const [loadImage, setloadImage] = useState(false)
    const [error, setError] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        getMyMatches()
    }, [])

    const getMyMatches = async () => {
        console.log('getting my matches')
        const data =await AsyncStorage.getItem("USER")

        try {
            if (data) {
                let d = JSON.parse(data)

                const result = await fetch(ApisPath.ApiGetMyMatche, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + d.token
                    }
                })
                if (result) {
                    let json = await result.json()

                    if (json.status === true) {
                        console.log('my matches are', json.data)
                        setMyMatch(json.data)
                    } else {
                        console.log('json message is', json.message)
                    }
                }
            }
        } catch (error) {
            console.log('error finding in getting my matchs', error)
        }

    }

    return (

        <Modal
            visible={visible}
            transparent={true}
            animationType='slide'
        >
            <View style={{ backgroundColor: '#00000050', height: height, width: width, alignItems: 'center', justifyContent: 'flex-end' }}>
                <View style={{ alignItems: 'center', height: height * 0.7, backgroundColor: 'white', width: width, borderRadius: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 50, paddingTop: 20 }}>
                        <Text style={{ fontFamily: customFonts.meduim, fontSize: 20 }}>Invite your date</Text>
                        <TouchableOpacity
                            onPress={() => close()}
                        >
                            <Image source={require('../assets/images/close.png')}
                                style={{ height: 30 / 930 * height, width: 30 / 930 * height }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[GlobalStyles.divider, { width: width }]}></View>

                    <View style ={{height:390/930*height}}>
                        {
                            myMatch && myMatch.length > 0 ?(
                                 <FlatList
                            data={myMatch&&myMatch}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={{ 
                                    alignItems: 'center',marginLeft: 20 ,borderWidth:2 , borderRadius: 10,
                                    borderColor:selectedUser&&selectedUser.id === item.id?colors.blueColor:'white',padding:5
                                    }}>
                                    <TouchableOpacity style={{ }}
                                        onPress = {()=>{
                                            setError(null)
                                            setSelectedUser(item)
                                        }}
                                    >
                                        <Image source={item.profile_image?{uri:item.profile_image}:placholder}
                                             onLoadStart={() => { setloadImage(true) }}
                                             onLoadEnd={() => {
                                                 setloadImage(false)
                                             }}
                                            style={{
                                                height: 370 / 930 * height, width: 360 / 430 * width, resizeMode: 'cover', borderRadius: 10,
                                                marginTop: 0 / 930 * height
                                            }}
                                        />
                                        {
                                            loadImage ? (
                                                <ActivityIndicator style = {{position:'absolute',bottom:130,left:150}} size = {'large'} color = {colors.blueColor} />
                                            ):null
                                        }
                                    </TouchableOpacity>
                                    <Text style={{
                                        fontSize: 24, fontFamily: customFonts.meduim, position: 'relative', bottom: 45, left: 20, color: 'white',
                                        width: width - 50
                                    }}>
                                        {item.first_name} {item.last_name}
                                    </Text>
                                </View>
                            )}
                        />
                            ):(
                                <Text style = {{fontSize:20,alignSelf:'center',marginTop:30}}>You can not go on a date alone</Text>
                            )
                        }
                       
                    </View>
                    {
                        error && <Text style = {GlobalStyles.errorText}>{error}</Text>
                    }



                    <TouchableOpacity style={[GlobalStyles.reqtengularBtn,{marginTop:50/930*height}]}
                        onPress={() => {
                            if(!selectedUser){
                                setError("Select an user")
                                return
                            }
                            close(selectedUser)
                        }}
                    >
                        <Text style={GlobalStyles.btnText}>
                            Invite
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        </Modal>

    )
}
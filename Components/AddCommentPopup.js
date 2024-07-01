import { View, Text, Dimensions, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import customFonts from '../assets/fonts/Fonts'
import GlobalStyles from '../assets/styles/GlobalStyles'
import colors from '../assets/colors/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ApisPath from '../lib/ApisPath/ApisPath'

const { height, width } = Dimensions.get('window')
const likeImage = require('../assets/images/like.png');
const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';



export default function AddCommentPopup({ item, close }) {

    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    // console.log('item from ', item)


    const sendComment = async () => {

        console.log('item is', item)
        // close(true)
        // return

        if (!comment) {
            setError("Enter comment")
            return
        }

        try {

            const data = await AsyncStorage.getItem("USER")
            setLoading(true)

            if (data) {
                let d = JSON.parse(data)
                let body = JSON.stringify({
                    user_id: item.UserId,
                    status: 'liked',
                    answerId: item.id,
                    comment: comment
                })

                console.log('body is ', body)

                const result = await fetch(ApisPath.ApiLikeProfile, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + d.token
                    },
                    body: body
                })
                if (result) {
                    let json = await result.json()
                    setLoading(false)

                    if (json.status === true) {
                        console.log('comment successfuly send', json.data)
                        close(true)
                    } else {
                        console.log('json message of send comment is ', json.message)
                    }
                }
            }
        } catch (e) {
            console.log('error finding in send comment', e)
        }

    }

    return (
        <View style={{ height: height, width: width, backgroundColor: '#00000050', alignItems: 'center', justifyContent: 'center' }} >
            <View style={{
                justifyContent: 'center', width: width - 40, alignItems: 'center', backgroundColor: 'white',
                borderRadius: 10, paddingHorizontal: 20, paddingVertical: 20
            }}>
                <View key={item.id} style={{
                    borderWidth: 1, borderColor: colors.greyText, padding: 16, borderRadius: 10, width: width - 70,
                    marginTop: 22 / 930 * height,
                }}>
                    <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, color: '#000' }}>
                        {item.title}
                    </Text>
                    <Text style={{ fontSize: 16, fontFamily: customFonts.regular, color: '#4D4D4D' }}>
                        {item.text}
                    </Text>
                    {
                        item.answerImage ? (
                            <>
                                <Image
                                    source={{ uri: item.answerImage }}
                                    style={{ height: 230 / 930 * height, width:  330/430*width, borderRadius: 10, marginTop: 8 }}
                                    // onLoadEnd={() => {
                                    //     setLoadImage3(false)
                                    // }}
                                    // onLoadStart={() => {
                                    //     setLoadImage3(true)
                                    // }}
                                    placeholder={blurhash}
                                    contentFit="cover"
                                    transition={1000}
                                />
                                {/* 
                            {
                                loadImage3 ? (
                                    <ActivityIndicator size={'small'} color={colors.blueColor} style={{ position: 'absolute', bottom: 100, left: 180 / 430 * width }} />
                                ) : <></>
                            } */}
                                {/* <TouchableOpacity style={{
                                alignSelf: 'flex-end', position: 'absolute', bottom: 26, right: 40 / 430 * width, backgroundColor: '#fff',
                                borderRadius: 30,
                            }}
                                onPress={() => {
                                    handleOnpress(item)
                                }}
                            > */}
                                <View style={[GlobalStyles.likeBtn,{alignSelf:'flex-end',marginTop:15}]}>
                                    <Image source={likeImage} style={{ height: 27, width: 27, backgroundColor: 'transparent' }} />
                                </View>
                                {/* </TouchableOpacity> */}
                            </>
                        ) : (
                            item.answerVideo ? (
                                <>
                                    {/* <TouchableOpacity
                                        onPress={() => {
                                            let routeData = {
                                                navigate: 'VideoPlayer',
                                                url: item.answerVideo
                                            }
                                            onMenuClick(routeData)

                                        }}
                                    > */}
                                    <Image source={{ uri: item.videoThumbnail }}
                                        style={{ height: 230 / 930 * height, width: 350 / 430 * width, borderRadius: 10, marginTop: 8 }}
                                        // onLoadEnd={() => {
                                        //     setLoadImage5(false)
                                        // }} onLoadStart={() => { setLoadImage5(true) }}
                                        placeholder={blurhash}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                                    <Image source={require('../assets/images/playIcon.png')}
                                        style={{ height: 50, width: 50, position: 'absolute', bottom: 100 / 930 * height, left: 150 / 430 * width }}
                                    />
                                    {/* </TouchableOpacity> */}
                                    {/* {
                                        loadImage5 ? (
                                            <ActivityIndicator size={'small'} color={colors.blueColor} style={{ position: 'absolute', bottom: 120, left: 160 }} />
                                        ) : <></>
                                    } */}


                                </>

                            ) : (
                                <View style={{
                                    marginTop: 8, marginBottom: 8, width: 345 / 430 * width, backgroundColor: '#F5F5F5',
                                    borderRadius: 10, paddingVertical: 10, paddingHorizontal: 16, alignItems: 'center', width: 330 / 430 * width,
                                }}>
                                    <Text style={{
                                        paddingHorizontal: 8, fontSize: 14, fontFamily: customFonts.regular, color: '#000',
                                        textAlign: 'left', width: 320 / 430 * width,
                                    }}>
                                        {item.answerText}
                                    </Text>
                                    {/* <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 0 / 430 * width }}
                        onPress={() => {
                            handleOnpress(item)
                        }}
                    > */}
                                    <View style={[GlobalStyles.likeBtn, { alignSelf: 'flex-end' }]}>
                                        <Image source={likeImage} style={GlobalStyles.likeBtnImage} />
                                    </View>
                                    {/* </TouchableOpacity> */}
                                </View>
                            )
                        )
                    }


                </View>

                <TextInput
                    placeholder='Enter comment' multiline
                    value={comment}
                    onChangeText={(t) => {
                        setComment(t)
                        setError(null)
                    }}
                    style={{
                        borderWidth: 1, borderColor: colors.greyLightText, padding: 16, borderRadius: 10, width: width - 70,
                        marginTop: 22 / 930 * height,
                    }}
                    textAlignVertical='top'
                    numberOfLines={5}

                />
                {
                    error && <Text style={[GlobalStyles.errorText, { marginTop: 15 }]}>{error}</Text>
                }
            </View>

            {
                loading ? (
                    <ActivityIndicator size={'large'} color={colors.blueColor} style={{ marginTop: 15, }} />
                ) : (
                    <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { marginTop: 15, width: width - 30 }]}
                        onPress={() => {
                            sendComment()
                        }}
                    >
                        <Text style={GlobalStyles.btnText}>Send comment</Text>
                    </TouchableOpacity>
                )
            }


            <TouchableOpacity style={{ marginTop: 15 }}
                onPress={() => close(false)}
            >
                <Text style={[GlobalStyles.btnText, { color: '#000' }]}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )
}
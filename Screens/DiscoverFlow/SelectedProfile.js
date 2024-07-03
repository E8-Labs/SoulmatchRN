import React, { useState, useEffect, useRef } from 'react'
import {
    View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView, StyleSheet,
    SafeAreaView, Animated,
    Settings,
    ActivityIndicator

} from 'react-native'
import { Video, ResizeMode, AVPlaybackStatu0s } from 'expo-av';
import { Image } from 'expo-image'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import customFonts from '../../assets/fonts/Fonts'
import colors from '../../assets/colors/Colors'
import ApisPath from '../../lib/ApisPath/ApisPath'
import LikesList from '../DiscoverFlow/LikesList';
import FilterPopup from '../../Components/FilterPopup';
import DiscoverGotMatch from '../../Components/DiscoverGotMatch';
import { getDistance } from 'geolib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DistanceCalculator from '../../Components/DistanceCalculator';


const { height, width } = Dimensions.get('window')

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const likeImage = require('../../assets/images/like.png');
const unlikeImage = require('../../assets/images/unLike.png');
const male = require('../../assets/images/maleIcon.png');
const female = require('../../assets/images/femaleIcon.png');
const nonBinary = require('../../assets/images/nonBinaryIcon.png');

export default function SelectedProfile({ navigation, route }) {

    const data = route.params.data
    let user = data.user
    console.log('user data from prev screen', user)

    const [totalInches, setTotalInches] = useState(null)
    const [selected, setSelected] = useState('');
    const [like, setLike] = useState(false);
    const [loadImage, setLoadImage] = useState(false)
    const [loadImage2, setLoadImage2] = useState(false)
    const [loadImage4, setLoadImage4] = useState(false)
    const [loadImage3, setLoadImage3] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [LocalUser, setLocalUser] = useState([]);
    const [isPlaying, setIsPlaying] = useState(true);
    const [duration, setDuration] = useState(0);
    const videoRef = React.useRef(null);
    const [video, setVideo] = useState(null);
    const [loadVideo2, setLoadVideo2] = useState(false);
    const [status2, setStatus2] = React.useState({});
    const [isPlaying2, setIsPlaying2] = useState(true);
    const [duration2, setDuration2] = useState(0);
    const videoRef2 = React.useRef(null);
    const [loadVideo, setLoadVideo] = useState(false);
    const [status, setStatus] = React.useState({});
    const ref = useRef(null);
    // console.log("data from prev screen", data)

    const formatDuration = (durationMillis) => {
        const totalSeconds = Math.floor(durationMillis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }



    const handleLike = async () => {

        if (data.from === "Profile") {
            return
        }

        console.log('trying to likes profile')

        const User = await AsyncStorage.getItem("USER")
        try {
            if (User) {
                let d = JSON.parse(User)
                console.log('user data ', user.id)
                // return
                let body = JSON.stringify({
                    user_id: user.id,
                    status: "liked"
                })

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
                    if (json.status === true) {
                        console.log('profile liked', json.data)
                        if (json.match === true) {
                            props.navigation.navigate("GotMatch")
                        } else {
                            // handleNext();
                        }
                    } else {
                        console.log('json message', json.message)
                    }
                }
            }
        } catch (error) {
            console.log('error finding in like profile', error)
        }



        console.log('Liked:', user.id);

    };

    const handleReject = async () => {
        if (data.from === "Profile") {
            return
        }
        console.log('trying to likes profile')

        const User = await AsyncStorage.getItem("USER")
        try {
            if (User) {
                let d = JSON.parse(User)
                console.log('user data ')

                let body = JSON.stringify({
                    user_id: user.id,
                    status: "rejected"
                })

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
                    if (json.status === true) {
                        console.log('profile liked', json.data)
                        // handleNext();
                    } else {
                        console.log('json message', json.message)
                    }
                }
            }
        } catch (error) {
            console.log('error finding in like profile', error)
        }


        console.log('Rejected:', user.id);

    };


    const handleOnpress = (item) => {
        if (data.from === "Profile") {
            return
        }
        const selectedIndex = selected.indexOf(item.id);
        if (selectedIndex > -1) {
            // If selected, remove it from the array
            setSelected(prevItems => prevItems.filter(i => i !== item.id));
        } else {
            // If not selected, add it to the array
            setSelected(prevItems => [...prevItems, item.id]);
        }
    }

    // const heightInInches = () => {
    //     let addon = 36
    //     let inches = parseInt(0.6 * value + addon);

    //     let heightFeet = parseInt(inches / 12);
    //     let heightInches = parseInt(inches % 12);
    //     return `${Math.round(heightFeet)}'${Math.round(heightInches)}"`
    // };

    const closeModal = () => {
        setOpenModal(false)
    }

    const getGenderIcon = () => {
        if (user === null) {
            return
        }
        if (user.gender === 'Male') {
            return male
        } else if (user.gender === 'Female') {
            return female
        } else if (user.gender === 'Non-Binary') {
            return nonBinary
        }

    }
    return (

        <SafeAreaView>
            {/* <Animated.View style={{ ...styles.componentContainer, opacity: fadeAnim }}> */}
            <View style={{ height: height, alignItems: 'center' }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', width: width - 60, gap: 15, marginTop: 0 / 930 * height }}>

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={GlobalStyles.backBtn}>
                            <Image source={require('../../assets/images/close.png')}
                                style={GlobalStyles.backBtnImage}
                            />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, fontFamily: customFonts.meduim }}>
                        {user.first_name} {user.last_name}
                    </Text>
                </View>

                <View style={{ height: height * 0.83, marginTop: 20 }} >

                    <ScrollView style={{ height: 100 }} showsVerticalScrollIndicator={false}>

                        <Image source={{ uri: user.profile_image }}
                            onLoadStart={() => { setLoadImage(true) }}
                            onLoadEnd={() => {
                                setLoadImage(false)
                            }}
                            placeholder={blurhash}
                            contentFit="cover"
                            transition={1000}
                            style={{ backgroundColor: 'grey', resizeMode: 'cover', minHeight: height * 0.6, width: width - 40, borderRadius: 20, }}
                        />
                        {
                            loadImage ? (
                                <ActivityIndicator size={'large'} color={colors.blueColor} style={{ marginTop: -500, height: height * 0.6, width: width - 40, }} />
                            ) : <></>
                        }
                        <View
                            style={{
                                width: '80%', flexDirection: 'row', top: height * 0.51,
                                justifyContent: 'space-between', position: 'absolute', alignSelf: 'center'
                            }}>

                            <TouchableOpacity
                                style={{
                                    width: 60, height: 60, backgroundColor: '#fff', elevation: 5, borderRadius: 30,
                                    justifyContent: 'center', alignItems: 'center',
                                }}
                                onPress={() => {
                                    handleLike()

                                }}
                            >
                                <Image
                                    source={unlikeImage}
                                    style={{ width: 40, height: 40, }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                handleReject()
                            }}
                                style={{
                                    width: 60, height: 60, backgroundColor: '#fff', elevation: 5, borderRadius: 30,
                                    justifyContent: 'center', alignItems: 'center',
                                }}
                            >
                                <Image
                                    source={require('../../assets/images/close.png')}
                                    style={{ width: 34, height: 34 }}
                                />
                            </TouchableOpacity>

                        </View>
                        <View style={{
                            width: width - 30, padding: 20, shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            }, marginTop: 30,
                            shadowOpacity: 0.05,
                            shadowRadius: 3,
                            backgroundColor: '#fff', borderRadius: 10
                        }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                <Image source={require('../../assets/images/compatibility.png')}
                                    style={{ height: 58 / 930 * height, width: 58 / 930 * height, resizeMode: 'contain' }}
                                />
                                <View style={{ flexDirection: 'column', }}>
                                    <Text style={{ fontSize: 14, fontFamily: customFonts.meduim, color: colors.greyLightText }}>Compatibility score</Text>
                                    <Text style={{ fontSize: 20, fontFamily: customFonts.semibold, color: '#4D4D4D' }}>85%</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 30 / 930 * height }}>

                            <View style={styles.viewStyle}>
                                <Image source={getGenderIcon()}
                                    style={styles.viewImage}
                                />
                                <Text style={styles.viewText}>
                                    {user.gender}
                                </Text>
                            </View>

                            <View style={styles.viewStyle}>
                                <Image source={require('../../assets/images/cake.png')}
                                    style={styles.viewImage}
                                />
                                <Text style={styles.viewText}>
                                    {user.age} years old
                                </Text>
                            </View>
                            <View style={styles.viewStyle}>
                                <Image source={require('../../assets/images/scale.png')}
                                    style={styles.viewImage}
                                />
                                <Text style={styles.viewText}>
                                    {((user.height_feet * 12 + user.height_inches) * 2.54).toFixed(0)} cm
                                </Text>
                            </View>
                            <View style={styles.viewStyle}>
                                <Image source={require('../../assets/images/location.png')}
                                    style={styles.viewImage}
                                />
                                    
                                        <DistanceCalculator userId={user.id} lat={user.lat} lang={user.lang} />
                            </View>
                            <View style={styles.viewStyle}>
                                <Image source={require('../../assets/images/eduCap.png')}
                                    style={styles.viewImage}
                                />
                                <Text style={styles.viewText}>
                                    {user.school}
                                </Text>
                            </View>
                            <View style={styles.viewStyle}>
                                <Image source={require('../../assets/images/bag.png')}
                                    style={styles.viewImage}
                                />
                                <Text style={styles.viewText}>
                                    {user.job_title} at {user.company}
                                </Text>
                            </View>
                            <View style={styles.viewStyle}>
                                <Image source={require('../../assets/images/rankingStar.png')}
                                    style={styles.viewImage}
                                />
                                <Text style={styles.viewText}>
                                    {user.zodiac}
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 22 / 930 * height, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: 20, fontFamily: customFonts.meduim }}>Photos & videos</Text>
                        </View>

                        {
                            user.media.length > 0 ? (
                                <FlatList
                                    scrollEnabled={false}
                                    data={user.media}
                                    renderItem={({ item }) => (
                                        <View key={item.id} style={{
                                            borderWidth: 1, borderColor: colors.greyText, padding: 16, borderRadius: 10, width: width - 30,
                                            marginTop: 22 / 930 * height,
                                        }}>
                                            {
                                                item.caption !== "null" ? (
                                                    <Text style={{ fontSize: 16, fontFamily: customFonts.regular }}>{item.caption}</Text>
                                                ) : ""
                                            }
                                            {/* {
                                            item.hashtage ? (
                                                <Text style={{ fontSize: 16, fontFamily: customFonts.regular }}>{item.hashtage}</Text>
                                            ) : null
                                        } */}
                                            {
                                                item.type === "image" ? (
                                                    <>
                                                        <Image source={{ uri: item.url }}
                                                            onLoadStart={() => {
                                                                setLoadImage2(true)
                                                            }}
                                                            onLoadEnd={() => {
                                                                setLoadImage2(false)
                                                            }}
                                                            style={{ height: 230 / 930 * height, width: 350 / 430 * width, borderRadius: 10, marginTop: 8 }}
                                                        />
                                                        {
                                                            loadImage2 ? (
                                                                <ActivityIndicator size={'small'} color={colors.blueColor} style={{ marginTop: -200, height: 200 / 930 * height }} />
                                                            ) : <></>
                                                        }
                                                    </>

                                                ) : (
                                                    item.type === "video" ? (
                                                        <>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    navigation.navigate('VideoPlayer', {
                                                                        data: {
                                                                            url: item.url
                                                                        }
                                                                    })
                                                                }}
                                                            >
                                                                <Image source={{ uri: item.thumb_url }}
                                                                    onLoadStart={() => { setLoadImage4(true) }}
                                                                    onLoadEnd={() => {
                                                                        setLoadImage4(false)
                                                                    }}
                                                                    placeholder={blurhash}
                                                                    contentFit="cover"
                                                                    transition={1000}
                                                                    style={{ height: 230 / 930 * height, width: 350 / 430 * width, borderRadius: 10, marginTop: 8 }}
                                                                />
                                                                <Image source={require('../../assets/images/playIcon.png')}
                                                                    style={{ height: 50, width: 50, position: 'absolute', bottom: 80 / 930 * height, left: 150 / 430 * width }}
                                                                />
                                                            </TouchableOpacity>

                                                            {
                                                                loadImage4 ? (
                                                                    <ActivityIndicator size={'small'} color={colors.blueColor} style={{ position: 'absolute', bottom: 110, left: 175 }} />
                                                                ) : <></>
                                                            }
                                                        </>
                                                    ) : null
                                                )
                                            }

                                        </View>
                                    )}
                                />
                            ) : (
                                <Text style={{ fontSize: 14, fontFamily: customFonts.meduim, marginTop: 10 }}>
                                    No media uploaded
                                </Text>
                            )
                        }



                        <View style={{ marginTop: 22 / 930 * height, alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: 20, fontFamily: customFonts.meduim }}>Profile statement questions</Text>
                        </View>

                        {
                            user.answers.length > 0 ? (
                                <FlatList
                                    scrollEnabled={false}
                                    data={user.answers}
                                    renderItem={({ item, index }) => (
                                        <View key={item.id} style={{
                                            borderWidth: 1, borderColor: colors.greyText, padding: 16, borderRadius: 10, width: width - 30,
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
                                                        <Image source={{ uri: item.answerImage }}
                                                            style={{ height: 230 / 930 * height, width: 350 / 430 * width, borderRadius: 10, marginTop: 8 }}
                                                        />
                                                        <TouchableOpacity style={{
                                                            alignSelf: 'flex-end', position: 'absolute', bottom: 26, right: 40 / 430 * width, backgroundColor: '#fff',
                                                            borderRadius: 30,
                                                        }}
                                                            onPress={() => {
                                                                handleOnpress(item)
                                                            }}
                                                        >
                                                            <View style={GlobalStyles.likeBtn}>
                                                                <Image source={selected.includes(item.id) ? likeImage : unlikeImage} style={{ height: 27, width: 27, backgroundColor: 'transparent' }} />
                                                            </View>
                                                        </TouchableOpacity>
                                                    </>
                                                ) : (
                                                    item.answerVideo ? (
                                                        <>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    navigation.navigate('VideoPlayer', {
                                                                        data: {
                                                                            url: item.answerVideo
                                                                        }
                                                                    })
                                                                }}
                                                            >
                                                                <Image source={{ uri: item.videoThumbnail }}
                                                                    onLoadStart={() => { setLoadImage3(true) }}
                                                                    onLoadEnd={() => {
                                                                        setLoadImage3(false)
                                                                    }}
                                                                    placeholder={blurhash}
                                                                    contentFit="cover"
                                                                    transition={1000}
                                                                    style={{ height: 230 / 930 * height, width: 350 / 430 * width, borderRadius: 10, marginTop: 8 }}
                                                                />
                                                                <Image source={require('../../assets/images/playIcon.png')}
                                                                    style={{ height: 50, width: 50, position: 'absolute', bottom: 90 / 930 * height, left: 150 / 430 * width }}
                                                                />
                                                            </TouchableOpacity>

                                                            {
                                                                loadImage3 ? (
                                                                    <ActivityIndicator size={'small'} color={colors.blueColor} style={{ position: 'absolute', bottom: 120, left: 175 }} />
                                                                ) : <></>
                                                            }
                                                        </>
                                                    ) : (
                                                        <>
                                                            <View style={{
                                                                marginTop: 8, marginBottom: 8, width: 345 / 430 * width, backgroundColor: '#F5F5F5',
                                                                borderRadius: 10, paddingVertical: 10, paddingHorizontal: 16, alignItems: 'center'
                                                            }}>
                                                                <Text style={{ fontSize: 14, fontFamily: customFonts.regular, color: '#000', width: 320 / 430 * width, textAlign: 'left' }}>{item.answerText}</Text>

                                                            </View>
                                                            <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 20 / 430 * width }}
                                                                onPress={() => {
                                                                    handleOnpress(item)
                                                                }}
                                                            >
                                                                <View style={GlobalStyles.likeBtn}>
                                                                    <Image source={selected.includes(item.id) ? likeImage : unlikeImage} style={GlobalStyles.likeBtnImage} />
                                                                </View>
                                                            </TouchableOpacity>
                                                        </>
                                                    )

                                                )

                                            }

                                        </View>
                                    )}
                                />
                            ) : (
                                <Text style={{ fontSize: 14, fontFamily: customFonts.meduim, marginTop: 10, marginBottom: 30 }} >No answer added</Text>
                            )
                        }



                    </ScrollView>
                </View>
            </View>
            {/* </Animated.View> */}
        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        // justifyContent:'center',
        width: width - 30,
        gap: 12,
        marginTop: 8
    },
    viewImage: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    viewText: {
        fontSize: 16,
        fontFamily: customFonts.meduim,
        textAlign: 'left',
        width: 334 / 430 * width
    },
    image: {
        height: 28 / 930 * height,
        width: 28 / 930 * height,
        resizeMode: 'contain'
    }
})




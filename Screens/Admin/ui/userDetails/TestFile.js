import React, { useState, useEffect, useRef } from 'react'
import {
    View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView, StyleSheet,
    SafeAreaView, Animated,
    Settings,
    ActivityIndicator

} from 'react-native'
import { Image } from 'expo-image'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import customFonts from '../../assets/fonts/Fonts'
import colors from '../../assets/colors/Colors'
import ApisPath from '../../lib/ApisPath/ApisPath'
import LikesList from '../DiscoverFlow/LikesList';
import FilterPopup from '../../Components/FilterPopup';
import DiscoverGotMatch from '../../Components/DiscoverGotMatch';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('window')

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const likeImage = require('../../assets/images/like.png');
const unlikeImage = require('../../assets/images/unLike.png');

const male = require('../../assets/images/maleIcon.png');
const female = require('../../assets/images/femaleIcon.png');
const nonBinary = require('../../assets/images/nonBinaryIcon.png');

export default function ProfileDetail({ navigation, fromScreen, data, onMenuClick }) {

    // const fromScreen = route.params.fromScreen

    const [totalInches, setTotalInches] = useState(null)
    const [selected, setSelected] = useState('');
    const [like, setLike] = useState(false);
    const [loadImage, setLoadImage] = useState(false)
    const [loadImage2, setLoadImage2] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [LikeIndicator, setLikeIndicator] = useState(false);
    const [rejecIndicator, setRejectIndicator] = useState(false);
    const [questions, setQuestions] = useState([]);

    console.log("data from prev screen", currentIndex)
    console.log("current index", currentIndex)
    console.log("data length", data.length)

    const logoutUser = async () => {
        try {
            AsyncStorage.setItem("USER",null)

            let data = {
                navigate: 'Logout'
            }
            onMenuClick(data)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getQuestions()
    }, [])

    const getQuestions = async () => {
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
                        console.log('enancmennt questions are', json.data)
                        setQuestions(json.data)
                    } else {
                        console.log('json messagw', object)

                    }
                }
            }



        } catch (error) {
            console.log('error findng in get questions', error)
        }
    }

    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        fadeIn();
    }, [currentIndex]);


    const fadeOut = (callback) => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(callback);
    };

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleNext = () => {
        fadeOut(() => {
            setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, data.length - 1));
            fadeIn();
        });
    };
    const handleLike = async () => {
        setLikeIndicator(true)
        console.log('trying to likes profile')

        const user = await AsyncStorage.getItem("USER")
        try {
            if (user) {
                let d = JSON.parse(user)
                console.log('user data ', data[currentIndex] && data[currentIndex].id)
                // return
                let body = JSON.stringify({
                    user_id: data[currentIndex] && data[currentIndex].id,
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
                    setLikeIndicator(false)
                    let json = await result.json()
                    if (json.status === true) {
                        console.log('profile liked', json.data)
                        if (json.match === true) {
                            let data = {
                                navigate: 'GotMatch',
                                user: data[currentIndex]
                            }
                            onMenuClick(data)
                        } else {
                            handleNext();
                        }
                    } else {
                        console.log('json message', json.message)
                    }
                }
            }
        } catch (error) {
            console.log('error finding in like profile', error)
        }



        console.log('Liked:', data[currentIndex].id);

    };

    const handleReject = async () => {
        setRejectIndicator(true)
        console.log('trying to likes profile')

        const user = await AsyncStorage.getItem("USER")
        try {
            if (user) {
                let d = JSON.parse(user)
                console.log('user data ', data[currentIndex].id)

                let body = JSON.stringify({
                    user_id: data[currentIndex].id,
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
                    setRejectIndicator(false)
                    let json = await result.json()
                    if (json.status === true) {
                        console.log('profile liked', json.data)
                        handleNext();
                    } else {
                        console.log('json message', json.message)
                    }
                }
            }
        } catch (error) {
            console.log('error finding in like profile', error)
        }


        console.log('Rejected:', data[currentIndex].id);

    };


    const handleOnpress = (item) => {
        const selectedIndex = selected.indexOf(item.id);
        if (selectedIndex > -1) {
            // If selected, remove it from the array
            setSelected(prevItems => prevItems.filter(i => i !== item.id));
        } else {
            // If not selected, add it to the array
            setSelected(prevItems => [...prevItems, item.id]);
        }
    }

    const heightInInches = () => {
        let addon = 36
        let inches = parseInt(0.6 * value + addon);

        let heightFeet = parseInt(inches / 12);
        let heightInches = parseInt(inches % 12);
        return `${Math.round(heightFeet)}'${Math.round(heightInches)}"`
    };

    const closeModal = () => {
        setOpenModal(false)
    }

    const getGenderIcon = () => {
        if (data[currentIndex] === null) {
            return
        }
        if (data[currentIndex] && data[currentIndex].gender === 'Male') {
            return male
        } else if (data[currentIndex] && data[currentIndex].gender === 'Female') {
            return female
        } else if (data[currentIndex] && data[currentIndex].gender === 'Non-Binary') {
            return nonBinary
        }

    }

    return (

        <SafeAreaView>

            <Animated.View style={{ ...styles.componentContainer, opacity: fadeAnim }}>
                <View style={{ height: height, alignItems: 'center' }}>
                    {
                        fromScreen !== "Main" ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: width - 60, gap: 15, marginTop: 0 / 930 * height }}>

                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <View style={GlobalStyles.backBtn}>
                                        <Image source={require('../../assets/images/close.png')}
                                            style={GlobalStyles.backBtnImage}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 24, fontFamily: customFonts.meduim }}>
                                    user name
                                </Text>
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'row', marginBottom: 20 / 930 * height, width: width - 40, justifyContent: 'space-between' }}>
                                {
                                    currentIndex !== data.length - 1 ? (
                                        <Text style={{ fontSize: 24, fontFamily: customFonts.meduim }}>
                                            {data[currentIndex] ? data[currentIndex].first_name : ''} {data[currentIndex] ? data[currentIndex].last_name : ''}
                                        </Text>
                                    ) : <View style={{ width: 50 }}></View>
                                }

                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 / 430 * width }}>
                                    <TouchableOpacity onPress={() => {
                                        let data = {
                                            navigate: 'LikesList'
                                        }
                                        onMenuClick(data)
                                    }}>
                                        <Image source={require('../../assets/images/profileLike.png')}
                                            style={styles.image}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <Image source={require('../../assets/images/bell.png')}
                                            style={styles.image}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {
                                        setOpenModal(true)
                                    }}>
                                        <Image source={require('../../assets/images/setting.png')}
                                            style={styles.image}
                                        />
                                    </TouchableOpacity>
                                    <FilterPopup visible={openModal} close={closeModal} />


                                </View>
                            </View>
                        )
                    }
                    {
                        currentIndex !== data.length - 1 ? (

                            <View style={{ height: fromScreen === "Main" ? height * 0.755 : height * 0.85 }} >

                                <ScrollView style={{}} showsVerticalScrollIndicator={false}>

                                    <Image source={data[currentIndex] ? { uri: data[currentIndex].profile_image } : ''}
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
                                        {
                                            LikeIndicator ? (
                                                <ActivityIndicator size={'large'} color={colors.blueColor} />
                                            ) : (
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
                                            )
                                        }

                                        {
                                            rejecIndicator ? (
                                                <ActivityIndicator size={'large'} color={colors.blueColor} />
                                            ) : (
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
                                            )
                                        }

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
                                            <Text style={styles.viewText}>{data[currentIndex] ? data[currentIndex].gender : ''}</Text>
                                        </View>

                                        <View style={styles.viewStyle}>
                                            <Image source={require('../../assets/images/cake.png')}
                                                style={styles.viewImage}
                                            />
                                            <Text style={styles.viewText}>{data[currentIndex] ? data[currentIndex].age : ''} years old</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Image source={require('../../assets/images/scale.png')}
                                                style={styles.viewImage}
                                            />
                                            <Text style={styles.viewText}>
                                                {data[currentIndex] ? data[currentIndex].height_feet * 12 + data[currentIndex].height_inches : ''} cm</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Image source={require('../../assets/images/location.png')}
                                                style={styles.viewImage}
                                            />
                                            <Text style={styles.viewText}>5 miles</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Image source={require('../../assets/images/eduCap.png')}
                                                style={styles.viewImage}
                                            />
                                            <Text style={styles.viewText}>{data[currentIndex] ? data[currentIndex].school : ''}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Image source={require('../../assets/images/bag.png')}
                                                style={styles.viewImage}
                                            />
                                            <Text style={styles.viewText}>
                                                {data[currentIndex] ? (data[currentIndex].job_title) : ''} <Text style={styles.viewText}>
                                                    at {data[currentIndex] ? (data[currentIndex].company) : ''}
                                                </Text>
                                            </Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Image source={require('../../assets/images/rankingStar.png')}
                                                style={styles.viewImage}
                                            />
                                            <Text style={styles.viewText}>{data[currentIndex] ? data[currentIndex].zodiac : ''} </Text>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 22 / 930 * height, alignItems: 'flex-start', }}>
                                        <Text style={{ fontSize: 20, fontFamily: customFonts.meduim }}>Photos & videos</Text>
                                    </View>

                                    {
                                        data[currentIndex] ? data[currentIndex].media.length > 0 ? (
                                            <FlatList
                                                scrollEnabled={false}
                                                data={data[currentIndex] ? data[currentIndex].media : ''}
                                                renderItem={({ item }) => (
                                                    <View key={item.id} style={{
                                                        borderWidth: 1, borderColor: colors.greyText, padding: 16, borderRadius: 10, width: width - 30,
                                                        marginTop: 22 / 930 * height,
                                                    }}>
                                                        {
                                                            item.caption ? (
                                                                <Text style={{ fontSize: 16, fontFamily: customFonts.regular }}>{item.caption}</Text>
                                                            ) : null
                                                        }
                                                        {/* {
 item.hashtage ? (
 <Text style={{ fontSize: 16, fontFamily: customFonts.regular }}>{item.hashtage}</Text>
 ) : null
 } */}
                                                        {
                                                            item.url || item.thumb_url ? (
                                                                <>
                                                                    <Image source={{ uri: item.url ? item.url : thumb_url }}
                                                                        onLoadStart={() => { setLoadImage2(true) }}
                                                                        onLoadEnd={() => {
                                                                            setLoadImage2(false)
                                                                        }}
                                                                        placeholder={blurhash}
                                                                        contentFit="cover"
                                                                        transition={1000}
                                                                        style={{ height: 230 / 930 * height, width: 350 / 430 * width, borderRadius: 10, marginTop: 8 }}
                                                                    />

                                                                    {
                                                                        loadImage2 ? (
                                                                            <ActivityIndicator size={'small'} color={colors.blueColor} style={{ position: 'absolute', bottom: 100, left: 150 }} />
                                                                        ) : <></>
                                                                    }
                                                                </>

                                                            ) : null
                                                        }

                                                    </View>
                                                )}
                                            />
                                        ) : (
                                            <Text style={{ fontSize: 14, fontFamily: customFonts.meduim, marginTop: 10, }}>
                                                No media uploaded
                                            </Text>
                                        )

                                            : ""
                                    }



                                    <View style={{ marginTop: 22 / 930 * height, alignItems: 'flex-start', }}>
                                        <Text style={{ fontSize: 20, fontFamily: customFonts.meduim }}>Profile statement questions</Text>
                                    </View>

                                    {
                                        data[currentIndex] ? data[currentIndex].answers.length > 0 ? (

                                            <FlatList

                                                style={{ marginBottom: 50 }}
                                                scrollEnabled={false}
                                                data={data[currentIndex] ? data[currentIndex].answers : ''}
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
                                                            item.answerImage || item.answerVideo ? (<>
                                                                <Image source={{ uri: item.answerImage ? item.answerImage : item.videoThumbnail }}
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
                                                                <>
                                                                    <View style={{
                                                                        marginTop: 8, marginBottom: 8, width: 345 / 430 * width, backgroundColor: '#F5F5F5',
                                                                        borderRadius: 10, paddingVertical: 10, paddingHorizontal: 16, alignItems: 'center'
                                                                    }}>
                                                                        <Text style={{ fontSize: 14, fontFamily: customFonts.regular, color: '#000', textAlign: 'left', width: 320 / 430 * width, }}>
                                                                            {item.answerText}
                                                                        </Text>

                                                                    </View>
                                                                    <TouchableOpacity style={{ alignSelf: 'flex-end', }}
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
                                                        }

                                                    </View>
                                                )}
                                            />
                                        ) : (
                                            <Text style={{ marginBottom: 30, fontSize: 14, fontFamily: customFonts.meduim, marginTop: 10 }}>No answer added</Text>
                                        )


                                            : ''
                                    }


                                </ScrollView>
                            </View>
                        ) : (
                            <>
                                <TouchableOpacity onPress={() => logoutUser()}>
                                    <Text style={{ color: colors.blueColor, fontSize: 20, marginLeft: 20 }}>Log out</Text>
                                </TouchableOpacity>

                                <View style={{ height: height * 0.8, width: width, alignItems: 'center', justifyContent: 'center' }}>

                                    <Text style={{ fontSize: 20, }}>There is no profile to show</Text>
                                </View>
                            </>
                        )
                    }
                </View>



            </Animated.View>


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





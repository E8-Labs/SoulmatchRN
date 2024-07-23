import React, { useState, useEffect, useRef } from 'react'
import {
    View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView, StyleSheet,
    SafeAreaView, Animated,
    Settings,
    ActivityIndicator,
    Modal

} from 'react-native';
import { Image } from 'expo-image';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import customFonts from '../../assets/fonts/Fonts';
import colors from '../../assets/colors/Colors';
import ApisPath from '../../lib/ApisPath/ApisPath';
import LikesList from '../DiscoverFlow/LikesList';
import FilterPopup from '../../Components/FilterPopup';
import DiscoverGotMatch from '../../Components/DiscoverGotMatch';
import { Video, ResizeMode, AVPlaybackStatu0s } from 'expo-av';
import { getDistance } from 'geolib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddressPicker from '../Admin/ui/Addresspicker/AddressPicker';
import DistanceCalculator from '../../Components/DistanceCalculator';
import AddCommentPopup from '../../Components/AddCommentPopup';

const { height, width } = Dimensions.get('window')

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const likeImage = require('../../assets/images/like.png');
const unlikeImage = require('../../assets/images/unLike.png');

const male = require('../../assets/images/maleIcon.png');
const female = require('../../assets/images/femaleIcon.png');
const nonBinary = require('../../assets/images/nonBinaryIcon.png');

export default function ProfileDetail(props) {
    const { exceedeMatches, navigation, fromScreen, data,
        onMenuClick, filtersData, LastProfileSwiped, ProfileMatched } = props

    // const fromScreen = route.params.fromScreen
    const [imageLoading, setImageLoading] = useState({});
    const [selected, setSelected] = useState('');
    const [loadImage2, setLoadImage2] = useState(false)
    const [loadImage3, setLoadImage3] = useState(false)
    const [loadImage4, setLoadImage4] = useState(false)
    const [loadImage5, setLoadImage5] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [openModalLocation, setOpenModalLocation] = useState(false);
    const [LikeIndicator, setLikeIndicator] = useState(false);
    const [rejecIndicator, setRejectIndicator] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [filters, setFilters] = useState({})
    const [openCommentPopup, setOpenCommentPopup] = useState(false)
    const [commentedAnswer, setCommentAnswer] = useState(null)

    // console.log("data from prev screen", data[currentIndex].media)
    console.log("current index", currentIndex)
    console.log("data length", data.length)

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
        if (currentIndex === data.length - 1) {
            LastProfileSwiped()
        }
        else {
            fadeOut(() => {
                setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, data.length - 1));
                fadeIn();
            });
        }

    };
    const handleLike = async () => {
        // ProfileMatched()
        // return
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
                        console.log('profile liked', json)
                        console.log('Liked:', data[currentIndex].id);
                        if (typeof json.match !== undefined && json.match === true) {
                            // if(d.user.totalMatches+1 >= MatchLimit){
                            // exceedeMatches = true
                            ProfileMatched()
                            // }
                            // d.user.totalMatches = d.user.totalMatches+1;


                            let routeData = {
                                navigate: 'GotMatch',
                                user: data[currentIndex]
                            }
                            onMenuClick(routeData)
                            handleNext();
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
            setRejectIndicator(false)
            console.log('error finding in like profile', error)
        }


        console.log('Rejected:', data[currentIndex].id);

    };


    const handleOnpress = (item) => {
        setOpenCommentPopup(true)
        setCommentAnswer(item)
        console.log(' popup is here')
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

    const closeModal = (data) => {
        if (data) {
            console.log('filter data is', data)
            filtersData(data)
        }
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

    const handleImageLoadStart = (uri) => {
        setImageLoading(prevState => ({ ...prevState, [uri]: true }));
    };

    const handleImageLoadEnd = (uri) => {
        setImageLoading(prevState => ({ ...prevState, [uri]: false }));
    };


    const getHeightInches = () => {
        if (data[currentIndex] && data[currentIndex].height_inches % 12 > 0) {
            let inches = data[currentIndex] && data[currentIndex].height_inches % 12 + " inches"
            return inches
        } else {
            return ""
        }
    }


    useEffect(() => {
        console.log("Model opened ", commentedAnswer)
    }, [commentedAnswer])



    return (

        <SafeAreaView>
            <Animated.View style={{ ...styles.componentContainer, opacity: fadeAnim }}>
                <View style={{ height: height, alignItems: 'center', marginTop: 10 }}>

                    <View style={{ flexDirection: 'row', marginBottom: 20 / 930 * height, width: width - 40, justifyContent: 'space-between' }}>
                        {
                            currentIndex !== data.length ? (
                                <Text style={{ fontSize: 24, fontFamily: customFonts.meduim, width: 280 / 430 * width }}>
                                    {data[currentIndex] ? data[currentIndex].first_name : ''} {data[currentIndex] ? data[currentIndex].last_name : ''}
                                </Text>
                            ) : <View style={{ width: 50 }}></View>
                        }

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 / 430 * width }}>
                            <TouchableOpacity onPress={() => {
                                let routeData = {
                                    navigate: 'LikesList',
                                    user: ''
                                }
                                onMenuClick(routeData)
                            }}>
                                <Image source={require('../../assets/images/profileLike.png')}
                                    style={styles.image}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {

                                    let routeData = {
                                        user: '',
                                        navigate: 'Notifications'
                                    }
                                    onMenuClick(routeData)
                                }}
                            >
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
                            <Modal
                                visible={openModal}
                                transparent={true}
                                animationType='slide'
                            >
                                <FilterPopup close={closeModal} filters={filters} addressPicker={async () => {

                                    let tempFltr = await AsyncStorage.getItem("TempFilters")
                                    if (tempFltr) {
                                        let tempFilter = JSON.parse(tempFltr)
                                        setFilters(tempFilter)
                                        setOpenModalLocation(true)
                                        console.log('temp filters are ', tempFilter)

                                    }
                                    // onMenuClick(routeData)
                                }} />
                                {
                                    openModalLocation && (
                                        <Modal
                                            visible={openModalLocation}
                                            transparent={true}
                                            animationType='slide'
                                        >
                                            <AddressPicker PickAddress={async (address) => {
                                                console.log("Address picked from popup", address)
                                                setOpenModalLocation(false)
                                                let tempFltr = await AsyncStorage.getItem("TempFilters")
                                                if (tempFltr) {
                                                    let tempFilter = JSON.parse(tempFltr)
                                                    let newFilters = {
                                                        city: address.city,
                                                        state: address.state,
                                                        min_age: tempFilter.min_age,
                                                        max_age: tempFilter.max_age,
                                                        min_height: tempFilter.min_height,
                                                        max_height: tempFilter.max_height,
                                                        gender: tempFilter.gender
                                                    }
                                                    setFilters(newFilters)
                                                    AsyncStorage.setItem("TempFilters", JSON.stringify(newFilters))
                                                }
                                            }} backButtonPressed={() => {
                                                setOpenModalLocation(false)
                                            }} />
                                        </Modal>
                                    )
                                }
                            </Modal>



                        </View>
                    </View>

                    {
                        exceedeMatches ? (
                            <DiscoverGotMatch viewMatches={(name) => {
                                let routeData = {
                                    navigate: name,
                                    user: data[currentIndex]
                                }
                                onMenuClick(routeData)
                            }} />
                        ) : (
                            currentIndex !== data.length ? (

                                <View style={{ height: fromScreen === "Main" ? height * 0.755 : height * 0.85, alignItems: 'center', }} >

                                    <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                                        <View style={{ width: width - 30, }}>
                                            <Image source={data[currentIndex] ? { uri: data[currentIndex].profile_image } : ''}
                                                onLoadStart={() => handleImageLoadStart(data[currentIndex] ? data[currentIndex].profile_image : '')}
                                                onLoadEnd={() => handleImageLoadEnd(data[currentIndex] ? data[currentIndex].profile_image : '')}
                                                placeholder={blurhash}
                                                contentFit="cover"
                                                transition={300}
                                                style={{ opacity: imageLoading[data[currentIndex]] ? 0 : 1, backgroundColor: 'grey', minHeight: height * 0.6, width: width - 30, borderRadius: 10, }}
                                            />
                                            {
                                                imageLoading[data[currentIndex] ? data[currentIndex].profile_image : ''] ? (
                                                    <ActivityIndicator size={'large'} color={colors.blueColor} style={{ marginTop: -550 / 930 * height, height: height * 0.6, width: width - 40, }} />
                                                ) : <></>
                                            }
                                            <View
                                                style={{
                                                    width: '80%', flexDirection: 'row', top: height * 0.52,
                                                    justifyContent: 'space-between', position: 'absolute', alignSelf: 'center'
                                                }}>
                                                {
                                                    LikeIndicator ? (
                                                        <ActivityIndicator size={'large'} color={colors.blueColor} />
                                                    ) : (
                                                        <TouchableOpacity
                                                            style={{
                                                                width: 56 / 930 * height, height: 56 / 930 * height, backgroundColor: '#fff', elevation: 5, borderRadius: 30,
                                                                justifyContent: 'center', alignItems: 'center',
                                                            }}
                                                            onPress={() => {
                                                                handleLike()

                                                            }}
                                                        >
                                                            <Image
                                                                source={unlikeImage}
                                                                style={{ width: 34, height: 34, }}
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
                                                                width: 56 / 930 * height, height: 56 / 930 * height, backgroundColor: '#fff', elevation: 5, borderRadius: 30,
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
                                            {/* <View style={{
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
                                        </View> */}

                                            <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 30 / 930 * height, width: width - 40, paddingLeft: 30 }}>

                                                <View style={styles.viewStyle}>
                                                    <Image source={getGenderIcon()}
                                                        style={styles.viewImage}
                                                    />
                                                    <Text style={styles.viewText}>
                                                        {data[currentIndex] && data[currentIndex].gender ? data[currentIndex].gender : 'N/A'}
                                                    </Text>
                                                </View>

                                                <View style={styles.viewStyle}>
                                                    <Image source={require('../../assets/Images3/cake.png')}
                                                        style={styles.viewImage}
                                                    />
                                                    <Text style={styles.viewText}>{data[currentIndex] && data[currentIndex].age ? data[currentIndex].age + " years old" : 'N/A'} </Text>
                                                </View>

                                                <View style={styles.viewStyle}>
                                                    <Image source={require('../../assets/images/scale.png')}
                                                        style={styles.viewImage}
                                                    />
                                                    <Text style={styles.viewText}>
                                                        {data[currentIndex]&&data[currentIndex].height_feet?data[currentIndex].height_feet:'N/A'} feets {getHeightInches()}
                                                    </Text>
                                                </View>

                                                <View style={styles.viewStyle}>
                                                    <Image source={require('../../assets/Images3/location.png')}
                                                        style={styles.viewImage}
                                                    />
                                                    <Text style={styles.viewText}>
                                                        {data[currentIndex] && data[currentIndex].city ? data[currentIndex].city + "," : ''} {data[currentIndex] && data[currentIndex].state ? data[currentIndex].state : 'N/A'}
                                                    </Text>
                                                </View>

                                                <View style={styles.viewStyle}>
                                                    <Image source={require('../../assets/Images3/teacher.png')}
                                                        style={styles.viewImage}
                                                    />
                                                    <Text style={styles.viewText}>
                                                        {data[currentIndex] && data[currentIndex].school}
                                                    </Text>
                                                </View>

                                                <View style={styles.viewStyle}>
                                                    <Image source={require('../../assets/Images3/briefcase.png')}
                                                        style={styles.viewImage}
                                                    />
                                                    <Text style={styles.viewText}>
                                                        <Text style={styles.viewText}>
                                                            {data[currentIndex] && data[currentIndex].job_title ? data[currentIndex].job_title + " at" : ''}  {data[currentIndex] && data[currentIndex].company ? data[currentIndex].company : 'N/A'}
                                                        </Text>
                                                    </Text>
                                                </View>

                                                <View style={styles.viewStyle}>
                                                    {/* Add zodiac icon here */}
                                                    <Image source={require('../../assets/images/rankingStar.png')}
                                                        style={styles.viewImage}
                                                    />
                                                    <Text style={styles.viewText}>
                                                        {data[currentIndex] && data[currentIndex].zodiac ? data[currentIndex].zodiac : 'N/A'}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ marginTop: 22 / 930 * height, alignItems: 'flex-start', width: width - 40, alignSelf: 'center' }}>
                                                <Text style={{ fontSize: 20, fontFamily: customFonts.meduim }}>Photos & videos</Text>
                                            </View>

                                            {
                                                data[currentIndex] ? data[currentIndex].media.length > 0 ? (
                                                    <FlatList
                                                        scrollEnabled={false}
                                                        data={data[currentIndex] ? data[currentIndex].media : ''}
                                                        renderItem={({ item }) => (
                                                            <View key={item.id} style={{
                                                                borderWidth: 1, borderColor: colors.greyText, padding: 16, borderRadius: 10, width: width - 40,
                                                                marginTop: 22 / 930 * height, alignSelf: 'center', alignItems: 'center'
                                                            }}>
                                                                {
                                                                    item.caption !== "null" ? (
                                                                        <Text style={{ fontSize: 16, fontFamily: customFonts.regular, textAlign: 'left', width: width - 60, }}>{item.caption}</Text>
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
                                                                                onLoadStart={() => { setLoadImage2(true) }}
                                                                                onLoadEnd={() => {
                                                                                    setLoadImage2(false)
                                                                                }}
                                                                                placeholder={blurhash}
                                                                                contentFit="cover"
                                                                                transition={1000}
                                                                                style={{ height: 230 / 930 * height, width: width - 60, borderRadius: 10, marginTop: 8 }}
                                                                            />

                                                                            {
                                                                                loadImage2 ? (
                                                                                    <ActivityIndicator size={'small'} color={colors.blueColor} style={{ position: 'absolute', bottom: 100, left: 150 }} />
                                                                                ) : <></>
                                                                            }
                                                                        </>

                                                                    ) : (
                                                                        item.type === "video" ? (
                                                                            <>
                                                                                <TouchableOpacity
                                                                                    onPress={() => {
                                                                                        let routeData = {
                                                                                            navigate: 'VideoPlayer',
                                                                                            url: item.url
                                                                                        }
                                                                                        onMenuClick(routeData)
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
                                                                                        style={{ height: 230 / 930 * height, width: width - 60, borderRadius: 10, marginTop: 8 }}
                                                                                    />
                                                                                    {
                                                                                        !loadImage4 && (
                                                                                            <Image source={require('../../assets/images/playIcon.png')}
                                                                                                style={{ height: 50, width: 50, position: 'absolute', bottom: 100 / 930 * height, left: 150 / 430 * width }}
                                                                                            />
                                                                                        )
                                                                                    }

                                                                                </TouchableOpacity>

                                                                                {
                                                                                    loadImage4 ? (
                                                                                        <ActivityIndicator size={'small'} color={colors.blueColor} style={{ position: 'absolute', bottom: 120, left: 160 }} />
                                                                                    ) : <></>
                                                                                }
                                                                            </>
                                                                        ) : ''
                                                                    )
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



                                            <View style={{ marginTop: 22 / 930 * height, alignItems: 'flex-start', width: width - 40, alignSelf: 'center' }}>
                                                <Text style={{ fontSize: 20, fontFamily: customFonts.meduim }}>Profile statement questions</Text>
                                            </View>

                                            {
                                                data[currentIndex] ? data[currentIndex].answers.length > 0 ? (

                                                    <FlatList

                                                        style={{ marginBottom: 50, }}
                                                        scrollEnabled={false}
                                                        data={data[currentIndex] ? data[currentIndex].answers : ''}
                                                        renderItem={({ item, index }) => (
                                                            <View key={item.id} style={{
                                                                borderWidth: 1, borderColor: colors.greyText, padding: 16, borderRadius: 10, width: width - 40,
                                                                marginTop: 22 / 930 * height, alignSelf: 'center'
                                                            }}>
                                                                <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, color: '#000' }}>
                                                                    {item.title}
                                                                </Text>
                                                                <Text style={{ fontSize: 16, fontFamily: customFonts.regular, color: '#4D4D4D' }}>
                                                                    {item.text}
                                                                </Text>
                                                                {
                                                                    item.answerImage ? (<>
                                                                        <Image
                                                                            source={{ uri: item.answerImage }}
                                                                            style={{ height: 230 / 930 * height, width: width - 60, borderRadius: 10, marginTop: 8 }}
                                                                            onLoadEnd={() => {
                                                                                setLoadImage3(false)
                                                                            }}
                                                                            onLoadStart={() => {
                                                                                setLoadImage3(true)
                                                                            }}
                                                                            placeholder={blurhash}
                                                                            contentFit="cover"
                                                                            transition={1000}
                                                                        />

                                                                        {
                                                                            loadImage3 ? (
                                                                                <ActivityIndicator size={'small'} color={colors.blueColor} style={{ position: 'absolute', bottom: 100, left: 180 / 430 * width }} />
                                                                            ) : <></>
                                                                        }
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
                                                                                        let routeData = {
                                                                                            navigate: 'VideoPlayer',
                                                                                            url: item.answerVideo
                                                                                        }
                                                                                        onMenuClick(routeData)

                                                                                    }}
                                                                                >
                                                                                    <Image source={{ uri: item.videoThumbnail }}
                                                                                        style={{ height: 230 / 930 * height, width: width - 60, borderRadius: 10, marginTop: 8 }}
                                                                                        onLoadEnd={() => {
                                                                                            setLoadImage5(false)
                                                                                        }} onLoadStart={() => { setLoadImage5(true) }}
                                                                                        placeholder={blurhash}
                                                                                        contentFit="cover"
                                                                                        transition={1000}
                                                                                    />
                                                                                    <Image source={require('../../assets/images/playIcon.png')}
                                                                                        style={{ height: 50, width: 50, position: 'absolute', bottom: 100 / 930 * height, left: 150 / 430 * width }}
                                                                                    />
                                                                                </TouchableOpacity>
                                                                                {
                                                                                    loadImage5 ? (
                                                                                        <ActivityIndicator size={'small'} color={colors.blueColor} style={{ position: 'absolute', bottom: 120, left: 160 }} />
                                                                                    ) : <></>
                                                                                }


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
                                                                    // (  
                                                                    //    
                                                                    // )
                                                                }

                                                            </View>
                                                        )}
                                                    />
                                                ) : (
                                                    <Text style={{ marginBottom: 30, fontSize: 14, fontFamily: customFonts.meduim, marginTop: 10 }}>No answer added</Text>
                                                )


                                                    : ''
                                            }

                                            <Modal
                                                visible={openCommentPopup}
                                                transparent={true}
                                                animationType='fade'
                                            >
                                                {/* <View>
                                                <Text>hellloorjnerifh</Text>
                                            </View> */}
                                                <AddCommentPopup item={commentedAnswer} close={(data) => {
                                                    console.log('modal close here', data)
                                                    if (data === true) {
                                                        console.log('profile liked and now animate')
                                                        handleNext()
                                                    }
                                                    setOpenCommentPopup(false)
                                                }} />

                                            </Modal>
                                        </View>
                                    </ScrollView>
                                </View>
                            ) : (
                                <>
                                    {/* <TouchableOpacity onPress={() => logoutUser()}>
                                        <Text style={{ color: colors.blueColor, fontSize: 20, marginLeft: 20 }}>Log out</Text>
                                    </TouchableOpacity> */}

                                    <View style={{ height: height * 0.8, width: width, alignItems: 'center', justifyContent: 'center' }}>

                                        <Text style={{ fontSize: 20, }}>There is no profile to show</Text>
                                    </View>
                                </>
                            )
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
        marginTop: 8,
        // backgroundColor:'red'
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
        width: 334 / 430 * width,
        // backgroundColor:'red'
    },
    image: {
        height: 28 / 930 * height,
        width: 28 / 930 * height,
        resizeMode: 'contain'
    },

    durationContainer: {
        position: 'absolute',
        bottom: 30,
        left: 30 / 430 * width,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 5,
        padding: 5,
    },
    durationText: {
        color: 'white',
        fontSize: 14,
    },
    activityIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
    },
});




import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, ScrollView, Linking, Easing, ActivityIndicator, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyles from '../../assets/styles/GlobalStyles';
import customFonts from '../../assets/fonts/Fonts';
import colors from '../../assets/colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApisPath from '../../lib/ApisPath/ApisPath';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import moment from 'moment';

import { Image } from 'expo-image';
import { GetBudget } from '../../Services/dates/GetBudget';
import RatingPopup from '../../Components/RatingPopup';
import { GetDateDeatails } from '../../Services/dates/GetDateDetails';

const { height, width } = Dimensions.get('window');

export default function SelectedDateDetails({ navigation, route }) {

    const date = route.params.data
    console.log('selected date details are ', date.id)


    const [loading, setLoading] = useState(false)
    const [invitedDate, setInvitedDate] = useState({})
    const [reviews, setReviews] = useState([])
    const [data, setData] = useState('')
    const [showRatingPopup, setShowRatingPopup] = useState(false)


    useEffect(() => {
        getDetails()
    }, [route.params])

    const getDetails = async () => {
        try {
            const user = await AsyncStorage.getItem("USER")
            if (user) {
                console.log('trying to get date', date.id)
                let d = JSON.parse(user)

                const result = await fetch(ApisPath.ApiGetDateDetails + `?dateId=${date.id}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + d.token
                    }
                })
                if (result) {
                    let json = await result.json()
                    if (json.status === true) {
                        console.log('date details are', json.data)
                        setData(json.data)
                        setReviews(json.data.reviews)
                    } else {
                        console.log('date details message is', json.message)
                    }
                }

            }
        } catch (e) {
            console.log(' get date detainl error ', e)
        }
    }
    const getInvitedDate = (date) => {
        console.log('invited date on date details screen is  ', date)
        setInvitedDate(date)
    }


    const reserveDate = () => {
        navigation.navigate("ReserveNightScreen", {
            data: {
                date: data,
                from: "DateScreen",
                userId: '',
            },
            invitedDate: getInvitedDate
        })
    }

    const handleBackPress = () => {
        if (Object.keys(invitedDate).length !== 0) {
            console.log('invited date is', invitedDate)
            route.params.selectedDate(invitedDate)
        }
        navigation.pop()
    }


    const formatTime = (time) => {
        // Check if the time format is in 12-hour format (e.g., "9:35 PM")
        if (moment(time, ["h:mm A", "h:mm A"], true).isValid()) {
            return moment(time, ["h:mm A", "h:mm A"]).format("h:mm A");
        }
        // Check if the time format is in 24-hour format (e.g., "21:35:00")
        if (moment(time, "HH:mm:ss", true).isValid()) {
            return moment(time, "HH:mm:ss").format("h:mm A");
        }
        return time;
    };

    const getDuration = (date) => {
        console.log('given date is', date)
        const currentDate = moment()
        console.log('current data is', currentDate)

        const duration = moment.duration(currentDate.diff(date));

        const months = duration.months();
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();

        let difference;

        if (months > 0) {
            difference = `${months} months ago`;
        } else if (days > 0) {
            difference = `${days} days ago`;
        } else if (hours > 0) {
            difference = `${hours} hours ago`;
        } else if (minutes > 0) {
            difference = `${minutes} minutes ago`;
        } else {
            difference = 'Just now';
        }

        console.log(`Difference: ${difference}`);

        return difference

    }

    return (
        <SafeAreaView>
            <View style={{ alignItems: 'center', height: height, width: width }}>
                <View style={{ width: width - 60 / 430 * width, flexDirection: 'row', alignItems: 'center', gap: 20 / 430 * width }}>
                    <TouchableOpacity onPress={() => {
                        handleBackPress()
                    }}>
                        <View style={GlobalStyles.backBtn}>
                            <Image source={require('../../assets/images/backArrow.png')}
                                style={GlobalStyles.backBtnImage}
                            />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, fontFamily: customFonts.meduim, width: 300 / 430 * width }}>
                        {data.name}
                    </Text>
                </View>
                <View style={{ height: height * 0.85 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ alignItems: 'center', width: width - 60 / 430 * width, marginBottom: 10 }}>
                            <Image source={{ uri: data.imageUrl }}
                                onLoadStart={() => {
                                    setLoading(true)
                                }}
                                onLoadEnd={() => {
                                    setLoading(false)
                                }}
                                style={{
                                    height: 240 / 930 * height, width: width - 60 / 430 * width, borderRadius: 6, marginTop: 32 / 930 * height,
                                    resizeMode: 'cover'
                                }}
                            />
                            {
                                loading ? (
                                    <View style={{ height: 150 / 930 * height, marginTop: -150 }}>
                                        <ActivityIndicator color={colors.blueColor} size={'small'} style={{}} />
                                    </View>
                                ) : null
                            }

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 65 / 430 * width, marginTop: 20 / 930 * height }}>
                                <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 5 }}>
                                    <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Budget</Text>
                                    <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>{GetBudget(data)}</Text>

                                </View>

                                <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 5 }}>
                                    <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Category</Text>

                                    <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>{data && data.Category.name}</Text>
                                </View>

                                <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 5 }}>
                                    <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Ratings</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }} >
                                        <Image source={require('../../assets/images/star.png')}
                                            style={{ height: 12, width: 12 }}
                                        />
                                        <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>{data.rating}</Text>

                                    </View>

                                </View>
                            </View>

                            <View style={{ width: width - 60, alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 12, fontFamily: customFonts.regular, marginTop: 20 / 930 * height }}>
                                    Hours of operation
                                </Text>
                                <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, marginTop: 5 / 930 * height }}>
                                    {formatTime(data.openTime)} - {formatTime(data.closeTime)}
                                </Text>

                                <Text style={{ fontSize: 12, fontFamily: customFonts.regular, marginTop: 20 / 930 * height }}>
                                    Description
                                </Text>
                                <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, marginTop: 5 / 930 * height }}>
                                    {data.description}
                                </Text>

                                {/* <Text style={{ fontSize: 12, fontFamily: customFonts.regular, marginTop: 20 / 930 * height }}>
                                    Link
                                </Text> */}
                                {/* <Text style={{ fontSize: 12, fontFamily: customFonts.meduim, marginTop: 5 / 930 * height, color: colors.blueColor }}
                                    onPress={() => (
                                        Linking.openURL("https://www.youtube.com/")
                                    )}
                                >
                                    https://soulmatch-c7991c.webflow.io/
                                </Text> */}
                                <View style={{
                                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 60,
                                }}>
                                    <Text style={{ fontSize: 20, fontFamily: customFonts.meduim, marginTop: 20 / 930 * height }}>
                                        Reviews
                                    </Text>
                                    <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { width: 100 / 430 * width, height: 40 / 930 * height }]}
                                        onPress={() => {
                                            setShowRatingPopup(true)
                                        }}
                                    >
                                        <Text style={[GlobalStyles.btnText, { fontSize: 14 }]}>Review</Text>
                                    </TouchableOpacity>
                                </View>
                                {
                                    reviews.length > 0 ? (
                                        <>
                                            <Text style={{ fontSize: 12, fontFamily: customFonts.regular, marginTop: 5 / 930 * height }}>
                                                108+Ratings . {data.totalReviews} Reviews
                                            </Text>

                                            <ScrollView
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginTop: 22 / 930 * height }}>
                                                    <View style={{
                                                        paddingHorizontal: 16, height: 198 / 930 * height, borderRadius: 10, borderWidth: 1, borderColor: colors.greyText,
                                                        alignItems: 'center', justifyContent: 'center'
                                                    }}>

                                                        <AnimatedCircularProgress
                                                            size={50}
                                                            width={8}
                                                            fill={data.rating * 20}
                                                            lineCap='round'
                                                            tintColor="#E9C600"
                                                            backgroundColor="#D7D7D7"
                                                            rotation={40 - 180}
                                                            arcSweepAngle={460 - 180}
                                                        // rotation={33-180}
                                                        // arcSweepAngle={480-180}
                                                        >
                                                            {
                                                                () => (
                                                                    <Text style={{ fontSize: 12, fontFamily: customFonts.meduim }}>
                                                                        {data.rating}
                                                                    </Text>
                                                                )
                                                            }
                                                        </AnimatedCircularProgress>
                                                        <Image source={require('../../assets/images/star.png')}
                                                            style={{
                                                                height: 13, width: 13, resizeMode: 'contain', tintColor: '#E9C600',
                                                                position: 'relative', bottom: 17 / 930 * height
                                                            }}
                                                        />
                                                        <Text style={{ fontSize: 10, fontFamily: customFonts.regular }}>of 5 stars</Text>
                                                    </View>
                                                    {
                                                        reviews.length > 0 && (
                                                            reviews.map((item) => (
                                                                <View style={{
                                                                    paddingHorizontal: 16 / 430 * width, borderRadius: 10, borderWidth: 1, borderColor: colors.greyText,
                                                                    alignItems: 'flex-start', paddingVertical: 16 / 930 * height, flexDirection: 'column', gap: 8,
                                                                    height: 195 / 930 * height
                                                                }}>
                                                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: 230 / 430 * width, gap: 12 }}>
                                                                        <Image source={{ uri: item.user.profile_image }}
                                                                            style={{ height: 46 / 930 * height, width: 46 / 930 * height, borderRadius: 25 }}
                                                                        />
                                                                        <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>
                                                                            {item.user.first_name} {item.user.last_name}
                                                                        </Text>
                                                                    </View>
                                                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: 230 / 430 * width, gap: 12 }}>

                                                                        <StarRatingDisplay
                                                                            starSize={18}
                                                                            color='#FFC403'
                                                                            rating={item.rating}

                                                                        />

                                                                        <Text style={{ fontSize: 12, fontFamily: customFonts.regular, color: '#666666' }}>
                                                                            {getDuration(item.createdAt)}
                                                                        </Text>
                                                                    </View>
                                                                    <Text numberOfLines={4}
                                                                        style={{ fontSize: 14 / 930 * height, fontFamily: customFonts.regular, width: 230 / 430 * width }}>
                                                                        {item.review}
                                                                    </Text>

                                                                </View>
                                                            ))
                                                        )
                                                    }

                                                </View>
                                            </ScrollView>
                                        </>
                                    ) : (
                                        <View style={{ height: 180 / 930 * height }}>
                                            <Text style={{ marginTop: 10, fontSize: 14, fontFamily: customFonts.regular, textAlign: 'center' }}>
                                                No reviews
                                            </Text>
                                        </View>
                                    )
                                }
                            </View>
                        </View>


                        {/* rating popup */}

                        <Modal
                            visible={showRatingPopup}
                            transparent={true}
                            animationType='slide'
                        >
                            <RatingPopup close={() => {
                                setShowRatingPopup(false)
                            }} place={data}
                                addReview={(review) => {
                                    console.log('review added', review)
                                    setReviews([...reviews, review])
                                    getDetails()
                                }}

                            />


                        </Modal>
                    </ScrollView>
                    <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { marginTop: 0 / 930 * height }]}
                        onPress={() => {
                            reserveDate()
                        }}
                    >
                        <Text style={GlobalStyles.btnText}>Reserve a date night</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    )
}
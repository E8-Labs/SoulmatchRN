import React, { useEffect, useState } from 'react'
import customFonts from '../../../../assets/fonts/Fonts'
import { View, KeyboardAvoidingView, Modal, TouchableOpacity, TouchableWithoutFeedback, Platform, StyleSheet, Text, Keyboard, Dimensions, StatusBar, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native'
import Apis from "../../apis/Apis"
import { Image } from 'expo-image'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import colors from '../RangeSlider/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import { GetBudget } from '../../../../Services/dates/GetBudget'
import { useFocusEffect } from '@react-navigation/native'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import GetDateDetails from '../../../../Services/dates/GetDateDetails'
import ApisPath from '../../../../lib/ApisPath/ApisPath'

const DateDetails = ({ navigation, route }) => {
    const { height, width } = Dimensions.get('window')
    const router = route.params.DATA;
    // const UD = route.params.DATA;
    console.log("Data from last screen  :", router.dateDetails);
    // console.log("Data passed is :", router.DateDetails.Category);

    const [openModal, setOpenModal] = useState(false);
    const [Loading, setLoading] = useState(false);

    const [dateDetails, setDateDetails] = useState({})

    const From = router.from;
    console.log("I am comming from :", From);
    // const UserDateDetails = router.DateDetails;
    const [UserDateDetails, setUserDateDetails] = useState({})
    console.log("UserDate details are :", UserDateDetails);

    useEffect(() => {
        getDetails()
    }, [route.params])


    useEffect(() => {
        // setDateDetails(router)
        const update = () => {
            setDateDetails(router.DateDetails)
        }
        update()
    }, [])

    useEffect(() => {
        console.log("Data of router.DateDetails ", UserDateDetails)
        setUserDateDetails(router.DateDetails)
    }, [router.DateDetails])

    useEffect(() => {
        console.log("Data of date updated ", dateDetails)
        setUserDateDetails(dateDetails)
    }, [dateDetails])


    console.log("Data from previous screen is :", UserDateDetails);
    const getDetails = async () => {
        try {
            const user = await AsyncStorage.getItem("USER")
            if (user) {
                console.log('trying to get date', router.dateDetails.id)
                let d = JSON.parse(user)

                const result = await fetch(ApisPath.ApiGetDateDetails + `?dateId=${router.dateDetails.id}`, {
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
                        setUserDateDetails(json.data)
                        setDateDetails(json.data)

                    } else {
                        console.log('date details message is', json.message)
                    }
                }

            }
        } catch (e) {
            console.log(' get date detainl error ', e)
        }
    }

    const handleModalclick = () => {
        setOpenModal(true);
    }

    const handleBackClick = (UpdateData) => {
        route.params.DateUpdated(dateDetails);
        navigation.pop();
    }

    const handleEdit = () => {
        navigation.navigate('AddNewDate', {
            DATA: {
                dateDetails: UserDateDetails,
                from: 'EditDate',
            },
            updateDate: (UpdateData) => {
                // console.log("Updated Dat")
                setDateDetails(UpdateData.data);
            }
        })
    }

    //api call for deleting user
    const handleDeleteDate = async () => {
        try {
            setLoading(true);
            const data = await AsyncStorage.getItem("USER")
            if (data) {
                let d = JSON.parse(data)


                const AuthToken = d.token
                // const ApiUrl = "https://plurawlapp.com/soulmatch/api/admin/dates/delete_date_place"
                console.log("USerId is :", dateDetails.id);
                const response = await fetch(Apis.DeleteDate, {
                    'method': 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthToken
                    },
                    body: JSON.stringify({ id: dateDetails.id })
                });
                console.log('Result is', response)
                if (response.ok) {
                    const Result = await response.json();
                    console.log("Response of api is :", Result);
                    setOpenModal(false)
                    route.params.DateDeleted(route.params.index)
                    navigation.navigate('AdminTabBarContainer');
                } else {
                    console.log('Response is not ok due to :', response.status);
                }
            }
        } catch (error) {
            console.log('Error occured is :', error);
        } finally {
            setLoading(false);
        }
    }
    // return


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
            <View style={{ display: 'flex', alignItems: 'center', height: height }}>
                {/*change if the screen is irResponsive height: height s*/}
                <View style={{ width: width - 50 }}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="#FFFFFF"
                        translucent={false}
                    />
                    <View style={{ height: height * 0.86 }}>
                        <View style={{ marginTop: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                                <TouchableOpacity onPress={handleBackClick} style={{ width: 46 / 430 * width }}>
                                    <View style={{ height: 46 / 930 * height, width: 46 / 430 * width, borderWidth: 1, borderColor: '#E6E6E6', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
                                        <Image source={require('../../../../assets/Images3/backIcon.png')} style={{ height: 12, width: 6, resizeMode: 'contain' }} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={{
                                    fontWeight: '500', fontSize: 22, fontFamily: customFonts.meduim, width: 270 / 430 * width,
                                }}>
                                    {dateDetails && dateDetails.name}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={handleModalclick} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../../../../assets/Images3/trash.png')} style={{ height: 28, width: 28, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ marginTop: 20 }}>
                                <Image
                                    source={dateDetails && dateDetails.imageUrl ? { uri: dateDetails.imageUrl } :
                                        require('../../../../assets/Images3/imagePlaceholder.webp')}
                                    style={{
                                        height: 240 / 930 * height, width: 370 / 430 * width, borderRadius: 10, resizeMode: 'cover'
                                    }} />
                            </View>

                            <View style={{ marginTop: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={styles.Budget}>
                                        Budget
                                    </Text>
                                    <Text style={[styles.RatingsValue, { textAlign: 'start' }]}>
                                        {dateDetails && GetBudget(dateDetails)}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.Budget}>
                                        Category
                                    </Text>
                                    <Text style={styles.RatingsValue}>
                                        {dateDetails && dateDetails.Category ? dateDetails.Category.name : ""}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.Budget}>
                                        Ratings
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                                        <Image source={require('../../../../assets/Images3/RatingStar.png')} style={{ height: 18, width: 17, resizeMode: 'contain' }} />

                                        <Text style={[styles.RatingsValue, { height: 22 }]}>
                                            {dateDetails && Math.round(dateDetails.rating)}
                                        </Text>

                                    </View>
                                </View>
                            </View>

                            <Text style={{ fontWeight: '400', fontSize: 12, fontFamily: customFonts.regular, color: '#333333', marginTop: 15 }}>
                                Hours of operation
                            </Text>
                            <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.meduim, color: '#333333' }}>
                                {formatTime(dateDetails && dateDetails.openTime)} - {formatTime(dateDetails && dateDetails.closeTime)}
                            </Text>
                            <Text style={{ fontWeight: '400', fontSize: 12, fontFamily: customFonts.regular, color: '#333333', marginTop: 8 }}>
                                Description
                            </Text>
                            <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.meduim, color: '#333333', marginTop: 3 }}>
                                {dateDetails && dateDetails.description}
                            </Text>
                            <Text style={{ fontWeight: '500', fontSize: 20, fontFamily: customFonts.meduim, marginTop: 10 }}>
                                Reviews
                            </Text>
                            {
                                dateDetails && dateDetails.reviews && dateDetails.reviews.length > 0 ? (
                                    <>
                                        <Text style={{ fontSize: 12, fontFamily: customFonts.regular, marginTop: 5 / 930 * height }}>
                                            {dateDetails.totalReviews} Ratings . {dateDetails.totalReviews} Reviews
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
                                                        fill={dateDetails.rating * 20}
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
                                                                    {Math.round(dateDetails.rating)}
                                                                </Text>
                                                            )
                                                        }
                                                    </AnimatedCircularProgress>
                                                    <Image source={require('../../../../assets/images/star.png')}
                                                        style={{
                                                            height: 13, width: 13, resizeMode: 'contain', tintColor: '#E9C600',
                                                            position: 'relative', bottom: 17 / 930 * height
                                                        }}
                                                    />
                                                    <Text style={{ fontSize: 10, fontFamily: customFonts.regular }}>of 5 stars</Text>
                                                </View>
                                                {
                                                    dateDetails && dateDetails.reviews && dateDetails.reviews.length > 0 && (
                                                        dateDetails && dateDetails.reviews.map((item) => (
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
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', width: 230 / 430 * width, gap: 10 }}>

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
                                        <Text style={{ marginTop: 10, fontSize: 14, fontFamily: customFonts.regular, }}>
                                            No reviews
                                        </Text>
                                    </View>
                                )
                            }

                        </ScrollView>

                    </View>

                    <View style={{ display: 'flex', }}>
                        <TouchableOpacity onPress={handleEdit}>
                            <View style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                    Edit
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/*Delete button modal*/}

                    <Modal
                        visible={openModal}
                        transparent={true}
                        animationType='slide'
                        onRequestClose={() => setOpenModal(false)}
                        style={{}}
                    >
                        <View style={{ height: height, backgroundColor: '#00000050' }}>
                            <View style={{ height: height * 0.4, borderTopRightRadius: 25, borderTopLeftRadius: 25, backgroundColor: 'white', width: width, position: 'absolute', bottom: 0, alignItems: 'center' }}>
                                <View style={{ width: width - 50 }}>
                                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 15 / 930 * height, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, fontWeight: '500', fontFamily: customFonts.meduim }}>
                                            Delete
                                        </Text>
                                        <TouchableOpacity onPress={() => setOpenModal(false)} style={{ marginRight: 10 }}>
                                            <Image source={require('../../../../assets/Images3/CrossIcon.png')} style={{ height: 20 / 930 * height, width: 20 / 430 * width, resizeMode: 'contain', }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ height: 0.1, borderWidth: 0.2, borderColor: '#E6E6E6', width: width, marginTop: 20 / 930 * height }}></View>

                                <View style={{ marginTop: 25 }}>
                                    <Image source={require('../../../../assets/Images3/delete1.png')} style={{ height: 120, width: 120, resizeMode: 'contain' }} />
                                </View>

                                <Text style={{ fontWeight: '500', fontFamily: customFonts.meduim, fontSize: 16, color: '#4D4D4D', marginTop: 15 }}>
                                    Are you sure you want to delete date?
                                </Text>

                                <View style={{ width: width - 50, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                                    <TouchableOpacity onPress={() => setOpenModal(false)}>

                                        <View style={{ height: 48 / 930 * height, width: 173 / 430 * width, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, }}>
                                            <Text style={{ fontSize: 16, fontWeight: '500', fontFamily: customFonts.meduim }}>
                                                Cancel
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <View style={{ height: 48 / 930 * height, width: 173 / 430 * width, alignItems: 'center', justifyContent: 'center' }}>
                                        {Loading ?
                                            <View>
                                                <ActivityIndicator color={colors.blueColor} size={'small'} />
                                            </View> :
                                            <TouchableOpacity onPress={handleDeleteDate}>

                                                <View style={{ height: 48 / 930 * height, width: 173 / 430 * width, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E01F1F' }}>
                                                    <Text style={{ fontSize: 16, fontWeight: '500', fontFamily: customFonts.meduim, color: 'white' }}>
                                                        Yes, Delete
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>

                                        }
                                    </View>
                                </View>

                            </View>
                        </View>
                    </Modal>

                </View>
            </View >
        </SafeAreaView >
    )
}

export default DateDetails

const styles = StyleSheet.create({
    Budget: {
        fontWeight: '400',
        fontFamily: customFonts.regular,
        fontSize: 12,
        color: '#333333',
        textAlign: 'center'
    },
    RatingsValue: {
        fontWeight: '500',
        fontSize: 18,
        fontFamily: customFonts.meduim,
        color: '#333333',
        textAlign: 'center'
    }
})
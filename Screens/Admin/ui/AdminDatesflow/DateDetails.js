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

const DateDetails = ({ navigation, route }) => {
    const { height, width } = Dimensions.get('window')
    const router = route.params.DATA;
    // const UD = route.params.DATA;
    // console.log("Data from update is :", UD);
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
        setDateDetails(router)
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

    // useFocusEffect(
    // React.useCallback(() => {
    // if (route.params.DATA.from === 'Dates') {
    // console.log("Cmdsnfksknzxkvksdai :", From);
    // setUserDateDetails2(router.DateDetails);
    // }else if(route.params.DATA.from === 'UpdateDate'){
    // console.log("Coming from update :", route.params.DATA.from);
    // setUserDateDetails2(UD)
    // }
    // }, [])
    // );

    const [updateDate, setUpdateDate] = useState('');

    console.log("Date updated data is :", updateDate.data);
    console.log("Data from previous screen is :", UserDateDetails);

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
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                                    <TouchableOpacity onPress={handleBackClick} style={{ width: 46 / 430 * width }}>
                                        <View style={{ height: 46 / 930 * height, width: 46 / 430 * width, borderWidth: 1, borderColor: '#E6E6E6', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
                                            <Image source={require('../../../../assets/Images3/backIcon.png')} style={{ height: 12, width: 6, resizeMode: 'contain' }} />
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={{ fontWeight: '500', fontSize: 22, fontFamily: customFonts.meduim }}>
                                        {dateDetails.name}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={handleModalclick} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={require('../../../../assets/Images3/trash.png')} style={{ height: 28, width: 28, resizeMode: 'contain' }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Image
                                    source={dateDetails.imageUrl ? { uri: dateDetails.imageUrl } :
                                        require('../../../../assets/Images3/imagePlaceholder.webp')}
                                    style={{
                                        height: 240 / 930 * height, width: 370 / 430 * width, borderRadius: 10, resizeMode: 'cover'
                                    }} />
                            </View>
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
 <Text style={styles.Budget}>
 Budget
 </Text>
 <Text style={styles.Budget}>
 Category
 </Text>
 <Text style={styles.Budget}>
 Ratings
 </Text>
 </View>
 <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
 <Text style={styles.RatingsValue}>
 {GetBudget(dateDetails)}
 </Text>
 <Text style={styles.RatingsValue}>
 {dateDetails.Category ? dateDetails.Category.name : ""}
 </Text>
 <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
 <Image source={require('../../../../assets/Images3/RatingStar.png')} style={{ height: 18, width: 17, resizeMode: 'contain' }} />
 <Text style={[styles.RatingsValue, { height: 26 }]}>
 5.0
 </Text>
 </View>
 </View> */}

                            <View style={{ marginTop: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={styles.Budget}>
                                        Budget
                                    </Text>
                                    <Text style={[styles.RatingsValue, { textAlign: 'start' }]}>
                                        {GetBudget(dateDetails)}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.Budget}>
                                        Category
                                    </Text>
                                    <Text style={styles.RatingsValue}>
                                        {dateDetails.Category ? dateDetails.Category.name : ""}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.Budget}>
                                        Ratings
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                                        <Image source={require('../../../../assets/Images3/RatingStar.png')} style={{ height: 18, width: 17, resizeMode: 'contain' }} />
                                        {dateDetails.ratings ?
                                            <Text style={[styles.RatingsValue, { height: 22 }]}>
                                                {dateDetails.rating}
                                            </Text> :
                                            <Text style={[styles.RatingsValue, { height: 22 }]}>
                                                0
                                            </Text>
                                        }
                                    </View>
                                </View>
                            </View>

                            <Text style={{ fontWeight: '400', fontSize: 12, fontFamily: customFonts.regular, color: '#333333', marginTop: 15 }}>
                                Hours of operation
                            </Text>
                            <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.meduim, color: '#333333' }}>
                                {moment(dateDetails.openTime, "HH:mm:ss").format("h:mm a")} - {moment(dateDetails.closeTime, "HH:mm:ss").format("h:mm a")}
                            </Text>
                            <Text style={{ fontWeight: '400', fontSize: 12, fontFamily: customFonts.regular, color: '#333333', marginTop: 8 }}>
                                Description
                            </Text>
                            <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.meduim, color: '#333333', marginTop: 3 }}>
                                {dateDetails.description}
                            </Text>
                            <Text style={{ fontWeight: '500', fontSize: 20, fontFamily: customFonts.meduim, marginTop: 10 }}>
                                Reviews
                            </Text>
                            <Text style={{ fontWeight: '400', fontSize: 12, fontFamily: customFonts.meduim }}>
                                108+Ratings . 10 Reviews
                            </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 10 }}>
                                <View style={{ borderRadius: 8, width: 73 / 430 * width, borderWidth: 1, borderColor: '#66666660', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <AnimatedCircularProgress
                                            size={50}
                                            width={8}
                                            fill={10}
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
                                                        4.8
                                                    </Text>
                                                )
                                            }
                                        </AnimatedCircularProgress>
                                    </View>
                                    <View style={{ alignItems: 'center', position: 'absolute', top: 90 }}>
                                        <Image source={require('../../../../assets/Images3/RatingStar.png')} style={{ height: 16, width: 15, resizeMode: 'contain' }} />
                                    </View>
                                </View>
                                <View style={{ padding: 16, width: 288 / 430 * width, borderRadius: 10, borderWidth: 1, borderColor: '#66666660' }}>
                                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                        <Image source={require('../../../../assets/Images3/olivia.png')} style={{ height: 46, width: 46, borderRadius: 50, resizeMode: 'contain' }} />
                                        <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.meduim, color: '#333333' }}>
                                            Olivia Williams
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', gap: 3, marginTop: 8 }}>
                                        <Image source={require('../../../../assets/Images3/RatingStar.png')} style={{ height: 14, width: 13, resizeMode: 'contain' }} />
                                        <Image source={require('../../../../assets/Images3/RatingStar.png')} style={{ height: 14, width: 13, resizeMode: 'contain' }} />
                                        <Image source={require('../../../../assets/Images3/RatingStar.png')} style={{ height: 14, width: 13, resizeMode: 'contain' }} />
                                        <Image source={require('../../../../assets/Images3/RatingStar.png')} style={{ height: 14, width: 13, resizeMode: 'contain' }} />
                                        <Image source={require('../../../../assets/Images3/RatingStar.png')} style={{ height: 14, width: 13, resizeMode: 'contain' }} />
                                        <Text style={{ fontWeight: '400', fontSize: 12, fontFamily: customFonts.regular, color: '#666666' }}>
                                            2 days ago
                                        </Text>
                                    </View>
                                    <Text style={{ fontWeight: '400', fontSize: 13, fontFamily: customFonts.regular, color: '#333333' }}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
                                    </Text>
                                </View>
                            </View>
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
                                    <View style={{ height: 48 / 930 * height, width: 173 / 430 * width, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, }}>
                                        <TouchableOpacity onPress={() => setOpenModal(false)}>
                                            <Text style={{ fontSize: 16, fontWeight: '500', fontFamily: customFonts.meduim }}>
                                                Cancel
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ height: 48 / 930 * height, width: 173 / 430 * width, alignItems: 'center', justifyContent: 'center' }}>
                                        {Loading ?
                                            <View>
                                                <ActivityIndicator color={colors.blueColor} size={'small'} />
                                            </View> :
                                            <View style={{ height: 48 / 930 * height, width: 173 / 430 * width, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E01F1F' }}>
                                                <TouchableOpacity onPress={handleDeleteDate}>
                                                    <Text style={{ fontSize: 16, fontWeight: '500', fontFamily: customFonts.meduim, color: 'white' }}>
                                                        Yes, Delete
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
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
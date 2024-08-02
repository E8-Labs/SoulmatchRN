import { View, Text, Dimensions, TouchableOpacity, SafeAreaView, TextInput, ScrollView, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Image } from 'expo-image'
import customFonts from '../../assets/fonts/Fonts'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import colors from '../../assets/colors/Colors'
import DatesFilterPopup from '../../Components/DatesFilterPopup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ApisPath from '../../lib/ApisPath/ApisPath'
import { GetBudget } from '../../Services/dates/GetBudget'
const dateImage = require('../../assets/images/datenight.png')
const { height, width } = Dimensions.get('window')

export default function InviteDateFromChatScreen({ navigation, route }) {

    const data = route.params.data
    console.log('user id from chat screen is', data)

    const timerRef = useRef(null)

    const [openModal, setOpenModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(false)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')

    const [finalFilters, setFinalFilters] = useState({
        category: -1
    })

   
    useEffect(() => {
        getDates("Final Filters Change")
    }, [finalFilters])
    useEffect(() => {

        // Clear the previous timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            console.log("Search timer clicked", search)
            if (search !== null) {
                getDates("From Search Timer Change");
            }
        }, 300);

        // Cleanup function to clear the timer when component unmounts
        return () => clearTimeout(timerRef.current);

    }, [search]);

    const getDates = async (from = "None") => {
        console.log("-----------------------------------------------------------")
        console.log("")
        console.log('trying to get dates from ', from)
        setLoading(true)

        const data = await AsyncStorage.getItem("USER")
        try {
            if (data) {
                let d = JSON.parse(data)
                let apiUrl = null
                let path = ApisPath.ApiGetDates+`?allPlaces=true`
                let firstParamSplitter = "&"
                if (typeof finalFilters.category !== 'undefined' && finalFilters.category !== -1) {
                    console.log("Category is in api ", finalFilters.category)
                    path = `${path}${firstParamSplitter}category=${finalFilters.category}`
                    firstParamSplitter = "&"
                }
                if (search !== null) {
                    path = `${path}${firstParamSplitter}search=${search}`
                    firstParamSplitter = "&"
                }
                if (typeof finalFilters.minBudget !== 'undefined' && finalFilters.minBudget !== null) {
                    path = `${path}${firstParamSplitter}minBudget=${finalFilters.minBudget}`
                    firstParamSplitter = "&"
                }
                if (typeof finalFilters.maxBudget !== 'undefined' && finalFilters.maxBudget !== null) {
                    path = `${path}${firstParamSplitter}maxBudget=${finalFilters.maxBudget}`
                    firstParamSplitter = "&"
                }
                if (typeof finalFilters.minRating !== 'undefined' && finalFilters.minRating !== null) {
                    path = `${path}${firstParamSplitter}minRating=${finalFilters.minRating}`
                    firstParamSplitter = "&"
                }
                if (typeof finalFilters.maxRating !== 'undefined' && finalFilters.maxRating !== null) {
                    path = `${path}${firstParamSplitter}maxRating=${finalFilters.maxRating}`
                    firstParamSplitter = "&"
                }
                if (typeof finalFilters.city !== 'undefined' && finalFilters.city !== null) {
                    path = `${path}${firstParamSplitter}city=${finalFilters.city}`
                    firstParamSplitter = "&"
                }
                if (typeof finalFilters.state !== 'undefined' && finalFilters.state !== null) {
                    path = `${path}${firstParamSplitter}state=${finalFilters.state}`
                    firstParamSplitter = "&"
                }
                apiUrl = path;
                console.log("Api path is ", apiUrl)


                const result = await fetch(apiUrl, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + d.token
                    }
                })
                // console.log('result', result)
                if (result) {
                    setLoading(false)
                    let json = await result.json()
                    console.log("Api Filters Response is ", json)
                    if (json.status === true) {
                        console.log('get dates are', json.data)
                        setDate(json.data)
                    }
                    else {
                        console.log('json message is', json.message)
                    }
                }

            }
        } catch (error) {
            console.log('error finding in get dates', error)
        }
        console.log("")
        console.log("-----------------------------------------------------------")

    }
    const handleContinue = () => {
        if (!selectedDate) {
            setError("Select a date")
            return
        }
        console.log('selected date is', selectedDate)
        navigation.navigate("ReserveNightScreen", {
            data: {
                date: selectedDate,
                from: 'ChatScreen',
                userId: data.userId
            }
        })
    }
    const closeModal = (filters) => {
        if (filters) {
            console.log('filters received from popup are', filters)

            // setDateFilters(filters)
            // setFinalFilters(filters)
            setFinalFilters(prevFilters => ({
                ...prevFilters,
                ...filters
            }));
        }
        setOpenModal(false)
    }




    return (
        <SafeAreaView>
            <TouchableWithoutFeedback style={{ height: height }} onPress={Keyboard.dismiss}>

                <View style={{ height: height, width: width, alignItems: 'center' }}>
                    <View style={{ width: width - 60 / 430 * width, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                            <TouchableOpacity onPress={() => {
                                navigation.goBack()
                            }}>
                                <View style={GlobalStyles.backBtn}>
                                    <Image source={require('../../assets/images/backArrow.png')}
                                        style={GlobalStyles.backBtnImage}
                                    />
                                </View>
                            </TouchableOpacity>

                            <Text style={{ fontSize: 24, fontFamily: customFonts.meduim }}>Invite to date</Text>

                        </View>
                        <TouchableOpacity onPress={() => {
                            setOpenModal(true)
                        }}>
                            <Image source={require('../../assets/images/setting.png')}
                                style={{ height: 28 / 930 * height, width: 28 / 430 * width }}
                            />
                        </TouchableOpacity>



                    </View>
                    <DatesFilterPopup visible={openModal} close={closeModal} closeWithouFilters={() => {
                        setOpenModal(false)
                    }} filters={finalFilters} />
                    <View style={{
                        width: width - 60 / 430 * width, backgroundColor: colors.greyText, paddingHorizontal: 16 / 930 * height, paddingVertical: 16 / 430 * width,
                        marginTop: 30 / 930 * height, borderRadius: 10
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, width: 300 / 430 * width }}>
                            <Image source={require('../../assets/images/searchIcon.png')}
                                style={{ height: 24 / 930 * height, width: 24 / 430 * width }}
                            />
                            <TextInput placeholder='Search'
                                value={search}
                                onChangeText={setSearch}
                                style={{ fontSize: 14, fontFamily: customFonts.meduim, width: 300 / 430 * width }}
                            />

                        </View>
                    </View>

                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: width - 60 / 430 * width, marginTop: 30 / 930 * height }}>
                        <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>Date ideas </Text>
                        <ScrollView style={{ height: height * 0.6, width: width }} showsVerticalScrollIndicator={false}>
                            {
                                loading ? (
                                    <ActivityIndicator size={'large'} color={colors.blueColor} style={{ height: height * 0.5, width: width - 60 }} />
                                ) : (

                                    <View style={{ gap: 8, flexDirection: 'row', width: width - 40 / 430 * width, alignItems: 'center', flexWrap: 'wrap', marginTop: 20 }}>

                                        {
                                            date && date.map((item) => (
                                                <TouchableOpacity key={item.id}
                                                    onPress={() => {
                                                        setSelectedDate(item)
                                                        setError(null)
                                                    }}
                                                >
                                                    <View style={{
                                                        alignItems: 'center', padding: 12, borderWidth: 1, borderColor: selectedDate.id === item.id ? colors.blueColor : colors.greyText, borderRadius: 10,
                                                        marginLeft: 0 / 430 * width, flexDirection: 'column', gap: 10 / 930 * height
                                                    }}>
                                                        <Image source={{ uri: item.imageUrl }}
                                                            style={{ height: 98 / 930 * height, width: 158 / 430 * width, borderRadius: 10, resizeMode: 'cover' }}
                                                        />
                                                        <View style={{ alignItems: 'flex-start', flexDirection: 'column', width: 150 / 430 * width, }}>
                                                            <Text numberOfLines={1} style={{ fontSize: 16, fontFamily: customFonts.meduim, }}>{item.name}</Text>
                                                        </View>

                                                        <View style={{ alignItems: 'cemter', flexDirection: 'row', width: 150 / 430 * width, justifyContent: 'space-between' }}>
                                                            <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Budget</Text>
                                                            <Text style={{ fontSize: 12, fontFamily: customFonts.meduim }}>{GetBudget(item)}</Text>
                                                        </View>
                                                        <View style={{ alignItems: 'cemter', flexDirection: 'row', width: 150 / 430 * width, justifyContent: 'space-between' }}>
                                                            <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Ratings</Text>
                                                            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                                                                <Image source={require('../../assets/images/star.png')}
                                                                    style={{ height: 12 / 930 * height, width: 12 / 930 * height }}
                                                                />
                                                                <Text style={{ fontSize: 12, fontFamily: customFonts.meduim }}>{Math.round(item.rating)}</Text>
                                                            </View>

                                                        </View>
                                                        <View style={{ alignItems: 'cemter', flexDirection: 'row', width: 150 / 430 * width, justifyContent: 'space-between' }}>
                                                            <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Category</Text>
                                                            <Text numberOfLines={1} style={{ fontSize: 12, fontFamily: customFonts.meduim ,width:80/430*width}}>{item.Category.name}</Text>
                                                        </View>

                                                    </View>
                                                </TouchableOpacity>

                                            ))
                                        }

                                    </View>
                                )}
                        </ScrollView>
                    </View>
                    {
                        error && <Text style={GlobalStyles.errorText}>{error}</Text>
                    }
                    <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { marginTop: 30 / 930 * height }]}
                        onPress={() => {
                            handleContinue()
                        }}
                    >
                        <Text style={GlobalStyles.btnText}>Continue</Text>
                    </TouchableOpacity>

                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}
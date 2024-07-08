import React, { useEffect, useState, useRef } from 'react'
import {
    View, Text, TextInput, TouchableOpacity, Dimensions, FlatList, SafeAreaView, ScrollView,
    ActivityIndicator, Animated, Easing, StyleSheet, DeviceEventEmitter,
    Keyboard
} from 'react-native';
import customFonts from '../../assets/fonts/Fonts'
import { useFocusEffect } from '@react-navigation/native';
import GlobalStyles from '../../assets/styles/GlobalStyles'
import colors from '../../assets/colors/Colors';
import { Image } from 'expo-image';
import ApisPath from '../../lib/ApisPath/ApisPath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetBudget } from '../../Services/dates/GetBudget';
import DatesFilterPopup from '../../Components/DatesFilterPopup';
import { BroadcastEvents, placholder } from '../../models/Constants';

const { height, width } = Dimensions.get('window')
const searchIcon = require('../../assets/images/searchIcon.png')
const closeIcon = require('../../assets/images/close.png')

export default function DatesContainer({ navigation }) {


    const [finalFilters, setFinalFilters] = useState({
        category: -1
    })
    const timerRef = useRef(null)

    const searchWidth = useRef(new Animated.Value(0)).current; // Initial width of the search field
    const searchOpacity = useRef(new Animated.Value(0)).current;
    const textInputRef = useRef(null);


    const [dateNights, setDateNights] = useState([])
    const [recommendedDates, SetRecommendedDates] = useState([])
    const [upComingDates, setUpComingDates] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [showmodal, setShowModal] = useState(false);
    const [isSearching, setIsSearching] = useState(false)
    const [search, setSearch] = useState('');
    const [searchDates, setSearchDates] = useState(null);
    const [showKeyboard, setShowKeyboard] = useState(false)
    // const [dateFilters, setDateFilters] = useState({})


    useFocusEffect(
        React.useCallback(() => {

        })
    )
    useEffect(() => {
        const listener = DeviceEventEmitter.addListener(BroadcastEvents.EventUpcomingDateAdded, (data) => {
            console.log('date object received from broad cast', data)
            console.log('prev upcoming dates are', upComingDates)

            setUpComingDates(prevDates => [...prevDates, data]);
            
        })
        return () => {
            listener.remove()
        }
    }, [])



    

    useEffect(()=>{
        console.log('upcoming dates after update', upComingDates)
    },[upComingDates])




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
        setShowModal(false)
    }


    useEffect(() => {
        getDateCategories()

    }, [])

    useEffect(() => {
        getDates("Final Filters Change")
    }, [finalFilters])

    const getDateCategories = async () => {
        try {
            console.log("trying to get date category")
            const data = await AsyncStorage.getItem('USER')
            if (data) {
                let d = JSON.parse(data)
                let AuthToken = d.token

                const result = await fetch(ApisPath.ApiGetDateCategories, {
                    'method': 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthToken
                    }
                });
                if (result) {
                    const json = await result.json();
                    if (json.status === true) {
                        // console.log('date categories are ', json.data)
                        let allCats = [{
                            id: -1,
                            name: "All"
                        }]
                        let merged = [...allCats, ...json.data]
                        setCategories(merged)

                    } else {
                        console.log('date catogries message', json.message)
                    }

                }
            }
        } catch (e) {
            console.log('error finding in date catogories ', e)
        }

    }

    useEffect(() => {

        // Clear the previous timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setDateNights([])
        // setUpComingDates([])
        SetRecommendedDates([])
        // setNoMoreUsers(false)
        // Set a new timer
        timerRef.current = setTimeout(() => {
            console.log("Search timer clicked", search)
            if (search !== null) {
                getDates("From Search Timer Change");
            }
        }, 300);

        // Cleanup function to clear the timer when component unmounts
        return () => clearTimeout(timerRef.current);

    }, [search]);


    //search bar timer code

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
                let path = ApisPath.ApiGetDates
                let firstParamSplitter = "?"
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
                        const newDateNights = json.data.dateNights;
                        const newRecommended = json.data.recommended;
                        const newUpcomings = json.data.upcoming;
                        if (newDateNights) {
                            // console.log("Prev list ", newDateNights)
                            setDateNights(newDateNights)
                        }
                        if (newRecommended) {
                            // console.log("Prev list ", newRecommended)
                            SetRecommendedDates(newRecommended)
                        }
                        if (newUpcomings) {
                            // console.log("Prev list ", newUpcomings)
                            setUpComingDates(newUpcomings)
                        }
                        // setDateNights(json.data.dateNights)
                        // SetRecommendedDates(json.data.recommended)
                        // setUpComingDates(json.data.upcoming)
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

    const handleDateSelect = (item) => {

        navigation.navigate('SelectedDateDetails', {
            data: item,
            selectedDate: getInvitedDate
        })
    }

    const getInvitedDate = (date) => {
        console.log('invited date received on dates container screen is', date)
        setUpComingDates(prevDate => [...prevDate, date])
    }

    useEffect(() => {

    }, [isSearching])

    const handleSearchPress = () => {

        if (isSearching) {
            Keyboard.dismiss()
            setSearch('')
            textInputRef.current?.setNativeProps({ text: '' });
            setShowKeyboard(false)
        } else {
            setShowKeyboard(true)
            textInputRef.current?.focus()
        }
        setIsSearching(prev => !prev)

        Animated.parallel([
            Animated.timing(searchWidth, {
                toValue: isSearching ? 0 : 280 / 430 * width, // Change 250 to the desired width of the search field
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
            Animated.timing(searchOpacity, {
                toValue: isSearching ? 0 : 1, // Change opacity for smooth transition
                duration: 50,
                delay: isSearching ? 300 : 30,
                easing: Easing.linear,
                useNativeDriver: false,
            })
        ]).start();
    }

    return (

        <SafeAreaView style={{ alignItems: 'center', height: height, backgroundColor: 'white' }}>
            {/* <View style={{
 backgroundColor: 'red',width: width,
 }}> */}
            <View style={{
                alignItems: 'flex-end', flexDirection: 'row', height: 50 / 930 * height, width: width, alignSelf: 'center',
                justifyContent: 'space-between', paddingLeft: 20,
            }}>
                <Text style={{ fontSize: 23, fontFamily: customFonts.meduim, paddingBottom: 10 }}>Dates</Text>

                <Animated.View style={[styles.searchContainer, { width: searchWidth, opacity: searchOpacity }]}>
                    <View style={styles.searchInput}>
                        <TextInput
                            style={{ width: 230 / 430 * width, backgroundColor: 'transparent' }}
                            ref={textInputRef}
                            autoCorrect={false} autoComplete='none'
                            spellCheck={false}
                            placeholder="Search"
                            placeholderTextColor="#aaa"
                            autoFocus={showKeyboard}
                            Value={search}
                            onChangeText={(e) => {
                                setSearch(e)
                            }}

                        // onFocus={() => setShowKeyboard(true)}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                handleSearchPress()
                                // setSearch('')
                            }}
                        >
                            <Image source={closeIcon}
                                style={{ height: 20, width: 20 }}
                            />
                        </TouchableOpacity>

                    </View>
                </Animated.View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>


                    {
                        !isSearching &&
                        <TouchableOpacity style={{ paddingBottom: 10 }}
                            onPress={() => {
                                handleSearchPress()
                            }}
                        >
                            <Image source={searchIcon}
                                style={GlobalStyles.backBtnImage}
                            />
                        </TouchableOpacity>
                    }

                    <TouchableOpacity style={{ paddingBottom: 10 }}
                        onPress={() => {
                            setShowModal(true)
                        }}
                    >
                        <Image source={require('../../assets/images/setting.png')}
                            style={GlobalStyles.backBtnImage}
                        />
                    </TouchableOpacity>

                    <DatesFilterPopup visible={showmodal} close={closeModal} closeWithouFilters={() => {
                        setShowModal(false)
                    }} filters={finalFilters} />

                </View>
            </View>

            {/* </View> */}
            <View style={{ alignItems: 'center', height: height * 0.75, backgroundColor: 'transparent' }}>
                <ScrollView style={{}} showsVerticalScrollIndicator={false}>

                    <View style={{ alignItems: 'center' }}>
                        <View style={{ width: width, marginTop: 25, height: 43 / 930 * height }}>
                            {/* category */}
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                data={categories}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={{ alignItems: 'center', marginLeft: 20/430*width }}>
                                        <TouchableOpacity onPress={() => {

                                            setFinalFilters(prevState => ({
                                                ...prevState,
                                                category: item.id,
                                            }))

                                        }}
                                            style={{
                                                paddingVertical: 6, paddingHorizontal: 20,
                                                backgroundColor: finalFilters && finalFilters.category === item.id ? colors.blueColor : '#f5f5f5', borderRadius: 4
                                            }}
                                        >
                                            <Text style={{
                                                fontSize: 16, fontFamily: customFonts.meduim, color: finalFilters.category === item.id ? "#fff" : '#000'
                                            }}>
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </View>
                        {
                            loading ? (
                                <ActivityIndicator size={'large'} color={colors.blueColor} style={{ height: height * 0.8, alignSelf: 'center' }} />
                            ) : (

                                <>
                                    <View style={{
                                        width: width - 40 / 430 * width, flexDirection: 'row', flexDirection: 'row', alignItems: 'center',
                                        justifyContent: 'space-between', marginTop: 24 / 930 * height, marginBottom: 20 / 930 * height
                                    }}>
                                        <Text style={{ fontSize: 18, fontFamily: customFonts.meduim }}>Date nights</Text>
                                        {/* <TouchableOpacity> */}
                                        <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                            style={GlobalStyles.backBtnImage}
                                        />
                                        {/* </TouchableOpacity> */}
                                    </View>

                                    {/* date nights */}
                                    {
                                        dateNights && dateNights.length > 0 ? (

                                            <FlatList
                                                horizontal
                                                style={{ width: width }}
                                                showsHorizontalScrollIndicator={false}
                                                data={dateNights && dateNights}
                                                renderItem={({ item }) => (


                                                    <TouchableOpacity onPress={() => {
                                                        handleDateSelect(item)
                                                    }}
                                                        style={{ alignSelf: 'flex-start', }}
                                                    >
                                                        <View style={{
                                                            alignItems: 'center', padding: 12, borderWidth: 1, borderColor: colors.greyText, borderRadius: 10,
                                                            marginLeft: 20 / 430 * width, flexDirection: 'column', gap: 10 / 930 * height
                                                        }}>
                                                            <Image source={{ uri: item.imageUrl }}
                                                                style={{ height: 98 / 930 * height, width: 158 / 430 * width, borderRadius: 10, resizeMode: 'cover' }}
                                                            />
                                                            <View style={{ alignItems: 'flex-start', flexDirection: 'column', width: 150 / 430 * width, }}>
                                                                <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, }}>{item.name}</Text>
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
                                                                    <Text style={{ fontSize: 12, fontFamily: customFonts.meduim }}>{item.rating}</Text>
                                                                </View>

                                                            </View>
                                                            <View style={{ alignItems: 'cemter', flexDirection: 'row', width: 150 / 430 * width, justifyContent: 'space-between' }}>
                                                                <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Category</Text>
                                                                <Text style={{ fontSize: 12, fontFamily: customFonts.meduim, width: 80 / 430 * width, backgroundColor: 'transparet' }}>{item.Category.name}</Text>
                                                            </View>

                                                        </View>
                                                    </TouchableOpacity>
                                                )}
                                            />
                                        ) : (
                                            <Text style={{ fontSize: 18 }}>No dates</Text>
                                        )
                                    }

                                    <View style={{
                                        width: width - 40 / 430 * width, flexDirection: 'row', flexDirection: 'row', alignItems: 'center',
                                        justifyContent: 'space-between', marginTop: 24 / 930 * height, marginBottom: 20 / 930 * height
                                    }}>
                                        <Text style={{ fontSize: 18, fontFamily: customFonts.meduim }}>Recommended</Text>
                                        {/* <TouchableOpacity> */}
                                        <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                            style={GlobalStyles.backBtnImage}
                                        />

                                        {/* </TouchableOpacity> */}
                                    </View>
                                    {
                                        recommendedDates && recommendedDates.length > 0 ? (

                                            <FlatList
                                                style={{ width: width }}
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                data={recommendedDates && recommendedDates}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity onPress={() => {
                                                        handleDateSelect(item)
                                                    }}
                                                        style={{ alignItems: 'flex-start' }}

                                                    >
                                                        <View style={{
                                                            alignItems: 'center', padding: 12, borderWidth: 1, borderColor: colors.greyText, borderRadius: 10,
                                                            marginLeft: 20 / 430 * width, flexDirection: 'column', gap: 10 / 930 * height
                                                        }}>
                                                            <Image source={{ uri: item.imageUrl }}
                                                                style={{ height: 98 / 930 * height, width: 158 / 430 * width, borderRadius: 10, resizeMode: 'cover' }}
                                                            />
                                                            <View style={{ alignItems: 'flex-start', flexDirection: 'column', width: 150 / 430 * width, }}>
                                                                <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, }}>{item.name}</Text>
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
                                                                    <Text style={{ fontSize: 12, fontFamily: customFonts.meduim }}>{item.rating}</Text>
                                                                </View>

                                                            </View>
                                                            <View style={{ alignItems: 'cemter', flexDirection: 'row', width: 150 / 430 * width, justifyContent: 'space-between' }}>
                                                                <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Category</Text>
                                                                <Text style={{ fontSize: 12, fontFamily: customFonts.meduim, width: 80 / 430 * width }}>{item.Category.name}</Text>
                                                            </View>

                                                        </View>
                                                    </TouchableOpacity>
                                                )}
                                            />
                                        ) : (
                                            <Text style={{ fontSize: 18 }}>No dates</Text>
                                        )
                                    }



                                    <View style={{ width: width - 60 / 430 * width, alignItems: 'flex-start', marginTop: 22 / 930 * height, marginBottom: 22 / 930 * height }}>
                                        <Text style={{ fontSize: 18, fontFamily: customFonts.meduim }}>Upcoming Dates</Text>
                                    </View>

                                    {/* upcoming dates */}

                                    {
                                        upComingDates && upComingDates.length > 0 ? (

                                            <FlatList
                                                style={{ marginBottom: isSearching ? 150 : 50, width: width }}
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                data={upComingDates && upComingDates}
                                                renderItem={({ item }) => (
                                                    // <TouchableOpacity 
                                                    // onPress = {()=>{
                                                    // navigation.navigate('SelectedDateDetails',{
                                                    // data:item
                                                    // }) 
                                                    // }}
                                                    // >
                                                    <View style={{
                                                        alignItems: 'flex-start', padding: 12, borderWidth: 1, borderColor: colors.greyText, borderRadius: 10,
                                                        marginLeft: 15 / 430 * width, flexDirection: 'column', gap: 10 / 930 * height
                                                    }}>
                                                        <Image source={{ uri: item.datePlace.imageUrl }}
                                                            style={{ height: 98 / 930 * height, width: 158 / 430 * width, borderRadius: 10, resizeMode: 'cover' }}
                                                        />
                                                        <View style={{ alignItems: 'flex-start', flexDirection: 'column', width: 150 / 430 * width, }}>
                                                            <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, }}>{item.datePlace.name}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, alignSelf: 'flex-start' }}>
                                                            <Image source={item.dateUser?{ uri: item.dateUser.profile_image }:placholder}
                                                                style={{
                                                                    height: 40 / 930 * height, width: 40 / 930 * height, borderRadius: 20, resizeMode: 'cover'
                                                                }}
                                                            />
                                                            <Text style={{ fontSize: 18, color: '' }}>{item.dateUser&&item.dateUser.first_name}</Text>
                                                        </View>


                                                    </View>
                                                    // </TouchableOpacity>
                                                )}
                                            />

                                        ) : (
                                            <>

                                                <Image source={require('../../assets/images/activeDates.png')}
                                                    style={{ height: 80 / 930 * height, width: 80 / 930 * height, marginTop: 30 / 930 * height }}
                                                />

                                                <Text style=
                                                    {{
                                                        width: 268 / 430 * width, color: "#666666", fontSize: 16, fontFamily: customFonts.regular, textAlign: 'center', marginTop: 18 / 930 * height
                                                    }}>
                                                    You don't have any upcoming dates planned
                                                </Text>

                                                <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { marginTop: 40 / 930 * height, marginBottom: isSearching ? 100 : 0 }]}
                                                    onPress={() => {
                                                        navigation.navigate("PlanDateNight")
                                                    }}
                                                >
                                                    <Text style={GlobalStyles.btnText}>
                                                        Plan a date night
                                                    </Text>
                                                </TouchableOpacity>

                                            </>
                                        )
                                    }
                                </>
                            )}





                    </View>


                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        alignSelf: 'center',
        overflow: 'hidden',
        marginLeft: 10,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: 280 / 430 * width
    },
    searchInput: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})
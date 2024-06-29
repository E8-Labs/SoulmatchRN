import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions, FlatList, SafeAreaView, ScrollView, Settings, ActivityIndicator } from 'react-native';
import customFonts from '../../assets/fonts/Fonts'
import { useFocusEffect } from '@react-navigation/native';
import GlobalStyles from '../../assets/styles/GlobalStyles'
import colors from '../../assets/colors/Colors';
import { Image } from 'expo-image';
import ApisPath from '../../lib/ApisPath/ApisPath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetBudget } from '../../Services/dates/GetBudget';
const { height, width } = Dimensions.get('window')

export default function DatesContainer({ navigation }) {

    const [selectedCategory, setSelectedCategory] = useState(-1)
    const [dateNights, setDateNights] = useState([])
    const [recommendedDates, SetRecommendedDates] = useState([])
    const [upComingDates, setUpComingDates] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getDates()
        getDateCategories()
    }, [])
    useEffect(() => {
        getDates()
    }, [selectedCategory])

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
                        console.log('date categories are ', json.data)
                        let allCats = [{
                            id: -1,
                            name: "All"
                        }]
                        let merged = [...allCats, ...json.data]
                        setCategories(merged)

                    } else {
                        console.log('date catogries message', json.message)
                    }
                    // setApiCategories(DATA.data.name);
                    // const apiData = DATA.data;
                    // const transformedData = apiData.map(item => ({
                    //     value: item.id,
                    //     label: item.name
                    // }));

                    // // Set the transformed data to ApiCategories
                    // setApiCategories(transformedData);
                    // // console.log('Resposne from api is', DATA.data)
                }
            }
        } catch (e) {
            console.log('error finding in date catogories ', e)
        }

    }

    //search bar timer code
    

    const getDates = async () => {
        console.log('trying to get dates')
        setLoading(true)
        const data = await AsyncStorage.getItem("USER")
        try {
            if (data) {
                let d = JSON.parse(data)
                let apiUrl = null
                if (selectedCategory !== -1) {
                    // console.log('object', object)
                    apiUrl = ApisPath.ApiGetDates + `?category=${selectedCategory}`
                    console.log('api url is', apiUrl)
                    // return
                } else {
                    apiUrl = ApisPath.ApiGetDates
                }

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
                    if (json.status === true) {
                        console.log('get dates are', json.data)
                        setDateNights(json.data.dateNights)
                        SetRecommendedDates(json.data.recommended)
                        setUpComingDates(json.data.upcoming)
                    }
                    else {
                        console.log('json message is', json.message)
                    }
                }
            }
        } catch (error) {
            console.log('error finding in get dates', error)
        }

    }
   
    return (

        <SafeAreaView style={{ alignItems: 'center' }}>
            <View style={{ alignItems: 'center', height: height * 0.76 }}>
                <ScrollView style={{}} showsVerticalScrollIndicator={false}>

                    <View style={{ alignItems: 'center' }}>
                        <View style={{ width: width, marginTop: 25, height: 43 / 930 * height }}>
                            {/* category  */}
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                data={categories}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={{ alignItems: 'center', marginLeft: 8 }}>
                                        <TouchableOpacity onPress={() => {
                                            setSelectedCategory(item.id)
                                        }}
                                            style={{
                                                paddingVertical: 6, paddingHorizontal: 20,
                                                backgroundColor: selectedCategory === item.id ? colors.blueColor : '#f5f5f5', borderRadius: 4
                                            }}
                                        >
                                            <Text style={{
                                                fontSize: 16, fontFamily: customFonts.meduim, color: selectedCategory === item.id ? "#fff" : '#000'
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
                                        width: width - 60 / 430 * width, flexDirection: 'row', flexDirection: 'row', alignItems: 'center',
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
                                                        navigation.navigate('SelectedDateDetails', {
                                                            data: item
                                                        })

                                                    }}
                                                        style={{ alignSelf: 'flex-start', }}
                                                    >
                                                        <View style={{
                                                            alignItems: 'center', padding: 12, borderWidth: 1, borderColor: colors.greyText, borderRadius: 10,
                                                            marginLeft: 15 / 430 * width, flexDirection: 'column', gap: 10 / 930 * height
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
                                                                <Text style={{ fontSize: 12, fontFamily: customFonts.meduim }}>{item.Category.name}</Text>
                                                            </View>

                                                        </View>
                                                    </TouchableOpacity>
                                                )}
                                            />
                                        ) : (
                                            <Text style={{ fontSize: 18 }}>No dates</Text>
                                        )
                                    }
                                    {/* 
                        <DateNightsList navigate={(item) => {
                            console.log('selected date night details are', item)
                            navigation.navigate("SelectedDateDetails")
                        }} /> */}


                                    <View style={{
                                        width: width - 60 / 430 * width, flexDirection: 'row', flexDirection: 'row', alignItems: 'center',
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
                                                        navigation.navigate('SelectedDateDetails', {
                                                            data: item
                                                        })
                                                    }}
                                                        style={{ alignItems: 'flex-start' }}

                                                    >
                                                        <View style={{
                                                            alignItems: 'center', padding: 12, borderWidth: 1, borderColor: colors.greyText, borderRadius: 10,
                                                            marginLeft: 15 / 430 * width, flexDirection: 'column', gap: 10 / 930 * height
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
                                                                <Text style={{ fontSize: 12, fontFamily: customFonts.meduim }}>{item.Category.name}</Text>
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
                                                style={{ marginBottom: 30, width: width }}
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                data={upComingDates && upComingDates}
                                                renderItem={({ item }) => (
                                                    // <TouchableOpacity 
                                                    //     onPress = {()=>{
                                                    //         navigation.navigate('SelectedDateDetails',{
                                                    //             data:item
                                                    //         })            
                                                    //     }}
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
                                                            <Image source={{ uri: item.dateUser.profile_image }}
                                                                style={{
                                                                    height: 40 / 930 * height, width: 40 / 930 * height, borderRadius: 20, resizeMode: 'cover'
                                                                }}
                                                            />
                                                            <Text style={{ fontSize: 18, color: '' }}>{item.dateUser.first_name}</Text>
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

                                                <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { marginTop: 40 / 930 * height, marginBottom: 50 }]}
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
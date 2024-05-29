import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity,  Dimensions, FlatList, SafeAreaView, ScrollView, Settings } from 'react-native';
import customFonts from '../../assets/fonts/Fonts'
import { useFocusEffect } from '@react-navigation/native';
import GlobalStyles from '../../assets/styles/GlobalStyles'
import colors from '../../assets/colors/Colors';
import { Image } from 'expo-image';
import ApisPath from '../../lib/ApisPath/ApisPath';

const { height, width } = Dimensions.get('window')

export default function DatesContainer({ navigation }) {

    const [selectedCategory, setSelectedCategory] = useState(1)
    const [dateNights, setDateNights] = useState([])
    const [recommendedDates, SetRecommendedDates] = useState([])
    const [upComingDates, setUpComingDates] = useState([])

    const categories = [
        {
            id: 1,
            name: "All"
        },
        {
            id: 2,
            name: "Culinary Adventure"
        },
        {
            id: 3,
            name: "Outdoor Escapades"
        },
        {
            id: 4,
            name: "Cultural Experiences"
        },
        {
            id: 5,
            name: "Relaxation Retreats"
        },
        {
            id: 6,
            name: "Fun & Games"
        },

    ]
    useFocusEffect(
        React.useCallback(() => {
            console.log("Use Focus Effect")
            getDates()
        }, [])
    );
    useEffect(() => {
        getDates()
    }, [])

    const getDates = async () => {
        console.log('trying to get dates')
        const data = Settings.get("USER")
        try {
            if (data) {
                let d = JSON.parse(data)

                const result = await fetch(ApisPath.ApiGetDates, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + d.token
                    }
                })
                // console.log('result', result)
                if (result) {

                    let json = await result.json()
                    if (json.status === true) {
                        console.log('dates are', json.data)
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
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                data={categories}
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

                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={dateNights && dateNights}
                            renderItem={({ item }) => (



                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('SelectedDateDetails',{
                                        data:item
                                    })

                                }}>
                                    <View style={{
                                        alignItems: 'center', padding: 12, borderWidth: 1, borderColor: colors.greyText, borderRadius: 10,
                                        marginLeft: 15 / 430 * width, flexDirection: 'column', gap: 10 / 930 * height
                                    }}>
                                        <Image source={{ uri: item.imageUrl }}
                                            style={{ height: 98 / 930 * height, width: 158 / 430 * width, borderRadius: 10, resizeMode: 'contain' }}
                                        />
                                        <View style={{ alignItems: 'flex-start', flexDirection: 'column', width: 150 / 430 * width, }}>
                                            <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, }}>{item.name}</Text>
                                        </View>

                                        <View style={{ alignItems: 'cemter', flexDirection: 'row', width: 150 / 430 * width, justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Budget</Text>
                                            <Text style={{ fontSize: 12, fontFamily: customFonts.meduim }}>{item.maxBudget}$</Text>
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

                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={recommendedDates && recommendedDates}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress = {()=>{
                                    navigation.navigate('SelectedDateDetails',{
                                        data:item
                                    })
                                }}>
                                    <View style={{
                                        alignItems: 'center', padding: 12, borderWidth: 1, borderColor: colors.greyText, borderRadius: 10,
                                        marginLeft: 15 / 430 * width, flexDirection: 'column', gap: 10 / 930 * height
                                    }}>
                                        <Image source={{ uri: item.imageUrl }}
                                            style={{ height: 98 / 930 * height, width: 158 / 430 * width, borderRadius: 10, resizeMode: 'contain' }}
                                        />
                                        <View style={{ alignItems: 'flex-start', flexDirection: 'column', width: 150 / 430 * width, }}>
                                            <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, }}>{item.name}</Text>
                                        </View>

                                        <View style={{ alignItems: 'cemter', flexDirection: 'row', width: 150 / 430 * width, justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Budget</Text>
                                            <Text style={{ fontSize: 12, fontFamily: customFonts.meduim }}>{item.maxBudget}$</Text>
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



                        <View style={{ width: width - 60 / 430 * width, alignItems: 'flex-start', marginTop: 22 / 930 * height }}>
                            <Text style={{ fontSize: 18, fontFamily: customFonts.meduim }}>Upcoming Dates</Text>
                        </View>

                        {
                            upComingDates && upComingDates.length > 0 ? (

                                <FlatList
                                style = {{marginBottom:30}}
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
                                                alignItems: 'center', padding: 12, borderWidth: 1, borderColor: colors.greyText, borderRadius: 10,
                                                marginLeft: 15 / 430 * width, flexDirection: 'column', gap: 10 / 930 * height
                                            }}>
                                                <Image source={{ uri: item.datePlace.imageUrl }}
                                                    style={{ height: 98 / 930 * height, width: 158 / 430 * width, borderRadius: 10, resizeMode: 'contain' }}
                                                />
                                                <View style={{ alignItems: 'flex-start', flexDirection: 'column', width: 150 / 430 * width, }}>
                                                    <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, }}>{item.datePlace.name}</Text>
                                                </View>
                                                <View style = {{flexDirection:'row',alignItems:'center',gap:10,alignSelf:'flex-start'}}> 
                                                    <Image source={{uri:item.dateUser.profile_image}} 
                                                        style = {{
                                                            height:40/930*height,width:40/930*height,borderRadius:20,resizeMode:'cover'
                                                        }}
                                                    />
                                                    <Text style = {{fontSize:18,color:''}}>{item.dateUser.first_name}</Text>
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


                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
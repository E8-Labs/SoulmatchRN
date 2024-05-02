import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, FlatList, SafeAreaView, ScrollView } from 'react-native';
import customFonts from '../../assets/fonts/Fonts'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import colors from '../../assets/colors/Colors';
import DateNightsList from '../../Components/DateNightsList';
import RecommendedDatesList from '../../Components/RecommendedDatesList';

const { height, width } = Dimensions.get('window')

export default function DatesContainer() {
    const [selectedCategory, setSelectedCategory] = useState(1)

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
    return (

        <SafeAreaView style={{ alignItems: 'center' }}>
            <View style={{ alignItems: 'center',height: height * 0.76  }}>
                <ScrollView style={{ }} showsVerticalScrollIndicator={false}>
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
                            <TouchableOpacity>
                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={GlobalStyles.backBtnImage}
                                />

                            </TouchableOpacity>
                        </View>


                        <DateNightsList />


                        <View style={{
                            width: width - 60 / 430 * width, flexDirection: 'row', flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'space-between', marginTop: 24 / 930 * height, marginBottom: 20 / 930 * height
                        }}>
                            <Text style={{ fontSize: 18, fontFamily: customFonts.meduim }}>Recommended</Text>
                            <TouchableOpacity>
                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={GlobalStyles.backBtnImage}
                                />

                            </TouchableOpacity>
                        </View>

                        <RecommendedDatesList />

                        <View style={{ width: width - 60 / 430 * width, alignItems: 'flex-start', marginTop: 22 / 930 * height }}>
                            <Text style={{ fontSize: 18, fontFamily: customFonts.meduim }}>Upcoming Dates</Text>
                        </View>

                        <Image source={require('../../assets/images/activeDates.png')}
                            style={{ height: 80 / 930 * height, width: 80 / 930 * height, marginTop: 30 / 930 * height }}
                        />

                        <Text style=
                            {{
                                width: 268 / 430 * width, color: "#666666", fontSize: 16, fontFamily: customFonts.regular, textAlign: 'center', marginTop: 18 / 930 * height
                            }}>
                            You don't have any upcoming dates planned
                        </Text>

                        <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { marginTop: 40 / 930 * height, marginBottom: 50 }]}>
                            <Text style={GlobalStyles.btnText}>
                                Plan a date night
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
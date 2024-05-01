import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, FlatList, SafeAreaView } from 'react-native';
import customFonts from '../../assets/fonts/Fonts'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import colors from '../../assets/colors/Colors';
import DateNightsList from '../../Components/DateNightsList';

const { height, width } = Dimensions.get('window')

export default function DatesContainer() {
    const [selectedCategory, setSelectedCategory] = useState('')

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
        </SafeAreaView>
    )
}
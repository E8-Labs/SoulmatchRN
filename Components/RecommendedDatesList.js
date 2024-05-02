import { View, Text, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../assets/colors/Colors';
import customFonts from '../assets/fonts/Fonts';

const { height, width } = Dimensions.get('window');

const dateImage = require('../assets/images/datenight.png')

export default function RecommendedDatesList() {

    const dateNights = [
        {
            id: 1,
            image: dateImage,
            name: "Fancy Bistro",
            budget: 25,
            rating: 5.0,
            category: 'Dinner'
        },
        {
            id: 2,
            image: dateImage,
            name: "Fancy Bistro",
            budget: 25,
            rating: 5.0,
            category: 'Dinner'
        },
        {
            id: 3,
            image: dateImage,
            name: "Fancy Bistro",
            budget: 25,
            rating: 5.0,
            category: 'Dinner'
        },
        {
            id: 4,
            image: dateImage,
            name: "Fancy Bistro",
            budget: 25,
            rating: 5.0,
            category: 'Dinner'
        },
        {
            id: 5,
            image: dateImage,
            name: "Fancy Bistro",
            budget: 25,
            rating: 5.0,
            category: 'Dinner'
        },
    ]

    return (
        <View style={{ width: width }}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={dateNights}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <View style={{
                            alignItems: 'center', padding: 12, borderWidth: 1, borderColor: colors.greyText, borderRadius: 10,
                            marginLeft: 15 / 430 * width, flexDirection: 'column', gap: 10 / 930 * height
                        }}>
                            <Image source={item.image}
                                style={{ height: 98 / 930 * height, width: 158 / 430 * width, borderRadius: 10, resizeMode: 'contain' }}
                            />
                            <View style={{ alignItems: 'flex-start', flexDirection: 'column', width: 150 / 430 * width, }}>
                                <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, }}>{item.name}</Text>
                            </View>

                            <View style={{ alignItems: 'cemter', flexDirection: 'row', width: 150 / 430 * width, justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Budget</Text>
                                <Text style={{ fontSize: 12, fontFamily: customFonts.meduim }}>{item.budget}$</Text>
                            </View>
                            <View style={{ alignItems: 'cemter', flexDirection: 'row', width: 150 / 430 * width, justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Ratings</Text>
                                <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                                    <Image source={require('../assets/images/star.png')}
                                        style={{ height: 12 / 930 * height, width: 12 / 930 * height }}
                                    />
                                    <Text style={{ fontSize: 12, fontFamily: customFonts.meduim }}>{item.rating}</Text>
                                </View>

                            </View>
                            <View style={{ alignItems: 'cemter', flexDirection: 'row', width: 150 / 430 * width, justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Category</Text>
                                <Text style={{ fontSize: 12, fontFamily: customFonts.meduim }}>{item.category}</Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}
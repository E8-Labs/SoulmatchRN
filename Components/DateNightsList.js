import { View, Text, Dimensions, FlatList, Image } from 'react-native'
import React from 'react'
import colors from '../assets/colors/Colors';

const { height, width } = Dimensions.get('window');

const dateImage = require('../assets/images/datenight.png')

export default function DateNightsList() {

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
        <View style={{ width: width}}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={dateNights}
                renderItem={({ item }) => (
                    <View style={{
                        alignItems: 'center', padding: 12, borderWidth: 1, borderColor: colors.greyText, borderRadius: 10, marginLeft: 15 / 430 * width
                    }}>
                        <Image source={item.image}
                            style={{ height: 98 / 930 * height, width: 158 / 430 * width ,borderRadius:10,resizeMode:'contain'}}
                        />

                    </View>
                )}
            />
        </View>
    )
}
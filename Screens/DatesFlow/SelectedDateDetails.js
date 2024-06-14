import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, ScrollView, Linking, Easing, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import GlobalStyles from '../../assets/styles/GlobalStyles';
import customFonts from '../../assets/fonts/Fonts';
import colors from '../../assets/colors/Colors';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import moment from 'moment';

import { Image } from 'expo-image';

const { height, width } = Dimensions.get('window');

export default function SelectedDateDetails({ navigation, route }) {

    const data = route.params.data

    console.log('selected date details are ', data)
    const [loading, setLoading] = useState(false)

    return (
        <SafeAreaView>
            <View style={{ alignItems: 'center', height: height, width: width }}>
                <View style={{ width: width - 60 / 430 * width, flexDirection: 'row', alignItems: 'center', gap: 20 / 430 * width }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}>
                        <View style={GlobalStyles.backBtn}>
                            <Image source={require('../../assets/images/backArrow.png')}
                                style={GlobalStyles.backBtnImage}
                            />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, fontFamily: customFonts.meduim }}>{data.name}</Text>

                </View>
                <View style={{ height: height * 0.85 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ alignItems: 'center', width: width - 60 / 430 * width }}>
                            <Image source={{ uri: data.imageUrl }}
                                onLoadStart={() => {
                                    setLoading(true)
                                }}
                                onLoadEnd={() => {
                                    setLoading(false)
                                }}
                                style={{
                                    height: 240 / 930 * height, width: width - 60 / 430 * width, borderRadius: 6, marginTop: 32 / 930 * height,
                                    resizeMode: 'cover'
                                }}
                            />
                            {
                                loading ? (
                                    <View style = {{height:150/930*height,marginTop:-150}}>
                                        <ActivityIndicator color={colors.blueColor} size={'small'} style={{}} />
                                    </View>
                                ) : null
                            }

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 65 / 430 * width, marginTop: 20 / 930 * height }}>
                                <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 5 }}>
                                    <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Budget</Text>
                                    <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>${data.maxBudget}</Text>

                                </View>

                                <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 5 }}>
                                    <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Category</Text>

                                    <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>{data.Category.name}</Text>
                                </View>

                                <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 5 }}>
                                    <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Ratings</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }} >
                                        <Image source={require('../../assets/images/star.png')}
                                            style={{ height: 12, width: 12 }}
                                        />
                                        <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>5.0</Text>

                                    </View>

                                </View>
                            </View>

                            <View style={{ width: width - 60, alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 12, fontFamily: customFonts.regular, marginTop: 20 / 930 * height }}>
                                    Hours of operation
                                </Text>
                                <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, marginTop: 5 / 930 * height }}>
                                    {moment(data.openTime, "HH:mm:ss").format("h:mm A")} - {moment(data.closeTime, "HH:mm:ss").format("h:mm A")}
                                </Text>

                                <Text style={{ fontSize: 12, fontFamily: customFonts.regular, marginTop: 20 / 930 * height }}>
                                    Description
                                </Text>
                                <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, marginTop: 5 / 930 * height }}>
                                    {data.description}
                                </Text>

                                {/* <Text style={{ fontSize: 12, fontFamily: customFonts.regular, marginTop: 20 / 930 * height }}>
                                    Link
                                </Text> */}
                                {/* <Text style={{ fontSize: 12, fontFamily: customFonts.meduim, marginTop: 5 / 930 * height, color: colors.blueColor }}
                                    onPress={() => (
                                        Linking.openURL("https://www.youtube.com/")
                                    )}
                                >
                                    https://soulmatch-c7991c.webflow.io/
                                </Text> */}

                                <Text style={{ fontSize: 20, fontFamily: customFonts.meduim, marginTop: 20 / 930 * height }}>
                                    Reviews
                                </Text>
                                <Text style={{ fontSize: 12, fontFamily: customFonts.regular, marginTop: 5 / 930 * height }}>
                                    108+Ratings . 10 Reviews
                                </Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', width: width - 60 / 430 * width, justifyContent: 'space-between', marginTop: 22 / 930 * height }}>
                                    <View style={{
                                        paddingHorizontal: 16, height: 198 / 930 * height, borderRadius: 10, borderWidth: 1, borderColor: colors.greyText,
                                        alignItems: 'center', justifyContent: 'center'
                                    }}>

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
                                                        4.0
                                                    </Text>
                                                )
                                            }
                                        </AnimatedCircularProgress>
                                        <Image source={require('../../assets/images/star.png')}
                                            style={{
                                                height: 13, width: 13, resizeMode: 'contain', tintColor: '#E9C600',
                                                position: 'relative', bottom: 17 / 930 * height
                                            }}
                                        />
                                        <Text style={{ fontSize: 10, fontFamily: customFonts.regular }}>of 5 stars</Text>
                                    </View>
                                    <View style={{
                                        paddingHorizontal: 16 / 430 * width, borderRadius: 10, borderWidth: 1, borderColor: colors.greyText,
                                        alignItems: 'flex-start', paddingVertical: 16 / 930 * height, flexDirection: 'column', gap: 8, height: 195 / 930 * height
                                    }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: 230 / 430 * width, gap: 12 }}>
                                            <Image source={require('../../assets/images/profileImage.png')}
                                                style={{ height: 46 / 930 * height, width: 46 / 930 * height, borderRadius: 25 }}
                                            />
                                            <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>Olivia Williams</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: 230 / 430 * width, gap: 12 }}>

                                            <StarRatingDisplay
                                                starSize={18}
                                                color='#FFC403'
                                                rating={3}

                                            />

                                            <Text style={{ fontSize: 12, fontFamily: customFonts.regular, color: '#666666' }}>2 days ago</Text>
                                        </View>
                                        <Text numberOfLines={4} style={{ fontSize: 14 / 930 * height, fontFamily: customFonts.regular, width: 230 / 430 * width }}>Absolutely divine! The flavors,presentation,and service were impeccable.A must- visit for any food enthusiastThe flavors,presentation,and service were impeccable.A must- visit for any food enthusiast</Text>

                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { marginTop: 30 / 930 * height }]}
                                onPress={() => {
                                    navigation.navigate("ReserveNightScreen", {
                                        dateId: data.id
                                    })
                                }}
                            >
                                <Text style={GlobalStyles.btnText}>Reserve a date night</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>

    )
}
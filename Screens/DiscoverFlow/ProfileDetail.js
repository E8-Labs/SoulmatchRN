import React, { useState } from 'react'
import {
    View, Text, Image, Dimensions, TouchableOpacity, FlatList, ScrollView, StyleSheet,
    SafeAreaView

} from 'react-native'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import customFonts from '../../assets/fonts/Fonts'
import colors from '../../assets/colors/Colors'

const { height, width } = Dimensions.get('window')

const likeImage = require('../../assets/images/like.png');
const unlikeImage = require('../../assets/images/unLike.png');




const photosVideos = [
    {
        id: 1,
        name: "Embracing every moment with a smile and a grateful heart.",
        image: require('../../assets/images/photo.png'),
    },
    {
        id: 2,
        name: "Just a glimpse into my Joyful day!",
        hashtage: "#goodvibes",
        image: require('../../assets/images/photo.png')
    },
    {
        id: 3,
        name: "Exploring new places is my kind of therapy! 🗺️💋",
        image: require('../../assets/images/photo.png'),
    },
]


const questions = [
    {
        id: 1,
        name: "Lorem ipsum dolor sit amet,  consectetur adipiscing elit..Lorem ipsum dolor sit amet,  consectetur adipiscing elit..",
        like: true,
    },
    {
        id: 2,
        like: false,
        image: require('../../assets/images/photo.png'),

    },
    {
        id: 3,
        like: false,
        image: require('../../assets/images/photo.png'),
    },
]


export default function ProfileDetail({ navigation, route }) {

    const fromScreen = route.params.fromScreen
    // console.log("from screen", fromScreen)

    const [selected, setSelected] = useState('');
    const [like, setLike] = useState(false);


    const handleOnpress = (item) => {
        const selectedIndex = selected.indexOf(item.id);
        if (selectedIndex > -1) {
            // If selected, remove it from the array
            setSelected(prevItems => prevItems.filter(i => i !== item.id));
        } else {
            // If not selected, add it to the array
            setSelected(prevItems => [...prevItems, item.id]);
        }
    }
    return (

        <SafeAreaView>

            <View style={{ height: height, alignItems: 'center' }}>
                {
                    fromScreen === "LikesList" ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: width - 60, gap: 15, marginTop: 20 / 930 * height }}>

                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <View style={GlobalStyles.backBtn}>
                                    <Image source={require('../../assets/images/close.png')}
                                        style={GlobalStyles.backBtnImage}
                                    />
                                </View>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 24, fontFamily: customFonts.meduim }}>Isabella Taylor</Text>
                        </View>
                    ) : ""
                }

                <ScrollView style={{ marginBottom: 20 }} showsVerticalScrollIndicator={false}>

                    <Image source={require('../../assets/images/card1.png')}
                        style={{ height: height * 0.7, width: width - 30, resizeMode: 'contain', borderRadius: 20, marginTop: 20 / 930 * height }}
                    />
                    <View
                        style={{
                            width: '80%', flexDirection: 'row', top: height * 0.60,
                            justifyContent: 'space-between', position: 'absolute', alignSelf: 'center'
                        }}>

                        <TouchableOpacity
                            style={{
                                width: 60, height: 60, backgroundColor: '#fff', elevation: 5, borderRadius: 30,
                                justifyContent: 'center', alignItems: 'center',
                            }}
                            onPress={() => {
                                setLike(!like)
                            }}
                        >
                            <Image
                                source={like ? likeImage : unlikeImage}
                                style={{ width: 40, height: 40, }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 60, height: 60, backgroundColor: '#fff', elevation: 5, borderRadius: 30,
                                justifyContent: 'center', alignItems: 'center',
                            }}
                        >
                            <Image
                                source={require('../../assets/images/close.png')}
                                style={{ width: 34, height: 34 }}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        height: 92 / 930 * height, width: width - 30, padding: 20, shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.05,
                        shadowRadius: 3, backgroundColor: '#fff', borderRadius: 10
                    }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                            <Image source={require('../../assets/images/compatibility.png')}
                                style={{ height: 58 / 930 * height, width: 58 / 930 * height, resizeMode: 'contain' }}
                            />
                            <View style={{ flexDirection: 'column', }}>
                                <Text style={{ fontSize: 14, fontFamily: customFonts.meduim, color: colors.greyLightText }}>Compatibility score</Text>
                                <Text style={{ fontSize: 20, fontFamily: customFonts.semibold, color: '#4D4D4D' }}>85%</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 30 / 930 * height }}>

                        <View style={styles.viewStyle}>
                            <Image source={require('../../assets/images/femaleIcon.png')}
                                style={styles.viewImage}
                            />
                            <Text style={styles.viewText}>Women</Text>
                        </View>

                        <View style={styles.viewStyle}>
                            <Image source={require('../../assets/images/cake.png')}
                                style={styles.viewImage}
                            />
                            <Text style={styles.viewText}>22 years old</Text>
                        </View>
                        <View style={styles.viewStyle}>
                            <Image source={require('../../assets/images/scale.png')}
                                style={styles.viewImage}
                            />
                            <Text style={styles.viewText}>173 cm</Text>
                        </View>
                        <View style={styles.viewStyle}>
                            <Image source={require('../../assets/images/location.png')}
                                style={styles.viewImage}
                            />
                            <Text style={styles.viewText}>5 miles</Text>
                        </View>
                        <View style={styles.viewStyle}>
                            <Image source={require('../../assets/images/eduCap.png')}
                                style={styles.viewImage}
                            />
                            <Text style={styles.viewText}>University of Arts and Design</Text>
                        </View>
                        <View style={styles.viewStyle}>
                            <Image source={require('../../assets/images/bag.png')}
                                style={styles.viewImage}
                            />
                            <Text style={styles.viewText}>Model at Creative Minds Agency </Text>
                        </View>
                        <View style={styles.viewStyle}>
                            <Image source={require('../../assets/images/rankingStar.png')}
                                style={styles.viewImage}
                            />
                            <Text style={styles.viewText}>Aries </Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 22 / 930 * height, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: 20, fontFamily: customFonts.meduim }}>Photos & videos</Text>
                    </View>

                    <FlatList
                        scrollEnabled={false}
                        data={photosVideos}
                        renderItem={({ item }) => (
                            <View key={item.id} style={{
                                borderWidth: 1, borderColor: colors.greyText, padding: 16, borderRadius: 10, width: width - 30,
                                marginTop: 22 / 930 * height,
                            }}>
                                <Text style={{ fontSize: 16, fontFamily: customFonts.regular }}>{item.name}</Text>
                                {
                                    item.hashtage ? (
                                        <Text style={{ fontSize: 16, fontFamily: customFonts.regular }}>{item.hashtage}</Text>
                                    ) : ''
                                }
                                <Image source={item.image}
                                    style={{ height: 230 / 930 * height, width: 350 / 430 * width, borderRadius: 10, marginTop: 8 }}
                                />
                            </View>
                        )}
                    />

                    <View style={{ marginTop: 22 / 930 * height, alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: 20, fontFamily: customFonts.meduim }}>Profile statement questions</Text>
                    </View>

                    <FlatList
                        scrollEnabled={false}
                        data={questions}
                        renderItem={({ item }) => (
                            <View key={item.id} style={{
                                borderWidth: 1, borderColor: colors.greyText, padding: 16, borderRadius: 10, width: width - 30,
                                marginTop: 22 / 930 * height,
                            }}>
                                <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, color: '#000' }}>Travel Dreaming</Text>
                                <Text style={{ fontSize: 16, fontFamily: customFonts.regular, color: '#4D4D4D' }}>If you could visit any country in the world, where would you go and why?</Text>
                                {
                                    item.image ? (<>
                                        <Image source={item.image}
                                            style={{ height: 230 / 930 * height, width: 350 / 430 * width, borderRadius: 10, marginTop: 8 }}
                                        />
                                        <TouchableOpacity style={{
                                            alignSelf: 'flex-end', position: 'absolute', bottom: 26, right: 40 / 430 * width, backgroundColor: '#fff',
                                            borderRadius: 30,
                                        }}
                                            onPress={() => {
                                                handleOnpress(item)
                                            }}
                                        >
                                            <View style={GlobalStyles.likeBtn}>
                                                <Image source={selected.includes(item.id) ? likeImage : unlikeImage} style={{ height: 27, width: 27, backgroundColor: 'transparent' }} />
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                    ) : (
                                        <>
                                            <View style={{
                                                marginTop: 8, marginBottom: 8, width: 345 / 430 * width, backgroundColor: '#F5F5F5',
                                                borderRadius: 10, paddingVertical: 10, paddingHorizontal: 16, alignItems: 'center'
                                            }}>
                                                <Text style={{ fontSize: 14, fontFamily: customFonts.regular, color: '#000' }}>{item.name}</Text>

                                            </View>
                                            <TouchableOpacity style={{ alignSelf: 'flex-end', }}
                                                onPress={() => {
                                                    handleOnpress(item)
                                                }}
                                            >
                                                <View style={GlobalStyles.likeBtn}>
                                                    <Image source={selected.includes(item.id) ? likeImage : unlikeImage} style={GlobalStyles.likeBtnImage} />
                                                </View>
                                            </TouchableOpacity>
                                        </>
                                    )
                                }

                            </View>
                        )}
                    />

                </ScrollView>
            </View>
        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        // justifyContent:'center',
        width: width - 30,
        gap: 12,
        marginTop: 8
    },
    viewImage: {
        height: 24,
        width: 24
        // resizeMode:'contain'
    },
    viewText: {
        fontSize: 16,
        fontFamily: customFonts.meduim,
        textAlign: 'left',
        width: 334 / 430 * width
    }
})




import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import { enableScreens } from 'react-native-screens';
import customFonts from '../../assets/fonts/Fonts';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import { UpdateProfile } from '../../Services/ProfileServices/UpdateProfile';
import colors from '../../assets/colors/Colors';

const AddZodiac = ({ navigation, route }) => {
    const { height, width } = Dimensions.get('window');
    const data = route.params.data


    console.log('user data ', data)


    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectedZodiac, setSelectedZodiac] = useState(null)

    useEffect(() => {
        if (data.from === 'Profile') {
            console.log('from profile screen')
            setSelectedZodiac(data.user.zodiac)
        }
    }, [])

    const Users = [
        {
            id: 1,
            name: "Aries",
            zodiacicon: require('../../assets/Zodiac1.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS1.png')
        },
        {
            id: 2,
            name: "Taurus",
            zodiacicon: require('../../assets/zodiacicon2.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS2.png')
        },
        {
            id: 3,
            name: "Gemini",
            zodiacicon: require('../../assets/zodiacicon3.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS3.png')
        },
        {
            id: 4,
            name: "Cancer",
            zodiacicon: require('../../assets/zodiacicon4.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS4.png')
        },
        {
            id: 5,
            name: "Leo",
            zodiacicon: require('../../assets/Zodiac5.png'),
            selectedZodiacicon: require('../../assets/zodiacicon5.png')
        },
        {
            id: 6,
            name: "Virgo",
            zodiacicon: require('../../assets/zodiacicon6.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS6.png')
        },
        {
            id: 7,
            name: "Libra",
            zodiacicon: require('../../assets/zodiacicon7.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS7.png')
        },
        {
            id: 8,
            name: "Scorpio",
            zodiacicon: require('../../assets/zodiacicon8.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS8.png')
        },
        {
            id: 9,
            name: "Sagittarius",
            zodiacicon: require('../../assets/zodiacicon9.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS9.png')
        },
        {
            id: 10,
            name: "Capricorn",
            zodiacicon: require('../../assets/Zodiac10.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS10.png')
        },
        {
            id: 11,
            name: "Aquarius",
            zodiacicon: require('../../assets/Zodiac11.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS11.png')
        },
        {
            id: 12,
            name: "Pisces",
            zodiacicon: require('../../assets/Zodiac12.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS12.png')
        },

    ]

    //code to check the selected zodiac icon


    const handleSelectZodiac = (item) => {
        setError(null)
        setSelectedZodiac(item === selectedZodiac ? null : item);
    };


    const handleContinueclick = async () => {
        // console.log('Selected zodiac by user is', selectedZodiac)
        if (selectedZodiac !== null) {
            console.log('User Selected zodiac', selectedZodiac);

            setLoading(true)
            let body = JSON.stringify({
                zodiac: selectedZodiac
            })

            try {
                await UpdateProfile(body);
                if (data.from === 'Profile') {
                    navigation.goBack()
                } else {
                    navigation.navigate('AddAge', {
                        data: {
                            user: '',
                            from: 'Zodiac'
                        }
                    });
                }
            } catch (error) {
                console.error('Error updating profile:', error);
                setError('Failed to update profile.');
            } finally {
                setLoading(false);
            }
            setLoading(false)

        } else {
            setError('Select any Zodiac')
        }
    }

    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: 370 / 430 * width }}>
                <View style={{ marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}>
                        <View style={GlobalStyles.backBtn}>
                            <Image source={require('../../assets/images/backArrow.png')}
                                style={GlobalStyles.backBtnImage}
                            />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '500', fontSize: 24, marginLeft: 20 / 430 * width }}>
                        Complete your profile
                    </Text>
                </View>
                {/* Code for progressbar */}
                {
                    data.from !== "Profile" ? (
                        <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                            <Image source={require('../../assets/zodiacicon.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                            <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                            <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                            <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                            <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                            <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                            <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                            <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                            <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                            <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                            <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                            <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                            <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                            <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                        </View>
                    ) : null
                    }
                <View style={{ marginTop: 40 / 930 * height }}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>
                        Select your zodiac
                    </Text>
                </View>

                {/* Code for zodiac icons grid list */}

                <ScrollView style={{ height: data.from !== "Profile" ? height * 0.55:height*0.66, marginTop: 20 }} showsVerticalScrollIndicator={false} >
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', display: 'flex', justifyContent: 'space-between' }}>
                        {Users.map((item, index) => (
                            <View key={item.id} style={{ height: 113 / 930 * height, width: 113 / 430 * width, marginTop: 20 / 930 * height }}>
                                <TouchableOpacity onPress={() => handleSelectZodiac(item.name)}>
                                    <Image source={selectedZodiac === item.name ? item.selectedZodiacicon : item.zodiacicon} style={{ height: 113 / 930 * height, width: 113 / 430 * width, resizeMode: 'contain' }} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <View style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 / 930 * height, width: width - 50 }}>
                    {
                        error && <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, color: 'red', textAlign: 'center' }}>{error}</Text>
                    }
                    {
                        loading ? (
                            <ActivityIndicator size={'large'} color={colors.blueColor} />
                        ) : (
                            <TouchableOpacity
                                onPress={handleContinueclick}
                                style={{ marginTop: 10 / 930 * height, backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                {
                                    data.from === 'Profile' ? (
                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                            Save
                                        </Text>
                                    ) : (
                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                            Next
                                        </Text>
                                    )
                                }


                            </TouchableOpacity>
                        )
                    }

                </View>

            </View>
        </View>
    )
}

export default AddZodiac

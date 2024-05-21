import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import { enableScreens } from 'react-native-screens';
import customFonts from '../../assets/fonts/Fonts';

const AddZodiac = ({ navigation }) => {
    const { height, width } = Dimensions.get('window');
    const [error,setError] = useState(null)
    const Users = [
        {
            id: 1,
            name:"Aries",
            zodiacicon: require('../../assets/Zodiac1.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS1.png')
        },
        {
            id: 2,
            name:"Taurus",
            zodiacicon: require('../../assets/zodiacicon2.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS2.png')
        },
        {
            id: 3,
            name:"Gemini",
            zodiacicon: require('../../assets/zodiacicon3.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS3.png')
        },
        {
            id: 4,
            name:"Cancer",
            zodiacicon: require('../../assets/zodiacicon4.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS4.png')
        },
        {
            id: 5,
            name:"Leo",
            zodiacicon: require('../../assets/Zodiac5.png'),
            selectedZodiacicon: require('../../assets/zodiacicon5.png')
        },
        {
            id: 6,
            name:"Virgo",
            zodiacicon: require('../../assets/zodiacicon6.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS6.png')
        },
        {
            id: 7,
            name:"Libra",
            zodiacicon: require('../../assets/zodiacicon7.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS7.png')
        },
        {
            id: 8,
            name:"Scorpio",
            zodiacicon: require('../../assets/zodiacicon8.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS8.png')
        },
        {
            id: 9,
            name:"Sagittarius",
            zodiacicon: require('../../assets/zodiacicon9.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS9.png')
        },
        {
            id: 10,
            name:"Capricorn",
            zodiacicon: require('../../assets/Zodiac10.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS10.png')
        },
        {
            id: 11,
            name:"Aquarius",
            zodiacicon: require('../../assets/Zodiac11.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS11.png')
        },
        {
            id: 12,
            name:"Pisces",
            zodiacicon: require('../../assets/Zodiac12.png'),
            selectedZodiacicon: require('../../assets/zodiaciconsS12.png')
        },
        
    ]

    //code to check the selected zodiac icon
    const [selectedZodiac, setSelectedZodiac] = useState(null)

    const handleSelectZodiac = (item) => {
        setError(null)
        setSelectedZodiac(item === selectedZodiac ? null : item);
    };

    const handleContinueclick = () => {
        // console.log('Selected zodiac by user is', selectedZodiac)
        if (selectedZodiac !== null) {
            console.log('User Selected zodiac', selectedZodiac);
            navigation.navigate('AddAge', {
                user: {
                    Zodiac: selectedZodiac
                }
            });
        } else{
            setError('Select any Zodiac')
        }
    }

    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: 370 / 430 * width }}>
                <View style={{ marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../../assets/Backbutton.png')} style={{ resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '500', fontSize: 24, marginLeft: 20 / 430 * width }}>
                        Complete your profile
                    </Text>
                </View>
                {/* Code for progressbar */}
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
                <View style={{ marginTop: 40 / 930 * height }}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>
                        Select your zodiac
                    </Text>
                </View>

                {/* Code for zodiac icons grid list */}

                <ScrollView style={{ height:height*0.5, marginTop: 20 }} showsVerticalScrollIndicator={false} >
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

                <View style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 / 930 * height,width:width-50 }}>
                    {
                        error&&<Text style = {{fontSize:16,fontFamily:customFonts.meduim,color:'red',textAlign:'center'}}>{error}</Text>
                    }
                    <TouchableOpacity
                        onPress={handleContinueclick}
                        style={{ marginTop: 30 / 930 * height, backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default AddZodiac

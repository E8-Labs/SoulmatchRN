import React from 'react'
import { View, StatusBar, Dimensions, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import customFonts from '../../../../assets/fonts/Fonts';

const FlaggedUsers = ({ navigation }) => {
    const { height, width } = Dimensions.get('window');
    const handleBack = () => {
        navigation.pop();
    }

    const DATA = [
        {
            id: 1,
            userImg: require('../../../../assets/Images3/sarah.png'),
            // name: 'Grace Clark',
            // locationImg: require('../../assets/Images/location.png'),
            // crown: require('../../assets/Images/crown2.png'),
            // city: 'New York, CA',
            // package: 'Monthly'
        },
        {
            id: 2,
            userImg: require('../../../../assets/Images3/sarah.png'),
        },
        {
            id: 3,
            userImg: require('../../../../assets/Images3/sarah.png'),
        },
        {
            id: 4,
            userImg: require('../../../../assets/Images3/sarah.png'),
        },
        {
            id: 5,
            userImg: require('../../../../assets/Images3/sarah.png'),
        },
        {
            id: 6,
            userImg: require('../../../../assets/Images3/sarah.png'),
        },
        {
            id: 7,
            userImg: require('../../../../assets/Images3/sarah.png'),
        },
        {
            id: 8,
            userImg: require('../../../../assets/Images3/sarah.png'),
        }
    ]

    const handleFlaggedUserDetails = () => {
        navigation.navigate('FlaggedUserDetails')
    }

    return (
        <SafeAreaView>
            <View style={{ display: 'flex', alignItems: 'center', height: height }}>
                {/*change if the screen is irResponsive height: height s*/}
                <View style={{ width: width - 50 }}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="#FFFFFF"
                        translucent={false}
                    />
                    <View style={{ flexDirection: 'row', gap: 20, marginTop: 20, alignItems: 'center' }}>
                        <TouchableOpacity onPress={handleBack} style={{ height: 47 / 930 * height, width: 47 / 430 * width }}>
                            <View style={{ height: 47 / 930 * height, width: 47 / 430 * width, borderWidth: 1, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../../../../assets/Images3/backIcon.png')} style={{ height: 18, width: 9, resizeMode: 'contain' }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: '500', fontSize: 24, fontFamily: customFonts.medium }}>
                            Flagged users
                        </Text>
                    </View>
                    {/* Grid view */}

                    <ScrollView style={{ height: height * 0.80, marginTop: 30 }} showsVerticalScrollIndicator={false} >
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', display: 'flex', justifyContent: 'space-between' }}>
                            {DATA.map((item, index) => (
                                <TouchableOpacity key={item.id} style={{ marginTop: 10 }} onPress={handleFlaggedUserDetails}>
                                    <View style={{ borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 10, padding: 12, width: 176 / 430 * width }}>
                                        <Image source={item.userImg} style={{ height: 98 / 930 * height, width: 152 / 430 * width, borderRadius: 6, resizeMode: 'cover' }} />
                                        <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.medium, marginTop: 7 }}>
                                            Grace Clark
                                        </Text>
                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                            <Image source={require('../../../../assets/Images3/location.png')} style={{ height: 14 / 930 * height, width: 14 / 430 * width }} />
                                            <Text style={{ fontWeight: '400', fontSize: 12, fontFamily: customFonts.medium, color: '#333333' }}>
                                                New York, NY
                                            </Text>
                                        </View>
                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                            <Image source={require('../../../../assets/Images3/crown2.png')} style={{ height: 15 / 930 * height, width: 15 / 430 * width }} />
                                            <Text style={{ fontWeight: '500', fontSize: 12, fontFamily: customFonts.medium, color: '#FFC401' }}>
                                                Monthly
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>

    )
}

export default FlaggedUsers

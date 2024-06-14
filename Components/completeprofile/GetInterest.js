import React, { useEffect } from 'react'
import { TouchableOpacity, View, Image, Text, Dimensions, ActivityIndicator, Settings } from 'react-native';
import { useState } from 'react';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import colors from '../../assets/colors/Colors';
import { UpdateProfile } from '../../Services/ProfileServices/UpdateProfile';
import ApisPath from '../../lib/ApisPath/ApisPath';

const GetInterest = ({ navigation, route }) => {

    const data = route.params.data
    console.log('user from prev screen', data)



    const { height, width } = Dimensions.get('window');
    const [MinAge, setMinAge] = useState(16);
    const [MaxAge, setMaxAge] = useState(50);
    const [SelectMen, setSelectMen] = useState(false);
    const [SelectWomen, setSelectWomen] = useState(false);
    const [SelectBoth, setSelectBoth] = useState(false);
    const [SelectedGender, setSelectedGender] = useState(null)
    const [error, setError] = useState(null)
    const [showIndicator, setShowIndicator] = useState(false)
    const [loading, setLoading] = useState(false)

    const interestedGenders = [
        {
            id: 1,
            name: 'Men',
            value: 'male'
        },
        {
            id: 2,
            name: 'Women',
            value: 'female'
        },
        {
            id: 3,
            name: 'Both',
            value: 'both'
        },
    ]


    useEffect(() => {
        if (data.from === "Profile") {
            let user = data.user
            setMinAge(user.interested_min_age)
            setMaxAge(user.interested_max_age)
            setSelectedGender(user.interested_gender)
        }
    }, [])

    console.log('max age is', MaxAge)



    const SelectMinAge = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90'.split(',');
    const SelectMaxAge = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90'.split(',');


    const handleNext = async () => {


        if (MinAge > MaxAge) {
            setError("Minimum age must be less then maximum age")
            return
        } else if (!SelectedGender) {
            setError("Select interested gender")
            return
        }
        setLoading(true)
        let body = JSON.stringify({
            interested_min_age: MinAge,
            interested_max_age: MaxAge,
            interested_gender: SelectedGender,
        })

        try {
            await UpdateProfile(body);


            if (data.from === 'Profile') {
                navigation.goBack()

            } else {
                navigation.navigate('EnhancmentQuestions', {
                    data: {
                        user: '',
                        from: 'Interest'
                    }
                });
            }

        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile.');
        } finally {
            setLoading(false);
        }
        //  navigation.navigation("EnhancmentQuestions")
    }

    const handleGengerPress = (value) => {
        setSelectedGender(value)
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
                            <Image source={require('../../assets/loveicon.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                            <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
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
                        </View>
                    ) : null
                }


                <Text style={{ marginTop: 30 / 930 * height, fontWeight: '500', fontSize: 20 }}>
                    Tell us about your interests
                </Text>

                <Text style={{ fontWeight: '500', fontSize: 18, color: colors.greyLightText, marginTop: 30 / 930 * height }}>
                    Interested in
                </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 / 930 * height }}>

                    {
                        interestedGenders.map((item) => (
                            <TouchableOpacity key={item.id} onPress={() => handleGengerPress(item.value)}
                                style={{
                                    borderWidth: 1, borderColor: SelectMen ? '' : '#CCCCCC75', borderRadius: 10,
                                    backgroundColor: SelectedGender === item.value ? '#6050DC' : 'transparent'
                                }}>
                                <View style={{ height: 52 / 930 * height, width: 110 / 430 * width, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontWeight: '500', fontSize: 14, color: SelectedGender === item.value ? 'white' : '#333333' }}>
                                        {item.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }

                    {/* 
                    <TouchableOpacity onPress={handleMenClick} style={{ borderWidth: 1, borderColor: SelectMen ? '' : '#CCCCCC75', borderRadius: 10, backgroundColor: SelectMen ? '#6050DC' : 'transparent' }}>
                        <View style={{ height: 52 / 930 * height, width: 110 / 430 * width, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 14, color: SelectMen ? 'white' : '#333333' }}>
                                Men
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleWomenClick} style={{ borderWidth: 1, borderColor: SelectWomen ? '' : '#CCCCCC75', borderRadius: 10, backgroundColor: SelectWomen ? '#6050DC' : 'transparent' }}>
                        <View style={{ height: 52 / 930 * height, width: 110 / 430 * width, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 14, color: SelectWomen ? 'white' : '#333333' }}>
                                Women
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleBothClick} style={{ borderWidth: 1, borderColor: SelectWomen ? '' : '#CCCCCC75', borderRadius: 10, backgroundColor: SelectBoth ? '#6050DC' : 'transparent' }}>
                        <View style={{ height: 52 / 930 * height, width: 110 / 430 * width, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 14, color: SelectBoth ? 'white' : '#333333' }}>
                                Both
                            </Text>
                        </View>
                    </TouchableOpacity> */}
                </View>
                <Text style={{textAlign:'center', fontWeight: '500', fontSize: 18, color:  colors.greyLightText, marginTop: 20 / 930 * height }}>
                    Age range
                </Text>

                <View style={{ width: 370 / 430 * width, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 260 / 430 * width, gap: 90, flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                        <View style={{ alignItems: 'center', height: 350 / 930 * height, }}>
                            <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 18 }}>
                                Min
                            </Text>
                            <View style={{ height: 1, width: 41 / 430 * width, backgroundColor: '#CCCCCC', marginTop: 20 / 930 * height }}></View>
                            <View style={{ marginTop: 20 }}>
                                <WheelPickerExpo
                                    backgroundColor={'#f2f2f2'}
                                    // height={230 / height * 930}
                                    width={50 / width * 430}
                                    // backgroundColor='#000000'
                                    selectedStyle={{ borderWidth: 2, width: "4", borderRadius: 50, borderColor: colors.blueColor }}
                                    initialSelectedIndex={MinAge - 1}
                                    items={SelectMinAge.map(name => ({ label: name, value: '' }))}
                                    onChange={({ item }) => {
                                        setMinAge(item.label)
                                        setError(null)
                                    }} />
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', height: 270 / 930 * height, }}>
                            <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 18 }}>
                                Max
                            </Text>
                            <View style={{ height: 1, width: 41 / 430 * width, backgroundColor: '#CCCCCC', marginTop: 20 / 930 * height }}></View>
                            <View style={{ marginTop: 20 }}>
                                <WheelPickerExpo
                                    backgroundColor={'#f2f2f2'}
                                    // height={230 / height * 930}
                                    width={50 / width * 430}
                                    // backgroundColor='#000000'
                                    selectedStyle={{ borderWidth: 2, width: "4", borderRadius: 50, borderColor: colors.blueColor }}
                                    initialSelectedIndex={MaxAge - 1}
                                    items={SelectMaxAge.map(name => ({ label: name, value: '' }))}
                                    onChange={({ item }) => {
                                        setMaxAge(item.label)
                                        setError(null)
                                    }} />
                            </View>
                        </View>
                    </View>
                </View>
                {
                    error ? <Text style={[GlobalStyles.errorText, { textAlign: 'center', marginBottom: 20 }]}>{error}</Text> : ''
                }

                {
                    loading ? (
                        <ActivityIndicator size={'large'} color={colors.blueColor} style={{ marginTop:data.from === "Profile" ? 150 / 930 * height:50 / 930 * height}} />
                    ) : (
                        <TouchableOpacity onPress={handleNext}
                            style={{
                                backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginTop: data.from === "Profile" ? 150 / 930 * height:50 / 930 * height
                            }}>
                            {
                                data.from === "Profile" ? (
                                    <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>Save</Text>

                                ) : (
                                    <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>Next</Text>

                                )
                            }
                        </TouchableOpacity>
                    )
                }

            </View>
        </View>
    )
}

export default GetInterest
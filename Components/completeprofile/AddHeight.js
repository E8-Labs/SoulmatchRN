import React, { useEffect } from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import colors from '../../assets/colors/Colors';
import { UpdateProfile } from '../../Services/ProfileServices/UpdateProfile';

const AddHeight = ({ navigation, route }) => {


    const { height, width } = Dimensions.get('window');
    const [HeightFeet, setHeightFeet] = useState(1);
    const [HeightInch, setHeightInch] = useState(0);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const data = route.params.data
    console.log('user from prev screen is ', data)

    useEffect(() => {
        if (data.from === 'Profile') {
            setHeightFeet(data.user.height_feet)
            setHeightInch(data.user.height_inches)
        }
    }, [])

    //code for picker

    const SelectHeightFeet = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,61,62,63,64,65,66,67,68,69,70,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100'.split(',');
    const SelectHeightInch = '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,61,62,63,64,65,66,67,68,69,70,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100'.split(',');

    const handleNextClick = async () => {

        setLoading(true)
        let body = JSON.stringify({
            height_feet: HeightFeet,
            height_inches: HeightInch
        })

        try {
            await UpdateProfile(body);
            if (data.from === 'Profile') {
                navigation.goBack()
            } else {
                navigation.navigate('AddGender',{
                    data:{
                        user:'',
                        from:'Height'
                    }
                });
            }


        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile.');
        } finally {
            setLoading(false);
        }
        // navigation.navigate('AddGender',{
        //     user:user
        // })
    }

    //code for useeffect

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
                <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <Image source={require('../../assets/heighticon.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
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

                <Text style={{ marginTop: 40 / 930 * height, fontWeight: '500', fontSize: 20 }}>
                    Select your height
                </Text>

                <View style={{ height: 416 / 930 * height, width: 370 / 430 * width, marginTop: 60 / 930 * height, flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center', width: 260 / 430 * width, marginTop: 20, display: 'flex', gap: 50, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 18 }}>
                                Feet
                            </Text>
                            <View style={{ height: 1, width: 41 / 430 * width, backgroundColor: '#CCCCCC', marginTop: 20 }}></View>
                            <WheelPickerExpo
                                backgroundColor={'#f2f2f2'}
                                height={300 / height * 930}
                                width={50 / width * 430}
                                // backgroundColor='#000000'
                                selectedStyle={{ borderWidth: 2, width: "4", borderRadius: 50, borderColor: colors.blueColor }}
                                initialSelectedIndex={HeightFeet - 1}
                                items={SelectHeightFeet.map(name => ({ label: name, value: '' }))}
                                onChange={({ item }) => setHeightFeet(item.label)} />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 18 }}>
                                Inch
                            </Text>
                            <View style={{ height: 1, width: 41 / 430 * width, backgroundColor: '#CCCCCC', marginTop: 20 }}></View>
                            <WheelPickerExpo
                                backgroundColor={'#f2f2f2'}
                                height={300 / height * 930}
                                width={50 / width * 430}
                                // backgroundColor='#000000'
                                selectedStyle={{ borderWidth: 2, width: "4", borderRadius: 50, borderColor: colors.blueColor }}
                                initialSelectedIndex={HeightInch}
                                items={SelectHeightInch.map(name => ({ label: name, value: '' }))}
                                onChange={({ item }) => setHeightInch(item.label)} />
                        </View>
                    </View>
                </View>
                {
                    loading ? (
                        <ActivityIndicator size={'large'} color={colors.blueColor} style={{ marginTop: 70 / 930 * height }} />
                    ) : (
                        <TouchableOpacity onPress={handleNextClick}
                            style={{
                                backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginTop: 70 / 930 * height
                            }}>
                            {
                                data.from === 'Profile' ? (
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

export default AddHeight
import React, { useEffect } from 'react';
import { TouchableOpacity, View, Text, Dimensions, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import colors from '../../assets/colors/Colors';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import { UpdateProfile } from '../../Services/ProfileServices/UpdateProfile';
import { Image } from 'expo-image';

const AddAge = ({ navigation, route }) => {

    const data = route.params.data
    console.log('user data', data)

    const { height, width } = Dimensions.get('window');

    const [age, setAge] = useState(1);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(data.from === 'Profile'){
            setAge(data.user.age)
        }
    },[])

    //getting data from previous screen


    //code for picker

    // console.log('Focused age is', age)
    const CITIES = '18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90'.split(',');

    const handleNextClick = async () => {

        setLoading(true)
        let body = JSON.stringify({
            age: age
        })

        try {
            await UpdateProfile(body);
            if(data.from === 'Profile'){
                navigation.goBack()
            }else{
                navigation.navigate('AddHeight',{
                    data:{
                        user:'',
                        from:'Agg'
                    }
                });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile.');
        } finally {
            setLoading(false);
        }
        // setLoading(false)
        // navigation.navigate('AddHeight', {
        //     user: user
        // })
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
                    {data.from === "Profile"? "Age": "Complete your profile"}
                    </Text>
                </View>
                {/* Code for progressbar */}
                {
                    data.from !== "Profile" ? (
                <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <Image source={require('../../assets/ageiconsvg.svg')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
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
                    ):null
                }

                <Text style={{ marginTop: 40 / 930 * height, fontWeight: '500', fontSize: 20 }}>
                    Select your age
                </Text>

                <View style={{ height: 416 / 930 * height, width: 370 / 430 * width, marginTop: 60 / 930 * height }}>
                    <View style={{ marginTop: 0, alignItems: 'center' }}>
                        <WheelPickerExpo
                            backgroundColor={'#f2f2f2'}
                            height={300 / height * 930}
                            width={50 / width * 430}
                            // backgroundColor='#000000'
                            selectedStyle={{ borderWidth: 2, borderColor: colors.blueColor, width: "4", borderRadius: 50 }}
                            initialSelectedIndex={age-1}
                            items={CITIES.map(name => ({ label: name, value: '' }))}
                            onChange={({ item }) => setAge(item.label-17)} />
                    </View>
                </View>
                {
                    loading ? (
                        <ActivityIndicator size={'large'} color={colors.blueColor} style={{ marginTop:data.from === "Profile"? 200/930*height: 70 / 930 * height}} />
                    ) : (

                        <TouchableOpacity onPress={handleNextClick}
                            style={{
                                backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginTop: data.from === "Profile" ?  200 / 930 * height:70/930*height
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

export default AddAge

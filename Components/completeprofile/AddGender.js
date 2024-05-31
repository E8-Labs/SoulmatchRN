import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import customFonts from '../../assets/fonts/Fonts'
import GlobalStyles from '../../assets/styles/GlobalStyles';
import colors from '../../assets/colors/Colors';
import { UpdateProfile } from '../../Services/ProfileServices/UpdateProfile';

const { height, width } = Dimensions.get('window')

const male = require('../../assets/MaleUS.png');
const female = require('../../assets/female.png');
const nonBinary = require('../../assets/nonbinary.png');
const maleS = require('../../assets/male.png');
const femaleS = require('../../assets/SelectedF.png');
const nonBinaryS = require('../../assets/SelectedB.png');



const AddGender = ({ navigation, route }) => {

    const [error, setError] = useState(null)
    const [selected, setSelected] = useState(null)
    const [loading, setLoading] = useState(false)

    const data = route.params.data

    useEffect(() => {
        if (data.from === 'Profile') {
            setSelected(data.user.gender)
        }
    }, [])


    // const user = route.params.user
    // user.gender = selected
    // console.log('user data from prev screen', user)


    const genders = [
        {
            id: 1,
            name: 'Male',
            image: male,
            imageS: maleS
        },
        {
            id: 2,
            name: 'Female',
            image: female,
            imageS: femaleS
        },
        {
            id: 3,
            name: 'Non-Binary',
            image: nonBinary,
            imageS: nonBinaryS
        },
    ]

    const handleNextClick = async () => {
        if (!selected) {
            setError("Select any gender")
        } else {

            setLoading(true)
            let body = JSON.stringify({
                gender: selected
            })

            try {
                await UpdateProfile(body);
                if(data.from === 'Profile'){
                    navigation.goBack()
                }else{
                    navigation.navigate('AddSchool',{
                        data:{
                            user:'',
                            from:'Gender'
                        }
                    });
                }
            } catch (error) {
                console.error('Error updating profile:', error);
                setError('Failed to update profile.');
            } finally {
                setLoading(false);
            }
            // navigation.navigate('AddSchool', {
            //     user: user
            // })
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
                <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <Image source={require('../../assets/gendericon.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
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
                </View>
                <View style={{ marginTop: 40 / 930 * height }}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>
                        Select your gender
                    </Text>
                </View>
                {/* Select gender */}




                <View style={{ display: 'flex', height: height * 0.65, flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex', marginTop: 50 / 930 * height }}>


                        {
                            genders.map((item) => (
                                <TouchableOpacity key={item.id} onPress={() => {
                                    setError(null)
                                    setSelected(item.name)
                                }}>
                                    <Image source={selected === item.name ? item.imageS : item.image}
                                        style={{
                                            height: 105 / 930 * height, width: 103 / 430 * width, resizeMode: 'contain',

                                        }} />

                                </TouchableOpacity>
                            ))
                        }

                    </View>
                    <View style={{ display: 'flex', justifyContent: 'flex-end', width: width - 50 }}>
                        {
                            error && <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, color: 'red', textAlign: 'center' }}>{error}</Text>
                        }
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
            </View>
        </View>
    )
}

export default AddGender

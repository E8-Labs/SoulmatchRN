import React, { useEffect } from 'react'
import { TouchableOpacity, View, Image, Text, Dimensions, ActivityIndicator,Settings } from 'react-native';
import { useState } from 'react';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import colors from '../../assets/colors/Colors';
import ApisPath from '../../lib/ApisPath/ApisPath';

const GetInterest = ({ navigation, route }) => {


    const { height, width } = Dimensions.get('window');
    const [MinAge, setMinAge] = useState('');
    const [MaxAge, setMaxAge] = useState('');
    const [SelectMen, setSelectMen] = useState(false);
    const [SelectWomen, setSelectWomen] = useState(false);
    const [SelectBoth, setSelectBoth] = useState(false);
    const [SelectedGender, setSelectedGender] = useState(null)
    const [error, setError] = useState(null)
    const [showIndicator, setShowIndicator] = useState(false)

    const user = route.params.user
    user.interestedGender = SelectedGender
    user.minAge = MinAge
    user.maxAge = MaxAge

    console.log('user data from prev screen is', user)



    const SelectMinAge = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,61,62,63,64,65,66,67,68,69,70,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100'.split(',');
    const SelectMaxAge = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,61,62,63,64,65,66,67,68,69,70,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100'.split(',');




    useEffect(() => {
        if (SelectMen === true) {
            setSelectedGender('male')
            setError(null)
        } else if (SelectWomen === true) {
            setError(null)
            setSelectedGender('female')
        } else if (SelectBoth === true) {
            setError(null)
            setSelectedGender('both')
        }
    }, [SelectMen,SelectWomen,SelectBoth])

    const handleNextClick = async () => {

        if (MinAge > MaxAge) {
            setError("Minimum age must be less then maximum age")
            return
        } else if(!SelectedGender){
            setError("Select interested gender")
            return
        }
        setShowIndicator(true)
        let body = JSON.stringify({
            zodiac: user.Zodiac,
            age: user.age,
            gender: user.gender,
            school: user.school,
            job_title: user.jobTitle,
            company: user.company,
            height_feet: user.heightFeet,
            height_inches: user.heightInch,
            interested_max_age: MaxAge,
            interested_min_age: MinAge,
            interested_gender: SelectedGender

        })
        console.log('body is', body)
        // return

        const data = Settings.get("USER")
        try {
            if (data) {
                let d = JSON.parse(data)
                console.log('user data is', d)
                const result = await fetch(ApisPath.ApiUpdateProfile, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + d.token
                    },
                    body: body
                })
                if (result) {
                    setShowIndicator(false)
                    let json = await result.json();
                    if (json.status === true) {

                        console.log('user profile', json.data)
                        d.user = json.data
                        Settings.set({
                            USER: JSON.stringify(d)
                        })
                        navigation.navigate('EnhancmentQuestions')
                    }
                    else {
                        console.log('json message', json)
                    }
                }
            }
        } catch (error) {
            console.log('error finding in updating profile', error)
        }
        //  navigation.navigation("EnhancmentQuestions")
    }






    const handleMenClick = () => {
        setSelectMen(true);
        setSelectWomen(false);
        setSelectBoth(false);
    }

    const handleWomenClick = () => {
        setSelectWomen(true);
        setSelectMen(false);
        setSelectBoth(false);
    }

    const handleBothClick = () => {
        setSelectBoth(true);
        setSelectMen(false);
        setSelectWomen(false);
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

                <Text style={{ marginTop: 30 / 930 * height, fontWeight: '500', fontSize: 20 }}>
                    Tell us about your interests
                </Text>

                <Text style={{ fontWeight: '500', fontSize: 18, color: '#66666690', marginTop: 30 / 930 * height }}>
                    Interested in
                </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 / 930 * height }}>
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
                    </TouchableOpacity>
                </View>
                <Text style={{ fontWeight: '500', fontSize: 18, color: '#66666690', marginTop: 20 / 930 * height }}>
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
                                    initialSelectedIndex={15}
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
                                    initialSelectedIndex={49}
                                    items={SelectMaxAge.map(name => ({ label: name, value: '' }))}
                                    onChange={({ item }) =>{
                                         setMaxAge(item.label)
                                        setError(null)
                                         }} />
                            </View>
                        </View>
                    </View>
                </View>
                {
                    error ? <Text style = {[GlobalStyles.errorText,{textAlign:'center',marginBottom:20}]}>{error}</Text> : ''
                }

                {
                    showIndicator ? (
                        <ActivityIndicator size={'large'}  color={colors.blueColor} />
                    ) : (
                        <TouchableOpacity onPress={handleNextClick}
                            style={{
                                backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10
                            }}>
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>Next</Text>
                        </TouchableOpacity>
                    )
                }

            </View>
        </View>
    )
}

export default GetInterest
import React, { useEffect, useState } from 'react'
import { Dimensions, View, TouchableOpacity, Text, Modal, Platform, FlatList } from 'react-native'
import { Image } from 'expo-image';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import customFonts from '../../assets/fonts/Fonts';
import { placholder } from '../../models/Constants';
import colors from '../../assets/colors/Colors';
import ApisPath from '../../lib/ApisPath/ApisPath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatesLoadingIndicator from '../../Services/dates/DatesLoadingIndicator';

const { height, width } = Dimensions.get('window');
export default function ViewMyMatchesScreen({ navigation }) {

    const [myMatch, setMyMatch] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        getMyMatches()
    }, [])

    const getMyMatches = async () => {
        console.log('getting my matches')
        const data = await AsyncStorage.getItem("USER")
        setloading(true)
        try {
            if (data) {
                let d = JSON.parse(data)

                const result = await fetch(ApisPath.ApiGetMyMatche, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + d.token
                    }
                })
                if (result) {
                    let json = await result.json()
                    setloading(false)
                    if (json.status === true) {
                        console.log('my matches are', json.data)
                        setMyMatch(json.data)
                    } else {
                        console.log('json message is', json.message)
                    }
                }
            }
        } catch (error) {
            console.log('error finding in getting my matchs', error)
        }
    }


    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: width - 30, alignItems: 'center' }}>
                <View style={{ width: width - 50, marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
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
                        My Matches
                    </Text>

                </View>
                {
                    loading ? (
                        <DatesLoadingIndicator from='admin' />
                    ) : (
                        <FlatList
                            style={{ marginTop: 50,height:height*0.8 }}
                            numColumns={2}
                            showsVerticalScrollIndicator = {false}
                            data={myMatch}
                            scrollEnabled={true}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={()=>{
                                    navigation.navigate("SelectedProfile",{
                                        data:{
                                            user:item
                                        }
                                    })
                                }}>
                                    <View style={{
                                        alignItems: 'center', padding: 12, borderWidth: 1, borderColor: colors.greyText, borderRadius: 10,
                                        marginLeft: 10 / 430 * width, flexDirection: 'column', gap: 10 / 930 * height,
                                        marginBottom: 10
                                    }}>
                                        <Image source={{ uri: item.profile_image }}
                                            style={{ height: 98 / 930 * height, width: 158 / 430 * width, borderRadius: 10, resizeMode: 'cover' }}
                                        />
                                        <View style={{ gap:4,alignItems: 'flex-start', flexDirection: 'column', width: 150 / 430 * width, }}>
                                            <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, }}>
                                                {item.first_name} {item.last_name}
                                            </Text>
                                            <Text style={{ fontSize: 13, fontFamily: customFonts.meduim, }}>
                                                {item.gender ? item.gender : 'N/A'}
                                            </Text>
                                            <Text style={{ fontSize: 14, fontFamily: customFonts.regular, }}>
                                                {item.city ? item.city : 'N/A'}, {item.state ? item.state : "N/A"}
                                            </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            )}

                        />
                    )
                }


            </View>
        </View>
    )
}
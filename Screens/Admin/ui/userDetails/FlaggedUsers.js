import React from 'react'
import { View, StatusBar, Dimensions, Text, ScrollView, TouchableOpacity, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import customFonts from '../../../../assets/fonts/Fonts';
import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import Apis from '../../apis/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../../../assets/colors/Colors';

const FlaggedUsers = ({ navigation }) => {
    const { height, width } = Dimensions.get('window');
    const [flaggedUsers, setFlaggedUsers] = useState([]);
    const [loading, setloading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);


    const handleBack = () => {
        navigation.pop();
    }

    //code for flagged users api

    useEffect(() => {
        const getFlaggedUsers = async () => {
            try {
                setloading(true);
                const data = await AsyncStorage.getItem("USER")
                if (data) {
                    let d = JSON.parse(data)
                    const AuthToken = d.token
                    const response = await fetch(Apis.FlaggedUsers, {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + AuthToken
                        }
                    });
                    if (response.ok) {
                        const Result = await response.json();
                        console.log('Apis response is :', Result.data);
                        // console.log('Response of api is :', Result);
                        setFlaggedUsers(Result.data);
                    } else {
                        console.log('Response of api is not fine');
                    };
                } else {
                    console.log('No data found on local storage');
                }
            } catch (error) {
                console.log('Error is :', error)
            }
            finally {
                setloading(false)
            }
        }
        getFlaggedUsers();
    }, [])

    //test code for removing ignored user
    const deleteItem = (targetIndex) => {
        const newArray = array.filter((item, index) => index !== targetIndex);
        setArray(newArray); // Updates the state with the new array
    };

    // const deleteItem = (index) => {
    //     const updatedUsers = [...flaggedUsers];
    //     updatedUsers.splice(index, 1);
    //     setFlaggedUsers(updatedUsers);
    // };

    const handleFlaggedUserDetails = (item, index) => {
        // console.log('Item passing is :', item);
        navigation.navigate('FlaggedUserDetails', {
            DATA: {
                userDetails: item
            },
            ignoredUserId: () => getIgnoredId(index),
            suspendedUserId: () => getSuspendedId(index),
            deletedUserId: () => getDeletedId(index)
        })
    }

    const getIgnoredId = (index) => {
        const newItems = [...flaggedUsers];
        newItems.splice(index, 1);
        setFlaggedUsers(newItems);
    }
    const getSuspendedId = (index) => {
        const newItems = [...flaggedUsers];
        newItems.splice(index, 1);
        setFlaggedUsers(newItems);
    }
    const getDeletedId = (index) => {
        const newItems = [...flaggedUsers];
        newItems.splice(index, 1);
        setFlaggedUsers(newItems);
    }

    const noFlaggedUsers = () => {
        if (flaggedUsers.length === 0) {
            return (
                <View>
                    <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.regular, textAlign: 'center', marginTop: 30 }}>
                        No flagged users
                    </Text>
                </View>
            )
        }
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
                            <View style={{ height: 47 / 930 * height, width: 47 / 430 * width, borderWidth: 1, borderColor: '#00000010', borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../../../../assets/Images3/backIcon.png')} style={{ height: 18, width: 9, resizeMode: 'contain' }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: '500', fontSize: 24, fontFamily: customFonts.meduim }}>
                            Flagged users
                        </Text>
                    </View>

                    {/* code for calling flagged user in flatlist */}
                    {loading ?
                        <View style={{ justifyContent: 'center', height: height * 0.9, justifyContent: 'center', alignItems: 'center', width: width - 50 }}>
                            <ActivityIndicator size={'large'} color={'#6050DC'} />
                        </View> :
                        <View style={{ flexDirection: 'row', width: width * 0.9, display: 'flex', justifyContent: 'space-between' }}>
                            <FlatList
                                // horizontal
                                style={{ width: width * 0.9, }}
                                showsHorizontalScrollIndicator={false}
                                data={flaggedUsers}
                                numColumns={2}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity key={item.reportId}
                                        style={{ marginTop: 15, marginLeft: 12 / 430 * width }}
                                        onPress={() => handleFlaggedUserDetails(item, index)}>
                                        <View style={{ borderWidth: 1, borderColor: '#E6E6E6', flexDirection: 'column', gap: 5, borderRadius: 10, padding: 12, width: 176 / 430 * width }}>
                                            <Image
                                                onLoadStart={() => setImgLoading(true)}
                                                onLoadEnd={() => setImgLoading(false)}
                                                source={item.reportedUser.profile_image ?
                                                    { uri: item.reportedUser.profile_image } :
                                                    require('../../../../assets/Images3/imagePlaceholder.webp')}
                                                style={{
                                                    height: 98 / 930 * height, width: 152 / 430 * width, borderRadius: 6, resizeMode: 'cover'
                                                }} />
                                            {imgLoading ?
                                                <View
                                                    style={{
                                                        height: 98 / 930 * height,
                                                        width: 152 / 430 * width,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        position: 'absolute',
                                                    }}>
                                                    <ActivityIndicator size={'small'} color={colors.blueColor} />
                                                </View> : ''}
                                            <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.meduim, marginTop: 7 }}>
                                                {item.reportedUser.first_name} {item.reportedUser.last_name}
                                            </Text>
                                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                <Image source={require('../../../../assets/Images3/location.png')} style={{ height: 14 / 930 * height, width: 14 / 430 * width }} />
                                                <Text style={{ fontWeight: '400', fontSize: 12, fontFamily: customFonts.meduim, color: '#333333' }}>
                                                    New York, NY
                                                </Text>
                                            </View>
                                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                <Image source={require('../../../../assets/Images3/crown2.png')} style={{ height: 15 / 930 * height, width: 15 / 430 * width }} />
                                                <Text style={{ fontWeight: '500', fontSize: 12, fontFamily: customFonts.meduim, color: '' }}>
                                                    Monthly
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    }

                    <View>
                        {noFlaggedUsers()}
                    </View>

                </View>
            </View>
        </SafeAreaView>

    )
}

export default FlaggedUsers

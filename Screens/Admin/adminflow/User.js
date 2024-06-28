import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'expo-image'
import customFonts from '../../../assets/fonts/Fonts'
import Apis from "../apis/Apis"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'


const User = ({ navigation }) => {
    const { height, width } = Dimensions.get('window')

    const [openModal, setOpenModal] = useState(false);
    const [RadioBtn, setRadioBtn] = useState(false);
    //free Plan
    const [PlanStatus, setPlanStatus] = useState('');
    //value of plan
    const [PlanValue, setPlanValue] = useState('');

    //handleUser Details
    const handleUserDetails = (item, index) => {
        navigation.navigate('UserProfileDetails', {
            DATA: {
                UserDetails: item
            },
            index: index,
            UserDeleted: deleteUser,
        })
    }


    const handleRadio = () => {
        setRadioBtn(!RadioBtn);
    }
    //storing value of free plan
    useEffect(() => {
        let FreePlan = null;
        if (RadioBtn) {
            FreePlan = 'Free'
        }

        if (FreePlan) {
            setPlanValue(FreePlan)
            // console.log('Selected value is :', PlanValue);
        } else {
            console.log('plan is not free');
        }
    });


    const DATA = [
        {
            id: 1,
            userImg: require('../../../assets/Images3/sarah.png'),
            // name: 'Grace Clark',
            // locationImg: require('../../../assets/Images3/location.png'),
            // crown: require('../../../assets/Images3/crown2.png'),
            // city: 'New York, CA',
            // package: 'Monthly'
        },
        {
            id: 2,
            userImg: require('../../../assets/Images3/sarah.png'),
        },
        {
            id: 3,
            userImg: require('../../../assets/Images3/sarah.png'),
        },
        {
            id: 4,
            userImg: require('../../../assets/Images3/sarah.png'),
        },
        {
            id: 5,
            userImg: require('../../../assets/Images3/sarah.png'),
        },
        {
            id: 6,
            userImg: require('../../../assets/Images3/sarah.png'),
        },
        {
            id: 7,
            userImg: require('../../../assets/Images3/sarah.png'),
        },
        {
            id: 8,
            userImg: require('../../../assets/Images3/sarah.png'),
        }
    ]

    const flaggedUsersClick = () => {
        navigation.navigate('FlaggedUsers')
    }

    //test code
    const [AdminUsers, setAdminUsers] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);


    useFocusEffect(
        React.useCallback(() => {
            // getUsers();
        }, [])
    )

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        if (Loading) {
            return
        }
        try {

            console.log('trying to get users')
            const data = await AsyncStorage.getItem("USER")
            if (data) {
                let d = JSON.parse(data)

                const AuthToken = d.token
                let path = `${Apis.GetAdminUsers}?offset=${AdminUsers.length}`
                console.log('Fetching users ', path)
                setLoading(true);
                const response = await fetch(path, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthToken
                    }
                });
                setLoading(false);
                // if (response.ok) {
                //     const Result = await response.json();
                //     const newUsers = Result.data;
                //     setAdminUsers(prevUsers => [...prevUsers, ...newUsers]);
                // }
                if (response.ok) {
                    const Result = await response.json();
                    const newUsers = Result.data;

                    // Check if newUsers is not null before spreading
                    if (newUsers !== null) {
                        setAdminUsers(prevUsers => [...prevUsers, ...newUsers]);
                    }
                }
            }
        } catch (error) {
            console.log("Error occurred:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20;
        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            getUsers(); // Fetch more data when scrolled to the bottom
        }
    };

    //code for premium plan selection buttons
    const buttonData = [
        { id: 'trial', label: 'Trial' },
        { id: 'weekly', label: 'Weekly' },
        { id: 'monthly', label: 'Monthly' },
        { id: 'yearly', label: 'Yearly' }
    ];

    const deleteUser = (index) => {
        console.log("Deleting user at inxex", index)
        const newItems = [...AdminUsers];
        newItems.splice(index, 1);
        setAdminUsers(newItems);
    }

    const [selectedButton, setSelectedButton] = useState(null);

    const handlePress = (id) => {
        setSelectedButton(id);
        console.log(`Selected Button: ${id}`);
    };

    const UnSelRadio = require('../../../assets/Images3/RadioButton.png');
    const SelRadio = require('../../../assets/Images3/RadioButtonsel.png');

    //citystatename
    const [cityStateName, setCityStateName] = useState('');

    // useEffect(() => {
    //     console.log('Value of text is :', cityStateName);
    // }, [cityStateName])

    return (
        <View style={{ display: 'flex', alignItems: 'center', height: height }}>
            {/*change if the screen is irResponsive height: height s*/}
            <View style={{ width: width - 50 }}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#FFFFFF"
                    translucent={false}
                />
                {/* Header code */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginTop: 60 }}>
                    <Text style={[styles.header, { fontWeight: '500', fontSize: 24, fontFamily: customFonts.medium }]}>
                        Users
                    </Text>
                    <View style={[styles.header, { gap: 15 }]}>
                        <TouchableOpacity onPress={() => setOpenModal(true)} style={{ width: 30 / 430 * width }}>
                            <Image source={require('../../../assets/Images3/filter.png')} style={{ resizeMode: 'contain', height: 30 / 930 * height, width: 30 / 430 * width }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={flaggedUsersClick} style={{ width: 30 / 430 * width }}>
                            <Image source={require('../../../assets/Images3/slash.png')} style={{ resizeMode: 'contain', height: 30 / 930 * height, width: 30 / 430 * width }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 3 }}>
                    <Text style={{ fontWeight: '500', fontSize: 12, fontFamily: customFonts.medium }}>
                        Total:
                    </Text>
                    <Text style={{ fontWeight: '500', fontSize: 12, fontFamily: customFonts.medium, color: '#666666' }}>
                        12,999
                    </Text>
                </View>

                {/* Search bar */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: 10, gap: 10, backgroundColor: '#ffffff', borderColor: '#E6E6E6', marginTop: 20 }}>
                    <TouchableOpacity style={{ width: 30 / 430 * width, height: 30 / 930 * height, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../../assets/Images3/searchIcon.png')} style={{ height: 55 / 930 * height, width: 55 / 930 * width, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <TextInput style={{ width: 304 / 430 * width, fontSize: 14, fontWeight: '500', fontFamily: customFonts.medium }} placeholder='Search by name, email' />
                </View>

                {/* Grid view */}

                <ScrollView
                    style={{ height: height - 310, marginTop: 30 }}
                    showsVerticalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}>
                        {AdminUsers.map((item, index) => (
                            <TouchableOpacity onPress={() => handleUserDetails(item.id, index)} key={index} style={{ marginTop: 10 }}>
                                <View style={{ borderWidth: 1, flexDirection: 'column', gap: 5, borderColor: '#E6E6E6', borderRadius: 10, padding: 12, width: 176 / 430 * width }}>
                                    <Image source={item.profile_image ? { uri: item.profile_image } : require('../../../assets/Images3/imagePlaceholder.webp')} style={{ height: 98 / 930 * height, width: 152 / 430 * width, borderRadius: 6, resizeMode: 'cover' }} />
                                    <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.medium, marginTop: 7 }}>
                                        {item.first_name} {item.last_name}
                                    </Text>
                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                        <Image source={require('../../../assets/Images3/location.png')} style={{ height: 14 / 930 * height, width: 14 / 430 * width }} />
                                        <Text style={{ fontWeight: '400', fontSize: 12, fontFamily: customFonts.medium, color: '#333333' }}>
                                            {item.city}
                                        </Text>
                                    </View>
                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                        <Image source={require('../../../assets/Images3/crown2.png')} style={{ height: 15 / 930 * height, width: 15 / 430 * width }} />
                                        <Text style={{ fontWeight: '500', fontSize: 12, fontFamily: customFonts.medium, color: '#FFC401' }}>
                                            Monthly
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                        {Loading && (
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: width - 50, height: height * 0.60, }}>
                                <ActivityIndicator size={'large'} color={'#6050DC'} />
                            </View>
                        )}
                    </View>
                </ScrollView>

                {/* Code for Modal */}

                <View>
                    <Modal
                        visible={openModal}
                        transparent={true}
                        animationType='slide'
                        onRequestClose={() => setOpenModal(false)}
                    >
                        <View style={{ height: 550 / 930 * height, borderTopRightRadius: 25, borderTopLeftRadius: 25, backgroundColor: 'white', width: width, position: 'absolute', bottom: 0, alignItems: 'center' }}>
                            <View style={{ width: width - 50 }}>
                                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 15 / 930 * height, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: '500', fontFamily: customFonts.medium }}>
                                        Filters
                                    </Text>
                                    <TouchableOpacity onPress={() => setOpenModal(false)} style={{ marginRight: 10, height: 25, width: 25, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/Images3/CrossIcon.png')} style={{ height: 20 / 930 * height, width: 20 / 430 * width, resizeMode: 'contain', }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ height: 0.1, borderWidth: 0.2, borderColor: '#E6E6E6', width: width, marginTop: 20 / 930 * height }}></View>
                            <View style={{ width: width - 50 }}>
                                <Text style={{ fontWeight: '600', fontSize: 16, fontFamily: customFonts.semibold, color: '#333333', marginTop: 13 / 930 * height }}>
                                    Plan type
                                </Text>
                                <View style={{ flexDirection: 'row', gap: 5, marginTop: 13 / 930 * height }}>
                                    <TouchableOpacity onPress={handleRadio}>
                                        <Image source={RadioBtn ? SelRadio : UnSelRadio} style={{ resizeMode: 'contain', height: 25 / 930 * height, width: 25 / 430 * width }} />
                                    </TouchableOpacity>
                                    <Text style={{ fontWeight: '400', fontSize: 14, fontFamily: customFonts.regular }}>
                                        Free
                                    </Text>
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: '400', fontFamily: customFonts.regular, color: '#666666', marginTop: 25 / 930 * height }}>
                                    Premium
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 / 930 * height }}>
                                    {buttonData.map((button) => (
                                        <TouchableOpacity
                                            key={button.id}
                                            onPress={() => handlePress(button.id)}
                                            style={styles.button}
                                        >
                                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                                <Image
                                                    source={selectedButton === button.id ? SelRadio : UnSelRadio}
                                                    style={{ height: 25 / 930 * height, width: 25 / 430 * width, resizeMode: 'contain' }}
                                                />
                                                <Text style={styles.label}>{button.label}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <View style={{ height: 0.1, borderWidth: 0.2, borderColor: '#E6E6E6', marginTop: 22 / 930 * height }}></View>
                                <Text style={{ fontSize: 16, fontWeight: '600', fontFamily: customFonts.semibold, color: '#333333' }}>
                                    City/State
                                </Text>
                                <TextInput
                                    value={cityStateName}
                                    onChangeText={(e) => setCityStateName(e)}
                                    style={{ borderWidth: 1, borderColor: '#CCCCCC', padding: 12, borderRadius: 10, color: '#999999', fontSize: 14, fontWeight: '500', fontFamily: customFonts.medium, marginTop: 10 }}
                                    placeholder='Enter City/State'
                                />
                                <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, justifyContent: 'space-between', width: '100%' }}>
                                    <TouchableOpacity
                                        onPress={() => setOpenModal(false)}
                                        style={{
                                            height: 40 / 930 * height,
                                            width: 150 / 430 * width,
                                            borderWidth: 2,
                                            borderColor: '#000000',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 10,
                                        }}>
                                        <Text style={{
                                            color: '#000000',
                                            fontWeight: customFonts.medium,
                                            fontWeight: '500',
                                            fontSize: 16
                                        }}>
                                            Reset
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            height: 40 / 930 * height,
                                            width: 150 / 430 * width,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 10,
                                            backgroundColor: '#6050DC'
                                        }}>
                                        <Text style={{
                                            fontWeight: customFonts.medium,
                                            fontWeight: '500',
                                            fontSize: 16,
                                            color: 'white'
                                        }}>
                                            Apply
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>

            </View>
        </View>
    )
}

export default User

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

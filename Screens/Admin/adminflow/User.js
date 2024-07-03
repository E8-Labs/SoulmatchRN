import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'expo-image'
import customFonts from '../../../assets/fonts/Fonts'
import Apis from "../apis/Apis"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { DateFilterpoupAdmin } from '../ui/AdminDatesflow/DateFilterpoupAdmin'
import colors from '../../../assets/colors/Colors'




const User = ({ navigation }) => {
    const timerRef = useRef(null);
    const inputRef2 = useRef("");
    const { height, width } = Dimensions.get('window')

    const [openModal, setOpenModal] = useState(false);
    const [RadioBtn, setRadioBtn] = useState(false);
    //free Plan
    const [PlanStatus, setPlanStatus] = useState('');
    //value of plan
    const [selectedButton, setSelectedButton] = useState("");
    const [searchUser, setSearchUser] = useState('');
    const [noMoreUsers, setNoMoreUsers] = useState(false);
    //test code
    const [AdminUsers, setAdminUsers] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [applyFilters, setApplyFilters] = useState(false)
    //code for users filter
    const [filterUserAddress, setFilterUserAddress] = useState('');
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [imgLoading, setImgLoading] = useState(false)

    //code for img loading
    const handleImageLoadStart = (uri) => {
        setImgLoading(prevState => ({ ...prevState, [uri]: true }));
    };

    const handleImageLoadEnd = (uri) => {
        setImgLoading(prevState => ({ ...prevState, [uri]: false }));
    };

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
        handlePress("free")
    }
    const flaggedUsersClick = () => {
        navigation.navigate('FlaggedUsers')
    }



    useFocusEffect(
        React.useCallback(() => {
            // getUsers();
        }, [])
    )

    useEffect(() => {
        if (applyFilters) {
            getUsers();
        }
        console.log("Apply filters ", applyFilters)
    }, [applyFilters]);

    const getUsers = async (search) => {

        if (Loading || noMoreUsers) {
            console.log("Already loading")
            return
        }
        try {
            console.log('trying to get users', AdminUsers.length)
            const data = await AsyncStorage.getItem("USER")
            if (data) {
                let d = JSON.parse(data)

                const AuthToken = d.token
                let path = `${Apis.GetAdminUsers}?offset=${AdminUsers.length}`
                setLoading(true);

                if (search) {
                    path = `${path}&search=${search}`
                }
                if (typeof filterDetail.city !== 'undefined' && filterDetail.city !== null) {
                    console.log('Filter details i am trying to send in api are :', filterDetail);
                    path = `${path}&city=${filterDetail.city}`;
                    setOpenModal(false);
                }
                if (typeof filterDetail.state !== 'undefined' && filterDetail.state !== null) {
                    console.log('Filter details i am trying to send in api are :', filterDetail);
                    path = `${path}&state=${filterDetail.state}`;
                    setOpenModal(false);
                }
                if (typeof filterDetail.planStatus !== 'undefined' && filterDetail.planStatus !== "") {
                    console.log('Filter details i am trying to send in api are :', filterDetail);
                    path = `${path}&plan=${filterDetail.planStatus}`;
                    setOpenModal(false);
                }
                console.log("Path is ", path)
                const response = await fetch(path, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthToken
                    }
                });
                console.log("Data from api is ", response)
                setLoading(false);
                setApplyFilters(false)
                // if (response.ok) {
                // const Result = await response.json();
                // const newUsers = Result.data;
                // setAdminUsers(prevUsers => [...prevUsers, ...newUsers]);
                // }
                if (response.ok) {
                    const Result = await response.json();
                    const newUsers = Result.data;
                    // console.log("#############################################################")
                    // console.log("Data from server ", newUsers)
                    // console.log("#############################################################")
                    if (newUsers) {
                        console.log("Prev list ", AdminUsers)
                        setAdminUsers(prevUsers => [...prevUsers, ...newUsers])
                    }
                    else {
                        setNoMoreUsers(true)
                    }
                    // Check if newUsers is not null before spreading
                    // if (newUsers !== null) {
                    // setAdminUsers(prevUsers => [...prevUsers, ...newUsers]);
                    // }
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
            console.log("Getting new users in handleScroll")
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

    const handlePress = (id) => {
        // setPlanValue("");
        setSelectedButton(id);
        // setRadioBtn(false);
        console.log(`Selected Button: ${id}`);
    };

    // console.log('Plan status of user is :', PlanStatus);

    const UnSelRadio = require('../../../assets/Images3/RadioButton.png');
    const SelRadio = require('../../../assets/Images3/RadioButtonsel.png');

    //code for search params
    useEffect(() => {

        // Clear the previous timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setAdminUsers([])
        setNoMoreUsers(false)
        // Set a new timer
        timerRef.current = setTimeout(() => {
            console.log("Search timer clicked")
            getUsers(searchUser);
        }, 500);

        // Cleanup function to clear the timer when component unmounts
        return () => clearTimeout(timerRef.current);

    }, [searchUser]);



    const handleCloseFilterpop = () => {
        setOpenFilterModal(false);
    }

    let filterUserCity = filterUserAddress.city;
    let filterUserState = filterUserAddress.state;

    //code for calling api for filter users
    const filterDetail = {
        city: filterUserCity,
        state: filterUserState,
        planStatus: selectedButton
    }

    const inputRef = useRef(null);

    const ApplyFilters = () => {
        console.log('Filter details sending in api are :', filterDetail);
        setOpenModal(false);
        setNoMoreUsers(false)
        setAdminUsers([])
        setApplyFilters(true)
        // getUsers();
    }

    const handleAddressPicker = () => {
        setOpenFilterModal(true);
    }

    const inputReference = () => {
        if (inputRef2.current) {
            inputRef2.current.focus();
        }
    }

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
                    <Text style={[styles.header, { fontWeight: '500', fontSize: 24, fontFamily: customFonts.meduim }]}>
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
                    <Text style={{ fontWeight: '500', fontSize: 12, fontFamily: customFonts.meduim }}>
                        Total:
                    </Text>
                    <Text style={{ fontWeight: '500', fontSize: 12, fontFamily: customFonts.meduim, color: '#666666' }}>
                        12,999
                    </Text>
                </View>

                {/* Search bar */}
                <View
                    style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                        padding: 10, borderWidth: 1, borderRadius: 10, gap: 10, backgroundColor: '#ffffff', borderColor: '#E6E6E6', marginTop: 20
                    }}>
                    <TouchableOpacity
                        onPress={inputReference}
                        style={{
                            width: 30 / 430 * width, height: 30 / 930 * height,
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                        <Image source={require('../../../assets/Images3/searchIcon.png')} style={{ height: 55 / 930 * height, width: 55 / 930 * width, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <TextInput
                        ref={inputRef2}
                        value={searchUser}
                        onChangeText={(e) => setSearchUser(e)}
                        style={{
                            width: 304 / 430 * width, fontSize: 14, fontWeight: '500',
                            fontFamily: customFonts.meduim
                        }}
                        placeholder='Search by name, email' />
                </View>

                {/* Grid view */}

                <ScrollView
                    style={{ height: height - 310, marginTop: 30 }}
                    showsVerticalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}>
                        {AdminUsers && AdminUsers.map((item, index) => (
                            <TouchableOpacity onPress={() => handleUserDetails(item.id, index)} key={index} style={{ marginTop: 10 }}>
                                <View style={{ borderWidth: 1, flexDirection: 'column', gap: 5, borderColor: '#E6E6E6', borderRadius: 10, padding: 12, width: 176 / 430 * width }}>
                                    <Image
                                        // onLoadStart={() => handleImageLoadStart(item.profile_image)}
                                        // onLoadEnd={() => handleImageLoadEnd(item.profile_image)}
                                        source={item.profile_image ? { uri: item.profile_image } :
                                            require('../../../assets/Images3/imagePlaceholder.webp')}
                                        style={{
                                            height: 98 / 930 * height, width: 152 / 430 * width, borderRadius: 6, resizeMode: 'cover'
                                        }} />
                                    {/* {
 imgLoading ?
 <View style={{ width: 176 / 430 * width }}>
 <ActivityIndicator size={'small'} color={colors.blueColor} />
 </View> : ""
 } */}
                                    <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.meduim, marginTop: 7 }}>
                                        {item.first_name} {item.last_name}
                                    </Text>
                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                        <Image source={require('../../../assets/Images3/location.png')} style={{ height: 14 / 930 * height, width: 14 / 430 * width }} />
                                        <Text>
                                            {item.city ?
                                                <Text
                                                    style={{
                                                        fontWeight: '400', fontSize: 12,
                                                        fontFamily: customFonts.meduim, color: '#333333'
                                                    }}>
                                                    {item.city}
                                                </Text> :
                                                <Text>N/A</Text>
                                            }
                                        </Text>
                                    </View>
                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                        <Image source={require('../../../assets/Images3/crown2.png')} style={{ height: 15 / 930 * height, width: 15 / 430 * width }} />
                                        <Text style={{ fontWeight: '500', fontSize: 12, fontFamily: customFonts.meduim, color: '#FFC401' }}>
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
                        <View style={{ height: height, backgroundColor: '#00000050' }}>
                            <View style={{ height: 550 / 930 * height, borderTopRightRadius: 25, borderTopLeftRadius: 25, backgroundColor: 'white', width: width, position: 'absolute', bottom: 0, alignItems: 'center' }}>
                                <View style={{ width: width - 50 }}>
                                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 15 / 930 * height, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, fontWeight: '500', fontFamily: customFonts.meduim }}>
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
                                    <View style={{ flexDirection: 'row', gap: 5, marginTop: 13 / 930 * height, alignItems: 'center' }}>
                                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 }} onPress={() => {
                                            handlePress("free")
                                        }}>
                                            <Image source={selectedButton === "free" ? SelRadio : UnSelRadio} style={{ resizeMode: 'contain', height: 25 / 930 * height, width: 25 / 430 * width }} />
                                            <Text style={{ fontWeight: '400', fontSize: 14, fontFamily: customFonts.regular }}>
                                                Free
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '400', fontFamily: customFonts.regular, color: '#666666', marginTop: 25 / 930 * height }}>
                                        Premium
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 / 930 * height }}>
                                        {buttonData.map((button) => (
                                            <TouchableOpacity
                                                key={button.id}
                                                onPress={() => handlePress(button.id)}
                                                style={styles.button}
                                            >
                                                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
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
                                    <View style={{ borderRadius: 7, borderColor: '#CCCCCC', padding: 8, borderWidth: 1, marginTop: 5, height: 50, justifyContent: 'center' }}>
                                        <TouchableOpacity
                                            onPress={handleAddressPicker}
                                            style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.meduim, color: '#999999' }}>
                                            {filterUserAddress ?
                                                <Text style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.meduim, color: '#000000' }}>
                                                    {filterUserCity} {filterUserState}
                                                </Text> :
                                                <Text style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.meduim, color: '#000000' }}>
                                                    City/State
                                                </Text>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, justifyContent: 'space-between', width: '100%' }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setSelectedButton('');
                                                setFilterUserAddress('');
                                                setOpenModal(false);
                                                setNoMoreUsers(false);
                                                setAdminUsers([]);
                                                setApplyFilters(true);
                                            }}
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
                                                fontWeight: customFonts.meduim,
                                                fontWeight: '500',
                                                fontSize: 16
                                            }}>
                                                Reset
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={ApplyFilters}
                                            style={{
                                                height: 40 / 930 * height,
                                                width: 150 / 430 * width,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: 10,
                                                backgroundColor: '#6050DC'
                                            }}>
                                            <Text style={{
                                                fontWeight: customFonts.meduim,
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
                        </View>
                        <Modal
                            visible={openFilterModal}
                            animationType='slide'
                            transparent={true}
                        >
                            <DateFilterpoupAdmin onClose={handleCloseFilterpop} flterAddress={setFilterUserAddress} />
                        </Modal>
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
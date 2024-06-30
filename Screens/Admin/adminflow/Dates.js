import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'expo-image'
import customFonts from '../../../assets/fonts/Fonts'
import Apis from '../apis/Apis'
import RangeSlider from '../ui/RangeSlider/RangeSlider'
import { useFocusEffect } from '@react-navigation/native'
import colors from '../ui/RangeSlider/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GetBudget } from '../../../Services/dates/GetBudget'
import { DateFilterpoupAdmin } from '../ui/AdminDatesflow/DateFilterpoupAdmin'

const Dates = ({ navigation }) => {
    const timerRef = useRef(null);
    const { height, width } = Dimensions.get('window')

    const [DATA, setData] = useState([]);
    const [userImage, setuserImage] = useState('');
    const [openModal, setOpenModal] = useState('');
    const [openAddressModal, setOpenAddressModal] = useState('');
    const [Loading, setLoading] = useState(false);
    const [searchUser, setSearchUser] = useState('');
    const [filterDateAddress, setFilterDateAddress] = useState('');

    console.log('Address for filter data is :', filterDateAddress);
    const cityName = filterDateAddress.city;
    const stateName = filterDateAddress.state;

    console.log('Date filtered city is :', cityName + stateName);

    const handleModalclick = () => {
        setOpenModal(true);
    }

    const handleCloseDateFilterPopup = () => {
        setOpenAddressModal(false);
    }

    //code for search params
    useEffect(() => {

        // Clear the previous timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setData([])
        // setNoMoreUsers(false)
        // Set a new timer
        timerRef.current = setTimeout(() => {
            console.log("Search timer clicked")
            GetDates(searchUser);
        }, 500);

        // Cleanup function to clear the timer when component unmounts
        return () => clearTimeout(timerRef.current);

    }, [searchUser]);

    //get delete dates api
    const deleteDates = (index) => {
        console.log("Deleting user at index", index)
        const newItems = [...DATA];
        newItems.splice(index, 1);
        setData(newItems);
    }

    //get dates api
    const GetDates = async () => {
        // console.log('Hello there')
        try {
            setLoading(true)
            const data = await AsyncStorage.getItem("USER")
            if (data) {
                let d = JSON.parse(data)

                const AuthToken = d.token
                const response = await fetch(Apis.AdminDates + `?search=${searchUser}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthToken
                    }
                });
                if (response.ok) {
                    const Result = await response.json();
                    const newDates = Result.data;
                    if (newDates) {
                        console.log("Prev list ", newDates)
                        setData(prevDates => [...prevDates, ...newDates])
                    }
                    console.log('Response recieved from api is', Result.data);
                } else {
                    console.log("Response is not ok");
                }
            }
        } catch (error) {
            console.log('Error occured is', error)
        }
        finally {
            setLoading(false);
        }
    }

    //Add new date btn
    const handleAddDate = () => {
        navigation.navigate('AddNewDate', {
            DATA: {
                dateDetails: '',
                from: 'AdminDates'
            },
            newDate: instantlyAddDate
        })
    }

    //instantly add date

    const instantlyAddDate = (item) => {
        console.log('New Date from add date screen is ', item);
        // newDate(getdate)
        setData(prevDate => [...prevDate, item])
    }

    //date details button
    const handleDateDetails = (item, index) => {
        console.log("item to pass is", item);
        navigation.navigate('DateDetails', {
            DATA: {
                DateDetails: item
            },
            index: index,
            DateDeleted: deleteDates,
        })
    }

    //radio button code

    const RadioActive = require('../../../assets/Images3/radioAct.png');
    const RadioInact = require('../../../assets/Images3/radioInact.png');

    const [CheckBox1, setCheckBox1] = useState(false)
    const [CheckBox2, setCheckBox2] = useState(false)
    const [CheckBox3, setCheckBox3] = useState(false)
    const [CheckBox4, setCheckBox4] = useState(false)
    const [minBudgetFilterDate, setMinBudgetFilterDate] = useState(null);
    const [maxBudgetFilterDate, setMaxBudgetFilterDate] = useState(null);

    const handleRadioAct1 = () => {
        setCheckBox1(!CheckBox1)
        setCheckBox2(false)
        setCheckBox3(false)
        setCheckBox4(false)
    }

    const handleRadioAct2 = () => {
        setCheckBox2(!CheckBox2)
        setCheckBox1(false)
        setCheckBox3(false)
        setCheckBox4(false)
    }

    const handleRadioAct3 = () => {
        setCheckBox3(!CheckBox3)
        setCheckBox1(false)
        setCheckBox2(false)
        setCheckBox4(false)
    }

    const handleRadioAct4 = () => {
        setCheckBox4(!CheckBox4)
        setCheckBox1(false)
        setCheckBox2(false)
        setCheckBox3(false)
    }

    //code for storing values

    useEffect(() => {
        let minBudgetValue = null;
        let maxBudget = null;

        if (CheckBox1) {
            minBudgetValue = 0;
            maxBudget = 20;
        } else if (CheckBox2) {
            minBudgetValue = 20;
            maxBudget = 50;
        } else if (CheckBox3) {
            minBudgetValue = 50;
            maxBudget = 80;
        } else if (CheckBox4) {
            minBudgetValue = 80;
            maxBudget = 1000000
        }

        if (minBudgetValue) {
            setMinBudgetFilterDate(minBudgetValueBudgetValue);
            // console.log('Selected Budget is:', BudgetValue);
        } else {
            console.log('Select a Budget Value');
        }
    });

    //code for Categories btn array

    const CategoriesBtn = [
        {
            id: 1,
            value: 'All'
        },
        {
            id: 2,
            value: 'Adventure'
        },
        {
            id: 3,
            value: 'Outdoor Escapades'
        }
    ]

    //code for categories of filters

    const categories = [
        { id: '1', title: 'All' },
        { id: '2', title: 'Culinary Adventure' },
        { id: '3', title: 'Outdoor Escape' },
    ];

    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSelectCategory = (id) => {
        setSelectedCategory(id);
    };

    useEffect(() => {
        const category = categories.find(cat => cat.id === selectedCategory);
        if (category) {
            console.log(category.title);
        }
    }, [selectedCategory]);

    const renderItem = ({ item }) => {
        const isSelected = item.id === selectedCategory;
        return (
            <TouchableOpacity
                style={[styles.button, isSelected ? styles.selectedButton : null]}
                onPress={() => handleSelectCategory(item.id)}
            >
                <Text style={[styles.buttonText, isSelected ? styles.selectedButtonText : null]}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    };

    //code for rangeslider
    const initialStart = 1;
    const initialEnd = 5;
    const [range, setRange] = useState({ start: initialStart, end: initialEnd });
    const [MinRating, setMinRating] = useState(initialStart);
    const [MaxRating, setMaxRating] = useState(initialEnd);

    const handleRangeStartUpdate = (newStart) => {
        setRange((prev) => ({ ...prev, start: newStart }));
        const roundedStart = Math.round(newStart);
        setMinRating(roundedStart);
    };

    const handleRangeEndUpdate = (newEnd) => {
        setRange((prev) => ({ ...prev, end: newEnd }));
        const roundedEnd = Math.round(newEnd);
        setMaxRating(roundedEnd);
    };

    //converting min max budget value into $$$

    const GetBudgetVal = (item) => {
        console.log('GEt budget val is :', item);
        let budgetAmount = '';
        if (item.minBudget == 0 && item.maxBudget == 20) {
            budgetAmount = "$"
        } else if (item.minBudget == 20 && item.maxBudget == 50) {
            budgetAmount = "$$"
        } else if (item.minBudget == 50 && item.maxBudget == 80) {
            budgetAmount = "$$$"
        } else if (item.minBudget == 80 && item.maxBudget == 10000000) {
            budgetAmount = "$$$$"
        }
        return budgetAmount;
    };

    const handleCityClick = () => {
        setOpenAddressModal(true);
        console.log('Click working');
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 60 }}>
                    <Text style={[styles.header, { fontWeight: '500', fontSize: 24, fontFamily: customFonts.medium }]}>
                        Dates
                    </Text>
                    <View style={[styles.header, { gap: 15 }]}>
                        <TouchableOpacity onPress={handleAddDate} style={{ width: 30 / 430 * width }}>
                            <Image source={require('../../../assets/Images3/heart-add.png')} style={{ resizeMode: 'contain', height: 30 / 930 * height, width: 30 / 430 * width }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleModalclick} style={{ width: 30 / 430 * width }}>
                            <Image source={require('../../../assets/Images3/filter.png')} style={{ resizeMode: 'contain', height: 30 / 930 * height, width: 30 / 430 * width }} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Search bar */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderWidth: 1, borderRadius: 10, gap: 10, backgroundColor: '#ffffff', borderColor: '#E6E6E6', marginTop: 20 }}>
                    <TouchableOpacity style={{ width: 30 / 430 * width, height: 30 / 930 * height, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../../assets/Images3/searchIcon.png')} style={{ height: 50 / 930 * height, width: 50 / 930 * width, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <TextInput
                        value={searchUser}
                        onChangeText={(e) => setSearchUser(e)}
                        style={{
                            width: 304 / 430 * width,
                            fontSize: 14, fontWeight: '500', fontFamily: customFonts.medium, color: '#000000'
                        }}
                        placeholder='Search' />
                </View>

                {/* Grid view */}

                {Loading ?
                    <View style={{ height: height * 0.7, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={'large'} color={colors.blueColor} />
                    </View> :
                    <ScrollView
                        style={{ height: height - 300, marginTop: 30 }}
                        showsVerticalScrollIndicator={false} >
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}>
                            {DATA.map((item, index) => (
                                <TouchableOpacity onPress={() => handleDateDetails(item, index)} key={item.id} style={{ marginTop: 10 }}>
                                    <View style={{ borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 10, padding: 12, width: 176 / 430 * width }}>
                                        <Image source={item.imageUrl ? { uri: item.imageUrl } : require('../../../assets/Images3/imagePlaceholder.webp')} style={{ height: 98 / 930 * height, width: 152 / 430 * width, borderRadius: 6, resizeMode: 'cover' }} />
                                        <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.medium, marginTop: 7 }}>
                                            {item.name}
                                        </Text>
                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 12, fontWeight: '400', fontFamily: customFonts.medium, color: '#333333' }}>
                                                Budget :
                                            </Text>
                                            <Text
                                                style={{
                                                    fontWeight: '500', fontSize: 12,
                                                    fontFamily: customFonts.bold, color: '#333333'
                                                }}>
                                                {/* ${item.minBudget} - ${item.maxBudget}  */}
                                                {GetBudgetVal(item)}
                                            </Text>
                                        </View>
                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 12, fontWeight: '400', fontFamily: customFonts.medium, color: '#333333' }}>
                                                Ratings :
                                            </Text>
                                            <Text style={{ fontWeight: '500', fontSize: 12, fontFamily: customFonts.bold, color: '#333333' }}>
                                                5.0
                                            </Text>
                                        </View>
                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 12, fontWeight: '400', fontFamily: customFonts.medium, color: '#333333' }}>
                                                Category :
                                            </Text>
                                            <Text style={{ fontWeight: '500', width: 50, fontSize: 12, fontFamily: customFonts.medium, color: '#333333', textAlign: 'right' }}>
                                                {item.Category.name}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                }

                <View>
                    <Modal
                        visible={openModal}
                        transparent={true}
                        animationType='slide'
                        onRequestClose={() => setOpenModal(false)}
                    >
                        <View style={{ height: height, backgroundColor: '#00000050' }}>
                            <View style={{ height: 650 / 930 * height, borderTopRightRadius: 25, borderTopLeftRadius: 25, backgroundColor: 'white', width: width, position: 'absolute', bottom: 0, alignItems: 'center' }}>
                                <View style={{ width: width - 50 }}>
                                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 15 / 930 * height, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, fontWeight: '500', fontFamily: customFonts.medium }}>
                                            Filters
                                        </Text>
                                        <TouchableOpacity onPress={() => setOpenModal(false)} style={{ marginRight: 10 }}>
                                            <Image source={require('../../../assets/Images3/CrossIcon.png')} style={{ height: 20 / 930 * height, width: 20 / 430 * width, resizeMode: 'contain', }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ height: 0.1, borderWidth: 0.2, borderColor: '#E6E6E6', width: width, marginTop: 20 / 930 * height }}></View>
                                <View style={{ width: width - 50 }}>
                                    <Text style={{ fontWeight: '600', fontFamily: customFonts.semibold, fontSize: 16, marginTop: 20 }}>
                                        City/State
                                    </Text>
                                    <View style={{ borderRadius: 7, borderColor: '#CCCCCC', padding: 8, borderWidth: 1, marginTop: 5, height: 50, justifyContent: 'center' }}>
                                        <TouchableOpacity
                                            onPress={handleCityClick}
                                            style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.medium, color: '#999999' }}>
                                            {filterDateAddress ?
                                                <Text style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.medium, color: '#000000' }}>
                                                    {cityName} {stateName}
                                                </Text> :
                                                <Text style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.medium, color: '#000000' }}>
                                                    City/State
                                                </Text>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ fontWeight: '600', fontSize: 16, fontFamily: customFonts.semibold, color: '#333333', marginTop: 30 }}>
                                        Budget
                                    </Text>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                        <TouchableOpacity onPress={handleRadioAct1} style={styles.DollarBtn}>
                                            <Image source={CheckBox1 ? RadioActive : RadioInact} style={{ height: 22 / 930 * height, width: 22 / 430 * width }} />
                                            <Text>
                                                $
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleRadioAct2} style={styles.DollarBtn}>
                                            <Image source={CheckBox2 ? RadioActive : RadioInact} style={{ height: 22 / 930 * height, width: 22 / 430 * width }} />
                                            <Text>
                                                $$
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleRadioAct3} style={styles.DollarBtn}>
                                            <Image source={CheckBox3 ? RadioActive : RadioInact} style={{ height: 22 / 930 * height, width: 22 / 430 * width }} />
                                            <Text>
                                                $$$
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleRadioAct4} style={styles.DollarBtn}>
                                            <Image source={CheckBox4 ? RadioActive : RadioInact} style={{ height: 22 / 930 * height, width: 22 / 430 * width }} />
                                            <Text>
                                                $$$$
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                        <Text style={{ fontWeight: '600', fontFamily: customFonts.semibold, fontSize: 16 }}>
                                            Ratings
                                        </Text>
                                        <Text style={{ fontWeight: '600', fontFamily: customFonts.semibold, fontSize: 16 }}>
                                            {parseInt(MinRating/20)}-{parseInt(MaxRating/20)}
                                        </Text>
                                    </View>

                                    <RangeSlider
                                        // width={300}
                                        start={range.start}
                                        end={range.end}
                                        minValue={0}
                                        maxValue={100}
                                        minDistanceBetweenSlider={1}
                                        heightSlider={false}
                                        rangeStartUpdated={handleRangeStartUpdate}
                                        rangeEndUpdated={handleRangeEndUpdate}
                                    />

                                    <Text style={{ fontWeight: '600', fontFamily: customFonts.semibold, fontSize: 16, marginTop: 20 }}>
                                        Category
                                    </Text>

                                    <View style={[styles.container, { width: width - 50, }]}>
                                        <FlatList
                                            data={categories}
                                            renderItem={renderItem}
                                            keyExtractor={(item) => item.id}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                        />
                                    </View>
                                    <View style={{ width: width - 50, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                                        <View style={{ height: 48 / 930 * height, width: 173 / 430 * width, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, }}>
                                            <TouchableOpacity onPress={() => setOpenModal(false)}>
                                                <Text style={{ fontSize: 16, fontWeight: '500', fontFamily: customFonts.medium }}>
                                                    Reset
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ height: 48 / 930 * height, width: 173 / 430 * width, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#6050DC' }}>
                                            <TouchableOpacity>
                                                <Text style={{ fontSize: 16, fontWeight: '500', fontFamily: customFonts.medium, color: 'white' }}>
                                                    Apply
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </View>
                            </View>
                        </View>
                        <Modal
                            visible={openAddressModal}
                            animationType='slide'
                            transparent={true}
                            style={{ zIndex: 2 }}
                        >
                            <DateFilterpoupAdmin onClose={handleCloseDateFilterPopup} flterAddress={setFilterDateAddress} />
                        </Modal>
                    </Modal>
                </View>

                {/* Code for add location modal */}



            </View>
        </View>
    )
}

export default Dates

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    DollarBtn: {
        flexDirection: 'row',
        gap: 5,
        // borderWidth: 2,
        alignItems: 'center'
    },
    container: {
        flexDirection: 'row',
        marginTop: 20
        // padding: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
        marginHorizontal: 5,
    },
    selectedButton: {
        backgroundColor: '#6050DC',
    },
    buttonText: {
        color: '#000',
    },
    selectedButtonText: {
        color: '#fff',
    },
})
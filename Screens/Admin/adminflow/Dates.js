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
import DatesFilterPopup from '../../../Components/DatesFilterPopup'
import DatesLoadingIndicator from '../../../Services/dates/DatesLoadingIndicator'

const Dates = ({ navigation }) => {
    const timerRef = useRef(null);
    const inputRef = useRef(null);
    const { height, width } = Dimensions.get('window')
    const [DATA, setData] = useState([]);
    const [userImage, setuserImage] = useState('');
    const [openModal, setOpenModal] = useState('');
    const [openAddressModal, setOpenAddressModal] = useState('');
    const [Loading, setLoading] = useState(false);
    const [searchUser, setSearchUser] = useState('');
    const [filterDateAddress, setFilterDateAddress] = useState('');
    //code for datesfilter popup
    const [showmodal, setShowModal] = useState(false);
    const [dateFilters, setDateFilters] = useState({})
    const [finalFilters, setFinalFilters] = useState({
        category: -1
    });

    const inputReference = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

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
            if (searchUser !== null)
                GetDates("searchUser");
        }, 500);

        // Cleanup function to clear the timer when component unmounts
        return () => clearTimeout(timerRef.current);

    }, [searchUser]);

    // useFocusEffect(
    // React.useCallback(() => {
    // GetDates()
    // }, [])
    // )

    //get delete dates api
    const deleteDates = (index) => {
        console.log("Deleting user at index", index)
        const newItems = [...DATA];
        newItems.splice(index, 1);
        setData(newItems);
    }

    const updateDate = (date) => {
        const index = DATA.findIndex(item => item.id === date.id);

        if (index !== -1) {
            // Create a new array with the new object inserted at the specific index
            const updatedDate = [...DATA.slice(0, index), date, ...DATA.slice(index + 1)];
            setData(updatedDate);
        }
    }

    //get filter details
    useEffect(() => {
        console.log("Final Filters changed calling getdates function")
        GetDates("Final Filters Change")
    }, [finalFilters])

    //get dates api
    const GetDates = async (from = "None") => {
        console.log('Hello there')
        try {
            setLoading(true)
            const data = await AsyncStorage.getItem("USER")
            if (data) {
                let d = JSON.parse(data)

                const AuthToken = d.token;

                let path = Apis.AdminDates
                let firstParamSplitter = "?"

                if (searchUser !== '') {
                    path = `${path}${firstParamSplitter}search=${searchUser}`
                }
                if (typeof finalFilters.category != 'undefined' && finalFilters.category != -1) {
                    path = `${path}${firstParamSplitter}category=${finalFilters.category}`
                    firstParamSplitter = "&"
                }
                if (typeof finalFilters.minBudget != 'undefined' && finalFilters.minBudget != null) {
                    path = `${path}${firstParamSplitter}minBudget=${finalFilters.minBudget}`
                    firstParamSplitter = "&"
                }
                if (typeof finalFilters.maxBudget != 'undefined' && finalFilters.maxBudget != null) {
                    path = `${path}${firstParamSplitter}maxBudget=${finalFilters.maxBudget}`
                    firstParamSplitter = "&"
                }
                if (typeof finalFilters.minRating != 'undefined' && finalFilters.minRating != null) {
                    path = `${path}${firstParamSplitter}minRating=${finalFilters.minRating}`
                    firstParamSplitter = "&"
                }
                if (typeof finalFilters.maxRating != 'undefined' && finalFilters.maxRating != null && finalFilters.maxRating != 0) {
                    path = `${path}${firstParamSplitter}maxRating=${finalFilters.maxRating}`
                    firstParamSplitter = "&"
                }
                if (typeof finalFilters.city != 'undefined' && finalFilters.city != null) {
                    path = `${path}${firstParamSplitter}city=${finalFilters.city}`
                    firstParamSplitter = "&"
                }
                if (typeof finalFilters.state != 'undefined' && finalFilters.state != null) {
                    path = `${path}${firstParamSplitter}state=${finalFilters.state}`
                    firstParamSplitter = "&"
                }

                console.log('Path of api is :', path);
                console.log("Filters ", finalFilters)
                const response = await fetch(path, {
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
                        setData(newDates)
                    }
                    console.log('Response recieved from api is', Result.data);
                    setLoading(false)
                } else {
                    console.log("Response is not ok");
                }
            }
        } catch (error) {
            console.log('Error occured is', error)
        }
        finally {
            // setLoading(false);
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
        setData(prevDate => [...prevDate, item])
    }

    //date details button
    const handleDateDetails = (item, index) => {
        console.log("item to pass is", item);
        navigation.navigate('DateDetails', {
            DATA: {
                DateDetails: item,
                from: 'Dates'
            },
            index: index,
            DateDeleted: deleteDates,
            DateUpdated: updateDate,
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



    const closeModal = (filters) => {
        if (filters) {
            console.log('filters received from popup are', filters)

            // setDateFilters(filters)
            // setFinalFilters(filters)
            setFinalFilters(prevFilters => {
                const updatedFilters = {
                    ...prevFilters,
                    ...filters
                };
                console.log('Updated final filters are:', updatedFilters);
                return updatedFilters;
            });
            // GetDates("from jugad")
        }
        setShowModal(false)
    }
    return (
        <View style={{ display: 'flex', alignItems: 'center', height: height }}>
            {/*change if the screen is irResponsive height: height s*/}
            <View style={{ width: width - 50, alignItems: 'center' }}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#FFFFFF"
                    translucent={false}
                />
                {/* Header code */}
                <View style={{ width: width - 50, flexDirection: 'row', justifyContent: 'space-between', marginTop: 60, alignItems: 'center' }}>
                    <Text style={[styles.header, { fontWeight: '500', fontSize: 24, fontFamily: customFonts.meduim }]}>
                        Dates
                    </Text>
                    <View style={[styles.header, { gap: 15 }]}>
                        <TouchableOpacity onPress={handleAddDate} style={{ width: 30 / 430 * width }}>
                            <Image source={require('../../../assets/Images3/heart-add.png')} style={{ resizeMode: 'contain', height: 30 / 930 * height, width: 30 / 430 * width }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowModal(true)} style={{ width: 30 / 430 * width }}>
                            <Image source={require('../../../assets/Images3/filter.png')} style={{ resizeMode: 'contain', height: 30 / 930 * height, width: 30 / 430 * width }} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Search bar */}
                <View style={{
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10 / 930 * height, paddingHorizontal: 10 / 430 * width,
                    borderWidth: 1, borderRadius: 10, gap: 10, backgroundColor: '#ffffff', borderColor: '#E6E6E6', marginTop: 20, width: width - 50
                }}>
                    <TouchableOpacity onPress={inputReference} style={{ width: 30 / 430 * width, height: 30 / 930 * height, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../../assets/Images3/searchIcon.png')}
                            style={{ height: 50 / 930 * height, width: 50 / 930 * width, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <TextInput
                        ref={inputRef}
                        value={searchUser}
                        onChangeText={(e) => setSearchUser(e)}
                        style={{
                            width: 304 / 430 * width,
                            fontSize: 16, fontWeight: '500', fontFamily: customFonts.meduim, color: '#000000'
                        }} meduim
                        placeholder='Search' />
                </View>

                {/* Grid view */}

                {Loading ?
                    (
                        <View style={{ width: width }}>
                            <DatesLoadingIndicator from='admin' />
                        </View>
                    ) :
                    <ScrollView
                        style={{ height: height - 300, marginTop: 30 }}
                        showsVerticalScrollIndicator={false} >
                        <View style={{
                            flexDirection: 'row', flexWrap: 'wrap', display: 'flex', justifyContent: 'space-between', marginBottom: 30, width: width - 50, alignItems: 'flex-start'
                        }}>
                            {DATA.map((item, index) => (
                                <TouchableOpacity onPress={() => handleDateDetails(item, index)} key={item.id} style={{ marginTop: 10 }}>
                                    <View style={{ borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 10, padding: 12, width: 176 / 430 * width }}>
                                        <Image source={item.imageUrl ? { uri: item.imageUrl } : require('../../../assets/Images3/imagePlaceholder.webp')} style={{ height: 98 / 930 * height, width: 152 / 430 * width, borderRadius: 6, resizeMode: 'cover' }} />
                                        <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.meduim, marginTop: 7 }}>
                                            {item.name}
                                        </Text>
                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 12, fontWeight: '400', fontFamily: customFonts.meduim, color: '#333333' }}>
                                                Budget :
                                            </Text>
                                            <Text
                                                style={{
                                                    fontWeight: '500', fontSize: 12,
                                                    fontFamily: customFonts.bold, color: '#333333'
                                                }}>
                                                {/* ${item.minBudget} - ${item.maxBudget} */}
                                                {GetBudget(item)}
                                                {/* {GetBudgetVal(item)} */}
                                            </Text>
                                        </View>
                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 12, fontWeight: '400', fontFamily: customFonts.meduim, color: '#333333' }}>
                                                Ratings :
                                            </Text>
                                            <Text style={{ fontWeight: '500', fontSize: 12, fontFamily: customFonts.bold, color: '#333333' }}>
                                                {item.rating}
                                            </Text>
                                        </View>
                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 12, fontWeight: '400', fontFamily: customFonts.meduim, color: '#333333' }}>
                                                Category :
                                            </Text>
                                            <Text style={{ fontWeight: '500', width: 50, fontSize: 12, fontFamily: customFonts.meduim, color: '#333333', textAlign: 'right' }}>
                                                {item.Category.name}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                }

                <DatesFilterPopup
                    visible={showmodal} close={closeModal} closeWithouFilters={() => {
                        setShowModal(false)
                    }} filters={finalFilters}
                />

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
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, View, Text, Dimensions, Modal, Keyboard, Platform, TouchableWithoutFeedback, TouchableOpacity, TextInput, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native'
import { Image } from 'expo-image'
import customFonts from '../../../../assets/fonts/Fonts'
import { Dropdown } from 'react-native-element-dropdown'
import Apis from '../../apis/Apis'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../RangeSlider/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import AddressPicker from '../Addresspicker/AddressPicker'
import { ShowMessage } from '../../../../Services/Snakbar/ShowMessage'

import moment from 'moment'

const AddDate = ({ navigation, route }) => {
    const routeData = route.params.DATA;
    // const test = route.params.newDate('Hello')
    console.log('Data is', routeData.dateDetails)
    const DateData = routeData.dateDetails;
    console.log('Route data of date details is :', DateData);
    // const LocationSelected = routeData.LocationSel;
    // console.log("selected location is :", LocationSelected);
    const { height, width } = Dimensions.get('window');

    const scrolToTop = useRef(null)


    const [BusinessName, setBusinessName] = useState('');
    const [CategorySelected, setCategorySelected] = useState('');
    const [UserBudget, setUserBudget] = useState('');
    const [Address, setAddress] = useState('');
    const [Description, setDescription] = useState('');
    const [ApiCategories, setApiCategories] = useState([]);
    const [Category, setCategory] = useState('Select business category');
    const [testCat, setTestCat] = useState('');
    const [CategoryName, setCategoryName] = useState('Select business category');
    const [CategoryId, setCategoryId] = useState('');
    const [MinBudget, setMinBudget] = useState('');
    console.log('Min budget value is :', MinBudget);
    const [MaxBudget, setMaxBudget] = useState('');
    const [Budget, setBudget] = useState('Select budget');
    const [image, setImage] = useState(null);
    const [latitude, setlatitude] = useState('');
    const [longitude, setlongitude] = useState('');
    const [CityName, setCityName] = useState('');
    const [longAddress, setLongAddress] = useState('');

    const [StateName, setStateName] = useState('');
    const [Loading, setLoading] = useState(false);
    const [DateOpenTime, setDateOpenTime] = useState('');
    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [openTime, setOpenTime] = useState(null);
    const [closeTime, setCloseTime] = useState(null);
    const [currentPicker, setCurrentPicker] = useState(null);
    const [error, setError] = useState(null);
    const [SelOpenTime, setSelOpenTime] = useState(null);
    const [SelCloseTime, setSelCloseTime] = useState(null);
    const [filters, setFilters] = useState({})
    const [openModalLocation, setOpenModalLocation] = useState(false);
    const [activeKeyboard, setActiveKeyboard] = useState(0);

    useEffect(() => {
        if (routeData.from === "EditDate") {
            setBusinessName(DateData.name);
            setCategoryId(DateData.Category.id);
            setCategory(DateData.Category);
            setTestCat(DateData.Category.id);
            console.log('Category passed from previous screen is :', DateData.Category);
            setCategoryName(DateData.Category.name);
            setBudget(formateBudget());
            setMaxBudget(DateData.maxBudget);
            setMinBudget(DateData.minBudget);
            setDescription(DateData.description);
            setImage(DateData.imageUrl);
            setAddress(DateData.address);
            setSelCloseTime(DateData.closeTime);
            setSelOpenTime(DateData.openTime);
            setDateOpenTime(DateData.openTime);
            setCityName(DateData.address);
            setlatitude(DateData.latitude);
            setlongitude(DateData.longitude);
            let openTime = formatTimeWithDate(DateData.openTime)
            let closeTime = formatTimeWithDate(DateData.closeTime)

            setDate(new Date(openTime))
            setDate2(new Date(closeTime))
        }
    }, [])


    const formateBudget = () => {
        console.log('min budget and max budget is', `${DateData.minBudget} ${DateData.maxBudget}`)
        if (DateData.minBudget == "0" && DateData.maxBudget == "20") {
            return `$0 - $20 = $`
        } else if (DateData.minBudget == "20" && DateData.maxBudget == "50") {
            return `$20 - $50 = $$`
        } else if (DateData.minBudget == "50" && DateData.maxBudget == "80") {
            return `$50 - $80 = $$$`
        } else if (DateData.minBudget == "80") {
            return `$80+ = $$$$`
        }

    }

    useEffect(() => {
        // setSelOpenTime(DateData.openTime)
        console.log("Value of open time :", SelOpenTime);
    }, [SelOpenTime])


    const formatTimeWithDate = (timeString) => {
        const currentDate = moment();
        // Combine current date with provided time string
        const combinedDateTime = moment(currentDate.format('YYYY-MM-DD') + ' ' + timeString, 'YYYY-MM-DD h:mm A');

        // Format the combined datetime in ISO format
        const formattedDateTime = combinedDateTime.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

        return formattedDateTime;
    }

    const handleBackClick = () => {
        navigation.pop()
    }


    console.log('Selected category is', Category)

    useEffect(() => {
        const GetCategoriesData = async () => {
            const data = await AsyncStorage.getItem("USER");
            if (data) {
                let d = JSON.parse(data);
                const AuthToken = d.token
                // const AuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdF9uYW1lIjoiQXJzbGFuIiwibGFzdF9uYW1lIjoiTmFlZW0iLCJlbWFpbCI6ImFyc2xhbkBzb3VsbWF0Y2guY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkZk1kY05WRFdya050QS8zaHF1NHhlZVI5aUNSVGxlQ25QTkFZa3dCOHpydEwyMExPTHUzZVciLCJwcm9maWxlX2ltYWdlIjoiIiwiaW50cm9fdmlkZW8iOiJodHRwczovL3BsdXJhd2wtc3RvcmFnZS5zMy51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS9tZWRpYVByb2ZpbGUxNzE1ODc0OTE2MDk3IiwiaW50cm9fdGh1bWJuYWlsX3VybCI6Imh0dHBzOi8vcGx1cmF3bC1zdG9yYWdlLnMzLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL3RodW1ibWVkaWFQcm9maWxlMTcxNTg3NDkyNzM4MSIsImNvbXBhbnkiOm51bGwsImpvYl90aXRsZSI6bnVsbCwiYWdlIjpudWxsLCJoZWlnaHRfaW5jaGVzIjpudWxsLCJoZWlnaHRfZmVldCI6bnVsbCwiem9kaWFjIjpudWxsLCJzY2hvb2wiOm51bGwsImNpdHkiOm51bGwsInN0YXRlIjpudWxsLCJsYXQiOm51bGwsImxhbmciOm51bGwsImdlbmRlciI6bnVsbCwiZmNtX3Rva2VuIjpudWxsLCJkZXZpY2VfaWQiOiIiLCJwcm92aWRlcl9pZCI6IiIsInByb3ZpZGVyX25hbWUiOiJFbWFpbCIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjpudWxsLCJlbmNfa2V5IjpudWxsLCJlbmNfaXYiOm51bGwsImRvYiI6bnVsbCwicG9pbnRzIjowLCJpbnRlcmVzdGVkX2dlbmRlciI6bnVsbCwiaW50ZXJlc3RlZF9taW5fYWdlIjpudWxsLCJpbnRlcmVzdGVkX21heF9hZ2UiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjQtMDUtMDdUMTk6MDA6MzkuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDUtMTZUMTU6NTU6MzAuMDAwWiJ9LCJpYXQiOjE3MTY4NzMyOTcsImV4cCI6MTc0ODQwOTI5N30.0HygSYQSh2WJbYWajmCB0aizc08lElYZITADVeEBNuw";
                const response = await fetch(Apis.GetCategories, {
                    'method': 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthToken
                    }
                });
                if (response.ok) {
                    const DATA = await response.json();
                    // setApiCategories(DATA.data.name);
                    const apiData = DATA.data;
                    const transformedData = apiData.map(item => ({
                        value: item.id,
                        label: item.name
                    }));

                    // Set the transformed data to ApiCategories
                    setApiCategories(transformedData);
                    // console.log('Resposne from api is', DATA.data)
                }
            }
        }
        GetCategoriesData();
    }, [])

    //alert message
    // console.log("UserBudget is", Budget);

    const BudgetAmount = [
        {
            value: '1',
            lable: '$0 - $20 = $',
        },
        {
            value: '2',
            lable: '$20 - $50 = $$',
        },
        {
            value: '3',
            lable: '$50 - $80 = $$$',
        },

        {
            value: '4',
            lable: '$80 + = $$$$',
        }
    ]

    useEffect(() => {
        console.log("Budget changed", Budget)
        if (Budget) {


            if (Budget.lable === '$80 + = $$$$') {
                setMinBudget(80)
                setMaxBudget(10000000)
                // console.log('Budget valus is', MinBudget)
            } else if (Budget.lable === '$50 - $80 = $$$') {
                setMinBudget(50)
                setMaxBudget(80)
            } else if (Budget.lable === '$20 - $50 = $$') {
                setMinBudget(20)
                setMaxBudget(50)
            } else if (Budget.lable === '$0 - $20 = $') {
                setMinBudget(0)
                setMaxBudget(20)
            }
        }
    }, [Budget])


    //alert message

    const showAlert = () => {
        if (BusinessName.length === 0 || Category === 'Select category' || Budget.lable === 'Select budget' || Description.length === 0) {
            Alert.alert(
                'Warning', // Title of the alert
                'Enter all credentials.', // Alert message
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        } else {
            // console.warn('Welcome')
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5,
        });

        if (!result.canceled) {
            const ImageUrl = result.assets[0].uri;
            // console.log('Image url recieved is', ImageUrl)
            setImage(ImageUrl)
            // console.log(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    }

    const handleSaveButton = async () => {
        if (BusinessName.length === 0 || Category === 'Select category' || Budget.lable === 'Select budget' || Description.length === 0, !SelOpenTime || !SelCloseTime) {
            Alert.alert('Enter all credentials')
            return
        }
        console.log("Selected open time is ", SelOpenTime);
        // return
        setLoading(true);
        const data = await AsyncStorage.getItem("USER")
        if (data) {
            let d = JSON.parse(data)

            const AuthToken = d.token
            try {
                setLoading(true);
                // const AuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyNSwiZmlyc3RfbmFtZSI6ImFkbWluIiwibGFzdF9uYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQHNvdWxtYXRjaC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRmazNoTEN6MGlObGNNdjd4RVV3U2ouOWZtdms2SFNIRi4wdG5SWS5YWGl0MllTLkhsbUhBQyIsInByb2ZpbGVfaW1hZ2UiOiIiLCJpbnRyb192aWRlbyI6bnVsbCwiaW50cm9fdGh1bWJuYWlsX3VybCI6bnVsbCwiY29tcGFueSI6bnVsbCwiam9iX3RpdGxlIjpudWxsLCJhZ2UiOm51bGwsImhlaWdodF9pbmNoZXMiOm51bGwsImhlaWdodF9mZWV0IjpudWxsLCJ6b2RpYWMiOm51bGwsInNjaG9vbCI6bnVsbCwiY2l0eSI6bnVsbCwic3RhdGUiOm51bGwsImxhdCI6bnVsbCwibGFuZyI6bnVsbCwiZ2VuZGVyIjpudWxsLCJmY21fdG9rZW4iOm51bGwsImRldmljZV9pZCI6IiIsInByb3ZpZGVyX2lkIjoiIiwicHJvdmlkZXJfbmFtZSI6IkVtYWlsIiwicm9sZSI6ImFkbWluIiwic3RhdHVzIjpudWxsLCJlbmNfa2V5IjpudWxsLCJlbmNfaXYiOm51bGwsImRvYiI6bnVsbCwicG9pbnRzIjowLCJpbnRlcmVzdGVkX2dlbmRlciI6bnVsbCwiaW50ZXJlc3RlZF9taW5fYWdlIjpudWxsLCJpbnRlcmVzdGVkX21heF9hZ2UiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjQtMDUtMjhUMDY6NDg6NTEuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDUtMjhUMDY6NTA6MDQuMDAwWiJ9LCJpYXQiOjE3MTY4NzkwNzUsImV4cCI6MTc0ODQxNTA3NX0.WdN1uRySZaxW2BzDJSWt3b97puD51PViXu6fL-sJQIs";
                // const ApiUrl = "https://plurawlapp.com/soulmatch/api/admin/dates/add_date_place";
                const ApiUrl = Apis.AddDatePlace;
                const formData = new FormData();
                formData.append("categoryId", Category.value);
                formData.append("minBudget", MinBudget);
                formData.append("maxBudget", MaxBudget);
                formData.append("openTime", SelOpenTime);
                formData.append("closeTime", SelCloseTime);
                //add long address here
                formData.append("address", longAddress);
                formData.append("state", StateName);
                formData.append("city", CityName);
                formData.append("latitude", latitude);
                formData.append("longitude", longitude);
                formData.append("description", Description);
                formData.append("name", BusinessName);
                formData.append("image", {
                    name: "imageName",
                    uri: image,
                    type: 'image/jpeg'
                });

                console.log('form data ', formData)
                // return
                const response = await fetch(ApiUrl, {
                    'method': 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + AuthToken
                    },
                    body: formData
                });
                if (response.ok) {
                    const Result = await response.json();
                    if (Result.status === true) {
                        console.log("Response of api is", Result);
                        ShowMessage("Date added successFully", colors.blueColor);

                        const newDateData = Result.data
                        console.log('new date data on add date screen is', newDateData)
                        // return
                        route.params.newDate(newDateData);
                        navigation.pop();
                    }
                    else {
                        //show error message to the user
                        console.log("Error adding date place ", Result.message)
                    }
                } else if (!response.ok) {
                    console.log("Status is false");
                }
            } catch (error) {
                console.log('Error occured is :', error);
            }
            finally {
                setLoading(false);
            }
        }
    }

    const handleSaveClick = () => {
        // showAlert(),
        handleSaveButton()
    }

    // console.log('Id recieved is :', DateData.id);

    //test code for getting user location using google addresspicker

    const GOOGLE_PLACES_API_KEY = 'AIzaSyAvhNXgMGSYcFIHLkRmZkDta_U7yWdgQQI';

    //code for listeners
    const [marginTop, setmarginTop] = useState(0);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            // console.log("Keyboard show")

            // setmarginTop(-200);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            // console.log("Keyboard hide")
            setmarginTop(0);
            setActiveKeyboard(0)
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    //test code for Address Picker
    const pickAddress = (address) => {
        console.log('address is ', address)
        setCityName(address.city)
        setStateName(address.state)
        setlongitude(address.lang)
        // setlatitude(address.lat)
    }

    const handlePickAddress = () => {
        setOpenModalLocation(true)
        // console.warn("hello");
        // navigation.navigate('AddressPicker', {
        // PickAddress: pickAddress
        // })
    }

    //test code for address

    // console.log('Value of latitude is from asyn storage is :', latitude);
    // console.log('Value of longitude from async storage is :', longitude);
    // console.log('Value of city from async storage is :', CityName);
    // console.log("Value of state is :", StateName);

    //Code for time picker


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');

        if (currentPicker === 'open') {
            if (closeTime && currentDate >= closeTime) {
                setError('Open time cannot be later than or equal to close time');
                Alert.alert('Error', 'Open time cannot be later than or equal to close time');
            } else {
                setOpenTime(currentDate);
                setError(null);
                console.log('Open Time:', formatTime(currentDate));
                setSelOpenTime(formatTime(currentDate));
            }
        } else if (currentPicker === 'close') {
            if (openTime && currentDate <= openTime) {
                setError('Close time cannot be earlier than or equal to open time');
                Alert.alert('Error', 'Close time cannot be earlier than or equal to open time');
            } else {
                setCloseTime(currentDate);
                setError(null);
                console.log('Close Time:', formatTime(currentDate));
                AsyncStorage.setItem('CloseTime', JSON.stringify({ closeTime: formatTime(currentDate) }))
                setSelCloseTime(formatTime(currentDate));
            }
        }
    };

    const showMode = (currentMode, picker) => {
        setShow(true);
        setMode(currentMode);
        setCurrentPicker(picker);
    };

    const showOpenTimepicker = () => {
        showMode('time', 'open');
    };

    const showCloseTimepicker = () => {
        showMode('time', 'close');
    };

    const formatTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        console.log(`Open time is ${hours}:${minutes} ${ampm}`)
        return `${hours}:${minutes} ${ampm}`;
    };

    const handleUpdate = async () => {

        try {
            setLoading2(true);
            const data = await AsyncStorage.getItem("USER")
            if (data) {
                let d = JSON.parse(data);
                const AuthToken = d.token;
                const formData = new FormData();
                let CatVal = '';
                if (Category.name) {
                    CatVal = Category.name;
                } else {
                    CatVal = DateData.Category.id
                }
                formData.append("categoryId", CategoryId);
                formData.append("minBudget", MinBudget);
                formData.append("maxBudget", MaxBudget);
                formData.append("openTime", SelOpenTime);
                formData.append("closeTime", SelCloseTime);
                //add long address here
                formData.append("address", longAddress);
                formData.append("latitude", latitude);
                formData.append("longitude", longitude);
                formData.append("description", Description);
                formData.append("name", BusinessName);
                formData.append("image", {
                    name: "imageName",
                    uri: image,
                    type: 'image/jpeg'
                });
                formData.append("id", DateData.id);
                console.log('Form data is :', formData);
                // return
                const response = await fetch(Apis.UpdateDatePlace, {
                    'method': 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + AuthToken
                    },
                    body: formData
                });
                // console.log('Auth token for update api is :', AuthToken);
                console.log('Response of api is :', response);
                if (response.ok) {
                    const UpdateData = await response.json();
                    console.log('Response of update api is :', UpdateData);
                    ShowMessage("Date updated succesfully", colors.blueColor);

                    route.params.updateDate(UpdateData);
                    navigation.pop();
                } else {
                    console.log('Response is not ok :', response);
                    const errorText = await response.text();
                    console.log('Error text:', errorText);
                }
            } else {
                console.log("No data recieved form localstorage");
            }
        } catch (error) {
            console.error('Error occured is :', error);
        } finally {
            setLoading2(false)
        }
    }

    const handleOpen = (event, selectedDate) => {
        const date = new Date()
        const currentDate = selectedDate || date;
        setOpenTime(currentDate);
        setError(null);
        setDate(currentDate)
        let time = formatTime(currentDate)
        console.log('Open Time:', time);
        setSelOpenTime(time);
    }
    const handleClose = (event, selectedDate) => {
        const date = new Date()
        const currentDate = selectedDate || date;
        setCloseTime(currentDate);
        setError(null);
        setDate2(currentDate)
        let time = formatTime(currentDate)
        console.log('Open Time:', time);
        setSelCloseTime(time);
    }


    return (
        <SafeAreaView>
            <TouchableWithoutFeedback style={{ height: height }}
                onPress={() => {
                    Keyboard.dismiss()
                }}
            >
                <View style={{ alignSelf: 'center', alignItems: 'center', height: height * 0.95, width: width }}>
                    <View style={{ width: width - 50, marginTop: marginTop, }}>

                        <View style={{ marginTop: 0, flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                                <TouchableOpacity onPress={handleBackClick} style={{ width: 46 / 430 * width }}>
                                    <View style={{ height: 46 / 930 * height, width: 46 / 430 * width, borderWidth: 1, borderColor: '#E6E6E6', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
                                        <Image source={require('../../../../assets/Images3/backIcon.png')} style={{ height: 12, width: 6, resizeMode: 'contain' }} />
                                    </View>
                                </TouchableOpacity>
                                {
                                    routeData.from === "AdminDates" ? (
                                        <Text style={{ fontWeight: '500', fontSize: 24, fontFamily: customFonts.meduim }}>
                                            Add new date
                                        </Text>
                                    ) : (
                                        <Text style={{ fontWeight: '500', fontSize: 24, fontFamily: customFonts.meduim }}>
                                            Edit
                                        </Text>
                                    )
                                }

                            </View>

                            {
                                routeData.from === "AdminDates" ? (
                                    <View style={{ justifyContent: 'center' }}>
                                        {
                                            Loading ?
                                                <ActivityIndicator size={'small'} color={colors.blueColor} /> :
                                                <TouchableOpacity onPress={handleSaveClick} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ fontWeight: '500', fontFamily: customFonts.meduim, fontSize: 14, color: '#6050DC' }}>
                                                        Save
                                                    </Text>
                                                </TouchableOpacity>
                                        }
                                    </View>
                                ) : (
                                    <View style={{ justifyContent: 'center' }}>
                                        {
                                            loading2 ?
                                                <ActivityIndicator size={'small'} color={colors.blueColor} /> :
                                                <TouchableOpacity onPress={handleUpdate} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ fontWeight: '500', fontFamily: customFonts.meduim, fontSize: 14, color: '#6050DC' }}>
                                                        Update
                                                    </Text>
                                                </TouchableOpacity>
                                        }
                                    </View>
                                )
                            }

                        </View>

                        <View style={{ height: height * 0.85 }}>
                            {/* <ScrollView refr={scrolToTop} showsVerticalScrollIndicator={false} style={{ height: height * 0.85,}}> */}
                            {/* <Text style={{ fontWeight: '500', fontFamily: customFonts.meduim, fontSize: 16, marginTop: 18 }}>
 Add Image
 </Text> */}
                            {image ?
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={pickImage}>
                                        <Image source={image ? { uri: image } : require('../../../../assets/Images3/imagePlaceholder.webp')}
                                            style={{ width: 120 / 430 * width, height: 120 / 930 * height, resizeMode: 'cover', marginTop: 10 / 930 * height, borderRadius: 100 }} />
                                    </TouchableOpacity>
                                </View> :
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                    <TouchableOpacity onPress={pickImage}>
                                        <Image source={require('../../../../assets/Images3/uploadImage.png')}
                                            style={{ height: 120 / 930 * height, width: 120 / 430 * width, resizeMode: 'contain' }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            }

                            <Text style={{ fontWeight: '500', fontFamily: customFonts.meduim, fontSize: 16, marginTop: 18 }}>
                                Business name
                            </Text>

                            <View style={{ borderWidth: 1, borderColor: colors.greyText, borderRadius: 10, padding: 16, justifyContent: 'center', marginTop: 5 }}>
                                <TextInput
                                    value={BusinessName}
                                    onFocus={() => {
                                        setmarginTop(-200 / 930 * height)
                                    }}
                                    placeholderTextColor={"#999999"}
                                    onChangeText={(Business) => setBusinessName(Business)}
                                    style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.meduim, }}
                                    placeholder='Enter business name'
                                />
                            </View>

                            <Text style={styles.Dropdownlabel}>
                                Category
                            </Text>
                            {/*<CategoryDropdown style={{ marginTop: 15 }} onCategoryChange={handleCategoryChange} />*/}

                            <Dropdown
                                style={styles.dropdown}
                                selectedTextStyle={styles.selectedTextStyle}
                                placeholderStyle={styles.placeholderStyle}
                                iconStyle={styles.iconStyle}
                                maxHeight={200}
                                value={Category}
                                data={ApiCategories}
                                valueField="value"
                                labelField="label"
                                placeholder={CategoryName}
                                searchPlaceholder="Search categories"
                                onChange={item => {
                                    setCategory(item);
                                    setCategoryId(item.value)
                                }}
                            />

                            <Text style={styles.Dropdownlabel}>
                                Budget
                            </Text>


                            <Dropdown
                                style={styles.dropdown}
                                selectedTextStyle={{
                                    fontSize: 14,
                                    color: '#000',
                                    fontWeight: '500',
                                    fontFamily: customFonts.meduim
                                }}
                                placeholderStyle={styles.placeholderStyle}
                                // imageStyle={styles.imageStyle}
                                iconStyle={styles.iconStyle}
                                maxHeight={200}
                                value={Budget}
                                data={BudgetAmount}
                                valueField="value"
                                labelField="lable"
                                // imageField="image"
                                placeholder={Budget}
                                itemTextStyle={{
                                    color: '#000000',
                                    fontWeight: '500',
                                    fontFamily: customFonts.meduim,
                                    fontSize: 14,
                                }
                                }
                                onChange={e => {
                                    console.log("On changed ", e.lable)
                                    setBudget(e);
                                }}
                            />

                            <Text style={styles.Dropdownlabel}>
                                Hours of Operation
                            </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - 30, alignSelf: 'center' }}>
                                <View style={{ alignItems: 'center', gap: 5, marginTop: 5 }}>
                                    <Text style={{ fontSize: 16, fontFamily: customFonts.regular, marginLeft: 10 / 430 * width }}>
                                        Opening Time
                                    </Text>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        // minimumDate={new Date()}
                                        mode={mode}
                                        is24Hour={false}
                                        display="default"
                                        onChange={handleOpen}
                                    />
                                </View>

                                <View style={{ alignItems: 'center', gap: 5, marginTop: 5 }}>
                                    <Text style={{ fontSize: 16, fontFamily: customFonts.regular }}>
                                        Closing Time
                                    </Text>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date2}
                                        // minimumDate={new Date()}
                                        mode={mode}
                                        is24Hour={false}
                                        display="default"
                                        onChange={handleClose}
                                    />
                                </View>

                            </View>

                            <View>
                                {error && <Text style={styles.ErrorText}>{error}</Text>}
                            </View>

                            <Text style={styles.Dropdownlabel}>
                                Address
                            </Text>

                            <TouchableOpacity onPress={handlePickAddress}>
                                <View style={{ borderRadius: 10, borderColor: colors.greyText, padding: 15, borderWidth: 1 }}>
                                    <Text style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.meduim }}>
                                        {
                                            longAddress ?
                                                <Text>
                                                    {longAddress}
                                                </Text> :
                                                <Text>
                                                    {DateData ?
                                                        <Text>
                                                            {DateData.address}
                                                        </Text> :
                                                        <Text style={{ color: "#00000050" }} >
                                                            Enter Address
                                                        </Text>
                                                    }
                                                </Text>
                                        }
                                    </Text>

                                </View>
                            </TouchableOpacity>

                            <Text style={styles.Dropdownlabel}>
                                Description
                            </Text>
                            <View style={{ borderRadius: 10, borderColor: colors.greyText, padding: 8, borderWidth: 1 }}>
                                <TextInput
                                    value={Description}
                                    onFocus={() => {
                                        setmarginTop(-300 / 930 * height)
                                    }}
                                    onChangeText={(Description) => setDescription(Description)}
                                    multiline
                                    placeholder='Enter description'
                                    textAlignVertical='top'
                                    style={{ fontWeight: '500', color: '#000000', fontSize: 14, fontFamily: customFonts.meduim, height: 80 / 930 * height, }} />
                            </View>
                            {/* </ScrollView> */}
                        </View>
                    </View>

                    {
                        openModalLocation && (
                            <Modal
                                visible={openModalLocation}
                                transparent={true}
                                animationType='slide'
                            >
                                <AddressPicker PickAddress={async (address) => {
                                    console.log("Address picked from popup", address)
                                    setOpenModalLocation(false)
                                    setCityName(address.city);
                                    let completeAddress = ""
                                    if (address.streetNo) {
                                        completeAddress = address.streetNo
                                    }
                                    if (address.route) {
                                        completeAddress = completeAddress + ` ${address.route}`
                                    }
                                    if (address.city) {
                                        completeAddress = completeAddress + ` ${address.city}`
                                    }
                                    if (address.state2) {
                                        completeAddress = completeAddress + ` ${address.state2}`
                                    }
                                    if (address.state) {
                                        completeAddress = completeAddress + ` ${address.state}`
                                    }
                                    console.log("Compelte address is ", completeAddress)
                                    setLongAddress(completeAddress);
                                    setlatitude(address.lang);
                                    setlongitude(address.lat);
                                    setStateName(address.state)
                                    // setFilters(newFilters) 
                                }} backButtonPressed={() => {
                                    setOpenModalLocation(false)
                                }} />
                            </Modal>
                        )
                    }

                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default AddDate;


//styles for dropdown
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    dropdown: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        width: width - 50,
        borderRadius: 10,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: colors.greyText,
    },
    placeholderStyle: {
        fontSize: 14,
        color: '#00000060',
        fontWeight: '500',
        fontFamily: customFonts.meduim
    },
    selectedTextStyle: {
        fontSize: 14,
        color: '#000000',
        fontWeight: '500',
        fontFamily: customFonts.meduim
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    itemTextStyle: {
        fontSize: 14,
        color: 'red',
    },
    Dropdownlabel: {
        fontWeight: '500',
        fontFamily: customFonts.meduim,
        fontSize: 16,
        color: '#00000',
        marginTop: 20 / 930 * height,
        marginBottom: 5
    },
    OperationTime: {
        color: '#999999',
        fontWeight: '500',
        fontSize: 14,
        fontFamily: customFonts.meduim
    },
    OperationTime: {
        fontSize: 16,
        color: '#000',
    },
    ErrorText: {
        color: 'red',
        marginTop: 10,
    },
    timePicker: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        width: 177 / 430 * width,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    clockIcon: {
        height: 22 / 930 * height,
        width: 22 / 430 * width,
        resizeMode: 'contain',
    },
});
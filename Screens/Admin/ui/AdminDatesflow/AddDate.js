import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Alert, View, Text, Dimensions, KeyboardAvoidingView, Keyboard, Platform, TouchableWithoutFeedback, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import customFonts from '../../../../assets/fonts/Fonts'
import { Dropdown } from 'react-native-element-dropdown'
import Apis from '../../apis/Apis'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../RangeSlider/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddDate = ({ navigation, route }) => {
    const routeData = route.params.DATA;
    // console.log('Data is', routeData)
    const DateData = routeData.dateDetails;
    // const LocationSelected = routeData.LocationSel;
    // console.log("selected location is :", LocationSelected);
    const { height, width } = Dimensions.get('window');

    //code for getting location from addresspicker

    // const locationData = route.params.Location;
    // console.log("Address recieved from previous screen is :", locationData);

    // try {
    //     const locationData = route.params.Location;
    //     console.log("Address received from the previous screen is:", locationData);
    // } catch (error) {
    //     console.error("Error fetching place details:", error);
    // }

    // let locationData;

    // try {
    //     // Check if route.params is defined and log it for debugging
    //     if (route && route.params) {
    //         console.log("Route params:", route.params);

    //         // Safely access nested properties using optional chaining
    //         locationData = route.params?.Location?.LocationData;

    //         // Log the received data
    //         console.log("Address received from the previous screen is:", locationData);
    //     } else {
    //         throw new Error("route.params is undefined");
    //     }
    // } catch (error) {
    //     // Log the error for debugging purposes
    //     console.error("Error fetching place details:", error);
    // }

    const [BusinessName, setBusinessName] = useState('');
    const [CategorySelected, setCategorySelected] = useState('');
    const [UserBudget, setUserBudget] = useState('');
    const [Address, setAddress] = useState('');
    const [Description, setDescription] = useState('');
    const [ApiCategories, setApiCategories] = useState([]);
    const [Category, setCategory] = useState('Select category');
    const [MinBudget, setMinBudget] = useState('');
    const [MaxBudget, setMaxBudget] = useState('');
    const [Budget, setBudget] = useState('Select budget');
    const [image, setImage] = useState(null);
    const [latitude, setlatitude] = useState('');
    const [longitude, setlongitude] = useState('');
    const [CityName, setCityName] = useState('');
    const [StateName, setStateName] = useState('');
    const [Loading, setLoading] = useState(false);
    const [DateOpenTime, setDateOpenTime] = useState('');
    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);
    const [openTime, setOpenTime] = useState(null);
    const [closeTime, setCloseTime] = useState(null);
    const [currentPicker, setCurrentPicker] = useState(null);
    const [error, setError] = useState(null);
    const [SelOpenTime, setSelOpenTime] = useState(null);
    const [SelCloseTime, setSelCloseTime] = useState(null);

    // console.log("Latitude is :", latitude);
    // console.log("Longitude is :", longitude);
    // console.log("Image is :", image);
    // console.log("MaxBudget is :", MaxBudget);
    // console.log("MinBudget is :", MinBudget);

    useEffect(() => {
        if (routeData.from === "EditDate") {
            // console.log("Date Data is :", DateData);
            setBusinessName(DateData.name);
            setCategory(DateData.Category.name);
            setBudget(`$${DateData.minBudget} - $${DateData.maxBudget}`);
            setDescription(DateData.description);
            setImage(DateData.imageUrl);
            setAddress(DateData.address);
            setSelCloseTime(DateData.closeTime);
            setSelOpenTime(DateData.openTime);
            setDateOpenTime(DateData.openTime);
        }
    }, [])

    useEffect(() => {
        // setSelOpenTime(DateData.openTime)
        console.log("Value of open time :", SelOpenTime);
    }, [SelOpenTime])


    const handleBackClick = () => {
        navigation.pop()
    }


    console.log('Selected category is', Category)

    useEffect(() => {
        const GetCategoriesData = async () => {
            const AuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdF9uYW1lIjoiQXJzbGFuIiwibGFzdF9uYW1lIjoiTmFlZW0iLCJlbWFpbCI6ImFyc2xhbkBzb3VsbWF0Y2guY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkZk1kY05WRFdya050QS8zaHF1NHhlZVI5aUNSVGxlQ25QTkFZa3dCOHpydEwyMExPTHUzZVciLCJwcm9maWxlX2ltYWdlIjoiIiwiaW50cm9fdmlkZW8iOiJodHRwczovL3BsdXJhd2wtc3RvcmFnZS5zMy51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS9tZWRpYVByb2ZpbGUxNzE1ODc0OTE2MDk3IiwiaW50cm9fdGh1bWJuYWlsX3VybCI6Imh0dHBzOi8vcGx1cmF3bC1zdG9yYWdlLnMzLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL3RodW1ibWVkaWFQcm9maWxlMTcxNTg3NDkyNzM4MSIsImNvbXBhbnkiOm51bGwsImpvYl90aXRsZSI6bnVsbCwiYWdlIjpudWxsLCJoZWlnaHRfaW5jaGVzIjpudWxsLCJoZWlnaHRfZmVldCI6bnVsbCwiem9kaWFjIjpudWxsLCJzY2hvb2wiOm51bGwsImNpdHkiOm51bGwsInN0YXRlIjpudWxsLCJsYXQiOm51bGwsImxhbmciOm51bGwsImdlbmRlciI6bnVsbCwiZmNtX3Rva2VuIjpudWxsLCJkZXZpY2VfaWQiOiIiLCJwcm92aWRlcl9pZCI6IiIsInByb3ZpZGVyX25hbWUiOiJFbWFpbCIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjpudWxsLCJlbmNfa2V5IjpudWxsLCJlbmNfaXYiOm51bGwsImRvYiI6bnVsbCwicG9pbnRzIjowLCJpbnRlcmVzdGVkX2dlbmRlciI6bnVsbCwiaW50ZXJlc3RlZF9taW5fYWdlIjpudWxsLCJpbnRlcmVzdGVkX21heF9hZ2UiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjQtMDUtMDdUMTk6MDA6MzkuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDUtMTZUMTU6NTU6MzAuMDAwWiJ9LCJpYXQiOjE3MTY4NzMyOTcsImV4cCI6MTc0ODQwOTI5N30.0HygSYQSh2WJbYWajmCB0aizc08lElYZITADVeEBNuw";
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
        GetCategoriesData();
    }, [])

    //alert message
    // console.log("UserBudget is", Budget);

    const BudgetAmount = [
        {
            value: '1',
            lable: '$10 - $20 = $',
        },
        {
            value: '2',
            lable: '$30 - $50 = $$',
        },
        {
            value: '3',
            lable: '$50 - $80 = $$$',
        },

        {
            value: '4',
            lable: '$100 + $100000000 = $$$$',
        }
    ]

    useEffect(() => {
        if (Budget === '$100 + $100000000 = $$$$') {
            setMinBudget('100')
            setMaxBudget('100,000,000')
            // console.log('Budget valus is', MinBudget)
        } else if (Budget === '$50 - $80 = $$$') {
            setMinBudget('50')
            setMaxBudget('80')
        } else if (Budget === '$30 - $50 = $$') {
            setMinBudget('30')
            setMaxBudget('50')
        } else if (Budget === '$10 - $20 = $') {
            setMinBudget('10')
            setMaxBudget('20')
        }
    }, [Budget])

    useEffect(() => {
        // console.log('Value of budget is', MinBudget)
    }, [MinBudget])

    //alert message

    const showAlert = () => {
        if (BusinessName.length === 0 || Category === 'Select category' || Budget === 'Select budget' || Description.length === 0) {
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

    //test code for keyboard
    //tell about prompt savy search bar key working

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
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
    3
    const handleSaveButton = async () => {
        console.warn("Selected open time is ", SelOpenTime);
        // return 
        try {
            setLoading(true);
            const AuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyNSwiZmlyc3RfbmFtZSI6ImFkbWluIiwibGFzdF9uYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQHNvdWxtYXRjaC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRmazNoTEN6MGlObGNNdjd4RVV3U2ouOWZtdms2SFNIRi4wdG5SWS5YWGl0MllTLkhsbUhBQyIsInByb2ZpbGVfaW1hZ2UiOiIiLCJpbnRyb192aWRlbyI6bnVsbCwiaW50cm9fdGh1bWJuYWlsX3VybCI6bnVsbCwiY29tcGFueSI6bnVsbCwiam9iX3RpdGxlIjpudWxsLCJhZ2UiOm51bGwsImhlaWdodF9pbmNoZXMiOm51bGwsImhlaWdodF9mZWV0IjpudWxsLCJ6b2RpYWMiOm51bGwsInNjaG9vbCI6bnVsbCwiY2l0eSI6bnVsbCwic3RhdGUiOm51bGwsImxhdCI6bnVsbCwibGFuZyI6bnVsbCwiZ2VuZGVyIjpudWxsLCJmY21fdG9rZW4iOm51bGwsImRldmljZV9pZCI6IiIsInByb3ZpZGVyX2lkIjoiIiwicHJvdmlkZXJfbmFtZSI6IkVtYWlsIiwicm9sZSI6ImFkbWluIiwic3RhdHVzIjpudWxsLCJlbmNfa2V5IjpudWxsLCJlbmNfaXYiOm51bGwsImRvYiI6bnVsbCwicG9pbnRzIjowLCJpbnRlcmVzdGVkX2dlbmRlciI6bnVsbCwiaW50ZXJlc3RlZF9taW5fYWdlIjpudWxsLCJpbnRlcmVzdGVkX21heF9hZ2UiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjQtMDUtMjhUMDY6NDg6NTEuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDUtMjhUMDY6NTA6MDQuMDAwWiJ9LCJpYXQiOjE3MTY4NzkwNzUsImV4cCI6MTc0ODQxNTA3NX0.WdN1uRySZaxW2BzDJSWt3b97puD51PViXu6fL-sJQIs";
            const ApiUrl = "https://plurawlapp.com/soulmatch/api/admin/dates/add_date_place";
            const formData = new FormData();
            formData.append("categoryId", Category);
            formData.append("minBudget", MinBudget);
            formData.append("maxBudget", MaxBudget);
            formData.append("openTime", SelOpenTime);
            formData.append("closeTime", SelCloseTime);
            //add long address here
            formData.append("address", CityName);
            formData.append("latitude", latitude);
            formData.append("longitude", longitude);
            formData.append("description", Description);
            formData.append("name", BusinessName);
            formData.append("image", {
                name: "imageName",
                uri: image,
                type: 'image/jpeg'
            });
            const response = await fetch(ApiUrl, {
                'method': 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + AuthToken
                },
                body: formData
            });
            console.log("Response of update api is :", response)
            if (response.ok) {
                const Result = await response.json();
                console.log("Response of api is", Result);
                navigation.pop();
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

    const handleSaveClick = () => {
        showAlert(),
            handleSaveButton()
    }

    // console.log('Id recieved is :', DateData.id);

    //test code for getting user location using google addresspicker

    const GOOGLE_PLACES_API_KEY = 'AIzaSyAvhNXgMGSYcFIHLkRmZkDta_U7yWdgQQI';

    // const handlePlaceSelect = async (data, details) => {
    //     try {
    //         const placeDetailsResponse = await fetch(
    //             `https://maps.googleapis.com/maps/api/place/details/json?place_id=${details.place_id}&fields=geometry,address_components&key=${GOOGLE_PLACES_API_KEY}`
    //         );
    //         const placeDetails = await placeDetailsResponse.json();

    //         const geometry = placeDetails.result.geometry;
    //         const addressComponents = placeDetails.result.address_components;

    //         // Extract latitude and longitude
    //         const lat = geometry.location.lat;
    //         const lon = geometry.location.lng;

    //         let city = '';
    //         let state = '';

    //         // Find city and state in address components
    //         addressComponents.forEach(component => {
    //             if (component.types.includes('locality')) {
    //                 city = component.long_name;
    //             }
    //             if (component.types.includes('administrative_area_level_1')) {
    //                 state = component.long_name;
    //             }
    //         });

    //         console.log('Latitude:', lat);
    //         console.log('Longitude:', lon);
    //         console.log('City:', city);
    //         console.log('State:', state);
    //     } catch (error) {
    //         console.error('Error fetching place details:', error);
    //     }
    // };

    //code for listeners
    const [marginTop, setmarginTop] = useState(0);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            // console.log("Keyboard show")
            setmarginTop(-300);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            // console.log("Keyboard hide")
            setmarginTop(0);
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
    }

    const handlePickAddress = () => {
        // console.warn("hello");
        navigation.navigate('AddressPicker', {
            PickAddress: pickAddress
        })
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

    //test code for printing value of close time recieving from async storage


    //test code for updating date place

    const handleUpdate = async () => {

        const data = await AsyncStorage.getItem("USER")
        if (data) {
            let d = JSON.parse(data)
            let AuthToken = d.token


            try {
                console.log('trying to update date')
                const formData = new FormData();
                formData.append("categoryId", Category);
                formData.append("minBudget", MinBudget);
                formData.append("maxBudget", MaxBudget);
                formData.append("openTime", SelOpenTime);
                formData.append("closeTime", SelCloseTime);
                //add long address here
                formData.append("address", CityName);
                formData.append("latitude", latitude);
                formData.append("longitude", longitude);
                formData.append("description", Description);
                formData.append("name", BusinessName);
                formData.append("image", {
                    name: "imageName",
                    uri: image,
                    type: 'image/jpeg'
                });

                const response = await fetch(Apis.UpdateDatePlace, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + AuthToken
                    },
                    body: formData
                })
                if(response){
                    console.log('api called')
                    let json = await response.json()
                    if(json.status === true){
                        console.log('date updated ', json.data)
                    }else{
                        console.log('json message is', json.message)
                    }
                }

            } catch (error) {
                console.error("Error occured is: ", error);
            }
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
        <View style={{ display: 'flex', alignItems: 'center', height: height * 0.95, marginTop: marginTop }}>
            {/*change if the screen is irResponsive height: height s*/}
            <View style={{ width: width - 50 }}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#FFFFFF"
                    translucent={false}
                />
                <View style={{ marginTop: 60, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                        <TouchableOpacity onPress={handleBackClick} style={{ width: 46 / 430 * width }}>
                            <View style={{ height: 46 / 930 * height, width: 46 / 430 * width, borderWidth: 1, borderColor: '#E6E6E6', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
                                <Image source={require('../../../../assets/Images3/backIcon.png')} style={{ height: 12, width: 6, resizeMode: 'contain' }} />
                            </View>
                        </TouchableOpacity>
                        {
                            routeData.from === "AdminDates" ? (
                                <Text style={{ fontWeight: '500', fontSize: 24, fontFamily: customFonts.medium }}>
                                    Add new date
                                </Text>
                            ) : (
                                <Text style={{ fontWeight: '500', fontSize: 24, fontFamily: customFonts.medium }}>
                                    Edit
                                </Text>
                            )
                        }

                    </View>
                    {
                        routeData.from === "AdminDates" ? (
                            <View style={{ justifyContent: 'center' }}>
                                {Loading ?
                                    <View>
                                        <ActivityIndicator size={'small'} color={colors.blueColor} />
                                    </View> :
                                    <TouchableOpacity onPress={handleSaveClick} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontWeight: '500', fontFamily: customFonts.medium, fontSize: 14, color: '#6050DC' }}>
                                            Save
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        ) : (
                            <View style={{ justifyContent: 'center' }}>
                                {Loading ?
                                    <View>
                                        <ActivityIndicator size={'small'} color={colors.blueColor} />
                                    </View> :
                                    <TouchableOpacity onPress={handleUpdate} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontWeight: '500', fontFamily: customFonts.medium, fontSize: 14, color: '#6050DC' }}>
                                            Update
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        )
                    }
                    {/*Loading ?
                        <View>
                            <ActivityIndicator size={'small'} color={colors.blueColor} />
                        </View> :
                        <TouchableOpacity onPress={handleSaveClick} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontFamily: customFonts.medium, fontSize: 14, color: '#6050DC' }}>
                                Save
                            </Text>
                        </TouchableOpacity>
                */}
                </View>

                <View style={{ height: height * 0.83 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={{ fontWeight: '500', fontFamily: customFonts.medium, fontSize: 16, marginTop: 18 }}>
                            Add Image
                        </Text>

                        {image ?
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={{ uri: image }} style={{ width: 148 / 430 * width, height: 148 / 930 * height, resizeMode: 'cover', marginTop: 30 / 930 * height, borderRadius: 100 }} />
                            </View> :
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                <TouchableOpacity onPress={pickImage}>
                                    <Image source={require('../../../../assets/Images3/uploadImage.png')}
                                        style={{ height: 148 / 930 * height, width: 148 / 430 * width, resizeMode: 'contain' }}
                                    />
                                </TouchableOpacity>
                            </View>
                        }

                        <Text style={{ fontWeight: '500', fontFamily: customFonts.medium, fontSize: 16, marginTop: 18 }}>
                            Business
                        </Text>

                        <View style={{ borderWidth: 1, borderColor: '#CCCCCC', borderRadius: 10, padding: 16, justifyContent: 'center', marginTop: 3 }}>
                            <TextInput
                                value={BusinessName}
                                onChangeText={(Business) => setBusinessName(Business)}
                                style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.medium, color: '#999999' }}
                                placeholder='Enter business name'
                            />
                        </View>

                        <Text style={styles.Dropdownlabel}>
                            Categories
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
                            placeholder={Category}
                            searchPlaceholder="Search categories"
                            onChange={item => {
                                setCategory(item.value);
                            }}
                        />

                        <Text style={styles.Dropdownlabel}>
                            Budget
                        </Text>

                        {/* <Text>
                            {
                                MaxBudget ? MaxBudget : <Text>No</Text>
                            }
                        </Text> */}
                        {/*<Budget style={{ marginTop: 15 }} onBudgetChange={handleBudgetChange} />*/}

                        < Dropdown
                            style={styles.dropdown}
                            selectedTextStyle={styles.selectedTextStyle}
                            placeholderStyle={styles.placeholderStyle}
                            //   imageStyle={styles.imageStyle}
                            iconStyle={styles.iconStyle}
                            maxHeight={200}
                            value={Budget}
                            data={BudgetAmount}
                            valueField="value"
                            labelField="lable"
                            //   imageField="image"
                            placeholder={Budget}
                            searchPlaceholder="Select budget"
                            itemTextStyle={{
                                color: '#999999',
                                fontWeight: '500',
                                fontFamily: customFonts.medium,
                                fontSize: 14
                            }
                            }
                            onChange={e => {
                                setBudget(e.lable);
                            }}
                        />

                        <Text style={styles.Dropdownlabel}>
                            Hours of operation
                        </Text>


                        <View>
                            {/* 
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={false}
                                display="default"
                                onChange={onChange}
                            /> */}

                        </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 300 / 430 * width, alignSelf: 'center' }}>
                                    <View style={{ alignItems: 'center', flexDirection: 'column', gap: 10, marginTop: 20 }}>
                                        <Text style={{ fontSize: 16 }}>Open Time</Text>
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date}
                                            mode={mode}
                                            is24Hour={false}
                                            display="default"
                                            onChange={handleOpen}
                                        />
                                    </View>

                                    <View style={{ alignItems: 'center', flexDirection: 'column', gap: 10, marginTop: 20 }}>
                                        <Text style={{ fontSize: 16 }}>Close Time</Text>
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date2}
                                            mode={mode}
                                            is24Hour={false}
                                            display="default"
                                            onChange={handleClose}
                                        />
                                    </View>

                                    {/* <TouchableOpacity onPress={showOpenTimepicker} style={{ width: 177 / 430 * width }}>
                                        <View style={styles.timePicker}>
                                            <Text style={styles.OperationTime}>
                                               
                                                {openTime ? formatTime(openTime) : 'Open'}
                                            </Text>
                                            <Image source={require('../../../../assets/Images3/clock.png')} style={styles.clockIcon} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={showCloseTimepicker} style={{ width: 177 / 430 * width }}>
                                        <View style={styles.timePicker}>
                                            <Text style={styles.OperationTime}>
                                                {SelCloseTime ? formatTime(closeTime) : 'Close'}
                                            </Text>
                                            <Image source={require('../../../../assets/Images3/clock.png')} style={styles.clockIcon} />
                                        </View>
                                    </TouchableOpacity> */}
                                </View>
                          
                        <View>
                            {error && <Text style={styles.ErrorText}>{error}</Text>}
                        </View>

                        <Text style={styles.Dropdownlabel}>
                            Address
                        </Text>

                        <TouchableOpacity onPress={handlePickAddress}>
                            <View style={{ borderRadius: 10, borderColor: '#CCCCCC', padding: 8, borderWidth: 1 }}>
                                <Text style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.medium }}>
                                    {
                                        CityName ?
                                            <Text>
                                                {CityName}, {StateName}
                                            </Text> :
                                            <Text>
                                                Enter Address
                                            </Text>
                                    }
                                </Text>
                                {/*<TextInput
                                    value={Address}
                                    onChangeText={(Address) => setAddress(Address)}
                                    placeholder='Enter Address'
                            style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.medium }} />*/}
                                {/*<GooglePlacesAutocomplete
                                    placeholder="Address"
                                    query={{
                                        key: GOOGLE_PLACES_API_KEY,
                                        language: 'en', // language of the results
                                    }}
                                    onPress={handlePlaceSelect}
                                    onFail={(error) => console.error(error)}
                                    enablePoweredByContainer={false}
                                    scrollEnabled={false}
                                // requestUrl={{
                                //   url:
                                //     'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                                //   useOnPlatform: 'web',
                                // }} // this in only required for use on the web. See https://git.io/JflFv more for details.
                                />*/}
                            </View>
                        </TouchableOpacity>

                        <Text style={styles.Dropdownlabel}>
                            Description
                        </Text>
                        <View style={{ borderRadius: 10, borderColor: '#CCCCCC', padding: 8, borderWidth: 1 }}>
                            <TextInput
                                value={Description}
                                onChangeText={(Description) => setDescription(Description)}
                                multiline
                                placeholder='Enter description'
                                textAlignVertical='top'
                                style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.medium, height: 100 / 930 * height, }} />
                        </View>
                    </ScrollView>
                </View>

            </View>

        </View>
    )
}

export default AddDate;


//styles for dropdown
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    dropdown: {
        padding: 8,
        width: width - 50,
        borderRadius: 5,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#E6E6E6',
    },
    placeholderStyle: {
        fontSize: 14,
        color: '#999999',
        fontWeight: '500',
        fontFamily: customFonts.medium
    },
    selectedTextStyle: {
        fontSize: 14,
        color: '#999999',
        fontWeight: '500',
        fontFamily: customFonts.medium
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
        fontFamily: customFonts.medium,
        fontSize: 16,
        color: '#333333',
        marginTop: 20 / 930 * height
    },
    OperationTime: {
        color: '#999999',
        fontWeight: '500',
        fontSize: 14,
        fontFamily: customFonts.medium
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
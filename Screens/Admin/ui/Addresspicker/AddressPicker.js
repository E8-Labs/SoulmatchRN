import * as React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GOOGLE_PLACES_API_KEY = 'AIzaSyAvhNXgMGSYcFIHLkRmZkDta_U7yWdgQQI'; // never save your real api key in a snack!

const AddressPicker = ({ navigation }) => {
    // const handlePlaceSelect = async (data, details) => {
    //     try {
    //         const placeDetailsResponse = await fetch(
    //             `https://maps.googleapis.com/maps/api/place/details/json?place_id=${details.place_id}&fields=geometry&key=${GOOGLE_PLACES_API_KEY}`
    //         );
    //         const placeDetails = await placeDetailsResponse.json();
    //         const { lat, lng } = placeDetails.result.geometry.location;
    //         console.log('Latitude:', lat);
    //         console.log('Longitude:', lng);

    //         //test code

    //         // const placeDetailsResponse = await fetch(
    //         //     `https://maps.googleapis.com/maps/api/place/details/json?place_id=${details.place_id}&fields=address_components&key=${GOOGLE_PLACES_API_KEY}`
    //         // );
    //         // const placeDetails = await placeDetailsResponse.json();

    //         // const addressComponents = placeDetails.result.address_components;
    //         // let city = '';
    //         // let state = '';

    //         // // Extract city and state from address components
    //         // addressComponents.forEach((component) => {
    //         //     if (component.types.includes('locality')) {
    //         //         city = component.long_name;
    //         //     } else if (component.types.includes('administrative_area_level_1')) {
    //         //         state = component.long_name;
    //         //     }
    //         // });

    //         // console.log('City:', city);
    //         // console.log('State:', state);

    //     } catch (error) {
    //         console.error('Error fetching place details:', error);
    //     }
    // };

    // const handlePlaceSelect = async (data, details) => {
    //     try {
    //         const placeDetailsResponse = await fetch(
    //             `https://maps.googleapis.com/maps/api/place/details/json?place_id=${details.place_id}&fields=address_components&key=${GOOGLE_PLACES_API_KEY}`
    //         );
    //         const placeDetails = await placeDetailsResponse.json();


    //         const addressComponents = placeDetails.result.address_components;
    //         let city = '';
    //         let state = '';

    //         // Extract city and state from address components
    //         addressComponents.forEach((component) => {
    //             if (component.types.includes('locality')) {
    //                 city = component.long_name;
    //             } else if (component.types.includes('administrative_area_level_1')) {
    //                 state = component.long_name;
    //             }
    //         });

    //         console.log('City:', city);
    //         console.log('State:', state);
    //     } catch (error) {
    //         console.error('Error fetching place details:', error);
    //     }
    // };

    const [CityName, setCityName] = useState('');
    const [StateName, setStateName] = useState('');
    const [Latitude, setLatitude] = useState('');
    const [Longitude, setLongitude] = useState('');

    const handlePlaceSelect = async (data, details) => {
        try {
            const placeDetailsResponse = await fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${details.place_id}&fields=geometry,address_components&key=${GOOGLE_PLACES_API_KEY}`
            );
            const placeDetails = await placeDetailsResponse.json();

            const geometry = placeDetails.result.geometry;
            const addressComponents = placeDetails.result.address_components;

            // Extract latitude and longitude
            const lat = geometry.location.lat;
            const lon = geometry.location.lng;
            setLatitude(lat);
            setLongitude(lon);

            let city = '';
            let state = '';

            // Find city and state in address components
            addressComponents.forEach(component => {
                if (component.types.includes('locality')) {
                    city = component.long_name;
                    setCityName(city);
                }
                if (component.types.includes('administrative_area_level_1')) {
                    state = component.long_name;
                    setStateName(state);
                }
            });

            AsyncStorage.setItem("userLocation", JSON.stringify({cityName: city, stateName: state, latitude: lat, longitude: lon}))
            console.log('Latitude:', lat);
            console.log('Longitude:', lon);
            console.log('City:', city);
            console.log('State:', state);
            // console.warn('Values are selected');
            navigation.pop()
        } catch (error) {
            console.error('Error fetching place details:', error);
        }
    };


    // useEffect(() => {
    //     const storeData = async (cityName) => {
    //         console.log(`Saving location`, cityName)
    //         try {
    //             await AsyncStorage.setItem('cityName', JSON.stringify(cityName));
    //         } catch (e) {
    //             // saving error
    //             console.error(e);
    //         }
    //     };

    //     if (CityName) {
    //         const data = {
    //             cityName: CityName,
    //             stateName: StateName,
    //             latitude: Latitude,
    //             longitude: Longitude
    //         }
    //         storeData(data); // Pass CityName to the storeData function
    //     } else {
    //         console.log("CityName is null");
    //     }
    // }, [CityName]);

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder="Search"
                query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: 'en', // language of the results
                }}
                onPress={handlePlaceSelect}
                onFail={(error) => console.error(error)}
                enablePoweredByContainer={false}
            // requestUrl={{
            //   url:
            //     'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
            //   useOnPlatform: 'web',
            // }} // this in only required for use on the web. See https://git.io/JflFv more for details.
            />
            {/*<View>
                <TouchableOpacity onPress={handleClick}>
                    <Text>
                        Click me
                    </Text>
                </TouchableOpacity>
            </View>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: Constants.statusBarHeight + 10,
        backgroundColor: '#ecf0f1',
    },
});

export default AddressPicker;
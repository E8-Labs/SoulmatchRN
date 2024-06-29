import * as React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyles from '../../../../assets/styles/GlobalStyles';

const GOOGLE_PLACES_API_KEY = 'AIzaSyAvhNXgMGSYcFIHLkRmZkDta_U7yWdgQQI'; // never save your real api key in a snack!

const AddressPicker = ({ backButtonPressed, PickAddress }) => {
    

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
            console.log('Place details are :', JSON.stringify(placeDetails));
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



            let address = {
                lat: lat,
                lang: lon,
                city: city,
                state: state
            }
            // console.warn('Values are selected');
            PickAddress(address)
            // navigation.pop()
        } catch (error) {
            console.error('Error fetching place details:', error);
        }
    };


    

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={()=>{
                    backButtonPressed()
                    // navigation.goBack()
                }}
            >
                <View style = {[GlobalStyles.backBtn,{marginBottom:30}]}>
                    
                    <Image source={require('../../../../assets/images/backArrow.png')} 
                        style = {GlobalStyles.backBtnImage}
                    />
                </View>
            </TouchableOpacity>
            <GooglePlacesAutocomplete
                placeholder="Search"
                query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: 'en', // language of the results
                }}
                onPress={handlePlaceSelect}
                onFail={(error) => console.error(error)}
                enablePoweredByContainer={false}
           
            />
            
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
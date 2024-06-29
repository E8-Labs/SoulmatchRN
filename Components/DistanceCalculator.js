import react,{useState,useEffect} from "react";
import {View,Text, Dimensions} from "react-native";
import { getDistance } from 'geolib';
import {customFonts} from '../assets/fonts/Fonts'

import AsyncStorage from "@react-native-async-storage/async-storage";

const {height,width} = Dimensions.get('window')



const DistanceCalculator = ({ userId, lat, lang }) => {
    const [distance, setDistance] = useState(null);
    

    const calculateDistance =  async() => {
        // return 0
        const userdata = await AsyncStorage.getItem("USER")

        if (userdata) {
            let d = JSON.parse(userdata)

            // setLocalUser(d)
            let localLat = d.user.lat
            let localLong = d.user.lang
            // let lat = data[currentIndex] ? data[currentIndex].lat : ''
            // let lang = data[currentIndex] ? data[currentIndex].lang : ''
            let location = { myLat: localLat, myLang: localLong, otherLat: lat, otherLang: lang }
            console.log('user data fro local is', location)
            // return
            let distance = 0
            if (localLong !== null && localLat !== null && lat !== null && lang !== null) {
                distance = getDistance(
                    { latitude: localLat, longitude: localLong },
                    { latitude: lat, longitude: lang }
                );
                console.log('total distance is', distance)
                const distanceInMiles = distance / 1000 * 0.621371.toFixed(2);
                return parseInt(distanceInMiles)
            }
            else{
                return distance
            }
            // console.log('distance found ', )

        }
    }

    useEffect(() => {
        const fetchDistance = async () => {
            const result = await calculateDistance(userId);
            setDistance(result);
        }
        fetchDistance();
    }, [userId, lat, lang]); // Dependency array includes userId to recalculate if it changes

    return (
        <Text style = {{ fontSize: 16,
            // fontFamily: customFonts.meduim,
            textAlign: 'left',
            width: 334 / 430 * width
        }}>{distance !== null ? `${distance} miles` : 'Calculating...'}</Text>
    );
} 
export default DistanceCalculator

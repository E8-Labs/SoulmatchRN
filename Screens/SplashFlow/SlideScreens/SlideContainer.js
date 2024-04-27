import React, { useRef, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import GlobalStyles from '../../../assets/styles/GlobalStyles'
import colors from '../../../assets/colors/Colors'
import RegisterUser from "../../LoginFlow/RegisterUser";

const { height, width } = Dimensions.get('window');
const dot1 = require('../../../assets/images/dot1.png');
const dot2 = require('../../../assets/images/dot2.png');
const dot3 = require('../../../assets/images/dot3.png');
const dot4 = require('../../../assets/images/dot4.png');

const SlideContainer = (props) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrolRef = useRef(null);


    useEffect(()=>{
        // console.log("Current index is ", currentIndex)
        scrolRef.current.scrollTo({ x: (currentIndex) * width, animated: true });
    }, [currentIndex])

    const slideImages = [
        {
            id: 1,
            image: require("../../../assets/images/splashImage1.png"),
            mainText: 'Welcome to SoulMatch!',
            subText: "Where meaningful connections begin and thrive."
        },
        {
            id: 2,
            image: require("../../../assets/images/splashImage2.png"),
            mainText: 'Discover your soulmate',
            subText: "Browse profiles tailored to your preferences and find your perfect match."
        },
        {
            id: 3,
            image: require("../../../assets/images/splashImage3.png"),
            mainText: 'Local date ideas',
            subText: "Unique local businesses for your dates, supporting your community while nurturing your relationship"
        },
        {
            id: 4,
            image: require("../../../assets/images/splashImage4.png"),
            mainText: 'Strengthen your bond',
            subText: "Experience activities and workshops curated to help you grow closer"
        },


    ]

    const getItemlayout = (index) => ({
        length: width,
        offset: width * index,
        index: index
    })

    const handleNext = () => {
        if (currentIndex < 3) {
            // scrolRef.current.scrollTo({ x: (currentIndex + 1) * width, animated: true });
            setCurrentIndex(currentIndex + 1);
        } else{
            props.navigation.navigate("RegisterUser")
        }

    }

    const handleBack = () => {
        if (currentIndex <= 3) {
            // scrolRef.current.scrollTo({ x: (currentIndex - 1) * width, animated: true });
            setCurrentIndex(currentIndex - 1);
        }

    }

    const showDot = () => {
        if (currentIndex === 0) {
            return dot1
        } else if (currentIndex === 1) {
            return dot2
        } else if (currentIndex === 2) {
            return dot3
        } else if (currentIndex === 3) {
            return dot4
        }
    }

    return (
        <View style={GlobalStyles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - 40, marginTop: 50 / 924 * height }}>
                {currentIndex > 0 ? (
                    <TouchableOpacity onPress={handleBack}>
                        <View style={GlobalStyles.backBtn}>
                            <Image source={require("../../../assets/images/backArrow.png")}
                                style={GlobalStyles.backBtnImage}
                            />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View style={{height:46/930*height,width:46/930*height}}></View>
                )
                }
                <TouchableOpacity style={{ alignSelf: 'flex-end' }}
                    onPress={() => {
                        props.navigation.navigate("RegisterUser")
                    }}
                >
                    <Text style={GlobalStyles.skipText}>
                        Skip
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{height:'70%'}}>
                <ScrollView
                    
                    ref={scrolRef}
                    horizontal
                    pagingEnabled
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    getItemlayout={getItemlayout}
                    onScroll={(event) => {
                        const { x } = event.nativeEvent.contentOffset;
                        // setCurrentIndex(Math.round(x / width));
                    }}
                >
                    {
                        slideImages.map((item, index) => (
                            <View key={item.id} style={{ alignItems: 'center', width: width }}>
                                <Image source={item.image}
                                    style={{ height: 413 / 930 * height, width: width, resizeMode: 'contain', marginTop: 43 / 930 * height }}
                                />
                                <View style={{ width: width - 45, alignItems: 'center', marginTop: 43 / 930 * height }}>
                                    <Text style={[GlobalStyles.splashBoldText]}>{item.mainText}</Text>
                                    <Text style={[GlobalStyles.splashMeduimText, { textAlign: 'center'}]}>{item.subText}</Text>
                                </View>
                            </View>

                        ))
                    }
                </ScrollView>
            </View>

            <View style={{ marginBottom: 20, alignItems: 'center' }}>
                <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { borderRadius: 10, }]}
                    onPress={handleNext}
                >
                    <Text style={GlobalStyles.btnText}>
                        {currentIndex < 3 ? "Next" : "Find Your SoulMatch"}
                    </Text>
                </TouchableOpacity>
                <Image source={showDot()}
                    style={{ height: 10 / 930 * height, width: 90 / 430 * width, resizeMode: 'contain', marginTop: 50 }}
                />
            </View>

        </View>
    )
}

export default SlideContainer


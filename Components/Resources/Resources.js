import React, { useState } from 'react';
import { FlatList, SafeAreaView, TextInput } from 'react-native';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import customFonts from '../../assets/fonts/Fonts';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import { Image } from 'expo-image';

const Resources = ({ navigation }) => {

    const { height, width } = Dimensions.get('window')

    //functions states

    const [Resources, setResources] = useState(true);
    const [Tips, setTips] = useState(false);
    const [Services, setServices] = useState(false);


    //functions
    const handleResourcesClick = () => {
        setResources(true);
        setTips(false);
        setServices(false);
    }

    const handleTipsClick = () => {
        setTips(true);
        setResources(false);
        setServices(false);
    }

    const handleServicesClick = () => {
        setServices(true);
        setTips(false);
        setResources(false);
    }

    const handleClick = () => {
        navigation.navigate('SelectedResourceDetails');
        // console.warn('Good you may continue')
    }

    //code for FlatList

    const array = [
        {
            id: 1,
            image: require('../../assets/Images2/ResourcesImg1.png'),
            title: 'Relationship advice articles and videos',
            description: 'Expert insights and tips to navigate the complexities of relationships.',
            date: 'Jan 12 . 4 min read'
        },

        {
            id: 2,
            image: require('../../assets/Images2/ResourcesImg1.png'),
            title: 'Links to counseling and therapy services',
            description: 'Offering links to professional counseling and therapy services.',
            date: 'Jan 12 . 4 min read'
        },
        {
            id: 3,
            image: require('../../assets/Images2/ResourcesImg1.png'),
            title: 'Relationship health check quizzes or tools',
            description: 'Explore interactive quizzes and tools to enhance your relationships.',
            date: 'Jan 12 . 4 min read'
        },
        {
            id: 4,
            image: require('../../assets/Images2/ResourcesImg1.png'),
            title: 'Integration with local event ticketing services for date night ideas',
            description: 'Elevate your date nights with seamless integration to local event ticketing services.',
            date: 'Jan 12 . 4 min read'
        },
        {
            id: 5,
            image: require('../../assets/Images2/ResourcesImg1.png'),
            title: 'Integration with local event ticketing services for date night ideas',
            description: 'Elevate your date nights with seamless integration to local event ticketing services.',
            date: 'Jan 12 . 4 min read'
        },
        {
            id: 6,
            image: require('../../assets/Images2/ResourcesImg1.png'),
            title: 'Integration with local event ticketing services for date night ideas',
            description: 'Elevate your date nights with seamless integration to local event ticketing services.',
            date: 'Jan 12 . 4 min read'
        },
        {
            id: 7,
            image: require('../../assets/Images2/ResourcesImg1.png'),
            title: 'Integration with local event ticketing services for date night ideas',
            description: 'Elevate your date nights with seamless integration to local event ticketing services.',
            date: 'Jan 12 . 4 min read'
        }
    ]
    return (
        <SafeAreaView style={{ height: height, width: width,backgroundColor:'white' }}>
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '110%', backgroundColor: 'white' }}>
                <View style={{ width: 370 / 430 * width, height:height }}>
                    <View style={{ flexDirection: 'row', display: 'flex', gap: 20, marginTop: 0, alignItems: 'center' }}>
                        <TouchableOpacity onPress={()=>{
                            navigation.goBack()
                        }}>
                            <View style={{ height: 50 / 930 * height, width: 50 / 430 * width, borderWidth: 2, borderColor: '#E6E6E6', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../../assets/Images2/Backicon.png')} style={{ height: 15 / 930 * height, width: 7 / 430 * width }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: '500', fontSize: 24, fontFamily: customFonts.meduim }}>
                            Resources
                        </Text>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <View style={{ flexDirection: 'row', padding: 17, borderRadius: 10, backgroundColor: '#f5f5f5' }}>
                            <Image source={require('../../assets/Images2/SearchIcon.png')}
                                style={{
                                    height: 25 / 930 * height,
                                    width: 25 / 430 * width,
                                    resizeMode: 'contain',
                                    marginRight: 4,
                                }} />
                            <TextInput placeholder='Enter search' style={{ height: 20, width: 305 / 430 * width, marginLeft: 2 }} />
                        </View>
                    </View>

                    <View style={{ marginTop: 25 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                onPress={handleResourcesClick}
                                style={{
                                    height: 35 / 930 * height,
                                    width: 118 / 430 * width,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 5,
                                    backgroundColor: Resources ? '#6050DC' : '#F5F5F5'
                                }}>
                                <Text style={{ fontWeight: '500', fontSize: 16, color: Resources ? 'white' : '#000000' }}>
                                    Resources
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleTipsClick}
                                style={{
                                    height: 35 / 930 * height,
                                    width: 118 / 430 * width,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 5,
                                    backgroundColor: Tips ? '#6050DC' : '#F5F5F5'
                                }}>
                                <Text style={{ fontWeight: '500', fontSize: 16, color: Tips ? 'white' : '#000000' }}>
                                    Tips
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleServicesClick}
                                style={{
                                    height: 35 / 930 * height,
                                    width: 118 / 430 * width,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 5,
                                    backgroundColor: Services ? '#6050DC' : '#F5F5F5'
                                }}>
                                <Text style={{ fontWeight: '500', fontSize: 16, color: Services ? 'white' : '#000000' }}>
                                    Services
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    {
                        Resources && (
                            <View style={{ marginTop: 40 ,height:height*0.63}}>
                                <FlatList
                                showsVerticalScrollIndicator = {false}
                                    data={array}
                                    renderItem={({ item }) => (
                                        <View style={{marginTop: 15}}>
                                            <TouchableOpacity onPress={handleClick}>
                                                <View style={{ borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 10, padding: 14, flexDirection: 'row', display: 'flex', gap: 13, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Image source={item.image} style={{ height: 110 / 930 * height, width: 110 / 430 * width }} />
                                                    <View style={{ width: 214 / 430 * width, gap: 5 }}>
                                                        <Text style={{ fontWeight: '500', fontSize: 14 }}>
                                                            {item.title}
                                                        </Text>
                                                        <Text style={{ fontWeight: '400', fontSize: 12, color: '#666666' }}>
                                                            {item.description}
                                                        </Text>
                                                        <Text style={{ fontWeight: '400', fontSize: 13 }}>
                                                            {item.date}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
                        )
                    }

                    {
                        Tips && (
                            <View>
                                <Text>
                                    Tips are given here
                                </Text>
                            </View>
                        )
                    }

                    {
                        Services && (
                            <View>
                                <Text>
                                    Servies we provide
                                </Text>
                            </View>
                        )
                    }


                </View>
            </View>
        </SafeAreaView>
    )
}

export default Resources

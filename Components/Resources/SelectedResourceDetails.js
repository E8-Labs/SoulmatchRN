import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, SafeAreaView, TouchableOpacity, FlatList, TextInput, Keyboard } from 'react-native';
import customFonts from '../../assets/fonts/Fonts';
import { Image } from 'expo-image';

const SelectedResourceDetails = ({ navigation }) => {
    const { height, width } = Dimensions.get('window')

    const handleBack = () => {
        navigation.pop();
    }

    const DATA = [
        {
            id: 1,
            image: require('../../assets/Images2/ResourcesImg1.png'),
            profile_image: require('../../assets/Images2/ResourcesImg1.png'),
            profile_name: 'Dr. Emily Richardson',
            profile_createDate: 'Jan 12 . 4 min read',
            profile_title: 'The Art of Listening in Relationships',
            profile_description: "In any healthy relationship, the ability to listen is a cornerstone of effective communication.Listening is not simply waiting for your turn to speak;it's about being fully present and genuinely understanding your partner's thoughts and feelings.Here are three key strategies to enhance your listening skills within your relationship",
            profile_Subtitle: 'Practice Active Listening',
            profile_Subdescription: "Engage with your partner's words by maintaining eye contact,nodding in acknowledgement, and providing verbal affirmations.This not only demonstrates your attentiveness but also encourages open dialogue.",
            comments: 'Comments(3)',
            comment_ProfileImg: require('../../assets/Images2/ResourcesImg2.png'),
            comment_Username: 'David Nick',
            User_comment: 'Reading this article was an eye-opener for me. I realized I need to work on my listening skills to truly connect with my partner. Thank you for these valuable insights!'
        },
        // {
        //     id: 2,
        //     image: require('../../assets/Images2/ResourcesImg1.png'),
        //     profile_image: require('../../assets/Images2/ResourcesImg1.png'),
        //     profile_name: 'Dr. Emily Richardson',
        //     profile_createDate: 'Jan 12 . 4 min read',
        //     profile_title: 'The Art of Listening in Relationships',
        //     profile_description: "In any healthy relationship, the ability to listen is a cornerstone of effective communication.Listening is not simply waiting for your turn to speak;it's about being fully present and genuinely understanding your partner's thoughts and feelings.Here are three key strategies to enhance your listening skills within your relationship",
        //     profile_Subtitle: 'Practice Active Listening',
        //     profile_Subdescription: "Engage with your partner's words by maintaining eye contact,nodding in acknowledgement, and providing verbal affirmations.This not only demonstrates your attentiveness but also encourages open dialogue."
        // },
        // {
        //     id: 2,
        //     image: require('../../assets/Images2/ResourcesImg1.png'),
        //     name: 'Anas',
        //     father_name: 'Lateef'
        // },
        // {
        //     id: 3,
        //     image: require('../../assets/Images2/ResourcesImg1.png'),
        //     name: 'Arslan',
        //     father_name: 'Naeem'
        // },
        // {
        //     id: 4,
        //     image: require('../../assets/Images2/ResourcesImg1.png'),
        //     name: 'Arslan',
        //     father_name: 'Naeem'
        // },
        // {
        //     id: 5,
        //     image: require('../../assets/Images2/ResourcesImg1.png'),
        //     name: 'Arslan',
        //     father_name: 'Naeem'
        // },
        // {
        //     id: 6,
        //     image: require('../../assets/Images2/ResourcesImg1.png'),
        //     name: 'Arslan',
        //     father_name: 'Naeem'
        // }
    ]

    //test code for keyboard listeners

    const [keyboardHide, setkeyboardHide] = useState(0);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                setkeyboardHide(-e.endCoordinates.height);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setkeyboardHide(0);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <SafeAreaView style={{ height: height, width: width }}>
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderWidth: 3, height: '110%', backgroundColor: 'white' }}>
                <View style={{ width: 370 / 430 * width, height: 900 / 930 * height, }}>

                    <View style={{ flexDirection: 'row', display: 'flex', gap: 20, marginTop: 20, alignItems: 'center' }}>
                        <TouchableOpacity onPress={handleBack}>
                            <View style={{ height: 50 / 930 * height, width: 50 / 430 * width, borderWidth: 2, borderColor: '#E6E6E6', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../../assets/Images2/Backicon.png')} style={{ height: 15 / 930 * height, width: 7 / 430 * width }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: '500', fontSize: 22, fontFamily: customFonts.meduim }}>
                            The Art of Listening....
                        </Text>
                    </View>

                    {/*Code for Flatlist style={{ height: 150 }}*/}

                    <View>
                        <FlatList style={{ marginTop: 20, height: 700 / 930 * height }}
                            data={DATA}
                            renderItem={({ item }) => (
                                <View>

                                    <Image source={item.image} style={{ width: 370 / 430 * width, height: 277 / 930 * height, borderRadius: 10 }} />
                                    <View style={{ flexDirection: 'row', marginTop: 20, gap: 10 }}>
                                        <Image source={item.profile_image} style={{ height: 50, width: 50, borderRadius: 50 }} />
                                        <View>
                                            <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.meduim }}>
                                                {item.profile_name}
                                            </Text>
                                            <Text style={{ fontWeight: '400', fontSize: 12, fontFamily: customFonts.regular }}>
                                                {item.profile_createDate}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={{ fontWeight: '500', fontSize: 24, fontFamily: customFonts.meduim, marginTop: 30 }}>
                                        {item.profile_title}
                                    </Text>
                                    <Text style={{ fontWeight: '400', fontSize: 14, fontFamily: customFonts.regular, color: '#666666' }}>
                                        {item.profile_description}
                                    </Text>
                                    <Text style={{ fontWeight: '500', fontSize: 18, fontFamily: customFonts.meduim }}>
                                        {item.profile_Subtitle}
                                    </Text>
                                    <Text style={{ fontWeight: '400', fontSize: 14, fontFamily: customFonts.regular, color: '#666666' }}>
                                        {item.profile_Subdescription}
                                    </Text>
                                    <Text style={{ fontWeight: '500', fontSize: 18, fontFamily: customFonts.meduim }}>
                                        {item.comments}
                                    </Text>
                                    <View style={{ padding: 16, borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 10, flexDirection: 'column', gap: 15, marginTop: 20 }}>
                                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                            <Image source={item.comment_ProfileImg} style={{ height: 46, width: 46, borderRadius: 50 }} />
                                            <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.meduim, color: '#333333' }}>
                                                {item.comment_Username}
                                            </Text>
                                        </View>
                                        <Text style={{ fontWeight: '400', fontSize: 14, fontFamily: customFonts.regular, color: '#333333' }}>
                                            {item.User_comment}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: keyboardHide }}>
                            <TextInput placeholder='Leave comment...' style={{ padding: 15, fontWeight: '500', fontSize: 15, fontFamily: customFonts.meduim, color: '#99999990', backgroundColor: '#F5F5F5', borderRadius: 10, width: 310 / 430 * width }} />
                            <TouchableOpacity>
                                <View style={{ height: 52, width: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: '#D5D0F6', borderRadius: 50 }}>
                                    <Image source={require('../../assets/Images2/sendmessage.png')} style={{ height: 18, width: 17 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default SelectedResourceDetails

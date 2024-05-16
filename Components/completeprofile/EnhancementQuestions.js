import React, { useState } from 'react'
import { Dimensions, View, TouchableOpacity, Text, Image, FlatList, Modal, TextInput, Touchable } from 'react-native'
import AddEnhancementAnswer from './AddEnhancementAnswer';


const EnhancementQuestions = ({ navigation }) => {
    const { height, width } = Dimensions.get('window');
    const [packages, setPackages] = useState([]);

    const DATA = [
        {
            id: 1,
            question: "Travel Dreaming",
            answer_raeson: "If you could visit any country in the world, where would you go and why?",
            text_img: require('../../assets/text.png'),
            upload_img: require('../../assets/uploadicon.png'),
            upload_video: require('../../assets/videoicon2.png'),
            radioInactive: require('../../assets/RadioInactive.png'),
            radioActive: require('../../assets/RadioActive.png')
        },
        {
            id: 2,
            question: "Culinary Adventures: ",
            answer_raeson: "What's a dish you love but have never been able to cook yourself?",
            text_img: require('../../assets/text.png'),
            upload_img: require('../../assets/uploadicon.png'),
            upload_video: require('../../assets/videoicon2.png'),
            radioInactive: require('../../assets/RadioInactive.png'),
            radioActive: require('../../assets/RadioActive.png')
        },
        {
            id: 3,
            question: "Time Traveler",
            answer_raeson: "If you could dine with any historical figure, who would it be and what would you ask them?",
            text_img: require('../../assets/text.png'),
            upload_img: require('../../assets/uploadicon.png'),
            upload_video: require('../../assets/videoicon2.png'),
            radioInactive: require('../../assets/RadioInactive.png'),
            radioActive: require('../../assets/RadioActive.png')
        },
        {
            id: 4,
            question: "Bookworm's Delight",
            answer_reason: "What's the last book you read and would you recommend it?",
            text_img: require('../../assets/text.png'),
            upload_img: require('../../assets/uploadicon.png'),
            upload_video: require('../../assets/videoicon2.png'),
            radioInactive: require('../../assets/RadioInactive.png'),
            radioActive: require('../../assets/RadioActive.png')
        },
        {
            id: 5,
            question: "Movie Marathon",
            answer_reason: "Which three movies would you bring to a desert island?",
            text_img: require('../../assets/text.png'),
            upload_img: require('../../assets/uploadicon.png'),
            upload_video: require('../../assets/videoicon2.png'),
            radioInactive: require('../../assets/RadioInactive.png'),
            radioActive: require('../../assets/RadioActive.png')
        },
        {
            id: 6,
            question: "Soundtrack of Life",
            answer_raeson: "What song best describes your life right now?",
            text_img: require('../../assets/text.png'),
            upload_img: require('../../assets/uploadicon.png'),
            upload_video: require('../../assets/videoicon2.png'),
            radioInactive: require('../../assets/RadioInactive.png'),
            radioActive: require('../../assets/RadioActive.png')
        },
        {
            id: 7,
            question: "Hidden Talents",
            answer_raeson: "Do you have a quirky skill or talent that not many people know about?",
            text_img: require('../../assets/text.png'),
            upload_img: require('../../assets/uploadicon.png'),
            upload_video: require('../../assets/videoicon2.png'),
            radioInactive: require('../../assets/RadioInactive.png'),
            radioActive: require('../../assets/RadioActive.png')
        },
        {
            id: 8,
            question: "Childhood Memories",
            answer_raeson: "What's a favorite game or toy you loved as a child?",
            text_img: require('../../assets/text.png'),
            upload_img: require('../../assets/uploadicon.png'),
            upload_video: require('../../assets/videoicon2.png'),
            radioInactive: require('../../assets/RadioInactive.png'),
            radioActive: require('../../assets/RadioActive.png')
        },
        {
            id: 9,
            question: "Dream Dinner Party",
            answer_raeson: "",
            text_img: require('../../assets/text.png'),
            upload_img: require('../../assets/uploadicon.png'),
            upload_video: require('../../assets/videoicon2.png'),
            radioInactive: require('../../assets/RadioInactive.png'),
            radioActive: require('../../assets/RadioActive.png')
        }
    ]

    const [CheckBox, setCheckBox] = useState([]);

    const handleCheckboxclick = (itemId) => {
        // Toggle the selection state for the clicked item
        if (CheckBox.includes(itemId)) {
            setCheckBox(CheckBox.filter(id => id !== itemId));
        } else {
            setCheckBox([...CheckBox, itemId]);
        }
    };

    //Code for modal

    const [OpenModal, setOpenModal] = useState(false);

    const openModalclick = () => {
        setOpenModal(true)
    }

    const closeModal = () => {
        setOpenModal(false)
    }


    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: 370 / 430 * width }}>
                <View style={{ marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../../assets/Backbutton.png')} style={{ resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '500', fontSize: 24, marginLeft: 20 / 430 * width }}>
                        Complete your profile
                    </Text>
                </View>
                {/* Code for progressbar */}
                <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <Image source={require('../../assets/questionmark.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                </View>
                <View style={{ marginTop: 40 / 930 * height }}>
                    <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'flex-end', width: 370 / 430 * width }}>
                        <Text style={{ fontWeight: '500', fontSize: 19 }}>
                            Profile Enhancement Questions
                        </Text>
                        <Text style={{ fontWeight: '500', fontSize: 11, color: '#999999', paddingBottom: 3 / 930 * height, marginLeft: 4 / 430 * width }}>
                            (Optional)
                        </Text>
                    </View>
                    <Text style={{ fontWeight: '500', fontSize: 14, color: '#666666', paddingBottom: 3 / 930 * height, marginTop: 20 / 930 * height }}>
                        Select up to 3 max
                    </Text>
                </View>

                <View>

                    {/* Flat list code goes here */}

                    <FlatList style={{ height: 540 / 930 * height }}
                        data={DATA}
                        renderItem={({ item, index }) => (
                            <View style={{ width: 370 / 430 * width, borderWidth: 1, borderColor: '#E6E6E6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30 / 930 * height, borderRadius: 10, padding: 12 }}>
                                <View style={{ height: 105 / 930 * height, width: 345 / 430 * width, marginBottom: 9 / 930 * height }}>
                                    <TouchableOpacity onPress={() => handleCheckboxclick(item.id)} style={{ height: 24 / 930 * height, width: 24 / 430 * width, marginTop: 5 }}>
                                        <View>
                                            <Image source={CheckBox.includes(item.id) ? item.radioActive : item.radioInactive} style={{ height: 24 / 930 * height, width: 24 / 430 * width }} />
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={{ fontWeight: '500', fontSize: 16, marginTop: 10 / 930 * height }}>
                                        {item.question}
                                    </Text>
                                    <Text style={{ fontWeight: '500', fontSize: 12, color: '#4D4D4D' }}>
                                        {item.answer_raeson}
                                    </Text>
                                </View>
                                <View style={{ height: 38 / 930 * height, width: 345 / 430 * width, marginTop: 8, display: 'flex', alignItems: 'flex-end' }}>
                                    <View style={{ width: 130 / 430 * width, flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>
                                        <TouchableOpacity style={{ width: 36 / 430 * width }} onPress={openModalclick}>
                                            <Image source={require('../../assets/text.png')} style={{ height: 36 / 930 * height, width: 36 / 430 * width, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ width: 36 / 430 * width }}>
                                            <Image source={require('../../assets/newupload.png')} style={{ height: 36 / 930 * height, width: 36 / 430 * width, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ width: 36 / 430 * width }}>
                                            <Image source={require('../../assets/videoicon2.png')} style={{ height: 36 / 930 * height, width: 36 / 430 * width, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />

                    <View style={{ marginTop: 15 / 930 * height }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('AddLocation');
                            }}
                            style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* code for modal */}

                <View>
                    <AddEnhancementAnswer closeModal={closeModal} openModal={OpenModal} />
                </View>

            </View>
        </View>
    )
}

export default EnhancementQuestions

import { View, Text, Dimensions, Image, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, TextInput, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import customFonts from '../../assets/fonts/Fonts'
import colors from '../../assets/colors/Colors'
import MoreOptionsPopup from '../../Components/MoreOptionsPopup'
import AddButtonPopup from '../../Components/AddButtonPopup'
import BlockPopup from '../../Components/BlockPopup'

const { height, width } = Dimensions.get('window');

const activeImage = require('../../assets/images/activeSendIcon.png');
const inactiveImage = require('../../assets/images/inActiveSendIcon.png');

const activeMore = require('../../assets/images/activeMoreIcon.png')
const more = require('../../assets/images/moreIcon.png')
const activeAdd = require('../../assets/images/activeAddIcon.png')
const add = require('../../assets/images/addIcon.png')


export default function ChatScreen() {
    let listViewRef;

    const [openModal, setOpenModal] = useState(false);
    const [openModal3, setOpenModal3] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [message, setMessage] = useState('');
    const messages = [
        {
            id: 1,
            message: "Hi there! Just saw that we matched. Excited to chat! ",
            fromMe: false,
            time: "12:25"
        },
        {
            id: 2,
            message: "Hi there! Just saw that we matched. Excited to chat! ",
            fromMe: true,
            time: "12:25"
        },
        {
            id: 3,
            message: "Hi there! Just saw that we matched. Excited to chat! ",
            fromMe: false,
            time: "12:25"
        },
        {
            id: 4,
            message: "Hi there! Just saw that we matched. Excited to chat! ",
            fromMe: true,
            time: "12:25"
        },
        {
            id: 5,
            message: "Hi there! Just saw that we matched. Excited to chat! ",
            fromMe: false,
            time: "12:25"
        },
        {
            id: 6,
            message: "Hi there! Just saw that we matched. Excited to chat! ",
            fromMe: true,
            time: "12:25"
        },
        {
            id: 7,
            message: "Hi there! Just saw that we matched. Excited to chat! ",
            fromMe: false,
            time: "12:25"
        },
        {
            id: 8,
            message: "Hi there! ",
            fromMe: true,
            time: "12:25"
        },
        {
            id: 9,
            message: "hello there! ",
            fromMe: true,
            time: "12:25"
        },
    ]

    const closeModal2 = () => {
        setOpenModal2(false)
    }
    const closeModal = () => {
        setOpenModal(false)
    }
    const closeModal3 = () => {
        console.log("Closing modal 3")
        setOpenModal3(false)
    }

    useEffect(() => {
        console.log("Open Modal 3 changed ", openModal3)
    }, [openModal3])

    return (


        <View style={{ alignItems: 'center', height: height, backgroundColor: 'white' }}>

            <View style={{
                backgroundColor: 'white', height: 120 / 930 * height, width: width, shadowColor: '#000', shadowOffset: {
                    width: 0,
                    height: 5
                }, shadowRadius: 5, shadowOpacity: 0.04,
            }}>
                <View style={{
                    alignItems: 'flex-end', flexDirection: 'row', height: 120 / 930 * height, width: width - 50 / 430 * width, alignSelf: 'center', paddingBottom: 13 / 930 * height,
                    justifyContent: 'space-between',
                }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row', width: width - 50 / 430 * width, justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', gap: 15 / 430 * width }}>
                            <TouchableOpacity>
                                <View style={GlobalStyles.backBtn}>
                                    <Image source={require('../../assets/images/backArrow.png')}
                                        style={GlobalStyles.backBtnImage}
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{ alignItems: 'center', flexDirection: 'row', gap: 12 / 430 * width }}>
                                    <Image source={require('../../assets/images/profileImage.png')}
                                        style={{ height: 46 / 930 * height, width: 46 / 930 * height, borderRadius: 25 }}
                                    />

                                    <Text numberOfLines={1} style={{
                                        fontSize: 20, fontFamily: customFonts.meduim, width: 170 / 430 * width,
                                    }}>
                                        Sarah Doe
                                    </Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 / 430 * width}}>
                            <TouchableOpacity>
                                <Image source={require('../../assets/images/videoCall.png')}
                                    style={GlobalStyles.backBtnImage}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setOpenModal2(true)
                            }}>
                                <Image source={openModal2 ? activeMore : more}
                                    style={GlobalStyles.backBtnImage}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
            <MoreOptionsPopup visible={openModal2} close={closeModal2} handleMenu={(menu) => {

                if (menu === "Block") {
                    console.log("Menu selected is ", menu)
                    closeModal2()
                    setOpenModal3(true)
                }
            }} />

            <Modal
                visible={openModal3}
                transparent={true}
                animationType='slide'
            >
                <TouchableWithoutFeedback onPress={() => { setOpenModal3(false) }}>
                    <View style={{ height: height, width: width, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000050' }}>

                        <View style={{
                            backgroundColor: 'white', justifyContent: 'space-between',gap:15/930*height,
                            alignItems: 'flex-start', borderRadius: 10, paddingHorizontal: 25, paddingVertical: 25,
                        }}>
                            <Text style={{ fontSize: 20, fontFamily: customFonts.meduim }}>Block Sarah Doe?</Text>
                            <Text style={{ fontSize: 14, fontFamily: customFonts.regular }}>Are you sure you want to block Sarah Doe?</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width:320/430* width, justifyContent: 'space-between', alignSelf:'center',marginTop:10}}>
                                <TouchableOpacity onPress={() => { setOpenModal3(false) }}
                                    style={{
                                         width: 150 / 430 * width, alignItems: 'center', justifyContent: 'center',
                                        borderWidth: 1, borderRadius: 10, borderColor: '#000',paddingVertical:12,paddingHorizontal:16,
                                    }}
                                >
                                    <Text style={{ fontSize: 14, fontFamily: customFonts.meduim }}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { setOpenModal3(false) }}
                                    style={{
                                        alignItems: 'center', justifyContent: 'center',paddingVertical:12,paddingHorizontal:16,
                                        borderRadius: 10, backgroundColor: '#E01F1F',width: 150 / 430 * width
                                    }}
                                >
                                    <Text style={{ fontSize: 14, fontFamily: customFonts.meduim, color: 'white' }}>Yes, block</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            {/* <View style={{ alignItems: 'center', height: height * 0.75, }}> */}

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ height: height * 0.9, width: width - 50 }}
            >

                <FlatList
                    showsVerticalScrollIndicator={false}
                    ref={(ref) => {
                        listViewRef = ref;
                    }}
                    onContentSizeChange={() => {
                        if (listViewRef !== null) {
                            listViewRef._listRef._scrollRef.scrollToEnd({ animated: true })
                        }
                    }}
                    data={messages}
                    renderItem={({ item }) => (
                        <>
                            {
                                item.fromMe ? (

                                    <View style={{ alignItems: 'flex-end', width: width - 70, marginTop: 10 }}>

                                        <View style={{
                                            width: 207 / 430 * width, backgroundColor: colors.blueColor, marginTop: 15, borderRadius: 18,
                                            paddingHorizontal: 12, paddingVertical: 8, gap: 3, alignItems: 'flex-start', flexDirection: 'column'
                                        }}>
                                            <Text style={{ fontSize: 14, fontFamily: customFonts.regular, color: 'white' }}>{item.message}</Text>
                                            <Text style={{ color: 'white', fontSize: 10, fontFamily: customFonts.regular, textAlign: 'right', width: 175 / 430 * width }}>{item.time}</Text>
                                        </View>
                                    </View>
                                ) : (

                                    <View style={{ alignItems: 'flex-start', width: width - 70, marginTop: 10 }}>

                                        <View style={{
                                            width: 207 / 430 * width, backgroundColor: '#F5F5F5', marginTop: 15, borderRadius: 18,
                                            paddingHorizontal: 12, paddingVertical: 6, gap: 3, alignItems: 'flex-start', flexDirection: 'column'
                                        }}>
                                            <Text style={{ fontSize: 14, fontFamily: customFonts.regular }}>{item.message}</Text>
                                            <Text style={{ fontSize: 10, fontFamily: customFonts.regular, textAlign: 'right', width: 175 / 430 * width }}>{item.time}</Text>
                                        </View>
                                    </View>
                                )
                            }

                        </>
                    )}

                />

                <View style={{
                    flexDirection: 'row', alignItems: 'center', height: 90 / 930 * height, backgroundColor: 'transparent',
                    width: width - 50 / 430 * width, justifyContent: 'center', paddingHorizontal: 10, gap: 8
                }}>
                    <TouchableOpacity onPress={() => {
                        setOpenModal(true)
                    }}>
                        <Image source={openModal ? activeAdd : add}
                            style={{ height: 24, width: 24 }}
                        />
                    </TouchableOpacity>

                    <AddButtonPopup visible={openModal} close={closeModal} />

                    <TextInput placeholder='Send message....' autoFocus={true} multiline value={message}
                        style={{ width: 246 / 430 * width, backgroundColor: '#f5f5f5', paddingVertical: 16, borderRadius: 10, paddingHorizontal: 16 }}
                        onChangeText={(item) => {
                            setMessage(item)
                        }}
                    />
                    <TouchableOpacity>
                        <Image source={require('../../assets/images/micIcon.png')}
                            style={{ height: 24, width: 24 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image source={message ? activeImage : inactiveImage}
                            style={{ height: 52, width: 52, }}
                        />
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </View>
    )
}
import { View, Text, Dimensions, Image, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import customFonts from '../../assets/fonts/Fonts'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import colors from '../../assets/colors/Colors'
import DatesFilterPopup from '../../Components/DatesFilterPopup'

const dateImage = require('../../assets/images/datenight.png')
const { height, width } = Dimensions.get('window')

export default function InviteDateFromChatScreen(props) {
    const[openModal,setOpenModal] = useState(false)
    const dateIdeas = [ 
        {
            id: 1,
            image: dateImage,
            name: "Fancy Bistro",
            budget: 25,
            rating: 5.0,
            category: 'Dinner'
        },
        {
            id: 2,
            image: dateImage,
            name: "Fancy Bistro",
            budget: 25,
            rating: 5.0,
            category: 'Dinner'
        },
        {
            id: 3,
            image: dateImage,
            name: "Fancy Bistro",
            budget: 25,
            rating: 5.0,
            category: 'Dinner'
        },
        {
            id: 4,
            image: dateImage,
            name: "Fancy Bistro",
            budget: 25,
            rating: 5.0,
            category: 'Dinner'
        },
        {
            id: 5,
            image: dateImage,
            name: "Fancy Bistro",
            budget: 25,
            rating: 5.0,
            category: 'Dinner'
        },
    ]
    const closeModal = () =>{
        setOpenModal(false)
    }
    return (
        <SafeAreaView>
            <View style={{ height: height, width: width, alignItems: 'center' }}>
                <View style={{ width: width - 60 / 430 * width, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.goBack()
                        }}>
                            <View style={GlobalStyles.backBtn}>
                                <Image source={require('../../assets/images/backArrow.png')}
                                    style={GlobalStyles.backBtnImage}
                                />
                            </View>
                        </TouchableOpacity>

                        <Text style={{ fontSize: 24, fontFamily: customFonts.meduim }}>Invite to date</Text>

                    </View>
                    <TouchableOpacity onPress={() => {
                        setOpenModal(true)
                    }}>
                        <Image source={require('../../assets/images/setting.png')}
                            style={{ height: 28 / 930 * height, width: 28 / 430 * width }}
                        />
                    </TouchableOpacity>

                  

                </View> 
                 <DatesFilterPopup visible={openModal} close={closeModal} />
                <View style={{
                    width: width - 60 / 430 * width, backgroundColor: colors.greyText, paddingHorizontal: 16 / 930 * height, paddingVertical: 16 / 430 * width,
                    marginTop: 30 / 930 * height, borderRadius: 10
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, width: 300 / 430 * width }}>
                        <Image source={require('../../assets/images/searchIcon.png')}
                            style={{ height: 24 / 930 * height, width: 24 / 430 * width }}
                        />
                        <TextInput placeholder='Search'
                            style={{ fontSize: 14, fontFamily: customFonts.meduim,width: 300 / 430 * width }}
                        />

                    </View>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: width - 60 / 430 * width, marginTop: 30 / 930 * height }}>
                    <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>Date ideas </Text>
                    <ScrollView style={{ height: height * 0.6, width: width }} showsVerticalScrollIndicator={false}>
                        <View style={{gap: 8, flexDirection: 'row', width: width - 40 / 430 * width, alignItems: 'center', flexWrap: 'wrap', marginTop: 20 }}>

                            {
                                dateIdeas.map((item) => (
                                    <TouchableOpacity key={item.id} 
                                        onPress={()=>{
                                            props.navigation.navigate('SelectedDateDetails')
                                        }}
                                    >
                                        <View style={{
                                            alignItems: 'center', padding: 12, borderWidth: 1, borderColor: colors.greyText, borderRadius: 10,
                                            marginLeft: 0 / 430 * width, flexDirection: 'column', gap: 10 / 930 * height
                                        }}>
                                            <Image source={item.image}
                                                style={{ height: 98 / 930 * height, width: 158 / 430 * width, borderRadius: 10, resizeMode: 'contain' }}
                                            />
                                            <View style={{ alignItems: 'flex-start', flexDirection: 'column', width: 150 / 430 * width, }}>
                                                <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, }}>{item.name}</Text>
                                            </View>

                                            <View style={{ alignItems: 'cemter', flexDirection: 'row', width: 150 / 430 * width, justifyContent: 'space-between' }}>
                                                <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Budget</Text>
                                                <Text style={{ fontSize: 12, fontFamily: customFonts.meduim }}>{item.budget}$</Text>
                                            </View>
                                            <View style={{ alignItems: 'cemter', flexDirection: 'row', width: 150 / 430 * width, justifyContent: 'space-between' }}>
                                                <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Ratings</Text>
                                                <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                                                    <Image source={require('../../assets/images/star.png')}
                                                        style={{ height: 12 / 930 * height, width: 12 / 930 * height }}
                                                    />
                                                    <Text style={{ fontSize: 12, fontFamily: customFonts.meduim }}>{item.rating}</Text>
                                                </View>

                                            </View>
                                            <View style={{ alignItems: 'cemter', flexDirection: 'row', width: 150 / 430 * width, justifyContent: 'space-between' }}>
                                                <Text style={{ fontSize: 12, fontFamily: customFonts.regular }}>Category</Text>
                                                <Text style={{ fontSize: 12, fontFamily: customFonts.meduim }}>{item.category}</Text>
                                            </View>

                                        </View>
                                    </TouchableOpacity>

                                ))
                            }

                        </View>
                    </ScrollView>
                </View>
                <TouchableOpacity style ={[GlobalStyles.reqtengularBtn,{marginTop:30/930*height}]}>
                    <Text style ={GlobalStyles.btnText}>Continue</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}
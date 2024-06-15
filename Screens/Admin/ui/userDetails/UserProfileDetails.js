import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Modal, Text, TouchableOpacity, View, FlatList,ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import customFonts from '../../../../assets/fonts/Fonts';
import colors from '../RangeSlider/Colors';
import Apis from '../../apis/Apis';
import GlobalStyles from '../../../../assets/styles/GlobalStyles'
import { Video, ResizeMode } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


const placholder = require('../../../../assets/images/imagePlaceholder.webp')
const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const UserProfileDetails = ({ navigation, route }) => {
    const { height, width } = Dimensions.get('window')
    const UserId = route.params.DATA

    console.log("User id passed is :", UserId.UserDetails);
    const ID = UserId.UserDetails;

    const [ProfileData, setProfileData] = useState('');
    const [UserMedia, setUserMedia] = useState([]);
    const [QuestionAnswers, setQuestionAnswers] = useState([]);
    const [loadImage, setLoadImage] = useState(false);
    const [loadVideo, SetLoadVideo] = useState(false);
    const videoRef = React.useRef(null);
    // const videoSource = .answerVideo;
    const [Status, setStatus] = useState({});
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const handleBack = () => {
        navigation.pop();
    }

    //api call for user details
    useEffect(() => {
        const UserDetail = async () => {
            const ApiUrl = `https://plurawlapp.com/soulmatch/api/users/get_profile?userid=${ID}`;
            const AuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMTYsIm5hbWUiOiJBZG1pbiBQbHVyYXdsIiwiZW1haWwiOiJhZG1pbkBwbHVyYXdsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE4uRHcyZTloZ2FvSy9BbzAxVmk2dGVla0xUMXVBdi9ycEhBTXdCblpaVDd3WUhTWmNLMnFlIiwicHJvZmlsZV9pbWFnZSI6bnVsbCwiY29tcGFueSI6bnVsbCwidGl0bGUiOm51bGwsImluZHVzdHJ5IjpudWxsLCJjaXR5IjpudWxsLCJzdGF0ZSI6bnVsbCwiZ2VuZGVyIjpudWxsLCJyYWNlIjpudWxsLCJsZ2J0cSI6bnVsbCwidmV0ZXJhbiI6bnVsbCwiZmNtX3Rva2VuIjpudWxsLCJkZXZpY2VfaWQiOiIiLCJwcm92aWRlcl9pZCI6bnVsbCwicHJvdmlkZXJfbmFtZSI6bnVsbCwicm9sZSI6ImFkbWluIiwicG9pbnRzIjowLCJlbmNfa2V5IjpudWxsLCJlbmNfaXYiOm51bGwsImNvdW50cmllcyI6bnVsbCwicHJvbm91bnMiOm51bGwsImRvYiI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyNC0wNS0wMlQxMTo1NzozMy4wMDBaIiwidXBkYXRlZEF0IjoiMjAyNC0wNS0wMlQxMTo1NzozMy4wMDBaIn0sImlhdCI6MTcxNDY0Mzk1NSwiZXhwIjoxNzQ2MTc5OTU1fQ._iU0mPQUIjHIj8GvT_YvooVfditUOX3Grs9V8PmSGy0"
            const response = await fetch(ApiUrl, {
                'method': 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + AuthToken
                }
            });
            if (response.ok) {
                const Result = await response.json();
                console.log("Apis response is :", Result.data.email);
                setProfileData(Result.data);
                setUserMedia(Result.data.media);
                setQuestionAnswers(Result.data.answers);
                console.log('user media is ', Result.data.media)
            }
        };
        UserDetail();
    }, []);

    const male = require('../../../../assets/Images3/maleIcon.png');
    const female = require('../../../../assets/Images3/female.png');
    const nonBinary = require('../../../../assets/Images3/nonBinary.png');
    const [data, setdata] = useState('Male')

    const [openModal, setOpenModal] = useState(false);
    const [openSuspendModal, setopenSuspendModal] = useState(false)

    const handleModalclick = () => {
        setOpenModal(true);
    }

    const handleSuspendModal = () => {
        setopenSuspendModal(true)
    }

    useEffect(() => {
        setdata(data)
    }, [])

    const getGenderIcon = () => {
        if (data === null) {
            return
        }
        if (data === 'Male') {
            return male
        } else if (data === 'Female') {
            return female
        } else if (data === 'Non-Binary') {
            return nonBinary
        }
    }

    const photosVideos = [
        {
            id: 1,
            name: 'Hamza'
        },
        {
            id: 2,
            name: 'Zain'
        }
    ]

    const PSQuestions = [
        {
            id: 1,
            name: 'Travel dreamin',
            image: require('../../../../assets/Images3/nicole.png')
        },
        {
            id: 2,
            name: 'Zain',
            image: ''
        }
    ]

    //api call for deleting user

    const handleDelete = async () => {
        try {
            const ApiUrl = "https://plurawlapp.com/soulmatch/api/admin/delete_user";
            //add api link here
            const data = await AsyncStorage.getItem("USER")
            if (data) {
                let d = JSON.parse(data) 
                let AuthToken  = d.token           
                console.log("Id going in is", ProfileData.id);
                const response = await fetch(ApiUrl, {
                    'method': 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthToken
                    },
                    body: JSON.stringify({ userId: ProfileData.id })
                });
                console.log('Respopnse is :', response);
                if (response.ok) {
                    const Result = await response.json();
                    route.params.UserDeleted(route.params.index)
                    // console.log("Resprronse of api is :", Result);
                    navigation.pop();
                } else if (!response.ok) {
                    console.log("Status is :", response.status);
                }
            }
        } catch (error) {
            console.log("Error occured is", error);
        }
    }

    //api call for suspending user
    const handleSuspend = async () => {
        try {
            const ApiUrl = "https://plurawlapp.com/soulmatch/api/admin/suspend_user";
            const data = await AsyncStorage.getItem("USER")
            if (data) {
                let d = JSON.parse(data)
                let AuthToken = d.token
                const response = await fetch(ApiUrl, {
                    'method': 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthToken
                    },
                    body: JSON.stringify({ userId: ProfileData.id })
                });
                if (response.ok) {
                    const Result = await response.json();
                    console.log("Responsee of api is : ", Result.status);
                    navigation.pop();
                } else if (!response.ok) {
                    console.log("Response is not ok :", response.status);
                }
            }
        } catch (error) {
            console.error("Error occured while caling api is : ", error);
        }
    }

    //test code for video thumnail

   

    return (
        <SafeAreaView>
            <View style={{ display: 'flex', alignItems: 'center' }}>
                {/*change if the screen is irResponsive height: height s*/}
                <View style={{ width: width - 50 }}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="#FFFFFF"
                        translucent={false}
                    />
                    {/* Header code */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginTop: 10 }}>
                        <TouchableOpacity onPress={handleBack}>
                            <View style={{ height: 42 / 930 * height, width: 42 / 430 * width, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 10 }}>
                                <Image source={require('../../../../assets/Images3/CrossIcon.png')} style={{ height: 16, width: 16, resizeMode: 'contain' }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: '500', fontSize: 22, color: '#333333', fontFamily: customFonts.medium }}>
                            {ProfileData.first_name} {ProfileData.last_name}
                        </Text>
                    </View>

                    <ScrollView style={{ height: height * 0.88 }} showsVerticalScrollIndicator={false}>

                        <View>
                            <Image source={ProfileData.profile_image ? { uri: ProfileData.profile_image } : require('../../../../assets/Images3/imagePlaceholder.webp')} style={{ height: 530 / 930 * height, width: 370 / 430 * width, resizeMode: 'cover', borderRadius: 10, marginTop: 10 }} />
                            {/* Suspend delete button */}
                            <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => setopenSuspendModal(true)} style={GlobalStyles.SuspendDelBtn}>
                                    <Text style={GlobalStyles.SuspendDelBText}>
                                        Suspend
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleModalclick}
                                    style={[GlobalStyles.SuspendDelBtn, {
                                        backgroundColor: '#E01F1F',
                                        borderWidth: 0,
                                    }]}>
                                    <Text style={[GlobalStyles.SuspendDelBText, {
                                        color: 'white'
                                    }]}>
                                        Delete
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Compatibility score */}

                            <View style={{ flexDirection: 'row', marginTop: 10, gap: 8, alignItems: 'center' }}>
                                <Image source={require('../../../../assets/Images3/compatibility.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                                <View>
                                    <Text style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.medium, color: '#666666' }}>
                                        Compatibility score
                                    </Text>
                                    <Text style={{ fontWeight: '600', fontSize: 20, color: '#4D4D4D', fontFamily: customFonts.bold }}>
                                        85%
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.viewStyle}>
                                <Image source={getGenderIcon()}
                                    style={styles.viewImage}
                                />
                                <Text style={styles.viewText}>
                                    {ProfileData.gender}
                                </Text>
                            </View>

                            <View style={styles.viewStyle}>
                                <Image source={require('../../../../assets/Images3/cake.png')}
                                    style={styles.viewImage}
                                />
                                <Text style={styles.viewText}>{ProfileData.age} years old</Text>
                            </View>

                            <View style={styles.viewStyle}>
                                <Image source={require('../../../../assets/Images3/ruler.png')}
                                    style={styles.viewImage}
                                />
                                <Text style={styles.viewText}>{ProfileData.height_feet} feet {ProfileData.height_inches} inches</Text>
                            </View>

                            <View style={styles.viewStyle}>
                                <Image source={require('../../../../assets/Images3/location.png')}
                                    style={styles.viewImage}
                                />
                                <Text style={styles.viewText}>5 miles</Text>
                            </View>

                            <View style={styles.viewStyle}>
                                <Image source={require('../../../../assets/Images3/teacher.png')}
                                    style={styles.viewImage}
                                />
                                <Text style={styles.viewText}>
                                    {ProfileData.job_title}
                                </Text>
                            </View>

                            <View style={styles.viewStyle}>
                                <Image source={require('../../../../assets/Images3/briefcase.png')}
                                    style={styles.viewImage}
                                />
                                <Text style={styles.viewText}>
                                    <Text style={styles.viewText}>
                                        at {ProfileData.company}
                                    </Text>
                                </Text>
                            </View>

                            <View style={styles.viewStyle}>
                                {/* Add zodiac icon here */}
                                <Image source={require('../../../../assets/Images3/RatingStar.png')}
                                    style={styles.viewImage}
                                />
                                <Text style={styles.viewText}>
                                    {ProfileData.zodiac}
                                </Text>
                            </View>

                            <View style={{ marginTop: 22 / 930 * height, alignItems: 'flex-start', }}>
                                <Text style={{ fontSize: 20, fontFamily: customFonts.medium }}>Photos & videos</Text>
                            </View>
                            <View>
                                <FlatList
                                    scrollEnabled={false}
                                    data={UserMedia}
                                    renderItem={({ item, index }) => (
                                        <View key={item.id} style={{ marginTop: 15 }}>
                                            <View style={{ borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 10, padding: 15, justifyContent: 'center' }}>
                                                <Text style={{ fontWeight: '400', fontSize: 16, fontFamily: customFonts.regular }}>
                                                    {
                                                        item.caption ?
                                                            <Text style={{ fontWeight: '400', fontSize: 16, fontFamily: customFonts.medium }}>
                                                                {item.caption}
                                                            </Text> :""
                                                    
                                                    }
                                                </Text>
                                                {
                                                            item.type === "image" ? (
                                                                <>
                                                                    <Image source={{ uri: item.url ? item.url : thumb_url }}
                                                                        onLoadStart={() => { setLoadImage(true) }}
                                                                        onLoadEnd={() => {
                                                                            setLoadImage(false)
                                                                        }}
                                                                        placeholder={blurhash}
                                                                        contentFit="cover"
                                                                        transition={1000}
                                                                        style={{ height: 230 / 930 * height, width: 350 / 430 * width, borderRadius: 10, marginTop: 8 }}
                                                                    />

                                                                    {
                                                                        loadImage ? (
                                                                            <ActivityIndicator size={'small'} color={colors.blueColor} style={{ position: 'absolute', bottom: 100, left: 150 }} />
                                                                        ) : <></>
                                                                    }
                                                                </>

                                                            ) : (
                                                                item.type === "video" ? (
                                                                    <>
                                                                        <Video
                                                                            ref={videoRef}
                                                                            source={{
                                                                                uri: item.url
                                                                            }}
                                                                            style={{ height: 230 / 930 * height, width: 350 / 430 * width, borderRadius: 10, marginTop: 8 }}
                                                                            useNativeControls
                                                                            resizeMode={ResizeMode.COVER}
                                                                            isLooping={true}
                                                                            // shouldPlay={isPlaying}
                                                                            onPlaybackStatusUpdate={status => {
                                                                                setStatus(() => status)
                                                                                setIsPlaying(status.isPlaying);
                                                                            }}
                                                                            onLoad={(status) => {
                                                                                setDuration(status.durationMillis)
                                                                                setLoadVideo(false)
                                                                            }} // Set duration when video loads
                                                                            onLoadStart={() => {
                                                                                setLoadVideo(true)
                                                                            }}

                                                                        />
                                                                        {!isPlaying && duration > 0 && (
                                                                            <View style={styles.durationContainer}>
                                                                                <Text style={styles.durationText}>{formatDuration(duration)}</Text>
                                                                            </View>
                                                                        )}

                                                                        {
                                                                            loadVideo ? (
                                                                                <ActivityIndicator size={'small'} color={colors.blueColor} style={{ position: 'absolute', bottom: 100, left: 180 / 430 * width }} />
                                                                            ) : <></>
                                                                        }
                                                                    </>
                                                                ) : ''
                                                            )
                                                        }
                                            </View>
                                        </View>
                                    )}
                                />
                            </View>

                            <View style={{ marginTop: 22 / 930 * height, alignItems: 'flex-start', }}>
                                <Text style={{ fontSize: 20, fontFamily: customFonts.medium }}>Profile statement questions</Text>
                            </View>

                            <View>
                                <FlatList
                                    scrollEnabled={false}
                                    data={QuestionAnswers}
                                    renderItem={({ item, index }) => (
                                        <View key={item.id} style={{ marginTop: 15 }}>
                                            <View style={{ borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 10, padding: 15, justifyContent: 'center' }}>
                                                <Text style={{ fontSize: 16, fontWeight: '500', fontFamily: customFonts.semibold }}>
                                                    {item.title}
                                                </Text>
                                                <Text style={{ fontWeight: '400', fontSize: 16, fontFamily: customFonts.regular }}>
                                                    {item.text}
                                                </Text>
                                                {item.answerText ? <Text>{item.answerText}</Text> : ''}
                                                {item.answerImage ? <Image source={{ uri: item.answerImage }} style={{ height: 234 / 930 * height, width: 334 / 430 * width, borderRadius: 10, marginTop: 5 }} /> : ''}
                                                {item.answerVideo ?
                                                    <Video
                                                        ref={videoRef}
                                                        style={{ height: 370 / 930 * height, width: width - 60, marginTop: 33 / 930 * height, borderRadius: 4 }}
                                                        source={{
                                                            uri: item.answerVideo
                                                        }}
                                                        useNativeControls
                                                        resizeMode={ResizeMode.COVER}
                                                        isLooping={true}
                                                        // shouldPlay={isPlaying}
                                                        onPlaybackStatusUpdate={status => {
                                                            setStatus(() => status)
                                                            setIsPlaying(status.isPlaying);
                                                        }}
                                                        onLoad={(status) => {
                                                            setDuration(status.durationMillis)
                                                            setLoadVideo(false)
                                                        }} // Set duration when video loads
                                                        onLoadStart={() => {
                                                            setLoadVideo(true)
                                                        }}

                                                    />
                                                    : ''}
                                                {/* Test code */}

                                            </View>
                                        </View>
                                    )}
                                />
                            </View>

                        </View>
                    </ScrollView>
                    {/*Delete button modal*/}

                    <Modal
                        visible={openModal}
                        transparent={true}
                        animationType='slide'
                        onRequestClose={() => setOpenModal(false)}
                        style={{}}
                    >
                        <View style={{ height: 630 / 930 * height, borderTopRightRadius: 25, borderTopLeftRadius: 25, backgroundColor: 'white', width: width, position: 'absolute', bottom: 0, alignItems: 'center' }}>
                            <View style={{ width: width - 50 }}>
                                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 15 / 930 * height, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: '500', fontFamily: customFonts.medium }}>
                                        Delete
                                    </Text>
                                    <TouchableOpacity onPress={() => setOpenModal(false)} style={{ marginRight: 10 }}>
                                        <Image source={require('../../../../assets/Images3/CrossIcon.png')} style={{ height: 20 / 930 * height, width: 20 / 430 * width, resizeMode: 'contain', }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ height: 0.1, borderWidth: 0.2, borderColor: '#E6E6E6', width: width, marginTop: 20 / 930 * height }}></View>

                            <View style={{ marginTop: 25 }}>
                                <Image source={ProfileData.profile_image ?{ uri: ProfileData.profile_image }:placholder} style={{ height: 250, width: 250, resizeMode: 'cover', borderRadius: 10 }} />
                            </View>

                            <Text style={{ fontWeight: '500', padding: 10, fontFamily: customFonts.medium, fontSize: 16, color: '#4D4D4D', marginTop: 15, textAlign: 'center' }}>
                                Are you sure you want to delete {ProfileData.first_name} {ProfileData.last_name} account?
                            </Text>

                            <View style={{ width: width - 50, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                                <View style={{ height: 48 / 930 * height, width: 173 / 430 * width, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, }}>
                                    <TouchableOpacity onPress={() => setOpenModal(false)}>
                                        <Text style={{ fontSize: 16, fontWeight: '500', fontFamily: customFonts.medium }}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ height: 48 / 930 * height, width: 173 / 430 * width, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E01F1F' }}>
                                    <TouchableOpacity onPress={handleDelete}>
                                        <Text style={{ fontSize: 16, fontWeight: '500', fontFamily: customFonts.medium, color: 'white' }}>
                                            Yes, Delete
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </Modal>

                    <Modal
                        visible={openSuspendModal}
                        transparent={true}
                        animationType='slide'
                        onRequestClose={() => setopenSuspendModal(false)}
                        style={{}}
                    >
                        <View style={{ height: 630 / 930 * height, borderTopRightRadius: 25, borderTopLeftRadius: 25, backgroundColor: 'white', width: width, position: 'absolute', bottom: 0, alignItems: 'center' }}>
                            <View style={{ width: width - 50 }}>
                                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 15 / 930 * height, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: '500', fontFamily: customFonts.medium }}>
                                        Suspend
                                    </Text>
                                    <TouchableOpacity onPress={() => setopenSuspendModal(false)} style={{ marginRight: 10 }}>
                                        <Image source={require('../../../../assets/Images3/CrossIcon.png')} style={{ height: 20 / 930 * height, width: 20 / 430 * width, resizeMode: 'contain', }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ height: 0.1, borderWidth: 0.2, borderColor: '#E6E6E6', width: width, marginTop: 20 / 930 * height }}></View>

                            <View style={{ marginTop: 25 }}>
                                <Image source={ProfileData.profile_image ?{ uri: ProfileData.profile_image }:placholder} style={{ height: 250, width: 250, resizeMode: 'cover', borderRadius: 10 }} />
                            </View>

                            <Text style={{ fontWeight: '500', padding: 10, fontFamily: customFonts.medium, fontSize: 16, color: '#4D4D4D', marginTop: 15, textAlign: 'center' }}>
                                Are you sure you want to suspend {ProfileData.first_name} {ProfileData.last_name}’s account?
                            </Text>

                            <View style={{ width: width - 50, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                                <View style={{ height: 48 / 930 * height, width: 173 / 430 * width, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, }}>
                                    <TouchableOpacity onPress={() => setopenSuspendModal(false)}>
                                        <Text style={{ fontSize: 16, fontWeight: '500', fontFamily: customFonts.medium }}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ height: 48 / 930 * height, width: 173 / 430 * width, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E01F1F' }}>
                                    <TouchableOpacity onPress={handleSuspend}>
                                        <Text style={{ fontSize: 16, fontWeight: '500', fontFamily: customFonts.medium, color: 'white' }}>
                                            Yes, Suspend
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </Modal>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default UserProfileDetails;

const styles = StyleSheet.create({
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        // justifyContent:'center',
        gap: 12,
        marginTop: 8,
        width: 250
    },
    viewImage: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    viewText: {
        fontSize: 16,
        fontFamily: customFonts.medium,
        textAlign: 'left',
        // width: 334 / 430 * width
    },
    image: {
        // height: 28 / 930 * height,
        // width: 28 / 930 * height,
        resizeMode: 'contain'
    }
})

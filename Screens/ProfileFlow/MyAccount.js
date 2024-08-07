import { View, Text, TouchableOpacity, Dimensions, StyleSheet, ScrollView, Settings } from 'react-native'
import React,{useEffect,useState} from 'react'
import { Image } from 'expo-image';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import colors from '../../assets/colors/Colors';
import ApisPath from '../../lib/ApisPath/ApisPath';
import { useFocusEffect } from '@react-navigation/native';
import { getProfile } from '../../Services/ProfileServices/GetProfile';

const { height, width } = Dimensions.get('window')

export default function MyAccount({ navigation, route }) {
    let imageUpdated = route.params.imageUpdated();
    // console.log('Image updated function on my account screen is :', imageUpdated);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      console.log("Use Focus Effect")
      fetchProfile()
    }, [])
  );

    // useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getProfile();
                setUser(data);
                setMedia(data.media)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        
    // }, []);

    // const user = route.params.user
    // console.log('user from prev screen is', user)

    return (

        <View style={{ height: height, width: width, alignItems: 'center' }}>
            <View style={{ width: width - 60, marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <View style={GlobalStyles.backBtn}>
                        <Image source={require('../../assets/images/backArrow.png')}
                            style={GlobalStyles.backBtnImage}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={{ fontWeight: '500', fontSize: 24, marginLeft: 20 / 430 * width }}>
                    My account
                </Text>
            </View>

            <View style={{ alignItems: 'center', height: height * 0.82, marginTop: 20 / 930 * height, }}>

                <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'column', gap: 15, alignItems: 'center', marginTop: 30 }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('AccountDetails', {
                                    user: user,
                                    imageUpdated: imageUpdated,
                                    from:'MyAccount'
                                })
                            }}
                        >
                            <View style={styles.mainView}>

                                <Text style={styles.text}>
                                    Account details
                                </Text>

                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('ChangePassword', {
                                    user: user
                                })
                            }}
                        >
                            <View style={styles.mainView}>

                                <Text style={styles.text}>
                                    Change password
                                </Text>

                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('ChangeIntroVideo', {
                                    user: user
                                })
                            }}
                        >
                            <View style={styles.mainView}>

                                <Text style={styles.text}>
                                    Intro Video
                                </Text>

                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                console.log("Pressed Media button")
                                navigation.navigate('UploadMedia', {
                                    data: {
                                        from: 'profile'
                                    }
                                })
                            }}
                        >
                            <View style={styles.mainView}>

                                <Text style={styles.text}>
                                    Media
                                </Text>

                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('AddZodiac',{
                                    data: {
                                        user: user,
                                        from: 'Profile'
                                    }
                                })
                            }}
                        >
                            <View style={styles.mainView}>

                                <Text style={styles.text}>
                                    Zodiac
                                </Text>

                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('AddAge',{
                                    data:{
                                        from:'Profile',
                                        user:user
                                    }
                                })
                            }}
                        >
                            <View style={styles.mainView}>

                                <Text style={styles.text}>
                                    Age
                                </Text>

                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('AddHeight',{
                                    data:{
                                        from:'Profile',
                                        user:user
                                    }
                                })
                            }}
                        >
                            <View style={styles.mainView}>

                                <Text style={styles.text}>
                                    Height
                                </Text>

                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('AddGender',{
                                    data:{
                                        user:user,
                                        from:'Profile'
                                    }
                                })
                            }}
                        >
                            <View style={styles.mainView}>

                                <Text style={styles.text}>
                                    Gender
                                </Text>

                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('AddSchool',{
                                    data:{
                                        user:user,
                                        from:'Profile'
                                    }
                                })
                            }}
                        >
                            <View style={styles.mainView}>

                                <Text style={styles.text}>
                                    School
                                </Text>

                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('AddJobDetails',{
                                    data:{
                                        user:user,from:'Profile'
                                    }
                                })
                            }}
                        >
                            <View style={styles.mainView}>

                                <Text style={styles.text}>
                                    Work
                                </Text>

                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>



                    </View>
                </ScrollView>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        width: width - 60,
        paddingVertical: 10 / 930 * height,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: colors.greyText,
        borderRadius: 10,
        paddingHorizontal: 10 / 430 * width,
        flexDirection: 'row',
        alignItems:'center'
    },
    imageStyle: {
        height: 24 / 930 * height,
        width: 24 / 430 * width
    },
    arrowIcon: {
        height: 28 / 930 * height,
        width: 28 / 430 * width
    },
    text: {
        fontSize: 16
    }
})
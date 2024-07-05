import React, { useEffect, useState } from 'react'
import { View, Text, Settings, TouchableOpacity, Dimensions, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import colors from '../../assets/colors/Colors';
import { Image } from 'expo-image'
import ApisPath from '../../lib/ApisPath/ApisPath';
import { useFocusEffect } from '@react-navigation/native';
import LogoutPopup from '../../Components/LogoutPopup';
import { getProfile } from '../../Services/ProfileServices/GetProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('window');
const placholder = require('../../assets/images/imagePlaceholder.webp')

export default function ProfileMain(props) {

  const [user, setUser] = useState(null)
  const [loadImage, setLoadImage] = useState(false)
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [profileImg, setProfileImg] = useState(null);

  useFocusEffect(
    React.useCallback(() => {

      console.log("Use Focus Effect")
      fetchProfile()


    }, [])
  );
  // console.log('User profile image update is:', user.profile_image);
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProfile();
      setUser(data); 
      setProfileImg(data.profile_image);
      console.log('image is',data.profile_image)
      setMedia(data.media);
      
     
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }
  const logoutUser = async () => {
    console.log('trying to logout')
    try {
      close()
      await AsyncStorage.removeItem("USER")
      await AsyncStorage.removeItem("FilterDiscovers")
      await AsyncStorage.removeItem("TempFilters")
      await AsyncStorage.removeItem("UserAnswers")

      props.navigation.navigate('LoginUser')
    } catch (error) {
      console.log(error)
    }
  }

  const close = (value) => {
    console.log('logout value is', value)
    if (value === "Logout") {
      logoutUser()
    }
    setShowLogoutPopup(false)

  }


  return (
    <SafeAreaView style={{ alignItems: 'center' }}>
      <View style={{ height: height, width: width - 60, alignItems: 'center' }}>
        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 60, alignSelf: 'center',
          marginTop:10/930*height
        }}>
          <Text style={{ fontSize: 26, fontWeight: '500' }}>Profile</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("SelectedProfile", {
                data: {
                  user: user,
                  from: "Profile"
                }
              })
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <Text style={{ color: colors.blueColor, fontSize: 14 }}>Public view</Text>
              <Image source={require('../../assets/images/profileView.png')}
                style={{ height: 20 / 930 * height, width: 20 / 930 * height, resizeMode: 'contain', }}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* source={user && user.profile_image ? { uri: user.profile_image } : placholder} */}
        <Image source={profileImg ? { uri: user.profile_image } : placholder}
          onLoadStart={() => {
            setLoadImage(true)
          }}
          onLoadEnd={() => {
            setLoadImage(false)
          }}
          style={{ height: 110 / 930 * height, width: 110 / 930 * height, borderRadius: 55, marginTop: 25 / 930 * height }}
        />
        {
          
          loadImage && (
            <View style = {{height: 110 / 930 * height, width: 110 / 930 * height,marginTop:-60/930*height}}>
               <ActivityIndicator size={'small'} color={colors.blueColor} style={{ }} />
            </View>
          )
        }

        <Text style={{ fontSize: 18, marginTop: 10 }}>
          {user && user.first_name} {user && user.last_name}
        </Text>

        <View style={{ alignItems: 'center', height: height * 0.61, marginTop: 20 / 930 * height, }}>

          <ScrollView style={{}} showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'column', gap: 10, alignItems: 'center', }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('MyAccount', {
                    imageUpdated: () => {
                      console.log("Setting profile iamge null")
                      setProfileImg(null)
                    }
                  })
                }}
              >
                <View style={styles.mainView}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image source={require('../../assets/images/account.png')}
                      style={styles.imageStyle}
                    />
                    <Text style={styles.text}>
                      My account
                    </Text>
                  </View>
                  <Image source={require('../../assets/images/farwordArrowIcon.png')}
                    style={styles.arrowIcon}
                  />

                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Resources')
                }}
              >
                <View style={styles.mainView}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image source={require('../../assets/images/resources.png')}
                      style={styles.imageStyle}
                    />
                    <Text style={styles.text}>
                      Resources
                    </Text>
                  </View>
                  <Image source={require('../../assets/images/farwordArrowIcon.png')}
                    style={styles.arrowIcon}
                  />

                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('EnhancmentQuestions', {
                    data: {
                      user: user,
                      from: 'Profile'
                    }

                  })
                }}
              >
                <View style={styles.mainView}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image source={require('../../assets/images/question.png')}
                      style={styles.imageStyle}
                    />
                    <Text style={styles.text}>
                      Profile enhancement questions
                    </Text>
                  </View>
                  <Image source={require('../../assets/images/farwordArrowIcon.png')}
                    style={styles.arrowIcon}
                  />

                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('GetInterest', {
                    data: {
                      user: user,
                      from: 'Profile'
                    }

                  })
                }}
              >
                <View style={styles.mainView}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image source={require('../../assets/images/interest.png')}
                      style={styles.imageStyle}
                    />
                    <Text style={styles.text}>
                      Interests
                    </Text>
                  </View>
                  <Image source={require('../../assets/images/farwordArrowIcon.png')}
                    style={styles.arrowIcon}
                  />

                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.mainView}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image source={require('../../assets/images/plans.png')}
                      style={styles.imageStyle}
                    />
                    <Text style={styles.text}>
                      Plans
                    </Text>
                  </View>
                  <Image source={require('../../assets/images/farwordArrowIcon.png')}
                    style={styles.arrowIcon}
                  />

                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("SendFeedBack")
                }}
              >
                <View style={styles.mainView}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image source={require('../../assets/images/feedback.png')}
                      style={styles.imageStyle}
                    />
                    <Text style={styles.text}>
                      Send Feedback
                    </Text>
                  </View>
                  <Image source={require('../../assets/images/farwordArrowIcon.png')}
                    style={styles.arrowIcon}
                  />

                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowLogoutPopup(true)
                }}
              >
                <View style={styles.mainView}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image source={require('../../assets/images/logout.png')}
                      style={styles.imageStyle}
                    />
                    <Text style={[styles.text, { color: 'red' }]}>
                      Logout
                    </Text>
                  </View>
                  <Image source={require('../../assets/images/farwordArrowIcon.png')}
                    style={styles.arrowIcon}
                  />

                </View>
              </TouchableOpacity>
              <LogoutPopup visible={showLogoutPopup} close={close} />
              <View style={{ height: 40 }}></View>
            </View>
          </ScrollView>
        </View>
      </View >
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  mainView: {
    width: width - 60,
    paddingVertical: 17 / 930 * height,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.greyText,
    borderRadius: 10,
    paddingHorizontal: 17 / 430 * width,
    flexDirection: 'row'
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
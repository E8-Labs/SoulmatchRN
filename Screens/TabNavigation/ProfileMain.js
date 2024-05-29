import React, { useEffect, useState } from 'react'
import { View, Text, Settings, TouchableOpacity, Dimensions, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import colors from '../../assets/colors/Colors';
import { Image } from 'expo-image'
import ApisPath from '../../lib/ApisPath/ApisPath';

const { height, width } = Dimensions.get('window');
const placholder = require('../../assets/images/imagePlaceholder.webp')


export default function ProfileMain(props) {

  const [user, setUser] = useState(null)
  const [loadImage, setLoadImage] = useState(false)
  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {

    const data = Settings.get('USER')
    try {
      if (data) {
        let d = JSON.parse(data)
        const result = await fetch(ApisPath.ApiGetProfile, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + d.token
          }
        })

        if (result) {
          let json = await result.json()
          if (json.status === true) {
            console.log('user profile is', json.data)
            setUser(json.data)
          }
          else {
            console.log('json message is', json.message)
          }
        }
      }
    } catch (error) {
      console.log('error finding in get profile', error)
    }

  }

  const logoutUser = async () => {
    console.log('trying to logout')
    try {
      Settings.set({ USER: null })
      props.navigation.navigate('LoginUser')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <SafeAreaView style={{ alignItems: 'center' }}>
      <View style={{ height: height, width: width - 60, alignItems: 'center' }}>
        <View style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 60, alignSelf: 'center',
        }}>
          <Text style={{ fontSize: 22, }}>Profile</Text>
          <TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <Text style={{ color: colors.blueColor, fontSize: 14 }}>Public view</Text>
              <Image source={require('../../assets/images/profileView.png')}
                style={{ height: 20 / 930 * height, width: 20 / 930 * height, resizeMode: 'contain', }}
              />
            </View>
          </TouchableOpacity>
        </View>

        <Image source={user && user.profile_image ? { uri: user.profile_image } : placholder}
          onLoadStart={() => {
            setLoadImage(true)
          }}
          onLoadEnd={() => {
            setLoadImage(false)
          }}
          style={{ height: 110 / 930 * height, width: 110 / 930 * height, borderRadius: 55, marginTop: 25 / 930 * height }}
        />
        {
          loadImage && <ActivityIndicator size={'small'} color={colors.blueColor} style={{ marginTop: -115 / 930 * height, height: 110 }} />
        }

        <Text style={{ fontSize: 18, marginTop: 10 }}>
          {user && user.first_name} {user && user.last_name}
        </Text>

        <View style = {{alignItems:'center',height:height*0.61, marginTop: 20 / 930 * height, }}>

          <ScrollView style={{}} showsVerticalScrollIndicator = {false}>
            <View style={{ flexDirection: 'column', gap: 10, alignItems: 'center', }}>
              <TouchableOpacity 
                onPress={()=>{
                  props.navigation.navigate('MyAccount')
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

              <TouchableOpacity>
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

              <TouchableOpacity>
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

              <TouchableOpacity>
                <View style={styles.mainView}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image source={require('../../assets/images/interest.png')}
                      style={styles.imageStyle}
                    />
                    <Text style={styles.text}>
                      Interest
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

              <TouchableOpacity>
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
                onPress={logoutUser}
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
              <View style={{height:40}}></View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
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
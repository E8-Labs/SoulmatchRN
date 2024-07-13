import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, ActivityIndicator, FlatList, SectionList } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import ApisPath from '../../lib/ApisPath/ApisPath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import customFonts from '../../assets/fonts/Fonts';
import colors from '../../assets/colors/Colors';
import fonts from 'fonts';
import moment from 'moment';


const { height, width } = Dimensions.get('window')
const likeNotImage = require('../../assets/images/likeNotification.png');
const inviteNotImage = require('../../assets/images/inviteNotification.png');
const placholder = require('../../assets/images/imagePlaceholder.webp')

export default function NotificationsScreen({ navigation }) {

  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [sections, setSections] = useState([])

  useEffect(() => {
    getNotifications()
  }, [])

  useEffect(() => {
    console.log('sections are ', sections)
  }, [sections])

  const getNotifications = async () => {
    console.log('trying to get notifications')
    setLoading(true)
    const data = await AsyncStorage.getItem("USER")

    try {
      if (data) {
        let d = JSON.parse(data)
        const result = await fetch(ApisPath.ApiGetNotifications + `?offset=${notifications.length}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + d.token
          },
        })
        if (result) {
          setLoading(false)
          let json = await result.json()
          if (json.status === true) {
            console.log('user notifications are', json.data)
            setNotifications([...notifications, ...json.data])
            formateNotifications([...notifications, ...json.data])

          } else {
            console.log('json message is', json.message)
          }
        }
      }
    } catch (error) {
      console.log('error finding in get notifications', error)
    }
  }


  const formateNotifications = (notArray) => {
    let today = [];
    let yesterday = [];
    let earlier = [];

    let currentdate = new Date();
    let yesterdayDate = new Date();
    yesterdayDate.setDate(currentdate.getDate() - 1);

    for (let i = 0; i < notArray.length; i++) {
      if (notArray[i] && notArray[i].createdAt) {
        let createdAt = new Date(notArray[i].createdAt);

        if (currentdate.toDateString() === createdAt.toDateString()) {
          today.push(notArray[i]);
        } else if (yesterdayDate.toDateString() === createdAt.toDateString()) {
          yesterday.push(notArray[i]);
        } else {
          earlier.push(notArray[i]);
        }
      } else {
        console.log(`Notification at index ${i} is undefined or has no createdAt property.`);
      }
    }

    console.log('today notifications are ', today)
    console.log('yesterday notifications are ', yesterday)
    console.log('earlier notifications are ', earlier)


    const section = [



    ];
    if (today.length > 0) {
      section.push({ title: 'Today', data: today },)
    }
    if (yesterday.length > 0) {
      section.push({ title: 'Yesterday', data: yesterday })
    }
    if (earlier.length > 0) {
      section.push({ title: 'Earlier', data: earlier })
    }
    setSections(section)
  };


  const getNotificationType = (item) => {
    if (item.notification_type === 'Like') {
      let not = {
        image: likeNotImage,
        message: "Check it out! Someone likes your profile ",
        time: item.createdAt,
        read: item.is_read,
        type: item.notification_type
      }
      // console.log('notification type data is', not)
      return not
    } else if (item.notification_type === 'Match') {
      let not = {
        image: item.fromUser !== null ? item.fromUser.profile_image : placholder,
        message: "Congratulations! New match.",
        time: item.createdAt,
        read: item.is_read,
        type: item.notification_type
      }
      // console.log('notification type data is', not)
      return not

    } else if (item.notification_type === 'Message') {
      let not = {
        image: item.fromUser !== null ? item.fromUser.profile_image : placholder,
        message: `${item.fromUser.first_name} ${item.fromUser.last_name} sent you a message.`,
        time: item.createdAt,
        read: item.is_read,
        type: item.notification_type
      }
      // console.log('notification type data is', not)
      return not

    } else if (item.notification_type === 'DateInvite') {
      let not = {
        image: inviteNotImage,
        message: 'You are invited to a date.',
        time: item.createdAt,
        read: item.is_read,
        type: item.notification_type
      }
      // console.log('notification type data is', not)
      return not

    } else if (item.notification_type === 'Dislike') {
      let not = {
        image: likeNotImage,
        message: 'Check it out! Someone dislikes your profile .',
        time: item.createdAt,
        read: item.is_read,
        type: item.notification_type
      }
      // console.log('notification type data is', not)
      return not

    }
    else if (item.notification_type === 'NewUser') {
      let not = {
        image: item.fromUser !== null ? item.fromUser.profile_image : placholder,
        message: 'New user registered.',
        time: item.createdAt,
        read: item.is_read,
        type: item.notification_type
      }
      // console.log('notification type data is', not)
      return not

    } else if (item.notification_type === 'DateInviteToAdmin') {
      let not = {
        image: inviteNotImage,
        message: 'New date scheduled.',
        time: item.createdAt,
        read: item.is_read,
        type: item.notification_type
      }
      // console.log('notification type data is', not)
      return not

    } else if (item.notification_type === 'ReportedUser') {
      let not = {
        image: item.fromUser !== null ? item.fromUser.profile_image : placholder,
        message: 'New user reported.',
        time: item.createdAt,
        read: item.is_read,
        type: item.notification_type
      }
      // console.log('notification type data is', not)
      return not

    }
    else {
      console.log('other notification type', item.notification_type)
    }
  }


  const renderItem = (item) => {
    console.log('trying to render items', item.fromUser != null ? item.fromUser.profile_image : placholder)
    let not = getNotificationType(item)
    console.log('notification object is', not)
    // return

    return (
      <TouchableOpacity>
        <View style={{
          flexDirection: 'row', alignItems: 'cemter', justifyContent: 'space-between',
          marginTop: 25 / 930 * height,
        }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
            <Image source={
              not.type === "Like" || not.type === "Dislike" || not.type === "DateInvite" || not.type === "NewUser" || not.type === "DateInviteToAdmin" ||
                not.type === "DateInviteToAdmin" || not.type === "ReportedUser" ? (
                not.image
              ) : (
                { uri: not.image }
              )}
              style={{ height: 46 / 930 * height, width: 46 / 930 * height, borderRadius: 23 }}
            />
            <Text style={{ fontSize: 14, width: 250 / 930 * height }}>{not.message}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, alignSelf: 'center' }}>
            {/* {
              not.read === false ? (
                <Image source={require('../../assets/images/unread.png')}
                  style={{ height: 6, width: 6 }}
                />
              ) : null
            } */}

            <Text>{moment(item.createdAt).format("hh:mm a")}</Text>
          </View>
        </View>
      </TouchableOpacity>

    )

  }




  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={{ alignItems: 'center', height: height, width: width, backgroundColor: 'white' }}>
        <View style={{ width: width - 60 / 430 * width, flexDirection: 'row', alignItems: 'center', gap: 20 / 430 * width }}>
          <TouchableOpacity onPress={() => {
            navigation.goBack()
          }}>
            <View style={GlobalStyles.backBtn}>
              <Image source={require('../../assets/images/backArrow.png')}
                style={GlobalStyles.backBtnImage}
              />
            </View>
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontFamily: customFonts.meduim }}>Notifications</Text>
        </View>
        <View style={{ height: height * 0.85 }}>
          {
            sections && sections.length > 0 ? (
              <SectionList
                showsVerticalScrollIndicator={false}
                sections={sections}
                style={{ backgroundColor: 'transparent', }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  renderItem(item)
                )}
                renderSectionHeader={({ section: { title } }) => (
                  // sections.data ? (
                  <View style={{
                    width: width - 40, flexDirection: 'row', height: 60, paddingTop: 30 / 930 * height, backgroundColor: '#fff', alignItems: 'center',
                    gap: 10,
                  }}>
                    <Text style={{ fontSize: 14, color: '#999999' }}>{title}</Text>
                    <View style={[GlobalStyles.divider, { marginTop: 0 }]}></View>
                  </View>
                  // ):null
                )}
                ListEmptyComponent={() => (
                  <View style={{ padding: 10 }}>
                    <Text>No notifications</Text>
                  </View>
                )}
                onEndReached={getNotifications}
                onEndReachedThreshold={.1}
                ListFooterComponent={() => {
                  return (

                    <View style={{ height: 60, width: "90%", alignItems: 'center', justifyContent: 'center' }}>
                      {
                        loading && (
                          <ActivityIndicator size={'large'} style={{ alignSelf: 'center' }} color={colors.blueColor} />
                        )
                      }
                    </View>
                  )
                }}
              />
            ) : (
              <View style={{ padding: 10, height: height * 0.8, justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>No notifications</Text>
              </View>
            )
          }
        </View>


      </View>
    </SafeAreaView>
  )
}
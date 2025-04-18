import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
  AppState,
} from "react-native";
import { Image } from "expo-image";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { UpdateProfile } from "../../Services/ProfileServices/UpdateProfile";

import DiscoverMain from "./DiscoverMain";
import MessageMain from "./MessageMain";
import DatesMain from "./DatesMain";
import ProfileMain from "./ProfileMain";
import DatesContainer from "../DatesFlow/DatesContainer";
import MessagesList from "../ChatFlow/MessagesList";
import { getProfile } from "../../Services/ProfileServices/GetProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Purchases from "react-native-purchases";
import { Pusher } from "@pusher/pusher-websocket-react-native";

const Tab = createBottomTabNavigator();

const { height, width } = Dimensions.get("window");

const tab1 = require("../../assets/images/tab1.png");
const tab2 = require("../../assets/images/tab2.png");
const tab3 = require("../../assets/images/tab3.png");
const tab4 = require("../../assets/images/tab4.png");

const actDicsover = require("../../assets/images/activeDiscover.png");
const dicsover = require("../../assets/images/discover.png");
const activeMessage = require("../../assets/images/activeMessage.png");
const message = require("../../assets/images/message.png");
const actDates = require("../../assets/images/activeDates.png");
const dates = require("../../assets/images/dates.png");
const actProfile = require("../../assets/images/activeProfile.png");
const profile = require("../../assets/images/profile.png");

const getBgImage = (index) => {
  if (index === 0) {
    return tab1;
  } else if (index === 1) {
    return tab2;
  } else if (index === 2) {
    return tab3;
  } else if (index === 3) {
    return tab4;
  }
};

const getMarginLeft = (index) => {
  if (index === 0) {
    return (25 / 430) * width;
  } else if (index === 1) {
    return (11 / 430) * width;
  }
};

const getMarginRight = (index) => {
  if (index === 2) {
    return (13 / 430) * width;
  } else if (index === 3) {
    return (25 / 430) * width;
  }
};
const getImage = (index, isFocused) => {
  if (index === 0) {
    if (isFocused) {
      return actDicsover;
    }
    return dicsover;
  } else if (index === 1) {
    if (isFocused) {
      return activeMessage;
    }
    return message;
  } else if (index === 2) {
    if (isFocused) {
      return actDates;
    }
    return dates;
  } else if (index === 3) {
    if (isFocused) {
      return actProfile;
    }
    return profile;
  }
};

function MyTabBar({ state, descriptors, navigation }) {
  // console.log("State of tabbar is ", state)
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "transparent",
        height: (90 / 930) * height,
      }}
    >
      <ImageBackground
        source={getBgImage(state.index)}
        style={{
          flex: 1,
          backgroundColor: "transparent",
          marginTop: -10,
          resizeMode: "contain",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "flex-end",
          height: (116 / 930) * height,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Image
                  source={getImage(index, isFocused)}
                  style={{
                    width: isFocused ? 64 : 48,
                    marginRight: getMarginRight(index),
                    height: isFocused ? 64 : 48,
                    marginLeft: getMarginLeft(index),
                    // marginBottom: isFocused ? 50 / 930 * height : 15 / 930 * height
                  }}
                ></Image>
                <Text
                  style={{
                    color: isFocused ? "#673ab7" : "#222",
                    marginBottom: (40 / 930) * height,
                    marginRight: getMarginRight(index),
                    marginTop: isFocused ? (35 / 930) * height : 0,
                    fontSize: 12,
                    marginLeft: getMarginLeft(index),
                    fontWeight: "400",
                  }}
                >
                  {isFocused ? label : ""}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ImageBackground>
    </View>
  );
}

export default function TabBarContainer(props) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState([]);
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();

  // user deleted or suspent event receive code

  useEffect(() => {
    const pusher = Pusher.getInstance();

    let channel = "";
    const subscribeEvent = async () => {
      await pusher.init({
        apiKey: "404f727e86e2044ed1f4",
        cluster: "us3",
      });
      const user = await AsyncStorage.getItem("USER");
      if (user) {
        let u = JSON.parse(user);
        channel = `UserDeletedSuspended-${u.user.id}`;
        await pusher.connect();
        await pusher.subscribe({
          channelName: channel,
          onEvent: (event) => {
            console.log("event tabbar ", event);
            if (event.eventName === "deleted") {
              Alert.alert(
                "Account deleted",
                "Your account has been deleted by admin",
                [
                  {
                    text: "Logout",
                    onPress: () => {
                      AsyncStorage.removeItem("USER");
                      props.navigation.reset({
                        index: 0,
                        routes: [{ name: "LoginUser" }],
                      });
                    },
                  },
                ]
              );
            } else if (event.eventName === "suspended") {
              Alert.alert(
                "Account suspended",
                "Your account has been suspended by admin",
                [
                  {
                    text: "Logout",
                    onPress: async () => {
                      await AsyncStorage.removeItem("USER");
                      console.log("user suspended");
                      props.navigation.replace("SplashMainScreen");
                      // props.navigation.reset({
                      //     index:0,
                      //     routes: [{ name: 'LoginUser' }],
                      // })
                    },
                  },
                ]
              );
            }
          },
        });
      }
    };
    subscribeEvent();

    return () => {
      pusher.subscribe(channel);
      pusher.disconnect();
    };
  }, []);

  useEffect(() => {
    refreshSubscriptionStatus();
  }, []);

  // useEffect(() => {
  //     const subscription = Notifications.addNotificationResponseReceivedListener(response => {
  //         const notData = response.notification.request.content.data;

  //         // alert("notification data is", data)
  //         console.log(("notification data is", notData))
  //         let data = notData.notification
  //         let additionalData = notData.additional;
  //         if (data.type) {
  //             switch (data.type) {
  //                 case 'Like':
  //                     props.navigation.navigate("LikesList");
  //                     break;
  //                 case 'Message':
  //                     props.navigation.navigate("ChatScreen", {
  //                         data: {
  //                             chat: additionalData,
  //                             from: 'Notification',

  //                         },
  //                         LastMessage: ()=>{console.log("Here")}
  //                     });
  //                     break;
  //                 case 'Match':
  //                     props.navigation.navigate("GotMatch", {
  //                         data: {
  //                             user: additional
  //                         }
  //                     });
  //                     break;
  //                 case 'DateInvite':
  //                     props.navigation.navigate("NotificationsScreen");
  //                     break;
  //                 case 'Dislike':
  //                     props.navigation.navigate("NotificationsScreen");
  //                     break;
  //                 case 'NewUser':
  //                     props.navigation.navigate("NotificationsScreen");
  //                     break;
  //                 case 'DateInviteToAdmin':
  //                     props.navigation.navigate("NotificationsScreen");
  //                     break;
  //                 case 'ReportedUser':
  //                     props.navigation.navigate("NotificationsScreen");
  //                     break;

  //                 default:
  //                     console.warn('Unknown notification type');
  //             }
  //         }
  //     });

  //     return () => subscription.remove();
  // }, []);
  useEffect(() => {
    const getUserProfile = async () => {
      console.log("trying to get pro");
      try {
        let userData = await AsyncStorage.getItem("USER");
        let data = JSON.parse(userData);
        if (data) {
          console.log("user profile on dashboard is", data.user.subscription);
          // if(!data.user.subscription.isSubscribed){
          //     props.navigation.navigate("SubscriptionPlan")
          // }
          // try {
          //     const customerInfo = await Purchases.getCustomerInfo();
          //     Purchases.addCustomerInfoUpdateListener((info) => {
          //         console.log("Listner info user ", info)
          //         checkSubscriptionStatus(info)
          //     });
          //     console.log("Customer on Tabbar", customerInfo.entitlements.active["premium"])
          //     checkSubscriptionStatus(customerInfo)
          //     // access latest customerInfo
          //   } catch (e) {
          //     // Error fetching customer info
          //   }
          refreshSubscriptionStatus();
        }
      } catch (e) {
        console.log("error in get profile", e);
      }
    };
    getUserProfile();
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const notData = response.notification.request.content.data;

        console.log("notification data is", notData);
        let data = notData.notification;
        let additionalData = notData.additional;
        if (data && data.type) {
          handleNotification(data, additionalData);
        }
      }
    );

    return () => subscription.remove();
  }, []);

  const handleAppStateChange = async (nextAppState) => {
    console.log("Appstate changed ", nextAppState);
    if (nextAppState === "active") {
      await refreshSubscriptionStatus();
    }
  };

  function checkSubscriptionStatus(info) {
    if (typeof info.entitlements.active["premium"] != "undefined") {
      console.log(
        "User subscribed to plan Tabbar",
        info.entitlements.active["premium"]
      );
    } else {
      console.log("User not subscribed");
      props.navigation.navigate("SubscriptionPlan");
    }
  }

  const refreshSubscriptionStatus = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      Purchases.addCustomerInfoUpdateListener((info) => {
        console.log("Listner info user ", info);
        checkSubscriptionStatus(info);
      });
      checkSubscriptionStatus(customerInfo);
    } catch (e) {
      console.error("Error fetching customer info", e);
    }
  };

  const handleNotification = (data, additionalData) => {
    switch (data.type) {
      case "Like":
        props.navigation.navigate("LikesList");
        break;
      case "Message":
        props.navigation.navigate("ChatScreen", {
          data: {
            chat: additionalData,
            from: "Notification",
          },
          LastMessage: () => {
            console.log("Here");
          },
        });
        break;
      case "Match":
        props.navigation.navigate("GotMatch", {
          data: {
            user: additionalData,
          },
        });
        break;
      case "DateInvite":
      case "Dislike":
      case "NewUser":
      case "DateInviteToAdmin":
      case "ReportedUser":
        props.navigation.navigate("NotificationsScreen");
        break;
      default:
        console.warn("Unknown notification type");
    }
    // Clear the notification response after handling
    Notifications.dismissAllNotificationsAsync();
  };

  useEffect(() => {
    getNotificationPermission();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token)
    );

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const getNotificationPermission = async () => {
    console.log("enter in function");
    registerForPushNotificationsAsync().then(async (token) => {
      if (token) {
        setExpoPushToken(token);
      }
      console.log("token", token);
      // Alert.alert("fcm token is ",token )
      let body = JSON.stringify({
        fcm_token: token,
      });
      try {
        await UpdateProfile(body);
      } catch (error) {
        console.error("Error updating profile:", error);
        setError("Failed to update profile.");
      }
    });
  };

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here", test: { test1: "more data" } },
      },
      trigger: { seconds: 2 },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        // alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      // EAS projectId is used here.
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error("Project ID not found");
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(token);
      } catch (e) {
        token = `${e}`;
      }
    } else {
      //   alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  return (
    <Tab.Navigator
      initialRouteName="DiscoverMain"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "transparent" },
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="Discover"
        component={DiscoverMain}
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/activeDiscover.png")}
              style={styles.image}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesList}
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/activeDiscover.png")}
              style={styles.image}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Dates"
        component={DatesContainer}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/activeDiscover.png")}
              style={styles.image}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileMain}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/activeDiscover.png")}
              style={styles.image}
            />
          ),
        }}
      />
    </Tab.Navigator>
    // </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  },
});

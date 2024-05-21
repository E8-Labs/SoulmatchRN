import React from 'react'
import { View, Image, TouchableOpacity, Text, Dimensions } from 'react-native'
// import messaging from '@react-native-firebase/messaging';
const AllowNotification = ({ navigation }) => {


//     const requestUserPermission = async () => {
//         const authStatus = await messaging().requestPermission();
//         const enabled =
//             authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//             authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//         if (enabled) {
//             console.log("Authorization status:", authStatus);
//         }
//     };

//     AllowNot = () => {

//         if (requestUserPermission()) {
//             messaging()
//                 .getToken()
//                 .then(
//                     token => console.log(token)
//                 );
//         }
    

//     // Set up the notification handler for the app
//     Notifications.setNotificationHandler({
//         handleNotification: async () => ({
//             shouldShowAlert: true,
//             shouldPlaySound: true,
//             shouldSetBadge: false,
//         }),
//     });

//     // Handle user clicking on a notification and open the screen
//     const handleNotificationClick = async (response) => {
//         const screen = response?.notification?.request?.content?.data?.screen;
//         if (screen !== null) {
//             navigation.navigate(screen);
//         }
//     };

//     // Listen for user clicking on a notification
//     const notificationClickSubscription =
//         Notifications.addNotificationResponseReceivedListener(
//             handleNotificationClick
//         );

//     // Handle user opening the app from a notification (when the app is in the background)
//     messaging().onNotificationOpenedApp((remoteMessage) => {
//         console.log(
//             "Notification caused app to open from background state:",
//             remoteMessage.data.screen,
//             navigation
//         );
//         if (remoteMessage?.data?.screen) {
//             navigation.navigate(`${remoteMessage.data.screen}`);
//         }
//     });

//     // Check if the app was opened from a notification (when the app was completely quit)
//     messaging()
//         .getInitialNotification()
//         .then((remoteMessage) => {
//             if (remoteMessage) {
//                 console.log(
//                     "Notification caused app to open from quit state:",
//                     remoteMessage.notification
//                 );
//                 if (remoteMessage?.data?.screen) {
//                     navigation.navigate(`${remoteMessage.data.screen}`);
//                 }
//             }
//         });

//     // Handle push notifications when the app is in the background
//     messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//         console.log("Message handled in the background!", remoteMessage);
//         const notification = {
//             title: remoteMessage.notification.title,
//             body: remoteMessage.notification.body,
//             data: remoteMessage.data, // optional data payload
//         };

//         // Schedule the notification with a null trigger to show immediately
//         await Notifications.scheduleNotificationAsync({
//             content: notification,
//             trigger: null,
//         });
//     });

//     // Handle push notifications when the app is in the foreground
//     const handlePushNotification = async (remoteMessage) => {
//         const notification = {
//             title: remoteMessage.notification.title,
//             body: remoteMessage.notification.body,
//             data: remoteMessage.data, // optional data payload
//         };

//         // Schedule the notification with a null trigger to show immediately
//         await Notifications.scheduleNotificationAsync({
//             content: notification,
//             trigger: null,
//         });
//     };

//     // Listen for push notifications when the app is in the foreground
//     const unsubscribe = messaging().onMessage(handlePushNotification);

//     // Clean up the event listeners
//     return () => {
//         unsubscribe();
//         notificationClickSubscription.remove();
//     };
// };





const { height, width } = Dimensions.get('window')
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
                <Image source={require('../../assets/notification.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
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
                <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
            </View>
            <View style={{ display: 'flex', height: height * 0.78, flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ marginTop: 40 / 930 * height }}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>
                        Allow notifications
                    </Text>
                    <View style={{ marginTop: 150 / 930 * height, display: 'flex', alignItems: 'center' }}>
                        <Image source={require('../../assets/notification.png')} style={{ height: 160 / 930 * height, width: 160 / 430 * width }} />
                        <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333', marginTop: 20 / 930 * height }}>
                            Please allow us to send you
                        </Text>
                        <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333' }}>
                            notifications
                        </Text>
                    </View>
                </View>


                <View>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                // AllowNot()
                                navigation.navigate('PackagePlan');
                                // handlePopup();
                            }}
                            style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                Allow
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20 / 930 * height, width: '100%', display: 'flex', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                
                                navigation.navigate('PackagePlan');
                            }}
                            style={{ height: 54 / 930 * height, width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                            <Text style={{ color: '#666666', fontWeight: '500', fontSize: 18 }}>
                                Not now
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </View>
)
}

export default AllowNotification

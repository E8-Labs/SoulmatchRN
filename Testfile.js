import { useCallback, useEffect ,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions ,Platform,Settings} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import RegisterUser from './Screens/LoginFlow/RegisterUser';
import SplashMainScreen from './Screens/SplashFlow/SplashMainScreen';
import SlideScreen1 from './Screens/SplashFlow/SlideScreens/SlideScreen1';
import SlideScreen2 from './Screens/SplashFlow/SlideScreens/SlideScreen2';
import SlideScreen3 from './Screens/SplashFlow/SlideScreens/SlideScreen3';
import SlideContainer from './Screens/SplashFlow/SlideScreens/SlideContainer';
import LoginUser from './Screens/LoginFlow/LoginUser';
import GetEmail from './Screens/ForgotPasswordFlow/GetEmail'; 4
import ResetPassword from './Screens/ForgotPasswordFlow/ResetPassword'
import EmailVerification from './Screens/ForgotPasswordFlow/EmailVerification';
import SuccessfullyPasswordChanged from './Screens/ForgotPasswordFlow/SuccessfullyPasswordChanged';
// import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabBarContainer from './Screens/TabNavigation/TabBarContainer';
import Testfile from './Testfile';
import CardContainerMain from './Screens/DiscoverFlow/CardSwipContainer/CardContainerMain';
import ProfileDetail from './Screens/DiscoverFlow/ProfileDetail';
import LikesList from './Screens/DiscoverFlow/LikesList';
import FilterPopup from './Components/FilterPopup';
import DiscoverGotMatch from './Components/DiscoverGotMatch';
import GotMatch from './Screens/DiscoverFlow/GotMatch';
import MessagesList from './Screens/ChatFlow/MessagesList';
import ChatScreen from './Screens/ChatFlow/ChatScreen';
import ReportChat from './Components/ReportChat';
import DatesContainer from './Screens/DatesFlow/DatesContainer';
import SelectedDateDetails from './Screens/DatesFlow/SelectedDateDetails';
import ReserveNightScreen from './Screens/DatesFlow/ReserveNightScreen';
import InviteDatePopup from './Components/InviteDatePopup';
import PlanDateNight from './Screens/DatesFlow/PlanDateNight';
import InviteDateFromChatScreen from './Screens/ChatFlow/InviteDateFromChatScreen';

import Addlocation from './Components/completeprofile/AddLocation';
import Allownotification from './Components/completeprofile/AllowNotification';
import Packageplan from './Components/completeprofile/PackagePlan';
import CreatePassword from './Components/createprofile/CreatePassword';

import UploadIntroVideo from './Components/completeprofile/UploadIntroVideo';
import UploadMedia from './Components/completeprofile/UploadMedia';
import AddZodiac from './Components/completeprofile/AddZodiac';
import CongratsScreen from './Components/createprofile/CongratsScreen';
import ProfileEmailVerification from './Components/createprofile/ProfileEmailVerification';
import AddEmail from './Components/createprofile/AddEmail';
import UploadImage from './Components/createprofile/UploadImage';
import AddJobDetails from './Components/completeprofile/AddJobDetails';
import AddSchool from './Components/completeprofile/AddSchool';
import AddGender from './Components/completeprofile/AddGender';
import AddAge from './Components/completeprofile/AddAge';
import AddName from './Components/createprofile/AddName';
import EnhancementQuestions from './Components/completeprofile/EnhancmentQuestions';
import EnhancmentQuestions from './Components/completeprofile/EnhancmentQuestions';
import AddLocation from './Components/completeprofile/AddLocation';
import AllowNotification from './Components/completeprofile/AllowNotification';
import PackagePlan from './Components/completeprofile/PackagePlan';
import GetInterest from './Components/completeprofile/GetInterest';
import AddHeight from './Components/completeprofile/AddHeight';
import CongratulationsScreen from './Components/completeprofile/CongratulationsScreen';
import SelectedProfile from './Screens/DiscoverFlow/SelectedProfile';
import MyAccount from './Screens/ProfileFlow/MyAccount';
import AccountDetails from './Screens/ProfileFlow/AccountDetails';
import ChangePassword from './Screens/ProfileFlow/ChangePassword';
import ChangeIntroVideo from './Screens/ProfileFlow/ChangeIntroVideo';

import Resources from './Components/Resources/Resources';
import SelectedResourceDetails from './Components/Resources/SelectedResourceDetails';
import NotificationsScreen from './Screens/NotificationsFlow/NotificationsScreen';


import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import ApisPath from './lib/ApisPath/ApisPath';
import colors from './assets/colors/Colors';
import { useFonts, Poppins_400Regular as PoppinsRegular, Poppins_500Medium, Poppins_700Bold as PoppinsBold } from '@expo-google-fonts/poppins';


const { screenHeight, screenWidth } = Dimensions.get('window');
const Stack = createNativeStackNavigator();



import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';


import AdminTabBarContainer from './Screens/Admin/adminflow/TabBar/AdminTabBarContainer';
import AddDate from './Screens/Admin/ui/AdminDatesflow/AddDate';
import DateDetails from './Screens/Admin/ui/AdminDatesflow/DateDetails';
import AdminAccountDetails from './Screens/Admin/ui/ProfileDetails/AdminAccountDetails';
import AdminChangePassword from './Screens/Admin/ui/ProfileDetails/AdminChangePassword';
import FlaggedUsers from './Screens/Admin/ui/userDetails/FlaggedUsers';
import UserProfileDetails from './Screens/Admin/ui/userDetails/UserProfileDetails';
import AddressPicker from './Screens/Admin/ui/Addresspicker/AddressPicker';
import FlaggedUSerDetails from './Screens/Admin/ui/userDetails/FlaggedUSerDetails';
// import TestDatePicker from './Screens/Admin/ui/test/TestDatePicker';
// import TestAddDate from './Screens/Admin/ui/test/TestAddDate';
import AdminNotifications from './Screens/Admin/ui/Dashboarddetails/AdminNotifications';
import VideoPlayer from './Components/VideoPlayer';



export default function App() {
  console.log("Font path log")
  console.log(require('./assets/fonts/Poppins-Bold.ttf'));
console.log('Font Path Log End')

  const [fontsLoaded, fontError] = useFonts({
    "PoppinsRegular": require('./assets/fonts/Poppins-Regular.ttf'),
    // "PoppinsBold": require('./assets/fonts/Poppins-Bold.ttf'),
    // "PoppinsMedium": require('./assets/fonts/Poppins-Medium.ttf'),
    // "PoppinsSemiBold": require('./assets/fonts/Poppins-SemiBold.ttf'),

  })

  useEffect(() => {
    if (fontsLoaded || fontError) {
      console.log("Loading fonts ", fontsLoaded)
      console.log("Font error ", fontError)
    }
  }, [fontsLoaded, fontError])


  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(()=>{
    getNotificationPermission()
  },[])
  const updateProfile = async (token) => {
    console.log('trying to update profile', token)
    const data = await AsyncStorage.getItem("USER")
    try {
        if (data) {
            let d = JSON.parse(data)
            let body = JSON.stringify({
                fcm_token: token
            })
            console.log('boddy is ', body)
            // return

            const result = await fetch(ApisPath.ApiUpdateProfile, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + d.token
                },
                body: body
            })
            if (result) {
                let json = await result.json()
                if (json.status === true) {
                    // console.log('updated profile data is', json.data)
                    d.user=json.data
                               AsyncStorage.setItem("USER",JSON.stringify(d))

                    // navigation.navigate("CongratulationsScreen")
                } else {
                    console.log('json message is', json.message)
                }
            }
        }

    } catch (error) {
        console.log('error finding in update profile', error)
    }
}


  const getNotificationPermission = () => {

    console.log('enter in function')
    registerForPushNotificationsAsync().then(
        (token) => {
            if (token) {
                setExpoPushToken(token)
            }
            console.log('token', token)
            updateProfile(token)
        }
    );
}


async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for  notification!');
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
                throw new Error('Project ID not found');
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
        // alert('Must use physical device for  Notifications');
    }

    return token;
}

  async function TestPusher() {
    const pusher = Pusher.getInstance();

    await pusher.init({
      apiKey: "404f727e86e2044ed1f4",
      cluster: "us3"
    });

    await pusher.connect();
    await pusher.subscribe({
      channelName: "my-channel",
      onEvent: (event) => {
        console.log(`Event received: ${event}`);
      }
    });
  }



  useEffect(() => {
    // useCallback(()=>{
      //  TestPusher()
    // })
  })

 


  if (!fontsLoaded && !fontError) {
    return (

      <View>
        <Text>Loading Fonts</Text>
      </View>
    )
  } else {

    return (

      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashMainScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashMainScreen" component={SplashMainScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="SlideContainer" component={SlideContainer} options={{ gestureEnabled: false, headerShown: false }}/>
          <Stack.Screen name="RegisterUser" component={RegisterUser} options={{ gestureEnabled: false }} />
          <Stack.Screen name="LoginUser" component={LoginUser} options={{ gestureEnabled: false }} />
          <Stack.Screen name="GetEmail" component={GetEmail} options={{ gestureEnabled: false }} />
          <Stack.Screen name="EmailVerification" component={EmailVerification} options={{ gestureEnabled: false }} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ gestureEnabled: false }} />
          <Stack.Screen name="SuccessfullyPasswordChanged" component={SuccessfullyPasswordChanged} options={{ gestureEnabled: false }} />
          <Stack.Screen name="TabBarContainer" component={TabBarContainer} options={{ gestureEnabled: false }} />
          <Stack.Screen name="CardContainerMain" component={CardContainerMain} options={{ gestureEnabled: false }} />
          <Stack.Screen name="LikesList" component={LikesList} options={{ gestureEnabled: false }} />
          <Stack.Screen name="ProfileDetail" component={ProfileDetail} options={{ gestureEnabled: false }} />
          <Stack.Screen name="FilterPopup" component={FilterPopup} options={{ gestureEnabled: false }} />
          <Stack.Screen name="DiscoverGotMatch" component={DiscoverGotMatch} options={{ gestureEnabled: false }} />
          <Stack.Screen name="GotMatch" component={GotMatch} options={{ gestureEnabled: false }} />
          <Stack.Screen name="MessagesList" component={MessagesList} options={{ gestureEnabled: false }} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="ReportChat" component={ReportChat} options={{ gestureEnabled: false }} />
          <Stack.Screen name="DatesContainer" component={DatesContainer} options={{ gestureEnabled: false }} />
          <Stack.Screen name="SelectedDateDetails" component={SelectedDateDetails} options={{ gestureEnabled: false }} />
          <Stack.Screen name="ReserveNightScreen" component={ReserveNightScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="InviteDatePopup" component={InviteDatePopup} options={{ gestureEnabled: false }} />
          <Stack.Screen name="PlanDateNight" component={PlanDateNight} options={{ gestureEnabled: false }} />
          <Stack.Screen name="InviteDateFromChatScreen" component={InviteDateFromChatScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="SelectedProfile" component={SelectedProfile} options={{ gestureEnabled: false }} />

          {/* <Stack.Screen name='Signin' component={Signin} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='Signup' component={Signup} options={{ gestureEnabled: false, headerShown: false }} /> */}
          {/* <Stack.Screen name='ForgetPassword' component={Forgetpassword} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='EmailVerification' component={Emailverification} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='NewPassword' component={CreateNewPassword} options={{ gestureEnabled: false, headerShown: false }} /> */}
          <Stack.Screen name='UploadImage' component={UploadImage} />
          <Stack.Screen name='AddEmail' component={AddEmail} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='ProfileEmailverification' component={ProfileEmailVerification} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='AddName' component={AddName} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='CreatePassword' component={CreatePassword} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='CongratsScreen' component={CongratsScreen} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='UploadIntroVideo' component={UploadIntroVideo} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='UploadMedia' component={UploadMedia} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='AddZodiac' component={AddZodiac} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='AddAge' component={AddAge} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='AddGender' component={AddGender} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='AddSchool' component={AddSchool} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='AddJobDetails' component={AddJobDetails} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='GetInterest' component={GetInterest} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='AddHeight' component={AddHeight} options={{ gestureEnabled: false, headerShown: false }} />
          {/*add picker here*/}
          <Stack.Screen name='EnhancmentQuestions' component={EnhancmentQuestions} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='AddLocation' component={AddLocation} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='AllowNotification' component={AllowNotification} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='PackagePlan' component={PackagePlan} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='CongratulationsScreen' component={CongratulationsScreen} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='MyAccount' component={MyAccount} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='AccountDetails' component={AccountDetails} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='ChangePassword' component={ChangePassword} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='ChangeIntroVideo' component={ChangeIntroVideo} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='VideoPlayer' component={VideoPlayer} options={{ gestureEnabled: false, headerShown: false }} />


          <Stack.Screen name='Resources' component={Resources} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='SelectedResourceDetails' component={SelectedResourceDetails} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='NotificationsScreen' component={NotificationsScreen} options={{ gestureEnabled: false, headerShown: false }} />

          {/* <Stack.Screen name='Testfile' component={Testfile} options={{ gestureEnabled: false, headerShown: false }} /> */}


          <Stack.Screen name='AdminTabBarContainer' component={AdminTabBarContainer} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='AddNewDate' component={AddDate} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='DateDetails' component={DateDetails} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='AdminAccountDetails' component={AdminAccountDetails} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='AdminChangePassword' component={AdminChangePassword} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='FlaggedUsers' component={FlaggedUsers} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='UserProfileDetails' component={UserProfileDetails} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='AddressPicker' component={AddressPicker} options={{ gestureEnabled: false, headerShown: false }} />
          <Stack.Screen name='FlaggedUserDetails' component={FlaggedUSerDetails} options={{ gestureEnabled: false, headerShown: false }} />
          {/* <Stack.Screen name='DatePicker' component={TestDatePicker} options={{ gestureEnabled: false, headerShown: false }} /> */}
          {/* <Stack.Screen name='TestAddDate' component={TestAddDate} options={{ gestureEnabled: false, headerShown: false }} /> */}
          <Stack.Screen name='AdminNotifications' component={AdminNotifications} options={{ gestureEnabled: false, headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>

      // {/* <Testfile /> */}
      // <ProfileDetail/>
      // {/* <LikesList/> */}
      // <SplashMainScreen />
      // <SlideScreen3/>
      // <SplashMainScreen/>
      // <SlideContainer/>
      // <LoginUser/>
      // <RegisterUser/>
      // <GetEmail/>
      // <EmailVerification/>
      // <CreateNewPassword/>
      // <SuccessfullyPasswordChanged/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

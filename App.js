import { useCallback, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Dimensions } from 'react-native';






import RegisterUser from './Screens/LoginFlow/RegisterUser';
import SplashMainScreen from './Screens/SplashFlow/SplashMainScreen';
import SlideScreen1 from './Screens/SplashFlow/SlideScreens/SlideScreen1';
import SlideScreen2 from './Screens/SplashFlow/SlideScreens/SlideScreen2';
import SlideScreen3 from './Screens/SplashFlow/SlideScreens/SlideScreen3';
import SlideContainer from './Screens/SplashFlow/SlideScreens/SlideContainer';
import LoginUser from './Screens/LoginFlow/LoginUser';
import GetEmail from './Screens/ForgotPasswordFlow/GetEmail';
import EmailVerification from './Screens/ForgotPasswordFlow/EmailVerification';
import CreateNewPassword from './Screens/ForgotPasswordFlow/ResetPassword';
import SuccessfullyPasswordChanged from './Screens/ForgotPasswordFlow/SuccessfullyPasswordChanged';
import { useFonts } from 'expo-font';
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

// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();

const { screenHeight, screenWidth } = Dimensions.get('window');
const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    "PoppinsRegular": require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    "PoppinsBold": require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    "PoppinsMedium": require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
    "PoppinsSemiBold": require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),

  })


  useEffect(() => {
    if (fontsLoaded || fontError) {
      console.log("Loading fonts ", fontsLoaded)
      console.log("Font error ", fontError)
    }
  }, [fontsLoaded, fontError])


  if (!fontsLoaded && !fontError) {
    return (

      <View>
        <Text>Loading Fonts</Text>
      </View>
    )
  } else {

    return (

      <NavigationContainer>
        <Stack.Navigator initialRouteName="TabBarContainer" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashMainScreen" component={SplashMainScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="SlideContainer" component={SlideContainer} />
          <Stack.Screen name="RegisterUser" component={RegisterUser} options={{ gestureEnabled: false }} />
          <Stack.Screen name="LoginUser" component={LoginUser} options={{ gestureEnabled: false }} />
          <Stack.Screen name="GetEmail" component={GetEmail} options={{ gestureEnabled: false }} />
          <Stack.Screen name="EmailVerification" component={EmailVerification} options={{ gestureEnabled: false }} />
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
          <Stack.Screen name='UploadImage' component={UploadImage} options={{ gestureEnabled: false, headerShown: false }} />
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
          <Stack.Screen name='Testfile' component={Testfile} options={{ gestureEnabled: false, headerShown: false }} />

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

import { useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';
import RegisterUser from './Screens/LoginFlow/RegisterUser';
import SplashMainScreen from './Screens/SplashFlow/SplashMainScreen';
import SlideScreen1 from './Screens/SplashFlow/SlideScreens/SlideScreen1';
import SlideScreen2 from './Screens/SplashFlow/SlideScreens/SlideScreen2';
import SlideScreen3 from './Screens/SplashFlow/SlideScreens/SlideScreen3';
import SlideContainer from './Screens/SplashFlow/SlideScreens/SlideContainer';
import LoginUser from './Screens/LoginFlow/LoginUser';
import GetEmail from './Screens/ForgotPasswordFlow/GetEmail';
import EmailVerification from './Screens/ForgotPasswordFlow/EmailVerification';
import CreateNewPassword from './Screens/ForgotPasswordFlow/CreateNewPassword';
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

// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();

const { screenHeight, screenWidth } = Dimensions.get('window');
const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    "PoppinsRegular": require('./assets/fonts/Poppins/Poppins-Regular.ttf') ,
    "PoppinsBold": require('./assets/fonts/Poppins/Poppins-Bold.ttf') ,
    "PoppinsMedium": require('./assets/fonts/Poppins/Poppins-Medium.ttf'), 
    "PoppinsSemiBold": require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'), 

})

 useEffect(()=>{
  if (fontsLoaded || fontError) {
     console.log(fontsLoaded)
     console.log(fontError)
  }
 },[fontsLoaded,fontError])
    

  if (!fontsLoaded && !fontError) {
    return 
  } else {

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="MessagesList" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashMainScreen" component={SplashMainScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="SlideContainer" component={SlideContainer} />
        <Stack.Screen name="RegisterUser" component={RegisterUser} options={{ gestureEnabled: false }} />
        <Stack.Screen name="LoginUser" component={LoginUser} options={{ gestureEnabled: false }} />
        <Stack.Screen name="GetEmail" component={GetEmail} options={{ gestureEnabled: false }} />
        <Stack.Screen name="EmailVerification" component={EmailVerification} options={{ gestureEnabled: false }} />
        <Stack.Screen name="SuccessfullyPasswordChanged" component={SuccessfullyPasswordChanged} options={{ gestureEnabled: false }} />
        <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} options={{ gestureEnabled: false }} />
        <Stack.Screen name="TabBarContainer" component={TabBarContainer} options={{ gestureEnabled: false }} />
        <Stack.Screen name="CardContainerMain" component={CardContainerMain} options={{ gestureEnabled: false }} /> 
        <Stack.Screen name="LikesList" component={LikesList} options={{ gestureEnabled: false }} /> 
        <Stack.Screen name="ProfileDetail" component={ProfileDetail} options={{ gestureEnabled: false }} /> 
        <Stack.Screen name="FilterPopup" component={FilterPopup} options={{ gestureEnabled: false }} /> 
        <Stack.Screen name="DiscoverGotMatch" component={DiscoverGotMatch} options={{ gestureEnabled: false }} /> 
        <Stack.Screen name="GotMatch" component={GotMatch} options={{ gestureEnabled: false }} /> 
        <Stack.Screen name="MessagesList" component={MessagesList} options={{ gestureEnabled: false }} /> 
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

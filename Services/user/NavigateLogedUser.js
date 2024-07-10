import ApisPath from "../../lib/ApisPath/ApisPath"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getProfile } from "../ProfileServices/GetProfile"
import { ShowMessage } from "../Snakbar/ShowMessage"
import Purchases from "react-native-purchases"
import { ApiKeys } from "../../keys"

export const NavigateLogedUser = async (navigation, from) => {
  const user = await AsyncStorage.getItem("USER")
  if (user) {
    let d = JSON.parse(user)
    console.log('user data available',)
    await Purchases.configure({ apiKey: ApiKeys.RevenueCatApiKey, appUserID: `${d.user.id}` });
    try{
    let u = await getProfile()
    console.log('u is', u)
    let data = u
    
    console.log('user status is', data.status)
    // return
    if ( typeof data.role !== undefined && data.role === 'admin') {
      navigation.replace("AdminTabBarContainer", {
        data: {
          from: from
        }
      })
      return
    }
    // Promo code is invalid
    
    else if (data.status === "suspended") {
      ShowMessage("Your account has been suspended by admin")
      if(from === 'Splash'){
        navigation.navigate("LoginUser")
      }
      return
    } else if (data.status === "deleted") {
      ShowMessage("Your account has been deleted by admin")
      if(from === 'Splash'){
        navigation.navigate("LoginUser")
      }      return
    } else if (data.status === "active") {

      // console.log('user status is', data.status)

      if (data.profile_completion === 1) {
        console.log('profile_completion_comment is ', data)
        navigation.navigate('UploadIntroVideo', {
          data: {
            from: from,
            user: ''
          }
        })
      }
      else if (data.profile_completion === 2) {
        console.log('profile_completion_comment', data.profile_completion_comment)
        navigation.navigate('UploadMedia', {
          data: {
            from: from,
            user: ''
          }
        })
      }
      else if (data.profile_completion === 3) {

        //here user will add zodiac,age,height,school,job and interest

        console.log('profile_completion_comment', data.profile_completion_comment)
        navigation.navigate('AddZodiac', {
          data: {
            from: from,
            user: ''
          }
        })

      } else if (data.profile_completion === 4) {

        //here user will add zodiac,age,height,school,job and interest

        console.log('profile_completion_comment', data.profile_completion_comment)
        navigation.navigate('AddAge', {
          data: {
            from: from,
            user: ''
          }
        })

      } else if (data.profile_completion === 5) {

        //here user will add zodiac,age,height,school,job and interest

        console.log('profile_completion_comment', data.profile_completion_comment)
        navigation.navigate('AddHeight', {
          data: {
            from: from,
            user: ''
          }
        })

      } else if (data.profile_completion === 6) {

        //here user will add zodiac,age,height,school,job and interest

        console.log('profile_completion_comment', data.profile_completion_comment)
        navigation.navigate('AddGender', {
          data: {
            from: from,
            user: ''
          }
        })

      } else if (data.profile_completion === 7) {

        //here user will add zodiac,age,height,school,job and interest

        console.log('profile_completion_comment', data.profile_completion_comment)
        navigation.navigate('AddSchool', {
          data: {
            from: from,
            user: ''
          }
        }
        )

      } else if (data.profile_completion === 8) {

        //here user will add zodiac,age,height,school,job and interest

        console.log('profile_completion_comment', data.profile_completion_comment)
        navigation.navigate('AddJobDetails', {
          data: {
            from: from,
            user: ''
          }
        })

      } else if (data.profile_completion === 9) {

        //here user will add zodiac,age,height,school,job and interest

        console.log('profile_completion_comment', data.profile_completion_comment)
        navigation.navigate('GetInterest', {
          data: {
            from: from,
            user: ''
          }
        })

      } else if (data.profile_completion === 11) {

        // if last condition runs then profile complition comment will 11

        console.log('profile_completion_comment', data.profile_completion_comment)
        navigation.navigate("AddLocation", {
          data: {
            from: from,
            user: ''
          }
        })
      } else if (data.profile_completion === 10) {

        // if last condition runs then profile complition comment will 11

        console.log('profile_completion_comment', data.profile_completion_comment)
        navigation.navigate("EnhancmentQuestions", {
          data: {
            from: from,
            user: ''
          }
        })
      }

      else if (data.profile_completion === 20) {

        // if last condition runs then profile complition comment will 11


        try {
          const customerInfo = await Purchases.getCustomerInfo();
          console.log("Customer on Tabbar", customerInfo.entitlements.active["premium"])
          if (typeof customerInfo.entitlements.active["premium"] != "undefined") {
            console.log("User subscribed to plan ", customerInfo.entitlements.active["premium"]);
            navigation.replace('TabBarContainer');
          }
          else{
              props.navigation.navigate("SubscriptionPlan")
          }
          // access latest customerInfo
        } catch (e) {
          // Error fetching customer info
        }
        console.log('profile_completion_comment', data.profile_completion_comment)
        // if(data.subscription.isSubscribed){
        //   navigation.replace('TabBarContainer');
        // }
        // else{
        //   navigation.replace('SubscriptionPlan');
        // }
        
      } else {

        console.log('there is no screen to navigate', data.profile_completion_comment)
      }
    } else{
      console.log('user status is', json.status)
    }
 
  }catch(e){
    // alert(e)
    console.log('error finding in get profile', e)
  }


    // navigation.navigate('TabBarContainer')

  } else {
    return "SlideScreen"
  }
}
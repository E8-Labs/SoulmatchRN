import ApisPath from "../../lib/ApisPath/ApisPath"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getProfile } from "../ProfileServices/GetProfile"

export const NavigateLogedUser = async (navigation, from) => {
  const user = await AsyncStorage.getItem("USER")
  if (user) {
    let d = JSON.parse(user)
    console.log('user data available', d)
    try{
    let u = await getProfile()
    let data = u
    
    // return
    if ( typeof data.role !== undefined && typeof data.role === 'admin') {
      navigation.navigate("AdminTabBarContainer", {
        data: {
          from: from
        }
      })
      return
    }
    else if (data.status === "suspended") {
      alert("Your account has been suspended by admin")
      return
    } else if (data.status === "blocked") {
      alert("Your account has been blocked by admin")
      return
    } else if (data.status === "active") {

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

        console.log('profile_completion_comment', data.profile_completion_comment)
        navigation.replace('TabBarContainer');
      } else {
        console.log('there is no screen to navigate', data.profile_completion_comment)
      }
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
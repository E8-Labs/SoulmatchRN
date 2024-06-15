import { Settings } from "react-native"
import ApisPath from "../../lib/ApisPath/ApisPath"
import AsyncStorage from "@react-native-async-storage/async-storage"
export const getProfile = async () => {
  console.log('try to get profile')
    const data =await AsyncStorage.getItem("USER")

    try {
      if (data) {
        let d = JSON.parse(data)
        console.log('user data is', d)
        const result = await fetch(ApisPath.ApiGetProfile, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + d.token 
          }
        })

        if (result) {
          let json = await result.json()
          if (json.status === true) {
            console.log('user profile is', json.data)
            return json.data
            // setUser(json.data)
          }
          else {
            console.log('json message is', json.message)
          }
        }
      }else{
        console.log('user data is unawailable')
      }
    } catch (error) {
      console.log('error finding in get profile', error)
    }

  }
import { Settings } from "react-native"
import ApisPath from "../../lib/ApisPath/ApisPath"

export const getProfile = async (user) => {

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
            return json.data
            // setUser(json.data)
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
import { Settings } from "react-native"
import ApisPath from "../../lib/ApisPath/ApisPath"

export const UpdateProfile = async (body) => {
    console.log('trying to update profile')
    const data = Settings.get("USER")
    try {
        if (data) {
            let d = JSON.parse(data)

           
            console.log('body', body)
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
                // setShowIndicator(false)
                let json = await result.json()
                if (json.status === true) {
                    console.log('profile udated', json.data)
                    d.user = json.data
                    Settings.set({
                        USER:JSON.stringify(d)
                    })
                    // navigation.navigate('AllowNotification')
                } else {
                    console.log('json message is', json.message)
                }
            }
        }
    } catch (error) {
        console.log('error finding update profile', error)
    }
}

// export default updateProfile
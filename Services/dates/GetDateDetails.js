import AsyncStorage from "@react-native-async-storage/async-storage"
import ApisPath from "../../lib/ApisPath/ApisPath"

export const GetDateDatails = async (dateId) => {

         try {
        const data = await AsyncStorage.getItem("USER")
        if (data) {
            console.log('trying to get date', dateId)
            let d = JSON.parse(data)

            const result = await fetch(ApisPath.Apiils + `?dateId=${dateId}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + d.token
                }
            })
            if (result) {
                let json = await result.json()
                if (json.status === true) {
                    console.log('date details are', json.data)
                    return(json.data)
                } else {
                    console.log('date details message is', json.message)
                }
            }

        }
    } catch (e) {
        console.log(' get date detainl error ', e)
    }
   
}
import React, { useEffect } from "react";
import { View, Text, Dimensions, Image, Settings } from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";

const SplashMainScreen = (props) => {
    const { height, width } = Dimensions.get('window')

    useEffect(() => {

        const user = Settings.get("USER")
        if (user) {
            let d = JSON.parse(user)
            console.log('user data available',d)
            let data = d.user
            // return

            if (data.profile_completion === 1) {
                console.log('profile_completion_comment is ', data)
                props.navigation.navigate('UploadIntroVideo')
            }
            else if (data.profile_completion === 2) {
                console.log('profile_completion_comment', data.profile_completion_comment)
                props.navigation.navigate('UploadMedia',{
                    data:{
                        from:'Splash'
                    }
                })
            }
            else if (data.profile_completion === 3) {

                //here user will add zodiac,age,height,school,job and interest

                console.log('profile_completion_comment', data.profile_completion_comment)
                props.navigation.navigate('AddZodiac',{
                    data:{
                        from:'Splash',
                        user:''
                    }
                })

            } else if (data.profile_completion === 4) {

                //here user will add zodiac,age,height,school,job and interest

                console.log('profile_completion_comment', data.profile_completion_comment)
                props.navigation.navigate('AddAge',{
                    data:{
                        from:'Splash',
                        user:''
                    }
                })

            }else if (data.profile_completion === 5) {

                //here user will add zodiac,age,height,school,job and interest

                console.log('profile_completion_comment', data.profile_completion_comment)
                props.navigation.navigate('AddHeight',{
                    data:{
                        from:'Splash',
                        user:''
                    }
                })

            } else if (data.profile_completion === 6) {

                //here user will add zodiac,age,height,school,job and interest

                console.log('profile_completion_comment', data.profile_completion_comment)
                props.navigation.navigate('AddGender',{
                    data:{
                        from:'Splash',
                        user:''
                    }
                })

            }else if (data.profile_completion === 7) {

                //here user will add zodiac,age,height,school,job and interest

                console.log('profile_completion_comment', data.profile_completion_comment)
                props.navigation.navigate('AddSchool',{
                    data:{
                        from:'Splash',
                        user:''
                    }
                })

            }else if (data.profile_completion === 8) {

                //here user will add zodiac,age,height,school,job and interest

                console.log('profile_completion_comment', data.profile_completion_comment)
                props.navigation.navigate('AddJobDetails',{
                    data:{
                        from:'Splash',
                        user:''
                    }
                })

            }else if (data.profile_completion === 9) {

                //here user will add zodiac,age,height,school,job and interest

                console.log('profile_completion_comment', data.profile_completion_comment)
                props.navigation.navigate('GetInterest',{
                    data:{
                        from:'Splash',
                        user:''
                    }
                })

            }else if (data.profile_completion === 10) {

                // if last condition runs then profile complition comment will 11

                console.log('profile_completion_comment', data.profile_completion_comment)
                props.navigation.navigate("AddLocation")
            }

            else if (data.profile_completion === 11) {

                // if last condition runs then profile complition comment will 11

                console.log('profile_completion_comment', data.profile_completion_comment)
                props.navigation.navigate("TabBarContainer")
            }else{
                console.log('there is no screen to navigate',data.profile_completion_comment)
            }

           
            // props.navigation.navigate('TabBarContainer')

        } else {
             console.log('user cannot navigate' )

            props.navigation.navigate('SlideContainer')
        }

    })


    return (
        <View style={GlobalStyles.container}>

            <Image source={require("../../assets/images/logo.png")}
                style={{ height: 81 / 930 * height, width: 98 / 930 * height, resizeMode: 'contain' }}
            />
            <Text style={{ fontSize: 38, fontWeight: '400' }}>soulmatch</Text>

        </View>
    )
}

export default SplashMainScreen
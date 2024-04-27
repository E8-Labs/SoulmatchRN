import React,{useEffect} from "react";
import { View, Text, Dimensions, Image } from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";

const SplashMainScreen = () => {
   const {height,width} = Dimensions.get('window')
    return (
        <View style={GlobalStyles.container}>
           
                <Image source={require("../../assets/images/logo.png")}
                    style={{ height: 81/930*height, width: 98/930*height ,resizeMode:'contain'}}
                />
                <Text style = {{fontSize:38,fontWeight:'400'}}>soulmsatch</Text>

        </View>
    )
}

export default SplashMainScreen
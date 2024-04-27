import { Dimensions } from "react-native"
import colors from "../colors/Colors"
import customFonts from "../fonts/Fonts"

const { height, width } = Dimensions.get('window')


const GlobalStyles = {

    container: {
        alignItems: 'center',
        height: height,
        justifyContent: 'center',
    },
    skipText: {
        color: colors.blueColor,
        fontSize: 18,
        fontWeight: '500',
        fontFamily: customFonts.reqular
    },
    splashBoldText: {
        fontSize: 28 / 430 * width,
        fontWeight: '500',
        fontFamily: customFonts.meduim

    },
    splashMeduimText: {
        fontSize: 16 / 430 * width,
        fontWeight: '400',
        color: colors.greyLightText,
        fontFamily: customFonts.reqular

    },
    reqtengularBtn: {
        height: 54 / 924 * height,
        width: 370 / 430 * width,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blueColor,

    },
    btnText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        fontFamily: customFonts.meduim
    },
    textInput: {
        width: 370 / 430 * width,
        borderWidth: 1,
        padding: 15,
        borderColor: colors.greyText,
        borderRadius: 10,
        marginTop: 10,
        fontSize: 12,
        fontWeight: '500'
    },
    backBtn: {
        height: 46 / 924 * height,
        width: 46 / 924 * height,
        borderWidth: 1,
        borderColor: colors.greyText,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backBtnImage: {
        height: 28 / 924 * height,
        width: 28 / 924 * height,
        resizeMode: 'contain'
    },
    errorText: {
        fontSize: 14,
        fontWeight: '400',
        color: 'red',
        fontFamily: customFonts.reqular
    },
    likeBtn: {
        height: 46,
        width: 46,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1, 
        borderColor: colors.greyText,
        borderRadius: 30,
    },
    likeBtnImage:{
        height: 27,
         width: 27, 
    }
}

export default GlobalStyles

import { Dimensions } from "react-native"
import colors from "../colors/Colors"
import customFonts from "../fonts/Fonts"

const { height, width } = Dimensions.get('window')


const GlobalStyles = {

    container: {
        alignItems: 'center',
        height: height,
        justifyContent: 'center',
        width:width
    },
    skipText: {
        color: colors.blueColor,
        fontSize: 18,
        fontWeight: '500',
        fontFamily: customFonts.regular
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
        fontFamily: customFonts.regular

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
        fontSize: 14,
        fontWeight: '500',
        fontFamily:customFonts.meduim
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
        fontFamily: customFonts.meduim
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
    },
    divider: {
        width: width - 60,
        borderWidth: 0.5,
        borderColor: colors.greyText,
        marginTop: 25 / 930 * height
    },
    Resourcesbtn: {
        // backgroundColor: 'red'
        height: 35 / 930 * height,
        width: 118 / 430 * width,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#6050DC'
    }, SuspendDelBtn: {
        height: 40 / 930 * height,
        width: 175 / 430 * width,
        borderWidth: 1,
        borderColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    SuspendDelBText: {
        fontWeight: '500',
        fontSize: 14,
        fontFamily: customFonts.medium
    }
}

export default GlobalStyles

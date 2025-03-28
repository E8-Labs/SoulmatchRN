import {
  View,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
  Settings,
} from "react-native";
import React from "react";
import GlobalStyles from "../assets/styles/GlobalStyles";
import { Image } from "expo-image";
import customFonts from "../assets/fonts/Fonts";

const { height, width } = Dimensions.get("window");

export default function LogoutPopup({
  visible,
  close,
  title = "Logout",
  subtitle = "Are you sure you want to logout?",
  cancelButtonText = "Cancel",
  DoneButtonText = "Yes, Logout",
}) {
  return (
    <View>
      <Modal visible={visible} transparent={true} animationType="slide">
        <View
          style={{
            height: height,
            alignItems: "center",
            backgroundColor: "#00000050",
            justifyContent: "flex-end",
            width: width,
          }}
        >
          <View
            style={{
              height: height * 0.5,
              backgroundColor: "white",
              alignItems: "center",
              width: width,
              borderRadius: 20,
              alignItems: "center",
              paddingTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: width - 60,
              }}
            >
              <Text style={{ fontSize: 20, fontFamily: customFonts.meduim }}>
                {title}
              </Text>
              <TouchableOpacity onPress={close}>
                <Image
                  source={require("../assets/images/close.png")}
                  style={{ height: 24, width: 24 }}
                />
              </TouchableOpacity>
            </View>
            <View style={GlobalStyles.divider}></View>

            <Image
              source={require("../assets/images/logoutIcon.png")}
              style={{
                height: (120 / 930) * height,
                width: (120 / 930) * height,
                resizeMode: "contain",
                marginTop: (40 / 930) * height,
              }}
            />
            <Text
              style={{
                marginTop: (40 / 930) * height,
                fontSize: 20,
                fontFamily: customFonts.regular,
              }}
            >
              {subtitle}
            </Text>

            <View
              style={{
                width: width - 60,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 50,
              }}
            >
              <TouchableOpacity
                style={{
                  height: (48 / 930) * height,
                  width: (173 / 430) * width,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 2,
                }}
                onPress={() => close()}
              >
                <Text
                  style={{
                    fontSize: 16,
                  }}
                >
                  {" "}
                  {cancelButtonText}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  close("Logout");
                }}
                style={{
                  height: (48 / 930) * height,
                  width: (173 / 430) * width,
                  backgroundColor: "red",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#f8edda",
                  }}
                >
                  {" "}
                  {DoneButtonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

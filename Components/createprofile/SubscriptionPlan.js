import React, { useEffect, useState } from "react";
import {
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  Platform,
  ActivityIndicator,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Purchases from "react-native-purchases";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import { UpdateProfile } from "../../Services/ProfileServices/UpdateProfile";
import { ApiKeys } from "../../keys";
import customFonts from "../../assets/fonts/Fonts";
import colors from "../../assets/colors/Colors";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

const RevenueCatApiKey = ApiKeys.RevenueCatApiKey;

const { height, width } = Dimensions.get("window");

export default function SubscriptionPlan({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    initializePurchases();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log("Loading products...");
      const offerings = await Purchases.getOfferings();
      // console.log("Offerings:", offerings);
      setLoading(false);

      if (offerings.current && offerings.current.availablePackages.length > 0) {
        const availableProducts = offerings.current.availablePackages.map(
          (pkg) => pkg.product
        );
        console.log("Available products:", availableProducts);
        setProducts(availableProducts);
      } else {
        console.log("No available products found");
      }
    } catch (e) {
      console.log("Error getting offerings:", e);
    }
  };

  const initializePurchases = async () => {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);

    try {
      if (Platform.OS === "ios") {
        const data = await AsyncStorage.getItem("USER");
        let user = null;
        if (data) {
          let d = JSON.parse(data);
          user = d.user;
          await Purchases.configure({
            apiKey: RevenueCatApiKey,
            appUserID: `${user.id}`,
          });
          console.log("Initialized user with id:", user.id);

          try {
            const customerInfo = await Purchases.getCustomerInfo();
            // console.log("Customer ", customerInfo.entitlements.active["premium"])
            if (
              typeof customerInfo.entitlements.active["premium"] != "undefined"
            ) {
              console.log(
                "User subscribed to plan ",
                customerInfo.entitlements.active["premium"]
              );
            }
            // access latest customerInfo
          } catch (e) {
            // Error fetching customer info
          }
          fetchProducts();
        }
      } else if (Platform.OS === "android") {
        await Purchases.configure({ apiKey: RevenueCatApiKey });
        fetchProducts();
      }
    } catch (error) {
      console.error("Failed to initialize purchases:", error);
    }
  };

  const buyProduct = async (product) => {
    setLoading2(product.identifier);
    try {
      console.log("Subscribing to", product.identifier);
      const { customerInfo } = await Purchases.purchaseProduct(
        product.identifier
      );
      if (customerInfo.entitlements.active["premium"]) {
        console.log("User subscribed to premium");
        let p = customerInfo.entitlements.active["premium"];
        let date = p.originalPurchaseDateMillis;
        console.log("Original date ", date);
        await UpdateProfile(JSON.stringify({ originalPurchaseDate: date }));
        console.log("Profile updated");
        setLoading2(null);
        navigation.reset({
          index: 0,
          routes: [{ name: "TabBarContainer" }],
        });
      }
    } catch (e) {
      setLoading2(null);
      console.log("Exception during purchase:", e);
      setSelected(null);
      if (!e.userCancelled) {
        // Handle other errors
      }
    }
  };

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem("USER");
      await AsyncStorage.removeItem("UserAnswers");
      console.log("logout successfully");
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginUser" }],
      });
    } catch (e) {
      console.log("finding error in logout user", e);
    }
  };

  function getPeriodTitleFromProduct(p) {
    if (p.subscriptionPeriod == "P1W") {
      return "week";
    }
    if (p.subscriptionPeriod == "P1Y") {
      return "year";
    }
    if (p.subscriptionPeriod == "P1M") {
      return "month";
    }
  }

  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <View style={{ width: (370 / 430) * width }}>
        <View
          style={{
            marginTop: (60 / 930) * height,
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              // navigation.goBack()
            }}
          >
            <View style={{ opacity: 0 }}>
              <Image
                source={require("../../assets/images/backArrow.png")}
                style={GlobalStyles.backBtnImage}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 24,
              marginLeft: (20 / 430) * width,
            }}
          >
            Complete your profile
          </Text>

          <TouchableOpacity
            style={{ marginLeft: (30 / 430) * width }}
            onPress={logoutUser}
          >
            <Text
              style={{
                color: colors.blueColor,
                fontSize: 16,
                fontFamily: customFonts.meduim,
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        {/* Code for progressbar */}
        <View
          style={{
            flexDirection: "row",
            marginTop: (40 / 930) * height,
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/enhancement.png")}
            style={{ height: 56, width: 56, resizeMode: "contain" }}
          />
          <View
            style={{
              height: (4 / 930) * height,
              width: (16 / 430) * width,
              backgroundColor: "#6050DC",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              height: (4 / 930) * height,
              width: (16 / 430) * width,
              backgroundColor: "#6050DC",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              height: (4 / 930) * height,
              width: (16 / 430) * width,
              backgroundColor: "#6050DC",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              height: (4 / 930) * height,
              width: (16 / 430) * width,
              backgroundColor: "#6050DC",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              height: (4 / 930) * height,
              width: (16 / 430) * width,
              backgroundColor: "#6050DC",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              height: (4 / 930) * height,
              width: (16 / 430) * width,
              backgroundColor: "#6050DC",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              height: (4 / 930) * height,
              width: (16 / 430) * width,
              backgroundColor: "#6050DC",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              height: (4 / 930) * height,
              width: (16 / 430) * width,
              backgroundColor: "#6050DC",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              height: (4 / 930) * height,
              width: (16 / 430) * width,
              backgroundColor: "#6050DC",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              height: (4 / 930) * height,
              width: (16 / 430) * width,
              backgroundColor: "#6050DC",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              height: (4 / 930) * height,
              width: (16 / 430) * width,
              backgroundColor: "#6050DC",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              height: (4 / 930) * height,
              width: (16 / 430) * width,
              backgroundColor: "#6050DC",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              height: (4 / 930) * height,
              width: (16 / 430) * width,
              backgroundColor: "#6050DC",
              borderRadius: 10,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            marginTop: (40 / 930) * height,
          }}
        >
          Choose a plan
        </Text>

        <Text
          style={{
            fontFamily: customFonts.meduim,
            fontSize: 14,
            color: "#000",
            marginTop: 20
          }}
        >
          14 days free trail
        </Text>

        {loading ? (
          <ContentLoader
            height={height}
            width={width}
            speed={1}
            backgroundColor={"#D5D0F6"}
            foregroundColor={"#ececec"}
          // viewBox="0 0 380 70"
          >
            <Rect x={30} y={50} ry={5} rx={5} height={10} width={250} />
            <Rect x={30} y={70} ry={5} rx={5} height={10} width={300} />
            <Rect x={30} y={90} ry={5} rx={5} height={10} width={50} />

            <Rect x={30} y={140} ry={5} rx={5} height={10} width={250} />
            <Rect x={30} y={160} ry={5} rx={5} height={10} width={300} />
            <Rect x={30} y={180} ry={5} rx={5} height={10} width={50} />

            <Rect x={30} y={230} ry={5} rx={5} height={10} width={250} />
            <Rect x={30} y={250} ry={5} rx={5} height={10} width={300} />
            <Rect x={30} y={270} ry={5} rx={5} height={10} width={50} />
          </ContentLoader>
        ) : (
          products.map((product) => (
            <TouchableOpacity
              key={product.identifier}
              onPress={() => {
                buyProduct(product);
                setSelected(product.identifier);
              }}
            >
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  backgroundColor:
                    selected === product.identifier
                      ? colors.blueColor
                      : colors.transparent,
                  marginTop: 10,
                  width: (400 / 430) * width,
                  alignSelf: "center",
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#E6E6E6",
                    height: (95 / 930) * height,
                    width: (370 / 430) * width,
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: (0 / 930) * height,
                    backgroundColor: "white",
                  }}
                >
                  <View
                    style={{
                      height: (55 / 930) * height,
                      width: (338 / 430) * width,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ backgroundColor: "white", gap: 5 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 10,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: customFonts.semibold,
                            fontSize: 14,
                            color: "#000",
                          }}
                        >
                          {product.title}
                        </Text>

                      </View>

                      <Text
                        numberOfLines={3}
                        style={{
                          width: (280 / 430) * width,
                          fontFamily: customFonts.regular,
                          fontSize: 12,
                          color: "#000",
                        }}
                      >
                        {product.description}
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: customFonts.semibold,
                            fontSize: 18,
                          }}
                        >
                          {product.priceString} /{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: customFonts.regular,
                            fontSize: 13,
                          }}
                        >
                          {getPeriodTitleFromProduct(product)}
                        </Text>
                      </View>
                    </View>
                    {/* <View style={{ width: '50%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}> */}
                    {/* <TouchableOpacity > */}
                    {loading2 === product.identifier ? (
                      <ActivityIndicator
                        size={"small"}
                        color={colors.blueColor}
                      />
                    ) : (
                      <View
                        style={{
                          height: (32 / 930) * height,
                          width: (32 / 930) * height,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#00000020",
                          borderRadius: 50,
                        }}
                      >
                        <Image
                          source={require("../../assets/forward.png")}
                          style={{
                            height: (20 / 930) * height,
                            width: (20 / 430) * width,
                          }}
                        />
                      </View>
                    )}

                    {/* </TouchableOpacity> */}
                    {/* </View> */}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              width: width - 45,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={()=>{
                Linking.openURL("https://www.soulmatch.dating/terms-and-condition")
              }}
            >
              <Text style={[{ fontSize: 12 }]}>
                Terms & Conditions | Privacy Policy
              </Text>
            </TouchableOpacity>


          </View>

        </View>
      </View>
    </View>
  );
}

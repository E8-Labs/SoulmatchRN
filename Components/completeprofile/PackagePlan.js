import React, { useState } from "react";
import { Dimensions, View, TouchableOpacity, Text, Modal } from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import { Image } from "expo-image";

const PackagePlan = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const [packages, setPackages] = useState([]);

  const package_limit = [
    {
      id: 1,
      package_name: "Free",
      package_fees: "14 days free trial",
    },
    {
      id: 2,
      package_name: "weekly",
      package_fees: "$5.99",
    },
    {
      id: 3,
      package_name: "Monthly",
      package_fees: "$14.99",
    },
    {
      id: 4,
      package_name: "Yearly",
      package_fees: "$149.99",
    },
  ];

  //code for OpenModal
  const [OpenModal, setOpenModal] = useState(false);

  const handleModalclick = () => {
    setOpenModal(true);
  };

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
              navigation.goBack();
            }}
          >
            <View style={GlobalStyles.backBtn}>
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
            source={require("../../assets/enhancement.png")}
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
        {/* Code for selecting packages */}
        {/*<View style={{ borderWidth: 1, borderColor: '#E6E6E6', height: 95 / 930 * height, width: 370 / 430 * width, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30 / 930 * height }}>
                    <View style={{ height: 55 / 930 * height, width: 338 / 430 * width, flexDirection: 'row' }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ fontWeight: '600', fontSize: 14, color: '#666666' }}>
                                Free
                            </Text>
                            <Text style={{ fontWeight: '600', fontSize: 18 }}>
                                14 days free trial
                            </Text>
                        </View>
                        <View style={{ width: '50%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                            <TouchableOpacity>
                                <View style={{ height: 32 / 930 * height, width: 32 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000020', borderRadius: 50 }}>
                                    <Image source={require('../../assets/forward.png')} style={{ height: 20 / 930 * height, width: 20 / 430 * width, }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
    </View>*/}
        <View>
          {package_limit.map((item, index) => (
            <View key={item.id} style={{ display: "flex" }}>
              {index === 2 ? (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#E6E6E6",
                    height: (150 / 930) * height,
                    width: (370 / 430) * width,
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    marginTop: (30 / 930) * height,
                    backgroundColor: "#6050DC",
                  }}
                >
                  <Text
                    style={{
                      marginTop: (8 / 930) * height,
                      fontSize: 14,
                      fontWeight: "500",
                      color: "white",
                    }}
                  >
                    Recomended
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "#E6E6E6",
                      height: (95 / 930) * height,
                      width: (348 / 430) * width,
                      borderRadius: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: (9 / 930) * height,
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <View
                      style={{
                        height: (55 / 930) * height,
                        width: (316 / 430) * width,
                        flexDirection: "row",
                      }}
                    >
                      <View style={{ width: "50%" }}>
                        <Text
                          style={{
                            fontWeight: "600",
                            fontSize: 14,
                            color: "#666666",
                          }}
                        >
                          Monthly
                        </Text>
                        <Text style={{ fontWeight: "600", fontSize: 18 }}>
                          $14.99
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "50%",
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        <TouchableOpacity onPress={handleModalclick}>
                          <View
                            style={{
                              height: (35 / 930) * height,
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
                                width: (20 / 930) * height,
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
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
                    marginTop: (30 / 930) * height,
                  }}
                >
                  <View
                    style={{
                      height: (55 / 930) * height,
                      width: (338 / 430) * width,
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ width: "50%" }}>
                      <Text
                        style={{
                          fontWeight: "600",
                          fontSize: 14,
                          color: "#666666",
                        }}
                      >
                        {item.package_name}
                      </Text>
                      <Text style={{ fontWeight: "600", fontSize: 18 }}>
                        {item.package_fees}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                      }}
                    >
                      <TouchableOpacity onPress={handleModalclick}>
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
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Code for confirming the package payment */}
        <Modal visible={OpenModal} transparent={true} animationType="slide">
          <View
            style={{
              height: height,
              backgroundColor: "#00000010",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                height: "50%",
                backgroundColor: "white",
                width: "100%",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 25,
                display: "flex",
                alignItems: "center",
              }}
            >
              <View style={{ width: (370 / 430) * width }}>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginTop: (20 / 930) * height,
                  }}
                >
                  <TouchableOpacity>
                    <Image
                      source={require("../../assets/Applepay.png")}
                      style={{
                        height: (25 / 930) * height,
                        width: (63 / 430) * width,
                        resizeMode: "contain",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setOpenModal(false)}
                    style={{ marginRight: 10 }}
                  >
                    <Image
                      source={require("../../assets/crossicon.png")}
                      style={{
                        height: (24 / 930) * height,
                        width: (24 / 430) * width,
                        resizeMode: "contain",
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  height: 0.1,
                  borderWidth: 0.2,
                  borderColor: "#E6E6E6",
                  width: "100%",
                  marginTop: (20 / 930) * height,
                }}
              ></View>

              <View
                style={{
                  width: (370 / 430) * width,
                  marginTop: (20 / 930) * height,
                  borderWidth: 1,
                  height: (88 / 930) * height,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "#CCCCCC80",
                  borderRadius: 10,
                }}
              >
                {/* Code for payment width apple card */}
                <View
                  style={{
                    height: (54 / 930) * height,
                    width: (330 / 430) * width,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Image
                    source={require("../../assets/credit.png")}
                    style={{
                      height: (24 / 930) * height,
                      width: (37 / 430) * width,
                    }}
                  />
                  <View
                    style={{
                      height: (56 / 930) * height,
                      width: (233 / 430) * width,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 14,
                        color: "#4D4D4D",
                        height: (20 / 930) * height,
                      }}
                    >
                      Apple Card
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "900",
                          color: "#4D4D4D",
                          marginBottom: 6,
                        }}
                      >
                        ...
                      </Text>
                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 14,
                          color: "#4D4D4D",
                        }}
                      >
                        1234
                      </Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity onPress={handleModalclick}>
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
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* other code SideButtonIndicator */}

              <View
                style={{
                  height: (95 / 930) * height,
                  width: (370 / 430) * width,
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: (30 / 930) * height,
                }}
              >
                <View
                  style={{
                    height: (65 / 930) * height,
                    width: (338 / 430) * width,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 14,
                        color: "#666666",
                      }}
                    >
                      Pay SoulMatch
                    </Text>
                    <Text style={{ fontWeight: "600", fontSize: 18 }}>
                      $14.99
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "50%",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity>
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
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View
                style={{
                  height: 0.1,
                  borderWidth: 0.2,
                  borderColor: "#E6E6E6",
                  width: (370 / 430) * width,
                  marginTop: (20 / 930) * height,
                  marginTop: (20 / 930) * height,
                }}
              ></View>

              <View style={{ marginTop: (30 / 930) * height }}>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate('Congates')
                  }}
                >
                  <Image
                    source={require("../../assets/SideButtonIndicator.png")}
                    style={{
                      height: (38 / 930) * height,
                      width: (38 / 430) * width,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 14,
                  marginTop: (20 / 930) * height,
                  color: "#4D4D4D",
                }}
              >
                Confirm with side button
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default PackagePlan;

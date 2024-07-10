import React, { useEffect, useState } from 'react';
import { View, Button, Text, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases from 'react-native-purchases';

import {UpdateProfile} from '../../Services/ProfileServices/UpdateProfile'
import { ApiKeys } from '../../keys';

const RevenueCatApiKey = ApiKeys.RevenueCatApiKey;

export default function SubscriptionPlan() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    initializePurchases();
    
  }, []);

  const fetchProducts = async () => {
    try {
      console.log("Loading products...");
      const offerings = await Purchases.getOfferings();
      // console.log("Offerings:", offerings);

      if (offerings.current && offerings.current.availablePackages.length > 0) {
        const availableProducts = offerings.current.availablePackages.map(pkg => pkg.product);
        // console.log("Available products:", availableProducts);
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
      if (Platform.OS === 'ios') {
        const data = await AsyncStorage.getItem("USER");
        let user = null;
        if (data) {
          let d = JSON.parse(data);
          user = d.user;
          await Purchases.configure({ apiKey: RevenueCatApiKey, appUserID: `${user.id}` });
          console.log("Initialized user with id:", user.id);

          try {
            const customerInfo = await Purchases.getCustomerInfo();
            // console.log("Customer ", customerInfo.entitlements.active["premium"])
            if (typeof customerInfo.entitlements.active["premium"] != "undefined") {
              console.log("User subscribed to plan ", customerInfo.entitlements.active["premium"]);
            } 
            // access latest customerInfo
          } catch (e) {
           // Error fetching customer info
          }
          fetchProducts();
        }
      } else if (Platform.OS === 'android') {
        await Purchases.configure({ apiKey: RevenueCatApiKey });
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to initialize purchases:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>In-App Subscriptions</Text>
      {products.map((product) => (
        <Button
          key={product.identifier}
          title={`Buy ${product.title} for ${product.priceString}`}
          onPress={async () => {
            try {
              console.log("Subscribing to", product.identifier);
              const { customerInfo } = await Purchases.purchaseProduct(product.identifier);
              if (customerInfo.entitlements.active["premium"]) {
                console.log("User subscribed to premium");
                let p = customerInfo.entitlements.active["premium"]
                let date = p.originalPurchaseDateMillis;
                console.log("Original date ", date);
                await UpdateProfile(JSON.stringify({originalPurchaseDate: date}))
                console.log("Profile updated")

              }
            } catch (e) {
              console.log("Exception during purchase:", e);
              if (!e.userCancelled) {
                // Handle other errors
              }
            }
          }}
        />
      ))}
    </View>
  );
}

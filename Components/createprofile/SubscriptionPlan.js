import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { initializePurchases, getAvailablePurchases, purchaseItem } from '../../Services/InAppPurchases';
import * as InAppPurchases from 'expo-in-app-purchases';







export default function SubscriptionPlan() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    initializePurchases();
    
  }, []);

  const fetchProducts = async () => {
    const availableProducts = await getAvailablePurchases();
    setProducts(availableProducts);
  };


 

// Function to handle purchase results
const handlePurchase = async (purchase) => {
    const receipt = purchase.transactionReceipt;
  
    // Send the receipt to your server to verify and store the originalTransactionId or purchaseToken
    await axios.post('https://your-server.com/store-receipt', { receipt });
  
    // Finish the transaction
    await InAppPurchases.finishTransactionAsync(purchase, true);
  };
  
  // Function to initialize purchases and set up the listener
  const initializePurchases = async () => {
    try {
      await InAppPurchases.connectAsync();
      InAppPurchases.setPurchaseListener(({ responseCode, results }) => {
        if (responseCode === InAppPurchases.IAPResponseCode.OK) {
          results.forEach((purchase) => {
            if (!purchase.acknowledged) {
              handlePurchase(purchase);
            }
          });
        }
      });
      fetchProducts();
    } catch (error) {
      console.error('Failed to connect to in-app purchases main screen', error);
    }
  };
  
  // Call this function when your app starts
//   initializePurchases();


  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>In-App Subscriptions</Text>
      {products.map((product) => (
        <Button
          key={product.productId}
          title={`Buy ${product.title} for ${product.price}`}
          onPress={() => purchaseItem(product.productId)}
        />
      ))}
    </View>
  );
}
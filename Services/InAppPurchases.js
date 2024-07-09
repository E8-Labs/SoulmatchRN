// import * as InAppPurchases from 'expo-in-app-purchases';
import { getProductsAsync, IAPResponseCode, purchaseItemAsync, setPurchaseListener,
    finishTransactionAsync, 
 } from 'expo-in-app-purchases';
import { Alert } from 'react-native';

const initializePurchases = async () => {
  try {
    await connectAsync();
  } catch (error) {
    console.error('Failed to connect to in-app purchases', error);
  }
};

const getAvailablePurchases = async () => {
  try {
    const { responseCode, results } = await getProductsAsync(['WeeklySubscriptionSoulmatch0623']);

    if (responseCode === IAPResponseCode.OK) {
        console.log("Products are ", results)
      return results;
    } else {
      console.error('Failed to get products', responseCode);
      return []
    }
  } catch (error) {
    console.error('Failed to get available purchases', error);
    return []
  }
};

const purchaseItem = async (productId) => {
  try {
    await purchaseItemAsync(productId);
  } catch (error) {
    console.error('Failed to purchase item', error);
  }
};

setPurchaseListener(({ responseCode, results, errorCode }) => {
  if (responseCode === IAPResponseCode.OK) {
    results.forEach((purchase) => {
      if (!purchase.acknowledged) {
        Alert.alert('Purchase Successful', `You have successfully purchased ${purchase.productId}`);
        finishTransactionAsync(purchase, true);
      }
    });
  } else if (responseCode === IAPResponseCode.USER_CANCELED) {
    console.log('User canceled the purchase');
  } else {
    console.error('Failed to make purchase', responseCode, errorCode);
  }
});

export { initializePurchases, getAvailablePurchases, purchaseItem };
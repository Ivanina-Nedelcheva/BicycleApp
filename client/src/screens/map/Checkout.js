import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Button } from 'react-native';
import { StripeProvider, CardForm, useConfirmPayment, useStripe } from '@stripe/stripe-react-native'
import { getPaymentSheetParams } from '../../api/payment'
import { useAuth } from '../../context/AuthContext';

export default function Checkout() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [pId, setPId] = useState(null)

  const { userInfo } = useAuth()
  const { createPaymentMethod } = useStripe();

  const handleCreatePaymentMethod = async () => {
    const { paymentMethod, error } = await createPaymentMethod({
      paymentMethodType: 'Card',
    });

    console.log(paymentMethod?.id);
    setPId(paymentMethod.id)

    if (error) {
      console.log('Error creating payment method:', error);
    } else {
      console.log('Payment method created:', paymentMethod);
    }
  };


  const fetchPaymentSheetParams = async () => {
    console.log(pId);
    const res = await getPaymentSheetParams(userInfo.id, pId)
    console.log(res);

    const { setupIntent, ephemeralKey, customer } = await res

    return {
      setupIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      setupIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      setupIntentClientSecret: setupIntent,
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    // see below
  };

  useEffect(() => {
    initializePaymentSheet();
  }, [pId]);

  return (
    <View>
      <CardForm
        onFormComplete={(cardDetails) => {
          console.log('Form complete with card details:', cardDetails);
        }}
        style={{
          width: '100%',
          height: 300,
        }}
      />


      {/* <Button
        variant="primary"
        disabled={!loading}
        title="Set up"
        onPress={openPaymentSheet}
      /> */}
      <Button
        variant="secondary"
        title="Create"
        onPress={handleCreatePaymentMethod}
      />
    </View>
  );
}
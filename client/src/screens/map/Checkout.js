import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Button, Text } from 'react-native';
import { StripeProvider, CardForm, useConfirmPayment, useStripe } from '@stripe/stripe-react-native'
import { getPaymentSheetParams, charge } from '../../api/payment'
import { useAuth } from '../../context/AuthContext';

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState(null)
  const { userInfo } = useAuth()
  const { createPaymentMethod } = useStripe();
  const [card, setCard] = useState(null)

  const handleCreatePaymentMethod = async () => {
    const { paymentMethod, error } = await createPaymentMethod({
      paymentMethodType: 'Card',
      card
    });

    if (error) {
      console.log('Error creating payment method:', error);
      return;
    }

    console.log('Payment method created:', paymentMethod);

    if (customerId) {
      const chargeResponse = await charge(customerId, paymentMethod.id, 1000);

      if (chargeResponse) {
        console.log('Successfully charged:', chargeResponse);
      } else {
        console.log('Failed to charge the customer.');
      }
    }
  };


  const fetchPaymentSheetParams = async () => {
    const res = await getPaymentSheetParams(userInfo.id)
    console.log(res.customer)
    setCustomerId(res.customer)
  };

  return (
    <View>
      <CardForm
        onFormComplete={(cardDetails) => {
          console.log('Form complete with card details:', cardDetails);
          setCard(cardDetails)
        }}
        style={{
          width: '100%',
          height: 300,
        }}
      />


      <Button
        variant="primary"
        // disabled={!loading}
        title="Pay"
        onPress={handleCreatePaymentMethod}
      />

      <Text>..............</Text>

      <Button
        variant="secondary"
        title="Fetch"
        onPress={fetchPaymentSheetParams}
      />
    </View>
  );
}
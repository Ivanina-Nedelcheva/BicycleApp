import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native'
import { CardForm, useConfirmPayment } from '@stripe/stripe-react-native'
import { colors } from '../../styles/styles'
import CustomButton from './CustomButton'
import Scanner from './Scanner';

const CardInformation = ({ navigation, route }) => {
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvc: '',
  });

  const [isScannerOpen, setScannerOpen] = useState(false);
  const [card, setCard] = useState(true)

  const toggleScanner = () => {
    setScannerOpen(!isScannerOpen); // Toggle the scanner state
  };
  const handleCardFieldChange = (event) => {
    if (event.complete) {
      setCardInfo({
        number: event.values.number,
        expiry: event.values.expiry,
        cvc: event.values.cvc,
      });
    } else {
      setCardInfo({
        number: '',
        expiry: '',
        cvc: '',
      });
    }
  };

  const { confirmPayment, loading } = useConfirmPayment()
  const API_URL = "http://192.168.1.168:8080"

  async function fetchPaymentIntentClientSecret() {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })

    const { clientSecret } = await response.json()
    return clientSecret
  }

  function addCardInfo() {
    if (card) {
      Alert.alert('Payment successful!', null, [{ onPress: () => toggleScanner() }])
    }
    if (route.params?.rent && card) {
      Alert.alert('Payment successful!', null, [{ onPress: () => toggleScanner() }])
    }
    if (route.params?.map && card) {
      Alert.alert('Payment successful!', null, [{ onPress: () => navigation.navigate('Map', { center: true }) }])
    }
  }

  // async function addCardInfo() {
  //   if (!cardInfo?.complete) {
  //     Alert.alert('Please enter complete information')
  //     return
  //   }

  //   try {
  //     const { clientSecret, error } = await fetchPaymentIntentClientSecret()
  //     if (error) {
  //       console.log("Unable to process payment");
  //     } else {
  //       const { paymentIntent, error } = await confirmPayment(clientSecret, {
  //         type: "Card",
  //         billingDetails,
  //       })

  //       if (error) {
  //         Alert.alert(`Payment Confirmation Error ${error.message}`)
  //       } else if (paymentIntent) {
  //         Alert.alert("Payment Successful")
  //         console.log("Payment Successful", paymentIntent);
  //         bottomSheetRef.current?.close()
  //       }
  //     }

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <StripeProvider publishableKey='asdasdas'>
      <View style={styles.container}>
        <CardForm
          style={styles.cardForm}
          cardStyle={{ borderRadius: 5, fontFamily: 'Roboto-Regular' }}
          postalCodeEnabled={false}
        />

        <CustomButton
          title="Confirm"
          color={colors.primary}
          onPress={addCardInfo}
          magicNumber={0.4}
          style={styles.btn}
          disabled={loading}
        />

        <Scanner isOpen={isScannerOpen} onToggle={setScannerOpen} navigation={navigation} />

      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontFamily: 'Roboto-Regular',
    fontSize: 22,
  },
  input: {
    fontFamily: 'Roboto-Regular',
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderRadius: 100,
    paddingVertical: 12,
    backgroundColor: 'white',
    maxWidth: '100%',
  },
  cardForm: {
    height: 200,
    marginTop: 40,
  },
  btnContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 20
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center'
  },
});

export default CardInformation;

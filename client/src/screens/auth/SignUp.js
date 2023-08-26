import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StyleSheet, View, Image, TextInput, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Checkbox from 'expo-checkbox';
import CustomButton from '../../components/CustomButton';
import { colors } from '../../../styles/styles.js'
import { MaterialCommunityIcons } from '@expo/vector-icons';


const SignUp = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phoneNumber: Yup.string().required('Phone number is required').matches(
      /^(((\+|00)359[- ]?)|(0))(8[- ]?[789]([- ]?\d){7})$/gm,
      "Plese enter valid phone number"
    ),
    email: Yup.string().email('Invalid email').required('Email is required'),
    // password: Yup.string().required('Password is required').matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    // ),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = values => {
    console.log(values);
    navigation.navigate('MapNavigator')
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        {/* <Image
          style={styles.image}
          source={require('../../../assets/images/bike3.jpg')}
        /> */}

        <Formik
          initialValues={{ firstName: '', lastName: '', id: '', phoneNumber: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit, values, errors, isValid }) => (
            <View style={styles.form}>
              <View>
                <TextInput
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  placeholder="First name"
                  style={styles.input}
                />

                {values.firstName && !errors.firstName && (
                  <MaterialCommunityIcons name="check-circle-outline" size={20} color="green" style={styles.inputIcon} />
                )}
              </View>
              {errors.firstName && <Text style={styles.errorMessage}>{errors.firstName}</Text>}

              <View>
                <TextInput
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  placeholder="Last name"
                  style={styles.input}
                />
                {values.lastName && !errors.lastName && (
                  <MaterialCommunityIcons name="check-circle" size={20} color="green" style={styles.inputIcon} />
                )}
              </View>
              {errors.lastName && <Text style={styles.errorMessage}>{errors.lastName}</Text>}

              <View>
                <TextInput
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  placeholder="Phone number"
                  keyboardType="phone-pad"
                  style={styles.input}
                />

                {values.phoneNumber && !errors.phoneNumber && (
                  <MaterialCommunityIcons name="check-circle" size={20} color="green" style={styles.inputIcon} />
                )}
              </View>
              {errors.phoneNumber && <Text style={styles.errorMessage}>{errors.phoneNumber}</Text>}

              <View>
                <TextInput
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder="Email"
                  keyboardType="email-address"
                  style={styles.input}
                />

                {values.email && !errors.email && (
                  <MaterialCommunityIcons name="check-circle" size={20} color="green" style={styles.inputIcon} />
                )}
              </View>
              {errors.email && <Text style={styles.errorMessage}>{errors.email}</Text>}

              <View>
                <TextInput
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="Password"
                  secureTextEntry={!passwordVisible}
                  style={[styles.input, { paddingRight: 40, overflow: 'hidden', }]}
                />
                <MaterialCommunityIcons
                  name={passwordVisible ? 'eye' : 'eye-off'}
                  size={20}
                  color="#888"
                  style={styles.inputIcon}
                  onPress={togglePasswordVisibility}
                />
              </View>
              {errors.password && <Text style={styles.errorMessage}>{errors.password}</Text>}

              <View style={styles.terms}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('TermsAndConditions')}>
                  <View style={styles.linkWrapper}>
                    <Text style={styles.linkText}>Read Terms and Conditions</Text>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
                  </View>
                </TouchableWithoutFeedback>

                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={termsAccepted}
                    onValueChange={() => setTermsAccepted(!termsAccepted)}
                    color={termsAccepted ? colors.primary : undefined}
                  />
                  <Text style={styles.checkboxLabel}>I accept the terms and conditions</Text>
                </View>

                <TouchableWithoutFeedback onPress={() => navigation.navigate('PrivacyPolicy')}>
                  <View style={styles.linkWrapper}>
                    <Text style={styles.linkText}>Read Privacy Policy</Text>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
                  </View>
                </TouchableWithoutFeedback>

                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={privacyAccepted}
                    onValueChange={() => setPrivacyAccepted(!privacyAccepted)}
                    color={privacyAccepted ? colors.primary : undefined}
                  />
                  <Text style={styles.checkboxLabel}>I accept the privacy policy</Text>
                </View>
              </View>

              <CustomButton
                title="Register"
                color={colors.primary}
                onPress={handleSubmit}
                magicNumber={0.8}
                disabled={!isValid}
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '80%',
    gap: 10
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
    maxWidth: '100%'
  },
  inputIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  errorMessage: {
    fontFamily: 'Roboto-Regular',
    color: colors.red
  },
  terms: {
    marginTop: 20,
    marginBottom: 20,
  },
  linkWrapper: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  linkText: {
    fontFamily: 'Roboto-Regular',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  checkboxLabel: {
    fontFamily: 'Roboto-Regular',
    marginLeft: 8,
  },
});

export default SignUp
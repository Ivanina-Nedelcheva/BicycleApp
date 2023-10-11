import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StyleSheet, View, TextInput, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import _ from 'lodash'
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../../components/CustomButton';
import { colors } from '../../../styles/styles.js'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';

const SignUp = ({ navigation }) => {
  const { register } = useContext(AuthContext)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date())

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phoneNumber: Yup.string().required('Phone number is required').matches(
      /^(((\+|00)359[- ]?)|(0))(8[- ]?[789]([- ]?\d){7})$/gm,
      "Please enter valid phone number"
    ),
    email: Yup.string().required('Email is required').email('Invalid email'),
    password: Yup.string().min(8).required('Password is required').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    confirmPassword: Yup.string().required('Confirm password is required').min(8).oneOf([Yup.ref('password')], 'Your password do not match'),
    dateOfBirth: Yup.date()
      .required('Date of birth is required')
      .test('is-at-least-16', 'You must be at least 16 years old.', function (value) {
        const cutoffDate = new Date();
        cutoffDate.setFullYear(cutoffDate.getFullYear() - 16); // Subtract 16 years from current year
        return value <= cutoffDate;
      }),
  });

  const handleSubmit = values => {
    register(values)
    navigation.navigate('SignIn')
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <Formik
          initialValues={{ firstName: 'Pom', lastName: 'Pom', phoneNumber: '0888555299', email: 'asd@gmail.com', password: 'Hasmukar123!', confirmPassword: 'Hasmukar123!', dateOfBirth: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialErrors={true}
        >
          {({ handleChange, handleSubmit, values, errors, isValid, dirty, setFieldValue }) => (
            <View style={styles.form}>
              <View>
                <TouchableWithoutFeedback onPress={() => setDatePickerVisible(true)}>
                  <View style={styles.input}>
                    <Text>Date of Birth: {dateOfBirth.toDateString()}</Text>
                  </View>
                </TouchableWithoutFeedback>
                {datePickerVisible && (
                  <DateTimePicker
                    value={dateOfBirth}
                    mode="date"
                    display="spinner"
                    onChange={(event, date) => {
                      setDatePickerVisible(false);
                      if (date) {
                        setDateOfBirth(date)
                        setFieldValue('dateOfBirth', date)
                      }
                    }}
                  />
                )}
                {values.dateOfBirth && !errors.dateOfBirth && (
                  <MaterialCommunityIcons name="check-circle-outline" size={20} color={colors.keppel} style={styles.inputIcon} />
                )}
              </View>
              {errors.dateOfBirth && <Text style={styles.errorMessage}>{errors.dateOfBirth}</Text>}


              <View>
                <TextInput
                  value={values.firstName}
                  placeholder="First name"
                  style={styles.input}
                  onChangeText={handleChange('firstName')}
                // onBlur={handleBlur('firstName')}
                />

                {values.firstName && !errors.firstName && (
                  <MaterialCommunityIcons name="check-circle-outline" size={20} color={colors.keppel} style={styles.inputIcon} />
                )}
              </View>
              {errors.firstName && <Text style={styles.errorMessage}>{errors.firstName}</Text>}

              <View>
                <TextInput
                  value={values.lastName}
                  placeholder="Last name"
                  style={styles.input}
                  onChangeText={handleChange('lastName')}
                // onBlur={handleBlur('lastName')}
                />
                {values.lastName && !errors.lastName && (
                  <MaterialCommunityIcons name="check-circle-outline" size={20} color={colors.keppel} style={styles.inputIcon} />
                )}
              </View>
              {errors.lastName && <Text style={styles.errorMessage}>{errors.lastName}</Text>}

              <View>
                <TextInput
                  value={values.phoneNumber}
                  placeholder="Phone number"
                  keyboardType="phone-pad"
                  style={styles.input}
                  onChangeText={handleChange('phoneNumber')}
                // onBlur={handleBlur('phoneNumber')}
                />

                {values.phoneNumber && !errors.phoneNumber && (
                  <MaterialCommunityIcons name="check-circle-outline" size={20} color={colors.keppel} style={styles.inputIcon} />
                )}
              </View>
              {errors.phoneNumber && <Text style={styles.errorMessage}>{errors.phoneNumber}</Text>}

              <View>
                <TextInput
                  value={values.email}
                  placeholder="Email"
                  keyboardType="email-address"
                  style={styles.input}
                  onChangeText={handleChange('email')}
                // onBlur={handleBlur('email')}
                />

                {values.email && !errors.email && (
                  <MaterialCommunityIcons name="check-circle-outline" size={20} color={colors.keppel} style={styles.inputIcon} />
                )}
              </View>
              {errors.email && <Text style={styles.errorMessage}>{errors.email}</Text>}

              <View>
                <TextInput
                  value={values.password}
                  placeholder="Password"
                  secureTextEntry={!passwordVisible}
                  style={[styles.input, { paddingRight: 40, overflow: 'hidden', }]}
                  onChangeText={handleChange('password')}
                // onBlur={handleBlur('password')}
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

              <View>
                <TextInput
                  value={values.confirmPassword}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  style={[styles.input, { paddingRight: 40, overflow: 'hidden', }]}
                  onChangeText={handleChange('confirmPassword')}
                // onBlur={handleBlur('confirmPassword')}
                />
                {values.confirmPassword && !errors.confirmPassword && (
                  <MaterialCommunityIcons name="check-circle-outline" size={20} color={colors.keppel} style={styles.inputIcon} />
                )}
              </View>
              {errors.confirmPassword && <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>}


              <View style={styles.terms}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('TermsAndConditions')}>
                  <View style={styles.linkWrapper}>
                    <Text style={styles.linkText}>Read Terms and Conditions</Text>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
                  </View>
                </TouchableWithoutFeedback>

                {/* <View style={styles.checkboxContainer}>
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
                </TouchableWithoutFeedback> */}

                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={privacyAccepted}
                    onValueChange={() => setPrivacyAccepted(!privacyAccepted)}
                    color={privacyAccepted ? colors.keppel : undefined}
                  />
                  <Text style={styles.checkboxLabel}>I accept the privacy policy</Text>
                </View>
              </View>

              <CustomButton
                title="Register"
                color={colors.bleuDeFrance}
                onPress={handleSubmit}
                magicNumber={0.8}
                disabled={!dirty || !isValid || !privacyAccepted || !_.isEmpty(errors)}
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.seasalt
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
    borderColor: colors.slateGray,
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderRadius: 100,
    paddingVertical: 12,
    backgroundColor: colors.antiFlashWhite,
    maxWidth: '100%',
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
    color: colors.ultraViolet,
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
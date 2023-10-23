import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StyleSheet, View, TextInput, Text, ScrollView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { colors } from '../../../styles/styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DeleteAccount from '../../components/DeleteAccount';
import { useAuth } from '../../context/AuthContext';
import { updateUser } from '../../api/users';

const Profile = ({ navigation }) => {
  const { logout, userInfo, userRole } = useAuth()

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phoneNumber: Yup.string().required('Phone number is required').matches(
      /^(((\+|00)359[- ]?)|(0))(8[- ]?[789]([- ]?\d){7})$/gm,
      "Plese enter valid phone number"
    ),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8).required('Password is required').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    confirmPassword: Yup.string().required('Confirm password is required').min(8).oneOf([Yup.ref('password')], 'Your password do not match'),
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (values) => {
    try {
      const res = await updateUser(userInfo.id, values)
      if (res) {
        Alert.alert(
          'Changes saved!',
          null,
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate("Map"),
            },
          ],
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {userRole !== "ROLE_ORDINARY_USER" && <View>
        <Text style={styles.heading}>{`${userInfo.firstName} ${userInfo.lastName}`}</Text>
      </View>}

      <View style={styles.container}>
        <Formik
          initialValues={{ firstName: userInfo.firstName, lastName: userInfo.lastName, phoneNumber: userInfo.phoneNumber, email: userInfo.email, password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit, values, errors, isValid, dirty, setFieldValue }) => (
            <View style={styles.form}>
              {userRole === "ROLE_ORDINARY_USER" && (
                <>
                  <View>
                    <TextInput
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      placeholder="First name"
                      style={styles.input}
                    />

                    {values.firstName && !errors.firstName && (
                      <MaterialCommunityIcons name="check-circle" size={20} color={colors.keppel} style={styles.inputIcon} />
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
                      <MaterialCommunityIcons name="check-circle" size={20} color={colors.keppel} style={styles.inputIcon} />
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
                      <MaterialCommunityIcons name="check-circle" size={20} color={colors.keppel} style={styles.inputIcon} />
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
                      <MaterialCommunityIcons name="check-circle" size={20} color={colors.keppel} style={styles.inputIcon} />
                    )}
                  </View>
                  {errors.email && <Text style={styles.errorMessage}>{errors.email}</Text>}
                </>
              )}

              <View>
                <TextInput
                  value={values.password}
                  placeholder="Password"
                  secureTextEntry={!passwordVisible}
                  style={[styles.input, { paddingRight: 40, overflow: 'hidden', }]}
                  onChangeText={handleChange('password')}
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
                  <MaterialCommunityIcons name="check-circle-outline" size={20} color="green" style={styles.inputIcon} />
                )}
              </View>
              {errors.confirmPassword && <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>}

              <View>
                <CustomButton
                  title="Save Changes"
                  color={colors.bleuDeFrance}
                  onPress={handleSubmit}
                  magicNumber={0.8}
                  // disabled={!isValid}
                  style={styles.btn}
                />

                <CustomButton
                  title="Log out"
                  color={colors.keppel}
                  magicNumber={0.8}
                  onPress={() => logout()}
                  style={styles.btn}
                />

                {userRole === "ROLE_ORDINARY_USER" && <CustomButton
                  title="Delete Account"
                  color={colors.ultraViolet}
                  magicNumber={0.8}
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.btn}
                />}

              </View>
            </View>
          )}
        </Formik>

        <DeleteAccount modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: colors.seasalt
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 40
  },
  heading: {
    fontFamily: 'Roboto-Regular',
    fontSize: 22,
    marginLeft: 40
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
  btn: {
    marginTop: 12
  }
});


export default Profile;
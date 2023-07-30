import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StyleSheet, View, TextInput, Text, Modal, Alert, Pressable, ScrollView } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { colors } from '../../../styles/styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import DeleteAccount from '../../components/DeleteAccount';


const Profile = ({ navigation }) => {
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

  const [modalVisible, setModalVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = values => {
    console.log(values);
    navigation.navigate('Map')
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        {/* <Image
        style={styles.image}
        source={require('../../../assets/images/bike3.jpg')}
      /> */}

        <Formik
          initialValues={{ firstName: '', lastName: '', phoneNumber: '', email: '', password: '' }}
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
                  <Icon name="check-circle" size={20} color="green" style={styles.inputIcon} />
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
                  <Icon name="check-circle" size={20} color="green" style={styles.inputIcon} />
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
                  <Icon name="check-circle" size={20} color="green" style={styles.inputIcon} />
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
                  <Icon name="check-circle" size={20} color="green" style={styles.inputIcon} />
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
                <Icon
                  name={passwordVisible ? 'eye' : 'eye-slash'}
                  size={20}
                  color="#888"
                  style={styles.inputIcon}
                  onPress={togglePasswordVisibility}
                />
              </View>
              {errors.password && <Text style={styles.errorMessage}>{errors.password}</Text>}

              <View>
                <CustomButton
                  title="Save Changes"
                  color={colors.primary}
                  onPress={handleSubmit}
                  magicNumber={0.8}
                  disabled={!isValid}
                  style={styles.btn}
                />

                <CustomButton
                  title="Log out"
                  color={colors.secondary}
                  magicNumber={0.8}
                  onPress={() => navigation.navigate('Home')}
                  style={styles.btn}
                />

                <CustomButton
                  title="Delete Account"
                  color={colors.lightred}
                  magicNumber={0.8}
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.btn}
                />
              </View>
            </View>
          )}
        </Formik>

        <DeleteAccount modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </View>
    </ScrollView>
  );
};

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
    color: colors.red
  },
  btn: {
    marginTop: 12
  }
});


export default Profile;
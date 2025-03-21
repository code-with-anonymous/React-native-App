import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation, setIsLoggedIn, setRole }) => {
  const [loading, setLoading] = useState(false);

  // Validation Schema for Formik
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  // Handle Login

  // const handleLogin = async (values) => {
  //   const { email, password } = values;
  //   setLoading(true);

  //   try {
  //     const response = await axios.post('http://192.168.100.3:5001/api/login', {
  //       email,
  //       password,
  //     });

  //     // Log the response to see its structure
  //     console.log('Response:', response.data);

  //     // Correctly destructure the response
  //     const { token, user } = response.data;

  //     // Get role from user object
  //     const { role } = user;
  //     console.log("role",role)

  //     // Store the token
  //     await AsyncStorage.setItem('authToken', token);
  //     // Navigate based on role
  //     if (role === 'manager') {
  //       navigation.navigate('AdminDashboard');
  //       Alert.alert('Login Successful', 'Welcome Manager!');
  //     } else if (role === 'attendee') {
  //       console.log(navigation.getState());
  //       navigation.navigate('ExploreMore');
  //       Alert.alert('Login Successful', 'Welcome Customer!');
  //     } else {
  //       Alert.alert('Error', 'User role not recognized.');
  //     }
  //   } catch (error) {
  //     // Detailed error handling
  //     const errorMessage =
  //       error.response?.data?.message ||
  //       error.response?.data?.error ||
  //       error.message ||
  //       'Login failed. Please try again.';

  //     console.error('Login error:', errorMessage);
  //     Alert.alert('Login Failed', errorMessage);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.100.3:5001/api/login', values);
      const { token, user } = response.data;
  
      if (token && user.role) {
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('userRole', user.role);
  
        setIsLoggedIn(true);
        setRole(user.role);
  
        Alert.alert('Login Successful', `Welcome ${user.role === 'manager' ? 'Manager' : 'Customer'}!`);
  
        // Use setTimeout to ensure state updates before navigation reset
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: user.role === 'manager' ? 'AdminDashboard' : 'ExploreMore' }],
          });
        }, 100);
      } else {
        Alert.alert('Error', 'Invalid login response');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      Alert.alert('Login Failed', errorMessage);
      console.log(error.message);  
    } finally {
      setLoading(false);
    }
  };
  


  // Handle Forgot Password
  const handleForgotPassword = (email) => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    axios
      .post('http://yourserverurl:5000/forgot-password', { email })
      .then(() => {
        Alert.alert('Password Reset', 'Password reset email sent successfully.');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg' }} // Logo URL
        style={styles.logo}
      />
      <ScrollView>
        <Text style={styles.restaurantName}>Event Hub</Text>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              {loading ? (
                <ActivityIndicator size="large" color="#000" />
              ) : (
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              )}

              {/* Forgot Password */}
              <TouchableOpacity onPress={() => handleForgotPassword(values.email)}>
                <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={styles.registerText}>Don't have an account? Register here</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  logo: {
    width: 200,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  restaurantName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f1f1f1',
    color: '#333',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
  },
  registerText: {
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
  },
});

export default LoginScreen;

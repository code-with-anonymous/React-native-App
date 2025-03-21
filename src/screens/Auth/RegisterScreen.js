import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {Formik} from 'formik';
import * as Yup from 'yup';

const RegisterScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Validation Schema for Formik
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Handle User Registration with MongoDB
  const handleRegister = async values => {
    const {name, email, password} = values;
    setLoading(true);
    try {
      // Send the registration data to the backend (MongoDB)
      const response = await axios.post(
        'http://192.168.100.3:5001/api/register',
        {
          name,
          email,
          password,
          role,
        },
      );

      console.log(response.data.message); // Registration success message

      // Set success state to true to display success message
      setRegistrationSuccess(true);

      // Navigate to login screen after delay
      setTimeout(() => {
        navigation.navigate('LoginScreen');
      }, 2000); // Wait for 2 seconds before navigating
    } catch (error) {
      console.error('error:', {
        message: error.message,
        request: error.request,
        response: error.response,
        config: error.config,
      });
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg',
        }} // Logo URL
        style={styles.logo}
      />
      <ScrollView>
        <Text style={styles.restaurantName}>Event Hub</Text>

        <Formik
          initialValues={{name: '', email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={values => handleRegister(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              {/* Name Input */}
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#aaa"
                autoCapitalize="words"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              {/* Email Input */}
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
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              {/* Password Input */}
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              {/* Role Selection (Radio Buttons) */}
              <Text style={styles.label}>Select your role:</Text>
              <View style={styles.roleContainer}>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    role === 'attendee' && styles.selectedRadio,
                  ]}
                  onPress={() => setRole('attendee')}>
                  <Text style={styles.radioText}>Attendee</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    role === 'manager' && styles.selectedRadio,
                  ]}
                  onPress={() => setRole('manager')}>
                  <Text style={styles.radioText}>Manager</Text>
                </TouchableOpacity>
              </View>
              {!role && (
                <Text style={styles.errorText}>Please select a role</Text>
              )}

              {/* Loading Indicator or Register Button */}
              {loading ? (
                <ActivityIndicator size="large" color="#000" />
              ) : (
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor:
                        role === 'attendee' ? '#4CAF50' : '#FF6347',
                    },
                  ]} // Button color based on role
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
              )}

              {/* Navigate to Login */}
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.loginText}>
                  Already have an account? Login here
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        {/* Success Message */}
        {registrationSuccess && (
          <View style={styles.successMessage}>
            <Text style={styles.successText}>
              Registration Successful, Welcome {role}!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  restaurantName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginVertical: 10,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    width: '48%',
    justifyContent: 'center',
  },
  selectedRadio: {
    backgroundColor: '#4CAF50',
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50', // Default green button color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },
  successMessage: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  successText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;

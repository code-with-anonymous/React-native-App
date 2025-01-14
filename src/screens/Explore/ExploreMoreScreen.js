// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   ImageBackground,
//   TouchableOpacity,
//   SafeAreaView,
//   Dimensions,
// } from 'react-native';
// const LandingPage = ({ navigation }) => {

//   // user authentication

//   const getToken = async () => {
//     try {
//       const token = await AsyncStorage.getItem('authToken');
//       return token;
//     } catch (error) {
//       console.error('Error retrieving token:', error);
//       return null;
//     }
//   };

//   const verifyToken = async (token) => {
//     try {
//       const response = await apiClient.post('/api/verify-token', { token });
//       return response.data.isValid; // Assume the server responds with { isValid: true/false }
//     } catch (error) {
//       console.error('Token verification failed:', error);
//       return false;
//     }
//   };
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await getToken();
//       if (token) {
//         const isValid = await verifyToken(token);
//         if (isValid) {
//           setIsLoggedIn(true);
//         } else {
//           navigation.navigate('/login'); // Redirect to login if token is invalid
//         }
//       } else {
//         navigation.navigate('/login'); // Redirect to login if no token is found
//       }
//     };

//     checkAuth();
//   }, [navigate]);

//   const handleNavigation = (route) => {
//     // Navigation function to be implemented based on your navigation setup
//     console.log(`Navigating to: ${route}`);
//     navigation.navigate(route);
//   };

//   return (
//     <ImageBackground
//       source={{ uri: 'https://images.pexels.com/photos/1472673/pexels-photo-1472673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} // Replace with your actual image
//       style={styles.backgroundImage}
//     >
//       <View style={styles.overlay}>
//         <SafeAreaView style={styles.container}>
//           {/* Header Section */}
//           <View style={styles.headerContainer}>
//             <Text style={styles.title}>Event Hub</Text>
//             <Text style={styles.subtitle}>
//               Your complete event management solution
//             </Text>
//           </View>

//           {/* Buttons Section */}
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => handleNavigation('AddEvent')}
//             >
//               <Text style={styles.buttonTitle}>Create Event</Text>
//               <Text style={styles.buttonSubtext}>Start planning your next event</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => handleNavigation('GetEvent')}
//             >
//               <Text style={styles.buttonTitle}>Manage Events</Text>
//               <Text style={styles.buttonSubtext}>Control your existing events</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => handleNavigation('ExploreEvents')}
//             >
//               <Text style={styles.buttonTitle}>Explore Events</Text>
//               <Text style={styles.buttonSubtext}>Discover amazing events</Text>
//             </TouchableOpacity>
//           </View>
//         </SafeAreaView>
//       </View>
//     </ImageBackground>
//   );
// };

// const { width } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text visibility
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     justifyContent: 'center',
//   },
//   headerContainer: {
//     alignItems: 'center',
//     marginBottom: 60,
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#FFFFFF',
//     textAlign: 'center',
//     opacity: 0.9,
//   },
//   buttonContainer: {
//     gap: 20,
//   },
//   button: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 15,
//     padding: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   buttonTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   buttonSubtext: {
//     fontSize: 14,
//     color: '#666666',
//     textAlign: 'center',
//   },
// });

// export default LandingPage;




import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios';

const LandingPage = ({ navigation }) => {
  // user authentication

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return token;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  };

  const verifyToken = async (token) => {
    try {
      const response = await axios.post('http://192.168.100.4:5001/api/verify-token', { token });
      return response.data.isValid; // Assume the server responds with { isValid: true/false }
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (token) {
        const isValid = await verifyToken(token);
        console.log(isValid)
        if (isValid) {
          setIsLoggedIn(true);
          navigation.navigate('ExploreMore')
          // console.log("User is logged in", isLoggedIn);
        } else {
          navigation.navigate('LoginScreen'); // Use 'Login' without slash for navigation
        }
      } else {
        navigation.navigate('LoginScreen'); // Use 'Login' without slash for navigation
      }
    };
    
    checkAuth();
    console.log(isLoggedIn)
  }, [navigation]); // Corrected dependency to 'navigation'

  const handleNavigation = (route) => {
    // Navigation function to be implemented based on your navigation setup
    console.log(`Navigating to: ${route}`);
    navigation.navigate(route);
  };
  console.log(isLoggedIn)

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/1472673/pexels-photo-1472673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} // Replace with your actual image
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Event Hub</Text>
            <Text style={styles.subtitle}>
              Your complete event management solution
            </Text>
          </View>

          {/* Buttons Section */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleNavigation('AddEvent')}
            >
              <Text style={styles.buttonTitle}>Create Event</Text>
              <Text style={styles.buttonSubtext}>Start planning your next event</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleNavigation('GetEvent')}
            >
              <Text style={styles.buttonTitle}>Manage Events</Text>
              <Text style={styles.buttonSubtext}>Control your existing events</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleNavigation('ExploreEvents')}
            >
              <Text style={styles.buttonTitle}>Explore Events</Text>
              <Text style={styles.buttonSubtext}>Discover amazing events</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text visibility
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  buttonContainer: {
    gap: 20,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 5,
  },
  buttonSubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});

export default LandingPage;

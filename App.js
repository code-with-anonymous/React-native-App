// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import AppNavigator from './src/navigations/AppNavigator';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [role, setRole] = useState(null);

//   const getToken = async () => {
//     try {
//       return await AsyncStorage.getItem('authToken');
//     } catch (error) {
//       console.error('Error retrieving token:', error);
//       return null;
//     }
//   };

//   const verifyToken = async (token) => {
//     try {
//       const response = await axios.post('http://192.168.100.4:5001/api/verify-token', { token });
//       return response.data; // Expected { isValid: true, user: { role: 'admin' | 'customer' } }
//     } catch (error) {
//       console.error('Token verification failed:', error);
//       return { isValid: false };
//     }
//   };

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await getToken();
//       if (token) {
//         try {
//           const data = await verifyToken(token);
//           console.log('Token verification response:', data);

//           if (data.isValid && data.user) {
//             setIsLoggedIn(true);
//             setRole(data.user.role);
//             await AsyncStorage.setItem('userRole', data.user.role);
//           } else {
//             setIsLoggedIn(false);
//             setRole(null);
//             await AsyncStorage.removeItem('authToken');
//           }
//         } catch (error) {
//           console.error('Error verifying token:', error);
//         }
//       } else {
//         setIsLoggedIn(false);
//         setRole(null);
//       }
//     };

//     checkAuth();
//   }, []);

//   return (
//     <NavigationContainer>
//       <AppNavigator isLoggedIn={isLoggedIn} role={role} />
//     </NavigationContainer>
//   );
// };

// export default App;


import React, { useEffect, useState } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppNavigator from './src/navigations/AppNavigator';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initially null to prevent premature verification
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // Prevents navigation until state is updated

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('authToken');
  //       if (!token) {
  //         setIsLoggedIn(false);
  //         setRole(null);
  //       } else {
  //         const response = await axios.post('http://192.168.100.4:5001/api/verify-token', { token });
  //         if (response.data.isValid && response.data.user) {
  //           setIsLoggedIn(true);
  //           setRole(response.data.user.role);
  //           await AsyncStorage.setItem('userRole', response.data.user.role);
  //         } else {
  //           setIsLoggedIn(false);
  //           setRole(null);
  //           await AsyncStorage.removeItem('authToken');
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error verifying token:', error);
  //       setIsLoggedIn(false);
  //       setRole(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, []);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const role = await AsyncStorage.getItem('userRole'); 
        console.log("role",role)// Fetch saved role
        const token = await AsyncStorage.getItem('authToken');
        console.log("Retrieved Token:", token); // Debugging Log
  
        if (!token) {
          setIsLoggedIn(false);
          setRole(null);
        } else {
          const response = await axios.post('http://192.168.100.3:5001/api/verify-token', { token });
  
          if (response.data.isValid && response.data.user) {
            setIsLoggedIn(true);
            setRole(response.data.user.role);
            await AsyncStorage.setItem('userRole', response.data.user.role);
          } else {
            setIsLoggedIn(false);
            setRole(null);
            await AsyncStorage.removeItem('authToken');
          }
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsLoggedIn(false);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };
  
    checkAuth();
  }, []);
  
  if (loading) return null; // Prevent navigation rendering until authentication check is done

  return (
    <NavigationContainer>
      <AppNavigator isLoggedIn={isLoggedIn} role={role} setIsLoggedIn={setIsLoggedIn} setRole={setRole} />
    </NavigationContainer>
  );
};

export default App;

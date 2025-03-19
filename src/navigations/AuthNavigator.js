// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// // Auth Screens
// import LoginScreen from '../screens/Auth/LoginScreen';
// import RegisterScreen from '../screens/Auth/RegisterScreen';

// // Explore & Events Screens
// import ExploreMoreScreen from '../screens/Explore/ExploreMoreScreen';
// import EventsList from '../screens/Frontend/EventList';
// import EnrolledEventsScreen from '../components/EnrolledEvents';
// import EventDetails from '../screens/Frontend/singleEventPage';
// import ProfileScreen from '../screens/Frontend/Profile';

// // Admin Screens
// import AdminDashboard from '../screens/Dashboard/DahboardHome';
// import AddEvent from '../screens/Dashboard/AddEvent';
// import GetEvent from '../screens/Dashboard/GetEvent';

// const Stack = createStackNavigator();

// const AppNavigator = ({ isLoggedIn, role }) => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {isLoggedIn ? (
//           role === 'admin' ? (
//             <>
//               <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
//               <Stack.Screen name="AddEvent" component={AddEvent} />
//               <Stack.Screen name="GetEvent" component={GetEvent} />
//             </>
//           ) : role === 'customer' ? (
//             <>
//               <Stack.Screen name="ExploreMore" component={ExploreMoreScreen} />
//               <Stack.Screen name="EventsList" component={EventsList} />
//               <Stack.Screen name="EnrolledEventsScreen" component={EnrolledEventsScreen} />
//               <Stack.Screen name="SingleEventScreen" component={EventDetails} />
//               <Stack.Screen name="UserProfileScreen" component={ProfileScreen} />
//             </>
//           ) : (
//             <Stack.Screen name="ExploreMore" component={ExploreMoreScreen} />
//           )
//         ) : (
//           <>
//             <Stack.Screen name="LoginScreen" component={LoginScreen} />
//             <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;

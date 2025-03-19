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
// import AdminDashboard from '../screens/Dashboard/DashboardHome';
// import AddEvent from '../screens/Dashboard/AddEvent';
// import GetEvent from '../screens/Dashboard/GetEvent';

// const Stack = createStackNavigator();

// const AppNavigator = ({ isLoggedIn, role }) => {
//   console.log('AppNavigator:', { isLoggedIn, role });

//   return (

//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {isLoggedIn ? (
//           role === 'manager' ? (
//             <>
//               <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
//               <Stack.Screen name="AddEvent" component={AddEvent} />
//               <Stack.Screen name="GetEvent" component={GetEvent} />
//             </>
//           ) : role === 'attendee' ? (
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

//   );
// };

// export default AppNavigator;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

// User Screens
import ExploreMoreScreen from '../screens/Explore/ExploreMoreScreen';
import EventsList from '../screens/Frontend/EventList';
import EnrolledEventsScreen from '../components/EnrolledEvents';
import EventDetails from '../screens/Frontend/singleEventPage';
import ProfileScreen from '../screens/Frontend/Profile';

// Admin Screens
import AddEvent from '../screens/Dashboard/AddEvent';
import GetEvent from '../screens/Dashboard/GetEvent';
import AdminDashboard from '../screens/Dashboard/DashboardHome';

const Stack = createStackNavigator();

const AppNavigator = ({isLoggedIn, role, setIsLoggedIn, setRole}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        role === 'manager' ? (
          <>
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
            <Stack.Screen name="AddEvent" component={AddEvent} />
            <Stack.Screen name="GetEvent" component={GetEvent} />
          </>
        ) : (
          <>
            <Stack.Screen name="ExploreMore" component={ExploreMoreScreen} />
            <Stack.Screen name="EventsList" component={EventsList} />
            <Stack.Screen
              name="EnrolledEventsScreen"
              component={EnrolledEventsScreen}
            />
            <Stack.Screen name="SingleEventScreen" component={EventDetails} />
            <Stack.Screen name="UserProfileScreen">
              {props => (
                <ProfileScreen {...props} 
                setIsLoggedIn={setIsLoggedIn}
                setRole={setRole}
                />
              )}
            </Stack.Screen>
          </>
        )
      ) : (
        <>
          <Stack.Screen name="LoginScreen">
            {props => (
              <LoginScreen
                {...props}
                setIsLoggedIn={setIsLoggedIn}
                setRole={setRole}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;

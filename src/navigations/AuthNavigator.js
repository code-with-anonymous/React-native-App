import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Explore MoreScreen
// import ExploreMoreScreen from '../screens/Explore/ExploreMoreScreen.js';

// Auth Screens
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import AddEvent from '../screens/Frontend/AddEvent';
import GetEvent from '../screens/Frontend/GetEvent';
import ExploreMoreScreen from '../screens/Explore/ExploreMoreScreen';



const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
  <Stack.Navigator screenOptions={{ headerShown: false }}> 
       {/* Exolore More Screen */}
   <Stack.Screen name="ExploreMore" component={ExploreMoreScreen} /> 
           {/* Auth Screens */}
     {/* <Stack.Screen name="RegisterScreen" component={RegisterScreen} />   */}
     {/* <Stack.Screen name="LoginScreen" component={LoginScreen} />   */}
         <Stack.Screen name="AddEvent" component={AddEvent} />         
         <Stack.Screen name="GetEvent" component={GetEvent} />         
  

             
     
     </Stack.Navigator>
  );
};

export default AppNavigator;
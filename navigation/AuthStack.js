import React, {useState,useEffect} from 'react';
import {Text } from 'react-native';
import LoginScreen from '../Screens/Login/LoginScreen';
import OnboardingScreen from '../Screens/Login/Onboarding';
import {createStackNavigator} from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignupScreen from '../Screens/Login/SignupScreen'

const Stack = createStackNavigator();

const AuthStack = () => {
    
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;


  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = 'Onboarding'
  } else {
    routeName = 'Login'
  }

  return (
    <Stack.Navigator
        initialRouteName={routeName}>
       
        <Stack.Screen 
          options={{headerShown: false}}
          name="Onboarding" 
          component={OnboardingScreen} />
        
        <Stack.Screen
            options={{headerShown: false}}
            name="Login" 
            component={LoginScreen} />

        <Stack.Screen
          options={{
            headerTitle:'',
            headerStyle:{
              elevation:0,
              shadowOpacity:0
            }
          }}
          name="Signup" 
          component={SignupScreen}/>
          
    </Stack.Navigator>

  )
}
export default AuthStack;
import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Auth, Hub } from 'aws-amplify'

import ConfirmEmailScreen from '../screens/ConfirmEmailScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const [user, setUser ] = useState<any>(undefined) 

  // check authentication status of user
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser( { bypassCache: true })
      setUser(authUser)
    } catch(e) {
      setUser(null)
    }
  }

  // only checks once when component is mounted
  // useEffect(() => {
  //   checkUser()
  // }, [])

  // listens to Auth events and checks auth status of user
  useEffect(() => {
    const listener = (data: any) => {
      if (data.payload.event === 'signIn' || data.payload.event ==='signOut') {
        checkUser()
      }
    }
    Hub.listen('auth', listener)
    // return () => Hub.remove('auth', listener)
  }, [])

  if (user === undefined) {
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
    
  }

  // conditionally renders or makes available either auth flow or home screen depending on auth state of user
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        { user ? (
          <Stack.Screen name='Home' component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
          </>
        )
      
      }
      </Stack.Navigator> 
    </NavigationContainer>
      
   
  )
}

export default Navigation

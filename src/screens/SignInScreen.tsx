import { View, Text, Image, StyleSheet, useWindowDimensions, Alert, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import SocialSignInButtons from '../components/SocialSignInButtons'
import { useNavigation } from '@react-navigation/native'
import { useForm, FieldValues } from 'react-hook-form'

const SignInScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const { height } = useWindowDimensions()
  const navigation = useNavigation()

  console.log('Errors: ' + errors)

  const onSignInPressed = async (data: FieldValues) => {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      const response = await Auth.signIn(data.username, data.password)
      console.log('Auth object: ' + response)
      // navigation.navigate('Home' as never)
    } catch(e: any) {
      Alert.alert('Oops', e.message)
    }

    setLoading(false)
  }

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword' as never)
  }

  const onSignUpPressed = () => {
    navigation.navigate('SignUp' as never)
  }
  // TODO set up social provider logins
  return (
    <ScrollView style={styles.root} contentContainerStyle={{alignItems: 'center',}}>
      <Image source={require('../../assets/images/Logo_1.png')} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain" />
      <CustomInput placeholder="Username" control={control} name='username' rules={{
          required: 'Username is required.',
        }} 
      />
      <CustomInput placeholder="Password" control={control} name='password' secureTextEntry rules={{
          required: 'Password is required.',
          minLength: {value: 3, message: 'Password should be minimum 3 characters long.'}
        }}
      />

      <CustomButton text={ loading ? "Loading..." : "Sign In" } onPress={ handleSubmit(onSignInPressed) } type="PRIMARY"/>

      <CustomButton text="Forgot Password?" onPress={ onForgotPasswordPressed } type="TERTIARY"/>
      
      <SocialSignInButtons />

      <CustomButton text="Don't have an account? Create one." onPress={ onSignUpPressed } type="TERTIARY"/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: '50%',
    maxWidth: 250,
    maxHeight: 150,
    marginTop: 10
  },
  root: {
    padding: 10,
  }
})



export default SignInScreen
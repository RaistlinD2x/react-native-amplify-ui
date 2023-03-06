import { View, Text, StyleSheet, Alert } from 'react-native'
import React from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import SocialSignInButtons from '../components/SocialSignInButtons'
import { useNavigation } from '@react-navigation/core'
import { Auth } from 'aws-amplify'
import { FieldValues, useForm } from 'react-hook-form'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const SignUpScreen = () => {
  const {control, handleSubmit, watch} = useForm()
  const username = watch('username')
  const pwd = watch('password')
  const navigation = useNavigation()

  type SignUpDataProps = {
    username: string,
    password: string,
    email: string,
    name: string
  }



  const onRegisterPressed = async (data: FieldValues) => {
    const { username, password, email, name } = data
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          preferred_username: username,
          email, 
          name
        }
      }
      )
      navigation.navigate('ConfirmEmail' as never, {username: username} as never)
    } catch(e: any) {
      Alert.alert('Oops', e.message)
    }
  }

  const onTermsOfUsePressed = () => {
    console.warn('Terms of Use')
  }

  const onPrivacyPolicyPressed = () => {
    console.warn('Privacy Policy')
  }

  const onSignInPressed = () => {
    navigation.navigate('SignIn' as never)
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Create an Account</Text>
      <CustomInput 
        placeholder="name" 
        name="name"
        rules={{
          required: "Full Name is required."
        }}
        control={control}
      />
      
      <CustomInput 
        placeholder="Username"
        rules={{
          required: "Username is required",
          minLength: {value: 3, message: "Username must be a minimum of 3 characters long."},
          maxLength: {value: 24, message: "Username must be a maximum of 24 characters long."}
        }}
        name="username" 
        control={control}
      />
      
      <CustomInput 
        placeholder="Email" 
        name="email"
        rules={{
          required: "A valid email is required.",
          pattern: { value: EMAIL_REGEX, message: "Email is invalid." }
        }}
        control={control}
      />
      
      <CustomInput 
        placeholder="Password" 
        name="password" 
        rules={{
          required: "Password is required",
          minLength: {value: 8, message: "Password must be a minimum of 8 characters long."},
        }}
        control={control}
        secureTextEntry
      />
      
      <CustomInput 
        placeholder="Repeat Password" 
        name="password-repeat"
        rules={{
          validate: (value: string) => value === pwd || 'Passwords do not match.'
        }}
        control={control}
        secureTextEntry
      />

      <CustomButton text="Register" onPress={ handleSubmit(onRegisterPressed) } type="PRIMARY"/>

      <Text style={styles.text}>
        By registering, you confirm that you accept our 
        <Text style={styles.link} onPress={onTermsOfUsePressed}>{' '}Terms of Use</Text> and 
        <Text style={styles.link} onPress={onPrivacyPolicyPressed}>{' '}Privacy Policy</Text>
      </Text>

      <SocialSignInButtons />

      <CustomButton text="Have an account? Sign in." onPress={ onSignInPressed } type="TERTIARY"/>
    </View>
  )
}

const styles = StyleSheet.create({
  link: {
    color: '#FDB075'
  },
  text: {
    color: 'gray',
    marginVertical: 10
  },
  root: {
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  }
})



export default SignUpScreen
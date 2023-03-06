import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Auth } from 'aws-amplify'
import { FieldValues, useForm } from 'react-hook-form'

const ConfirmEmailScreen = () => {
  const route: any = useRoute()
  const { control, handleSubmit, watch } = useForm()
  const navigation = useNavigation()

  const username = route?.params.username

  console.log(username)

  const onConfirmPressed = async (data: FieldValues) => {
    try {
      console.log(username)
      await Auth.confirmSignUp(data.username, data.code)
      // TODO Need to update the signin form with the username data for UX purposes
      navigation.navigate('SignIn' as never, {username: username} as never)
      // TODO clear Username and Password fields when you navigate back
    } catch(e: any) {
      Alert.alert('Oops', e.message)
    }
  }

  const onBackToSignInPressed = () => {
    navigation.navigate('SignIn' as never)
  }

  const onResendPressed = async (data: FieldValues) => {
    try {
      await Auth.resendSignUp(data.username)
      Alert.alert('Success', 'Code was resent to your email')
    } catch(e: any) {
      Alert.alert('Oops', e.message)
    }
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Confirm Your Email</Text>
      <CustomInput placeholder="Username" control={control} name='username' rules={{
        required: 'Username is required.'
      }}/>
      <CustomInput placeholder="Enter your confirmation code" name="code" control={control} rules={{
        required: 'Confirmation code is required.'
      }}
      />

      <CustomButton text="Confirm" onPress={ handleSubmit(onConfirmPressed) } type="PRIMARY"/>

      <CustomButton text="Resend Code" onPress={() => onResendPressed(username) } type="SECONDARY"/>

      <CustomButton text="Back to sign in" onPress={ onBackToSignInPressed } type="TERTIARY"/>
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



export default ConfirmEmailScreen
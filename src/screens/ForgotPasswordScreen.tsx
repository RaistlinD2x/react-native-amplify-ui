import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { FieldValues, useForm } from 'react-hook-form'
import { Auth } from 'aws-amplify'

const ForgotPasswordScreen = () => {
  const { control, handleSubmit, watch } = useForm()
  const [ username, setUsername ] = useState('')

  const navigation = useNavigation()

  const onBackToSignInPressed = () => {
    navigation.navigate('SignIn'as never)
  }

  const onSendPressed = async (data: FieldValues) => {
    try {
      const response = await Auth.forgotPassword(data.username)
      navigation.navigate('NewPassword' as never)
    } catch(e: any) {
      Alert.alert('Oops', e.message)
    }
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Reset Your Password</Text>
      <CustomInput placeholder="Username" name="username" control={control} rules={{
        required: 'Username is required.'
      }}/>

      <CustomButton text="Send" onPress={ handleSubmit(onSendPressed) } type="PRIMARY"/>

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



export default ForgotPasswordScreen
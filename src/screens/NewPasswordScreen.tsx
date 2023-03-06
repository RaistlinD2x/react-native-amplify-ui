import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { FieldValues, useForm } from 'react-hook-form'
import { Auth } from 'aws-amplify'

type Nav = {
  navigate: (value: string) => void;
}

const NewPasswordScreen = () => {
  const { control, handleSubmit, watch } = useForm()
  const navigation = useNavigation<Nav>()

  const onSubmitPressed = async (data: FieldValues) => {
    try {
      const response = await Auth.forgotPasswordSubmit(data.username, data.code, data.password)
      navigation.navigate('SignIn' as never)
    } catch(e: any) {
      Alert.alert('Oops', e.message)
    }
  }

  const onBackToSignInPressed = () => {
    navigation.navigate('SignIn')
  }


  return (
    <View style={styles.root}>
      <Text style={styles.title}>New Password</Text>

      <CustomInput placeholder="Username" name="username" control={control} rules={{
        required: 'Username is required'
        }}
      />
      <CustomInput placeholder="Code" name="code" control={control} rules={{
        required: 'Code is required'
        }}
      />
      <CustomInput placeholder="Enter new password" name="password" control={control} rules={{
          required: "Password is required",
          minLength: {value: 8, message: "Password must be a minimum of 8 characters long."},
        }}
        secureTextEntry
      />

      <CustomButton text="Submit" onPress={ handleSubmit(onSubmitPressed) } type="PRIMARY"/>

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



export default NewPasswordScreen
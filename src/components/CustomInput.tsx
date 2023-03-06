import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'

interface CustomInputInterface {
    control: Control<FieldValues, any> | undefined,
    name: string
    placeholder: string,
    secureTextEntry?: boolean
    rules: any
}

const CustomInput = ( { control, name, rules, placeholder, secureTextEntry}: CustomInputInterface ) => {
  console.log(control!["_formState"])
  console.log(rules)
  return (
    
      <Controller 
        control={control}
        name={name}
        rules={rules}
        render={ ({field: {value, onChange, onBlur}, fieldState: { error }}) =>
        <>
          <View style={[
              styles.container,
              { borderColor: error ? 'red' : '#e8e8e8' }
            ]}>
            <TextInput 
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              secureTextEntry={secureTextEntry}
            />
          </View>
          { error && <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text> }
        </>
            
            }
          />
    
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 3
    },
    input: {
        
    },
})

export default CustomInput
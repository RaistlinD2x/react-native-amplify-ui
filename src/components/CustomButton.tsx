import { Text, StyleSheet, Pressable, ViewStyle, TextStyle, StyleProp } from 'react-native'
import React from 'react'

interface ButtonInterface {
    onPress: () => void,
    text: string,
    type?: string,
    bgColor?: string,
    fgColor?: string
}

const CustomButton = ({ onPress, text, type, bgColor, fgColor }: ButtonInterface) => {
    const buttonContainerStyle: StyleProp<ViewStyle>[] = [styles.container]
    const textContainerStyle: StyleProp<TextStyle>[] = [styles.text]

    if (type === 'PRIMARY') {
        buttonContainerStyle.push(styles.container_PRIMARY)
    } else if (type === 'SECONDARY') {
        buttonContainerStyle.push(styles.container_SECONDARY)
        textContainerStyle.push(styles.text_SECONDARY)
    } else if (type === 'TERTIARY') {
        buttonContainerStyle.push(styles.container_TERTIARY)
        textContainerStyle.push(styles.text_TERTIARY)
    }

    if (bgColor) {
        buttonContainerStyle.push({ backgroundColor: bgColor })
    }

    if (fgColor) {
        textContainerStyle.push({ color: fgColor })
    }

  return (
    <Pressable 
        onPress={onPress} 
        style={buttonContainerStyle}
    >
      <Text style={textContainerStyle}>{ text }</Text>
    </Pressable>
  )
  
}

const styles = StyleSheet.create({
    container: {
        

        width: '100%',
        padding: 12,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 5
    },

    container_PRIMARY: {
        backgroundColor: '#3B71F3',
    },

    container_SECONDARY: {
        borderColor: '#3B71F3',
        borderWidth: 2
    },
    
    container_TERTIARY: {

    },

    text: {
        fontWeight: 'bold',
        color: 'white'
    },

    text_SECONDARY: {
        color: 'blue'
    },

    text_TERTIARY: {
        color: 'gray'
    }
})

export default CustomButton
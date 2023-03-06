import React from 'react';
import { Amplify, Auth } from 'aws-amplify';
// @ts-ignore
import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native'
import config from './src/aws-exports';
import { ScrollView, StyleSheet } from 'react-native';
import Navigation from './src/navigation/index';
import signUpConfig from './signUpConfig'

Amplify.configure(config);

function App() {
  Auth.signOut()

  return (
    <Navigation />   
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  }
})

// withAuthenticator theme modifications
// const customTheme = { 
//   ...AmplifyTheme,
//   button: {
//     ...AmplifyTheme.button,
//     backgroundColor: 'blue',
//     borderRadius: 10
//   }
// }

export default App

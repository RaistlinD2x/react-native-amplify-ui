import { Auth } from 'aws-amplify';
import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/core'

const HomeScreen = () => {
  const navigation = useNavigation()

  // TODO Set up on press for signout to check that flow
  const signOut = () => {
    Auth.signOut()
  }

    return (
        <View>
          <Text style={{fontSize: 24, alignSelf: 'center'}}>This is the home screen!</Text>
          <Text
            onPress={signOut}
            style={{
              width: '100%',
              textAlign: 'center',
              color:'red',
              marginTop: 'auto',
              marginVertical: 20,
              fontSize: 20,
            }}
        >
        Sign Out
        </Text>
        </View>
      );
}
  

export default HomeScreen;
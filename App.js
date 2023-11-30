import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  StatusBar,
  SafeAreaView,
  Text,
  Button,
} from 'react-native';

export default function App() {

  const [server, setServer] = useState([
    { user: 'analucia', password: 1256 },
    { user: 'lucasbonfim', password: 6589 },
    { user: 'cesarpizza', password: 1910 },
  ])

  console.log(server);

  const [userData, setUserData] = useState({
    user: '',
    password: '',
  }
  );

  function getRegistedUders() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(server);
      }, 3000);
    });
  }

  function registerUser(user, password) {
    const newUser = {
      user: user,
      password: password,
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setServer(prev => [...prev, newUser])
        resolve('User added successfully!')
      }, 3000);
    });
  }

  async function register(user, password) {
    const getRegistedUdersRes = await getRegistedUders();

    for (const item of getRegistedUdersRes) {
      if (item.user === user) {
        alert('User already registered!');
        return;
      }
    }

    const registerUserRes = await registerUser(user, password);
    alert(registerUserRes);
  }

  return (
    <SafeAreaView style={styles.container} >
      <View style={{ backgroundColor: 'lightblue', padding: 40 }}>
        <StatusBar hidden />
        <Text>User:</Text>
        <TextInput
          style={{ backgroundColor: '#555', marginBottom: 20, color: '#fff' }}
          value={userData.user}
          onChangeText={text => setUserData(prev => ({ ...prev, user: text }))}
        />
        <Text>Password:</Text>
        <TextInput
          style={{ backgroundColor: '#555', marginBottom: 20, color: '#fff' }}
          value={userData.password}
          onChangeText={text => setUserData(prev => ({ ...prev, password: text }))}
        />
        <Button
          title='Register'
          onPress={() => {
            register(userData.user, userData.password)
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
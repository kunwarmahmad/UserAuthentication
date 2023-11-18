import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { firebase } from './config';

const auth = firebase.auth();
const firestore = firebase.firestore();

const DashboardScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await firestore.collection('users').doc(user.uid).get();
          const userData = userDoc.data();
          if (userData) {
            const { firstName, lastName } = userData;
            setUserName(`${firstName} ${lastName}`);
          }
        }
      } catch (error) {
        console.error('Error fetching user information:', error.message);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View>
      <Text>Welcome to Dashboard, {userName}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default DashboardScreen;

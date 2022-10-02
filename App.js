/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './Screens/Landing';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Dashboard from './Screens/Dashboard';
import {
  ActivityIndicator,
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


// Landing Screen
const LandingScreen = () => {
  const navigation = useNavigation();
  return(
    <Landing navigation={navigation} />
  )
}

const LoginScreen = () => {
  const navigation = useNavigation();
  return(
    <Login navigation={navigation} />
  )
}

const RegisterScreen = () => {
  const navigation = useNavigation();
  return(
    <Register navigation={navigation} />
  )
}

const DashboardScreen = () => {
  const navigation = useNavigation();
  return(
    <Dashboard navigation={navigation} />
  )
}

//Screens
const Stack = createNativeStackNavigator();

function Screens() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    alignSelf: "center"
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Screens;

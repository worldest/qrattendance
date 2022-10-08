/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect } from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
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
 
 
 const Landing = (props) => {
    const {navigation} = props;
   useEffect(() => {
     // Check localstorage for a saved token - to check if user is Logged in
     AsyncStorage.getItem("getToken").then((token) => {
       if(token != null && token != undefined){
         // There is an active user. redirect to dashboard
         navigation.navigate("Dashboard")
       }else{
         // No user is logged. Redirect to login
         navigation.navigate("Login")
       }
     })
   }, [])
   return(
     <View style={{justifyContent: "center", flex: 1, alignContent: "center"}}>
       <Text style={styles.sectionTitle}>Smart QR Attendance</Text>
       <ActivityIndicator size="large" color="#000" style={{marginVertical: 20}} />
     </View>
   )
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
 
 export default Landing;
 
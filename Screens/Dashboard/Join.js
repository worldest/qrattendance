import React, { Component } from 'react';

import { initializeApp } from "firebase/app";
import {getDatabase, onValue, update, onChildAdded, set, ref, push, onChildChanged, onChildRemoved, onChildMoved} from "firebase/database";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'


import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALID8MLqfjVxCn5uLTPxv0xA57y0GwCsM",
  authDomain: "qrattendance-app.firebaseapp.com",
  projectId: "qrattendance-app",
  storageBucket: "qrattendance-app.appspot.com",
  messagingSenderId: "782791449502",
  appId: "1:782791449502:web:78aae4c045bb4ac61ad48f",
  databaseURL: "https://qrattendance-app-default-rtdb.firebaseio.com/"
};

//initialize firebase
const app = initializeApp(firebaseConfig);

//firebase authentication
const auth = getAuth(app);

//connect to firebase DB
const db = getDatabase();


class Join extends Component {
  constructor(props){
    super(props);
    this.state = {
      isScanned: false
    }
  }
  onSuccess = e => {
    //get QR data
    const qrData = (e.data);


    ToastAndroid.show(`Marking attendance`, ToastAndroid.LONG);
    this.setState({
      isScanned: true
    });

    //check if user is signed in
    onAuthStateChanged(auth, (user) => {
      if(user){
        //get user token
        const firebaseID = user.uid;

        //get attendance time
        const timeStamp = new Date();
        const timeToString = timeStamp.toString();
        set(ref(db, "attendance/" + qrData + "/" + firebaseID), {
          user: firebaseID,
          attended: 1,
          timeStamp: timeToString
        }).then(() => {
            ToastAndroid.show("Attendance marked", ToastAndroid.LONG);
            this.setState({
              isScanned: false
            });
        })
      }
    })
  };

  render() {
    return (
          <>
            {
              this.state.isScanned === false ? 
                <QRCodeScanner
                containerStyle = {{
                  width: 200
                }}
                onRead={this.onSuccess}
                // flashMode={RNCamera.Constants.FlashMode.torch}
                topContent={
                  <Text style={styles.centerText}>
                    Scan Class QR Code to mark attendance
                  </Text>
                }
                bottomContent={
                  <TouchableOpacity style={styles.buttonTouchable}>
                    {/* <Text style={styles.buttonText}>OK. Got it!</Text> */}
                  </TouchableOpacity>
                }
              />
              :
              <View style={{justifyContent: "center", flex: 1}}>
                  <ActivityIndicator size="large" color="#080050" />
              </View>
              
            }
          </>
          
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    fontWeight: "bold",
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

// AppRegistry.registerComponent('default', () => Join);

export default Join
import React, { Component } from 'react';

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

class Join extends Component {
  constructor(props){
    super(props);
    this.state = {
      isScanned: false
    }
  }
  onSuccess = e => {
    ToastAndroid.show("Marking attendance", ToastAndroid.LONG);
    this.setState({
      isScanned: true
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
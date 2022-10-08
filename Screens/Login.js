import react, { useState } from "react";
import "react-native-get-random-values";
import "@ethersproject/shims"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AsyncStorage } from "react-native";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase, onValue, update, onChildAdded, onChildChanged, onChildRemoved, onChildMoved} from "firebase/database";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import { ToastAndroid } from "react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const Login = (props) => {
    const {navigation} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    

    onAuthStateChanged(auth, (user) => {
        if(user){
            //get token
            const firebaseID = user.uid;
            AsyncStorage.setItem("getToken", firebaseID).then(() => {
                navigation.navigate("Dashboard");
            })
        }else{

        }
    })
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            
        })
        .catch(error => {
            ToastAndroid.show(error.message, ToastAndroid.LONG);
        })
    }
    return(
        <>
            <View style={styles.container}>
                <Text style={styles.headerText}>
                    Login to your Account
                </Text>
                <View style={styles.form}>
                    <TextInput onChangeText={(e) => {
                        setEmail(e)
                    }} style={styles.input} placeholder="Email" keyboardType="email-address" />
                    <TextInput onChangeText={(e) => {
                        setPassword(e)
                    }} style={styles.input} placeholder="Password" keyboardType="default" secureTextEntry={true} />
                    <TouchableOpacity onPress={handleLogin} style={styles.button}>
                        <Text style={{color: "#fff", ...styles.headerText}}>Login</Text>
                    </TouchableOpacity>

                    <Text style={{alignSelf: "center", marginVertical: 10}}>Don't have an account?</Text>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Register")
                    }}>
                        <Text style={{alignSelf: "center", marginVertical: 20, fontWeight: "bold", textDecorationLine: "underline"}}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "center"
    },
    form: {
        marginVertical: 20,
        width: 300,
        alignSelf: "center"
    },
    input: {
        width: "100%",
        height: 50,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: "#eee",
        borderRadius: 2,
        padding: 10
    },
    button: {
        backgroundColor: "#000",
        paddingVertical: 15,
        borderRadius: 5,
        marginVertical: 10
    }
})

export default Login;
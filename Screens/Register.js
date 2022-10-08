import react, {useState, useEffect} from "react";
import { StyleSheet, Text, TextInput, ToastAndroid, AsyncStorage, Alert, TouchableOpacity, View } from "react-native";
import { ethers } from "ethers";
import { initializeApp } from "firebase/app";
import {getDatabase, onValue, update, onChildAdded, set, ref, onChildChanged, onChildRemoved, onChildMoved} from "firebase/database";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
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

//initialize firebase
const app = initializeApp(firebaseConfig);

//firebase authentication
const auth = getAuth(app);

//connect to firebase DB
const db = getDatabase();

const Register = (props) => {
    const {navigation} = props;

    //state data
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerBtn, setRegisterBtn] = useState("Register")
    
    
    useEffect(() => {
        //check if user is signed in
        onAuthStateChanged(auth, (user) => {
            if(user){
                
                //get id
                const firebaseID = user.uid;

                //save biodata to Firebase for reuse with blockchain storage and for reuse at device change/login
                set(ref(db, "users/" + firebaseID), {
                    email: email,
                    name: fullname,
                    password: password,
                    token: firebaseID,
                    role: "student"
                }).then(() => {
                    //make 
                    //redirect to dashboard 
                    navigation.navigate("Dashboard");
                })
            }else{
    
            }
        })

    })
    

    const handleRegister = () => {

        //check if user fill all fields
        if(email === "" || password === "" || fullname === ""){
            ToastAndroid.show("All fields are required", ToastAndroid.CENTER);
        }else{
            setRegisterBtn("Please wait...")
            //Signup to Firebase
            createUserWithEmailAndPassword(auth, email, password)
            .then(user => {
                //get firebase ID
                const firebaseID = user.uid;
                
                AsyncStorage.setItem("getToken", firebaseID).then(() => {

                    //save user biodata
                    const payload = {
                        email: email,
                        name: fullname,
                        token: firebaseID
                    };

                    //stringify userbiodata
                    AsyncStorage.setItem("user", JSON.stringify(payload));

                    
                })
            })
            .catch(error => {
                alert(error.message);
                setRegisterBtn("Try Again")
            })
            
        }
        
    }
    return(
        <>
            <View style={styles.container}>
                <Text style={styles.headerText}>
                    Create an Account
                </Text>
                <View style={styles.form}>
                    <TextInput style={styles.input} onChangeText={(e) => {
                        //set data to state
                        setFullname(e);
                    }} placeholder="Fullname" keyboardType="default" />
                    <TextInput style={styles.input} onChangeText={(e) => {
                        //set data to state
                        setEmail(e);
                    }} placeholder="Email" keyboardType="email-address" />
                    <TextInput style={styles.input} onChangeText={(e) => {
                        //set data to state
                        setPassword(e);
                    }} placeholder="Password" keyboardType="default" secureTextEntry={true} />
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={{color: "#fff", ...styles.headerText}}>{registerBtn}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Login")
                    }}>
                        <Text style={{alignSelf: "center", marginVertical: 20, fontWeight: "bold"}}>Login Here</Text>
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

export default Register;
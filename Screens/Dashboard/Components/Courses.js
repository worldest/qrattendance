import react, {useState, Component, useEffect} from "react";
import { ScrollView, StyleSheet, View, Text, AsyncStorage, Image, ActivityIndicator, TouchableOpacity, Modal, ToastAndroid } from "react-native";
import { initializeApp } from "firebase/app";
import {getDatabase, onValue, update, onChildAdded, set, ref, push, onChildChanged, onChildRemoved, onChildMoved} from "firebase/database";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import QRCode from 'react-native-qrcode-generator';
import React from "react";


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

class CoursesList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            fullname: "",
            role: "",
            upcoming: "",
            courses: [],
            attendance: [],
            loaded: false,
            qr: false,
            qrCode: 0
        }
    }
    
    //run when app finish loading
    componentDidMount = async () => {
        
        const user = await auth.currentUser;
        //get token
        
        const firebaseID = user.uid
  
        //get user role
        const getRole = ref(db, "users/" + firebaseID + "/role");
        onValue(getRole, (snapshot) => {
            const role_ = snapshot.val();
            this.setState({
                role: snapshot.val()
            })
       
            //get user
            const getUser = ref(db, "users/" + firebaseID);
            onValue(getUser, (snapshot) => {
                
                this.setState({
                    email: snapshot.child("email").val(),
                    fullname: snapshot.child("name").val(),
                    role: snapshot.child("role").val()
                })
            });
            const list = [];
            const getCourses = ref(db, "courses/");
            onChildAdded(getCourses, (data) => {
                const lecturer = data.child("lecturer").val();
                const desc = data.child("desc").val();
                const title = data.child("title").val();
                const date = data.child("date").val();
                const image = data.child("image").val();
                const key = data.key;
                const joined = this.state.courses.concat(
                    <View key={key} style={{width: "95%", alignSelf: "center", backgroundColor: "#fff", borderRadius: 20, paddingBottom: 30, marginVertical: 10, elevation: 5}}>
                        <Image source={{uri: image}} resizeMode="cover" style={{width: "100%", height: 130, borderRadius: 20}}></Image>
                        <View style={{width: "100%", paddingHorizontal: 10}}>
                            <Text style={styles.headerText}>
                                {title}
                            </Text>
                            <Text style={styles.text}>{lecturer}</Text>
                            <Text style={styles.text}>{desc}</Text>
                            <Text style={styles.text}>{date}</Text>
                            {
                                role_ === "lecturer" ? 
                                <TouchableOpacity onPress={() => {
                                    this.setState({
                                        qr: true,
                                        QRCode: key
                                    })
                                    const getAttendance = ref(db, "attendance/" + key);
                                    onChildAdded(getAttendance, (data) => {
                                        const userKey = data.key;
                                        const getUserKey = ref(db, "users/" + userKey);
                                        onValue(getUserKey, (snapshot) => {
                                            var userName = snapshot.child("name").val();
                                            var userEmail = snapshot.child("email").val();
                                            const setJoined = this.state.attendance.concat(
                                                <View style={{paddingHorizontal: 10, width: "95%", alignSelf: "center", elevation: 2, backgroundColor: "#f0f0f0", borderRadius: 10, alignSelf: "center", marginVertical: 10, paddingVertical: 15, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: "#c4c5c6"}}>
                                                    <Text style={styles.headerText}>{userName} (<Text style={styles.text}>{userEmail}</Text>)</Text>
                                                    
                                                    <Text style={styles.text}>ID: {userKey}</Text>
                                                    <TouchableOpacity onPress={() => {
                                                        ref(db, "attendance/" + userKey).remove();
                                                        ToastAndroid.show("Attendance deleted", ToastAndroid.LONG);
                                                    }} style={{backgroundColor: "#BF40BF", padding: 12, borderRadius: 5, width: "100%", alignSelf: "flex-start"}}><Text style={{color: "#fff", alignSelf: "center"}}>Remove Attendance</Text></TouchableOpacity>
                                                </View>
                                            );
                                            this.setState({
                                                attendance: setJoined
                                            })
                                        })
                                    })
                                }} style={{backgroundColor: "#BF40BF", padding: 20, borderRadius: 5, width: "100%", alignSelf: "flex-start"}}><Text style={{color: "#fff", alignSelf: "center"}}>Generate QR Code</Text></TouchableOpacity>
                                :
                                <></>
                            }
                        </View>
                    </View>
                );
                this.setState({courses: joined});
            });
        })
    }

    render(){
        return(
            <ScrollView>
                
                {/* Header Boxes */}
               
                
                <View style={styles.row}>
                    <View style={{ backgroundColor: "#CBC3E3", ...styles.column}}>
                        <Text style={{color: "#000", alignSelf: "flex-start"}}>Role</Text>
                        <Text style={{color: "#000", alignSelf: "flex-end", fontSize: 20, fontWeight: "bold"}}>{this.state.role.toUpperCase()}</Text>
                    </View>
                </View>
                {/* render upcoming course list */}
                {this.state.courses}
                
                {/* QR modal */}
                <Modal
                    visible={this.state.qr}
                    onRequestClose={() => {this.setState({qr: false, attendance: []})}}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{height: "80%", paddingTop: 50, justifyContent: "center", alignContent: "center", alignItems: "center", width: "100%", alignSelf: "center", backgroundColor: "#fff", position: "absolute", bottom: 0, borderTopRightRadius: 30, borderTopLeftRadius: 30}}>
                    <ScrollView horizontal={true} style={{flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 10}}>
                        <View style={{width: 300, justifyContent: "center", alignContent: "center", alignItems: "center", backgroundColor: "#fff", elevation: 5, borderRadius: 20, marginVertical: 20, marginHorizontal: 20, height: 500}}>
                            <Text style={{alignSelf: "center", ...styles.headerTextCenter}}>Class QR Code</Text>
                            <QRCode
                                value={this.state.qrCode}
                                size={250}
                                
                                bgColor='black'
                                fgColor='white'/>
                            </View>
                        <View style={{width: 300, backgroundColor: "#fff", elevation: 5, borderRadius: 20, marginVertical: 20, marginHorizontal: 20, height: 500}}>
                            <Text style={{alignSelf: "center", ...styles.headerTextCenter}}>Attendance</Text>
                            <ScrollView>
                            {this.state.attendance}
                            </ScrollView>
                        </View>
                    </ScrollView>
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    row: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginVertical: 20,
    },
    rowAround: {
        width: "95%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginVertical: 0,
        alignSelf: "center"
    },
    columnTwo: {
        width: "46%",
        justifyContent: "center",
        elevation: 5,
        height: 100,
        borderRadius: 10,
        padding: 20
    },
    column: {
        width: "96%",
        justifyContent: "center",
        elevation: 5,
        height: 100,
        borderRadius: 10,
        padding: 20
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 10,
        marginHorizontal: 10, 
        alignSelf: "flex-start"
    },
    headerTextCenter: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 20,
        marginHorizontal: 10, 
        alignSelf: "center"
    },
    text: {
        fontSize: 12,
        fontWeight: "bold",
        marginVertical: 5,
        color: "#000",
        marginHorizontal: 10, 
        alignSelf: "flex-start"
    }
})
export default CoursesList;
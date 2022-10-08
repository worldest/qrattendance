import react, {useState, useEffect} from "react";
import { ScrollView, StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
import CoursesList from "./Components/Courses";
import { initializeApp } from "firebase/app";
import {getDatabase, onValue, update, onChildAdded, set, ref, push, onChildChanged, onChildRemoved, onChildMoved} from "firebase/database";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
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
const Courses = () => {

    const [role, setRole] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [lecturer, setLecturer] = useState("");
    const [date, setDate] = useState("");

    //run when app finish loading
    useEffect(() => {
        //check if user is signed in
        onAuthStateChanged(auth, (user) => {
            if(user){
                
                //get id
                const firebaseID = user.uid;
  
                //get user role
                const getRole = ref(db, "users/" + firebaseID + "/role");
                onValue(getRole, (snapshot) => {
                  setRole(snapshot.val());
                })
            }else{
    
            }
        })
  
    })


    return(
        <ScrollView>
            <View style={styles.space}></View>
            <Text style={styles.headerText}>Create Course</Text>
            {
                role === "department" ? 
                <>
                    <ScrollView horizontal={true} style={{flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 10}}>
                        <View style={{width: 330, backgroundColor: "#fff", elevation: 5, borderRadius: 20, marginVertical: 20, marginHorizontal: 20, height: 400}}>
                            <Text style={styles.headerText}>Create Course</Text>
                            <TextInput
                                placeholder="Title"
                                keyboardType="default"
                                style={styles.input}
                                value={title}
                                onChangeText={(e) => {
                                    setTitle(e);
                                }}
                            >
                            </TextInput>
                            <TextInput
                                placeholder="Lecturer"
                                keyboardType="default"
                                style={styles.input}
                                value={lecturer}
                                onChangeText={(e) => {
                                    setLecturer(e);
                                }}
                            >
                            </TextInput>
                            
                            <TextInput
                                placeholder="YYYY-MM-DD HH:MM:SS"
                                keyboardType="default"
                                style={styles.input}
                                value={date}
                                onChangeText={(e) => {
                                    setDate(e);
                                }}
                            >
                            </TextInput>

                            <TextInput
                                placeholder="Desc"
                                value={desc}
                                keyboardType="default"
                                style={styles.inputMultiline}
                                multiline={true}
                                onChangeText={(e) => {
                                    setDesc(e);
                                }}
                            >
                            </TextInput>
                            <TouchableOpacity onPress={() => {
                                push(ref(db, "courses"), {
                                    title: title,
                                    lecturer: lecturer,
                                    date: date,
                                    image: "https://www.aosacademy.com/images/2020/07/13/images_large.jpeg",
                                    desc: desc
                                }).then(() => {
                                    ToastAndroid.show("Course uploaded", ToastAndroid.LONG);
                                    setTitle("");
                                    setDesc("");
                                    setLecturer("");
                                    setDate("");
                                })
                            }} style={{backgroundColor: "#BF40BF", padding: 15, borderRadius: 5, width: "90%", alignSelf: "center"}}><Text style={{color: "#fff", alignSelf: "center"}}>Post Course</Text></TouchableOpacity>
                               
                        </View>
                        {/* <View style={{width: 300, backgroundColor: "#fff", elevation: 5, borderRadius: 20, marginVertical: 20, marginHorizontal: 20, height: 400}}>

                        </View> */}
                    </ScrollView>
                </>
                :
                <Text style={styles.text}>Sorry you can not create courses</Text>
            }
            <View style={styles.space}></View>
            <Text style={styles.headerText}>Your Courses</Text>
            {
                role === "lecturer" ? 
                <CoursesList hideRole={false} />
                :
                <Text style={styles.text}>Sorry you can not create course QR</Text>
            }

        </ScrollView>
    )
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
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 10,
        marginHorizontal: 10, 
        alignSelf: "flex-start"
    },
    text: {
        fontSize: 12,
        fontWeight: "normal",
        marginVertical: 5,
        marginHorizontal: 10, 
        alignSelf: "flex-start"
    },
    space: {
        height: 30
    },
    input: {
        width: "90%",
        height: 40, 
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#c4c5c6",
        alignSelf: "center",
        padding: 10,
        marginVertical: 10
    },
    inputMultiline: {
        width: "90%",
        height: 60, 
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#c4c5c6",
        alignSelf: "center",
        padding: 10,
        marginVertical: 10
    }
})
export default Courses;
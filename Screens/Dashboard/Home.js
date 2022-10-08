import react, {useState, useEffect} from "react";
import { ScrollView, StyleSheet, View, Text, AsyncStorage, Image, ActivityIndicator } from "react-native";
import { initializeApp } from "firebase/app";
import {getDatabase, onValue, update, onChildAdded, set, ref, push, onChildChanged, onChildRemoved, onChildMoved} from "firebase/database";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import CoursesList from "./Components/Courses";
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

const Home = () => {

    //state data
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [role, setRole] = useState("")
    const [upcoming, setUpcoming] = useState(0);
    const [courses, setCourses] = useState([]);
    const [loaded, setLoaded] = useState(false)

    //run when app finish loading
    useEffect(() => {
        const user = auth.currentUser;
        //get token
        
        const firebaseID = user.uid
        //get user
        const getUser = ref(db, "users/" + firebaseID);
        onValue(getUser, (snapshot) => {
            setEmail(snapshot.child("email").val());
            setFullname(snapshot.child("name").val());
            setRole(snapshot.child("role").val());
        });
        const list = [];
        const getCourses = ref(db, "courses");
        onChildAdded(getCourses, (data) => {
            list.push(data);
            setLoaded(true)
        })
        
        
    }, [])


    return(
        <ScrollView>
            <Text style={styles.headerText}>
                Welcome {fullname}
            </Text>
            {/* Header Boxes */}
            <View style={styles.row}>
                <View style={{ backgroundColor: "#BF40BF", ...styles.columnTwo}}>
                    <Text style={{color: "#fff", alignSelf: "flex-start"}}>Upcoming Class</Text>
                    <Text style={{color: "#fff", alignSelf: "flex-end", fontSize: 20, fontWeight: "bold"}}>{upcoming}</Text>
                </View>
                <View style={{ backgroundColor: "#CBC3E3", ...styles.columnTwo}}>
                    <Text style={{color: "#000", alignSelf: "flex-start"}}>Role</Text>
                    <Text style={{color: "#000", alignSelf: "flex-end", fontSize: 20, fontWeight: "bold"}}>{role.toUpperCase()}</Text>
                </View>
            </View>
            {/* <View style={{ backgroundColor: "#e2e2e2", ...styles.rowAround}}>
                <View style={{width: "61%", backgroundColor: "#BF40BF", borderRadius: 10, borderTopEndRadius: 200, borderBottomEndRadius: 200, height: 80}}>

                </View>
                <View style={{width: "31%", backgroundColor: "transparent", height: 80}}></View>
            </View> */}
            <Text style={styles.headerText}>
                Upcoming Classes - Reminder
            </Text>


            {/* render upcoming course list */}
            <CoursesList hideRole={true} />
            
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
    }
})
export default Home;
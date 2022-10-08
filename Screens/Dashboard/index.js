import react, { useEffect, useState } from "react";
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Settings from "./Settings";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Join from "./Join";
import Courses from "./Courses";
import Upcoming from "./Upcoming";
import { AsyncStorage } from "react-native";
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

const Tab = createBottomTabNavigator();

export default function Dashboard() {

    //state data
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [role, setRole] = useState("student");

    //Load fonts
    FontAwesome.loadFont();
    Ionicons.loadFont().then();


    //run when app finish loading
    useEffect(() => {
      //check if user is signed in
      onAuthStateChanged(auth, (user) => {
          if(user){
              
              //get id
              const firebaseID = user.uid;

              //get user role
              const getRole = ref(db, "users" + firebaseID + "/role");
              onValue(getRole, (snapshot) => {
                setRole(snapshot.val());
              })
          }else{
  
          }
      })

  })
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator 
      initialRouteName={role === "student" ? "Join" : "Dashboard"}
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Settings') {
              iconName = 'cog';
            } else if (route.name === 'Upcoming') {
              iconName = 'arrow-up';
            }else if (route.name === 'Join') {
              iconName = 'camera';
            }else if (route.name === 'Courses') {
              iconName = 'list';
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}> 
        <Tab.Screen name="Home" component={Home}
        />
        <Tab.Screen name="Upcoming" component={Upcoming} />
        <Tab.Screen name="Join" component={Join} />
        <Tab.Screen name="Courses" component={Courses} />
        {/* <Tab.Screen name="Settings" component={Settings} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

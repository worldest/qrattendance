import react from "react";
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Settings from "./Settings";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Join from "./Join";

const Tab = createBottomTabNavigator();

export default function Dashboard() {
    FontAwesome.loadFont();
    Ionicons.loadFont().then();
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator 
      initialRouteName="Join"
      screenOptions={({ route }) => ({
        //   tabBarIcon: ({ focused, color, size }) => {
        //     let iconName;

        //     if (route.name === 'Home') {
        //       iconName = 'home';
        //     } else if (route.name === 'Settings') {
        //       iconName = 'cog';
        //     }

        //     // You can return any component that you like here!
        //     return <Ionicons name="user" size={size} color={color} />;
        //   },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}> 
        <Tab.Screen name="Home" component={Home}
        />
        <Tab.Screen name="Upcoming" component={Settings} />
        <Tab.Screen name="Join" component={Join} />
        <Tab.Screen name="Courses" component={Settings} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

import react from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
FontAwesome.loadFont().then();
const Settings = () => {
    return(
        <View style={{justifyContent: "flex-start", flex: 1}}>
            <TouchableOpacity>
                <View style={{backgroundColor: "#fff", paddingVertical: 20, paddingHorizontal: 20, borderRadius: 10, justifyContent: "center", flexDirection: "row", flexWrap: "wrap", marginVertical: 10, width: "96%", alignSelf: "center"}}>
                    <View style={{width: "10%", justifyContent: "center"}}>
                        <FontAwesome name="user" size={24} color="#000" />
                    </View>
                    <View style={{width: "80%", justifyContent: "center"}}>
                        <Text style={{fontWeight: "bold", fontSize: 20}}>Profile</Text>
                    </View>
                    <View style={{width: "10%", justifyContent: "center"}}>
                        <FontAwesome name="arrow-right" size={24} color="#000" />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={{backgroundColor: "#fff", paddingVertical: 20, paddingHorizontal: 20, borderRadius: 10, justifyContent: "center", flexDirection: "row", flexWrap: "wrap", marginVertical: 10, width: "96%", alignSelf: "center"}}>
                    <View style={{width: "10%", justifyContent: "center"}}>
                        <FontAwesome name="pen" size={24} color="#000" />
                    </View>
                    <View style={{width: "80%", justifyContent: "center"}}>
                        <Text style={{fontWeight: "bold", fontSize: 20}}>Edit Profile</Text>
                    </View>
                    <View style={{width: "10%", justifyContent: "center"}}>
                        <FontAwesome name="arrow-right" size={24} color="#000" />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={{backgroundColor: "#fff", paddingVertical: 20, paddingHorizontal: 20, borderRadius: 10, justifyContent: "center", flexDirection: "row", flexWrap: "wrap", marginVertical: 10, width: "96%", alignSelf: "center"}}>
                    <View style={{width: "10%", justifyContent: "center"}}>
                        <FontAwesome name="envelope" size={24} color="#000" />
                    </View>
                    <View style={{width: "80%", justifyContent: "center"}}>
                        <Text style={{fontWeight: "bold", fontSize: 20}}>Contact Support</Text>
                    </View>
                    <View style={{width: "10%", justifyContent: "center"}}>
                        <FontAwesome name="arrow-right" size={24} color="#000" />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={{backgroundColor: "#fff", paddingVertical: 20, paddingHorizontal: 20, borderRadius: 10, justifyContent: "center", flexDirection: "row", flexWrap: "wrap", marginVertical: 10, width: "96%", alignSelf: "center"}}>
                    <View style={{width: "10%", justifyContent: "center"}}>
                        <FontAwesome name="logout" size={24} color="#000" />
                    </View>
                    <View style={{width: "80%", justifyContent: "center"}}>
                        <Text style={{fontWeight: "bold", fontSize: 20}}>Logout</Text>
                    </View>
                    <View style={{width: "10%", justifyContent: "center"}}>
                        <FontAwesome name="arrow-right" size={24} color="#000" />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Settings;
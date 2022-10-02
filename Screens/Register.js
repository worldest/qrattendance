import react from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Register = (props) => {
    const {navigation} = props;
    return(
        <>
            <View style={styles.container}>
                <Text style={styles.headerText}>
                    Create an Account
                </Text>
                <View style={styles.form}>
                    <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
                    <TextInput style={styles.input} placeholder="Password" keyboardType="default" secureTextEntry={true} />
                    <TouchableOpacity style={styles.button}>
                        <Text style={{color: "#fff", ...styles.headerText}}>Register</Text>
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
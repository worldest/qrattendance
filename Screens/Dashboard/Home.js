import react from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";

const Home = () => {
    return(
        <ScrollView>
            <Text style={styles.headerText}>
                Welcome John Doe
            </Text>
            {/* Header Boxes */}
            <View style={styles.row}>
                <View style={{ backgroundColor: "#BF40BF", ...styles.columnTwo}}>
                    <Text style={{color: "#fff", alignSelf: "flex-start"}}>Upcoming Class</Text>
                    <Text style={{color: "#fff", alignSelf: "flex-end", fontSize: 40}}>0</Text>
                </View>
                <View style={{ backgroundColor: "#CBC3E3", ...styles.columnTwo}}>
                    <Text style={{color: "#000", alignSelf: "flex-start"}}>Upcoming Class</Text>
                    <Text style={{color: "#000", alignSelf: "flex-end", fontSize: 40}}>0</Text>
                </View>
            </View>
            <View style={{ backgroundColor: "#e2e2e2", ...styles.rowAround}}>
                <View style={{width: "61%", backgroundColor: "#BF40BF", borderRadius: 10, borderTopEndRadius: 200, borderBottomEndRadius: 200, height: 80}}>

                </View>
                <View style={{width: "31%", backgroundColor: "transparent", height: 80}}></View>
            </View>
            <Text style={styles.headerText}>
                Upcoming Classes - Reminder
            </Text>
            <View style={{width: "95%", alignSelf: "center", backgroundColor: "#fff", paddingBottom: 10, marginVertical: 10, elevation: 5}}>
                <Image source={{uri: "https://cdn1.byjus.com/wp-content/uploads/2019/07/25-Important-Topics-in-Biology.png"}} resizeMode="cover" style={{width: "100%", height: 130, borderRadius: 20}}>

                </Image>
                <View style={{width: "100%", paddingHorizontal: 10}}>
                    <Text style={styles.headerText}>
                        Principles of Biology
                    </Text>
                    <Text style={styles.text}>Prof. John Simeon</Text>
                    <Text style={styles.text}>Learning the principles of biology and 25 major topics in biology...</Text>
                    <Text style={styles.text}>29/09/2022 12:30:00pm</Text>
                </View>
            </View>

            <View style={{width: "95%", alignSelf: "center", backgroundColor: "#fff", paddingBottom: 10, marginVertical: 10, elevation: 5}}>
                <Image source={{uri: "https://images.theconversation.com/files/191827/original/file-20171025-25516-g7rtyl.jpg?ixlib=rb-1.1.0&rect=0%2C70%2C7875%2C5667&q=45&auto=format&w=926&fit=clip"}} resizeMode="cover" style={{width: "100%", height: 130, borderRadius: 20}}>

                </Image>
                <View style={{width: "100%", paddingHorizontal: 10}}>
                    <Text style={styles.headerText}>
                        Physics 504 - Gravity
                    </Text>
                    <Text style={styles.text}>Prof. Micheal Faraday</Text>
                    <Text style={styles.text}>Learning the principles of biology and 25 major topics in biology...</Text>
                    <Text style={styles.text}>29/09/2022 12:30:00pm</Text>
                </View>
            </View>
            
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
import react from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import CoursesList from "./Components/Courses";
const Upcoming = () => {
    return(
        <CoursesList />
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
export default Upcoming;
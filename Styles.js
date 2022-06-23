import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    header: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#fff"
    },
    background: {
        width: "100%",
        height: "100%",
        backgroundColor:"#eae2b7"
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 6,
        elevation: 3,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    buttonText:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
    toggleButtonSelected: {
        flex: 1,
        padding: 5,
        borderRadius: 5,
        borderColor: "white",
        borderWidth: 1,
        backgroundColor: "white"
    },
    toggleButtonUnselected: {
        flex: 1,
        padding: 5,
        borderRadius: 5,
        borderColor: "#386540",
        borderWidth: 1,
    },
    container: {
        margin: 5,
        borderRadius: 10,
        padding: 7
    },
    transparentContainer :{
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 10,
        margin: 5,
        padding: 7,
    },
    resourceTheme: {
        backgroundColor: 'rgb(65,138,167)',
    },
    skillsTheme:{
        backgroundColor: 'rgb(253,135,31)',
    },
    cardProfilePicture: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#ffffff"
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
    tags: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 15,
        margin: 3,
        padding: 5,
        color: "#ffffff",
        fontSize: 12,
        alignSelf:"flex-start"
    },
    cardText: {
        color:'#ffffff'
    },
    menuItem: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderColor: "grey",
        borderBottomWidth: 1,
    },
    settingsModule: {
        height: '50%',
        marginTop: 'auto',
        backgroundColor: 'white',
        borderColor: "gray",
        borderWidth: 1,
        margin: 5,
        borderRadius: 10,
        padding: 7
    },
    messageBubble: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom:3,
        borderRadius: 10,
        padding: 7,
        backgroundColor: 'rgb(253,135,31)',
    }
});
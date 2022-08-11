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
        backgroundColor: "#dbe6f9",
        padding:7,
        alignItems:"center"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        margin:5,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
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
        backgroundColor: 'rgb(39,84,102)'
    },
    container: {
        margin: 5,
        borderRadius: 10,
        padding: 7
    },
    transparentContainer: {
        width:"100%",
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 10,
        margin: 5,
        padding: 7,
    },
    lightColour: {
        backgroundColor: '#dbe6f9',
    },
    midColour: {
        backgroundColor: 'rgb(22,154,199)',
    },
    darkColour: {
        backgroundColor: 'rgb(39,84,102)',
    },
    cardProfilePicture: {
        width: 70,
        height: 70,
    },
    tags: {
        borderRadius: 15,
        margin: 3,
        padding: 3,
        color: "#fff",
        fontSize: 10,
        alignSelf: "flex-start"
    },
    text: {
        color: '#ffffff'
    },
    menuItem: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderColor: "grey",
        borderBottomWidth: 1,
    },
    pickerItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderColor: "#dbe6f9",
        borderBottomWidth: 1,
        borderRadius:5,
        margin:3
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
        marginBottom: 3,
        borderRadius: 10,
        padding: 7,
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    logo: {
        width: "50%",
        aspectRatio: 1,
        borderRadius: 200,
        alignSelf: "center"
    },
    navigationHeader: {
        backgroundColor: '#386540'
    },
});
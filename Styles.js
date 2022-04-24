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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ResourceCardContainer: {
        backgroundColor: 'rgb(65,138,167)',
        margin: 5,
        borderRadius: 10,
        padding: 7
    },
    SkillCardContainer:{
        backgroundColor: 'rgb(253,135,31)',
        margin: 5,
        borderRadius: 10,
        padding: 7
    },
    cardProfilePicture: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#ffffff"
    },
    cardName: {
        flex: 1,
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    },
    cardTags: {
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
    }
});
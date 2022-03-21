import {StyleSheet} from "react-native";

export const Styles = StyleSheet.create({
    background: {
        width:"100%",
        height:"100%",
        alignItems: 'center',
    },
    toggleButtonSelected: {
        flex:1,
        padding:5,
        borderRadius:5,
        borderColor:"white",
        borderWidth:1,
        backgroundColor:"white"
    },
    toggleButtonUnselected: {
        flex:1,
        padding:5,
        borderRadius:5,
        borderColor:"#386540",
        borderWidth:1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
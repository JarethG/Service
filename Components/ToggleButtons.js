import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "../Styles";
import {useState} from "react";

export default function ToggleButtons({titleLeft,titleRight, onToggle}) {
    const [toggle,setToggle] = useState(true)
    return (
        <View style={{flexDirection: "row", padding: 12}}>
            <TouchableOpacity style={toggle ? styles.toggleButtonSelected : styles.toggleButtonUnselected}
                              onPress={() => {
                                  setToggle(true)
                                  onToggle(true)
                              }}>
                <Text style={toggle ? {color: "#386540"} : {color: "#ffffff"}}>{titleLeft}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={toggle ? styles.toggleButtonUnselected : styles.toggleButtonSelected}
                              onPress={() => {
                                  setToggle(false)
                                  onToggle(false)
                              }}>
                <Text style={toggle ? {color: "#ffffff"} : {color: "#386540"}}>{titleRight}</Text>
            </TouchableOpacity>
        </View>
    );
}
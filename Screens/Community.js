import {StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity,ScrollView} from 'react-native';
import {styles} from "../Styles";
import {LinearGradient} from 'expo-linear-gradient';
import {useState} from "react";
import RequestCard from "../Components/RequestCard";
import Events from "./Events";
import Leaderboard from "./Leaderboard";

export default function Community() {

    const [communityToggle, setCommunityToggle] = useState(false)

    return (
        <LinearGradient
            colors={['#68984e', '#d8e5b7']}
            start={[0, 0.5]}
            style={styles.background}
        >
            <View style={{flexDirection: "row", padding: 12}}>
                <TouchableOpacity style={communityToggle?styles.toggleButtonSelected:styles.toggleButtonUnselected}
                                  onPress={()=>{setCommunityToggle(true)}}>
                    <Text style={communityToggle?{color:"#386540"}:{color:"#ffffff"}}>Events</Text>
                </TouchableOpacity>
                <TouchableOpacity style={communityToggle?styles.toggleButtonUnselected:styles.toggleButtonSelected}
                                  onPress={()=>{setCommunityToggle(false)}}>
                    <Text style={communityToggle?{color:"#ffffff"}:{color:"#386540"}}>Leaderboard</Text>
                </TouchableOpacity>
            </View>
            {communityToggle?
            <Events/>:<Leaderboard/>}
            
        </LinearGradient>


    );
}

import { Text, View,  TouchableOpacity,ScrollView} from 'react-native';
import {styles} from "../Styles";
import {LinearGradient} from 'expo-linear-gradient';
import {useState} from "react";
import EventCard from "../Components/EventCard";
import LeaderboardCard from "../Components/LeaderboardCard";
import {FontAwesome} from '@expo/vector-icons';
import ToggleButtons from "../Components/ToggleButtons";

export default function Community() {

    const [communityToggle, setCommunityToggle] = useState(true)

    return (
        <LinearGradient
            colors={['#68984e', '#d8e5b7']}
            start={[0, 0.5]}
            style={styles.background}
        >
            <ToggleButtons titleLeft={"Events"} titleRight={"Leaderboard"} onToggle={(r)=> setCommunityToggle(r)}/>
            {communityToggle?
            <Events/>:<Leaderboard/>}
            
        </LinearGradient>


    );
}

 function Leaderboard() {
    const Events = [
        {name:"William Jones",place:1,points:10},
        {name:"Emma Scott",place:2,points:8},
        {name:"Spencer Fay",place:3,points:4},
        {name:"Hannah Railey",place:4,points:3},
        {name:"Luke Ross",place:5,points:2},
        {name:"George Hitt",place:6,points:1},
    ]
    return (
        <View style={{width: "100%", padding: 15,flex:1}}>
            <Text style={{fontWeight: "bold", fontSize: 24, color: "#fff"}}>Leaderboard</Text>
            <View style={{backgroundColor: "#f6d14f", borderRadius: 5,flexDirection:"row"}}>
                <Text style={{flex:1}}>Rank</Text>
                <Text style={{flex:3}}>User </Text>
                <Text style={{flex:1}}>Points</Text>
            </View>

            <ScrollView>
                {Events.map((name, index) => {
                    return <LeaderboardCard info={name} key={index}/>
                })}
            </ScrollView>
            <View style={{flexDirection: "row", padding: 10}}>
                <FontAwesome name="plus" size={24} color="white" style={{top: 5}}/>
                <Text style={{fontWeight: "bold", fontSize: 24, color: "#fff", left: 10}}>Invite Your Friends</Text>
            </View>
        </View>
    );
}


function Events() {
    const Events = [1, 2, 3, 4, 5]
    return (
        <View style={{width: "100%", padding: 15,flex:1}}>
            <Text style={{fontWeight: "bold", fontSize: 24, color: "#fff"}}>Events</Text>
            <Text style={{backgroundColor: "#f6d14f", borderRadius: 5}}>There are {Events.length} new events in your
                area!</Text>
            <ScrollView>
                {Events.map((event, index) => {
                    return <EventCard event={event} key={index}></EventCard>
                })}
            </ScrollView>
            <View style={{flexDirection: "row", padding: 10}}>
                <FontAwesome name="plus" size={24} color="white" style={{top: 5}}/>
                <Text style={{fontWeight: "bold", fontSize: 24, color: "#fff", left: 10}}>Host New Event</Text>
            </View>
        </View>
    );
}





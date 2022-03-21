import {View, Text, ScrollView} from "react-native";
import EventCard from "../Components/EventCard";
import {FontAwesome} from '@expo/vector-icons';
import LeaderboardCard from "../Components/LeaderboardCard";

export default function Leaderboard() {
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


import {View, Text, ScrollView} from "react-native";
import EventCard from "../Components/EventCard";
import {FontAwesome} from '@expo/vector-icons';

export default function Events() {
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


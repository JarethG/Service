import {View, Text} from "react-native";

export default function EventCard({event}) {
    return (
        <View style={{backgroundColor: 'rgba(255,255,255,0.4)', margin: 10, borderRadius: 10, padding: 7}}>
        <Text>Event number {event}</Text>
            <View style={{height:40}}></View>
        </View>
    );
}


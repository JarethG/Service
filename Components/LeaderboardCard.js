import {View, Text} from "react-native";
import {ScrollView} from "react-native";

export default function LeaderboardCard({info}) {
    return (
        <View style={{
            backgroundColor: 'rgba(255,255,255,0.4)',
            borderRadius: 10,
            marginTop:5,
            flexDirection: "row",
            alignItems: "center",
        }}>
            <Text style={{fontWeight: "bold", fontSize: 24, color: "#fff", flex: 1}}>{info.place}</Text>
            <View style={{flex: 3, flexDirection: "row", alignItems: "center"}}>
                <View style={{width: 50, height: 50, borderRadius: 25, backgroundColor: "#ffffff"}}/>
                <Text style={{fontWeight: "bold", fontSize: 18, color: "#fff",left:5}}>{info.name}</Text>
            </View>
            <Text style={{fontWeight: "bold", fontSize: 18, color: "#fff", flex: 1}}>{info.points}</Text>
        </View>
    );
}


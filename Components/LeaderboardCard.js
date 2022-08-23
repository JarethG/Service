import {View, Text, Image} from "react-native";
import {ScrollView} from "react-native";
import {styles} from "../Styles";
import {images} from "../assets/Avatars/ImageLoader";

export default function LeaderboardCard({info,place}) {
    return (
        <View style={[styles.midColour,{
            borderRadius: 10,
            marginTop:5,
            flexDirection: "row",
            alignItems: "center",
            padding:5
        }]}>
            <Text style={{fontWeight: "bold", fontSize: 24, color: "#fff", flex: 1}}>{place}</Text>
            <View style={{flex: 3, flexDirection: "row", alignItems: "center"}}>
                <Image source={images[info.avatar]} style={{width:50,height:50}}/>
                <Text style={{fontWeight: "bold", fontSize: 18, color: "#fff",left:5}}>{info.name}</Text>
            </View>
            <Text style={{fontWeight: "bold", fontSize: 18, color: "#fff", flex: 1}}>{info.points}</Text>
        </View>
    );
}


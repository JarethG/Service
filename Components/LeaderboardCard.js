import {View, Text, Image} from "react-native";
import {ScrollView} from "react-native";
import {styles} from "../Styles";
import {images} from "../assets/Avatars/ImageLoader";
import { LinearGradient } from 'expo-linear-gradient';
import ProfilePicture from "./ProfilePicture";

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
                <ProfilePicture rank={info.rank} source={images[info.avatar]} style={{
                    borderRadius: 25,
                    width: 50,
                    height: 50
                }}/>
                <Text style={{fontWeight: "bold", fontSize: 18, color: "#fff",left:5}}>{info.name}</Text>
            </View>
            <Text style={{fontWeight: "bold", fontSize: 18, color: "#fff", flex: 1}}>{info.monthlyPoints}</Text>
        </View>
    );
}


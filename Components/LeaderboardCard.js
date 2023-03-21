import {View, Text} from "react-native";
import {styles} from "../Styles";
import {images} from "../assets/Avatars/ImageLoader";
import ProfilePicture from "./ProfilePicture";

export default function LeaderboardCard({info,place}) {
    return (
        <View style={[styles.midColour,styles.leaderboardContainer]}>
            <Text style={[styles.header,{flex:1}]}>{place}</Text>
            <View style={{flex: 3, flexDirection: "row", alignItems: "center"}}>
                <ProfilePicture rank={info.rank} source={images[info.avatar]} style={styles.leaderboardImage}/>
                <Text style={styles.text}>{info.name}</Text>
            </View>
            <Text style={styles.header}>{info.monthlyPoints}</Text>
        </View>
    );
}


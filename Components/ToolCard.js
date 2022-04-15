import {View, Text} from "react-native";
import {ScrollView} from "react-native";
import {styles} from "../Styles";

export default function ToolCard({info}) {
    return (
        <View style={styles.cardContainer}>
            <View style={{flexDirection: "row"}}>
                <View style={styles.cardProfilePicture}></View>
                <View>
                    <Text style={styles.cardName}>{info.name}</Text>
                    <Text style={styles.cardTags}>{info.tool}</Text>
                </View>
            </View>
            <Text>{info.description}</Text>
        </View>
    );
}


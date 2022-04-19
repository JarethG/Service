import {View, Text} from "react-native";
import {ScrollView} from "react-native";
import {styles} from "../Styles";

export default function ToolCard({info}) {
    return (
        <View style={styles.ResourceCardContainer}>
            <View style={{flexDirection: "row"}}>
                <View style={styles.cardProfilePicture}></View>
                <View>
                    <Text style={styles.cardName}>{info.name}</Text>
                    <Text style={styles.cardTags}>{info.category}</Text>
                </View>
            </View>
            <Text style={styles.cardText}>{info.description}</Text>
        </View>
    );
}


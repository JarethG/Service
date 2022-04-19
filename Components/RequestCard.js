import {View, Text, Button} from "react-native";
import {ScrollView} from "react-native";
import {styles} from "../Styles";

export default function RequestCard({info}) {
    return (
        <View style={styles.SkillCardContainer}>
            <View style={{flexDirection: "row"}}>
                <View style={styles.cardProfilePicture}></View>
                <View>
                    <Text style={styles.cardName}>{info.name}</Text>
                    <ScrollView horizontal>
                        {info.skills.map((skill, index) => {
                            return <Text style={styles.cardTags} key={index}>{skill}</Text>
                        })}
                    </ScrollView>
                </View>
            </View>
            <Text style={[styles.cardText,{fontWeight:"bold"}]}>{info.title}</Text>
            <Text style={styles.cardText}>{info.description}</Text>
        </View>
    );
}



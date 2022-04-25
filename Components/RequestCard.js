import {View, Text, Button} from "react-native";
import {ScrollView} from "react-native";
import {styles} from "../Styles";

export default function RequestCard({info}) {

    const isSkill = info.type=="skill"
    return (
        <View style={[isSkill?styles.skillsTheme:styles.resourceTheme,styles.container]}>
            <View style={{flexDirection: "row"}}>
                <View style={styles.cardProfilePicture}></View>
                <View>
                    <Text style={styles.header}>{info.name}</Text>
                    {isSkill?
                    <ScrollView horizontal>
                        {info.skills.map((skill, index) => {
                            return <Text style={styles.cardTags} key={index}>{skill}</Text>
                        })}
                    </ScrollView>
                        :
                        <Text style={styles.cardTags}>{info.category}</Text>
                    }
                </View>
            </View>
            {isSkill?<Text style={styles.title}>{info.title}</Text>:null}
            <Text style={styles.cardText}>{info.description.length<100? info.description : info.description.substr(0,100) }</Text>
        </View>
    );
}



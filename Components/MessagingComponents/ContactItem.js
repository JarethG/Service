import {Text, View} from "react-native";
import {styles} from "../../Styles";
import ProfileContext from "../../utils/profileContext";
import {useContext} from "react";


export const ContactItem = ({info}) => {
    const profile = useContext(ProfileContext)
    const date = new Date(info.lastTimeStamp);
    return (
        <View style={[styles.skillsTheme, {margin: 10, borderRadius: 10, padding: 7,flexDirection: "row"}]}>
            <View style={{width: 70, height: 70, borderRadius: 35, backgroundColor: "#ffffff"}}></View>
            <View style={{flex: 1}}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.title}>
                        {console.log(info)}
                        {info.acceptingUser === ""?
                            "pending acceptance":
                            info.client === profile.name?
                                info.client:
                                info.name
                        }
                    </Text>
                    <Text>{date.toLocaleTimeString()}</Text>
                </View>
                <Text>{info.jobTitle}</Text>
                <Text>{info.lastMessage}</Text>
            </View>
        </View>
    );
}
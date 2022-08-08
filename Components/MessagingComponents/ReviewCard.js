import {Text, View} from "react-native";
import {styles} from "../../Styles";


export const ReviewCard = ({info}) => {
    return (
        <View style={[styles.midColour, styles.container,{flexDirection: "row"}]}>
            <View style={{width: 70, height: 70, borderRadius: 35, backgroundColor: "#ffffff"}}></View>
            <View style={{flex: 1}}>
                <Text>This job is complete, take the time to leave a review</Text>
                <Text>{info.jobTitle}</Text>
            </View>
        </View>
    );
}
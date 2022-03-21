import {View, Text, Image} from "react-native";
import {ScrollView} from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function RequestCard({info}) {
    return (
        <View style={{backgroundColor: 'rgba(255,255,255,0.4)', margin: 10, borderRadius: 10, padding: 7,}}>
            <View style={{flexDirection: "row"}}>
                <View style={{width: 70, height: 70, borderRadius: 35, backgroundColor: "#ffffff"}}></View>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text>{info.name}</Text>
                        <Text>{info.time}</Text>
                    </View>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Ionicons name="checkmark-done-circle-outline" size={24} color={info.checked?"green":"grey"}/>
                        <Text>{info.message}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}


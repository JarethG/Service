import {View, Text} from "react-native";
import {ScrollView} from "react-native";

export default function ToolCard({info}) {
    return (
        <View style={{backgroundColor: 'rgba(255,255,255,0.4)', margin: 10, borderRadius: 10, padding: 7,}}>
            <View style={{flexDirection: "row"}}>
                <View style={{width: 70, height: 70, borderRadius: 35, backgroundColor: "#ffffff"}}></View>
                <View style={{flex: 1}}>
                    <Text style={{flex: 1,fontSize:20,fontWeight:"bold",color:"white"}}>{info.name}</Text>
                    <Text style={{backgroundColor:"#ffffff",borderRadius:15, margin:3,padding:5,color:"#386540",fontSize:12}}>{info.tool}</Text>
                </View>
            </View>
            <Text>{info.description}</Text>
        </View>
    );
}


import {Button, FlatList, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../Styles";
import {Ionicons} from "@expo/vector-icons";
import {useState} from "react";

const Picker = ({data,apply}) => {

    const [picked,setPicked] = useState([])

    function add(string) {
        setPicked([...picked, string])
    }

    function remove(string) {
        setPicked(picked.filter(function (category) {
            return category !== string
        }));
    }

    const RenderItem = ({string}) => {
        return <TouchableOpacity style={styles.menuItem}
                                 onPress={() => {
                                     picked.includes(string) ? remove(string) : add(string)
        }}
        >
            <Text style={{flex: 1}}>{string}</Text>
            { picked.includes(string) ?
                <Ionicons name="checkbox-outline" size={28} color="black"/>
                :
                <View style={{width: 24, height: 24, borderColor: "#000", borderWidth: 2, margin:2}}/>
            }

        </TouchableOpacity>
    }

    return (
        <>
        <FlatList data={data} keyExtractor={(item ) => item}
                  renderItem={({item})=><RenderItem string={item}/>}/>
            <Button title={"apply"} onPress={()=>apply(picked)}/>
        </>
    )
}

export default Picker
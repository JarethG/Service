import {Alert, FlatList, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {useState} from "react";
import lists from "../JSONS/Filters.json"

export default function Search({result}) {
    const tools = lists.Tools

    const [searching, setSearching] = useState(false)
    const [searchText, setSearchText] = useState();


    const [searchSuggestions, setSearchSuggestions] = useState(tools)

    function searchFilter(text) {
        setSearchText(text)
        let filtered = tools.filter((tool) => {
            return tool.indexOf(text) > -1;
        })
        text == "" ? setSearchText(null) : null
        filtered.length == 0 ?
            setSearchSuggestions(["sorry, nothing fits that query"])
            :
            setSearchSuggestions(filtered)

    }

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={()=>{
                result(item)
                setSearching(false)
            }} style={{alignSelf:"center"}}>
                <Text style={{backgroundColor:'#88ff11', borderRadius: 10, margin: 1,padding:5,fontSize:20,fontWeight:'bold'}}>{item}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <TouchableOpacity style={{flexDirection: "row", padding: 5, borderWidth: 1, borderRadius: 5}}
                              onPress={() => setSearching(true)}>
                <AntDesign name="search1" size={24} color="black"/>
                <Text>Browse all skills and resources...</Text>
            </TouchableOpacity>
            {searching ?
                <Modal
                    onRequestClose={() => {
                        setSearching(false);
                    }}>
                    <View style={{flexDirection: "row", padding: 5, borderWidth: 1, borderRadius: 5}}>
                        <AntDesign name="caretleft" size={24} color="black" onPress={() => setSearching(false)}/>
                        <TextInput
                            onChangeText={searchFilter}
                            value={searchText}
                            placeholder="Browse all skills and resources..."
                        />
                    </View>
                    <FlatList data={searchSuggestions} keyExtractor={(item, index) => item} renderItem={renderItem}/>
                </Modal>
                :
                null
            }
        </View>
    );

}





import {FlatList, Text, TextInput, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {useState} from "react";
import lists from '../JSONS/Filters.json'
export default function Searchbar() {

    const tools = lists.Tools
    const [searchText, setSearchText] = useState();
    const [searchSuggestions,setSearchSuggestions] = useState(tools)

    function searchFilter(text) {
        setSearchText(text)
        let filtered = tools.filter((tool)=>{
            return tool.indexOf(text) > -1;
        })
        text==""?setSearchText(null):null
        filtered.length==0?
            setSearchSuggestions(["sorry, nothing fits that query"])
        :
        setSearchSuggestions(filtered)

    }


    const dropdownItem = ({item}) => {
        return (
            <Text style={{backgroundColor:"white",borderRadius:5,margin:1}}>{item}</Text>
        )
    }

    return(
        <View>
        <View style={{flexDirection: "row", padding: 5, borderWidth: 1, borderRadius: 5}}>
            <TextInput
                onChangeText={searchFilter}
                value={searchText}
                placeholder="Browse all skills and resources..."
            />
            <AntDesign name="search1" size={24} color="black"/>

        </View>
            {searchText!=null?<View style={{height:"50%"}}>
                <FlatList
                    data={searchSuggestions}
                    keyExtractor={(item, index) => item}
                    renderItem={dropdownItem}
                />
            </View>:null}
        </View>
    );
}


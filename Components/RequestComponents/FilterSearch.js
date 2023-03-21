import {FlatList, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {useState} from "react";

export default function FilterSearch({data, text, onSearch}) {

    const [searching, setSearching] = useState(false)
    const [searchText, setSearchText] = useState();


    const [searchSuggestions, setSearchSuggestions] = useState(data)

    function searchFilter(text) {
        setSearchText(text)
        let filtered = data.filter((item) => {
            return item.indexOf(text) > -1;
        })
        text == "" ? setSearchText(null) : null
        filtered.length == 0 ?
            setSearchSuggestions(["sorry, nothing fits that query"])
            :
            setSearchSuggestions(filtered)

    }

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => {
                onSearch(item)
                setSearching(false)
            }} style={{alignSelf: "center"}}>
                <Text style={{
                    backgroundColor: '#d8e5b7',
                    borderRadius: 10,
                    margin: 1,
                    padding: 5,
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>{item}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <TouchableOpacity
                style={{flexDirection: "row", padding: 5, borderWidth: 1, borderRadius: 5, alignSelf: "center"}}
                onPress={() => setSearching(true)}>
                <AntDesign name="search1" size={24} color="black"/>
                <Text>{text}</Text>
            </TouchableOpacity>
            {searching ?
                <Modal
                    onRequestClose={() => {
                        setSearching(false);
                    }}>
                    <View style={{backgroundColor: "#68984e", flex: 1}}>
                        <View style={{flexDirection: "row", padding: 5, borderWidth: 1, borderRadius: 5}}>
                            <AntDesign name="caretleft" size={24} color="black" onPress={() => setSearching(false)}/>
                            <TextInput
                                onChangeText={searchFilter}
                                value={searchText}
                                placeholder={text}
                            />
                        </View>
                        <FlatList data={searchSuggestions} keyExtractor={(item, index) => item}
                                  renderItem={renderItem}/>
                    </View>
                </Modal>
                :
                null
            }
        </View>
    );

}





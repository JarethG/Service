import React, {useState} from "react";
import {FlatList, Pressable, Text, TextInput, View} from "react-native";
import {Resources,Skills} from '../../JSONS/Tags.json'
import {styles} from "../../Styles";
import Post from "../Post";
import Button from "../Button";
import {acceptRequest} from "../../utils/Firebase";

export default function RequestSearchEngine() {
    const [searchText,setSearchText]=useState("")
    const [searchResults,setSearchResults]=useState()

    const SearchBar = () => {
        return (
            <TextInput
                style={{borderWidth: 1, padding: 5, margin: 7,backgroundColor:"white",width:"80%"}}
                placeholder={"Search"}
                value={searchText}
                onChangeText={onTextUpdate}
                autoFocus={true}
            />
        )
    }

    function onTextUpdate(text){
        setSearchText(text)
        let res = Resources.filter((string)=> {
           return string.includes(text)
        })
        setSearchResults(res);
    }

    return (
        <View style={styles.background}>
            <SearchBar/>
            <FlatList data={searchResults} keyExtractor={(item, index) => index.toString()}
                style={[styles.midColour,{width:"80%"}]}
                      renderItem={({item}) =>
                          <Pressable style={[styles.container,styles.lightColour]}
                            onPress={()=>console.log("something")}>
                            <Text>{item}</Text>
                          </Pressable>
                      }
            />
        </View>
    );

}





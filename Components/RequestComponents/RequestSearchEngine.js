import React, {useState} from "react";
import {FlatList, Pressable, Text, TextInput, View} from "react-native";
import {Resources,Skills} from '../../JSONS/Tags.json'
import {styles} from "../../Styles";
import Post from "../Post";
import Button from "../Button";
import {acceptRequest} from "../../utils/Firebase";

export default function RequestSearchEngine({navigation,route}) {
    const [searchText,setSearchText]=useState("")
    const [searchResults,setSearchResults]=useState()

    function SearchBar() {
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
            <Button title={"back"} onPress={()=> {navigation.goBack()}}/>
            <Button title={"clear Filter"} onPress={()=> {
                route.params.setFilter("")
                navigation.goBack()}}/>
            {SearchBar()}
            <FlatList data={searchResults} keyExtractor={(item, index) => index.toString()}
                style={[styles.midColour,{width:"80%"}]}
                      renderItem={({item}) =>
                          <Pressable style={[styles.container,styles.lightColour]}
                            onPress={()=>{
                                route.params.setFilter(item)
                                navigation.goBack()
                            }}>
                            <Text>{item}</Text>
                          </Pressable>
                      }
            />
        </View>
    );

}





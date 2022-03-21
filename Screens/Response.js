import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity,ScrollView} from 'react-native';
import {Styles} from "../Styles";
import {LinearGradient} from 'expo-linear-gradient';
import {useState} from "react";
import ResponseCard from "../Components/ResponseCard";

export default function Response() {

    const dummy = [
        {name:"William Jones",
            time:"09:05",
            checked:true,
            message:"hey there - i can help with that..."},
        {name:"Hannah Bailey",
            time:"09:05",
            checked:false,
            message:"hey there - i can help with that..."},
        {name:"Emma Scott",
            time:"09:05",
            checked:true,
            message:"hey there - i can help with that..."},
        {name:"George Hitt",
            time:"09:05",
            checked:false,
            message:"hey there - i can help with that..."},
        {name:"Spencer Fay",
            time:"09:05",
            checked:true,
            message:"hey there - i can help with that..."},

    ]

    const [searchText, setSearchText] = useState();

    return (
        <LinearGradient
            colors={['#68984e', '#d8e5b7']}
            start={[0, 0.5]}
            style={Styles.background}
        >
            <View style={{flexDirection: "row", padding: 12}}>
                <TextInput
                    style={{
                        height: 30,
                        width:"100%",
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 5
                    }}
                    onChangeText={setSearchText}
                    value={searchText}
                    placeholder="Search"
                />
            </View>

            <ScrollView style={{width:"100%"}}>
                {dummy.map((info,index) => {
                    return <ResponseCard info={info} key={index}></ResponseCard>
                })}

            </ScrollView>
            <StatusBar style="auto"/>
        </LinearGradient>


    );
}

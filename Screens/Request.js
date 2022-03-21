import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity,ScrollView} from 'react-native';
import {styles} from "../Styles";
import {LinearGradient} from 'expo-linear-gradient';
import {useState} from "react";
import RequestCard from "../Components/RequestCard";

export default function Request() {

    const dummy = [
        {name:"William Jones",
        skills:["photography","technology","arts"],
        title:"Photos needed for website",
        description:"im looking for someone who can help me take photos for my website, nothing too fancy but..."},
        {name:"Hannah Baily",
            skills:["crafts","sewing","fashion"],
            title:"Dress sleeve torn",
            description:"im looking for someone who can help me take photos for my website, nothing too fancy but..."},
        {name:"Emma Scott",
            skills:["Senior support","Caretaker","Social"],
            title:"Photos needed for website",
            description:"im looking for someone who can help me take photos for my website, nothing too fancy but..."},
        {name:"Jareth Gaskin",
            skills:["App building","Project management","Googling"],
            title:"Bugs need fixing",
            description:"looking for someone to review my code"}

    ]

    const [searchText, setSearchText] = useState();
    const [searchToggle, setSearchToggle] = useState(true)

    return (
        <LinearGradient
            colors={['#68984e', '#d8e5b7']}
            start={[0, 0.5]}
            style={styles.background}
        >
            <View style={{flexDirection: "row", padding: 12}}>
                <TextInput
                    style={{
                        height: 30,
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 5
                    }}
                    onChangeText={setSearchText}
                    value={searchText}
                    placeholder="Browse all skills and resources..."
                />
                <Image source={require('../assets/filter.png')} style={{height: 30, width: 30}}></Image>
            </View>
            <View style={{flexDirection: "row", padding: 12}}>
                <TouchableOpacity style={searchToggle?styles.toggleButtonSelected:styles.toggleButtonUnselected}
                                  onPress={()=>{setSearchToggle(true)}}>
                    <Text style={searchToggle?{color:"#386540"}:{color:"#ffffff"}}>Skills</Text>
                </TouchableOpacity>
                <TouchableOpacity style={searchToggle?styles.toggleButtonUnselected:styles.toggleButtonSelected}
                                  onPress={()=>{setSearchToggle(false)}}>
                    <Text style={searchToggle?{color:"#ffffff"}:{color:"#386540"}}>Resources</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{width:"100%"}}>
                {dummy.map((info,index) => {
                    return <RequestCard info={info} key={index}></RequestCard>
                })}

            </ScrollView>
            <StatusBar style="auto"/>
        </LinearGradient>


    );
}

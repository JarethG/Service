import {StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from "../Styles";
import {LinearGradient} from 'expo-linear-gradient';
import {useState} from "react";
import {AntDesign} from '@expo/vector-icons';
import RequestCard from "../Components/RequestCard";

export default function Profile() {

    const [profileToggle, setProfileToggle] = useState(false)

    return (
        <LinearGradient
            colors={['#68984e', '#d8e5b7']}
            start={[0, 0.5]}
            style={styles.background}
        >
            <View style={{width: 150, height: 150, borderRadius: 75, backgroundColor: "#ffffff"}}></View>
            <Text>Luke Ross</Text>
            <Text>Videographer / Photographer</Text>
            <View style={{flexDirection: "row"}}>
                <AntDesign name="star" size={24} color="black"/>
                <AntDesign name="star" size={24} color="black"/>
                <AntDesign name="star" size={24} color="black"/>
                <AntDesign name="star" size={24} color="black"/>
                <AntDesign name="staro" size={24} color="black"/>
                <Text>(8)</Text>
            </View>
            <View style={{flexDirection: "row", padding: 12}}>
                <TouchableOpacity style={profileToggle ? styles.toggleButtonSelected : styles.toggleButtonUnselected}
                                  onPress={() => {
                                      setProfileToggle(true)
                                  }}>
                    <Text style={profileToggle ? {color: "#386540"} : {color: "#ffffff"}}>About Me</Text>
                </TouchableOpacity>
                <TouchableOpacity style={profileToggle ? styles.toggleButtonUnselected : styles.toggleButtonSelected}
                                  onPress={() => {
                                      setProfileToggle(false)
                                  }}>
                    <Text style={profileToggle ? {color: "#ffffff"} : {color: "#386540"}}>My Requests</Text>
                </TouchableOpacity>
            </View>
            {profileToggle ?
                <AboutMe/> : <MyRequests/>
            }
        </LinearGradient>


    );
}

function AboutMe() {
    const skills = ["Photography", "Tech", "+ add new"]
    const resources = ["lawnmower"]

    return (
        <View style={{width: "100%", padding: 15, flex: 1}}>
            <Text style={styles.header}>About</Text>
            <Text>I work at Parliament - I've just come back from the
                United Kingdom last year and i want to get to know
                my community a little more</Text>
            <Text style={styles.header}>Skills</Text>
            <View>
                <ScrollView horizontal>
                    {skills.map((skill, index) => {
                        return <Text style={{
                            backgroundColor: "#ffffff",
                            borderRadius: 15,
                            margin: 3,
                            padding: 5,
                            color: "#386540",
                            fontSize: 12
                        }} key={index}>{skill}</Text>
                    })}
                </ScrollView>
            </View>
            <Text style={styles.header}>Resources</Text>
            <View>
                <ScrollView horizontal>
                    {resources.map((skill, index) => {
                        return <Text style={{
                            backgroundColor: "#ffffff",
                            borderRadius: 15,
                            margin: 3,
                            padding: 5,
                            color: "#386540",
                            fontSize: 12
                        }} key={index}>{skill}</Text>
                    })}
                </ScrollView>
            </View>
        </View>
    );
}

function MyRequests () {
    const requests = [
        {name:"William Jones",
            skills:["photography","technology","arts"],
            title:"Photos needed for website",
            description:"im looking for someone who can help me take photos for my website, nothing too fancy but..."},
        {name:"Hannah Baily",
            skills:["crafts","sewing","fashion"],
            title:"Dress sleeve torn",
            description:"im looking for someone who can help me take photos for my website, nothing too fancy but..."}
        ]
    return(
<View>
        <ScrollView style={{width:"100%"}}>
            {requests.map((info,index) => {
                return <RequestCard info={info} key={index}></RequestCard>
            })}

        </ScrollView>
</View>
    );
}



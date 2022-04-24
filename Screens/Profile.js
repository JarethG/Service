import {StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity, ScrollView, Modal} from 'react-native';
import {styles} from "../Styles";
import {LinearGradient} from 'expo-linear-gradient';
import React, {useContext, useState} from "react";
import {AntDesign} from '@expo/vector-icons';
import RequestCard from "../Components/RequestCard";
import ToggleButtons from "../Components/ToggleButtons";
import Filters from "../Components/Filters";
import UserContext from "../Components/AuthContextFrame";
import * as SecureStore from 'expo-secure-store';

export default function Profile() {
    const [profileToggle, setProfileToggle] = useState(true)
    const {user,setUser}= useContext(UserContext)
    return (
        <View style={[styles.background,{alignItems: 'center'}]}>
            <Button title={"Sign Out"} onPress={()=>{
                setUser(null)
                SecureStore.deleteItemAsync('userToken').then(console.log("signed out"))
            }}/>
            <View style={{width: 150, height: 150, borderRadius: 75, backgroundColor: "#ffffff"}}/>
            <Text style={styles.header}>{user.name}</Text>
            <Text>{user.title}</Text>
            <View style={{flexDirection: "row"}}>
                <AntDesign name="star" size={24} color="black"/>
                <AntDesign name="star" size={24} color="black"/>
                <AntDesign name="star" size={24} color="black"/>
                <AntDesign name="star" size={24} color="black"/>
                <AntDesign name="staro" size={24} color="black"/>
                <Text>(8)</Text>
            </View>
            <ToggleButtons titleLeft={"About Me"} titleRight={"My Request"}
                           onToggle={(r) => setProfileToggle(r)}/>
            {profileToggle ?
                <AboutMe user={user}/> : <MyRequests/>
            }
        </View>


    );
}

function AboutMe({user}) {
    const [skills, setSkills] = useState(user.skills)
    const [resources, setResources] = useState(user.resources)
    const [filters, setFilters] = useState(null);

    function addSkill(string) {
        let newArr = [...skills];
        newArr.push(string)
        setSkills(newArr)
    }
    function addResources(string) {
        let newArr = [...resources];
        newArr.push(string)
        setResources(newArr)
    }

    return (
        <View style={{width: "100%", padding: 15, flex: 1}}>
            <Text style={styles.header}>About</Text>
            <Text>{user.about}</Text>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={styles.header}>Skills</Text>
                <AntDesign name="plussquareo" size={24} color="black" onPress={()=>
                    setFilters(<Filters filtersVisible={true}
                                        setFiltersVisible={(r)=> setFilters(null)}
                                        returnFunction={(r)=>addSkill(r)}/>)
                }/>
            </View>
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
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={styles.header}>Resources</Text>
                <AntDesign name="plussquareo" size={24} color="black" onPress={()=>
                    setFilters(<Filters filtersVisible={true}
                                        setFiltersVisible={(r)=> setFilters(null)}
                                        returnFunction={(r)=>addResources(r)}/>)
                }/>
            </View>
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
            {filters}
        </View>
    );
}

function MyRequests() {
    const requests = [
        {
            name: "Luke Ross",
            skills: ["Graphic Design"],
            title: "App development",
            description: "Hi, im looking for someone who can help lay out a new app i am trying to make"
        },
        {
            name: "Luke Ross",
            skills: ["Law"],
            title: "Ip Agreements",
            description: "Working with some students who have forms that i need looked over..."
        }
    ]
    return (
        <View>
            <ScrollView style={{width: "100%"}}>
                {requests.map((info, index) => {
                    return <RequestCard info={info} key={index}></RequestCard>
                })}

            </ScrollView>
        </View>
    );
}



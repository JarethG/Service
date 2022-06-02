import {StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, Modal, FlatList} from 'react-native';
import {styles} from "../Styles";
import React, {useContext, useEffect, useState} from "react";
import {AntDesign} from '@expo/vector-icons';
import RequestCard from "../Components/RequestCard";
import ToggleButtons from "../Components/ToggleButtons";
import SkillSearch from "../Components/SkillSearch";
import { signOut, getAuth } from 'firebase/auth';
import { Authentication } from '../utils/Authentication';
import Button from '../Components/Button'
import ResourcePicker from "../Components/ResourcePicker";
import {UpdateAccount} from "../utils/AccountHandler";
import {getDocsByIDs, getMyRequests, getOffers} from "../utils/Firebase";
import Post from "../Components/Post";

export default function Profile({route}) {

    const profile = route.params

    const [profileToggle, setProfileToggle] = useState(true)
    const [myRequests,setMyRequests] = useState(getRequests)

    async function getRequests(){
        getMyRequests(profile.email).then(r=>console.log(r.myRequests))
    }
    return (
        <View style={[styles.background,{alignItems: 'center'}]}>
            <View style={{width: 150, height: 150, borderRadius: 75, backgroundColor: "#ffffff"}}/>
            <Text style={styles.header}>{profile.name}</Text>
            <Text>{profile.title}</Text>
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
                <AboutMe profile={profile}/> : <MyRequests profile={profile}/>
            }
            <Button title="Sign Out" style={styles.button} onPress={() => signOut(auth)} />





        </View>


    );
}

const AboutMe =({profile})=> {
    const [skills, setSkills] = useState(profile.skills)
    const [resources, setResources] = useState(profile.resources)
    const auth = getAuth();
    const [visible, setVisible] = useState(false)

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
            <Text>{profile.about}</Text>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={styles.header}>Skills</Text>

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
            {visible? <Modal
                    onRequestClose={() => {
                        setVisible(false);
                    }}>
                    <UpdateAccount email={auth.currentUser.email} oldData={profile}/>
                </Modal> :
                <Button title="update info" style={styles.button} onPress={()=>setVisible(true)} />}
        </View>
    );
}

const MyRequests =({profile})=> {

    const [requests, setRequests] = useState([])

    useEffect(() => {
        get().then(r => {
            setRequests(r)
        })
    }, [])

    function get() {
        let newFeed = getMyRequests(profile.email).then()
        // setRequestCounter(requestCounter+20)
        return newFeed
    }
    return (
        <View style={{flex: 1}}>
            {requests?
                <FlatList data={requests} keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) => <Post details={item.doc}/>}
                          />
                :<Text>It apears you havent made any requests yet, head over to the Notice Boards tab to get started</Text>}
        </View>
    );
}

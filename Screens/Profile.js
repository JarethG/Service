import {Text, View,ScrollView,FlatList} from 'react-native';
import {styles} from "../Styles";
import React, {useContext, useEffect, useState} from "react";
import {AntDesign} from '@expo/vector-icons';
import ToggleButtons from "../Components/ToggleButtons";
import { signOut, getAuth } from 'firebase/auth';
import Button from '../Components/Button'
import {UpdateAccount} from "../utils/AccountHandler";
import {addPoints, deleteRequest, getMyRequests} from "../utils/Firebase";
import Post from "../Components/Post";
import ProfileContext from "../utils/profileContext";

export default function Profile() {

    const profile = useContext(ProfileContext)
    const auth = getAuth();

    const [profileToggle, setProfileToggle] = useState(true)

    return (
        <View style={[styles.background,{alignItems: 'center'}]}>
            <View style={{width: 150, height: 150, borderRadius: 75, backgroundColor: "#ffffff"}}/>
            <Text style={styles.header}>{profile.name}</Text>
            <Text>{profile.title}</Text>
            <Text> Total Points: {profile.points}</Text>
            <Button title={"increment"} onPress={()=>addPoints(profile.email)}/>
            {/*<View style={{flexDirection: "row"}}>*/}
            {/*    <AntDesign name="star" size={24} color="black"/>*/}
            {/*    <AntDesign name="star" size={24} color="black"/>*/}
            {/*    <AntDesign name="star" size={24} color="black"/>*/}
            {/*    <AntDesign name="star" size={24} color="black"/>*/}
            {/*    <AntDesign name="staro" size={24} color="black"/>*/}
            {/*    <Text>(8)</Text>*/}
            {/*</View>*/}
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
    const auth = getAuth();
    return (
        <View style={{width: "100%", padding: 15, flex: 1}}>
            <Text style={styles.header}>About</Text>
            <Text>{profile.about}</Text>
                <Text style={styles.header}>Skills</Text>
            <View>
                <ScrollView horizontal>
                    {profile.skills.map((skill, index) => {
                        return <Text style={[styles.tags,styles.skillsTheme]} key={index}>{skill}</Text>
                    })}
                </ScrollView>
            </View>
                <Text style={styles.header}>Resources</Text>
            <View>
                <ScrollView horizontal>
                    {profile.resources.map((skill, index) => {
                        return <Text style={[styles.tags,styles.resourceTheme]} key={index}>{skill}</Text>
                    })}
                </ScrollView>
            </View>
            <UpdateAccount email={auth.currentUser.email} oldData={profile}/>
        </View>
    );
}

const MyRequests =({profile})=> {

    const [requests, setRequests] = useState([])
    useEffect(() => {
        get().then(r => {
            setRequests(r)
        })
    }, [profile])

    function get() {
        let newFeed = getMyRequests(profile.email).then()
        return newFeed
    }
    return (
        <View style={{flex: 1}}>
            {requests?
                <FlatList data={requests} keyExtractor={(item, index) => index.toString()}
                          renderItem={({item,index}) => <Post details={item.doc} navButton={
                              item.accepted?null:
                              <Button title={"delete request"} onPress={()=>{
                                  deleteRequest(item.id,profile.email).then(
                                      setRequests((requests) => requests.filter((_, num) => num !== index))
                                  )
                              }}/>
                          }/>}
                          />
                :<Text>It appears you haven't made any requests yet, head over to the Notice Boards tab to get started</Text>}
        </View>
    );
}

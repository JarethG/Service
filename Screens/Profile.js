import {Text, View, ScrollView, FlatList, Image, Pressable} from 'react-native';
import {styles} from "../Styles";
import React, {useContext, useEffect, useState} from "react";
import {AntDesign, FontAwesome} from '@expo/vector-icons';
import ToggleButtons from "../Components/ToggleButtons";
import {signOut, getAuth} from 'firebase/auth';
import Button from '../Components/Button'
import {UpdateAccount} from "../utils/AccountHandler";
import {addPoints, deleteRequest, getMyRequests} from "../utils/Firebase";
import Post from "../Components/Post";
import ProfileContext from "../utils/profileContext";
import {AdminFunctions} from "../utils/AdminFunctions";

export default function Profile() {

    const profile = useContext(ProfileContext)
    const auth = getAuth();
    const rating = 4;

    const [profileToggle, setProfileToggle] = useState(true)

    return (
        <View style={styles.background}>
        <View style={[styles.container,styles.midColour,{width:"100%",flex:1,alignItems:"center"}]}>
            <UpdateAccount email={auth.currentUser.email} oldData={profile}/>
            <Image source={require('../assets/Avatars/avataaars_2.png')} style={{width: 150, height: 150}}/>
            <Text style={styles.header}>{profile.name}</Text>
            <Text style={styles.text}>{profile.title}</Text>
            <Text style={styles.text}> Total Points: {profile.points}</Text>
            <View style={{flexDirection: "row"}}>
                { Array.from({ length: 5 }, (x, i) => {
                   return i < rating ?
                        <AntDesign key={i} name="star" size={24} color="rgb(255, 230, 80)"/> :
                        <AntDesign key={i} name="staro" size={24} color='rgb(255, 230, 80)'/>
            })}
            </View>
            <ToggleButtons titleLeft={"About Me"} titleRight={"My Request"}
                           onToggle={(r) => setProfileToggle(r)}/>
            {profileToggle ?
                <AboutMe profile={profile}/> : <MyRequests profile={profile}/>
            }
            <View style={{flexDirection: "row"}}>
                <AdminFunctions/>
                <Button title="Sign Out" style={styles.button} onPress={() => signOut(auth)}/>
            </View>
        </View>
        </View>
    );
}

const AboutMe = ({profile}) => {
    const auth = getAuth();
    return (
        <View style={{width: "100%", padding: 15, flex: 1}}>
            <Text style={styles.header}>About</Text>
            <Text style={styles.text}>{profile.about}</Text>
            <Text style={styles.header}>Skills</Text>
            <View>
                <ScrollView horizontal>
                    {profile.skills.map((skill, index) => {
                        return <Text style={[styles.tags, styles.darkColour]} key={index}>{skill}</Text>
                    })}
                </ScrollView>
            </View>
            <Text style={styles.header}>Resources</Text>
            <View>
                <ScrollView horizontal>
                    {profile.resources.map((skill, index) => {
                        return <Text style={[styles.tags, styles.darkColour]} key={index}>{skill}</Text>
                    })}
                </ScrollView>
            </View>
        </View>
    );
}

const MyRequests = ({profile}) => {

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
        <View style={{flex: 1,width:"100%"}}>
            {requests ?
                <FlatList data={requests} keyExtractor={(item, index) => index.toString()}
                          renderItem={({item, index}) =>
                              <Post details={item.doc} navButton={
                              // item.doc.accepted ? <Text> sorry, you cant delete an accepted offer</Text> :
                                  <Button title={"delete request"} onPress={() => {
                                      deleteRequest(item.id, profile.email).then(
                                          setRequests((requests) => requests.filter((_, num) => num !== index))
                                      )
                                  }}/>
                          }/>}
                />
                : <Text>It appears you haven't made any requests yet, head over to the Notice Boards tab to get
                    started</Text>}
        </View>
    );
}

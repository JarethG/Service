import {Text, View, ScrollView, FlatList, Image, Pressable, Modal} from 'react-native';
import {styles} from "../Styles";
import React, {useContext, useEffect, useState} from "react";
import {AntDesign, FontAwesome, Ionicons} from '@expo/vector-icons';
import ToggleButtons from "../Components/ToggleButtons";
import {signOut, getAuth} from 'firebase/auth';
import Button from '../Components/Button'
import {UpdateAccount} from "../utils/AccountHandler";
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {
    addPoints,
    createDummyData,
    deleteCollection,
    deleteDummyData,
    deleteRequest,
    getMyRequests
} from "../utils/Firebase";
import Post from "../Components/Post";
import ProfileContext from "../utils/profileContext";
import {AdminFunctions} from "../utils/AdminFunctions";
import requests from "../JSONS/requestDummyData.json";
import ButtonModal from "../Components/ButtonModal";

export default function Profile() {

    const [currentPage, setCurrentPage] = useState("about")
    const profile = useContext(ProfileContext);
    return (
        <View style={{width: "100%", padding: 15, flex: 1}}>
            <View style={[styles.container, styles.midColour, {width: "100%", flex: 1, alignItems: "center"}]}>
                <ProfileNavigator callback={(r) => setCurrentPage(r)}/>
                {currentPage == "about" ?
                    <AboutMe profile={profile}/> : currentPage == "requests" ?
                        <MyRequests profile={profile}/> : currentPage == "edit" ?
                            <MyRequests profile={profile}/> : currentPage == "reviews" ?
                                <MyRequests profile={profile}/> : currentPage == "achievements" ?
                                    <MyRequests profile={profile}/> : <MyRequests profile={profile}/>

                }
            </View>
        </View>
    );
}

const ProfileNavigator = ({callback}) => {
    const profile = useContext(ProfileContext);
    const [isVisible, setIsVisible] = useState(false)
    return <>{isVisible ?
        <Modal
            animationType="fade"
            transparent={true}
        >
            <View style={{flexDirection: "row", flex: 1}}>
                <View style={[styles.sidebarMenu, styles.darkColour]} onPress={e => e.stopPropagation()}>
                    <View style={{flexDirection: "row"}}>
                        <Image source={require('../assets/Avatars/avataaars_2.png')} style={{width: 50, height: 50}}/>
                        <View style={{marginLeft: 10}}>
                            <Text style={styles.text}>{profile.name}</Text>
                            <Text style={styles.text}>{profile.title}</Text>
                        </View>
                    </View>
                    <MenuItem title={"About Me"} iconName={"person"} onPress={() => callback("about")}/>
                    <MenuItem title={"My Request"} iconName={"clipboard-sharp"} onPress={() => callback("requests")}/>
                    <MenuItem title={"edit profile"} iconName={"pencil"} onPress={() => callback("edit")}/>
                    <MenuItem title={"Reviews"} iconName={"podium"} onPress={() => callback("reviews")}/>
                    <MenuItem title={"My Achievements"} iconName={"trophy"} onPress={() => callback("achievements")}/>
                    <MenuItem title={"Log out"} iconName={"log-out"} onPress={() => callback("logout")}/>
                </View>
                <Pressable style={styles.sidebarOff}
                           onPress={() => setIsVisible(!isVisible)}/>
            </View>
        </Modal>
        : null}
        <Ionicons name="ios-menu" size={48} color="black" onPress={() => setIsVisible(!isVisible)} style={{alignSelf:"flex-start"}}/>
        </>
        // <Button title={"settings"} onPress={() => setIsVisible(!isVisible)}/>
}

const MenuItem = ({title, onPress, iconName}) => {
    return (
        <Pressable style={styles.sidebarMenuItem} onPress={() => onPress()}>
            <Ionicons name="person" size={24} color="white"/>
            <Text style={[styles.header, {marginLeft: 15}]}>{title}</Text>
        </Pressable>
    )
}


const AboutMe = ({profile}) => {
    const auth = getAuth();
    const rating = 4;
    return (
        <View style={{width: "100%", padding: 15, flex: 1}}>

            <View style={[styles.container, styles.midColour, {width: "100%", flex: 1, alignItems: "center"}]}>

                {/*<UpdateAccount email={auth.currentUser.email} oldData={profile}/>*/}
                <Image source={require('../assets/Avatars/avataaars_2.png')} style={{width: 150, height: 150}}/>
                <Text style={[styles.header,{paddingTop:10}]}>{profile.name}</Text>
                <Text style={styles.text}>{profile.title}</Text>
                <Text style={styles.text}> Total Points: {profile.points}</Text>
                <View style={{flexDirection: "row",padding:10}}>
                    { Array.from({ length: 5 }, (x, i) => {
                        return i < rating ?
                            <AntDesign key={i} name="star" size={24} color="rgb(255, 230, 80)"/> :
                            <AntDesign key={i} name="staro" size={24} color='rgb(255, 230, 80)'/>
                    })}
                </View>
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
        <View style={[{flex: 1, width: "100%"}, styles.lightColour]}>
            {requests ?
                <FlatList data={requests} keyExtractor={(item, index) => index.toString()}
                          renderItem={({item, index}) =>
                              <Post details={item.doc} navButton={
                                  item.doc.accepted ? <Text> sorry, you cant delete an accepted offer</Text> :
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

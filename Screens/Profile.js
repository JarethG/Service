import {Text, View, ScrollView, FlatList, Image, Pressable, Modal} from 'react-native';
import {styles} from "../Styles";
import React, {useContext, useEffect, useState} from "react";
import {AntDesign, Entypo, FontAwesome, Ionicons} from '@expo/vector-icons';
import ToggleButtons from "../Components/ToggleButtons";
import {signOut, getAuth} from 'firebase/auth';
import Button from '../Components/Button'
import {UpdateAccount} from "../utils/AccountHandler";
import {achievement_list, requirements} from '../JSONS/Achievements.json'
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {
    addPoints,
    createDummyData,
    deleteCollection,
    deleteDummyData,
    deleteRequest, getMyPosts,
    getMyRequests, getMyReviews, readPosts, readReviews, setPoints, setPublicUserInfo
} from "../utils/Firebase";
import Post from "../Components/Post";
import ProfileContext from "../utils/profileContext";
import {AdminFunctions} from "../utils/AdminFunctions";
import requests from "../JSONS/requestDummyData.json";
import ButtonModal from "../Components/ButtonModal";
import {images} from "../assets/Avatars/ImageLoader";

export default function Profile() {

    const [currentPage, setCurrentPage] = useState("About")
    const profile = useContext(ProfileContext);
    return (
        <View style={{width: "100%", padding: 15, flex: 1}}>
            <View style={[styles.container, styles.midColour, {width: "100%", flex: 1, alignItems: "center"}]}>
                <View style={{flexDirection: "row", alignItems: "center", width: "100%"}}>
                    <ProfileNavigator callback={(r) => setCurrentPage(r)}/>
                    <Text style={styles.header}>{currentPage}</Text>
                </View>
                {currentPage == "About" ?
                    <AboutMe profile={profile}/> : currentPage == "Requests" ?
                        <MyRequests profile={profile}/> : currentPage == "Edit" ?
                            <UpdateAccount oldData={profile}
                                           callback={() => setCurrentPage("About")}/> : currentPage == "Reviews" ?
                                <MyReviews profile={profile}/> : currentPage == "Achievements" ?
                                    <Achievements profile={profile}/> : <MyRequests profile={profile}/>

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
                    <MenuItem title={"About Me"} iconName={"person"} onPress={() => {
                        callback("About")
                        setIsVisible(!isVisible)
                    }}/>
                    <MenuItem title={"My Request"} iconName={"clipboard-sharp"} onPress={() => {
                        callback("Requests")
                        setIsVisible(!isVisible)
                    }}/>
                    <MenuItem title={"Edit profile"} iconName={"pencil"} onPress={() => {
                        callback("Edit")
                        setIsVisible(!isVisible)
                    }}/>
                    <MenuItem title={"Reviews"} iconName={"podium"} onPress={() => {
                        callback("Reviews")
                        setIsVisible(!isVisible)
                    }}/>
                    <MenuItem title={"Achievements"} iconName={"trophy"} onPress={() => {
                        callback("Achievements")
                        setIsVisible(!isVisible)
                    }}/>
                    <MenuItem title={"Log out"} iconName={"log-out"} onPress={() => {
                        signOut(getAuth()).then()
                    }}/>
                    {profile.role!=undefined?
                        <AdminFunctions/>:null}
                </View>
                <Pressable style={styles.sidebarOff}
                           onPress={() => setIsVisible(!isVisible)}/>
            </View>
        </Modal>
        : null}
        <Ionicons name="ios-menu" size={48} color="black" onPress={() => setIsVisible(!isVisible)}
                  style={{alignSelf: "flex-start"}}/>
    </>
}

const MenuItem = ({title, onPress, iconName}) => {
    return (
        <Pressable style={styles.sidebarMenuItem} onPress={() => onPress()}>
            <Ionicons name={iconName} size={24} color="white"/>
            <Text style={[styles.header, {marginLeft: 15}]}>{title}</Text>
        </Pressable>
    )
}


const AboutMe = ({profile}) => {
    const auth = getAuth();
    {console.log(auth.currentUser.uid)}
    return (
        <View style={{width: "100%", padding: 15, flex: 1}}>

            <View style={[styles.container, styles.midColour, {width: "100%", flex: 1, alignItems: "center"}]}>
                {/*<UpdateAccount email={auth.currentUser.email} oldData={profile}/>*/}
                <Image source={images[profile.avatar]} style={{width: 150, height: 150}}/>
                <Text style={[styles.header, {paddingTop: 10}]}>{profile.name}</Text>
                <Text style={styles.text}>{profile.title}</Text>
                <Text style={styles.text}> Total Points: {profile.points}</Text>
                <View style={{flexDirection: "row", padding: 10}}>
                    {Array.from({length: 5}, (x, i) => {
                        return i < profile.rating ?
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

    const [posts, setPosts] = useState()
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        onRefresh()
    },[])

    const onRefresh = () => {
        setIsFetching(true);
        fetchData();
    };

    const fetchData = () => {
        getMyPosts(getAuth().currentUser.uid,(r)=>setPosts(r))
            .then()
        setIsFetching(false)
    };


    return (
        <View style={[{flex: 1, width: "100%"}, styles.lightColour]}>
            {posts ?
                <FlatList data={posts} keyExtractor={(item, index) => index.toString()}
                          renderItem={({item, index}) =>
                              <Post details={item} navButton={
                                  item.accept ? <Text> sorry, you cant delete an accepted offer</Text> :
                                      <Button title={"delete request"} onPress={() => {
                                      }}/>
                              }/>
                }
                          onRefresh={onRefresh}
                          refreshing={isFetching}
                />
                : <Text>It appears you haven't made any requests yet, head over to the Notice Boards tab to get
                    started</Text>}
        </View>
    );
}

const MyReviews = ({profile}) => {

    const [reviewsFrom, setReviewsFrom] = useState([])
    const [reviewsTo, setReviewsTo] = useState([])
    const [isFetching, setIsFetching] = useState(false);
    const [a,b] = useState(false)
    const stars = [1, 2, 3, 4, 5]
    useEffect(() => {
        get()
    }, [])

    function get() {
        readReviews(getAuth().currentUser.uid, setReviewsFrom, setReviewsTo).then(()=> setIsFetching(false))
    }

    const onRefresh = () => {
        setIsFetching(true);
        get();
    };

    return (
        <View style={[{flex: 1, width: "100%"}, styles.lightColour]}>
            {console.log(reviewsFrom)}
            <Button title={a?"From you":"What people are saying about you"} onPress={()=> {
                setIsFetching(true)
                b(!a)
                setIsFetching(false)
            }}/>
                <FlatList data={a?reviewsFrom:reviewsTo} keyExtractor={(item, index) => index.toString()}
                          renderItem={({item, index}) =>
                              <View style={[styles.transparentContainer, {
                                  backgroundColor: "white",
                                  borderRadius: 5,
                                  padding: 5
                              }]}>
                                  <View style={{flexDirection: "row", flex: 1}}>
                                      <Image source={images[0]} style={styles.cardProfilePicture}/>
                                      <View>
                                          <Text>{item[a?"to":"from"]}</Text>
                                          <View style={{flexDirection: "row", flex: 1}}>
                                              {stars.map((index) => {
                                                  return (
                                                      index <= item.rating ?
                                                          <AntDesign name="star" size={20} color="black"/> :
                                                          <AntDesign name="staro" size={20} color="black"/>
                                                  )
                                              })}
                                          </View>
                                      </View>
                                  </View>
                                  <Text>{item.review}</Text>
                              </View>
                          }
                          onRefresh={onRefresh}
                          refreshing={isFetching}
                />
        </View>
    );
}

const Achievements = ({profile}) => {
    return <View style={{flex:1}}>
        <FlatList data={achievement_list} keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
            const requirement = requirements[item]
            function progressBar () {
                let bar = []
                for(let i = 0; i < requirement.required;i++){
                    bar.push(
                    (i<requirement.progress)
                        ?
                        <Entypo name="progress-full" size={24} color="black" />:
                        <Entypo name="progress-empty" size={24} color="black" />
                    )
                }
                return bar
            }
            return (
                <View style={styles.transparentContainer}>
                    <Text>{requirement.title}</Text>
                    <Text>{requirement.description}</Text>
                    <View style={{flexDirection:"row"}}>
                        {progressBar()}
                    </View>
                    {/*<Text>{requirement.tags}</Text>*/}
                </View>
            )
        }}/>
    </View>
}

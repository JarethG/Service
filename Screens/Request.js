import {Text, View, FlatList, Modal, Alert, ScrollView, Pressable, TouchableOpacity, TextInput,} from 'react-native';
import {styles} from "../Styles";
import React, {useEffect, useState} from "react";
import RequestCard from "../Components/RequestCard";
import {FontAwesome5, Ionicons, Entypo} from '@expo/vector-icons';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Requests from '../JSONS/Requests.json'
import {NoticeboardFilters} from "../Components/NoticeboardFilters";
import NewRequestSheet from "../Components/newRequestSheet";
import Button from "../Components/Button";
import {acceptRequest, createChatHeader, getOffers} from "../utils/Firebase";
import RequestFeed from "../Components/RequestFeed";
import Post from "../Components/Post";
import Search from "../Components/Search";
import Picker from "../Components/Picker";
import {Skills, Resources} from '../JSONS/Tags.json'
import ProfileContext from "../utils/profileContext";

export default function Request({navigation, route}) {

    const [feed, setFeed] = useState([])
    const [filter, setFilter] = useState({
        type: "All",
        tags: "",
    })
    const profile = React.useContext(ProfileContext)
    // console.log("Request profile => ",profile)

    const Stack = createNativeStackNavigator();


    function addContact() {
        //will require firebaser
        navigation.jumpTo('Messages');
    }

    useEffect(() => {
        onRefresh()
    }, [])

    // function loadMoreRequests() {
    //     let newFeed = getOffers(20).then()
    //     // setRequestCounter(requestCounter+20)
    //     return newFeed
    // }

    const [isFetching, setIsFetching] = useState(false);

    const fetchData = () => {
        getOffers(20).then((r)=>setFeed(r))
        setIsFetching(false);
    };

    const onRefresh = () => {
        setIsFetching(true);
        fetchData();
    };

    const SearchBar = ({onPress}) => {
        return (
            <Pressable
                style={{flexDirection: "row", flex: 1, borderWidth: 1, padding: 5, margin: 7}}
                onPress={() => onPress()}>
                <FontAwesome5 name="search" size={24} color="black"/>
                <Text style={{left: 10}}>Search requests</Text>
            </Pressable>
        )
    }

    const NoticeBoard = ({navigation}) => {
        return (
            <View style={styles.background}>
                <View style={{alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                    {/*<SearchBar onPress={() => navigation.navigate("Search")}/>*/}
                    {/*<AntDesign name="filter" size={24} color="black"*/}
                    {/*           style={{borderWidth: 1, borderColor: "black", margin: 10}}*/}
                    {/*           onPress={() => setFiltering(true)}/>*/}
                    <Entypo name="new-message" size={24} color="black"
                            onPress={() => {
                                navigation.navigate("NewRequest")
                            }}/>
                </View>
                {feed.length!=0?
                <FlatList data={feed} keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) =>

                          <Post details={item} navButton={item.account != profile.email?
                              <Button title={"contact " + item.name} onPress={()=>{
                                  acceptRequest(item.requestID,profile.email,profile.name).then(()=> console.log("accepted"))
                              }}/>:<Text style={styles.headerr}>this is your request!</Text>
                          }/>
                }
                          ListFooterComponent={
                              <Button title={"load more"} onPress={() => onRefresh()}/>
                          }
                          onRefresh={onRefresh}
                          refreshing={isFetching}
                />
                    : <Text>no list</Text>}
            </View>
        )
    }

    const Search = ({navigation}) => {
        const [input, setInput] = useState()
        const options = ["All", "Skills", "Resources"]

        const [tags, setTags] = useState(Skills.concat(Resources))

        function updateList(option) {
            setFilter({...filter, type: option})
            option === "All" ? setTags(Skills.concat(Resources)) :
                option === "Skills"? setTags(Skills) :
                setTags(Resources)
        }

        return (
            <>
                <Button title={"Back"} onPress={() => {
                    navigation.navigate("NoticeBoard")
                }}/>
                <Text> Type | {filter.type} </Text>
                <Text> Tags | {filter.tags}</Text>
                <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                    {options.map((option, index) => {
                        return (
                            <Pressable key={index} style={[styles.transparentContainer, {
                                width: 100,
                                height: 40
                            }, option === filter.type ? {backgroundColor: "green"} : {backgroundColor: "red"}]}
                                       onPress={() => updateList(option)}>
                                <Text style={{alignSelf: "center"}}>{option}</Text></Pressable>
                        )
                    })}
                </View>
                <TextInput
                    placeholder='Search'
                    value={input}
                    onChangeText={(text) => setInput(text)}
                />
                <Picker data={tags} apply={(r) => setFilter({...filter, tags: r})}/>
                <Button title={"Search"} onPress={() => {
                    navigation.navigate("NoticeBoard")
                }}/>
            </>
        )
    }

    return (


        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name={"NoticeBoard"} component={NoticeBoard}/>
            {/*<Stack.Screen name={"Search"} component={Search}/>*/}
            <Stack.Screen name={"NewRequest"} component={NewRequestSheet} initialParams={profile}/>
        </Stack.Navigator>

    );
}







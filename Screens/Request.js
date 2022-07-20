import {Text, View, FlatList, Pressable, TextInput, StatusBar,} from 'react-native';
import {styles} from "../Styles";
import React, {useEffect, useState} from "react";
import {FontAwesome5, Entypo} from '@expo/vector-icons';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import NewRequestSheet from "../Components/newRequestSheet";
import Button from "../Components/Button";
import {acceptRequest, setChatHeader, getOffers} from "../utils/Firebase";
import Post from "../Components/Post";
import Search from "../Components/Search";
import Picker from "../Components/Picker";
import {Skills, Resources} from '../JSONS/Tags.json'
import ProfileContext from "../utils/profileContext";

export default function Request({navigation}) {

    const [feed, setFeed] = useState([])
    const [filter, setFilter] = useState({
        type: "All",
        tags: "",
    })
    const profile = React.useContext(ProfileContext)

    const Stack = createNativeStackNavigator();


    useEffect(() => {
        onRefresh()
    }, [])

    const [isFetching, setIsFetching] = useState(false);

    const fetchData = () => {
        getOffers(20).then((r) => setFeed(r))
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
                    <Button title={"refresh"} onPress={()=>onRefresh()}/>
                    <Entypo name="new-message" size={24} color="black"
                            onPress={() => {
                                navigation.navigate("NewRequest")
                            }}/>
                </View>
                {feed.length != 0 ?
                    <View style={{width:"100%"}}>
                        <FlatList data={feed} keyExtractor={(item, index) => index.toString()}
                                  // style={{backgroundColor: "black"}}
                                  renderItem={({item}) =>

                                      <Post details={item} navButton={item.account != profile.email ?
                                          <Button title={"contact " + item.name} onPress={() => {
                                              acceptRequest(item.requestID, profile.email, profile.name).then(() => navigation.navigate("Messages"))
                                          }}/> : <Text style={styles.header}>this is your request!</Text>
                                      }/>
                                  }
                                  ListFooterComponent={
                                      <Button title={"load more"} onPress={() => onRefresh()}/>
                                  }
                                  onRefresh={onRefresh}
                                  refreshing={isFetching}
                        />
                    </View>
                    : <Text style={styles.header}>There are currently no requests in the community</Text>}
                <StatusBar style="auto" />
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
                option === "Skills" ? setTags(Skills) :
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







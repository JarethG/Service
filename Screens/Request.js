import {Text, View, FlatList, Pressable} from 'react-native';
import {styles} from "../Styles";
import React, {useEffect, useState} from "react";
import {FontAwesome5, Entypo, AntDesign} from '@expo/vector-icons';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import NewRequestSheet from "../Components/RequestComponents/newRequestSheet";
import Button from "../Components/Button";
import {readPosts, acceptPost} from "../utils/Firebase";
import Post from "../Components/Post";
import ProfileContext from "../utils/profileContext";
import RequestSearchEngine from "../Components/RequestComponents/RequestSearchEngine";
import {getAuth} from "firebase/auth";

export default function Request({navigation}) {

    const [feed, setFeed] = useState([])
    const [filter, setFilter] = useState();
    const profile = React.useContext(ProfileContext)

    const Stack = createNativeStackNavigator();


    useEffect(() => {
        onRefresh()
    }, [filter])

    const [isFetching, setIsFetching] = useState(false);

    const fetchData = () => {
        readPosts((r)=>setFeed(r))
        setIsFetching(false);
    };

    const onRefresh = () => {
        setIsFetching(true);
        fetchData();
    };

    const SearchBar = ({onPress}) => {
        return (
            <Pressable
                style={{flexDirection: "row", flex: 1, borderWidth: 1, padding: 5, margin: 7, backgroundColor: "white"}}
                onPress={() => onPress()}>
                <FontAwesome5 name="search" size={24} color="black"/>
                <Text style={{left: 15, color: "grey", alignSelf: "center"}}>FilterSearch requests</Text>
            </Pressable>
        )
    }

    function createGreeting(chat){
        return {
            from:getAuth().currentUser.uid,
            message:"Hi, my name is " + profile.name.split(" ")[0],
            timestamp:Date.now()
        }
    }

    const NoticeBoard = ({navigation}) => {
        return (
            <View style={styles.background}>
                <View style={{alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                    <SearchBar onPress={() => navigation.navigate("Search")}/>
                </View>
                {filter ?
                    <View style={[styles.transparentContainer,{flexDirection:"row",justifyContent:"space-between"}]}>
                        <Text> current filter : "{filter}"</Text>
                        <AntDesign name="closecircle" size={24} color="black" onPress={()=>setFilter(undefined)}/>
                    </View>
                    : null
                }
                {feed.length == 0 ? <>
                        <Text style={styles.header}>There are currently no requests in the community</Text>
                        <Button title={"reload"} onPress={() => onRefresh()}/>
                    </> :
                    null}
                <View style={{width: "100%",flex:1}}>
                    <FlatList data={feed} keyExtractor={(item, index) => index.toString()}
                              renderItem={({item}) =>
                                  <Post details={item} navButton={item.uid != getAuth().currentUser.uid ?
                                      <Button title={"Message " + item.name.split(" ")[0]} onPress={() => {
                                          let greeting = createGreeting(item)
                                          item["lastMessage"]=greeting
                                          acceptPost(getAuth().currentUser.uid,profile.name,item,greeting)
                                          navigation.navigate("Messages")
                                      }}/> : <Text style={styles.header}>this is your request!</Text>
                                  }/>
                              }
                              onRefresh={onRefresh}
                              refreshing={isFetching}
                    />
                </View>
                <View  style={{position: 'absolute', bottom: 15, right: 0, backgroundColor: "white", borderRadius: 30}}>
                <AntDesign
                    name="pluscircle" size={60} color="orange"
                    onPress={() => navigation.navigate("NewRequest")}/>
                </View>
            </View>
        )
    }



    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name={"NoticeBoard"} component={NoticeBoard}/>
            <Stack.Screen name={"Search"} component={RequestSearchEngine} initialParams={{setFilter: setFilter}}/>
            <Stack.Screen name={"NewRequest"} component={NewRequestSheet} initialParams={profile}/>
        </Stack.Navigator>

    );
}







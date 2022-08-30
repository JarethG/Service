import {StatusBar} from 'expo-status-bar';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView, FlatList,
} from 'react-native';
import {styles} from "../Styles";
import React, {useContext, useEffect, useState} from "react";
import Firebase, {acceptRequest, getChatHeaders, getOffers,} from "../utils/Firebase";
import ProfileContext from "../utils/profileContext";
import MessagingModal from "../Components/MessagingComponents/MessagingModal";
import {ContactItem} from "../Components/MessagingComponents/ContactItem";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import NewRequestSheet from "../Components/RequestComponents/newRequestSheet";
import ReviewSheet from "../Components/MessagingComponents/ReviewSheet";
import {ReviewCard} from "../Components/MessagingComponents/ReviewCard";
import Button from "../Components/Button";
import Post from "../Components/Post";
import {getAuth} from "firebase/auth";

export default function Messages() {

    const profile = useContext(ProfileContext)
    const [isFetching, setIsFetching] = useState(false);

    const [messageIDs,setMessageIDs] = useState()
    const [chats,setChats] = useState({})
    const [unsubscribe,setUnsubscribe] = useState([])


    useEffect(() => {
        console.log("useefect called")
        onRefresh()
    }, [])

    const onRefresh = () => {
        setIsFetching(true);
        fetchData();
    };

    const fetchData = () => {
        let ids = profile.acceptedRequests.concat(profile.myRequests);
        setMessageIDs(ids)
        getChatHeaders(ids, setChats).then(r => setUnsubscribe(r))
        setIsFetching(false);
    };



    const MessageLanding = ({navigation}) => {
        {console.log("page-reloaded")}
        return <View style={styles.background}>
            <View style={[styles.container, styles.midColour, {width: "100%", flex: 1, alignItems: "center"}]}>
            <Text style={styles.header}>Messages</Text>
            {chats?null:
            <Text style={styles.text}>It appears you have no messages</Text>}
            <View style={{width: "100%"}}>
                <FlatList style={{height:"100%"}} data={messageIDs} keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) => chats[item]?
                              <TouchableOpacity onPress={() => {
                                  chats[item].isComplete ?
                                      navigation.navigate("ReviewSheet", {request: item}) :
                                      navigation.navigate("MessagingModal", {requestID: item.id})
                              }}>
                                  {chats[item].isComplete ?
                                      <ReviewCard info={chats[item]}/> :
                                      <ContactItem info={chats[item]}/>}
                              </TouchableOpacity>:
                              <Text>loading...</Text>
                          }
                          onRefresh={onRefresh}
                          refreshing={isFetching}
                />
            </View>
        </View>
        </View>
    }

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name={"MessageLanding"} component={MessageLanding}/>
            <Stack.Screen name={"MessagingModal"} component={MessagingModal}/>
            <Stack.Screen name={"ReviewSheet"} component={ReviewSheet}/>
            {/*<Stack.Screen name={"FilterSearch"} component={FilterSearch}/>*/}
        </Stack.Navigator>

    );
}
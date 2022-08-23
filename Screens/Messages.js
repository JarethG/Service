import {StatusBar} from 'expo-status-bar';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView, FlatList,
} from 'react-native';
import {styles} from "../Styles";
import React, {useContext, useEffect, useState} from "react";
import {acceptRequest, getChatHeaders, getOffers,} from "../utils/Firebase";
import ProfileContext from "../utils/profileContext";
import MessagingModal from "../Components/MessagingComponents/MessagingModal";
import {ContactItem} from "../Components/MessagingComponents/ContactItem";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import NewRequestSheet from "../Components/RequestComponents/newRequestSheet";
import ReviewSheet from "../Components/MessagingComponents/ReviewSheet";
import {ReviewCard} from "../Components/MessagingComponents/ReviewCard";
import Button from "../Components/Button";
import Post from "../Components/Post";

export default function Messages() {

    const profile = useContext(ProfileContext)

    const [chatHeaders, setChatHeaders] = useState([])
    const [err, setErr] = useState("Loading Messages")


    useEffect(() => {
        onRefresh()
    }, [])

    const [isFetching, setIsFetching] = useState(false);

    const fetchData = () => {
        setChatHeaders([])
        let ids = profile.acceptedRequests.concat(profile.myRequests);
        ids.length == 0 ? setErr("It appears you have no open or accepted requests!")
            :
            ids.forEach((id) => {
                getChatHeaders(id, setChatHeaders).then()
            })
        setIsFetching(false);
    };

    const onRefresh = () => {
        setIsFetching(true);
        fetchData();
    };

    const MessageLanding = ({navigation}) => {
        return <View style={styles.background}>
            <View style={{width: "100%"}}>
                <FlatList data={chatHeaders} keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) =>
                              <TouchableOpacity onPress={() => {
                                  item.isComplete ?
                                      navigation.navigate("ReviewSheet", {request: item}) :
                                      navigation.navigate("MessagingModal", {requestID: item.id})
                              }}>
                                  {item.isComplete ?
                                      <ReviewCard info={item}/> :
                                      <ContactItem info={item}/>}
                              </TouchableOpacity>
                          }
                          onRefresh={onRefresh}
                          refreshing={isFetching}
                />
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
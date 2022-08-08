import {StatusBar} from 'expo-status-bar';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {styles} from "../Styles";
import React, {useContext, useEffect, useState} from "react";
import {getChatHeaders,} from "../utils/Firebase";
import ProfileContext from "../utils/profileContext";
import MessagingModal from "../Components/MessagingComponents/MessagingModal";
import {ContactItem} from "../Components/MessagingComponents/ContactItem";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import NewRequestSheet from "../Components/RequestComponents/newRequestSheet";
import ReviewSheet from "../Components/MessagingComponents/ReviewSheet";
import {ReviewCard} from "../Components/MessagingComponents/ReviewCard";
import Button from "../Components/Button";

export default function Messages() {

    const profile = useContext(ProfileContext)

    const [chatHeaders, setChatHeaders] = useState([])
    const [err, setErr] = useState("Loading Messages")

    function reload()  {
        setChatHeaders([])
        let ids = profile.acceptedRequests.concat(profile.myRequests);
        ids.length == 0 ? setErr("It appears you have no open or accepted requests!")
            :
            ids.forEach((id)=>{
                getChatHeaders(id, setChatHeaders).then()
            })
    }

    useEffect(() => {
        reload()
    }, [])

    const MessageLanding=({navigation})=> {
        return <View style={styles.background}>
            <Button title={"refresh"} onPress={()=>reload()}/>
            <ScrollView style={{width: "100%"}}>
                {
                    chatHeaders.length == 0 ?
                        <Text style={styles.header}>{err}</Text>
                        :
                        chatHeaders.map((request, index) => {
                            return <TouchableOpacity key={index} onPress={() => {
                                request.isComplete?
                                navigation.navigate("ReviewSheet", {request:request}):
                                navigation.navigate("MessagingModal", {requestID:request.id})
                            }}>
                                {request.isComplete ?
                                    <ReviewCard info={request}/> :
                                    <ContactItem info={request}/>}
                            </TouchableOpacity>
                        })
                }
            </ScrollView>
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
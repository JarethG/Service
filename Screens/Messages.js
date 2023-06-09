import {
    Text,
    View,
    TouchableOpacity,FlatList,
} from 'react-native';
import {styles} from "../Styles";
import React, {useContext, useEffect, useState} from "react";
import  {readChats} from "../utils/Firebase";
import ProfileContext from "../utils/profileContext";
import MessagingModal from "../Components/MessagingComponents/MessagingModal";
import {ContactItem} from "../Components/MessagingComponents/ContactItem";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ReviewSheet from "../Components/MessagingComponents/ReviewSheet";
import {getAuth} from "firebase/auth";

export default function Messages() {
    const profile = useContext(ProfileContext)
    const [isFetching, setIsFetching] = useState(false);
    const [chats,setChats] = useState({})


    useEffect(() => {
        onRefresh()
    }, [])

    const onRefresh = () => {
        setIsFetching(true);
        fetchData();
    };

    const fetchData = () => {
        readChats(getAuth().currentUser.uid, (r) => setChats(r)).then(setIsFetching(false))
    };



    const MessageLanding = ({navigation}) => {
        return <View style={styles.background}>
            <View style={[styles.container, styles.midColour, {width: "100%", flex: 1, alignItems: "center"}]}>
            <Text style={styles.header}>Messages</Text>
            {chats?null:
            <Text style={styles.text}>It appears you have no messages</Text>}
            <View style={{width: "100%",flex:1}}>
                <FlatList style={{height:"100%"}} data={chats} keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) =>
                              <>

                              <TouchableOpacity onPress={() => {
                              //     // chats[item].isComplete ?
                                      // navigation.navigate("ReviewSheet", {request: chats[item],requestID: item}) :
                                      navigation.navigate("MessagingModal", {requestID: item.id})
                              }}>
                              {/*//     /!*{chats[item].isComplete ?*!/*/}
                              {/*//     /!*    <ReviewCard info={chats[item]}/> :*!/*/}
                                     <ContactItem chat={item}/>
                               </TouchableOpacity></>
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
        </Stack.Navigator>

    );
}
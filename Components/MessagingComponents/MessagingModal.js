import {FlatList, Keyboard, Text, TextInput, View} from "react-native";
import {styles} from "../../Styles";
import {
    acceptJobCompletion, getChat,
    proposeJobCompleted,
    readMessages, writeMessage
} from "../../utils/Firebase";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import Button from "../Button";
import {getAuth} from "firebase/auth";
import ReviewSheet from "./ReviewSheet";

const MessagingModal = ({navigation, route}) => {
    const chatId = route.params.requestID;
    const [chat, setChat] = useState({});

    const renderItem = (item) => {
        console.log(item)
        return <Text style={item.from == getAuth().currentUser.uid ?
            [styles.messageBubble, {alignSelf: "flex-end", backgroundColor: 'rgba(0,255,0,0.5)'}]
            :
            [styles.messageBubble, {
                alignSelf: "flex-start",
                backgroundColor: 'rgba(0,255,255,0.5)'
            }]}>{item.message}</Text>
    }

    function completion() {
        return (
            chat.settled ?
                chat.settledID === getAuth().currentUser.uid ?
                    <Text>You have proposed that the job is done</Text>
                    :
                    <>
                         <Text>The other user thinks this job is complete, do you agree?</Text>
                        <Button title={"Request completed"} onPress={() => {
                            acceptJobCompletion(chatId).then()
                        }}/>
                     </>
                :
                <Button title={"Propose completion"} onPress={() => {
                    proposeJobCompleted(chatId, getAuth().currentUser.uid).then()
                }}/>
        )
    }

    const [messages, setMessages] = useState()

    useEffect(() => {
        get()
    }, [])

    function get() {
        readMessages(chatId, (r) => setMessages(r.reverse()))
        getChat(chatId, (r) => setChat(r)).then()
    }

    const [text, setText] = useState()

    function sendMessage() {
        writeMessage(chatId, {
            from: getAuth().currentUser.uid,
            message: text,
            timestamp: Date.now()
        })
    }

    return <View style={styles.background}>
            <View style={[styles.container, styles.midColour, {width: "100%", flex: 1}]}>
                <Ionicons name="arrow-back-outline" size={24} color="black"
                          onPress={() => navigation.goBack()}
                          style={[styles.button, {alignSelf: "flex-start"}]}
                />
                {chat.isComplete ?
                        <ReviewSheet navigation={navigation} chat={chat}/>
                    :
                    <>
                        {completion()}
                        <View style={{margin: 10, flex: 1}}>
                            <FlatList data={messages} keyExtractor={(item, index) => index.toString()}
                                      renderItem={({item}) => renderItem(item)}
                                      inverted={true}/>
                            <View style={[styles.transparentContainer, {
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }]}>
                                <TextInput
                                    placeholder="Type you message..."
                                    value={text}
                                    onChangeText={setText}/>
                                <FontAwesome name="send-o" size={24} color="black" onPress={() => {
                                    sendMessage()
                                    Keyboard.dismiss()
                                    setText("")
                                }}/>
                            </View>
                        </View>
                    </>
                }
            </View>
        </View>

}

export default MessagingModal
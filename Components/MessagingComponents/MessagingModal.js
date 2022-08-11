import {FlatList, Keyboard, Modal, Text, TextInput, View} from "react-native";
import {styles} from "../../Styles";
import {acceptJobCompletion, getChatState, getMessage, proposeJobCompleted, pushMessage} from "../../utils/Firebase";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import profileContext from "../../utils/profileContext";
import React, {useContext, useEffect, useState} from "react";
import {StatusBar} from "expo-status-bar";
import Button from "../Button";

const MessagingModal = ({navigation,route}) => {
    const chatId = route.params.requestID;
    const profile=useContext(profileContext)
    const renderItem = (item) => {
        return <Text style={item.userID == profile.email ?
            [styles.messageBubble, {alignSelf: "flex-end",backgroundColor: 'rgba(0,255,0,0.5)'}]
            :
            [styles.messageBubble, {alignSelf: "flex-start",backgroundColor: 'rgba(0,255,255,0.5)'}]}>{item.message}</Text>
    }

    function completion () {
        return (chatState.isComplete === "" ?
                <Button title={"Request completed"} onPress={() => {
                    proposeJobCompleted(chatId, profile.name).then()
                }}/>
                :
                chatState.isComplete === profile.name ?
                    <>
                        <Text>you have suggested that this job is finished, waiting for confirmation</Text>
                        <Button title={"revoke completion"} onPress={() => {
                            proposeJobCompleted(chatId, "").then()
                        }}/>
                    </>
                    : <>
                        <Text>{chatState.isComplete} has suggested that this job is finished, do you
                            agree?</Text>
                        <Button title={"accept completion"} onPress={() => {
                            acceptJobCompletion(chatId).then(navigation.goBack())
                        }}/>
                    </>
        )
    }

    const [messages, setMessages] = useState()
    const [chatState, setChatState] = useState()

    useEffect(() => {
        get()
    }, [])

    function get() {
        getMessage(chatId, profile.email, (r) => setMessages(r.reverse()))
        getChatState(chatId,setChatState)
    }

    const [text, setText] = useState()

    function sendMessage() {
        pushMessage(chatId, text, profile.email).then(() => console.log("sent!"))
    }

    return <Modal
        animationType="slide"
        transparent={true}
        visible={true}
    >
        <View style={styles.background}>
            <View style={[styles.container,styles.midColour,{width:"100%",flex:1}]}>
                {/*<View style={{paddingTop:50}}></View>*/}
                <Ionicons name="arrow-back-outline" size={24} color="black"
                          onPress={() => navigation.goBack()}
                          style={[styles.button,{alignSelf:"flex-start"}]}
                />

                {chatState? completion():<Text>Loading</Text>}
                <View style={{margin:10, flex: 1}}>
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
            </View>
        </View>
    </Modal>

}

export default MessagingModal
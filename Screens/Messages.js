import {StatusBar} from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Button,
    TouchableOpacity,
    ScrollView,
    Modal,
    Alert, Pressable, FlatList, Keyboard, TextComponent
} from 'react-native';
import {styles} from "../Styles";
import {FontAwesome} from '@expo/vector-icons';
import {useContext, useEffect, useState} from "react";
import dummy from '../JSONS/Contacts.json'
import {Ionicons} from "@expo/vector-icons";
import messages from '../JSONS/Messages.json'
import {createChatHeader, getMessage, getMyRequests, pushMessage, sendMessage} from "../utils/Firebase";

export default function Messages({route}) {

    const profile = route.params
    const [searchText, setSearchText] = useState();

    const [modalData, setModalData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [openMessages, setOpenMessages] = useState()
    const [openChat, setOpenChat] = useState()

    const ContactCard = ({info}) => {
        return (
            <View style={[styles.skillsTheme, {margin: 10, borderRadius: 10, padding: 7,}]}>
                <View style={{flexDirection: "row"}}>
                    <View style={{width: 70, height: 70, borderRadius: 35, backgroundColor: "#ffffff"}}></View>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Text>{info.name}</Text>
                            <Text>{info.title}</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Ionicons name="checkmark-done-circle-outline" size={24}
                                      color={info.checked ? "green" : "grey"}/>
                            <Text>{info.description}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    const MessagingModal = () => {

        const renderItem = (item) => {
            return <Text style={item.userID == profile.email ?
                [styles.messageBubble, {alignSelf: "flex-start"}]
                :
                [styles.messageBubble, {alignSelf: "flex-end"}]}>{item.message}</Text>
        }

        const [messages, setMessages] = useState()

        useEffect(() => {
            get()
        }, [])

        function get() {
            return getMessage(openChat, profile.email, (r) => setMessages(r.reverse()))
        }

        const [text, setText] = useState()
//6q8Pp3fBf8ZmNJJ4mwVs
        function sendMessage() {
            pushMessage(openChat, text, profile.email).then(() => console.log("sent!"))
        }

        return <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.background}>
                <View style={[styl.modalView, {flex: 1}]}>
                    <Ionicons name="return-up-back" size={24} color="black" onPress={() => setModalVisible(false)}/>
                    <View style={{width: "100%", flex: 1}}>
                        <FlatList data={messages} keyExtractor={(item, index) => index.toString()}
                                  renderItem={({item}) => renderItem(item)}
                                  inverted={true}/>
                        <View style={[styles.transparentContainer, {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            backgroundColor: "grey"
                        }]}>
                            <TextInput
                                placeholder="Type you message..."
                                value={text}
                                onChangeText={setText}/>
                            <FontAwesome name="send-o" size={24} color="black" onPress={() => {
                                sendMessage()
                                Keyboard.dismiss()
                            }}/>
                        </View>
                    </View>

                </View>
            </View>
        </Modal>
    }


    const [R, setR] = useState()
    const [chatIDs,setChatIDs] = useState([])

    return (
        <View style={styles.background}>
            {/*<Button title={"get my requests"} onPress={() => getMyRequests(profile.email).then((r) => setR(r))}/>*/}
            <Button title={"get chat id's"} onPress={() => setChatIDs(profile.acceptedRequests.concat(profile.myRequests))}/>

            <View style={{flexDirection: "row", padding: 12}}>
                <TextInput
                    style={{
                        height: 30,
                        width: "100%",
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 5
                    }}
                    onChangeText={setSearchText}
                    value={searchText}
                    placeholder="Search"
                />
            </View>
            <ScrollView style={{width: "100%"}}>
                {chatIDs == null ? <Text>empty</Text> :
                    chatIDs.map((request, index) => {
                        return <TouchableOpacity key={index} onPress={() => {
                            setOpenChat(request)
                            setModalVisible(true)
                        }}>
                            {/*<ContactCard info={request.doc}/>*/}
                            <View style={styles.tags}>
                                <Text>{request}</Text>
                            </View>
                        </TouchableOpacity>

                    })
                }
            </ScrollView>
            <StatusBar style="auto"/>
            {openChat ? <MessagingModal/> : null}
        </View>
    );
}

const styl = StyleSheet.create({
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        // padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // flex:1
    }
});
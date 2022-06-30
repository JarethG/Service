import {StatusBar} from 'expo-status-bar';
import {
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    ScrollView,
    Modal,
    Alert, FlatList, Keyboard,
} from 'react-native';
import {styles} from "../Styles";
import {FontAwesome} from '@expo/vector-icons';
import {useContext, useEffect, useState} from "react";
import {
    acceptJobCompletion,
    getChatHeaders,
    getMessage,
    proposeJobCompleted,
    pushMessage,
} from "../utils/Firebase";
import ProfileContext from "../utils/profileContext";

export default function Messages() {

    const profile = useContext(ProfileContext)
    const [searchText, setSearchText] = useState();

    const [modalVisible, setModalVisible] = useState(false);

    const [openChat, setOpenChat] = useState()
    const [chatIDs, setChatIDs] = useState([])

    const ContactCard = ({info}) => {
        return (
            <View style={[styles.skillsTheme, {margin: 10, borderRadius: 10, padding: 7,}]}>
                <View style={{flexDirection: "row"}}>
                    <View style={{width: 70, height: 70, borderRadius: 35, backgroundColor: "#ffffff"}}></View>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={styles.title}>{info.acceptingUser}</Text>
                            <Text>{info.jobTitle}</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text>{info.client}</Text>
                        </View>
                        <Text>{info.lastMessage}</Text>
                    </View>
                </View>
            </View>
        );
    }

    const MessagingModal = () => {

        const renderItem = (item) => {
            return <Text style={item.userID == profile.email ?
                [styles.messageBubble, {alignSelf: "flex-end"}]
                :
                [styles.messageBubble, {alignSelf: "flex-start"}]}>{item.message}</Text>
        }

        const [messages, setMessages] = useState()

        useEffect(() => {
            get()
        }, [])

        function get() {
            return getMessage(chatIDs[openChat].id, profile.email, (r) => setMessages(r.reverse()))
        }

        const [text, setText] = useState()

        function sendMessage() {
            pushMessage(chatIDs[openChat].id, text, profile.email).then(() => console.log("sent!"))
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
                <View style={[styles.modalView, {flex: 1}]}>
                    {/*<Ionicons name="return-up-back" size={24} color="black" onPress={() => setModalVisible(false)}/>*/}
                    <Button title={"back"} onPress={() => setModalVisible(false)}/>
                    {chatIDs[openChat].isComplete === "" ?
                        <Button title={"Request completed"} onPress={() => {
                            proposeJobCompleted(chatIDs[openChat].id, profile.name).then()
                        }}/>
                        :
                        chatIDs[openChat].isComplete === profile.name ?
                            <>
                                <Text>you have suggested that this job is finished, waiting for confirmation</Text>
                                <Button title={"revoke completion"} onPress={() => {
                                    proposeJobCompleted(chatIDs[openChat].id, "").then()
                                }}/>
                            </>
                            : <>
                                <Text>{chatIDs[openChat].isComplete} has suggested that this job is finished, do you
                                    agree?</Text>
                                <Button title={"accept completion"} onPress={() => {
                                    setOpenChat(null)
                                    acceptJobCompletion(chatIDs[openChat]).then(console.log("job done"))
                                }}/>
                            </>
                    }
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
                                setText("")
                            }}/>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    }


    const [err, setErr] = useState("open your messages above")

    return (
        <View style={styles.background}>
            <Button title={"open chats"} onPress={() => {
                setChatIDs([])
                let ids = profile.acceptedRequests.concat(profile.myRequests);
                ids.length == 0 ? setErr("It appears you have no open or accepted requests!")
                    :
                    ids.forEach((id) => getChatHeaders(id, setChatIDs))
            }
            }/>
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
                {
                    chatIDs.length == 0 ?
                        <Text style={styles.header}>{err}</Text>
                        :
                        chatIDs.map((request, index) => {
                            return <TouchableOpacity key={index} onPress={() => {
                                setOpenChat(index)
                                setModalVisible(true)
                            }}>
                                <ContactCard info={request}/>
                            </TouchableOpacity>
                        })
                }
            </ScrollView>
            <StatusBar style="auto"/>
            {openChat != null ? <MessagingModal/> : null}
        </View>
    );
}
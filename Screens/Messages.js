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
    Alert, Pressable, FlatList
} from 'react-native';
import {styles} from "../Styles";
import { FontAwesome } from '@expo/vector-icons';
import {useContext, useState} from "react";
import dummy from '../JSONS/Contacts.json'
import {Ionicons} from "@expo/vector-icons";
import UserContext from "../Components/AuthContextFrame";
import messages from '../JSONS/Messages.json'

export default function Messages() {

    const [searchText, setSearchText] = useState();
    const {user, setUser} = useContext(UserContext)

    const [modalData, setModalData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [openMessages,setOpenMessages] = useState()

    const ContactCard = ({info}) => {
        return (
            <View style={[styles.skillsTheme,{ margin: 10, borderRadius: 10, padding: 7,}]}>
                <View style={{flexDirection: "row"}}>
                    <View style={{width: 70, height: 70, borderRadius: 35, backgroundColor: "#ffffff"}}></View>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Text>{info.name}</Text>
                            <Text>{info.time}</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Ionicons name="checkmark-done-circle-outline" size={24}
                                      color={info.checked ? "green" : "grey"}/>
                            <Text>{info.message}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    const MessagingModal = () => {

        const renderItem = (item) => {
            return <Text style={item.sender?
                [styles.container,styles.resourceTheme,{alignSelf:"flex-start"}]
                :
                [styles.container,styles.skillsTheme,{alignSelf:"flex-end"}]}>{item.message}</Text>

        }

        const [text,setText] = useState()

        function sendMessage() {
            setOpenMessages([...openMessages,
                {
                "sender": true,
                "time": 1,
                "message": text
            },])
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
                    <Ionicons name="return-up-back" size={24} color="black" onPress={()=>setModalVisible(false)}/>
                    <View style={{borderColor:"#cbcbcb",borderWidth:2,width:"100%",flex:1}}>
                        <FlatList data={openMessages} keyExtractor={(item, index) => index.toString()}
                                  renderItem={({item}) => renderItem(item)}/>
                        <View style={[styles.transparentContainer,{flexDirection:"row",justifyContent:"space-between",backgroundColor: "grey"  }]}>
                            <TextInput
                                placeholder="Type you message..."
                                value={text}
                                onChangeText={setText}/>
                            <FontAwesome name="send-o" size={24} color="black" onPress={()=>sendMessage()}/>
                        </View>
                    </View>

                </View>
            </View>
        </Modal>
    }

    return (
        <View style={styles.background}>
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
                {dummy.map((info, index) => {
                    return <TouchableOpacity key={index} onPress={() => {
                        setModalData(info)
                        setOpenMessages(messages["Luke Ross"][info.name])
                        setModalVisible(true)
                    }}>
                        <ContactCard info={info}/>
                    </TouchableOpacity>
                })
                }
            </ScrollView>
            <StatusBar style="auto"/>
            {modalData ? <MessagingModal/> : null}
        </View>
    );
}

const styl = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
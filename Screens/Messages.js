import {StatusBar} from 'expo-status-bar';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {styles} from "../Styles";
import {useContext, useEffect, useState} from "react";
import {getChatHeaders,} from "../utils/Firebase";
import ProfileContext from "../utils/profileContext";
import MessagingModal from "../Components/MessagingModal";

export default function Messages() {

    const profile = useContext(ProfileContext)

    const [openChat, setOpenChat] = useState()
    const [chatIDs, setChatIDs] = useState([])

    const ContactCard = ({info}) => {
        const date = new Date(info.lastTimeStamp);
        return (
            <View style={[styles.skillsTheme, {margin: 10, borderRadius: 10, padding: 7,}]}>
                <View style={{flexDirection: "row"}}>
                    <View style={{width: 70, height: 70, borderRadius: 35, backgroundColor: "#ffffff"}}></View>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={styles.title}>
                                {console.log(info)}
                                {info.client === ""?
                                    "pending acceptance":
                                        info.client === profile.name?
                                            info.client:
                                            info.name
                                }
                                {info.acceptingUserEmail == profile.email ? info.client : info.acceptingUser}
                            </Text>
                            <Text>{date.toLocaleTimeString()}</Text>
                        </View>
                        <Text>{info.jobTitle}</Text>
                        <Text>{info.lastMessage}</Text>
                    </View>
                </View>
            </View>
        );
    }

    const [err, setErr] = useState("Loading Messages")

    useEffect(() => {
        setChatIDs([])
        let ids = profile.acceptedRequests.concat(profile.myRequests);
        ids.length == 0 ? setErr("It appears you have no open or accepted requests!")
            :
           ids.forEach((id)=>{
               getChatHeaders(id,setChatIDs)
           })
    }, [profile])

    {
        // console.log(chatIDs)
    }
    return (
        <View style={styles.background}>
            <ScrollView style={{width: "100%"}}>
                {
                    chatIDs.length == 0 ?
                        <Text style={styles.header}>{err}</Text>
                        :
                        chatIDs.map((request, index) => {
                            return <TouchableOpacity key={index} onPress={() => {
                                setOpenChat(request.id)
                            }}>
                                <ContactCard info={request}/>
                            </TouchableOpacity>
                        })
                }
            </ScrollView>
            {openChat != null ? <MessagingModal chatId={openChat} onClose={() => setOpenChat(null)}/> : null}
        </View>
    );
}
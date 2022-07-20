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
import {ContactItem} from "../Components/MessagingComponents/ContactItem";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import NewRequestSheet from "../Components/newRequestSheet";
import ReviewSheet from "../Components/ReviewSheet";
import {ReviewCard} from "../Components/ReviewCard";

export default function Messages() {

    const profile = useContext(ProfileContext)

    const [chatIDs, setChatIDs] = useState([])
    const [err, setErr] = useState("Loading Messages")

    useEffect(() => {
        setChatIDs([])
        let ids = profile.acceptedRequests.concat(profile.myRequests);
        ids.length == 0 ? setErr("It appears you have no open or accepted requests!")
            :
           ids.forEach((id)=>{
               getChatHeaders(id, setChatIDs).then()
           })
    }, [profile])

    const MessageLanding=({navigation})=> {
        return <View style={styles.background}>
            <ScrollView style={{width: "100%"}}>
                {
                    chatIDs.length == 0 ?
                        <Text style={styles.header}>{err}</Text>
                        :
                        chatIDs.map((request, index) => {
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
            {/*<Stack.Screen name={"Search"} component={Search}/>*/}
        </Stack.Navigator>

    );
}
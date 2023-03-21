import {Modal, Pressable, Text, View} from "react-native";
import {styles} from "../Styles";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import ProfileContext from "../utils/profileContext";

const Settings = ({data}) => {

    const profile = React.useContext(ProfileContext)
    console.log(data)

    return (
        <SettingsModule>
            <View style={{flex: 1}}>
                <Pressable style={styles.menuItem} onPress={()=>deleteRequest(data.requestID,profile.email).then(console.log("deleted"))} >
                    <AntDesign name="delete" size={24} color="black"/>
                    <Text style={{left: 20}}>delete request</Text>
                </Pressable>
                <View style={styles.menuItem}>
                    <AntDesign name="hearto" size={24} color="black"/>
                    <Text style={{left: 20}}>Save to favorites</Text>
                </View>
                <View style={styles.menuItem}>
                    <AntDesign name="sharealt" size={24} color="black"/>
                    <Text style={{left: 20}}>share</Text>
                </View>
                <View style={styles.menuItem}>
                    <AntDesign name="flag" size={24} color="black"/>
                    <Text style={{left: 20}}>Report posts</Text>
                </View>
                <View style={styles.menuItem}>
                    <Ionicons name="shield" size={24} color="black"/>
                    <Text style={{left: 20}}>Stay safe</Text>
                </View>
            </View>
        </SettingsModule>
    );
}

const SettingsModule = ({children}) => {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <Pressable style={[styles.background, {backgroundColor: 'rgba(114,114,114,0.5)',}]}
                           onPress={() => setModalVisible(!modalVisible)}/>
                <View style={styles.settingsModule} onPress={e => e.stopPropagation()}>
                    {children}
                </View>
            </Modal>
            <AntDesign name="ellipsis1" size={32} color="white" style={{alignSelf: "flex-end"}}
                       onPress={() => setModalVisible(true)}/>
        </>
    )
}

export default Settings
import {Modal, Pressable,View} from "react-native";
import {styles} from "../Styles";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import Button from "../Components/Button";
import {createDummyData, deleteDummyData} from "./Firebase";
import requests from "../JSONS/requestDummyData.json"

export const AdminFunctions = () => {

    const ButtonModal = ({children}) => {
        const [isVisible, setIsVisible] = useState(false)
        return isVisible?
                <Modal
                    animationType="slide"
                    transparent={true}
                >
                    <Pressable style={[styles.background, {backgroundColor: 'rgba(114,114,114,0.5)',}]}
                               onPress={() => setIsVisible(!isVisible)}/>
                    <View style={styles.settingsModule} onPress={e => e.stopPropagation()}>
                        {children}
                    </View>
                </Modal>
            :
            <Button title={"Admin"} onPress={() => setIsVisible(true)}/>


    }

    return (
        <ButtonModal>
            <View style={{backgroundColor:'#950dda'}}>
            <Button title={"Create Dummy Data"} onPress={()=>createDummyData(requests).then(()=>console.log("done"))}/>
            <Button title={"Delete Dummy Data"} onPress={()=>deleteDummyData(requests).then(()=>console.log("done"))}/>
            </View>
        </ButtonModal>
    )

    ;
}

import {Modal, Pressable,View} from "react-native";
import {styles} from "../Styles";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import Button from "../Components/Button";
import {createDummyData, deleteCollection, deleteDummyData} from "./Firebase";
import requests from "../JSONS/requestDummyData.json"
import ButtonModal from "../Components/ButtonModal";

export const AdminFunctions = () => {



    return (
        <ButtonModal title={"settings"}>
            <View style={{backgroundColor:'#950dda'}}>
            <Button title={"Create Dummy Data"} onPress={()=>createDummyData(requests).then(()=>console.log("done"))}/>
            <Button title={"Delete Dummy Data"} onPress={()=>deleteDummyData(requests).then(()=>console.log("done"))}/>
            <Button title={"Clear Reviews"} onPress={()=>deleteCollection("Reviews",10).then(()=>console.log("reviews cleared"))}/>
            <Button title={"Clear Requests"} onPress={()=>deleteCollection("Requests",10).then(()=>console.log("reviews cleared"))}/>
            </View>
        </ButtonModal>
    )

    ;
}

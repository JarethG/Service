import {Modal, Pressable, ScrollView, View} from "react-native";
import {styles} from "../Styles";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import Button from "../Components/Button";
import {
    addNewInfoRTDB,
    createDummyData,
    deleteCollection,
    deleteDummyData,
    setPublicUserInfo, updateAllUsersRankings,
    writeNewPost
} from "./Firebase";
import leaderboard from '../JSONS/dummyLeaders.json'
import requests from "../JSONS/requestDummyData.json"
import ButtonModal from "../Components/ButtonModal";
import {getAuth} from "firebase/auth";

export const AdminFunctions = () => {



    return (
        <ButtonModal title={"settings"}>
            <ScrollView style={{backgroundColor:'#950dda'}}>
            <Button title={"Create Dummy Data"} onPress={()=>createDummyData(requests).then(()=>console.log("done"))}/>
            {/*<Button title={"Delete Dummy Data"} onPress={()=>deleteDummyData(requests).then(()=>console.log("done"))}/>*/}
            {/*<Button title={"Clear Reviews"} onPress={()=>deleteCollection("Reviews",10).then(()=>console.log("reviews cleared"))}/>*/}
            {/*<Button title={"Clear Requests"} onPress={()=>deleteCollection("Requests",10).then(()=>console.log("reviews cleared"))}/>*/}
            {/*<Button title={"create dummy leadrboard"} onPress={()=>leaderboard.forEach((data,index)=>setPublicUserInfo(data,"fakeAuth" +index))}/>*/}
            {/*<Button title={"add new info"} onPress={()=>addNewInfoRTDB("public","monthlyPoints",0)}/>*/}
            {/*<Button title={"updateAllUserPoints"} onPress={()=>updateAllUsersRankings("admin")}/>*/}
            {/*<Button title={"reset user data"} onPress={()=>setPublicUserInfo({name: "resetUserName", avatar: 1, monthlyPoints: 0,points: 0,rating:{"0":0}},getAuth().currentUser.uid)*/}
            {/*    .then()}/>*/}
            <Button title={"add new Post"} onPress={()=>writeNewPost(getAuth().currentUser.uid,{
                title:"title",
                rating:"rating",
                tags:["tag_1","tag_2","tag_3"],
                avatar:0,
                name:"name",
                description:"description",
                email:"email",
                isComplete:false,
                uid:"XORhLhfSEtf34cFnBhYlOR9QB3q2"
            })}/>
            </ScrollView>
        </ButtonModal>
    )

    ;
}

import {Pressable, Text, TextInput, View} from "react-native";
import {styles} from "../../Styles";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import React, {useContext, useEffect, useState} from "react";
import Button from "../Button";
import {closeChatRoom, getChatState, getMessage, returnResource, writeReview} from "../../utils/Firebase";
import ProfileContext from "../../utils/profileContext";
import {getAuth} from "firebase/auth";

const ReviewSheet = ({navigation,chat}) => {
    const profile = useContext(ProfileContext)
    const stars = [1, 2, 3, 4, 5]
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")
    const [submitting, setSubmitting] = useState(false)

    function onSubmit() {
        setSubmitting(true)
        let myAuth = getAuth().currentUser.uid
        let uid2 = chat.uid==myAuth?chat.uid2:chat.uid
        writeReview(myAuth,uid2,chat.id,{
            "rating": rating,
            "review": review,
            "job":chat.title,
            "from":profile.name
        })
        if(chat.uid==myAuth){
            returnResource(chat,profile.rating)
        }
        if(chat.reviews==1)closeChatRoom(chat)
        setSubmitting(false)
        navigation.goBack()
    }

    return (
        <>
            <Text style={styles.header}>
                Leave a star Rating!
            </Text>
            <View style={{flexDirection: "row"}}>
                {stars.map((index) => {
                    return (
                        <Pressable onPress={() => setRating(index)}>
                            {index <= rating ?
                                <AntDesign name="star" size={40} color="black"/> :
                                <AntDesign name="staro" size={40} color="black"/>
                            }
                        </Pressable>
                    )
                })}
            </View>
            <Text>You are encouraged to leave a comment to support your fellow community member.</Text>
            <TextInput
                style={styles.transparentContainer}
                placeholder={"leave a comment..."}
                value={review}
                onChangeText={(text) => setReview(text)}
                multiline={true}
            />
            <Button title={"submit"} onPress={() => {if(!submitting)onSubmit()}
            }/>
        </>
    );
}

export default ReviewSheet
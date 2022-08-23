import {Pressable, Text, TextInput, View} from "react-native";
import {styles} from "../../Styles";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import React, {useContext, useEffect, useState} from "react";
import Button from "../Button";
import {getChatState, getMessage, postReview} from "../../utils/Firebase";
import ProfileContext from "../../utils/profileContext";

const ReviewSheet = ({navigation, route}) => {
    const request = route.params.request;
    const profile = useContext(ProfileContext)
    const stars = [1, 2, 3, 4, 5]
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")
    const [chatState, setChatState] = useState()
    const [submitting, setSubmitting] = useState(false)


    useEffect(() => {
        get()
    }, [])

    function get() {
        getChatState(request.id, setChatState).then()
    }

    function onSubmit() {
        setSubmitting(true)
        postReview({
            "rating": rating,
            "review": review,
            "fromAccount": profile.email,
            "toAccount": (profile.email === chatState.clientEmail)? chatState.acceptingUserEmail:chatState.clientEmail,
            "from":profile.name,
            "to": (profile.name === chatState.client)? chatState.acceptingUser:chatState.client
        }, request, profile.email, profile.name).then(() => {
            console.log("complete")
            navigation.goBack()
        })
    }

    return (
        <View style={styles.background}>
            <Ionicons name="arrow-back-outline" size={24} color="black"
                      onPress={() => navigation.goBack()}
                      style={[styles.button, {alignSelf: "flex-start"}]}
            />
            <Text>{JSON.stringify(chatState)}</Text>
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
            <Button title={"submit"} onPress={() => onSubmit()}/>
        </View>
    );
}

export default ReviewSheet
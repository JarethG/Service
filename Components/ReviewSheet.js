import {Pressable, Text, TextInput, View} from "react-native";
import {styles} from "../Styles";
import {AntDesign} from "@expo/vector-icons";
import {useContext, useState} from "react";
import Button from "./Button";
import {postReview} from "../utils/Firebase";
import ProfileContext from "../utils/profileContext";

const ReviewSheet = ({navigation,route}) => {
    const request = route.params.request;
    const profile = useContext(ProfileContext)
    const stars = [1, 2, 3, 4, 5]
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState()

    return (
        <View style={styles.background}>
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
            <Button title={"submit"} onPress={()=> {
                postReview(profile.name, {"rating":rating, "review":review}).then(()=> {

                    navigation.goBack()})
            }}/>
        </View>
    );
}

export default ReviewSheet
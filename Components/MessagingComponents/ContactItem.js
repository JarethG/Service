import {Image, Text, View} from "react-native";
import {styles} from "../../Styles";
import ProfileContext from "../../utils/profileContext";
import React, {useContext} from "react";
import {images} from "../../assets/Avatars/ImageLoader";
import {AntDesign} from "@expo/vector-icons";


export const ContactItem = ({chat}) => {
    console.log(chat)
    const profile = useContext(ProfileContext)
    const lastMessage = chat.lastMessage
    const date = new Date(lastMessage.timestamp);
    return (
        <View style={[styles.darkColour, styles.container, {flexDirection: "row"}]}>
            <Image source={images[chat.avatar]} style={styles.cardProfilePicture}/>
            <View style={{flex: 1, paddingHorizontal: 10}}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={[styles.text, {fontWeight: "bold"}]}>
                        {chat.name}
                    </Text>
                        <Text style={[styles.text, {fontWeight: "bold"}]}>
                            <AntDesign name="star" size={18} color="white" style={{left: 15}}/>
                            {chat.rating}
                        </Text>
                    <Text style={styles.text}>{date.getHours() + ":" + date.getMinutes()}</Text>
                </View>
                <Text style={styles.text}>{chat.title}</Text>
                <Text style={styles.text}>{lastMessage.message}</Text>
            </View>
        </View>
    );
}
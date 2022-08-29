import {Image, Text, View} from "react-native";
import {styles} from "../../Styles";
import ProfileContext from "../../utils/profileContext";
import React, {useContext} from "react";
import {images} from "../../assets/Avatars/ImageLoader";


export const ContactItem = ({info}) => {
    console.log(info)
    const profile = useContext(ProfileContext)
    const date = new Date(info.lastTimeStamp);
    return (
        <View style={[styles.darkColour,styles.container,{flexDirection: "row"}]}>
            <Image source={images[info.avatar?1:0]} style={styles.cardProfilePicture}/>
            <View style={{flex: 1,paddingHorizontal:10}}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={[styles.text,{fontWeight: "bold"}]}>
                        {info.acceptingUser === ""?
                            "pending acceptance":
                            info.acceptingUser === profile.name?
                                info.client:
                                info.acceptingUser
                        }
                    </Text>
                    <Text style={styles.text}>{date.getHours() + ":" + date.getMinutes()}</Text>
                </View>
                <Text style={styles.text}>{info.jobTitle}</Text>
                <Text style={styles.text}>{info.lastMessage}</Text>
            </View>
        </View>
    );
}
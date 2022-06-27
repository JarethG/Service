import {styles} from "../Styles";
import {View, Text, Pressable} from "react-native";
import React, {useState} from "react";
import {AntDesign} from "@expo/vector-icons";
import Settings from "./Settings";
import Button from "./Button";

const Post = ({details,navButton}) => {
    // console.log("details" ,details)
    const theme = details.type === "skill"
    const [expand, setExpand] = useState(false)
    return (
        <Pressable onPress={() => setExpand(!expand)}>
            <View style={[styles.container, theme ? styles.skillsTheme : styles.resourceTheme]}>
                {/*{expand?<Settings data={details}/>:null}*/}
                <View style={{flexDirection: "row"}}>
                    <View style={styles.cardProfilePicture}/>
                    <View>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text style={styles.header}>{details.name}</Text>
                            <AntDesign name="star" size={18} color="white"/>
                            <Text style={{color: "white", fontSize: 12}}>4.68</Text>

                        </View>
                        <View style={{flexDirection: "row"}}>
                            {details.tags.map((tag, key) =>
                                <Text key={key}style={styles.tags}>{tag}</Text>)}
                        </View>
                    </View>
                </View>
                <Text style={[styles.text, {fontWeight: "bold"}]}>{details.title}</Text>
                {expand?<>
                    <Text style={styles.text}>{details.description}</Text>
                    <View style={[styles.container, {height: 200, backgroundColor: "white"}]}/>
                    {navButton}

                </>:<Text style={styles.text}>{details.description.substr(0, 100)}</Text>}
            </View>
        </Pressable>
    )
}
export default Post
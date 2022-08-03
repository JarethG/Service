import {styles} from "../Styles";
import {View, Text, Pressable, ScrollView, FlatList} from "react-native";
import React, {useState} from "react";
import {AntDesign} from "@expo/vector-icons";
import Settings from "./Settings";
import Button from "./Button";

const Post = ({details, navButton}) => {
    // console.log("details" ,details)
    const theme = details.type === "skill"
    const [expand, setExpand] = useState(false)
    return (
        <View style={[styles.container, theme ? styles.midColour : styles.darkColour]}>
            {/*{expand?<Settings data={details}/>:null}*/}
            <View style={{flexDirection: "row", flex: 1}}>
                <View style={styles.cardProfilePicture}/>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={styles.header}>{details.name}</Text>
                        <AntDesign name="star" size={18} color="white"/>
                        <Text style={{color: "white", fontSize: 12}}>4.68</Text>

                    </View>
                    <View style={{flexDirection: "row"}}>
                        <FlatList data={details.tags} keyExtractor={(item) => item}
                                  style={{flex: 1}}
                                  horizontal={true} renderItem={({item}) =>
                            <Text style={[styles.tags, theme ? styles.darkColour : styles.midColour]}>{item}</Text>
                        }/>
                    </View>
                </View>
            </View>
            <Text style={[styles.text, {fontWeight: "bold"}]}>{details.title}</Text>
            {expand ? <>
                <Text style={styles.text}>{details.description}</Text>
                <View style={[styles.container, {height: 200, backgroundColor: "white"}]}>
                    <Text style={{alignSelf: "center"}}>image not available</Text>
                </View>
                {navButton}

            </> : <Text style={styles.text}>{details.description.substr(0, 100)}</Text>}
            <Pressable onPress={() => setExpand(!expand)}>
                <View style={[styles.tags]}>
                    <Text style={styles.text}>{expand ? "minimise..." : "expand..."}</Text>
                </View>
            </Pressable>
        </View>

    )
}
export default Post
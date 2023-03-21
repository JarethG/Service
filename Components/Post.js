import {styles} from "../Styles";
import {View, Text, Pressable,FlatList, Image} from "react-native";
import React, {useState} from "react";
import {AntDesign} from "@expo/vector-icons";
import {images} from "../assets/Avatars/ImageLoader";

const Post = ({details, navButton}) => {
    const [expand, setExpand] = useState(false)
    return (
        <Pressable style={[styles.container, styles.midColour]} onPress={()=> {setExpand(!expand)}}>
            <View style={{flexDirection: "row", flex: 1}}>
                <Image source={images[details.avatar]} style={styles.cardProfilePicture}/>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: "row", alignItems: "center", left: 15}}>
                        <Text style={[styles.header, {fontSize: 20}]}>{details.name}</Text>
                            <AntDesign name="star" size={18} color="white"  style={{left:15}}/>
                            <Text style={{color: "white", fontSize: 12,left:20}}>{details.rating}</Text>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <FlatList data={details.tags} keyExtractor={(item) => item}
                                  style={{flex: 1}}
                                  horizontal={true} renderItem={({item}) =>
                            <Text style={[styles.tags, styles.darkColour]}>{item}</Text>
                        }/>
                    </View>
                </View>
            </View>
            <Text style={[styles.boldText,{top:5}]}>{details.title}</Text>
            {expand ? <>
                <Text style={styles.text}>{details.description}</Text>
                <View style={[styles.container, {height: 200, backgroundColor: "white"}]}>
                    <Text style={{alignSelf: "center"}}>image not available</Text>
                </View>
                {navButton}
            </> : <Text style={styles.text}>{details.description?.substr(0, 100)}</Text>}
        </Pressable>
    )
}
export default Post
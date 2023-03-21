import {useState} from "react";
import {styles} from "../Styles";
import {Image, View} from "react-native";
import {images} from "../assets/Avatars/ImageLoader";
import Button from "./Button";
import {FontAwesome} from "@expo/vector-icons";

const AvatarChooser = ({setter, old}) => {
    console.log(old)
    const [selected,setSelected]=useState(old)
    const [num,inc] = useState(old)

    return(
        <View>
            <View style={{flexDirection:"row",alignItems:"center"}}>
                <FontAwesome name="arrow-left" size={24} color="black" onPress={()=>{
                    num==1?
                        inc(images.length-1):inc(num-1)
                }} />
            <Image source={images[num]} style={[styles.midColour,{width:200,height:200,margin:4}]}/>

                <FontAwesome name="arrow-right" size={24} color="black" onPress={()=>{
                num<images.length-1?
                inc(num+1):inc(1)
            }}/>
            </View>
            <Button title={selected==num?"selected":"confirm?"} onPress={()=>{
                setSelected(num)
                setter(num)
            }}/>
        </View>
    )
}

export default AvatarChooser
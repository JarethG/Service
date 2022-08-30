import {Modal, Text, TextInput, View} from "react-native";
import {styles} from "../../Styles";
import React, {useState} from "react";
import Button from "../Button";
import {newRequest} from "../../utils/Firebase";
import Picker from "../Picker";
import {Resources, Skills} from "../../JSONS/Tags.json";
import ToggleButtons from "../ToggleButtons";
import Post from "../Post";
import ProfileContext from "../../utils/profileContext";
import {Ionicons} from "@expo/vector-icons";

const NewRequestSheet = ({navigation}) => {

    const profile = React.useContext(ProfileContext)
    const [request, setRequest] = useState({
        accepted:false,
        account:profile.email,
        avatar:profile.avatar,
        userRating:profile.rating,
        type: "skill",
        name: profile.name,
        tags: [],
        title: "",
        description: ""
    })

    const inputs = ["Title","Description"]
    const [toggle,switchToggle] = useState(true)
    const [blocking,setBlocking] = useState(false)

    const InputFrame = ({inputValue,onChange}) => {
        const [currentValue, setCurrentValue] = useState(request[inputValue.toLowerCase()]);
         return <View style={[styles.transparentContainer,{margin:10}]}>
             <Text style={styles.title}>{inputValue}</Text>
            <TextInput
                placeholder={inputValue}
                value={currentValue}
                onChangeText={(text) => setCurrentValue(text)}
                onEndEditing={() => onChange(currentValue)}
            />
        </View>
    }
    return (
        <View style={styles.background}>
            <View style={[styles.container,styles.midColour,{width:"100%",flex:1,alignItems:"center"}]}>
            <Ionicons name="arrow-back-outline" size={24} color="black"
                      onPress={()=> navigation.navigate("NoticeBoard")}
                      style={[styles.button,{alignSelf:"flex-start"}]}
            />
                <View style={{height:30}}></View>
            <ToggleButtons titleLeft={"Skill"} titleRight={"Resource"} onToggle={()=>{
                setRequest({...request, type: !toggle?"skill":"resource",tags:[]});
                switchToggle(!toggle)
            }}/>
            <Text style={[styles.header,{margin:10}]}>Create a new Request</Text>
            {inputs.map((input,index)=> {
                return <InputFrame key={index} inputValue={input} onChange={
                    (r)=>setRequest({...request, [input.toLowerCase()]: r})
                }/>
            })}

            <Picker data={toggle?Skills:Resources}
                    buttonTitle={"Select " + (toggle? "Skills":"Resources")}
                    apply={(r) => setRequest({...request, tags: r})
                    }/>
            <View>
                {request.tags?.map((resource, index) => {
                    return <Text style={styles.header} key={index}>{" * " +resource}</Text>
                })}
            </View>

            <Button title={"Post"} onPress={()=>{
                console.log("posting")
                if(!blocking) {
                    setBlocking(true);
                    newRequest(request, profile.email).then(() => {
                        setBlocking(false);
                        navigation.navigate("NoticeBoard");
                    })
                }
            }}/>
        </View>
        </View>

    )
}

export default NewRequestSheet
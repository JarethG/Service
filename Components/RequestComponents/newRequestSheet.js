import {Alert, Modal, Text, TextInput, View} from "react-native";
import {styles} from "../../Styles";
import React, {useState} from "react";
import Button from "../Button";
import {writeNewPost} from "../../utils/Firebase";
import Picker from "../Picker";
import {Resources, Skills} from "../../JSONS/Tags.json";
import ToggleButtons from "../ToggleButtons";
import Post from "../Post";
import ProfileContext from "../../utils/profileContext";
import {Ionicons} from "@expo/vector-icons";
import {getAuth} from "firebase/auth";

const NewRequestSheet = ({navigation}) => {

    const profile = React.useContext(ProfileContext)
    console.log(profile)
    const [request, setRequest] = useState({
        title:"",
        rating:profile.rating,
        tags:[],
        avatar:profile.avatar,
        name:profile.name,
        description:"",
        email:"email",
        settled:false,
        uid:getAuth().currentUser.uid,
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
                setRequest({...request,tags:[]});
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
                if(!blocking) {
                    setBlocking(true);
                    try {
                        writeNewPost(getAuth().currentUser.uid, request)
                    } catch(E){
                        console.log(E)
                        Alert.alert("Error :please contact the developer!")
                    } finally {
                        setBlocking(false);
                    }
                    navigation.navigate("NoticeBoard");
            }}}/>
        </View>
        </View>

    )
}

export default NewRequestSheet
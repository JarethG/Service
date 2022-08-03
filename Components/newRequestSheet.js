import {Modal, Text, TextInput, View} from "react-native";
import {styles} from "../Styles";
import React, {useState} from "react";
import Button from "./Button";
import {newRequest} from "../utils/Firebase";
import Picker from "./Picker";
import {Resources, Skills} from "../JSONS/Tags.json";
import ToggleButtons from "./ToggleButtons";
import Post from "./Post";
import ProfileContext from "../utils/profileContext";

const NewRequestSheet = ({navigation}) => {

    const profile = React.useContext(ProfileContext)
    const [request, setRequest] = useState({
        accepted:false,
        account:profile.email,
        type: "skill",
        name: profile.name,
        tags: [],
        title: "",
        description: ""
    })

    const inputs = ["name", "title","description"]
    const [showPreview,setShowPreview] = useState(false)
    const [toggle,switchToggle] = useState(true)
    const [blocking,setBlocking] = useState(false)

    const InputFrame = ({inputValue,onChange}) => {
        const [currentValue, setCurrentValue] = useState(request[inputValue]);
         return <View style={styles.transparentContainer}>
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
        <View style={[styles.background,toggle?styles.skillsTheme:styles.resourceTheme]}>
            <Button title={"Back"} onPress={()=> navigation.navigate("NoticeBoard")}/>
            <ToggleButtons titleLeft={"Skill"} titleRight={"Resource"} onToggle={()=>{
                setRequest({...request, type: !toggle?"skill":"resource",tags:[]});
                switchToggle(!toggle)
            }}/>
            <Text style={styles.header}>Create a new Request</Text>
            {inputs.map((input,index)=> {
                return <InputFrame key={index} inputValue={input} onChange={
                    (r)=>setRequest({...request, [input]: r})
                }/>
            })}

            <Picker data={toggle?Skills:Resources}
                    buttonTitle={"Select " + (toggle? "Skills":"Resources")}
                    apply={(r) => setRequest({...request, tags: r})
                    }/>
            <View>
                {request.tags?.map((resource, index) => {
                    return <Text key={index}>{resource}</Text>
                })}
            </View>
            {showPreview? <Modal
                    onRequestClose={() => {
                        setShowPreview(false);
                    }}>
                <View style={styles.background}>
                <Post details={request} navButton={<Button title={"back"} onPress={()=>setShowPreview(false)}/>}/>
                    <Button title={"back"} onPress={()=>setShowPreview(false)}/>
                </View>
                </Modal> :
                <Button title={"show preview"} onPress={()=>setShowPreview(true)}/>}

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

    )
}

export default NewRequestSheet
import {Modal, Text, TextInput, View} from "react-native";
import {styles} from "../Styles";
import React, {useState} from "react";
import ResourcePicker from "./ResourcePicker";
import Button from "./Button";
import RequestCard from "./RequestCard";
import {newOffer, newRequest} from "../utils/Firebase";
import Picker from "./Picker";
import {Resources, Skills} from "../JSONS/Tags.json";
import ToggleButtons from "./ToggleButtons";
import Post from "./Post";

const NewRequestSheet = ({navigation,route}) => {

    const profile = route.params
    const [request, setRequest] = useState({
        account:profile.email,
        type: "skill",
        name: profile.name,
        tags: [],
        title: "",
        description: ""
    })
    console.log(request)

    const inputs = ["name", "title","description"]
    const [visible,setVisible] = useState(false)
    const [showPreview,setShowPreview] = useState(false)
    const [toggle,switchToggle] = useState(true)

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
                setRequest({...request, type: !toggle?"skill":"resource"});
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
            <View style={styles.transparentContainer}>
                {request.tags?.map((resource, index) => {
                    return <Text key={index}>{resource}</Text>
                })}


            </View>
            {showPreview? <Modal
                    onRequestClose={() => {
                        setShowPreview(false);
                    }}>
                <Post details={request} navButton={null}/>
                    <Button title={"back"} onPress={()=>setShowPreview(false)}></Button>
                </Modal> :
                <Button title={"show preview"} onPress={()=>setShowPreview(true)}></Button>}

            <Button title={"Post"} onPress={()=>{
                console.log("posting")
                newRequest(request,profile.email).then(() =>  navigation.navigate("NoticeBoard"))
            }}/>
        </View>

    )
}

export default NewRequestSheet
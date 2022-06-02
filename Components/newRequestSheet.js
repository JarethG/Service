import {Modal, Text, TextInput, View} from "react-native";
import {styles} from "../Styles";
import React, {useState} from "react";
import ResourcePicker from "./ResourcePicker";
import Button from "./Button";
import RequestCard from "./RequestCard";
import {newOffer, newRequest} from "../utils/Firebase";

const NewRequestSheet = ({navigation,route}) => {
    const profile = route.params
    const [request, setRequest] = useState({
        account:profile.email,
        type: "skill",
        name: profile.name,
        skills: [],
        title: "",
        description: ""
    })

    const inputs = ["name", "title","description"]
    const [visible,setVisible] = useState(false)
    const [showPreview,setShowPreview] = useState(false)

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
        <View style={styles.background}>
            <Button title={"Back"} onPress={()=> navigation.navigate("NoticeBoard")}/>
            <Text style={styles.header}>Create a new Request</Text>
            {inputs.map((input,index)=> {
                return <InputFrame key={index} inputValue={input} onChange={
                    (r)=>setRequest({...request, [input]: r})
                }/>
            })}
            {visible? <Modal
                    onRequestClose={() => {
                        setVisible(false);
                    }}>
                    <ResourcePicker setVisible={setVisible} apply={(r) => setRequest({...request, skills: r})}/>
                </Modal> :
                <Button title={"select resources"} onPress={()=>setVisible(true)}></Button>}
            <View style={{flexDirection:"row"}}>
            {request.skills?.map((resource,index)=>{
                return <View key={index} style={styles.transparentContainer}><Text>{resource}</Text></View>
            })}
        </View>
            {showPreview? <Modal
                    onRequestClose={() => {
                        setShowPreview(false);
                    }}>
                    <RequestCard info={request}/>
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
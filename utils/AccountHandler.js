import {createUserWithEmailAndPassword} from "firebase/auth";
import {updateProfile} from "./Firebase";
import {Modal, Text, TextInput, View} from "react-native";
import {styles} from "../Styles";
import ResourcePicker from "../Components/ResourcePicker";
import Button from "../Components/Button";
import React, {useState} from "react";
import Picker from "../Components/Picker";

export const UpdateAccount = ({email, oldData}) => {

    const [visible,setVisible] = useState(false)

    const [updates, setUpdates] = React.useState(oldData)
    console.log(updates)

    async function apply() {
        try {
            updateProfile(email,updates).then(r => console.log("profile hase been updated"))
            setVisible(false)
        } catch (error) {
            console.log("updates errors : ",error)
        }
    }

return (
    <View style={styles.background}>
        <View style={styles.container}>
            <Text style={styles.header}>About </Text>
            <View style={styles.transparentContainer}>
                <TextInput
                    profile={updates.about}
                    placeholder={oldData.about}
                    onChangeText={(text) => setUpdates({...updates, about: text})}
                />
            </View>
            <Text style={styles.header}> Name </Text>
            <View style={styles.transparentContainer}>
                <TextInput
                    profile={updates.name}
                    placeholder={oldData.name}
                    onChangeText={(text) => setUpdates({...updates, name: text})}
                />
            </View>
            <Text style={styles.header}> Your personal title</Text>
            <View style={styles.transparentContainer}>
                <TextInput
                    profile={updates.title}
                    placeholder={oldData.title}
                    onChangeText={(text) => setUpdates({...updates, title: text})}
                />
            </View>
            <Text style={styles.header}>what can you provide?</Text>
            {/*{visible? <Modal*/}
            {/*        onRequestClose={() => {*/}
            {/*            setVisible(false);*/}
            {/*        }}>*/}
            {/*        <ResourcePicker setVisible={setVisible} apply={(r) => setUpdates({...updates, resources: r})}/>*/}
            {/*    </Modal> :*/}
            {/*    <Button title={"select resources"} onPress={()=>setVisible(true)}></Button>}*/}
            <Picker data={tags} apply={(r) => setFilter({...filter, tags: r})}/>
            <View style={styles.transparentContainer}>
                {updates.resources?.map((resource,index)=>{
                    return <Text key={index}>{resource}</Text>
                })}
            </View>
            <Button title={"apply updates"} onPress={()=> {
                apply().then(r => console.log("finsihed"))
            }
            }/>
        </View>
    </View>
)
}
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {updateProfile} from "./Firebase";
import {Modal, Text, TextInput, View} from "react-native";
import {styles} from "../Styles";
import Button from "../Components/Button";
import React, {useState} from "react";
import Picker from "../Components/Picker";
import {Resources, Skills} from "../JSONS/Tags.json";




export const UpdateAccount = ({email, oldData}) => {

    const [stage, setStage] = useState(0)
    const [visible, setVisible] = useState(false)
    const [updates, setUpdates] = React.useState(oldData)


    async function apply() {
        try {
            updateProfile(email, updates).then(r => console.log("updates hase been updated"))
            setVisible(false)
        } catch (error) {
            console.log("updates errors : ", error)
        }
    }

    return (
        visible? <Modal
                    onRequestClose={() => {
                        setVisible(false);
                    }}>
                    <View style={styles.background}>
                        {stage == 0 ?
                            <View style={styles.container}>
                                <Text style={styles.header}>About</Text>
                                <View style={styles.transparentContainer}>
                                    <TextInput
                                        value={updates.about}
                                        placeholder='text...'
                                        onChangeText={(text) => setUpdates({...updates, about: text})}
                                    />
                                </View>
                                <Text style={styles.header}> Name </Text>
                                <View style={styles.transparentContainer}>
                                    <TextInput
                                        value={updates.name}
                                        placeholder='text...'
                                        onChangeText={(text) => setUpdates({...updates, name: text})}
                                    />
                                </View>
                                <Text style={styles.header}> Your personal title</Text>
                                <View style={styles.transparentContainer}>
                                    <TextInput
                                        value={updates.title}
                                        placeholder='i.e Teacher, student, doctor'
                                        onChangeText={(text) => setUpdates({...updates, title: text})}
                                    />
                                </View>
                                <Button title={"next"} onPress={() => {
                                    setStage(1)
                                }}/>
                            </View>
                            :
                            <View style={styles.container}>
                                <Button title={"back"} onPress={() => {
                                    setStage(0)
                                }}/>
                                <Text style={styles.header}>what can you provide?</Text>
                                <Picker data={Resources}
                                        buttonTitle={"Select Resource"}
                                        apply={(r) => setUpdates({...updates, resources: r})
                                        }/>
                                <View style={styles.transparentContainer}>
                                    {updates.resources?.map((resource, index) => {
                                        return <Text key={index}>{resource}</Text>
                                    })}
                                </View>
                                <Picker data={Skills}
                                        buttonTitle={"Select Skills"}
                                        apply={(r) => setUpdates({...updates, skills: r})
                                        }/>
                                <View style={styles.transparentContainer}>
                                    {updates.skills?.map((resource, index) => {
                                        return <Text key={index}>{resource}</Text>
                                    })}


                                </View>
                                <Button title={"Apply Changes"} onPress={() => {
                                    apply().then(r => console.log("finished"))
                                }
                                }/>
                            </View>
                        }
                    </View>
                </Modal> :
                <Button title="update info" style={styles.button} onPress={()=>setVisible(true)} />

    )
}
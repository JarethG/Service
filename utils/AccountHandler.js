import { getAuth} from "firebase/auth";
import {clearResourceOffers, updateProfile, updatePublicUserInfo, writeResourceOffers} from "./Firebase";
import {Text, TextInput, View} from "react-native";
import {styles} from "../Styles";
import Button from "../Components/Button";
import React, {useState} from "react";
import Picker from "../Components/Picker";
import {Resources, Skills} from "../JSONS/Tags.json";
import AvatarChooser from "../Components/AvatarChooser";


export const UpdateAccount = ({oldData,callback}) => {

    const [loading, setLoading] = useState(false)

    async function apply(updates) {
        console.log("updates",updates)
        try {
            await updatePublicUserInfo(updates,getAuth().currentUser.uid)
            updateProfile(oldData.email, updates).then(setLoading(false))
            await clearResourceOffers(getAuth().currentUser.uid).then(
            updates.resources.map((resource)=> {
                console.log("resource",resource)
                writeResourceOffers(getAuth().currentUser.uid, {
                        title:"Offer: " + resource + " available.",
                        rating:updates.rating?updates.rating:0,
                        avatar:updates.avatar,
                        name:updates.name,
                        isComplete:false,
                        uid:getAuth().currentUser.uid
                    })}))
            callback()
        } catch (error) {
            console.log("updates errors : ", error)
        }
    }
   return (<UserDataForm oldData={oldData} submit={(r)=>apply(r)}/>
   )


}

export const UserDataForm = ({oldData,submit}) => {

    const [stage, setStage] = useState(0)
    const [updates, setUpdates] = React.useState(oldData)
    return (
        stage == 0 ?
            <>
                <Text style={styles.header}>About</Text>
                <View style={styles.transparentContainer}>
                    <TextInput
                        value={updates.about}
                        placeholder='text...'
                        multiline={true}
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
            </>
            : stage==1?
                <>
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
                    <Button title={"next"} onPress={() => {
                        setStage(2)
                    }}/>

                </> :
                <>
                    <Button title={"back"} onPress={() => {
                        setStage(1)
                    }}/>
                    <Text style={styles.header}>select your avatar</Text>
                    <AvatarChooser setter={(r)=>setUpdates({...updates, avatar: r})} old={oldData.avatar}/>
                    <Button title={"submit"} onPress={() => submit(updates)}/>
                </>
    )
}
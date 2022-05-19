import {Alert, FlatList, Modal, Pressable, ScrollView, Text, View} from "react-native";
import RequestCard from "./RequestCard";
import Button from "./Button";
import {useEffect, useState} from "react";
import Requests from '../JSONS/Requests.json'
import {getOffers} from "../utils/Firebase";
import {styles} from "../Styles";
import {AntDesign, Ionicons} from "@expo/vector-icons";

const RequestFeed = ({navigation}) => {

    const [feed, setFeed] = useState()
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedPost, setSelectedPost] = useState()



    function updateFeed(){
        getOffers(20).then(r=>{
            setFeed(r)
            setLoading(false)
        })
    }

    const DetailedRequest=()=> {
        const [modalVisible, setModalVisible] = useState(false)
        const [settings, setSettings] = useState(false)
        const request = selectedPost

        const SettingsModal = () => {
            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <Pressable style={[styles.background,{backgroundColor:'rgba(114,114,114,0.5)', }]}
                               onPress={() => setModalVisible(!modalVisible)}>

                    </Pressable>
                    <View style={[{
                        height: '50%',
                        marginTop: 'auto',
                        backgroundColor:'white',
                        borderColor:"gray",
                        borderWidth:1

                    },styles.container]} onPress={e => e.stopPropagation()}>
                        <View style={{flex:1}}>
                            <View style={styles.menuItem}>
                                <AntDesign name="hearto" size={24} color="black"/>
                                <Text style={{left:20}}>Save to favorites</Text>
                            </View>
                            <View style={styles.menuItem}>
                                <AntDesign name="sharealt" size={24} color="black" />
                                <Text style={{left:20}}>share</Text>
                            </View>
                            <View style={styles.menuItem}>
                                <AntDesign name="flag" size={24} color="black" />
                                <Text style={{left:20}}>Report posts</Text>
                            </View>
                            <View style={styles.menuItem}>
                                <Ionicons name="shield" size={24} color="black" />
                                <Text style={{left:20}}>Stay safe</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            );
        }

        const ExpandedView = () => {
            return <View style={styles.background}>
                <Button title={"back"} onPress={()=>setSelectedPost(null)}/>
                <View style={request.type === "skill" ? styles.skillsTheme : styles.resourceTheme}>
                    <AntDesign name="ellipsis1" size={32} color="white" style={{alignSelf: "flex-end"}}
                               onPress={() => setModalVisible(true)}/>
                    <View style={{flexDirection: "row"}}>
                        <View style={styles.cardProfilePicture}/>
                        <View>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Text style={styles.header}>{request.name}</Text>

                                <AntDesign name="star" size={18} color="white"/>
                                <Text style={{color: "white", fontSize: 12}}>4.68</Text>
                            </View>
                            {request.type === "skill" ?
                                <ScrollView horizontal>
                                    {request.skills.map((skill, index) => {
                                        return <Text style={styles.cardTags} key={index}>{skill}</Text>
                                    })}
                                </ScrollView>
                                :
                                <Text style={styles.cardTags}>{request.category}</Text>
                            }
                        </View>
                    </View>
                    {request.type === "skill" ?
                        <Text style={[styles.cardText, {fontWeight: "bold"}]}>{request.title}</Text> : null}
                    <Text style={styles.cardText}>{request.description}</Text>
                    <View style={[styles.container, {height: 200, backgroundColor: "white"}]}/>
                    <Pressable onPress={() => addContact()} style={styles.transparentContainer}>
                        <Text style={{alignSelf: "center", color: "white"}}>Message {request.name}</Text>
                    </Pressable>
                </View>
                <SettingsModal/>
            </View>
        }

        return settings?<SettingsModal/>:<ExpandedView/>


    }



    return (
        loading ? null :
            selectedPost?
                <DetailedRequest/>
                :
            <FlatList data={feed} keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => <Pressable
                          onPress={() => {
                              setSelectedPost(item)
                              setModalVisible(true)
                          }}>
                          <RequestCard info={item}/>
                      </Pressable>
                      }
                      ListFooterComponent={
                          <Button title={loading ? "loading..." : "get Posts"}
                                  onPress={() => {
                                      setLoading(true)
                                      updateFeed()
                                  }}/>
                      }
            />
    )
}
export default RequestFeed
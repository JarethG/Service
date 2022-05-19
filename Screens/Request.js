import {Text, View, FlatList, Modal, Alert, ScrollView, Pressable,} from 'react-native';
import {styles} from "../Styles";
import React, {useEffect, useState} from "react";
import RequestCard from "../Components/RequestCard";
import {AntDesign, Ionicons, Entypo} from '@expo/vector-icons';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Requests from '../JSONS/Requests.json'
import {NoticeboardFilters} from "../Components/NoticeboardFilters";
import NewRequestSheet from "../Components/newRequestSheet";
import Button from "../Components/Button";
import {getOffers} from "../utils/Firebase";
import RequestFeed from "../Components/RequestFeed";

export default function Request({navigation,route}) {

    const [loading,setLoading] = useState(true)

    const [filteredResults, setFilteredResults] = useState(Requests)
    const [filtering, setFiltering] = useState(false)
    const [requestCounter,setRequestCounter] = useState(0)
    const [feed,setFeed] = useState([])
    const profile = route.params

    function addContact() {
        //will require firebaser
        navigation.jumpTo('Messages');
    }

    useEffect(() => {
            loadMoreRequests().then(r => {
                setFeed(r)
                setLoading(false)
            })
    },[])

    function loadMoreRequests(){
        let newFeed = getOffers(20).then()
        // setRequestCounter(requestCounter+20)
        return newFeed
    }

    function DetailedRequest({route}) {
        const request = route.params
        const [modalVisible, setModalVisible] = useState(false)

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

        return <View style={styles.background}>
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

    const Stack = createNativeStackNavigator();

    const Main = () => {

        return (
            <View style={styles.background}>
                <View style={{alignItems: "center", justifyContent: "center",flexDirection:"row"}}>
                    <AntDesign name="filter" size={24} color="black"
                              style={{borderWidth: 1, borderColor: "black", margin: 10}}
                              onPress={() => setFiltering(true)}/>
                    <Entypo name="new-message" size={24} color="black"
                    onPress={()=>{navigation.navigate("NewRequest")}}/>

                </View>
                <RequestFeed navigation={navigation}/>
                {/*<FlatList data={feed} keyExtractor={(item, index) => index.toString()}*/}
                {/*          renderItem={({item}) => <Pressable*/}
                {/*              onPress={() => navigation.navigate("Expanded", item)}>*/}
                {/*              <RequestCard info={item}/>*/}
                {/*          </Pressable>*/}
                {/*          }*/}
                {/*          ListFooterComponent={*/}
                {/*    <Button title={loading?"loading...":"load more"} onPress={()=>setFeed(loadMoreRequests)}/>*/}
                {/*          }*/}
                {/*/>*/}
            </View>
        )
    }

    return (

        filtering ?
            <NoticeboardFilters onClose={(r) => setFiltering(false)} setFilteredList={(r) => setFilteredResults(r)}/>
            :
            <Stack.Navigator>
                <Stack.Screen name={"Main"} component={Main}/>
                <Stack.Screen name={"NewRequest"} component={NewRequestSheet} initialParams={profile}/>
                <Stack.Screen name={"Expanded"} component={DetailedRequest}/>
            </Stack.Navigator>

    );
}







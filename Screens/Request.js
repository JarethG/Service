import {Text, TouchableOpacity, View, FlatList, Modal, Alert, ScrollView, Pressable,} from 'react-native';
import {styles} from "../Styles";
import {useState} from "react";
import RequestCard from "../Components/RequestCard";
import {AntDesign, Ionicons, Octicons} from '@expo/vector-icons';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Requests from '../JSONS/Requests.json'
import {NoticeboardFilters} from "../Components/NoticeboardFilters";

export default function Request({navigation}) {

    const [filteredResults, setFilteredResults] = useState(Requests)
    const [filtering, setFiltering] = useState(false)

    function addContact() {
        //will require firebaser
        navigation.jumpTo('Messages');
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
            <View style={request.type == "skill" ? styles.skillsTheme : styles.resourceTheme}>
                <AntDesign name="ellipsis1" size={32} color="white" style={{alignSelf: "flex-end"}}
                           onPress={() => setModalVisible(true)}/>
                <View style={{flexDirection: "row"}}>
                    <View style={styles.cardProfilePicture}></View>
                    <View>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text style={styles.header}>{request.name}</Text>

                            <AntDesign name="star" size={18} color="white"/>
                            <Text style={{color: "white", fontSize: 12}}>4.68</Text>
                        </View>
                        {request.type == "skill" ?
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
                {request.type == "skill" ?
                    <Text style={[styles.cardText, {fontWeight: "bold"}]}>{request.title}</Text> : null}
                <Text style={styles.cardText}>{request.description}</Text>
                <View style={[styles.container, {height: 200, backgroundColor: "white"}]}></View>
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
                <View style={{alignItems: "center", justifyContent: "center"}}>
                    <AntDesign name="filter" size={24} color="black"
                              style={{borderWidth: 1, borderColor: "black", margin: 10}}
                              onPress={() => setFiltering(true)}/>
                </View>
                <FlatList data={filteredResults} keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) => <Pressable
                              onPress={() => navigation.navigate("Expanded", item)}>
                              <RequestCard info={item}></RequestCard>
                          </Pressable>
                          }/>
            </View>
        )
    }

    return (

        filtering ?
            <NoticeboardFilters onClose={(r) => setFiltering(false)} setFilteredList={(r) => setFilteredResults(r)}/>
            :
            <Stack.Navigator>
                <Stack.Screen name={"Main"} component={Main}/>
                <Stack.Screen name={"Expanded"} component={DetailedRequest}/>
            </Stack.Navigator>

    );
}







import {Modal, Pressable, StyleSheet, Text, View, ScrollView} from "react-native";


export default function SkillSearch({filtersVisible, setFiltersVisible,returnFunction}) {
    const skills = require('../JSONS/Filters.json')
    const categories = ["Education", "Sport","Items","Numbers"]
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={filtersVisible}
            onRequestClose={() => {
                setFiltersVisible(false);
            }}
        >
            <View style={stles.centeredView}>
                <View style={stles.modalView}>
                    <Text style={stles.modalText}>Select a Tag!</Text>
                    <ScrollView horizontal>
                        {categories.map((category, index) => {
                            return <View key={index} style={{backgroundColor: '#d8e5b7', margin: 10, alignItems: "center", borderRadius:5}}>
                                <Text>{category}</Text>
                                <ScrollView>
                                    {skills[category].map((skill, index) => {
                                        return <View key={index} style={{alignItems:"center"}}>
                                        <Text  style={{
                                            backgroundColor: "#ffffff",
                                            borderRadius: 15,
                                            margin: 3,
                                            padding: 5,
                                            color: "#386540",
                                            fontSize: 12,
                                            minWidth:100,
                                        }} onPress={()=>{
                                            returnFunction(skill)
                                            setFiltersVisible(false)
                                        }}> {skill}</Text>
                                    </View>
                                    })}
                                </ScrollView>
                            </View>
                        })}
                    </ScrollView>


                    <Pressable style={[stles.button, stles.buttonClose]} onPress={() => setFiltersVisible(false)}>
                        <Text style={stles.textStyle}>close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const stles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: '#68984e',
        borderRadius: 20,
        height:"75%",
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
import {FlatList, Modal, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../Styles";
import {Ionicons} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import Button from './Button'

const Picker = ({data, buttonTitle, apply}) => {


    const [visible, setVisible] = useState(false)
    const [picked, setPicked] = useState([])
    useEffect(() => {
        setPicked([])
    }, [data])

    function add(string) {
        if (picked.length < 3)
            setPicked([...picked, string])
    }

    function remove(string) {
        setPicked(picked.filter(function (category) {
            return category !== string
        }));
    }

    const RenderItem = ({string}) => {
        return <TouchableOpacity style={[styles.pickerItem,styles.darkColour]}
                                 onPress={() => {
                                     picked.includes(string) ? remove(string) : add(string)
                                 }}
        >
            <Text style={[styles.text,{flex:1}]}>{string}</Text>
            {picked.includes(string) ?
                <Ionicons name="checkbox-outline" size={28} color="black"/>
                :
                <View style={{width: 24, height: 24, borderColor: "#000", borderWidth: 2, margin: 2}}/>
            }

        </TouchableOpacity>
    }

    return (
        <>
            {visible ? <Modal
                    onRequestClose={() => {
                        setVisible(false);
                    }}>
                <View style={styles.background}>
                    <View style={[styles.container,styles.midColour,{width:"100%",flex:1,alignItems:"center"}]}>
                        <Ionicons name="arrow-back-outline" size={24} color="black"
                                  onPress={() => setVisible(false)}
                                  style={[styles.button,{alignSelf:"flex-start"}]}
                        />
                        <Text style={styles.text}>Pick up to three tags.</Text>
                        <FlatList data={data} keyExtractor={(item) => item} style={{width:"100%"}}
                              renderItem={({item}) => <RenderItem string={item}/>}/>
                    <Button title={"apply"} onPress={() => {
                        apply(picked)
                        setVisible(false)
                    }}/>
                    </View>
                </View>
                </Modal> :
                <Button title={buttonTitle} onPress={() => setVisible(true)}></Button>}
        </>
    )
}

export default Picker
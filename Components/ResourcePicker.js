
import CategoryList from "../JSONS/Catagories.json";
import {FlatList, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "../Styles";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {useState} from "react";
import Button from '../Components/Button'
const ResourcePicker = ({setVisible,apply}) => {

    const [categories, setCategories] = useState([])
    const [categoryList, filter] = useState(getResources)
    const [toggle,setToggle] = useState(true)
    const limit = 3;

    function getResources(f) {
        let res = []
        for (const subCategory in CategoryList[f?"Skill Categories":"Resource Categories"]) {
            CategoryList[f?"Skill Categories":"Resource Categories"][subCategory].forEach((item) =>
                res.push(item)
            )
        }
        return res
    }

    function add(string) {
        if (limit-categories.length>0)
            setCategories([...categories, string])
    }

    function remove(string) {
        setCategories(categories.filter(function (category) {
            return category !== string
        }));
    }

    const renderItem = (string) => {
        return <TouchableOpacity style={styles.menuItem} onPress={() => {

            categories.includes(string) ? remove(string) : add(string)
        }}>
            <Text style={{flex: 1}}>{string}</Text>
            {categories.includes(string) ?
                <Ionicons name="checkbox-outline" size={28} color="black"/>
                :
                <View style={{width: 24, height: 24, borderColor: "#000", borderWidth: 2, margin: 2}}/>
            }

        </TouchableOpacity>
    }

    return (

        <View style={styles.background}>
            <View style={{flexDirection:"row"}}>
                <Button title={"clear"} onPress={() => setCategories([])}/>
                <Button title={"close"} onPress={() => setVisible(false)}/>
                <Button title={(toggle?"Skill":"Resource") +"s"} onPress={() => {
                    setToggle(!toggle)
                    filter(getResources(toggle))
                }}/>
                </View>
            <Text>please select three options ({limit-categories.length} left)</Text>
            <FlatList data={categoryList} keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => renderItem(item)}/>
            <Button title={"add resources"} onPress={() => {
                apply(categories)
                setVisible(false)
            }}/>

        </View>


    )
}

export default ResourcePicker
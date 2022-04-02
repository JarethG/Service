
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Modal, FlatList,
} from 'react-native';
import {styles} from "../Styles";
import {LinearGradient} from 'expo-linear-gradient';
import {AntDesign} from '@expo/vector-icons';
import {useState} from "react";
import RequestCard from "../Components/RequestCard";
import ToggleButtons from "../Components/ToggleButtons";
import Filters from "../Components/Filters";
import skillRequests from '../JSONS/Skill_Requests.json';
import resourceRequests from '../JSONS/Resource_Requests.json';
import ToolCard from "../Components/ToolCard";
import Searchbar from "../Components/Searchbar";

export default function Request() {


    const [searchToggle, setSearchToggle] = useState(true)
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [searching,setSearching] = useState(true)


    return (
        <LinearGradient
            colors={['#68984e', '#d8e5b7']}
            start={[0, 0.5]}
            style={styles.background}
        >

            <Searchbar/>
            <ToggleButtons titleLeft={"Skills"} titleRight={"Resources"} returnFunction={(r) => setSearchToggle(r)}/>
            <TouchableOpacity style={{borderWidth: 1, flexDirection: "row"}} onPress={() => setFiltersVisible(true)}>
                <Text>filters</Text>
                <AntDesign name="filter" size={24} color="black"/>
            </TouchableOpacity>
            <ScrollView style={{width: "100%"}}>
                {searchToggle?
                skillRequests.map((info, index) => {
                    return <RequestCard info={info} key={index}></RequestCard>
                })
                :
                    resourceRequests.map((info, index) => {
                        return <ToolCard info={info} key={index}></ToolCard>
                    })
                }
            </ScrollView>
            <Filters filtersVisible={filtersVisible} setFiltersVisible={(r) => setFiltersVisible(r)}
                     returnFunction={() => {
                     }}/>
        </LinearGradient>

    );
}



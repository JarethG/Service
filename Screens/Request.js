
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
import {useState} from "react";
import RequestCard from "../Components/RequestCard";
import ToggleButtons from "../Components/ToggleButtons";
import Filters from "../Components/Filters";
import skillRequests from '../JSONS/Skill_Requests.json';
import resourceRequests from '../JSONS/Resource_Requests.json';
import ToolCard from "../Components/ToolCard";
import Search from "../Components/Search";

export default function Request() {


    const [resources,setResources]=useState(resourceRequests)
    const [searchToggle, setSearchToggle] = useState(true)
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [searchResult,setSearchResult] = useState()

    function filterRequests(tag){
       let res = resourceRequests.filter((request)=>{
            return request.tool==tag
        })
        setResources(res);
    }

    function removeFilter() {
        setResources(resourceRequests);
    }

    return (
        <LinearGradient
            colors={['#68984e', '#d8e5b7']}
            start={[0, 0.5]}
            style={styles.background}
        >
            <Search result={(r)=>filterRequests(r)}/>
            <ToggleButtons titleLeft={"Skills"} titleRight={"Resources"} returnFunction={(r) => setSearchToggle(r)}/>
            <TouchableOpacity style={{borderWidth: 1, flexDirection: "row",padding:5}} onPress={() => removeFilter()}>
                <Text>remove filter</Text>
            </TouchableOpacity>
            <Text>{searchResult}</Text>
            <ScrollView style={{width: "100%"}}>
                {searchToggle?
                skillRequests.map((info, index) => {
                    return <RequestCard info={info} key={index}></RequestCard>
                })
                :
                    resources.map((info, index) => {
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



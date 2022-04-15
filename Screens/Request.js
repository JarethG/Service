
import {Text, TouchableOpacity, ScrollView, View, FlatList} from 'react-native';
import {styles} from "../Styles";
import {LinearGradient} from 'expo-linear-gradient';
import {useState} from "react";
import RequestCard from "../Components/RequestCard";
import ToggleButtons from "../Components/ToggleButtons";
import skillRequests from '../JSONS/Skill_Requests.json';
import resourceRequests from '../JSONS/Resource_Requests.json';
import ToolCard from "../Components/ToolCard";
import Search from "../Components/Search";
import {AntDesign} from "@expo/vector-icons";
import lists from "../JSONS/Filters.json"

export default function Request() {


    const [resources,setResources]=useState(resourceRequests)
    const [filteredResults,setFilteredResults]=useState(skillRequests)
    const [toggle, setToggle] = useState(true)
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [filters,setFilters]=useState()


    function removeFilter() {
        setResources(resourceRequests);
        setFilteredResults(skillRequests);
        setFilters(null)
    }

    const Filters = () => {
        return (
            <TouchableOpacity style={{borderWidth: 1, flexDirection: "row",padding:5}} onPress={() => removeFilter()}>
                <Text>{filters}</Text>
                <AntDesign name="closecircle" size={20} color="black" />
            </TouchableOpacity>);
    }

    const SkillRequests = () =>{

        function filterSkills(tag){
            setFilteredResults(filteredResults.filter((request)=>{
                return request.skills.includes(tag)
            }))
            filters == null ? setFilters(tag) : setFilters(filters + " | " + tag)
        }

        return <View>
            <Search data={lists.Education} text={"Browse skills..."} onSearch={(r)=>filterSkills(r)}/>
            {filters?<Filters/>:null}
            <FlatList data={filteredResults}  keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => <RequestCard info={item}></RequestCard>}/>
        </View>
    }

    const ResourceRequests = () => {

        function filterResources(tag){
            setResources(resourceRequests.filter((request)=>{
                return request.tool==tag
            }))
            setFilters(tag)
        }

        return <View>
            <Search data={lists.Tools} text={"Browse resources..."} onSearch={(r)=>filterResources(r)}/>
            {filters?<Filters/>:null}
            <FlatList data={resources}  keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => <ToolCard info={item}/>}/>
        </View>
    }


    return (
        <LinearGradient  colors={['#68984e', '#d8e5b7']} start={[0, 0.5]} style={styles.background}>
            <ToggleButtons titleLeft={"Skills"} titleRight={"Resources"} onToggle={(r) => {
                setToggle(r)
                removeFilter()}
            }/>
            {toggle?<SkillRequests/>:<ResourceRequests/>}
        </LinearGradient>

    );


}







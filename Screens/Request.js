import {Text, TouchableOpacity, View, FlatList, Button,} from 'react-native';
import {styles} from "../Styles";
import {useState} from "react";
import RequestCard from "../Components/RequestCard";
import {Octicons} from '@expo/vector-icons';
import {createStackNavigator} from "@react-navigation/stack";
import {AntDesign} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import Requests from '../JSONS/Requests.json'
import CategoryList from '../JSONS/Catagories.json'

export default function Request() {

    const [filteredResults, setFilteredResults] = useState(Requests)
    const [sorter, setSorter] = useState("All")
    const [categories, setCategories] = useState([])
    const [distance, setDistance] = useState(0)


    const Stack = createStackNavigator();

    function setCategoriesList() {
        let branches
        switch(sorter){
            case "All" :
                branches= ["Resource Categories","Skill Categories"]
                break
            case "Skills":
                branches=["Skill Categories"]
                break
            case "Resources":
                branches=["Resource Categories"]
                break
        }
        let res = []
        branches.forEach((x)=>{
            console.log(x)
            for(const subCategory in CategoryList[x]){
                CategoryList[x][subCategory].forEach((item)=>
                    res.push(item)
                )
            }})
        filter(res)
    }

    function read3() {
        let res = []
        for(const Category in CategoryList){
            for(const subCategory in CategoryList[Category]){
                CategoryList[Category][subCategory].forEach((item)=>
               res.push(item)
                )
            }}
        return res
    }

    const sorters = ["All", "Skills", "Resources"]
    const [categoryList,filter] = useState([])

    function applyFilters() {
        let res
        switch(sorter){
            case "All" :
                res=Requests
                break
            case "Skills":
                res=Requests.filter((request)=>{return request.type==="skill"})
                break
            case "Resources":
                res=Requests.filter((request)=>{return request.type==="resource"})
                break
        }
        if(categories.size!=0){
         res = res.filter((request)=>{
            return  request.type=="resource"? categories.includes(request.category)
                :
               request.skills.some(item=>categories.includes(item))
        })}
        res.length==0? setFilteredResults([{
            "type": "resource",
            "name": "Sorry",
            "category": "Apology",
            "description": "There is nothing that fits your search parameters at this time"
        }]) : setFilteredResults(res)
    }

    function Main({navigation}) {
        return <View style={{backgroundColor:"#eae2b7"}}>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    {/*<Search data={lists.Education} text={"Browse skills..."} onSearch={(r)=>filterSkills(r)}/>*/}
                    <Octicons name="settings" size={24} color="black"
                              style={{borderWidth: 1, borderColor: "black", margin: 10}} onPress={()=>navigation.navigate("Filters")}/>
                </View>
                <FlatList data={filteredResults} keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) => <RequestCard info={item}></RequestCard>
                }/>
            </View>
    }

    function Filters({navigation}) {

        return (
            <>
                <TouchableOpacity style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    borderColor: "grey",
                    borderTopWidth: 1,
                }} onPress={() => navigation.navigate("Sort By")}>
                    <Text style={{flex: 1}}>sort by</Text>
                    <Text style={{alignSelf: "flex-end"}}>{sorter}</Text>
                    <AntDesign name="right" size={24} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    borderColor: "grey",
                    borderTopWidth: 1,
                }} onPress={() => {
                    setCategoriesList()
                    navigation.navigate("Categories")
                }}>
                    <Text style={{flex: 1}}>Catagories</Text>
                    <AntDesign name="right" size={24} color="black"/>
                </TouchableOpacity>
                <View style={{flex: 1, alignItems: "center"}}>
                    <Text >Locations : {distance}</Text>
                    <Slider
                        style={{width: 200, height: 40}}
                        minimumValue={0}
                        step={1}
                        value={distance}
                        maximumValue={10}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        onValueChange={(distance) => setDistance(distance)}
                    />
                </View>
                <Button title={"apply filters"} onPress={()=>{
                    applyFilters()
                    navigation.navigate("Main")
                }}/>
            </>
        )
    }

    function SortBy({navigation}) {
        const renderItem = (string) => {
            return <TouchableOpacity style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                borderColor: "grey",
                borderTopWidth: 1,
            }} onPress={() => {
                setSorter(string)
                navigation.goBack()
            }
            }>
                <Text style={{flex: 1}}>{string}</Text>
                {sorter == string ?
                    <Ionicons name="ios-radio-button-on" size={24} color="black"/>
                    :
                    <Ionicons name="ios-radio-button-off" size={24} color="black"/>
                }

            </TouchableOpacity>
        }

        return (
            <>
                <FlatList data={sorters} keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) => renderItem(item)}/>

            </>
        )
    }

    function Categories() {

        function add(string) {
            setCategories([...categories, string])
        }

        function remove(string) {
            setCategories(categories.filter(function (category) {
                return category !== string
            }));
        }

        const renderItem = (string) => {
            return <TouchableOpacity style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                borderColor: "grey",
                borderTopWidth: 1,
            }} onPress={() => {
                categories.includes(string) ? remove(string) : add(string)
            }}>
                <Text style={{flex: 1}}>{string}</Text>
                {categories.includes(string) ?
                    <Ionicons name="checkbox-outline" size={24} color="black"/>
                    :
                    <View style={{width: 24, height: 24, borderColor: "#000", borderWidth: 2}}/>
                }

            </TouchableOpacity>
        }

        return (
            <>
                <Button title={"clear"} onPress={()=>setCategories([])}/>
                <FlatList data={categoryList} keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) => renderItem(item)}/>

            </>
        )
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={Main}
                options={{headerShown: false, title: 'Sign in'}}

            />
            <Stack.Screen name={"Filters"} component={Filters}/>
            <Stack.Screen name={"Sort By"} component={SortBy}/>
            <Stack.Screen name={"Categories"} component={Categories}/>

        </Stack.Navigator>
    );
}







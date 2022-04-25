import {Button, FlatList, Pressable, Text, TouchableOpacity, View} from "react-native";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import {useEffect, useState} from "react";
import Requests from "../JSONS/Requests.json";
import CategoryList from "../JSONS/Catagories.json";
import {createStackNavigator} from "@react-navigation/stack";
import {styles} from "../Styles";


export const NoticeboardFilters = ({onClose, setFilteredList}) => {
    const Stack = createStackNavigator();

    const [sorter, setSortFilter] = useState("All")
    const [categories, setCategories] = useState([])
    const [categoryList, filter] = useState([])
    const [distance, setDistance] = useState(0)

    useEffect(()=> {
        setCategoriesList("All")
    },[])


    function applyFilters() {
        let res
        switch (sorter) {
            case "All" :
                res = Requests
                break
            case "Skills":
                res = Requests.filter((request) => {
                    return request.type === "skill"
                })
                break
            case "Resources":
                res = Requests.filter((request) => {
                    return request.type === "resource"
                })
                break
        }

        if (categories.length != 0) {
            res = res.filter((request) => {
                return request.type == "resource" ? categories.includes(request.category)
                    :
                    request.skills.some(item => categories.includes(item))
            })
        }
        res.length == 0 ? setFilteredList([{
            "type": "resource",
            "name": "Sorry",
            "category": "Apology",
            "description": "There is nothing that fits your search parameters at this time"
        }]) : setFilteredList(res)
    }

    function setCategoriesList(string) {
        let branches
        switch (string) {
            case "All" :
                branches = ["Resource Categories", "Skill Categories"]
                break
            case "Skills":
                branches = ["Skill Categories"]
                break
            case "Resources":
                branches = ["Resource Categories"]
                break
        }
        let res = []
        branches.forEach((x) => {
            for (const subCategory in CategoryList[x]) {
                CategoryList[x][subCategory].forEach((item) =>
                    res.push(item)
                )
            }
        })
        filter(res)
    }

    const Filters = ({navigation}) => {

        const MenuItem = ({title, navPath}) => {
            return <Pressable onPress={() => navigation.navigate(navPath)}>
                <View style={styles.menuItem}>
                    <Text style={{flex: 1}}>{title}</Text>
                    <AntDesign name="right" size={24} color="black"/>
                </View>
            </Pressable>
        }

        return (
            <>
                <View>
                    <Text>Sort by : {sorter}</Text>
                    <Text>Categories selected :</Text>
                    {categories.map((item,index)=><Text key={index}>{item}</Text>)}
                </View>
                <MenuItem title={"sort by"} navPath={"SortFilter"}/>
                <MenuItem title={"Categories"} navPath={"CategoryFilter"}/>
                <View style={{flex: 1, alignItems: "center"}}>
                    <Text>Locations : {distance}</Text>
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

                <Pressable onPress={() => {
                    applyFilters()
                    onClose()
                }}>
                    <View style={[styles.resourceTheme,styles.container]}>
                        <Text style={[styles.cardText, {alignSelf: "center"}]}>Apply Filters</Text>
                    </View>
                </Pressable>
            </>
        )
    }

    const SortFilter = ({navigation}) => {
        const sorters = ["All", "Skills", "Resources"]


        const renderItem = (string) => {
            return <TouchableOpacity style={styles.menuItem} onPress={() => {
                setSortFilter(string)
                setCategoriesList(string)
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

        return <FlatList data={sorters} keyExtractor={(item, index) => index.toString()}
                         renderItem={({item}) => renderItem(item)}/>
    }

    const CategoryFilter = () => {

        function add(string) {
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
                    <View style={{width: 24, height: 24, borderColor: "#000", borderWidth: 2, margin:2}}/>
                }

            </TouchableOpacity>
        }

        return (
            <>
                <Button title={"clear"} onPress={() => setCategories([])}/>
                <FlatList data={categoryList} keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) => renderItem(item)}/>

            </>
        )
    }

    return <Stack.Navigator>
        <Stack.Screen name={"Filters"} component={Filters} options={{
            headerRight: () => (
                <Button title={"close"} onPress={() => onClose()}></Button>

            ),
        }}/>
        <Stack.Screen name={"SortFilter"} component={SortFilter}/>
        <Stack.Screen name={"CategoryFilter"} component={CategoryFilter}/>
    </Stack.Navigator>
}


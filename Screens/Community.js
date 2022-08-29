import {Text, View, ScrollView, Button, FlatList} from 'react-native';
import {styles} from "../Styles";
import {useEffect, useState} from "react";
import EventCard from "../Components/EventCard";
import LeaderboardCard from "../Components/LeaderboardCard";
import {FontAwesome} from '@expo/vector-icons';
import ToggleButtons from "../Components/ToggleButtons";
import {deleteRequest, getLeaderBoard, getOffers} from "../utils/Firebase";
import Post from "../Components/Post";

export default function Community() {

    const [leaders,setLeaders] = useState()
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        onRefresh()
    }, [])

    const fetchData = () => {
        getLeaderBoard(setLeaders).then()
        setIsFetching(false);
    };

    const onRefresh = () => {
        setIsFetching(true);
        fetchData();
    };

    return (
        <View style={styles.background}>
            <View style={{width: "100%", padding: 15,flex:1}}>
                <Text style={{fontWeight: "bold", fontSize: 24, color: "#fff"}}>Leaderboard</Text>
                <View style={{backgroundColor: "#f6d14f", borderRadius: 5,flexDirection:"row"}}>
                    <Text style={{flex:1}}>Rank</Text>
                    <Text style={{flex:3}}>User </Text>
                    <Text style={{flex:2}}>Points this week</Text>
                </View>


                <FlatList data={leaders} keyExtractor={(item, index) => index.toString()}
                          renderItem={({item, index}) =>
                              <LeaderboardCard info={item} place={index+1}/>
                          }
                          onRefresh={onRefresh}
                          refreshing={isFetching}
                />

                {/*<View style={{flexDirection: "row", padding: 10}}>*/}
                {/*    <FontAwesome name="plus" size={24} color="white" style={{top: 5}}/>*/}
                {/*    <Text style={{fontWeight: "bold", fontSize: 24, color: "#fff", left: 10}}>Invite Your Friends</Text>*/}
                {/*</View>*/}
            </View>
        </View>
    );
}




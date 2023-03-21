import {Text, View,FlatList} from 'react-native';
import {styles} from "../Styles";
import {useEffect, useState} from "react";
import LeaderboardCard from "../Components/LeaderboardCard";
import { getLeaderBoard} from "../utils/Firebase";

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
                <Text style={styles.header}>Leaderboard</Text>
                <View style={{backgroundColor: "#f6d14f", borderRadius: 5,flexDirection:"row"}}>
                    <Text style={{flex:2}}>Rank</Text>
                    <Text style={{flex:3}}>User </Text>
                    <Text style={{flex:2}}>Points this Month</Text>
                </View>


                <FlatList data={leaders} keyExtractor={(item, index) => index.toString()}
                          renderItem={({item, index}) =>
                              <LeaderboardCard info={item} place={index+1}/>
                          }
                          onRefresh={onRefresh}
                          refreshing={isFetching}
                />
            </View>
        </View>
    );
}




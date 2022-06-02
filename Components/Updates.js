import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {pastUpdates, sinceLastUpdate, toDo} from '../JSONS/UpdateLog.json'
import {styles} from "../Styles";
import {useState} from "react";
import {ScrollView} from "react-native-gesture-handler";

const Updates = (dismiss) => {
    return (
        <View style={[styles.container,{flex:1}]}>
            <Text>Updates!</Text>
            <Text>Things that have been done since last update</Text>
            <View style={{borderWidth: 1,flex:1}}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                {sinceLastUpdate.map((update, index) => {
                    return (
                        <View key={index} style={{margin: 5}}>
                            <Text>{update}</Text>
                        </View>
                    )
                })}
                </ScrollView>
            </View>
            <Text>Things left to do</Text>
            <View style={{borderWidth: 1,flex:1}}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                {toDo.map((update, index) => {
                    return (
                        <View key={index} style={{margin: 5}}>
                            <Text>{update}</Text>
                        </View>
                    )
                })}
                </ScrollView>
            </View>
            <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                {/*<Button title={"<==="} onPress={() => {*/}
                {/*    list===sinceLastUpdate? setList(pastUpdates) :setList(sinceLastUpdate)*/}
                {/*}}/>*/}
                <Button title={"dismiss"} onPress={() => {
                    dismiss()
                }}/>
                {/*    <Button title={"===>"} onPress={() => {*/}
                {/*        list===sinceLastUpdate? setList(toDo) :setList(sinceLastUpdate)*/}
                {/*    }}/>*/}
            </View>
        </View>
    );
}
export default Updates


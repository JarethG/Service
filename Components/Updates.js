import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {pastUpdates, sinceLastUpdate,toDo } from '../JSONS/UpdateLog.json'
import {styles} from "../Styles";
import {useState} from "react";

const Updates =(dismiss)=> {
    return (
        <View style={styles.container}>
            <Text>Updates!</Text>
            <Text>Things that have been done since last update</Text>
            <View style={{borderWidth :1}}>
            {sinceLastUpdate.map((update,index) => {
                return (
                    <View key={index} style={{margin:5}}>
                        <Text>{update}</Text>
                    </View>
                )
            })}
        </View>
            <View style={{borderWidth :1}}>
            <Text>Things left to do</Text>
            {toDo.map((update,index) => {
                return (
                    <View key={index} style={{margin:5}}>
                        <Text>{update}</Text>
                    </View>
                )
            })}
        </View>
            <View style={{flexDirection:"row",justifyContent:'space-between'}}>
            {/*<Button title={"<==="} onPress={() => {*/}
            {/*    list===sinceLastUpdate? setList(pastUpdates) :setList(sinceLastUpdate)*/}
            {/*}}/>*/}
            <Button title={"dismiss"} onPress={() => {
             dismiss()}}/>
            {/*    <Button title={"===>"} onPress={() => {*/}
            {/*        list===sinceLastUpdate? setList(toDo) :setList(sinceLastUpdate)*/}
            {/*    }}/>*/}
            </View>
        </View>
    );
}
export default Updates


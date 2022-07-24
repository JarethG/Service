import React, {useState} from 'react';
import './utils/Firebase'
import { Authentication } from './utils/Authentication';
import UserStack from './utils/UserStack';
import AuthStack from './utils/AuthStack';
import Splash from "./Screens/Splash";
import {LogBox, } from "react-native";
export default function App() {

    LogBox.ignoreLogs([""]);

    const [checkingUserStatus,setCheckingUserStatus] = useState(true)
    const { user } = Authentication();

    React.useEffect(() => {
        setTimeout(() => {
            setCheckingUserStatus(false)
        },1000)
    },[])

    /*
    user = true and check = true the userStack
    user = true and check = false the userStack
    user = false and check = true splash
    user = false and check = false Auth

     */

    return  user ? <UserStack  user={user} /> : checkingUserStatus ? Splash("checking user login") : <AuthStack />;
}
import {
    View,
    StatusBar,
    Platform,
    SafeAreaView, Text
} from 'react-native';


const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export const MyStatusBar = () => (
    Platform.OS == "ios"?
    <View style={{height: STATUSBAR_HEIGHT, backgroundColor: 'rgb(39,84,102)'}}>
        <SafeAreaView>
            <StatusBar/>
        </SafeAreaView>
    </View> :<></>
);
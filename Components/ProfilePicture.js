import {LinearGradient} from "expo-linear-gradient";
import {Image} from "react-native";
import {styles} from "../Styles";

const ProfilePicture = ({rank, source, style}) =>{
    return (
<LinearGradient colors={rank=="bronze"?['#B08645', '#B06B00']:
    rank=="silver"?['#A8A9D9', '#757575']:
        ['#B78700', '#FFB300','#ffee02']}
                style={{borderRadius: 27}}>
    <Image source={source} style={[{margin:4},styles.midColour,style]}/>
</LinearGradient>
    )
}

export default ProfilePicture
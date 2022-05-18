import {Pressable,View,Text} from "react-native";
import {styles} from "../Styles";

const Button = ({title, onPress}) => {
    return <Pressable onPress={()=>onPress()}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </View>
    </Pressable>
}
export default Button
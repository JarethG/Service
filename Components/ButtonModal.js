import {Modal, Pressable, View} from "react-native";
import {styles} from "../Styles";
import Button from "./Button";
import {useState} from "react";

const ButtonModal = ({children}) => {
    const [isVisible, setIsVisible] = useState(false)
    return isVisible?
        <Modal
            animationType="slide"
            transparent={true}
        >
            <Pressable style={[styles.background, {backgroundColor: 'rgba(114,114,114,0.5)',}]}
                       onPress={() => setIsVisible(!isVisible)}/>
            <View style={styles.settingsModule} onPress={e => e.stopPropagation()}>
                {children}
            </View>
        </Modal>
        :
        <Button title={"Admin"} onPress={() => setIsVisible(true)}/>
}

export default ButtonModal
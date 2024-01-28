import { useLocalSearchParams } from "expo-router"
import { View, Text } from "react-native"

const chatbubble = () => {
    const {id } = useLocalSearchParams();

    return (
        <View><Text>Hey! Im {id}</Text></View>
    )
}

export default chatbubble
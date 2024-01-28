import {Stack} from 'expo-router'

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{title : 'Login page'}}/>
            <Stack.Screen name="mainchatarea" options={{title : 'Main Chat Area'}}/>   
            <Stack.Screen name="chatbubble"/>
            <Stack.Screen name="chatgroup/[chatid]" options={{animation: "slide_from_right"}}/>
        </Stack>
    )
}

export default RootLayout
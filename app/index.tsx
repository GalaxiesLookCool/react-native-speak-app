import { StyleSheet, View, Text, TextInput, TouchableOpacity, ToastAndroid } from "react-native"
import {Link, router} from "expo-router"
import { Stack } from 'expo-router/stack';
import { useState } from "react";
import { login } from './clientCommunications'

const HomePage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const tryLogin = async () => {
        let resp = await login(email, password)
        if (resp == 0){
            ToastAndroid.show("invalid email or password", ToastAndroid.SHORT)
            return
        }
        router.push('/mainchatarea')
    }

    return (
        <View style={styles.container}>
            <View style={styles.tinyContainer}>
                <Text>Login!</Text>
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    style={styles.placeholder}
                />
                <TextInput
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    style={styles.placeholder}
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={tryLogin} style={styles.loginButton}><Text style={styles.innerlogintext}>Login!</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    innerlogintext: {
        color: 'white',
        fontWeight: "bold",
    },
    loginButton: {
        width: '80%',
        height: '8%',
        marginTop: 30,
        borderRadius: 10,
        backgroundColor: '#ff00b3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tinyContainer: {
        width: '80%',
        height: '80%',
        backgroundColor: '#00ffff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    placeholder: {
        color: "#121212",
        padding: 2,
        paddingLeft: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        height: 46,
        width: '80%',
        borderWidth: 3,
        borderColor: "#000000",
        borderRadius: 10,
    }
  });

export default HomePage;
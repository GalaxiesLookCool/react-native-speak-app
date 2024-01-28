import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native"
import { useState, useEffect, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";
import { Avatar } from 'react-native-elements'
import { getGroups, getUserData } from './clientCommunications'
import { Link, router } from "expo-router";
import { useUsersStore, useGroupsStore } from "./store";

const mainchatarea = () => {
    const addUser = useUsersStore(state => state.addUser)
    const addGroup = useGroupsStore(state=> state.addGroup)
    const groups = useGroupsStore(state=> state.groups)
    const [groupsDisplay, setGroupsDisplay] = useState("")
    const [users, setUsers] = useState<any>({})
    useEffect(() => {
        async function fetchMyAPI() {
          await addGroup()
          let display = groups.reverse().map((grp: { name: string ; picture : string; id : string | number }) => {
            return (<Link href={`chatgroup/${grp.id}`} style={styles.groupContainer}>
                <View style={{flex: 1}}><Avatar rounded size="large" source={{uri : grp.picture}} /></View>
                <View style={{flex: 2}}><Text style={{fontSize: 30}}>{grp.name}</Text></View>
            </Link>)
          })
          //console.log(display)
          //console.log(typeof display)
          setGroupsDisplay(display)
          for (const grp of groups){
            //console.log(grp)
            for (const uid of grp.members){
                addUser(uid)
            }
          }        
        }
    
        fetchMyAPI()
      }, [groups])
    return <View>
        <SafeAreaView>
            <ScrollView style={styles.groupScrollContainer}>
                {groupsDisplay}
            </ScrollView>
        </SafeAreaView>
    </View>
}

const styles = StyleSheet.create({
    groupScrollContainer: {
        marginBottom: 30
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
    groupContainer : {
        width: '100%',
        height: 110,
        padding: 20,
        borderColor: 'black',
        borderWidth: 2,
        flexDirection: 'row',
    }
  });

export default mainchatarea;
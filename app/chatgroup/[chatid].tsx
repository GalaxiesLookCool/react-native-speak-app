import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard  } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getMsgs, isMe, sendMessage } from '../clientCommunications'
import { SafeAreaView } from "react-native-safe-area-context";
import { useUsersStore, useGroupsStore } from "../store";
import { Avatar, Button } from "react-native-elements";

const chatBubble = () => {
    const scrollRef : any = useRef(null)

    const keyboardWillShow = () => {
        console.log("keyboard did show")
        console.log(`is keyboard showing - ${isKeyboardShowed}`)
        if (isBottom && ! isKeyboardShowed)
        {
            scrollRef.current.scrollToEnd({ animated : true})
            console.log(`will scroll - ${isBottom}`)
        }
        else
            console.log("not scrolling")
        setIsKeyboardShowed(true)
        console.log(`is keyboard showed after setting is ${isKeyboardShowed}`)
    }

    const keyboardlistener = Keyboard.addListener('keyboardDidShow', keyboardWillShow);
    const keyboardhidelistener = Keyboard.addListener('keyboardDidHide', () => {s(false);console.log("setting keyboard showen")})

    const { chatid } = useLocalSearchParams<{chatid : string}>();
    const users = useUsersStore(state=>state.users)
    const groupData = useGroupsStore(state => state.groups)
    //console.log(`group id is ${useLocalSearchParams()}`)
    //console.log(useLocalSearchParams())
    const [msgs, setMsgs] = useState([])
    const [msgsDisplay, setMsgsDisplay] = useState("")
    const [messageText, setMessageText] = useState("")
    const [isBottom, setIsBottom] = useState(false)
    let isKeyboardShowed = false;
    const sendMessageReact = async () => {
        console.log(`trying to send message - ${messageText}`)
        if (messageText.length == 0)
            return
        sendMessage(chatid, messageText)
    }
    const handleScroll =  (scrollE : any) => {
        scrollE.persist()
        let nativeE = scrollE.nativeEvent;
        let contentHeight = nativeE.contentSize.height
        let contentOffset = nativeE.contentOffset.y
        let layoutHeight = nativeE.layoutMeasurement.height
        //console.log(`content height - ${contentHeight}, contentoffset is ${contentOffset}, layout height is ${layoutHeight}`)
        let isBott = contentHeight - (contentOffset + layoutHeight)  < 100
        console.log(`is bott - ${isBott}`)
        setIsBottom(isBott)

    }
    async function fetchAPI(){
        let currentGroupData = false
        for (const grp of groupData){
            if (grp.id == chatid)
                currentGroupData = grp
        }
        if (!currentGroupData)
            router.back()
        let tempMsgs = await getMsgs(chatid? chatid : "", undefined, undefined)
        //console.log(tempMsgs)
        setMsgs(tempMsgs)
        let displayMsgs = tempMsgs.reverse().map((msg : {msgid : number, textcontent : string, senderid : number}) => {
            return (
                <View style={{flexDirection : isMe(msg.senderid.toString()) ? "row-reverse" : "row", width : '100%', height: 70, borderWidth: 1, borderColor: 'black'}}>
                    <Avatar rounded size="medium" source={{uri : users[msg.senderid].picture}} />
                    <Text style={{flex: 1, fontSize: 30, backgroundColor: isMe(msg.senderid.toString())  ? "green" : "blue"}}>{msg.textcontent}</Text>
                </View>
            )
        })
        setMsgsDisplay(displayMsgs)
    }
    useEffect( () => () => {console.log("unmount"); keyboardlistener.remove();keyboardhidelistener.remove()}, [] );
    useEffect(()=>{
        //console.log("trying to fetch")
        fetchAPI()
    }, [groupData, chatid, users])

    return (
        <View>
            <SafeAreaView style={{backgroundColor: '#ebc7ed', height: '100%', paddingTop : 0, marginTop: 0, paddingBottom : 20}}>
                <View>
                <ScrollView ref={scrollRef} onScroll={handleScroll} style={{height: '93%', backgroundColor: '#ace8b5'}} automaticallyAdjustKeyboardInsets={true}>
                    {msgsDisplay}
                </ScrollView>
                <View style={{ flexDirection: "row", width:'100%', height: 50, borderWidth: 3, backgroundColor: 'gray'}} >
                    <TextInput
                        onChangeText={setMessageText}
                        value={messageText} 
                        placeholder="message text..."
                        style={{ flex: 5, width:'80%'}}
                    />
                    <TouchableOpacity onPress={()=>{sendMessageReact();setMessageText("");fetchAPI()}} style={{flex: 1, height: '100%', width: '30%', backgroundColor:'#00e1ff'}} ><Text>SEND</Text></TouchableOpacity>
                </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default chatBubble
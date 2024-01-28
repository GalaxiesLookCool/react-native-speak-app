import { useCallback } from 'react';
import { getUserData, getGroups } from './clientCommunications'
import { create } from 'zustand'
const useUsersStore = create((set) => ({
    users : {},
    addUser: async (newId: string) => {
        let newUsers = useUsersStore.getState().users; 
        if (newId in newUsers)
            return
        newUsers[newId] = "im loading!"
        newUsers[newId] = await getUserData(newId); 
        set(newUsers); 
        //console.log(useUsersStore.getState().users)
    } 
}))

const useGroupsStore = create((set) => ({
    groups : [],
    addGroup : async (newId : string ) => {
        set({ groups : await getGroups()})
        //console.log(useGroupsStore.getState().groups)
        //console.log("finished setting")
        return
    }
}))

export {useUsersStore, useGroupsStore}
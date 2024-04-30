import { NavigationContainer } from "@react-navigation/native";
import { BottomTabNavigation } from "./BottomTabNavigation.tsx";
import store from "../state/store.ts";
import React, { useEffect, useState } from "react";
import { SelectWorkSpaceStack } from "./StackNavigation.tsx";

export const RootNavigation = () => {
    const {currentScreen} = store.screen(state => state)
    return (
        <NavigationContainer>
            {
                currentScreen != "LogIn" && currentScreen != "WorkSpace" && currentScreen != "SignUp" && currentScreen != "FoundWorkSpace" ?
                    <BottomTabNavigation/> :
                    <SelectWorkSpaceStack/>
            }
            
        </NavigationContainer>
    );

    
}

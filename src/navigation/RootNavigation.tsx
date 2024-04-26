import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabNavigation } from "./BottomTabNavigation.tsx";

export const RootNavigation = () => {
    return (
        <NavigationContainer>
            <BottomTabNavigation/>
        </NavigationContainer>
    );
}

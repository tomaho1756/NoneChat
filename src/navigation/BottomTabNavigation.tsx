import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { WorkSpaceScreen } from "../screen/view/chat/WorkSpaceScreen.tsx";
import { HomeStack } from "./StackNavigation.tsx";

const Tab = createBottomTabNavigator();

export const BottomTabNavigation = () => {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeStack}></Tab.Screen>
            <Tab.Screen name="WorkSpace" component={WorkSpaceScreen}></Tab.Screen>
        </Tab.Navigator>
    )
}

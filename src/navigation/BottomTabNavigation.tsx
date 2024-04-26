import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { WorkSpaceScreen } from "../screen/view/chat/WorkSpaceScreen.tsx";
import { HomeStack } from "./StackNavigation.tsx";
import { SettingScreen } from "../screen/view/other/SettingScreen.tsx";

const Tab = createBottomTabNavigator();

export const BottomTabNavigation = () => {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="WorkSpace" component={WorkSpaceScreen} options={{headerShown: false}}></Tab.Screen>
            <Tab.Screen name="Home" component={HomeStack} options={{headerShown: false}}></Tab.Screen>
            <Tab.Screen name="Setting" component={SettingScreen} options={{headerShown: false}}></Tab.Screen>
        </Tab.Navigator>
    )
}

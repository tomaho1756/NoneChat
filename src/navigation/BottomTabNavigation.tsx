import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SelectWorkSpaceStack} from "./StackNavigation.tsx";
import { SettingScreen } from "../screen/view/other/SettingScreen.tsx";
import { MainScreen } from "../screen/view/user/MainScreen.tsx";

const Tab = createBottomTabNavigator();


export const BottomTabNavigation = () => {
    return (
        <Tab.Navigator initialRouteName="ChattingRoomStack" screenOptions={{headerShown: false}}>
            <Tab.Screen name="Main" component={MainScreen} options={{tabBarLabel : "메인"}}></Tab.Screen>
            <Tab.Screen name="ChattingRoomStack" component={SelectWorkSpaceStack} options={{tabBarLabel : "채팅"}}></Tab.Screen>
            <Tab.Screen name="Setting" component={SettingScreen} options={{tabBarLabel : "설정"}}></Tab.Screen>
        </Tab.Navigator>
    )
}

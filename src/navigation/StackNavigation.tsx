import { createStackNavigator } from "@react-navigation/stack";
import { LogInScreen } from "../screen/auth/LogInScreen.tsx";
import { SignUpScreen } from "../screen/auth/SignUpScreen.tsx";
import { MainScreen } from "../screen/view/user/MainScreen.tsx";
import { WorkSpaceScreen } from "../screen/view/chat/WorkSpaceScreen.tsx";
import { ChattingRoomScreen } from "../screen/view/chat/ChattingRoomScreen.tsx";
import { FoundWorkSpaceScreen } from "../screen/view/chat/FoundWorkSpaceScreen.tsx";

const Stack = createStackNavigator();

export const SelectWorkSpaceStack = () => {
    return (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LogInScreen} options={{headerShown: false}} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen name="WorkSpace" component={WorkSpaceScreen} options={{headerShown: false}} />
        <Stack.Screen name="FoundWorkSpace" component={FoundWorkSpaceScreen} options={{headerShown: false}} />
        <Stack.Screen name="ChattingRoom" component={ChattingRoomScreen} options={{headerShown: false}}/>
    </Stack.Navigator>)
    
}


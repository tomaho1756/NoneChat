import { createStackNavigator } from "@react-navigation/stack";
import { LogInScreen } from "../screen/auth/LogInScreen/LogInScreen.tsx";
import { SignInScreen } from "../screen/auth/SignInScreen.tsx";
import { MainScreen } from "../screen/view/user/MainScreen.tsx";

const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LogInScreen} options={{headerShown: false}} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}}/>
    </Stack.Navigator>)
    
}

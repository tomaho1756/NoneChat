import {
    Alert,
    Button,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { isPasswordValid } from "./isPasswordValid.ts";
import store from "../../state/store.ts";
import { useLogIn } from "../../component/action/AuthAction.tsx";
import { MainStackNavigationList } from "../../type/global/navigationType.ts";
import { NavigationProp } from "@react-navigation/native";

export const LogInScreen : React.FC<{navigation : NavigationProp<MainStackNavigationList>}> = ({navigation}) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const [isLoading, setLogIn] = useLogIn()
    
    const emailRef = useRef<TextInput>(null);
    const pwRef = useRef<TextInput>(null);
    const {errorMessage, isLogIn} = store.auth.getState()
    
    useEffect(() => {
        if (!isLoading) {
            if (isLogIn) {
                Alert.alert("성공", "로그인이 완료되었습니다", [{text : "확인", onPress: () => {
                        navigation.navigate("WorkSpace");
                        store.screen.setState({currentScreen : "WorkSpace"})
                    } }]);
            } else {
                if (`${errorMessage}`.includes("MEMBER-001")) {
                    Alert.alert("경고", "계정이 존재하지 않습니다", [{ text: "확인"}]);
                }
                else if (`${errorMessage}`.includes("LOGIN-001") || `${errorMessage}`.includes("LOGIN-003")) {
                    Alert.alert("경고", "다시 로그인해 주세요", [{ text: "확인"}]);
                }
                else if (`${errorMessage}`.includes("LOGIN-002")) {
                    Alert.alert("경고", "비밀번호가 일치하지 않습니다", [{ text: "확인", onPress: () => pwRef.current?.focus() }]);
                }
            }
        } else {
            console.log("loading...")
        }
    }, [isLoading]);
    
    const textEnterEdit = ({ type }: { type: number }) => {
        if (email.length === 0) {
            Alert.alert("경고", "이메일을 입력해주세요", [{ text: "확인", onPress: () => emailRef.current?.focus() }]);
        } else if (!email.includes("@") && type === 1) {
            Alert.alert("경고", "올바른 이메일 형식을 지켜주세요", [{ text: "확인", onPress: () => emailRef.current?.focus() }]);
        } else if (password.length === 0) {
            Alert.alert("경고", "비밀번호를 입력해주세요", [{ text: "확인", onPress: () => pwRef.current?.focus() }]);
        } else if (!isPasswordValid(password)[0]) {
            switch (isPasswordValid(password)[1]) {
                case 0 : {
                    Alert.alert("경고", "비밀번호는 8자 이상입니다", [{ text: "확인", onPress: () => pwRef.current?.focus() }]);
                    break
                }
                case 1 : {
                    Alert.alert("경고", "비밀번호는 대문자를 포함해야 합니다", [{ text: "확인", onPress: () => pwRef.current?.focus() }]);
                    break
                }
                case 2 : {
                    Alert.alert("경고", "비밀번호는 특수기호를 포함해야 합니다", [{ text: "확인", onPress: () => pwRef.current?.focus() }]);
                    break
                }
                default : {
                    console.log("error");
                    break
                }
                
            }
        } else {
            setLogIn({ email, password })
        }
    };
    
    return (
        <SafeAreaView style={{flex : 1}}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <Text style={styles.title}>None Chat</Text>
                    <View>
                        <TextInput
                            autoComplete={"off"}
                            enablesReturnKeyAutomatically
                            inputMode="email"
                            ref={emailRef}
                            style={styles.textInput}
                            placeholder={"email@example.com"}
                            autoCapitalize="none"
                            autoFocus={true}
                            onChangeText={input => {
                                setEmail(input);
                            }}
                            onSubmitEditing={() => {
                                textEnterEdit({ type: 1 });
                            }}
                        />
                        <TextInput
                            enablesReturnKeyAutomatically
                            ref={pwRef}
                            style={[styles.textInput,{marginBottom:25}]}
                            placeholder={"Password!"}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoComplete={"off"}
                            clearTextOnFocus={true}
                            onChangeText={input => {
                                setPassword(input);
                            }}
                            onSubmitEditing={() => {
                                textEnterEdit({ type: 0 });
                            }}
                        />
                        <Button title={"로그인"} onPress={() => {
                            textEnterEdit({ type: 1 });
                        }}/>
                        <Button title={"계정이 없으신가요?"} onPress={() => {
                            navigation.navigate("SignUp");
                            store.screen.setState({currentScreen : "SignUp"});
                        }}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFEFEF",
        alignItems: "center",
        paddingTop: 20,
    },
    title : {
        fontSize: 30,
        fontWeight: "600",
        marginBottom: 80,
    },
    textInput: {
        width: 320,
        height: 50,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        padding : 15,
        marginTop: 15,
        marginBottom: 15,
    }
})

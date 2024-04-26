import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useRef, useState } from "react";
import { isPasswordValid } from "./isPasswordValid.ts";
import { setLogIn } from "../../../component/action/AuthAction.tsx";

export const LogInScreen = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const emailRef = useRef<TextInput>(null);
    const pwRef = useRef<TextInput>(null);
    
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
                    Alert.alert("경고", "비밀번호는 특시기호를 포함해야 합니다", [{ text: "확인", onPress: () => pwRef.current?.focus() }]);
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
            <View style={styles.container}>
                <Text style={styles.title}>None Chat</Text>
                <View>
                    <TextInput
                        ref={emailRef}
                        style={styles.textInput}
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
                        ref={pwRef}
                        style={styles.textInput}
                        autoCapitalize="none"
                        clearTextOnFocus={true}
                        onChangeText={input => {
                            setPassword(input);
                        }}
                        onSubmitEditing={() => {
                            textEnterEdit({ type: 0 });
                        }}
                    />
                    <Button title={"test"} onPress={() => {
                        textEnterEdit({ type: 1 });
                    }}/>
                </View>
            </View>
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
        marginBottom: 30,
    },
    textInput: {
        width: 300,
        height: 40,
        backgroundColor: "#FFFFFF",
        marginTop: 30
    }
})

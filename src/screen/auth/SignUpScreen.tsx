import {
    Alert,
    Button,
    Keyboard,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { isPasswordValid } from "./isPasswordValid.ts";
import DatePicker from "react-native-date-picker";
import { sendEmail, useEmailVerify, useSignUp } from "../../component/action/AuthAction.tsx";
import { MainStackNavigationList } from "../../type/global/navigationType.ts";
import { NavigationProp } from "@react-navigation/native";
import store from "../../state/store.ts";

export const SignUpScreen : React.FC<{navigation : NavigationProp<MainStackNavigationList>}> = ({navigation}) => {
    const [email, setEmail] = useState<string>("");
    const [emailCode, setEmailCode] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [birth, setBirth] = useState<Date>(new Date(2000, 0, 1));
    const [openBirth, setOpenBirth] = useState<boolean>(false)
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false)
    
    const [verifyToken, checkVerify] = useEmailVerify()
    const [isLoading, error, setSignup] = useSignUp()
    
    const nameRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const codeRef = useRef<TextInput>(null);
    const pwRef = useRef<TextInput>(null);
    
    useEffect(() => {
        if (verifyToken == "err") {
            Alert.alert("경고", "인증코드가 다릅니다", [{ text: "확인", onPress: () => {
                    codeRef.current?.focus();
                    setIsEmailVerified(false)
                }}]);
        }
        else if (verifyToken != "") {
            Alert.alert("성공", "인증이 완료되었습니다", [{text : "확인", onPress: () => setIsEmailVerified(true)}]);
        }
    }, [verifyToken]);
    
    useEffect(() => {
        if(name.length != 0) {
            if (!isLoading) {
                if (error == "[Error : MEMBER-002]") {
                    Alert.alert("경고", "이메일의 유저가 존재합니다.", [{text : "확인"}]);
                }
                else if (error == "[Error : EMAIL-003]") {
                    Alert.alert("경고", "이메일과 코드가 맞지 않습니다", [{text : "확인", onPress: () => emailRef.current?.focus()}]);
                }
                else if (error == "[Error : EMAIL-002]") {
                    Alert.alert("경고", "이메일이 존재하지 않습니다.", [{text : "확인", onPress: () => emailRef.current?.focus()}]);
                }
                else if (error == "") {
                    Alert.alert("성공", "회원가입이 완료되었습니다", [{text : "확인", onPress: () => {
                            navigation.navigate("Login");
                            store.screen.setState({currentScreen : "LogIn"})
                        }}]);
                }
            }
        }
    }, [isLoading]);
    
    const textEnterEdit = ({ type }: { type: number }) => {
        if (type == 0) {
            if (email.length == 0) {
                Alert.alert("경고", "이메일을 입력해주세요", [{text : "확인", onPress : () => emailRef.current?.focus()}]);
            }
            else if (!email.includes("@")) {
                Alert.alert("경고", "올바른 이메일 형식을 지켜주세요", [{ text: "확인", onPress: () => emailRef.current?.focus() }]);
            }
            else {
                Alert.alert("성공", "인증번호가 전송되었습니다", [{text : "확인", onPress : () => {sendEmail(email)}}]);
            }
        }
        else if (type == 1) {
            
            if (emailCode.length != 6) {
                Alert.alert("경고", "인증코드는 6자입니다", [{ text: "확인", onPress: () => codeRef.current?.focus() }]);
            }else {
                checkVerify(emailCode)
            }
            
        }
        else if (type == 2) {
            if (!isPasswordValid(password)[0]) {
                switch (isPasswordValid(password)[1]) {
                    case 0 : {
                        Alert.alert("경고", "비밀번호는 8자 이상입니다", [{ text: "확인", onPress: () => pwRef.current?.focus() }]);
                        break
                    }
                    case 1 : {
                        Alert.alert("경고", "비밀번호는 대문자를 포함해야 합니다", [{
                            text: "확인",
                            onPress: () => pwRef.current?.focus()
                        }]);
                        break
                    }
                    case 2 : {
                        Alert.alert("경고", "비밀번호는 특수기호를 포함해야 합니다", [{
                            text: "확인",
                            onPress: () => pwRef.current?.focus()
                        }]);
                        break
                    }
                    default : {
                        console.log("error");
                        break
                    }
                }
            }
        }
        else if (type == 3) {
            if (name.length == 0) {
                Alert.alert("경고", "이름을 입력해주세요", [{text : "확인", onPress : () => nameRef.current?.focus()}]);
            }
            else if (email.length == 0) {
                Alert.alert("경고", "이메일을 입력해주세요", [{text : "확인", onPress : () => emailRef.current?.focus()}]);
            }
            else if (!isEmailVerified) {
                Alert.alert("경고", "이메일을 인증해주세요", [{text : "확인", onPress : () => codeRef.current?.focus()}]);
            }
            else if (password.length == 0) {
                Alert.alert("경고", "비밀번호를 입력해주세요", [{text : "확인", onPress : () => pwRef.current?.focus()}]);
            }
            else {
                setSignup({name, email, password, birth :`${birth.getFullYear()}-${birth.getMonth()}-${birth.getDate()}`, verifyToken})
            }
            
        }
       
    };
    
    return (
        <SafeAreaView style={{flex : 1}}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <DatePicker
                        modal
                        open={openBirth}
                        date={birth}
                        mode="date"
                        onConfirm={(date) => {
                            setOpenBirth(false)
                            setBirth(date)
                        }}
                        onCancel={() => {
                            setOpenBirth(false)
                        }}
                    />
                    <Text style={styles.title}>None Chat</Text>
                    <TextInput
                        enablesReturnKeyAutomatically
                        ref={nameRef}
                        style={[styles.textInput]}
                        placeholder={"name"}
                        autoFocus={true}
                        autoCapitalize="none"
                        onChangeText={input => {
                            setName(input);
                        }}
                    />
                    <View style={[styles.textInput,{padding : 0, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', backgroundColor: '#FFFFFF'}]}>
                        <Button title={"생년월일"} onPress={() => setOpenBirth(true)}></Button>
                        <Text style={{fontSize : 20, fontWeight : "400"}}>{`|`}</Text>
                        <Text style={{fontSize : 16, fontWeight : "500"}}>{`${birth.getFullYear()}/${birth.getMonth()+1}/${birth.getDate()}`}</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <TextInput
                            ref={emailRef}
                            style={[styles.textInput,{width: 250, marginBottom:-5}]}
                            placeholder={"email@example.com"}
                            autoCapitalize="none"
                            onChangeText={input => {
                                setEmail(input);
                            }}
                        />
                        <View style={{width : 50, marginBottom:-12.5}}>
                            <Button title={"인증"} onPress={() => textEnterEdit({ type: 0 })}></Button>
                        </View>
                    
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <TextInput
                            ref={codeRef}
                            style={[styles.textInput,{width: 250}]}
                            placeholder={"code"}
                            autoCapitalize="none"
                            clearTextOnFocus={true}
                            onChangeText={input => {
                                setEmailCode(input);
                            }}
                        />
                        <View style={{width : 50, marginBottom:-12.5}}>
                            <Button title={"확인"} onPress={() => textEnterEdit({ type: 1 })}></Button>
                        </View>
                    </View>
                    <TextInput
                        ref={pwRef}
                        style={[styles.textInput,{marginBottom:25}]}
                        placeholder={"password"}
                        autoCapitalize="none"
                        clearTextOnFocus={true}
                        onChangeText={input => {
                            setPassword(input);
                        }}
                        onSubmitEditing={() => {
                            textEnterEdit({ type: 2 });
                        }}
                    />
                    <Button title={"회원가입하기"} onPress={() => {
                        textEnterEdit({ type: 3 });
                    }}/>
                    <Button title={"로그인으로 돌아가기"} onPress={() => {
                        navigation.navigate("Login");
                        store.screen.setState({currentScreen : "LogIn"})
                    }}/>
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
        width: 300,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        padding : 15,
        marginTop: 15,
        marginBottom: 10,
    }
})

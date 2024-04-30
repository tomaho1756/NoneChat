import { MainStackNavigationList } from "../../../type/global/navigationType.ts";
import {
    Alert,
    Button,
    Dimensions,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
//@ts-ignore
import BottomSheet from "react-native-gesture-bottom-sheet";
import { CreateRoomBottomSheet } from "../../bottomSheet/CreateRoomBottomSheet.tsx";
import React, { useRef } from "react";
import store from "../../../state/store.ts";
import { useJoinAskWorkSpace, useSearchWorkSpace } from "../../../component/action/WorkSpaceAction.tsx";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;


export const FoundWorkSpaceScreen : React.FC<{navigation :NavigationProp<MainStackNavigationList> }> = ({navigation}) => {
    const [searchWorkSpace] = useSearchWorkSpace();
    const [joinAskWorkSpace] = useJoinAskWorkSpace();
    
    const {workSpaceList} = store.workSpace(state => state)
    
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [searchCode, setSearchCode] = React.useState("");
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TextInput
                    placeholder={"예) : ag124D"}
                    onChangeText={(text) => {setSearchCode(text)}}
                    style={styles.searchTextInput}
                ></TextInput>
                <Button title={"방 검색하기"} onPress={() => {
                    searchWorkSpace({ workspaceCode: searchCode });
                    console.log("workSpaceList :" ,workSpaceList);
                }}></Button>
                {
                    workSpaceList?.length != 0 ?
                        <Pressable style={styles.workSpaceFrame} onPress={() => {
                            console.log("test")
                        }}>
                            <Image style={styles.workSpaceImage} src={
                                workSpaceList?.[0].workspaceImageUrl
                            }/>
                            <Text style={styles.workSpaceText}>{
                                workSpaceList?.[0].workspaceName
                            }</Text>
                            <Text style={styles.workSpaceText}>{
                                workSpaceList?.[0].studentCount
                            }</Text>
                            <Text style={styles.workSpaceText}>{
                                workSpaceList?.[0].teacherCount
                            }</Text>
                            <Pressable style={styles.joinWorkSpace} onPress={() => {
                                Alert.alert("어떤 역할로 요청할까요?", "", [{text : "학생", onPress : () => {joinAskWorkSpace({workspaceId : `${workSpaceList?.[0].workspaceId}`, workspaceCode: searchCode, role : "STUDENT"})}},{text : "선생님", onPress : () => {joinAskWorkSpace({workspaceId : `${workSpaceList?.[0].workspaceId}`, workspaceCode: searchCode, role : "TEACHER"})}}],)
                            }}>
                                <Text style={{color : "blue"}}>참가 요청</Text>
                            </Pressable>
                        </Pressable> : null
                }
                <BottomSheet hasDraggableIcon ref={bottomSheetRef} height={Height/1.3}>
                    <CreateRoomBottomSheet></CreateRoomBottomSheet>
                </BottomSheet>
                <Button title={"워크스페이스 만들기"} onPress={() => {bottomSheetRef.current.show()}}></Button>
                <Button title={"돌아가기"} onPress={() => {
                    store.screen.setState({currentScreen : "WorkSpace"})
                    navigation.goBack()
                }}/>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        width: Width,
        height: "100%",
        alignItems: "center",
        paddingTop: Height / 20,
    },
    searchTextInput : {
        width: "80%",
        height: Height/15,
        backgroundColor: "#FFFFFF",
        borderRadius: Width / 30,
        paddingLeft: Width / 25,
        marginBottom: Height/50,
    },
    workSpaceFrame : {
        width: "85%",
        height: Height / 12,
        backgroundColor: "#EEEEEE",
        marginTop: Height / 200,
        marginBottom: Height / 200,
        borderRadius: Width / 35,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        overflow: "hidden",
    },
    workSpaceText : {
        fontSize : Width / 25,
        fontWeight: "500",
    },
    workSpaceImage : {
        width: Width / 7,
        height: Width / 7,
    },
    joinWorkSpace : {
        position: "absolute",
        marginLeft: Width / 1.72,
        width : Width / 5,
        height : Width / 5,
        backgroundColor : "#AAAAF0",
        alignItems: "center",
        justifyContent: "center",
    }
})

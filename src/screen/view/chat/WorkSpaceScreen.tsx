import {
    Dimensions,
    FlatList, Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
//@ts-ignore
import BottomSheet from "react-native-gesture-bottom-sheet"
import {
    useDeleteWorkSpace,
    useGetWorkSpace,
    useGetWorkSpaceCode
} from "../../../component/action/WorkSpaceAction.tsx";
import React, { Fragment, useEffect, useRef } from "react";
import store from "../../../state/store.ts";
import { MainStackNavigationList } from "../../../type/global/navigationType.ts";
import { NavigationProp } from "@react-navigation/native";
import { JoinWaitListBottomSheet } from "../../bottomSheet/JoinWaitListBottomSheet.tsx";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

export const WorkSpaceScreen : React.FC<{navigation : NavigationProp<MainStackNavigationList>}> = ({navigation}) => {

    const [isLoading, getWorkSpaceList] = useGetWorkSpace();
    const [deleteWorkSpace] = useDeleteWorkSpace()
    const [getWorkSpaceCode] = useGetWorkSpaceCode()

    const [refreshScreen, setRefreshScreen] = React.useState(true);

    const {workSpaceList} = store.workSpace.getState();
    const {currentScreen} = store.screen(state => state)


    useEffect(() => {
        if (refreshScreen) {
            getWorkSpaceList();
        }
    }, [refreshScreen]);

    useEffect(() => {
        if (refreshScreen) {
            if (!isLoading) {
                console.log(workSpaceList);
                setRefreshScreen(false);
            } else {
                console.log("Loading...")
            }
        }

    }, [isLoading]);

    useEffect(() => {
        if (currentScreen === "WorkSpace"){
            setRefreshScreen(true)
        }
    }, [currentScreen]);

    const bottomSheetRef = useRef<BottomSheet>(null);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <BottomSheet hasDraggableIcon ref={bottomSheetRef} height={Height / 1.3}>
                    <JoinWaitListBottomSheet></JoinWaitListBottomSheet>
                </BottomSheet>
                <View style={styles.header}>
                    <Pressable style={{width : 60, height : 60}} onPress={() => bottomSheetRef.current?.show()}>
                        <Text style={{fontSize : 30, color : "#505050" }}>+</Text>
                    </Pressable>
                </View>
                {workSpaceList && workSpaceList.length > 0 ? (
                    <FlatList
                        onMomentumScrollEnd={() => setRefreshScreen(true)}
                        scrollEnabled={true}
                        style={styles.content}
                        data={workSpaceList}
                        renderItem={({ item }) => (
                            <Fragment>
                                <Pressable style={styles.workSpaceFrame} onPress={() => {getWorkSpaceCode({workspaceId : `${item.workspaceId}`
                                })}}>
                                    <Image style={styles.workSpaceImage} src={item.workspaceImageUrl}/>
                                    <Text style={styles.workSpaceText}>{item.workspaceName}</Text>
                                    <Text style={styles.workSpaceText}>{item.studentCount}</Text>
                                    <Text style={styles.workSpaceText}>{item.teacherCount}</Text>
                                    <Pressable style={styles.deleteWorkSpace} onPress={() => {
                                        deleteWorkSpace({workspaceId : `${item.workspaceId}`})
                                        setRefreshScreen(true);
                                    }}>
                                        <Text style={{color : "red"}}>삭제</Text>
                                    </Pressable>
                                </Pressable>
                            </Fragment>
                        )}
                    >
                    </FlatList>
                ) : (
                    <ScrollView onMomentumScrollEnd={() => setRefreshScreen(true)} style={styles.content}>
                        <Text style={{marginTop : -100, position : "absolute", alignSelf :"center", fontSize : 15, color : "#177bff", fontWeight : "500"}}>새로고침</Text>
                        <Pressable onPress={() => {
                            navigation.navigate("FoundWorkSpace")
                            store.screen.setState({currentScreen: "FoundWorkSpace"})
                        }} style={[styles.workSpaceFrame,{flexDirection: "column", justifyContent: "center"}]}>
                            <Text style={styles.workSpaceText}>워크스페이스가 존재하지 않습니다</Text>
                        </Pressable>
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Width,
        height:Height * 1.5,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    header : {
        width: "85%",
        height: "4%",
        borderBottomWidth: 1.5,
        marginBottom: Height / 30,
        flexDirection: "row",
    },
    content : {
        width:"100%",
        height:"96%",
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
    deleteWorkSpace : {
        position: "absolute",
        marginLeft: Width / 1.72,
        width : Width / 5,
        height : Width / 5,
        backgroundColor : "#F0AAAA",
        alignItems: "center",
        justifyContent: "space-around",
    }
})

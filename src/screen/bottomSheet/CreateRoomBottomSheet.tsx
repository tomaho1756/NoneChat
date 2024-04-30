import {
    Alert, Button,
    Dimensions,
    FlatList,
    Image, Keyboard,
    ListRenderItemInfo,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import React, { Fragment, useEffect } from "react";
import store from "../../state/store.ts";
import { useMakeWorkSpace } from "../../component/action/WorkSpaceAction.tsx";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;


export const CreateRoomBottomSheet = () => {
    const [workSpaceImageUrl, setWorkSpaceUrl] = React.useState("https://i.pinimg.com/564x/09/60/68/096068a59290b730d6744f796f0b9781.jpg");
    const [workSpaceTitle, setWorkSpaceTitle] = React.useState("");
    const [makeWorkSpace] = useMakeWorkSpace()
    const roomImg = [
        "https://img.freepik.com/premium-photo/a-pale-pink-background-with-a-pink-square-that-says-i-love-you_444663-50.jpg",
        "https://i.pinimg.com/564x/dc/08/ac/dc08acce79d5ff6444e67797dcacab7c.jpg",
        "https://i.pinimg.com/564x/e0/26/d4/e026d4f6351d925a132b182cf7d585e1.jpg",
        "https://i.pinimg.com/564x/a1/90/0f/a1900f1f8ec4d635163df782c015ae0c.jpg",
        "https://i.pinimg.com/564x/25/b8/f1/25b8f15f5912ef4e3ec61272bcd82500.jpg",
    ]
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>워크스페이스 만들기</Text>
            <View style={styles.content}>
                <TextInput style={styles.selectTitle}
                           placeholder={"워크스페이스 제목"}
                           
                           onChangeText={(text) => setWorkSpaceTitle(text)}
                />
                <View style={styles.selectImageFrame}>
                    <FlatList horizontal={true} style={{width : Width * 10}} data={roomImg} renderItem={(item : ListRenderItemInfo<string>) => (
                        <Fragment>
                            <Pressable style={styles.selectImage} onPress={() => {
                                setWorkSpaceUrl(item.item);
                                Alert.alert("완료", "배경화면이 선택되었습니다", [{text : "확인"}])
                            }}>
                                <Image style={{width : "100%", height : "100%"}} src={`${item.item}`}></Image>
                            </Pressable>
                        </Fragment>
                    )}></FlatList>
                    <Pressable style={styles.selectImage} onPress={() => {
                    
                    }}>
                        <Text style={{fontSize : Width/30}}>직접 선택하기</Text>
                    </Pressable>
                </View>
                <View style={{width:"100%", height : Height / 10, marginTop : -Height/30}}>
                    <Button title={"워크스페이스 만들기"} onPress={() => {
                        if(workSpaceTitle.length >= 2) {
                            console.log(workSpaceImageUrl,workSpaceTitle)
                            makeWorkSpace({workspaceName: workSpaceTitle, workspaceImageUrl : workSpaceImageUrl})
                        } else {
                            Alert.alert("경고", '이름은 2글자 이상이여야 합니다')
                        }
                        
                    }}></Button>
                </View>
                
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width : "100%",
        height : "100%",
        paddingTop: Height / 20,
        alignItems: "center",
    },
    title : {
        fontSize: Width / 20,
        fontWeight: "600",
        marginBottom: Height/50,
    },
    content : {
        width: "90%",
        height: "75%",
        backgroundColor: "#FFFFFF",
        borderRadius: Width / 30,
        padding : Width / 25,
    },
    selectImageFrame: {
        width: "100%",
        height: "60%",
        flexDirection: "row",
    },
    selectImage : {
        width : Width / 5,
        height : Height / 10,
        marginLeft : Width/20,
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "#DDDDDD",
        borderRadius: Width / 50,
        overflow: "hidden",
        alignItems: "center",
        borderWidth : 1,
    },
    selectTitle : {
        marginTop : Height / 25,
        width : "89%",
        height : Height / 16,
        paddingLeft : Width / 17,
        backgroundColor: "#F8F8F8",
        borderRadius: Width / 50,
        alignSelf: "center",
    }
})

import { Button, FlatList, View } from "react-native";
import { useAcceptJoinWorkSpace, useGetJoinWait } from "../../component/action/WorkSpaceAction.tsx";

export const JoinWaitListBottomSheet = () => {
    const [getJoinWaitList] = useGetJoinWait()
    const [acceptJoin] = useAcceptJoinWorkSpace()
    //oHw30a -6630ca70cafe5e083ca89975
    //xT5z08 - 6630ca73cafe5e083ca89976
    return (
        <View style={{width:'100%',height:'100%'}}>
            
            {/*<FlatList data={} renderItem={}></FlatList>*/}
            
            <Button title={"test"} onPress={() => {getJoinWaitList({workspaceId : "6630ca73cafe5e083ca89976", role : "STUDENT"})}}></Button>
        </View>
    )
}

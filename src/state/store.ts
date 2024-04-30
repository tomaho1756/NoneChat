import { create, SetState, StoreApi, UseBoundStore } from "zustand";
import { Dispatch, SetStateAction } from "react";
import { Dimensions } from "react-native";

interface ScreenStateType {
    currentScreen: string;
    bottomSheetHeight : number;
}

interface UserStateType {
    email: string;
    password: string;
    name: string;
    id: string;
    birth : string;
}

interface AuthStateType {
    accessToken: string;
    refreshToken: string;
    isLogIn: boolean;
    errorMessage: string;
}

export interface workSpaceListItemType {
    workspaceId?: string,
    workspaceName?: string,
    workspaceImageUrl?: string,
    studentCount?: number,
    teacherCount?: number
}

export interface joinWaitListItemType{
    role : string,
    workspaceId: string,
}
export interface askWaitListItemType {
    workspaceId: string,
    workspaceName: string,
}

interface WorkSpaceStateType {
    workSpaceId : string;
    workSpaceName : string;
    workSpaceUrl : string;
    studentCount? : number;
    teacherCount? : number;
    workSpaceList? : workSpaceListItemType[];
    joinWaitList ? : [];
    askWaitList ? : [];
}

interface StoreStateType {
    screen: UseBoundStore<StoreApi<ScreenStateType>>;
    user: UseBoundStore<StoreApi<UserStateType>>;
    auth: UseBoundStore<StoreApi<AuthStateType>>;
    workSpace: UseBoundStore<StoreApi<WorkSpaceStateType>>;
}
const Height = Dimensions.get("window").height;
const store : StoreStateType = {
        screen: create<ScreenStateType>((set: SetState<ScreenStateType>) => ({
            currentScreen: "LogIn",
            bottomSheetHeight : Height / 2,
        })),
        user: create<UserStateType>((set: SetState<UserStateType>) => ({
            email: "",
            password: "",
            name: "",
            id: "",
            birth: "",
        })),
        auth: create<AuthStateType>((set: SetState<AuthStateType>) => ({
            accessToken: "",
            refreshToken: "",
            isLogIn: false,
            errorMessage: "",
        })),
        workSpace: create<WorkSpaceStateType>((set: SetState<WorkSpaceStateType>) => ({
            workSpaceId: "",
            workSpaceName: "",
            workSpaceUrl: "",
            studentCount: 0,
            teacherCount: 0,
            workSpaceList : [],
        }))
}
export default store;

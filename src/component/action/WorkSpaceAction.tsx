import {getUrl} from "../../config/server.ts"
import { responseJsonType } from "../../type/global/responceType.ts";
import store, { workSpaceListItemType } from "../../state/store.ts";
import React from "react";
import axios, { AxiosResponse } from "axios";

export const useGetWorkSpace = () => {
    const {accessToken} = store.auth.getState();
    const [isLoading, setIsLoading] = React.useState(false);
    
    const getWorkSpaceList = async () : Promise<void> => {
        setIsLoading(true);
        
        try {
            const response = await axios.get(
                `${getUrl(0, "workspace/")}`,
                {
                    headers : {
                        "Content-Type": "application/json",
                        authorization: accessToken,
                    }
            });
            
            
            if (response.status != 200) {
                throw new Error(response.data.state);
            }
            console.log(response.data);
            const data : workSpaceListItemType[] = response.data.data
            store.workSpace.setState({ workSpaceList : data })
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false)
        }
    }
    return [isLoading ,getWorkSpaceList] as const;
}

export const useMakeWorkSpace = () => {
    const {accessToken} = store.auth.getState()
    const [isLoading, setIsLoading] = React.useState(false);
    
    const makeWorkSpace = async ({workspaceName, workspaceImageUrl} : {workspaceName : string, workspaceImageUrl : string}) : Promise<void> => {
        setIsLoading(true);
        
        try {
            const response = await axios.post(
                `${getUrl(0, "workspace/")}`,
                {
                    workspaceName : workspaceName,
                    workspaceImageUrl : workspaceImageUrl,
                },
                {
                    headers : {
                        "Content-Type": "application/json",
                        authorization : accessToken,
                    },
                    
                }
            )
            console.log(response)
            setIsLoading(false);
        } catch (error : any) {
            if (error.response) {
                // 서버로부터의 응답이 있을 때
                console.log("Server Error Response:", error.response.data);
                console.log("Status Code:", error.response.status);
                console.log("Headers:", error.response.headers);
            } else if (error.request) {
                // 요청이 만들어졌으나 응답을 받지 못한 경우
                console.log("Request Error:", error.request);
            } else {
                // 오류가 발생하여 요청 자체를 만들지 못한 경우
                console.log("Error:", error.message);
            }
            console.log("Error Config:", error.config);
            setIsLoading(false);
        }
    }
    return [makeWorkSpace, isLoading] as const;
}
export const useDeleteWorkSpace = () => {
    const {accessToken} = store.auth.getState()
    const [isLoading, setIsLoading] = React.useState(false);
    const deleteWorkSpace = async ({workspaceId} : {workspaceId : string}) : Promise<void> => {
        setIsLoading(true);
        
        try {
            console.log(getUrl(0,`${workspaceId}`));
            const response = await axios.delete(
                `${getUrl(0, `workspace/${workspaceId}`)}`,
                {
                    headers : {
                        "Content-Type": "application/json",
                        authorization : accessToken,
                    },
                    
                }
            )
            console.log(response)
            setIsLoading(false);
        } catch (error : any) {
            if (error.response) {
                // 서버로부터의 응답이 있을 때
                console.log("Server Error Response:", error.response.data);
                console.log("Status Code:", error.response.status);
                console.log("Headers:", error.response.headers);
            } else if (error.request) {
                // 요청이 만들어졌으나 응답을 받지 못한 경우
                console.log("Request Error:", error.request);
            } else {
                // 오류가 발생하여 요청 자체를 만들지 못한 경우
                console.log("Error:", error.message);
            }
            console.log("Error Config:", error.config);
            setIsLoading(false)
        }
    }
    return [deleteWorkSpace, isLoading] as const;
}

export const useGetWorkSpaceCode =() => {
    
    const {accessToken} = store.auth.getState()
    const [isLoading, setIsLoading] = React.useState(false);
    
    const getWorkSpaceCode = async ({workspaceId} : {workspaceId : string}): Promise<void> => {
        setIsLoading(true);
        
        try {
            const response = await axios.get(
                `${getUrl(0, `workspace/code/${workspaceId}`)}`,
                {
                    headers : {
                        "Content-Type": "application/json",
                        authorization: accessToken,
                    }
                });
            
            
            if (response.status != 200) {
                throw new Error(response.data.state);
            }
            console.log(response.data);
            setIsLoading(false);
        } catch (error : any) {
            if (error.response) {
                // 서버로부터의 응답이 있을 때
                console.log("Server Error Response:", error.response.data);
                console.log("Status Code:", error.response.status);
                console.log("Headers:", error.response.headers);
            } else if (error.request) {
                // 요청이 만들어졌으나 응답을 받지 못한 경우
                console.log("Request Error:", error.request);
            } else {
                // 오류가 발생하여 요청 자체를 만들지 못한 경우
                console.log("Error:", error.message);
            }
            console.log("Error Config:", error.config);
            setIsLoading(false)
        }
    }
    return [getWorkSpaceCode, isLoading] as const;
}
export const useSearchWorkSpace = () => {
    const {accessToken} = store.auth.getState()
    const [isLoading, setIsLoading] = React.useState(false);
    
    const searchWorkSpaceCode = async ({workspaceCode} : {workspaceCode : string}): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${getUrl(0, `workspace/${workspaceCode}`)}`,
                {
                    headers : {
                        "Content-Type": "application/json",
                        authorization: accessToken,
                    }
                });
            
            store.workSpace.setState({workSpaceList: [response.data.data]});
            setIsLoading(false);
        } catch (error : any) {
            if (error.response) {
                // 서버로부터의 응답이 있을 때
                console.log("Server Error Response:", error.response.data);
                console.log("Status Code:", error.response.status);
                console.log("Headers:", error.response.headers);
            } else if (error.request) {
                // 요청이 만들어졌으나 응답을 받지 못한 경우
                console.log("Request Error:", error.request);
            } else {
                // 오류가 발생하여 요청 자체를 만들지 못한 경우
                console.log("Error:", error.message);
            }
            console.log("Error Config:", error.config);
            setIsLoading(false)
        }
    }
    return [searchWorkSpaceCode, isLoading] as const;
}

export const useJoinAskWorkSpace = () => {
    const {accessToken} = store.auth.getState()
    const [isLoading, setIsLoading] = React.useState(false);
    
    const joinAskWorkSpace = async ({workspaceId, workspaceCode, role} : {workspaceId : string, workspaceCode : string, role : string}): Promise<void> => {
        try {
            const response = await axios.post(
                `${getUrl(0, "workspace/join")}`,
                {
                    workspaceId : workspaceId,
                    workspaceCode : workspaceCode,
                    role : role,
                },
                {
                    headers : {
                        "Content-Type": "application/json",
                        authorization : accessToken,
                    },
                    
                }
            )
            console.log(response)
            setIsLoading(false);
        } catch (error : any) {
            if (error.response) {
                // 서버로부터의 응답이 있을 때
                console.log("Server Error Response:", error.response.data);
                console.log("Status Code:", error.response.status);
                console.log("Headers:", error.response.headers);
            } else if (error.request) {
                // 요청이 만들어졌으나 응답을 받지 못한 경우
                console.log("Request Error:", error.request);
            } else {
                // 오류가 발생하여 요청 자체를 만들지 못한 경우
                console.log("Error:", error.message);
            }
            console.log("Error Config:", error.config);
            setIsLoading(false);
        }
    }
    return [joinAskWorkSpace, isLoading] as const;
}

export const useGetJoinWait = () => {
    const {accessToken} = store.auth.getState()
    const [isLoading, setIsLoading] = React.useState(false);
    
    const getJoinWait = async ({workspaceId, role} : {workspaceId : string, role : string}): Promise<void> => {
        try {
            const response = await axios.get(
                `${getUrl(0, "workspace/wait-list/")}`,
                {
                    params : {
                        workspaceId : workspaceId,
                        role : role,
                    },
                    headers : {
                        "Content-Type": "application/json",
                        authorization : accessToken,
                    },
                }
            )
            console.log(response)
            setIsLoading(false);
        } catch (error : any) {
            if (error.response) {
                // 서버로부터의 응답이 있을 때
                console.log("Server Error Response:", error.response.data);
                console.log("Status Code:", error.response.status);
                console.log("Headers:", error.response.headers);
            } else if (error.request) {
                // 요청이 만들어졌으나 응답을 받지 못한 경우
                console.log("Request Error:", error.request);
            } else {
                // 오류가 발생하여 요청 자체를 만들지 못한 경우
                console.log("Error:", error.message);
            }
            console.log("Error Config:", error.config);
            setIsLoading(false);
        }
    }
    return [getJoinWait, isLoading] as const;
}

export const useAcceptJoinWorkSpace = () => {
    const {accessToken} = store.auth.getState()
    const [isLoading, setIsLoading] = React.useState(false);
    
    const acceptJoinWorkSpace = async ({workspaceId, approvalUserSet, role} : {workspaceId : string, approvalUserSet : string, role : string}): Promise<void> => {
        try {
            const response = await axios.patch(
                `${getUrl(0, "workspace/add")}`,
                {
                    workspaceId : workspaceId,
                    approvalUserSet : approvalUserSet,
                    role : role,
                },
                {
                    headers : {
                        "Content-Type": "application/json",
                        authorization : accessToken,
                    },
                    
                }
            )
            console.log(response)
            setIsLoading(false);
        } catch (error : any) {
            if (error.response) {
                // 서버로부터의 응답이 있을 때
                console.log("Server Error Response:", error.response.data);
                console.log("Status Code:", error.response.status);
                console.log("Headers:", error.response.headers);
            } else if (error.request) {
                // 요청이 만들어졌으나 응답을 받지 못한 경우
                console.log("Request Error:", error.request);
            } else {
                // 오류가 발생하여 요청 자체를 만들지 못한 경우
                console.log("Error:", error.message);
            }
            console.log("Error Config:", error.config);
            setIsLoading(false);
        }
    }
    return [acceptJoinWorkSpace, isLoading] as const;
}

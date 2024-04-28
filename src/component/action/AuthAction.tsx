import {getUrl} from "../../config/server.ts"
import store from "../../state/store.ts";
import { useState } from "react";

interface responseJsonType {
    status: number,
    success: boolean,
    state: string,
    message: string,
    data?: {
        accessToken?: string,
        refreshToken?: string,
    }
}

export const useLogIn = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const setLogIn = async ({email,password} : {email : string, password : string}) => {
        setIsLoading(true);
        
        try {
            const response : Response = await fetch(
                `${getUrl(0,"member/login")}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    }),
                }
            );
            
            const jsonData : responseJsonType = await response.json()
            
            if (jsonData.status != 200) {
                throw new Error(jsonData.state);
            }
            
            // const {setAuth} = store(state => state.auth(state => state))
            
            
            //@ts-ignore
            store.getState().auth.getState().setAuth({accessToken : jsonData.data?.accessToken.split(" ")[1], refreshToken : jsonData.data?.refreshToken.split(" ")[1], isLogIn : true, errorMessage : ""})
            setIsLoading(false);
            
        } catch(error) {
            //@ts-ignore
            store.getState().auth.getState().setAuth({accessToken : "", refreshToken : "", isLogIn : false, errorMessage : error})
            setIsLoading(false);
        }
    };
    return [isLoading, setLogIn]
}

export const useSignUp = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    
    const setSignUp = async ({name, email, password, birth, verifyToken} : {name : string, email : string, password : string, birth : string, verifyToken : string}) => {
        setIsLoading(true);
        console.log(name, email, password, birth, verifyToken);
        try {
            const response : Response = await fetch(
                `${getUrl(0,"member/register")}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name : name,
                        email : email,
                        password : password,
                        birth : birth,
                        token : verifyToken,
                    }),
                }
            );
            
            const jsonData : responseJsonType = await response.json()
            
            if (jsonData.status != 200) {
                throw new Error(jsonData.state);
            }
            console.log(jsonData)
            setError("")
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setError(`${err}`)
            setIsLoading(false);
        }
    }
    return [isLoading, error, setSignUp]
}

export const useEmailVerify = () => {
    const [verifyToken, setToken] = useState("")
    
    const sendEmail = async (email : string) => {
        try {
            const response : Response = await fetch(
                `${getUrl(0, "email/send")}?email=${encodeURIComponent(email)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            
            const jsonData : responseJsonType = await response.json()
            console.log(jsonData)
        } catch (error) {
            console.error(error);
        }
    }
    
    const checkVerify = async (code : string) => {
        try {
            const response : Response = await fetch(
                `${getUrl(0, "email/verify")}?code=${encodeURIComponent(code)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            
            const jsonData : responseJsonType = await response.json()
            if (jsonData.status != 200) {
                throw new Error(jsonData.state);
            }
            console.log(jsonData)
            setToken(`${jsonData.data}`)
        } catch (error) {
            setToken("err")
        }
    }
    return [verifyToken ,sendEmail, checkVerify];
}

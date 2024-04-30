import {getUrl} from "../../config/server.ts"
import store from "../../state/store.ts";
import { useState } from "react";
import {responseJsonType} from "../../type/global/responceType.ts";
import axios from "axios";


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
            
            
            
            store.auth.setState({accessToken : jsonData.data?.accessToken, refreshToken : jsonData.data?.refreshToken, isLogIn : true, errorMessage : ""})
            setIsLoading(false);
            return true
        } catch(error) {
            store.auth.setState({accessToken : "", refreshToken : "", isLogIn : false, errorMessage : `${error}`})
            setIsLoading(false);
        }
    };
    return [isLoading, setLogIn] as const;
}

export const useSignUp = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    
    const setSignUp = async ({name, email, password, birth, verifyToken} : {name : string, email : string, password : string, birth : string, verifyToken : string}) : Promise<void> => {
        console.log(name, email, password, birth, verifyToken);
        console.log(`${getUrl(0,"member/register")}`);
        setIsLoading(true);
        try {
            const response : Response = await axios.post(
                `${getUrl(0,"member/register")}`,
                {
                    name : `${ name }`,
                    email : `${ email }`,
                    password : `${ password }`,
                    birth : `${ birth }`,
                    token : `${ verifyToken }`
                },
                {
                    headers : {
                        "Content-Type": "application/json"
                    }
                }
            );
            
            console.log(response);
            
            setError("")
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setError(`${err}`)
            setIsLoading(false);
        }
    }
    return [isLoading, error, setSignUp] as const;
}

export const sendEmail = async (email : string) : Promise<void> => {
    try {
        await fetch(
            `${getUrl(0, "email/send")}?email=${encodeURIComponent(email)}`,
            {
                method: "GET",
                headers: {
                    contentType: "application/json",
                }
            }
        );
        
    } catch (error) {
        console.error(error)
    }
}

export const useEmailVerify = () => {
    const [verifyToken, setToken] = useState("")
    const checkVerify = async (code : string) : Promise<void> => {
        try {
            const response : Response = await fetch(
                `${getUrl(0, "email/verify")}?code=${encodeURIComponent(code)}`,
                {
                    method: "GET",
                    headers: {
                        contentType: "application/json"
                    }
                }
            );
            
            const jsonData : responseJsonType = await response.json()
            if (jsonData.status != 200) {
                throw new Error(jsonData.state);
            }
            setToken(`${jsonData.data}`)
        } catch (error) {
            setToken("err")
        }
    }
    return [verifyToken ,sendEmail, checkVerify] as const;
}

import {getUrl} from "../../config/server.ts"
export const setLogIn = async ({email,password} : {email : string, password : string}) => {
    
    interface responseJsonType {
        status: number,
        success: boolean,
        state: string,
        message: string,
        data?: {
            accessToken: string,
            refreshToken: string,
        }
    }
    
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
        
        console.log(jsonData)
        
    } catch(error) {
        console.log(error);
    }
};

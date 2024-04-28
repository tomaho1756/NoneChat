
export const isPasswordValid = (password : string) : [boolean, number?] => {
    
    const passed: [boolean, boolean, boolean] = [false, false, false]
    
    const isUpperInclude = password.split("").map(i => i.charCodeAt(0)).map(i => i >= 65 && i <= 90)
    
    if (password.length >= 8) {
        passed[0] = true
    } else {
        return [false, 0]
    }
    
    
    if (isUpperInclude.includes(true)) {
        passed[1] = true
    } else {
        return [false, 1]
    }
    
    
    if(/[+-=_/';`~₩!@#$%^&*(),.?":{}|<>]/.test(password)) {
        passed[2] = true
    } else {
        return [false, 2]
    }
    
    
    if (passed[0] && passed[1] && passed[2]) {
        return [true];
    } else {
        return [false];
    }
}

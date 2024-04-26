import server from "./server.json"
export const getUrl = (type : number, action : string) : string | null => {
    if (type === 0) {
        return `http://${server.IP}/${action}`
    } else if (type === 1) {
        return `ws://${server.IP}}/${action}`
    } else {
        return "none"
    }
}

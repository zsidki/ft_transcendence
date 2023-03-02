import {account} from "../../interfaces/account.interface";

interface Mssg {
    name:string,
    text:string
}

interface IoMessage {
    id?: string;
    senderId?: string;
    senderInfo?: account;
    roomId: string;
    time?: string;
    text: string;
    //@TODO: add more fields here
}
export {Mssg, IoMessage}
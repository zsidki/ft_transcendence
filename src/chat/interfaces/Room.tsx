
import {IoMessage} from './Mssg'
import User from './User'
import {account} from "../../interfaces/account.interface";




// export default interface Room {
//     name: string,
//     mssg: Mssg[],
//     isdm: number,
//     status: string,
//     owner: User,
//     lastMessageDate: Date,
//     users: User[],
//     admins: User[],
//     muted: User[],
//     banned: User[]
// };
enum roomType
{
    DM = 'DM',
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
    DELETED = 'DELETED'
}
/*
{
    "id": "7c602567-0be9-481f-a1ea-965d86d818ca",
    "name": "tizfdfdfoom",
    "Members": [
        "e7f30565-d0c4-46b0-a089-47084cea9e40"
    ],
    "password": null,
    "status": "PUBLIC",
    "isdm": false,
    "Owner": "e7f30565-d0c4-46b0-a089-47084cea9e40",
    "Admins": [
        "e7f30565-d0c4-46b0-a089-47084cea9e40"
    ],
    "LastMessagetime": "2023-01-14T16:56:24.513Z",
    "LastMessage": null
}
 */
 interface Bans {
    id  :   String;
    endof : Date;
    isMute: Boolean;
    UserId: String;
    RoomId: String;
}
interface Room
{
    id?: string;
    name: string;
    noMoreMessages?: boolean;
    Members?: string[];
    membersInfo?: account[];
    avatar?: string;
    status: roomType;
    type?: roomType;
    isdm?: boolean;
    Owner?: string;

    Admins?: string[];

    banned?: Bans[];
    isMuted?: boolean;
    isMeAdmin?: boolean;
    password?: string;
    init?: boolean;
    messages?: IoMessage[];
    lastMessage?: string;
    lastMessageTime?: string;
    unread?: boolean;
    unreadCount?: number;
}

export {Room, roomType, Bans}
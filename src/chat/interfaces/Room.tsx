
import Mssg from './Mssg'
import User from './User'




export default interface Room {
    name: string,
    mssg: Mssg[],
    isdm: number,
    status: string,
    owner: User,
    lastMessageDate: Date,
    users: User[],
    admins: User[],
    muted: User[],
    banned: User[]
};

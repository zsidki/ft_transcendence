import {useCallback} from "react";

export interface userconfig{
    is2FA: boolean
}
export  enum userStatus {
    ONLINE = 'online',
    OFFLINE = 'offline',
    INGAME = 'ingame',
}
/*
 "Userid": "4d4920f4-26de-479b-9fef-a1e3c5780485",
        "email": "aait-ham@student.1337.ma",
        "username": "b-on3",
        "gameswon": 0,
        "gameslost": 0,
        "avatar": "https://cdn.intra.42.fr/users/f67f031dff85f8960bc94208faf581fe/aait-ham.jpeg"
 */
export interface account{
    Userid: string;
    email: string;
    username: string;
    status?: userStatus;
    following?: boolean;
    blocked?: boolean;
    avatar: string;
    isRoomOwner?: boolean;
    isRoomAdmin?: boolean;
    isBanned?: boolean;
    isMuted?: boolean;
    userconfig: userconfig;
    gameswon?: number;
    gameslost?: number;
}



export const mapAccount = (account: any) => {

    //console.log('account to map', account);
    return {
        Userid: account.Userid,
        username: account.username,
        email: account.email,
        avatar: account.avatar,
        status: account.status,
        blocked: false,
        following: false,
        gameswon: account.gameswon || 0,
        gameslost: account.gameslost || 0,
        userconfig: {
            is2FA: account.userconfig?.is2FA || false
        }

    }

}
export interface userRelation {
    Userid: string;
    username: string;
    avatar: string;
    blocked: account[];
    blocker: account[];
    status?: userStatus;
    email : string;
    followers: account[];
    followed: account[];

}
export const mapUserRolation = (userRolation: any) => {
   const ur = {
        Userid: userRolation.Userid,
        username: userRolation.username,
        email: userRolation.email,
        status: userStatus.ONLINE,
        avatar: userRolation.avatar,
        blocked: userRolation.blocked?.map((account: any) => mapAccount(account)) || [],
        blocker:userRolation.blocker?.map((account: any) => mapAccount(account)) || [],
        followers: userRolation.followers?.map((account: any) => mapAccount(account)) || [],
        followed: userRolation.followed?.map((account: any) => mapAccount(account)) || [],
    };
   ur.blocker  = [...ur.blocker, ...ur.blocked];

   return ur;
}
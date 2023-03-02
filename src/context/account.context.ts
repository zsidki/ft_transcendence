import {createContext} from 'react'
import {account, userRelation, userStatus} from "../interfaces/account.interface";



const accountsContextInitialValues= {
    getAccounts: () : Promise<account[]> => {
        return Promise.reject("sdf");
    },
    getBulkAccountsByUserId: (userId: string[]) : Promise<account[]> => {
        return Promise.reject("sdf");
    },
    getAccountByUserId: (userId: string) : Promise<account> => {
        return Promise.reject("sdf");
    },
    followAccount: (userName: string) : Promise<account> => {
        return Promise.reject("sdf");
    },
    unfollowAccount: (userName: string) : Promise<account> => {
        return Promise.reject("sdf");
    },
    getLeaderBoard: () : Promise<account[]> => {
        return Promise.reject("sdf");
    },
    blockUser: (userId: string) => {

    },
    unBlockUser: (userId: string) => {

    },
    leaderBoard: [] as account[],
    isAuthenticated: false,
    accounts: [] as account[],
    followers: [] as account[],
    updateMyStatus: (status: userStatus)=>{},
    authenticate: (isFirstTime: boolean) => {

    },
    logout: () => {

    },
    isLoading: false,
    error: false,
    me: undefined as userRelation | undefined,

}

const accountContext = createContext(accountsContextInitialValues);

export {accountContext, accountsContextInitialValues}
import {createContext} from 'react'
import {account} from "../interfaces/account.interface";



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
    isAuthenticated: false,
    getFollowers(userId: string ) : Promise<account[]> {
        return Promise.reject("sdf");
    },
    authenticate: () => {

    },
    logout: () => {

    },
    isLoading: false,
    error: false,
    me: undefined as account | undefined,

}

const accountContext = createContext(accountsContextInitialValues);

export {accountContext, accountsContextInitialValues}
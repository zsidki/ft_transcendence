import { rejects } from 'assert';
import axios from 'axios';
import fetch from 'node-fetch'
import { resolve } from 'path';
import {useCallback, useContext, useEffect, useState} from 'react';
import {  accountContext  } from '../../context/account.context';
import {account} from "../../interfaces/account.interface";
import {fetchAccountService} from "../../utils/fetchAccountService";

const AccountsContextProvider = ({children} :any) => {
    const [accounts, setAccounts] = useState<account[]>([]);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(false);
    const [me , setMe] = useState<account | undefined>(undefined);

    const getAccounts= useCallback( () : Promise<account[]> => {
        return new Promise( (resolve, reject) => {
                fetchAccountService('')
                    .then((res) => {

                    }).catch((err) => {
                        setError(true);
                        reject(err);
                    });
                });
    },[]);
    const   getBulkAccountsByUserId= useCallback( (userId: string[]) : Promise<account[]> => {
        return new Promise( (resolve, reject) => {
            fetchAccountService('')
                .then((res) => {

                }).catch((err) => {
                setError(true);
                reject(err);
            });
        });
    },[]);

    const   getAccountByUserId= useCallback( (userId: string) : Promise<account> => {
        return new Promise( (resolve, reject) => {
            fetchAccountService('')
                .then((res) => {

                }).catch((err) => {
                setError(true);
                reject(err);
            });
        });
    },[]);
    const   getAccountByAccountId= useCallback( (accountId: string) : Promise<account> => {
        return new Promise( (resolve, reject) => {
            fetchAccountService('')
                .then((res) => {

                }).catch((err) => {
                setError(true);
                reject(err);
            });
        });
    },[]);
    const    getFollowers = useCallback((userId: string ) : Promise<account[]> => {
        return new Promise( (resolve, reject) => {
            fetchAccountService('')
                .then((res) => {

                }).catch((err) => {
                setError(true);
                reject(err);
            });
        });
    },[]);
    const    authenticate= useCallback( () => {
        return new Promise( (resolve, reject) => {
            fetchAccountService('users/me')
                .then((res) => {
                    resolve(res.data);
                    setMe(res.data);
                    setIsAuthenticated(true);

                }).catch((err) => {
                    reject(err);
                setError(true);
                setIsAuthenticated(false);
        });
    });
    },[me]);

 useEffect(() => {
     console.log("useEffect", isAuthenticated);
     if (!isAuthenticated && localStorage.getItem('token')) {
         authenticate().then(() => {
             setLoading(false);
             setIsAuthenticated(true);
         }).catch((err) => {
                setLoading(false);
                setIsAuthenticated(false);
         });
     }
 },[authenticate]);

   return (
      <accountContext.Provider
      value={
       {isAuthenticated: isAuthenticated,
           isLoading: loading,
              error: error,
                getAccounts: getAccounts,
                getBulkAccountsByUserId: getBulkAccountsByUserId,
                getAccountByUserId: getAccountByUserId,
                getFollowers: getFollowers,
                authenticate: authenticate,
           logout: () => {
                setIsAuthenticated(false);
                localStorage.clear();
                setMe(undefined);
                window.open('/', '_self');
           },
            me: me
       }
      }
      >
         {children}
      </accountContext.Provider>
   );

};
// class   useAccounts {

//     // change to env 
//    //   return new Promise(async (resolve, reject) => {
//    //      try {
//    //         const data = await fetch(
//    //            '${process.env.REACT_APP_API_URL}/users/all');
//    //         return resolve(data.text);
//    //      } catch (err) {
//    //         return reject(err);
//    //      }
//    //   });
// }
const useAccounts = () => {
    return useContext(accountContext);
}
export  { useAccounts, AccountsContextProvider};

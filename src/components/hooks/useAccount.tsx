import {useCallback, useContext, useEffect, useState} from 'react';
import {accountContext} from '../../context/account.context';
import {account, mapAccount, mapUserRolation, userRelation, userStatus} from "../../interfaces/account.interface";
import {fetchAccountService} from "../../utils/fetchAccountService";
import socketIOClient, {Socket} from "socket.io-client";
import {useNavigate} from "react-router-dom";


const AccountsContextProvider = ({children} :any) => {
    const [accounts, setAccounts] = useState<account[]>([]);
    const [followers, setFollowers] = useState<account[]>([]);

    const [leaderboard, setLeaderboard] = useState<account[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(false);
    const [me , setMe] = useState<userRelation | undefined>(undefined);
    const [socket, setSocket] = useState<Socket | undefined>(undefined);
    const navigate= useNavigate();

    const appendAccount = useCallback((account: account) => {

        setAccounts((prev) => {
            prev =  prev.filter((acc) => acc.Userid !== account.Userid);
            return [...prev, account];
        });
    }, []);


    const appendToLeaderBoard = useCallback((account: account) => {
        setLeaderboard((prev) => {
            // prev =  prev.filter((acc) => acc.Userid !== account.Userid);
            return [...prev, account];
        });
        appendAccount(account);
    }, []);

    useEffect(() => {
        if (socket && me) {
        const interval = setInterval(() => {
            socket.emit('user-status', {userId: me?.Userid, status: me?.status});
        }, 2000);
        return () => clearInterval(interval);
        }
    },[socket, me]);



    useEffect(() => {
        if (socket)
        {
            socket.on("user-status", (data: any) => {
               const userid = data.userId;
               const status = data.status;
               setAccounts((prev) => {
                     return [...prev.map((account) => {
                          if (account.Userid === userid)
                            return {...account, status: status};
                          return account;
                     })];
               });
               setLeaderboard((prev) => {
                     return [...prev.map((account) => {
                          if (account.Userid === userid)
                            return {...account, status: status};
                          return account;
                     })];
               });
            });


           socket.on("user-relation-" + me?.Userid, (data: any) => {
                const from  = data.from;
                const to = data.to;
                const relation = data.type;
                if (relation === 'block') {
                    if (from === me?.Userid) {
                        setMe((prev) => {
                            if (prev) {
                                const acc = accounts.find((acc) => acc.Userid === to);
                                if (acc)
                                    return {...prev, blocker: [...prev.blocker, acc]};
                            }
                            return prev;
                        });
                    }
                    else if (to === me?.Userid) {
                        setMe((prev) => {
                            if (prev) {
                                const acc = accounts.find((acc) => acc.Userid === from);
                                if (acc)
                                    return {...prev, blocker: [...prev.blocker, acc ]};
                            }
                            return prev;
                        });
                    }
                }
                if (relation === 'unblock') {
                    if (from === me?.Userid) {
                        setMe((prev) => {
                            if (prev) {
                                return {...prev, blocker: [...prev.blocker.filter((acc) => acc.Userid != to)]};
                            }
                            return prev;
                        });
                    }
                    else if (to === me?.Userid) {
                        setMe((prev) => {
                            if (prev) {
                                return {...prev, blocker: [...prev.blocker.filter((acc) => acc.Userid != from)]};
                            }
                            return prev;
                        });
                    }
                }

           });
        }
    },[socket, me, accounts]);
    const logout = useCallback( () => {
        setIsAuthenticated(false);
        sessionStorage.clear();
        setMe(undefined);
        window.open('/', '_self');
    },[]);

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

    const   getBulkAccountsByUserId= useCallback( (userIds: string[]) : Promise<account[]> => {
        // if (loading) return Promise.reject('loading');
        const accountsIHave = accounts.filter((acc) => userIds.includes(acc.Userid));
        userIds = userIds.filter((id) => !accountsIHave
            .map((acc) => acc.Userid).includes(id));
        if (userIds.length === 0) return Promise.resolve(accountsIHave);
        setLoading(true)
        return new Promise( (resolve, reject) => {
            fetchAccountService('users/bulk-users','POST', true, userIds)
                .then((res) => {
                    setAccounts((prev) => {
                        const r = res.map((acc: any) => mapAccount(acc));
                        prev =  prev.filter((a) => r.find((aa: account) => aa.Userid === a.Userid) === undefined);
                        return [...prev, ...r];
                    });
                    setError(false);
                    setLoading(false);
                    resolve(res);
                }).catch((err) => {
                    console.log(err);
                setError(true);
                setLoading(false);
                reject(err);
            });
        });
    },[]);

    const getLeaderBoard= useCallback(() : Promise<account[]> => {
            // if (loading) return Promise.reject('loading');
            if (leaderboard.length > 0) return Promise.resolve(leaderboard);
            setLoading(true)
            return new Promise( (resolve, reject) => {
                fetchAccountService('games/leaderboard')
                    .then((res) => {
                        res?.map((account: any) => {
                            appendToLeaderBoard(mapAccount(account));
                        });
                        setError(false);
                        setLoading(false);
                    }).catch((err) => {
                        console.log(err);
                    setError(true);
                    setLoading(false);
                    reject(err);
                });
            });

    },[appendToLeaderBoard]);

    const   getAccountByUserId = useCallback( (userId: string) : Promise<account> => {

        const acc  =accounts.find((acc) => acc.username === userId);
        if (acc != undefined) return Promise.resolve(acc);
        if (loading) return Promise.reject('loading');
        //console.log("user id", userId);
        setLoading(true);

        return new Promise( (resolve, reject) => {
            fetchAccountService('users/username/'+userId,'GET', false)
                .then((acc) => {
                    setLoading(false);
                        appendAccount(mapAccount(acc));
                        resolve(mapAccount(acc));
                }).catch((err) => {
                setError(true);
                reject(err);
            });
        });
    },[accounts]);

    // const    getUserRolations = useCallback(( ) : Promise<account[]> => {
    //
    //     if (loading) return Promise.reject("leading");
    //     setLoading(true);
    //
    //     return new Promise( (resolve, reject) => {
    //         fetchAccountService('users/follows')
    //             .then((res) => {
    //                 setLoading(false)
    //                 res?.map((account: any) => {
    //                     appendFollower(mapAccount(account));
    //                 });
    //                 resolve(res);
    //             }).catch((err) => {
    //             setError(true);
    //             reject(err);
    //         });
    //     });
    // },[]);
   const  followAccount = useCallback( (userName: string) : Promise<account> => {
       // if (loading) return Promise.reject('loading');
       // setLoading(true);

       return new Promise( (resolve, reject) => {
           fetchAccountService('users/follow/'+userName, 'POST')
               .then((res) => {
                   setLoading(false)
                   console.log(res);
                   setMe((prev) => {

                       if (prev)
                       {
                           let s = prev;
                           const acc = accounts?.filter((acc) => acc.Userid === userName)
                           console.log('folloed ',acc);
                           if(acc && acc.length > 0)
                               s = {...prev, followed: [...prev.followed, acc[0]]};
                           console.log("me is usdfsdafndefined", s);
                          return  s;
                       }
                       console.log("me is undefined", prev);
                       // @ts-ignore
                       return {...prev};
                   });
                   resolve(res);
               }).catch((err) => {
               setError(true);
               reject(err);
           });
       });
    },[accounts]);

    const  unfollowAccount = useCallback((userName: string) : Promise<account> => {
        // if (loading) return Promise.reject('loading');
        // setLoading(true);

        return new Promise( (resolve, reject) => {
            fetchAccountService('users/unfollow/'+userName, 'POST')
                .then((res) => {
                    setLoading(false)
                     setMe((prev) => {
                        if (prev)
                        { const s ={...prev, followed: prev.followed?.filter((acc) => acc.Userid !== userName)};
                            console.log("me is usdfsdafndefined", s);
                            return s;
                        }

                        // @ts-ignore
                         return {...prev};
                     });
                    resolve(res);
                }).catch((err) => {
                setError(true);
                reject(err);
            });
        });
    },[loading]  );
    const    authenticate= useCallback( (isFirstTime: boolean) => {
        return new Promise( (resolve, reject) => {
            fetchAccountService('users/myrelations')
                .then((res) => {
                    resolve(res);
                  const acc = mapUserRolation(res);

                  acc.status= userStatus.ONLINE;
                    setMe(acc);
                    setError(false);
                    setIsAuthenticated(true);

                        if (isFirstTime) {
                            navigate('/settings')
                        }

                }).catch((err) => {
                    reject(err);
                setError(true);
                setIsAuthenticated(false);
        });
    });
    },[me]);
   const blockUser = useCallback( (userId: string)  => {
       if(!socket)
              return;
       socket.emit('block-user', {id: userId});

    },[socket, me]);
    const    unBlockUser= useCallback(  (userId: string)  => {
        if(!socket)
            return;
        socket.emit('unblock-user', {id: userId});


    },[socket, me]);

 useEffect(() => {
     //console.log("useEffect", isAuthenticated);
     
     if (!isAuthenticated && sessionStorage.getItem('token')) {
         authenticate(false).then(() => {
             setLoading(false);
             setIsAuthenticated(true);
         }).catch((err) => {
             logout();
                setLoading(false);
                setIsAuthenticated(false);
         });
     }else
        setLoading(false);
 },[authenticate]);
    const updateMyStatus = useCallback((status: userStatus) => {
        if (me)
        {
            setMe((prev) => {
                if (prev)
                    prev.status = status;

                return prev;
            });
        }
    },[me]);

    useEffect(() => {
        if (isAuthenticated && !socket) {
            const s = socketIOClient(`${process.env.REACT_APP_ACCOUNT_WS_URL}`, {
                transports: ["websocket"],
                auth:{
                    token: 'Bearer ' +  sessionStorage.getItem("token"),
                },
                extraHeaders: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
                withCredentials: true,
            }).on("connect", () => {
                setSocket(s);
            });
        }
        return () => {
            console.log("s socket closed");
            if (socket) {
                socket.disconnect();
                setSocket(undefined);
            }
        }
    }, [socket, isAuthenticated]);
   return (
      <accountContext.Provider
      value={
       {isAuthenticated: isAuthenticated,
           isLoading: loading,
              error: error,
           leaderBoard: leaderboard,
           accounts: accounts,
           getLeaderBoard: getLeaderBoard,
           unfollowAccount: unfollowAccount,
           updateMyStatus: updateMyStatus,
           blockUser:  blockUser,
              unBlockUser: unBlockUser,
                getAccounts: getAccounts,
                followers: followers,
                 followAccount: followAccount,
                getBulkAccountsByUserId: getBulkAccountsByUserId,
                    getAccountByUserId: getAccountByUserId,
                authenticate: authenticate,
                logout: logout,
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

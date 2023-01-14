
const fetchAccountService = async (prefix: string ,
                                   method= 'GET',
                                   hasBody= false,
                                   body= undefined as any,
                                   extraHeaders = undefined as any) => {
    const token = localStorage.getItem('token');
    console.log(token);
    const url = `${process.env.REACT_APP_ACCOUNT_API_URL}${prefix}`;
    const headers = new Headers();
    if (!extraHeaders)
    headers.append('Content-Type', 'application/json');
    else
        extraHeaders.forEach((key : any, val: any) =>{
            headers.append(key, val);
        })
    headers.append('Authorization', `Bearer ${token}`);
    let options = {
        method,
        headers,
        mode: 'cors',
        withCredentials: true,
        body: undefined,
    } as RequestInit;
    console.log(options);
    if (hasBody && body) {
        options.body = JSON.stringify(body);
    }
    return fetch(url, options)
        .then((response) => {
            console.log(response);
            if (response.status === 401) {
                throw new Error('Unauthorized');
            }
            return response.text();
        }).then((data) => {
            console.log(data);
            return JSON.parse(data);
        });

}

const fetchChatService = async (prefix: string ,
                                   method= 'GET',
                                   hasBody= false,
                                   body= undefined as any ) => {
    const token = localStorage.getItem('token');
    const url = `${process.env.REACT_APP_CHAT_API_URL}${prefix}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);
    let options = {
        method,
        headers,
        mode: 'cors',
        withCredentials: true,
        body: '',
    } as RequestInit;
    if (hasBody && body) {
        options.body = JSON.stringify(body);
    }
    return fetch(url, options)
        .then((response) => {
            if (response.status === 401) {
                throw new Error('Unauthorized');
            }
            return response.json();
        });

}
export { fetchAccountService, fetchChatService };
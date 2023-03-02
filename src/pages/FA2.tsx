import React, {useEffect} from "react";
import logo from "../images/logo.svg";
import logo_text from "../images/logo_text.svg";
import '../index.css'
import {useNavigate, useSearchParams} from "react-router-dom";

const FA2 = () => {
    const [pass, setpass] = React.useState<string | undefined>("")
    const [email, setEmail] = React.useState<string>("")

    const [searchParam, setSearchParam] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const email = searchParam.get("email");
        if (email && email.length > 0)
            setEmail(email);
        else
            navigate("/login");
    }, [searchParam]);
    const onSubmit = (e:any) =>
    {   e.preventDefault();
        window.location.href = `${process.env.REACT_APP_ACCOUNT_API_URL}auth/2FA/${pass}/${email}`;
    }
    return (
        <>
            <div className="sidebar-header flex items-center justify-center h-[70px]">

        </div>
        <div className="login-container pb-[70px] flex justify-center items-center">
            <div className="fa2_root" >
                {/*<img className="" src={`${process.env.REACT_APP_ACCOUNT_API_URL}auth/2fa-qr/${email}`} alt="logo"  />*/}
                <ul>2FA</ul>
                {/* <div className="QR_code"></div> */}
                <input type="password" className="fa2_input" onChange={(e) =>
                    setpass(e.target.value)
                } />
        
                <button className=" btn-outline-dark login-button rounded-3xl" onClick={onSubmit}
                        style={{width: '250px',height: '50px',}}  > Submit</button>
            </div>
                
        </div>
        </>
    );
};

const FA2VEnable = () => {
    const [pass, setpass] = React.useState<string | undefined>("")
    const [email, setEmail] = React.useState<string>("")

    const [searchParam, setSearchParam] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const email = searchParam.get("email");
        if (email && email.length > 0)
            setEmail(email);
        else
            navigate("/login");
    }, [searchParam]);
    const onSubmit = (e:any) =>
    {   e.preventDefault();
        window.location.href = `${process.env.REACT_APP_ACCOUNT_API_URL}auth/2FA/verify/${pass}/${email}`;
    }
    return (
        <>
            <div className="sidebar-header flex items-center justify-center h-[70px]">

            </div>
            <div className="login-container pb-[70px] flex justify-center items-center">
                <div className="fa2_root" >
                    <img className="" src={`${process.env.REACT_APP_ACCOUNT_API_URL}auth/2fa-qr/${email}`} alt="logo"  />
                    <ul>2FA</ul>
                    {/* <div className="QR_code"></div> */}
                    <input type="password" className="fa2_input" onChange={(e) =>
                        setpass(e.target.value)
                    } />

                    <button className=" btn-outline-dark login-button rounded-3xl" onClick={onSubmit}
                            style={{width: '250px',height: '50px',}}  > Submit</button>
                </div>

            </div>
        </>
    );
}
export {FA2VEnable, FA2};

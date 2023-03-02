import * as React from 'react';
import {useState} from 'react';
import '../search/sh.css'
import '../Home.css'
import TopButton from '../TopButton'
import '../live_chat/room_info/room_info.css'
import './Add_room.css'
import {useChat} from "../../components/hooks/useChat";
import {roomType} from "../interfaces/Room";

const fill = require('../../img/Fill.svg').default as string;
const fill1 = require('../../img/Arrow2.svg').default as string;
const ava = require('../../img/avatar.jpg') as string;
const addd_pic = require('../../img/add_pic.svg').default as string;

const SChatTopbar = (props: any) => {

    return (
        <div className="Chat-top-bar" /*s_padding={{padding: '14px 14px'}}*/ >
            <TopButton src={fill} s_padding={{padding: '14px 14px'}} onClick={props.setStatus} />
                <div className="Text_c">
                    <ul className="L_title" >{props.title}</ul>
                </div>
            <div style={{width:"40px"}} />
        </div>
    );
}
 

const Room = ({setName, name,error,setError }:{name:string, setName: (name:string)=>void, error:boolean,setError :(error:boolean)=>void}) =>{
    var style = {}
    if (error)
        style = {borderBottom: "1px solid #FF0000"}

    return (
        <div className="Room_pic">
            <img src={ava} alt='' className="avatar" />
            <div className='yoyo'  >
                <img src={addd_pic} className='yoyo_img' style={{paddingTop: "10px"}} alt=""/>
                <ul className='yoyo_title'>Change room icon </ul> 
            </div>
            <div className="room_text">
            <input type="text" className="room_userinput" id="3" name="input"
                   value={name} style={style} placeholder="Room name" onChange={(e) =>{ setName(e.target.value); setError(false);}} ></input>

                {error && <ul className='error'>error, incorrect name.</ul>}
            </div>
        </div>
    );
}
const Tab =  (props:any) => {
    var style = {background: "none"}
    if (props.stt === props.id)
        style = {background: "#006CFF"}
    
    
    
        return (
        <div className="tab" style={style} onClick={props.onClick}>
            <ul className="tab_title" >{props.val}</ul>
        </div>
    );
}

const Security = (props:any) => {
    
    
    
    return (
        <>
        <div className="security" >
            <ul className="sec">Security:</ul>
            <Tab val="private" stt={props.stt} id={roomType.PRIVATE} onClick={() => props.setType(roomType.PRIVATE)} />
            <Tab val="public" stt={props.stt} id={roomType.PUBLIC} onClick={() => props.setType(roomType.PUBLIC)} />
        </div>
        </>
    )
}

const Passw = ({setPassword, error,setError}:{
    setPassword: (password: string) => void, error:boolean,setError :(error:boolean)=>void
}) =>{

    var style = {}
    if (error)
        style = {border: "1px solid #FF0000"}

    return (
        <>
        <div  className="passw" >
            <ul className='sec'>Password:</ul>
            <div className='flex flex-col gap-[4px] h-[40px]'>
            <input className='passwcomp' id='passw'  style={style} onChange={
                (e) => {setPassword(e.target.value); setError(false);}
            } type={'password'} />
            {error && <ul className='error'> error, incorrect password.</ul>}
            </div>
        </div>
        </>
        )
}



const Addroom = (props:{setStatus: Function}) => {

    const [name, setName] = useState("");
    const [type, setType] = useState(roomType.PUBLIC); //0:room, 1:dm
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    // const {socket} = useGlobalContext()
    const {createRoom} = useChat();
    const handle_submit = () => {
        if (name.trim()?.length === 0||(type === roomType.PRIVATE && !password))
        {
           setError(true);
           return;
        }
        setError(false);
            // if ((document.getElementById('3') as HTMLInputElement)?.value !== ""){
            
        createRoom({
            name: name,
            type: type,
            status: type,
            password: password
        });
        props.setStatus('0');
            // socket.emit('createRoom', {name:(document.getElementById('3')
            //     as HTMLInputElement).value, status:
            // stt,pass:(document.getElementById('passw')
            // as HTMLInputElement)?.value});
            // //console.log({name:(document.getElementById('3') as HTMLInputElement)?.value,
            //     status: stt
            //     ,pass:(document.getElementById('passw') as HTMLInputElement)?.value})
            // props.setStatus("0");
            // }
    }

    return (
        <>
        <SChatTopbar setStatus={props.setStatus} title="Room"  />
        <div className="room_body">
        <Room setName={setName} name={name} error={error} setError={setError} />
        <Security  setType={setType} stt={type}  />
        {type === roomType.PRIVATE
            &&
            <Passw setPassword={setPassword} error={error} setError={setError} />}
        <div className="submit"> 
            <TopButton src={fill1} s_padding={({padding: '12.5px 12px'})} onClick={handle_submit} />
        </div>
        </div>
        </>
    );
}

export default Addroom;
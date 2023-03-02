import * as React from 'react';
import './DM.css'

const Avatar= (props: any) => {
    return (
    <div key={props.key} className="c_avatar">
        <img  alt="" src={props.src} />
        <div className={!props?.status? "offline":props?.status} />
    </div>);
}

export default Avatar;
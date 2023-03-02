
import * as React from 'react';
import './Home.css'

const TopButton = (props:any) => {
    var num = <></>
    var handle_submit = () => {}
    if (props?.onClick)
        handle_submit = () => {props.onClick("0")}
    if (props?.setStatus)
        handle_submit = () => {props.setStatus("3")}
    if (props?.handleSendMessage)
        handle_submit = props.handleSendMessage
    if (props.num)
        num = <ul>{props.num}</ul>
    return (
        <>
            <div ref={props?.ref} title={props?.title} className="t-butt" style={props?.style} onClick={handle_submit} >
                <div className="t_icone" style={props.s_padding} >
                    <img src={props.src} alt="" className='icon_img' style={props.size} />
                    {num}
                </div>
            </div>
        </>
    );
}
export default TopButton;
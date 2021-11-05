import { useEffect, useState } from "react"
import "./navbar.css"

const Navbar = ({socket})=>{
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false)

    useEffect(()=>{
        socket.on("getNotification", (data)=>{
            setNotifications((prev)=>[...prev,data])
        })
    },[socket]);

    console.log(notifications)

    const displayNotification = ({senderName,type})=>{
        let action;
        if (type===1){
            action="liked";
        }else if(type===2){
            action="commented on"
        }else{
            action="shared"
        }

        return (
            <span className="notification">{`${senderName} ${action} your post` }</span>
        )
    }

    const handleRead = ()=>{
        setNotifications([])
        setOpen(false)
    }
    return (
        <div className="navbar">
            <span className="logo">MidApp</span>
            <div className="icons">
                <div className="icon">
                <i className="bell fas fa-bell" onClick={()=>setOpen(!open)}></i>
                {(notifications.length>0) && <div className="counter">{notifications.length}</div>}
                </div>

                <div className="icon">
                <i className="message fas fa-comment-alt"></i>
                <div className="counter">5</div>
                </div>

                <div className="icon">
                <i className=" setting fas fa-sliders-h"></i>
                <div className="counter">1</div>
                </div>

                {open && (<div className="notifications">
                    {notifications.map((n)=>displayNotification(n))}
                    <button className="readbtn" onClick={handleRead}>Mark As Read</button>
                </div>
                
                )}
                
            </div>
        </div>
    )
}

export default Navbar
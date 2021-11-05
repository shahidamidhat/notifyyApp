import { useState } from "react"
import { Socket } from "socket.io-client"
import "./card.css"

const Card = ({post, socket,user})=>{

    const [like,setLike] = useState(false)

    const handleNotify = (type)=>{
        setLike(true)
        socket.emit("sendNotification",{
            senderName: user,
            recieverName : post.username,
            type
        });
    }
    return (
        <div className="card">
            <div className="info">
                <img src={post.userimg} alt="" className="userImg" />
                <span className="userName">{post.fullname}</span>
            </div>
            <img src={post.postimg} alt="" className="postImg" />
            <div className="icons">
                {like ? (
                    <i className="cardIcon fas fa-heart" style={{color:"red"}}></i>
                ):(<i className="cardIcon far fa-heart " onClick={()=>handleNotify(1)}></i>)}
            
            <i className="cardIcon far fa-comment" onClick={()=>handleNotify(2)}></i>
            <i className="cardIcon fas fa-share" onClick={()=>handleNotify(3)}></i>
            <i className="cardIcon infoimg fas fa-info-circle"></i>
            </div>
        </div>
    )
}

export default Card
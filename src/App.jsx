import { useEffect, useState } from 'react';
import './app.css';
import Card from './components/card/card';
import Navbar from './components/navbar/navbar';
import {posts} from './data'
import { io } from "socket.io-client";


function App() {

  const [username,setUsername] = useState("");
  const [user,setUser] = useState("");
  const [socket,setSocket] = useState(null);

  useEffect(()=>{
    setSocket(io("https://midnotify.herokuapp.com/"))
  },[])

  useEffect(()=>{
    socket?.emit("newUser",user)
  },[socket,user]);

  return (
    <div className="container">
      {user ? <>
        <Navbar socket={socket}/>
        {posts.map((post)=>(
            <Card key={post.id} post={post} socket={socket} user={user} />
        ))}
        
        <span className="username">{user}</span>
      </>:
      <>
        <div className="login">
        <input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)}></input>
        <button onClick={()=>setUser(username)}>Login</button>
      </div>
      </>}
      
      
    </div>
  );
}

export default App;

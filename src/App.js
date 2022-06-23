import React,{ useState,useEffect } from "react";
import "./App.css";
import Post from "./Post";
import ImageUpload from "./ImageUpload";
import { auth,db } from "./firebase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user,setUser]=useState(null);
  const [posts,setPosts] = useState([]);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email,password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))
  }

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email,password)
      .catch((error) => alert(error.message)) 
    setOpenSignIn(false); // once we sign in the modal will be closed
  }

  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        //user logged in
        console.log(authUser);
        setUser(authUser);

      }else{
      //user logged out
        setUser(null);
      }
    })

    return() => {
      unsubscribe();
    }
  }, [user,username]);



  //  useEffect -> runs a code when page refreshes and it runs a piece of code based on a specific condition
  //  here it app reloads when posts change
  useEffect(() => {
    db.collection("posts").onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc=>({
        id: doc.id,
        post: doc.data()
      })));
    })  //onsnapshot is nothing but every single time the post is added it just loads it into database
  },[posts]);

  return (
    <div className="App">
      <div className='app_header'>
        <img
          className='app_headerImage'
          src="https://us.123rf.com/450wm/dragomirescu/dragomirescu1907/dragomirescu190700060/126978930-joined-or-connected-vs-v-s-yellow-black-alphabet-letter-logo-combination-suitable-as-an-icon-design-.jpg?ver=6"
        /> 

      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ):(
        <div className='app__loginContainer'>
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}  
      </div>

      <div className="app__posts">
      {
        posts.map(({id,post}) => (
          <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <Typography>
            <form className='app__signup'>
              <center>
                <img className='modal__image'
                  src='https://us.123rf.com/450wm/dragomirescu/dragomirescu1907/dragomirescu190700060/126978930-joined-or-connected-vs-v-s-yellow-black-alphabet-letter-logo-combination-suitable-as-an-icon-design-.jpg?ver=6'
                />
              </center>

              <Input placeholder='username'
                value={username}
                onChange={(e)=>setUsername(e.target.value)}/>

              <Input placeholder='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>

              <Input placeholder='password'
                type='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
              <Button type="submit" onClick={signUp}>Sign Up</Button>
            </form>
          </Typography>
        </Box>
      </Modal>

    
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <Box sx={style}>
          <Typography>
            <form className='app__signup'>
              <center>
                <img className='modal__image'
                  src='https://us.123rf.com/450wm/dragomirescu/dragomirescu1907/dragomirescu190700060/126978930-joined-or-connected-vs-v-s-yellow-black-alphabet-letter-logo-combination-suitable-as-an-icon-design-.jpg?ver=6'
                />
              </center>

              <Input placeholder='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>

              <Input placeholder='password'
                type='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>

              <Button type="submit" onClick={signIn}>Sign In</Button>
            
            </form>
            
          </Typography>
        </Box>
      </Modal>

      {user?.displayName ? (
        <ImageUpload username={user.displayName}/>
      ):(
        <h3 className="warning">To upload you need to login</h3>
      )}
  
    </div>
  );
}


export default App;

import React, { useEffect, useState } from "react"
import "./Post.css"
import {Avatar, Button} from "@mui/material"
import { db } from "./firebase";

function Post({postId,user,username,caption,imageUrl}) {
  const[comments,setComments]=useState([]);
  const[comment,setComment]=useState('');

  useEffect(() => {
    let unsubscribe;
    if(postId){
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        // .orderBy(timestamp)
        .onSnapshot((snapshot) =>{
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return() => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
      event.preventDefault();
      db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({text:comment,
           username:user.displayName,
          //  timestamp: firebase.firestore.FieldValue.serverTimestamp()
     });
     setComment('');
  }



  return (
    <div className='post'>
      <div className='post__header'>
        <Avatar
          className="post__avatar"
          alt="suhas"
          src="C:\Users\vamsi suhas\OneDrive\Pictures\WhatsApp Image 2022-05-25 at 22.19.26.jpg"
        />
        <h3>{username}</h3>
      </div>

      <img className='post__image' src={imageUrl}/>
      <h4 className='post__text'><strong>{username}</strong> {caption}</h4>

      <div className="post__comments">
      {comments.map((comment) => (
        <p>
          <strong>{comment.username}</strong> {comment.text}
        </p>
      ))

      }
      </div>
      {user && (

      <form className="post_commentBox"> 
        <input
        className="post__input"
        type="text"
        placeholder="  Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        />
        
        <Button
        className="post__button"
        diabled={!comment}
        type="submit"
        onClick={postComment}
        >
          Post
        </Button>
      </form>
      )}

    </div>
  )
}

export default Post

import React from "react";
import "./PostCard.css";
import { VscEdit, VscTrash } from "react-icons/vsc"

function formatDate(dt) {
  var date = new Date(dt);
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var currentDate = date.getDate()
  var month = date.getMonth()
  var mer = "AM"
  if (hours>=12) mer = "PM"
  hours%=12
  if (hours===0) hours = 12
  if (minutes < 10) minutes = "0" + minutes
  if (currentDate < 10) currentDate = "0" + currentDate
  if (month < 10) month = "0" + month
  return `${hours}:${minutes} ${mer}, ${currentDate}-${month}-${date.getFullYear()}`
}

function PostCard({id, title, content, author, dateCreated, _handleEditPost, _handleDeletePost}){
    return (
    <div className="post card">
    <div>
      <h4 className="post-title">{title}</h4>
      <p className="post-content">{content}</p>
    </div>
    <div>
      <div className="post-info">
      <div>
          <div className="post-authorName">{author}</div>
          <div className="post-dateCreated">{formatDate(dateCreated)}</div>
      </div>
      <div className="more">
          <button className="button" onClick={()=>_handleEditPost({id, title, content, author})}><VscEdit/></button>
          <button className="button" onClick={()=>_handleDeletePost(id)}><VscTrash/></button>
      </div>
      </div>
    </div>
  </div>
  )
}

export default PostCard;
import React, { useState } from "react";
import "./WriteCard.css";

export default function WriteCard({
  title,
  content,
  author,
  id,
  _onSubmit,
  _handleCloseModal,
}) {
  const [data, setData] = useState({title, content, author});
  
  const reset = () => setData({title, content, author})

  const set = (key, e) => setData({...data, [key]: e.target.value})

  const submit = (form)=>{
    form.preventDefault();
    const result = {};
    for (var key in data){
      result[key] = data[key].trim()
    }
    if(result.title==='' && result.content===''){ 
      alert("Both title and content cannot be empty!");
      return;
    }
    _handleCloseModal();
    _onSubmit(result, id);
  }

  return (
    <form className="card write-card" onSubmit={submit}>
      <div className="row">
        <span className="title">{`${id==null?'Add':'Edit'} Post`}</span>
        <button className="close button" onClick={_handleCloseModal}>
          &times;
        </button>
      </div>
      <label htmlFor="title">Title</label>
      <input
        name="title"
        className="text-field"
        type="text"
        value={data.title}
        maxLength="100"
        onChange={e=>set("title", e)}
      />
      <label htmlFor="content">Content</label>
      <textarea
        className="text-field"
        name="content"
        rows="5"
        maxLength="500"
        value={data.content}
        onChange={e=>set("content", e)}
      ></textarea>
      <label htmlFor="author">Author</label>
      <input
        className="text-field"
        type="text"
        name="author"
        value={data.author}
        maxLength="30"
        onChange={e=>set("author", e)}
        required
      />
      <div className="buttons row">
        <button className="button" onClick={reset} type="button">RESET</button>
        <button className="button">SUBMIT</button>
      </div>
    </form>
  );
}

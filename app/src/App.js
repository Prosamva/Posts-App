import axios from "axios";
import './App.css'
import { useState, useEffect } from "react";
import React from "react";
import PostList from "./Components/PostList";
import WriteCard from "./Components/WriteCard";
import { VscAdd, VscRefresh, VscSearch } from "react-icons/vsc";
import { serverUrl, defaultValues } from "./utils";

function ProgressBar() {
  return (
    <div className="pb-container">
      <div className="pb"></div>
    </div>
  );
}

function App() {
  const [posts, setPosts] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getPosts = () => {
    setIsLoading(true);
    axios
      .get(serverUrl)
      .then((res) => {
        setPosts(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  useEffect(getPosts, []);

  const dismissModal = () => setShowModal(false);

  const submit = (data, id) => {
    if (id == null) {
      axios.post(serverUrl, data).then(getPosts).catch(alert);
    } else {
      axios
        .put(serverUrl + id, data)
        .then(getPosts)
        .catch(alert);
    }
    setValues(defaultValues);
  };

  const addPost = () => {
    setValues(defaultValues);
    setShowModal(true);
  };

  const editPost = (newValues) => {
    newValues.h = "Edit Post";
    setValues(newValues);
    setShowModal(true);
  };

  const deletePost = (id) => {
    axios
      .delete(serverUrl + id)
      .then((_res) => setPosts(posts.filter((post) => post._id !== id)))
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <nav>
        <div className="nav-brand">POSTS</div>
        <div className="nav-text">
          <small>by</small> SAMUEL VASAMSETTI
        </div>
      </nav>
      <div className="options">
        <div className="search-form">
          <VscSearch className="search-icon" />
          <input
            id="search-input"
            type="text"
            className="search-field"
            placeholder="Search..."
            onChange={e=>setSearchText(e.target.value.toLowerCase())}
          ></input>
        </div>
        <div>
          <button className="button" onClick={addPost}>
            <VscAdd className="icon" /> Add Post
          </button>
          <button
            className="button"
            onClick={() => {
              document.getElementById("search-input").value = "";
              setSearchText("");
              getPosts();
            }}
          >
            <VscRefresh className="icon" /> Refresh
          </button>
        </div>
      </div>
      {showModal ? (
        <div id="p1" className="overlay show">
          <WriteCard
            title={values.title}
            content={values.content}
            author={values.author}
            id={values.id}
            _onSubmit={submit}
            _handleCloseModal={dismissModal}
          />
        </div>
      ) : null}
      {isLoading ? (
        <ProgressBar />
      ) : (
        <PostList
          id="PostList"
          posts={
            posts.filter((post) =>
            (post.title + post.content + post.author)
              .toLowerCase()
              .includes(searchText)
          )}
          _handleEditPost={editPost}
          _handleDeletePost={deletePost}
        />
      )}
    </div>
  );
}

export default App;

import PostCard from "./PostCard";

function PostList({
  posts,
  _handleEditPost,
  _handleDeletePost,
}) {
  return posts.length === 0 ? (
    <div className="nom show">None found.</div>
  ) : (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          id={post._id}
          title={post.title}
          content={post.content}
          author={post.author}
          dateCreated={post.date}
          _handleEditPost={_handleEditPost}
          _handleDeletePost={_handleDeletePost}
        />
      ))}
    </div>
  );
}

export default PostList;

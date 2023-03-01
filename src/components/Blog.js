import Togglable from './Togglable'

const Blog = ({blog, updateLikes, deleteBlog}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    updateLikes(blog.id, blogToUpdate)
    
  }

  const handleDelete = () => {
    if (window.confirm("Remove blog " + blog.title + " by " + blog.author)) {
      deleteBlog(blog.id)
    }
    
  }

    return (
      <div className="blog" style={blogStyle}>
        <div className="title">{blog.title}</div>
        <div className="author">{blog.author}</div>
        <Togglable showLabel="view" hideLabel="hide" showClass="view-blog">
          <div className="blog-details">
            <div className="url">url: {blog.url}</div>
            <div className="likes">likes: {blog.likes} <button className="like-button" onClick={handleLike}>like</button></div>
            <button onClick={handleDelete}>remove</button>
          </div>
        </Togglable>
      </div>
    )
}

export default Blog
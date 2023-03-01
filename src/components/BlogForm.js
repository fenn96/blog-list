import { useState } from 'react'
import Togglable from './Togglable'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    createBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

   return (
     <div>
      <Togglable showLabel="create new blog" hideLabel="cancel" showClass="view-blog-form">
        <h1>create new</h1>
  
        <form onSubmit={addBlog}>
          <div>
              title:
              <input 
              id="title"
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
              />
          </div>
          <div>
              author:
              <input 
              id="author"
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              />
          </div>
          <div>
              url:
              <input
              id="url"
              type="text" 
              value={url}
              name="URL"
              onChange={({ target }) => setUrl(target.value)}
              />
          </div>
          <button id="submit" type="submit">create</button>
      </form>
      </Togglable>
    </div>
   )
 }
 
 export default BlogForm
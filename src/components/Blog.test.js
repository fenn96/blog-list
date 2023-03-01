import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import Blog from './Blog'


describe('when there are blogs initially rendered', () => {
    
    test('renders blog title/author by default but not url/likes', () => {
        const blog = {
            title: "Title",
            author: "Author",
            url: "https://www.test.com/",
            likes: 0,
            user: {
                username: "username",
                name: "name",
            },
        }

        const { container } = render(<Blog blog={blog} />)

        expect(container.querySelector('.title')).toHaveTextContent(
            blog.title
        )
        expect(container.querySelector('.author')).toHaveTextContent(
            blog.author
        )
        expect(screen.queryByText(blog.url)).toBeNull()
        expect(screen.queryByText(blog.likes)).toBeNull()
    })

    test('renders url/likes when button is pressed', async () => {
        const blog = {
            title: "Title",
            author: "Author",
            url: "https://www.test.com/",
            likes: 0,
            user: {
                username: "username",
                name: "name",
            },
        }

        const { container } = render(<Blog blog={blog} />)

        const button = container.querySelector("button")
    
        fireEvent.click(button)

        expect(container.querySelector(".blog-details")).not.toHaveStyle('display: none')
    })

    test('has two calls when like button is pressed twice', async () => {
        const blog = {
            title: "Title",
            author: "Author",
            url: "https://www.test.com/",
            likes: 0,
            user: {
                username: "username",
                name: "name",
            },
        }

        const likeMockHandler = jest.fn()

        const { container } = render(<Blog blog={blog} updateLikes={likeMockHandler} />)

        const showButton = container.querySelector(".show-button")
    
        fireEvent.click(showButton)

        const likeButton = container.querySelector(".like-button")
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(likeMockHandler.mock.calls).toHaveLength(2)
    })

})
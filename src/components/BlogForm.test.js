import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

describe('when a new blog is created', () => {

    test('new blog is created with correct details', async () => {
        const createBlog = jest.fn()
        const user = userEvent.setup();
    
        const { container } = render(<BlogForm createBlog={createBlog} />)
    
        const revealButton = screen.getByText("create new blog")
        const title = container.querySelector("input[name='Title']")
        const author = container.querySelector("input[name='Author']")
        const url = container.querySelector("input[name='URL']")
        const createButton = screen.getByText("create")
        
        await user.click(revealButton);
        await user.type(title, "title");
        await user.type(author, "author");
        await user.type(url, "https://www.test.com");
        await user.click(createButton);

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0].content).toBe("title")
        expect(createBlog.mock.calls[1].content).toBe("author")
        expect(createBlog.mock.calls[2].content).toBe("https://www.test.com")
    })
})
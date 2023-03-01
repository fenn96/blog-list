describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = { 
      name: "Superuser",
      username: "root",
      password: "password"
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Superuser logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Error: Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('root')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('.view-blog-form').click()
      cy.get('#title').type('Test')
      cy.get('#author').type('Test')
      cy.get('#url').type('https://test.com')
      cy.get('#submit').click()

      cy.contains('A new Blog Test by Test added')
    })

    it('A blog can be liked', function() {
      cy.get('.view-blog-form').click()
      cy.get('#title').type('Test')
      cy.get('#author').type('Test')
      cy.get('#url').type('https://test.com')
      cy.get('#submit').click()

      cy.get('.view-blog').click()
      cy.get('.like-button').click()

      cy.get('.likes').contains('1')
    })

    it('Blogs are listed in order of likes', function() {
      cy.get('.view-blog-form').click()
      cy.get('#title').type('Test')
      cy.get('#author').type('Test')
      cy.get('#url').type('https://test.com')
      cy.get('#submit').click()

      cy.get('#title').type('Test 2')
      cy.get('#author').type('Test 2')
      cy.get('#url').type('https://test.com')
      cy.get('#submit').click()

      cy.get('.view-blog').click()
      cy.get('.like-button').click()

      cy.get('.blog').eq(0).should('contain', 'Test')
      cy.get('.blog').eq(1).should('contain', 'Test 2')
    })
  })
})
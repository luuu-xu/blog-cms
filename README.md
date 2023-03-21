# Blog CMS
- This is a simple blog CMS website created with React and Bootstrap. 
- The website allows the admin to manage blog posts and comments.
- This client side app uses the [REST Blog API](https://github.com/luuu-xu/blog-api).
- See the blog website with published posts built with Next.js: [Blog NextJS](https://github.com/luuu-xu/blog-nextjs).

## Getting Started
To get started with the website, follow these steps:

1. Clone the repository to your local machine.
2. Run npm install to install the project dependencies.
3. Run npm start to start the development server.
4. Open http://localhost:3000 in your web browser to view the website.

## Features
The website includes the following features:

- View all blog posts.
- View a specific blog post by ID.
- View all comments for a specific blog post.
- TODO: Add a new comment for a specific blog post.
- Create a new blog post.
- Edit an existing blog post.
- Delete an existing blog post.

## Dependencies
The following dependencies are used in this project:

- react: JavaScript library for building user interfaces.
- react-dom: Entry point to the DOM and server renderer for React.
- react-router-dom: DOM bindings for React Router.
- bootstrap: Popular front-end open source toolkit.

## Pages
The website includes the following pages:

- /posts: The homepage, which displays all blog posts.
- /posts/:postId: Displays a specific blog post by ID and its comments. Allows users to edit an existing blog post.
- /posts/new: Allows users to create a new blog post.

## Components
The website includes the following components:

- Navbar: The website header navbar.
- Footer: The website footer.
- useToken: A custom hook for storing JWT to sessionStorage, allowing only admin to manage contents.

## API Endpoints
The website uses the following API endpoints:

- GET /api/posts: Get all blog posts.
- GET /api/posts/:postId: Get a specific blog post by ID.
- GET /api/posts/:postId/comments: Get all comments for a specific blog post.
- TODO: POST /api/posts/:postId/comments: Create a new comment for a specific blog post.
- POST /api/posts: Create a new blog post.
- PUT /api/posts/:postId: Update an existing blog post.
- DELETE /api/posts/:postId: Delete an existing blog post.

## Contributing
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
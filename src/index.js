import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './pages/App';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import Post from './pages/Post';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "posts",
        element: <Home />
      },
      {
        path: "posts/:postid",
        loader: async ({ params }) => {
          return fetch(`http://localhost:3000/api/posts/${params.postid}`);
        },
        element: <Post />
      },
      {
        path: "posts/new",
        element: <NewPost />
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

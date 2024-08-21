import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {store} from './store/store.js'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import AddPost from './pages/AddPost.jsx'
import Home from './pages/Home.jsx'
import {Protected} from './components/index.js'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import AllPosts from './pages/AllPosts.jsx'
import MyPosts from './pages/MyPosts.jsx'
import Post from './pages/Post.jsx'


const router = createBrowserRouter([
  {
    path : "/",
    element: <App/>,
    children : [
      {
        path : "",
        element: <Home/>
      },
      {
        path: "login",
        element : (
            <Protected authentication = {false}>
               <Login/>
             </Protected>
        )
      },
      {
        path: "signup",
        element: (
          <Protected authentication = {false}>
             <SignUp/>
          </Protected>
      )

      },
      {
        path: "add-post",
        element: (
           <Protected authentication>            
              <AddPost/>
           </Protected>
        )
      },
      {
        path: "all-posts",
        element: <AllPosts/>
      },
      {
        path : "posts/:id",
        element: <Post/>
      },
      {
        path : "my-posts",
        element: (
          <Protected authentication>
             <MyPosts/>
          </Protected>
        )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router ={router}/>
      {/* <App /> */}
    </Provider>
  </React.StrictMode>
 )


import { useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { useEffect } from 'react'
import { login, logout } from './store/authSlice'
import {Header, Footer} from './components/index'
import { Outlet } from 'react-router-dom'

import ScollToTop from './components/ScollToTop'
import Loading  from './components/Loader'

function App() {

  const[loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => 
    {
      if(userData){
        dispatch(login(userData))
        // console.log(userData);
      }
      else{
        dispatch(logout())
      }
      // return
  })
    .finally(() => setLoading(false))

  },[])
  

  return !loading? (
    <>
    <Header/>
    <div className='min-h-screen flex flex-wrap content-between pt-[4.5rem] bg-background text-textPrimary'>
      <div className='w-full block'>
      <ScollToTop/>
         <Outlet/>
      </div>
    </div>
    <Footer/>
    </>
  ) : (<Loading/>)

  // return (
  //   <>
  //   <Header/>
  //   <div className='min-h-screen flex flex-wrap content-between pt-[4.51rem] bg-background text-textPrimary'>
  //     <div className='w-full block'>
  //     <ScollToTop/>
  //        <Outlet/>
  //     </div>
  //   </div>
  //   <Footer/>
  //   </>
  // )
}

export default App

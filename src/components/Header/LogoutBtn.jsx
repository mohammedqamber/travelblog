import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {

       const dispatch = useDispatch()
       const logoutHandle = () => {
          authService.logout()
            .then(() => {
                dispatch(logout())
                
            }).catch ((e) => console.log(e))
        }

    return (
        <>
        <button
        onClick={logoutHandle}
         className='inline-block px-3 py-2 text-black bg-slate-300 hover:bg-slate-100'>
        Sign Out</button>
        </>
    )
}

export default LogoutBtn

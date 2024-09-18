import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import service from "../appwrite/config"
import {login as storeLogin} from "../store/authSlice"
import { useDispatch } from 'react-redux'
import {Button, Logo, Input} from "./index"
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const {register, handleSubmit} = useForm()
    const[error, setError] = useState("")

    const login = async(data) => {
        setError("")
        setLoading(true)
        try {
          const session = await authService.login(data)
          if(session){
              const userData = authService.getCurrentUser()
                 if(userData){
                    dispatch(storeLogin(userData))
                    navigate("/")
                 }
                 
          }
          

        } catch (error) {

            setError(error.message)
            console.log(error.message)
        }
        finally{
            setLoading(false)
        }
    }
    

    return (
        <div className='flex items-center justify-center w-full my-8'>
            <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
                <div className='mb-2 flex justify-center'>
                   <span className='inline-block w-full max-w-[100px]'>
                      <Logo width='100%'/>
                   </span>                  
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                   Don&apos;t have an account?&nbsp;
                   <Link
                      to="/signup"
                      className='font-medium text-primary transition-all duration-200 hover:underline'
                   >
                    Sign Up
                   </Link>
                </p>
                 {error && <p className='text-red-600 mt-8 text-center'>Invalid Email or Password.</p>} 

                <form onSubmit={handleSubmit(login)} className='mt-8'>
                   <div className='space-y-5'>
                      <Input
                       label = "Email: "
                       
                       placeholder = "Enter your email"
                       {...register("email",{
                         required : true,
                        //  pattern : /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/
                         validate : {
                            matchPattern: (value) => {
                                /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address must be valid"
                            }
                         }
                       })}
                      />
                        {/* {errors?.email?.type === "pattern" && (
                            <p>Please enter valid email addess</p>
                        )} */}

                      <Input 
                        label = "Password: "
                        type = "password"
                        placeholder = "Enter your password"
                        {...register("password",{
                            required : true
                        })}
                       />
                       <Button type='submit' className='w-full'>{loading? <i>Logging In...</i> : "Log In"}</Button>
                   </div>
                </form>
            </div>
        </div>
    )
}

export default Login

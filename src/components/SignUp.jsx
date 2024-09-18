import React, {useState}from 'react'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {Button, Logo, Input} from './index'
import { useForm } from 'react-hook-form'

function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: { errors },} = useForm()
    const[error, setError] = useState("")
    const[loading, setLoading] = useState(false)
    
    const signUp = async(data) => {

        
        setLoading(true)

        try {
           const userData =  await authService.createAccount(data)
           if(userData) {
               const userData =  await authService.getCurrentUser()
                 if(userData) {
                  dispatch(login(userData))
                  navigate("/") }
                  else{
                    console.log("Couldnt get user data in header");
                  }
           }
            
        } catch (error) {
            setError(error.message)
            console.log("hello")
        } finally {
            setLoading(false)
        }
         
    }
    
    return (
        <>
        <div className='flex items-center justify-center'>
            <div className={`mx-auto w-full max-w-lg bg-ray-100 rounded-xl p-10 border border-black/10`}>

                    <div className='mb-2 flex justify-center'>
                        <span className='inline-block w-full max-w-[100px]'>
                            <Logo width='100%' />
                        </span>
                    </div>

                    <h2 className='text-center text-2xl font-bold leading-tight'>Create your account</h2>
                    <p className='mt-2 text-center text-base text-black/60'>
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className='font-medium text-primary transition-all duration-200 hover:underline'
                        >
                            Sign In
                        </Link>
                    </p>
                    {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

                    <form onSubmit={handleSubmit(signUp)}>
                        <div className='space-y-5'>
                            <Input
                              label = "Full Name: "
                              placeholder = "Enter your name"
                              {...register("name", {required: true})}
                            />
                            <Input
                              label = "Email: "
                              type = "email"
                              placeholder = "Enter your email"
                              {...register("email",{
                                required: true,
                                validate : {
                                        matchPattern: (value) => {
                                           return (
                                             /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address must be valid"
                                           )
                                        }
                                     }
                              })}
                            />

                            <Input
                               label = "Password: "
                               type = "password"
                               placeholder = "Enter your password"
                               {...register("password",{
                                required: "Password is required",
                                minLength: {value : 8, message: "Password must be atleast 8 characters long"}
                               })}
                            />
                            {errors.password && <p>{errors.password.message}</p>}

                            {/* <Button children="Sign Up" className='w-full' type='submit'></Button> */}
                            <Button className='w-full' type='submit'>
                                {
                                    loading ? <i>Signing Up...</i> : "Sign Up" 
                                }
                            </Button>
                        </div>
                    </form>
            </div>

        </div>
        </>
    )
}

export default SignUp

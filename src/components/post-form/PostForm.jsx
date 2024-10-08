import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {Button ,Input, Select, RTE} from '../index'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
    
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title : post?.title || '',
            slug : post?.slug || '',
            content : post?.content || '',
            status : post?.status || 'active'
        }
    })


    const navigate = useNavigate()
    const userData = useSelector( state => state.userData)
    const[loading, setLoading] = useState(false)


    const submit = async(data) => {
        setLoading(true)
        // console.log(data);
        try {
            if(post){
                const file = data.image[0] ? service.uploadFile(data.image[0]) : null
    
                if(file) {
                    service.deleteFile(post.img)
                }
    
                const dbPost = await service.updatePost(post.$id, {
                    ...data,
                    img : file? file.$id : undefined
                })
    
                if(dbPost) {
                    navigate(`/posts/${dbPost.$id}`)
                }
            }
            else{
                const file = await service.uploadFile(data.image[0])
    
                if(file){
                   
                   console.log(file);
    
                   const fileId = file.$id
                   data.img = fileId
    
                   const dbPost = await service.createPost({
                    ...data,       
                    userID : userData.$id,
                    author: userData.name
                   })
    
                   
    
                   if(dbPost){
                          navigate(`/posts/${dbPost.$id}`)
                   }
                }
            }
        }
        catch(e) {
            console.log(e);          
        }
        finally{
            setLoading(false)
        }
   
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string" ){
            return value
                        .trim()
                        .toLowerCase()
                        .replace(/[^a-zA-Z\s\d]/g, "")
                        .replace(/\s+/g, '-')                 
        }
    })

    useEffect(() => {
         
        const subscription = watch ((value, {name}) => {
             
            if(name === "title")
                setValue('slug', slugTransform(value.title, {shouldValidate : true}))
            
        })

        return () => {subscription.unsubscribe()}

    } ,[watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="lg:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                    readOnly
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="lg:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: false })}   //required: !post 
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm


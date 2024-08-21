import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import  service  from '../appwrite/config'
import { Container, PostCard, Button } from '../components/index'
import { useNavigate } from 'react-router-dom'

function MyPosts() {

    const[MyPosts, setMyPosts] = useState()
    const navigate = useNavigate()
    const userData = useSelector(state => state.userData)
    const id = userData.$id
   
    useEffect(()=>{
        service.getMyPosts(id)
        .then((posts) =>  setMyPosts(posts.documents) )
        .catch((e)=> console.log("Mypost page:: ", e))
    })

    function deletePost(id) {
        service.deletePost(id).then(() => navigate("/my-posts")).catch((e) => console.log(e))
    }

    return (
        <>
            <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        MyPosts && MyPosts.map((post) => (
                            <div className='py-4 lg:p-3 lg:w-1/4' key={post.$id} >
                                {/* <PostCard id={post.$id} title={post.title} img={post.img} /> */}
                                <PostCard  {...post}/>
                                <Button children="Delete" onClick = {() => deletePost(post.$id)}/>

                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
        </>
    )
}

export default MyPosts

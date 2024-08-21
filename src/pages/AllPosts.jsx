import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components/index'
import  service  from '../appwrite/config'


function AllPosts() {
    
    const[posts, setPosts] = useState([])
     
    useEffect(()=>{
        service.getPosts()
        .then((posts) =>  setPosts(posts.documents) )
        .catch((e)=> console.log("Addpost page:: ", e))
    },[])

    return (
        <div className='w-full py-8'>
            <Container>
                 
                <h1 className='text-2xl my-5'>Discover the recent travel experiences</h1>
                <div className='flex flex-wrap'>
                    {
                        posts.map((post) => (
                            <div className='py-4 lg:p-3 lg:w-1/4' key={post.$id} >
                                {/* <PostCard id={post.$id} title={post.title} img={post.img} /> */}
                                <PostCard  {...post}/>
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default AllPosts

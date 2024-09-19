import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components/index'
import service from '../appwrite/config'
import  LoaderCircle  from '../../imgAsset/loading.svg'
import SkeletonLayout from '../components/SkeletonLayout'

function AllPosts() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        setLoading(true)
        service.getPosts()
            .then((posts) => setPosts(posts.documents))
            .catch((e) => console.log("Addpost page:: ", e))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>

                <h1 className='text-2xl my-5'>Discover the recent travel experiences</h1>
                {
                    loading ?
                        //   <div className='w-full h-[400px] flex items-center justify-center'><img className="w-[100px] items-center" src={LoaderCircle}/></div>
                        <SkeletonLayout/>
                       :
                        <div className='flex flex-wrap'>
                            {
                                posts.map((post) => (
                                    <div className='py-4 lg:p-3 lg:w-1/4 aspect-[4/3]' key={post.$id} >
                                        {/* <PostCard id={post.$id} title={post.title} img={post.img} /> */}
                                        <PostCard  {...post} />
                                    </div>
                                ))
                            }
                        </div>
                }
            </Container>
        </div>
    )
}

export default AllPosts

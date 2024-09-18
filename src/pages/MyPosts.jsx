import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import service from '../appwrite/config'
import { Container, PostCard, Button } from '../components/index'
import { useNavigate } from 'react-router-dom'
import LoaderCircle from '../../imgAsset/loading.svg'

function MyPosts() {

    const [MyPosts, setMyPosts] = useState([])
    const [exist, setExist] = useState(false)
    const navigate = useNavigate()
    const userData = useSelector(state => state.userData)
    const id = userData ? userData.$id : null
    const [trigger, setTrigger] = useState(false)
    const [loading2, setLoading2] = useState(false)

    useEffect(() => {
        if (id) {
            setLoading2(true)
            service.getMyPosts(id)
                .then((posts) => {
                    if (posts.total === 0) {

                        setExist(false)
                    }
                    else {
                        setMyPosts(posts.documents)
                        setExist(true)
                    }

                })
                .catch((e) => console.log("Mypost page:: ", e))
                .finally(() => setLoading2(false))
        }
        // else {
        //     console.log("User ID is not available.");
        //     setExist(false);
        // }

    },[trigger])

    function deletePost(id) {
        
        service.deletePost(id).then(() => navigate("/my-posts")).catch((e) => console.log(e)).finally(() => setTrigger(prev => !prev))
    }

    return loading2 ?
        (
            <div className='w-full h-[400px] flex items-center justify-center'>
                <img className="w-[100px] items-center" src={LoaderCircle} />
            </div>
        )
        :
        (
            <>
                <div className='w-full py-8'>
                    <Container>
                        {exist ?
                            <div className='flex flex-wrap'>

                                {

                                    MyPosts.map((post) => (
                                        <div className='py-4 lg:p-3 lg:w-1/4' key={post.$id} >
                                            {/* <PostCard id={post.$id} title={post.title} img={post.img} /> */}
                                            <PostCard  {...post} />
                                            <Button children="Delete" onClick={() => deletePost(post.$id)} />

                                        </div>))
                                }
                            </div>
                            :

                            <div className='text-xl pt-8 text-black text-center'>
                                No Posts Added
                            </div>


                        }

                    </Container>
                </div>
            </>
        )
}

export default MyPosts


import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import parse from 'html-react-parser'
import { useParams } from 'react-router-dom'
import { Container } from '../components/index'
import LoaderCircle from '../../imgAsset/loading.svg'

function Post() {

    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(false)
    let { id } = useParams()

    useEffect(() => {
        setLoading(true)
        service.getPost(id).then((post) => setPost(post)).catch((e) => console.log(e)).finally(() =>  setLoading(false) )

    }, [])

    return (
        <div className='bg-white py-8'>
            <Container>
                {
                    loading ?
                       ( <div className='w-full h-[400px] flex items-center justify-center'><img className="w-[100px]" src={LoaderCircle} /></div>)
                        :
                        (
                            <div className=''>
                            
                            <img className='lg:w-1/2 lg:h-1/2  lg:py-7' src={service.getFilePreview(`${post.img}`)} alt={post.title} />
                            

                            <div className='ml-5 py-6'>
                                <h1 className='text-4xl font-bold mb-3 '>{post.title}</h1>
                                <div>{parse(`${post.content}`)}</div>
                            </div>
                        </div>
                        )
                }

            </Container>
        </div>
    )
}

export default Post

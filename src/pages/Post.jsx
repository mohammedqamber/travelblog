import React, {useState, useEffect} from 'react'
import service from '../appwrite/config'
import parse from 'html-react-parser'
import { useParams } from 'react-router-dom'
import { Container } from '../components/index'

function Post() {
    
    const [post, setPost] = useState({})
    let {id} =  useParams()

   useEffect(() => {
     service.getPost(id).then((post) => setPost(post)).catch((e) => console.log(e))
     
   } , [id])

    return (
        <div className='bg-white py-8'>
            <Container>
            <h1 className='text-2xl font-bold'>{post.title}</h1>   
            <img className='w-full lg:w-1/2 m-auto py-7' src={service.getFilePreview(`${post.img}`)} alt={post.title} />
            
            <div>{parse(`${post.content}`)}</div>
            
            </Container>
        </div>
    )
}

export default Post

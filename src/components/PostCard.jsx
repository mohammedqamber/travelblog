import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({$id, title, img, author}) {
    return (
        <Link to={`/posts/${$id}`}>
           <div className ="w-full border-2 border-gray-400 bg-gray-100 rounded-sm p-3 aspect-[3/2]">
               <div className='w-full  justify-center mb-4'>
                   <img src={service.getFilePreview(img)} alt={title} 
                   className='rounded-sm lg:h-40 lg:w-full' />
               </div>
               <h2 className='text-xl font-bold'>{title}</h2>
               <p>- <i>{author}</i></p>
           </div>
        </Link>
    )
}

export default PostCard

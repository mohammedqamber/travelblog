import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { PostForm, Container } from '../components/index';
import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';

function AddPost() {

   const navigate = useNavigate()
  //  const[user, setUser] = useState(false)
   
  // useEffect(()=>{
  //      authService.getCurrentUser()
  //      .then(() => (setUser(true)))
  //      .catch((e) => navigate("/login"))
  // },[])

  // const editorRef = useRef(null);
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

  return (
     <div className='py-4'>
          <Container>
              <PostForm/>
          </Container>
          
     </div>
  )
}

export default AddPost

import React from 'react'

function Container({children}) {
    return (<div className='w-full max-w-6xl mx-auto px-4'>{children} </div>)
}

export default Container

// Single line returns we can  do even without "(" ")"

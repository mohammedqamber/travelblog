import React from 'react'
import Skeleton from './Skeleton'

function SkeletonLayout() {
    return (
        <div className='flex flex-wrap'>
             <Skeleton/>
             <Skeleton/>
             <Skeleton/>
             <Skeleton/>
             <Skeleton/>
             <Skeleton/>
             <Skeleton/>
             <Skeleton/>
        </div>
    )
}

export default SkeletonLayout

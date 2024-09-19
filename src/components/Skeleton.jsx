import React from 'react'

function Skeleton() {
    return (
        <>


            <div className='py-4 lg:p-3 lg:w-1/4 w-full'  >

                <div className="w-full border-2 border-[#eff0f0] bg-gray-100 rounded-sm p-3 aspect-[3/2]">
                    <div className='w-full  justify-center mb-4 '>
                        <div className='rounded-sm lg:h-40 lg:w-[226.07px] animate-pulse bg-[#eff0f0]'>

                        </div>
                    </div>
                    <h2 className='text-xl font-bold lg:h-[28px] bg-[#eff0f0]'></h2>
                    <p className='lg:h-[20px] bg-[#eff0f0]'></p>
                </div>
            </div>


        </>
    )
}

export default Skeleton

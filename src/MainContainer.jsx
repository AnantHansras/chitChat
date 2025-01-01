import React from 'react'
import SideBar from './SideBar'
import WorkArea from './WorkArea'
const MainContainer = () => {
  return (
    <div className='min-w-[90%]  h-auto my-5 bg-[#f4f5f8] flex flex-row rounded-3xl'>
        <SideBar/>
        <WorkArea/>
    </div>
  )
}

export default MainContainer
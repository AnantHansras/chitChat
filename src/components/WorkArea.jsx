import React from 'react'
import ChatArea from './ChatArea'
import Welcome from './Welcome'

const WorkArea = () => {
  return (
    <div className='flex-[0.7]'>
        <Welcome/>
        <ChatArea/>
    </div>
  )
}

export default WorkArea
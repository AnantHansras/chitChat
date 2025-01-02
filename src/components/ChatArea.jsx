import React from 'react'
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import { IconButton } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Selfmsg from './Selfmsg';
import Othermsg from './Othermsg';
const ChatArea = () => {
  return (
    <div className='flex flex-col h-[100%] overflow-hidden flex-[0.7]'>
        <div className='bg-white  flex flex-row justify-start m-3 mb-1 p-2 items-center rounded-2xl 'style={{
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)'
    }}>
            <div className=' h-12 w-12 p-1 flex justify-center rounded-full items-center text-white text-xl font-bold bg-[#d9d9d9]'>A</div>
            <div className='row-start-1 col-start-2 row-end-2 col-end-4 ml-4 mb-1 text-2xl text-[#0000008F] font-bold'>Anant</div>
        </div>
        <div className='bg-white rounded-2xl m-3 my-1 p-2 flex-1 overflow-y-scroll' style={{ 
         scrollbarWidth: 'none',    /* For Firefox */
         msOverflowStyle: 'none',   /* For IE and Edge */
         WebkitOverflowScrolling: 'touch' ,/* For smoother scrolling on mobile */
         boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)'
     }}> 
        <Selfmsg/>
        <Othermsg/>
        <Selfmsg/>
        <Othermsg/>
        <Othermsg/>
        <Selfmsg/>
        <Othermsg/>
         </div>
        <div className='bg-white flex flex-row rounded-2xl m-3 mt-1 p-2 items-center' style={{
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)'
    }}>
            <IconButton><QuestionAnswerRoundedIcon/></IconButton>
            <input type='text' placeholder='Type a message' className='outline-none mr-auto mb-1 border-none'/>
            <IconButton><SendRoundedIcon  className='text-green-600'/></IconButton>
        </div>
    </div>
  )
}

export default ChatArea
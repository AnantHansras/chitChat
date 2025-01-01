import React from 'react'
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import { IconButton } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
const ChatArea = () => {
  return (
    <div className='flex flex-col h-full'>
        <div className='bg-white  flex flex-row justify-start m-3 mb-1 p-2 items-center rounded-2xl'>
            <div className=' h-12 w-12 p-1 flex justify-center rounded-full items-center text-white text-xl font-bold bg-[#d9d9d9]'>A</div>
            <div className='row-start-1 col-start-2 row-end-2 col-end-4 ml-4 mb-1 text-2xl text-[#0000008F] font-bold'>Anant</div>
        </div>
        <div className='bg-white rounded-2xl m-3 my-1 p-2 flex-1'> HII </div>
        <div className='bg-white flex flex-row rounded-2xl m-3 mt-1 p-2 items-center'>
            <IconButton><QuestionAnswerRoundedIcon/></IconButton>
            <input type='text' placeholder='Type a message' className='outline-none mr-auto mb-1 border-none'/>
            <IconButton><SendRoundedIcon/></IconButton>
        </div>
    </div>
  )
}

export default ChatArea
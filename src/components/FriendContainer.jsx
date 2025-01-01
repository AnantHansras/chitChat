import React from 'react'

const FriendContainer = ({friend}) => {
  return (
    <div className='grid grid-cols-[40px_auto_auto] grid-rows-[auto auto] gap-x-6 p-1 rounded-2xl m-2'>
        <p className='col-start-1 col-end-2 row-start-1 row-end-3 h-10 w-10 p-1  flex justify-center rounded-full items-center text-white text-2xl font-bold bg-[#d9d9d9]'>{friend.name[0]}</p>
        <p className='row-start-1 col-start-2 row-end-2 col-end-4 text-[#0000008F] font-semibold'>{friend.name}</p>
        <p className='row-start-2 col-start-2 row-end-3 col-end-3 text-[#0000008A] text-sm'>{friend.lastMessage}</p>
        <p className='row-start-2 col-start-3 row-end-3 col-end-4  justify-self-end text-[#00000066] text-sm'>{friend.lastMessageTime}</p>
    </div>
  )
}

export default FriendContainer
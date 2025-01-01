import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import SearchIcon from '@mui/icons-material/Search';
import NightlightIcon from '@mui/icons-material/Nightlight';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import FriendContainer from './components/FriendContainer';
const SideBar = () => {
    const fakeData = [
        {
            name:"User1",
            lastMessage:"Hii",
            lastMessageTime:"8:00"
        },
        {
            name:"NewUser1",
            lastMessage:"Good Night",
            lastMessageTime:"12:00"
        }
    ]
  return (
    <div className='flex-[0.3] flex flex-col'>
        {/* icons */}
        <div className ='flex flex-row justify-evenly bg-white rounded-2xl mb-1 py-1 m-3'>
            <IconButton>
                <PersonIcon/>
            </IconButton>
            <IconButton>
                <GroupsIcon/>
            </IconButton>
            <IconButton>
                <AddCircleIcon/>
            </IconButton>
            <IconButton>
                <NightlightIcon/>
            </IconButton>
        </div>
        {/* seach bar */}
        <div className='bg-white flex flex-row item-center border rounded-2xl m-3 my-1 focus:border-gray-700'>
            <IconButton>
                <SearchIcon/>
            </IconButton>
            <input type='text' placeholder='Search' className='ml-2  mb-1 text-lg border-none outline-none'/>
        </div>
        {/* friends */}
        <div className='bg-white rounded-2xl flex-1 m-3 mt-1'>
        {
            fakeData.map((user, index) => (
                <FriendContainer key={index} friend={user}>
                {/* Add your content here */}
                </FriendContainer>
            ))
        }

        </div>
    </div>
  )
}

export default SideBar
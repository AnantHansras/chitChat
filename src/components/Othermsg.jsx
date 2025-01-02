import React from 'react'

const Othermsg = () => {
  // Array of predefined colors
const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD', '#1ABC9C', '#E74C3C', '#2ECC71'];

// Function to map a username to a color
function getColorFromUsername(username) {
  // Compute a hash value based on the username
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Use the hash value to pick a color from the array
  const colorIndex = Math.abs(hash) % colors.length;
  return colors[colorIndex];
}
const textColor = getColorFromUsername('Anant');
  return (
    <div className='bg-gray-200 flex flex-col rounded-3xl max-w-80 mr-auto w-fit m-2 p-2 px-4 gap-0 space-y-0'>
        <div className='mb-0 text-sm font-bold' style={{ color: textColor }}>Anant</div>
        <div className='text-gray-900 text-sm mb-0'>This is a big message</div>
        <div className='text-gray-800 text-xs ml-auto mt-0'>17:00</div>
    </div>
  )
}

export default Othermsg
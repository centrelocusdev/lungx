import React from 'react'
const AudioPlayer = ({ audioUrl }) => {
 
  return (
    <div className=''>
      <audio controls>
        <source src={audioUrl} type="audio/mpeg" />
        <source src={audioUrl} type="audio/3gp" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

export default AudioPlayer

// import React from 'react'
// import { useState, useEffect } from 'react';
// const AudioPlayer = ({ audioUrl }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const togglePlayPause = async() => {
//       const audio = document.getElementById('audio');
//     console.log(isPlaying, audio.paused);
//     if (audio.paused && !isPlaying) {
//         console.log("in the play");
//         await audio.play();
//         setIsPlaying(true);
//     }
//     if (!audio.paused && isPlaying) {
//         console.log("in the pause");
//         await audio.pause();
//         setIsPlaying(false);

//     }
//     // setIsPlaying(!isPlaying);
//     console.log(isPlaying);
//   };

//   return (
//     <div className=''>
//        <button onClick={togglePlayPause} >
//         {isPlaying ? 'Pause' : 'Play'}
//       </button>
//       <div>
//       <audio id="audio" controls>
//         <source src={audioUrl} type="audio/mpeg" />
//         <source src={audioUrl} type="audio/3gp" />
//         Your browser does not support the audio element.
//       </audio>
//       </div>
//     </div>
//   )
// }

// export default AudioPlayer
import {BsFillPlayFill} from 'react-icons/bs';
import {BsFillPauseFill} from 'react-icons/bs';
import {MdPlayDisabled} from 'react-icons/md';
import React, { useState, useRef, useEffect } from "react";
const AudioPlayer2 = ({ audioUrl, heartSectionName, isAudioPresent }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  let togglePlayPause;
 if(isAudioPresent !== 'null'){
    console.log("in the");
    togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
        setIsPlaying(!isPlaying);
      };
     
 }
 useEffect(() => {
  const audio = audioRef.current;
  
  if (audio.paused) {
    console.log(audio.paused);
    setIsPlaying(false);
  }
}, []);
  
  return (
    <div className="">
      <button onClick={isAudioPresent!== null && togglePlayPause}>
        {isPlaying ? <BsFillPauseFill size={50}/> : <BsFillPlayFill size={50}/>}
      </button>
      <div style={{ display: "none" }}>
        <audio ref={audioRef} controls>
          <source src={audioUrl} type="audio/mpeg" />
          <source src={audioUrl} type="audio/3gp" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default AudioPlayer2;

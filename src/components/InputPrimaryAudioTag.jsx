import React from 'react'
import AudioPlayer from './AudioPlayer'
import CheckBox from './checkbox' 
const InputPrimaryAudioTag = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  disabled,
  lung_audio,
}) => {
  // value = value.replace('{','').replace('}','')
  console.log(lung_audio, 'InputPrimaryAudio',{onChange},value)
  const music = `https://lung.thedelvierypointe.com${lung_audio}`
  return (
    <div className="w-full mt-3 text-gray-600">
      {/* < audio src={music} /> */}
      {/* <audio controls>
        <source src={music} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio> */}
      <label htmlFor={name} className="capitalize text-lg block font-medium">
        {name.split('_').join(' ')}
      </label>
      <AudioPlayer
        audioUrl={`https://lung.thedelvierypointe.com${lung_audio}`}
        />
      <CheckBox value={value} onChange={onChange} name1={name} />
      {/* <source
          src={music}
          type="audio/ogg"
        />
        <source
          src={music}
          type="audio/mpeg"
        /> */}

      {/* <input
        type={type ? type : 'text'}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`w-full bg-[#D1D1D147] rounded px-4 py-2 mt-1 focus:outline-none focus:bg-white focus:border-[#D1D1D147] border border-transparent ${
          disabled && 'cursor-not-allowed'
        }`}
      /> */}
    </div>
  )
}

export default InputPrimaryAudioTag
import React from 'react'
import HeartTags from './heartTags'
import AudioPlayer2 from './AudioPlayer2'
// import AudioPlayer from './AudioPlayer'
import style from '../assets/CSS/InputPrimaryAudioTag2.module.css';


const InputPrimaryAudioTag2 = ({imageURL , text , imageName, lung_audio, formData}) => {
  const index = [0,1,2,3,4,5,6,7,8,9,10,11,12]
 console.log("lung audio" , lung_audio);
  return (
    <div style={{width: 100+"%"}}  className='flex flex-col items-center gap-5  px-10 py-2'>
        <p className='text-2xl text-theme-primary  font-semibold text-green-1'>{text}</p>
        {/* <p className='bg-white border-8 py-2 px-6 rounded text-green-1 font-semibold'>{text}</p> */}
        <div style={{width: 60+"%"}} className='relative flex justify-center'>
          <img style={{width: 95+"%"}} src={imageURL} alt="heart-image" />
          <div className={style.heartTagsTop}>
          {/* <HeartTags value={formData.p0_tag} heartSectionName={imageName==="Anterior"? "p0": "na"}/> */}
          <HeartTags formData={formData}  heartSectionName={imageName==="Anterior"? "p0": "na"}/>
          </div>
          <div className={imageName === 'Anterior' ? style.heartTagsLeftTop : style.heartTagsLeftTopPos}>
          <HeartTags formData={formData}  heartSectionName={imageName==="Anterior"? "p1": "p7"}/>
          </div>
          <div className={imageName === 'Anterior' ? style.heartTagsRightTop : style.heartTagsRightTopPos}>
          <HeartTags formData={formData}  heartSectionName={imageName==="Anterior"? "p2": "p8"}/>
          </div>
          <div className={imageName === 'Anterior' ? style.heartTagsLeftMid : style.heartTagsLeftMidPos}>
          <HeartTags formData={formData}  heartSectionName={imageName==="Anterior"? "p3": "p9"}/>
          </div>
          <div className={imageName==='Anterior'? style.heartTagsRightMid : style.heartTagsRightMidPos}>
          <HeartTags formData={formData} heartSectionName={imageName==="Anterior"? "p4": "p10"}/>
          </div>
          <div className={imageName === 'Anterior' ? style.heartTagsLeftBottom : style.heartTagsLeftBottomPos}> 
          <HeartTags formData={formData} heartSectionName={imageName==="Anterior"? "p5": "p11"}/>
          </div>
          <div className={imageName === 'Anterior' ? style.heartTagsRightBottom : style.heartTagsRightBottomPos}>
          <HeartTags formData={formData} heartSectionName={imageName==="Anterior"? "p6": "p12"}/>
          </div>
          {imageName === "Anterior"
          ? 
            <div className={style.anteriorAudioButtons}>
              <div className={style.anteriorAudioToppest}>
              <AudioPlayer2
              heartSectionName="p0"
              isAudioPresent = {`${lung_audio.p0_audio}`}
              audioUrl={`https://lung.thedelvierypointe.com${lung_audio.p0_audio}`}
              />
              </div>
             <div className={style.anteriorAudioTop}>
             <div className={style.anteriorAudioTopLeft}>
              <AudioPlayer2
              heartSectionName="p1"
              isAudioPresent = {`${lung_audio.p1_audio}`}
              audioUrl={`https://lung.thedelvierypointe.com${lung_audio.p1_audio}`}
              />
              </div>
              <div className={style.anteriorAudioTopRight}>
              <AudioPlayer2
              heartSectionName="p2"
              isAudioPresent = {`${lung_audio.p2_audio}`}
              audioUrl={`https://lung.thedelvierypointe.com${lung_audio.p2_audio}`}
              />
              </div>
             </div>
              <div className={style.anteriorAudioMid}>
              <div className={style.anteriorAudioMidLeft}>
              <AudioPlayer2
              heartSectionName="p3"
              isAudioPresent = {`${lung_audio.p3_audio}`}
              audioUrl={`https://lung.thedelvierypointe.com${lung_audio.p3_audio}`}
              />
              </div>
              <div className={style.anteriorAudioMidRight}>
              <AudioPlayer2
              heartSectionName="p4"
              isAudioPresent = {`${lung_audio.p4_audio}`}
              audioUrl={`https://lung.thedelvierypointe.com${lung_audio.p4_audio}`}
              />
              </div>
              </div>
              <div className={style.anteriorAudioBottom}>
              <div className={style.anteriorAudioBottomLeft}>
              <AudioPlayer2
              heartSectionName="p5"
              isAudioPresent = {`${lung_audio.p5_audio}`}
              audioUrl={`https://lung.thedelvierypointe.com${lung_audio.p5_audio}`}
              />
              </div>
              <div className={style.anteriorAudioBottomRight}>
              <AudioPlayer2
              heartSectionName="p6"
              isAudioPresent = {`${lung_audio.p6_audio}`}
              audioUrl={`https://lung.thedelvierypointe.com${lung_audio.p6_audio}`}
              />
              </div>
              </div>
            </div>
          :
            <div className={style.posteriorAudioButtons}>
            <div className={style.posteriorAudioTop}>
            <div className={style.posteriorAudioTopLeft}>
            <AudioPlayer2
            heartSectionName="p7"
            isAudioPresent = {`${lung_audio.p7_audio}`}
            audioUrl={`https://lung.thedelvierypointe.com${lung_audio.p7_audio}`}
            />
            </div>
            <div className={style.posteriorAudioTopRight}>
            <AudioPlayer2
            heartSectionName="p8"
            isAudioPresent = {`${lung_audio.p8_audio}`}
            audioUrl={`https://lung.thedelvierypointe.com${lung_audio.p8_audio}`}
            />
            </div>
            </div>
           <div className={style.posteriorAudioMid}>
           <div className={style.posteriorAudioMidLeft}>
            <AudioPlayer2
            heartSectionName="p9"
            isAudioPresent = {`${lung_audio.p9_audio}`}
            audioUrl={`https://lung.thedelvierypointe.com${lung_audio.p9_audio}`}
            />
            </div>
            <div className={style.posteriorAudioMidRight}>
            <AudioPlayer2
            heartSectionName="p10"
            isAudioPresent = {`${lung_audio.p10_audio}`}
            audioUrl={`https://lung.thedelvierypointe.com${lung_audio.p10_audio}`}
            />
            </div>
           </div>
           <div className={style.posteriorAudioBottom}>
           <div className={style.posteriorAudioBottomLeft}>
            <AudioPlayer2
            heartSectionName="p11"
            isAudioPresent = {`${lung_audio.p11_audio}`}
            audioUrl={`https://lung.thedelvierypointe.com${lung_audio.p11_audio}`}
            />
            </div>
            <div className={style.posteriorAudioBottomRight}>
            <AudioPlayer2
            heartSectionName="p12"
            isAudioPresent = {`${lung_audio.p12_audio}`}
            audioUrl={`https://lung.thedelvierypointe.com${lung_audio.p12_audio}`}
            />
            </div>
           </div>
          </div>  
          }
        
      
        </div>
    </div>
  )
}

export default InputPrimaryAudioTag2
import React, { useEffect, useState } from 'react'
import activeTags from './activeTags'
const HeartTags = ({heartSectionName,formData }) => {
  const [leftOrRight , setLeftOrRight] = useState("");

const tags = ["Coarse crackle" , "Fine crackle", "Ronchi", "Wheeze" , "Normal"  ]
const dict = {
  "p0":"p0_tag",
  "p1":"p1_tag",
  "p2":"p2_tag",
  "p3":"p3_tag",
  "p4":"p4_tag",
  "p5":"p5_tag",
  "p6":"p6_tag",
  "p7":"p7_tag",
  "p8":"p8_tag",
  "p9":"p9_tag",
  "p10":"p10_tag",
  "p11":"p11_tag",
  "p12":"p12_tag",
}
let heartTagsData=[];
let finalFormData
let tagData
 if(heartSectionName !== 'na'){
    heartTagsData = activeTags.filter((item)=> {
        return item.p === heartSectionName;
      })
    //   for (const [key, value] of Object.entries(dict)) {
    //     // console.log(`${key} = ${value}`)
    //     finalFormData =  formData.
    // }
    // finalFormData = dict.filter((item)=> dict[heartSectionName])
     console.log(`{${heartSectionName} + '_tag'}`,'bindass')
     const propertyName = `${heartSectionName}_tag`;
     tagData = formData[propertyName];
 }
//   console.log("heart tags data" , heartTagsData[0][tags[0]] , tags[0]);
  // const finalTags = [];

  // if(heartTagsData.length>0){
  //   for(let i = 0;i< tags.length; i++){
  //       console.log(heartTagsData[0]["p"] , heartTagsData[0][tags[i]]);
  //       if(heartTagsData[0][tags[i]] === true){
  //           finalTags.push(tags[i]);
  //       }
  //     }
  // }

let audio_tag
const modify = (value1)=> {
    console.log(value1,'inmodify')
    // const value = value1.replaceAll("\\", "");
    const value = value1
  const options = JSON.parse(value).options
  console.log(options,"options01")
let tagi = ""
audio_tag = options.map((option,index)=>{
  if (option.isChecked===true && option.id != 6)
  {
    tagi += option.position 
    tagi += (index < options.length - 1) ? ',': ''
    
     console.log(option,tagi)
  }
})
return tagi 
}
const tagValue = tagData ? modify(tagData) : ''
const finalTags = tagValue.split(',')

console.log("final tags" , finalTags,tagValue,tagData,formData,finalFormData,audio_tag);
function handleLeftAndRight(){
if(heartSectionName === 'p1' ||heartSectionName === 'p3' ||  heartSectionName === 'p7' || heartSectionName === 'p9'){
  setLeftOrRight("left");
}else if(heartSectionName === 'p2' ||heartSectionName === 'p4' || heartSectionName === 'p8' || heartSectionName === 'p10' ){
  setLeftOrRight("right");
}else if(heartSectionName === 'p5'  || heartSectionName === 'p11' ){
  setLeftOrRight("bottom-left")
}else if(heartSectionName === 'p6' || heartSectionName === 'p12'){
 setLeftOrRight('bottom-right')
}
}
useEffect(()=> {
handleLeftAndRight();
console.log("hello", heartSectionName, leftOrRight);
} , [leftOrRight])
  return (
    <div className={`flex flex-col w-32 gap-1 ${(leftOrRight && leftOrRight === 'left' || (heartSectionName === 'p5' || heartSectionName === 'p11')) ? "items-end" : "items-start"}`}>
    {finalTags.length>0 && finalTags.map((tag , index)=> {
     return(
            <p style={{fontSize: 8+'px'}} className={`bg-black/50 rounded-sm font-normal w-fit text-white px-3 text-xs 
            ${(index === 1 && leftOrRight === 'left') && "mr-2"}
            ${(index === 1 && leftOrRight === 'right') && "ml-2"}
            ${(index === 2 && leftOrRight === 'left') && "mr-4"}
            ${(index === 2 && leftOrRight === 'right') && "ml-4"}
            ${(index === 3 && leftOrRight === 'left') && "mr-6"}
            ${(index === 3 && leftOrRight === 'right') && "ml-6"}
            ${(index === 4 && leftOrRight === 'left') && 'mr-8'}
            ${(index === 4 && leftOrRight === 'right') && 'ml-8'}
            ${(index === 5 && leftOrRight === 'left') && 'mr-10'}
            ${(index === 5 && leftOrRight === 'right') && 'ml-10'}
            ${(index === 1 && leftOrRight === 'bottom-left') && 'mr-2'}
            ${(index === 2 && leftOrRight === 'bottom-left') && 'mr-3'}
            ${(index === 3 && leftOrRight === 'bottom-left') && 'mr-4'}
            ${(index === 4 && leftOrRight === 'bottom-left') && 'mr-5'}
            ${(index === 5 && leftOrRight === 'bottom-left') && 'mr-6'}
            ${(index === 1 && leftOrRight === 'bottom-right') && 'ml-2'}
            ${(index === 2 && leftOrRight === 'bottom-right') && 'ml-3'}
            ${(index === 3 && leftOrRight === 'bottom-right') && 'ml-4'}
            ${(index === 4 && leftOrRight === 'bottom-right') && 'ml-5'}
            ${(index === 5 && leftOrRight === 'bottom-right') && 'ml-6'}





            `}>
              {tag}
            </p>
     )
    })} 
     
   </div>
  )
}

export default HeartTags;
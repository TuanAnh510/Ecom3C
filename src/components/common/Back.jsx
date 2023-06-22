import React from "react"

const Back = ({ name, title, cover }) => {
  return (
    <>
      <div className='back'>
        <div className='containers pt-[40px]'>
          <span className="text-[24px] pt-[40px] text-white font-bold">{name}</span>
          <h1 className="text-[50px] text-white font-bold">{title}</h1>
        </div>
        <img src={cover} alt='' />
      </div>
    </>
  )
}

export default Back

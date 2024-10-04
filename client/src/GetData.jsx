import React from 'react'
import {useState} from 'react'

const GetData = () => {
    const [result,setResult] = useState([])

 const handleClick = ()=>{
    fetch("http://localhost:5000/cards").then(res=>res.json()).then(data=>console.log(setResult(data)))
 }

  return (
   <div className='dataContainer1'>
    <button onClick={handleClick}> Click Here To Get All Data</button>

   <div className='dataContainer'>
    {result.map((ele) => {
        return (
            <div key={ele._id}>
            <p>{ele.name}</p>
            <p>{ele.email}</p>
            <p>{ele.address}</p>
            <p>{ele.companyName}</p>
            </div>
        )
    }
   
    )}
   </div>

   </div>
  )
}

export default GetData;
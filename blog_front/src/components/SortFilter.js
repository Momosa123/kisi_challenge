import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom";

export default function Sorting() {
  const [sortOption, setSortOption] = useState('')
  let navigate = useNavigate()

  function handleChange(value){
    
    // setSortOption(value)
    
  }
//  useEffect(
//   ()=>{
//    sortOption !=="" && navigate(`/sort?option=${sortOption}`); 
//   },[sortOption]
//  )

console.log(sortOption)
  return (
    
    <div className="category-filter" >
      <select onChange={event => handleChange(event.target.value)} name="sorting" id="sort-select">
        <option value={sortOption}>--Sort by--</option>
     <option value="Newest">Newest</option>   
     <option value="Oldest">Oldest</option>
       
      </select>
    </div>
  );
}



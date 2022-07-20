import { useEffect, useState } from "react"
import rightArrow from "./right-arrow.png"
import bottomArrow from "./bottom-arrow.png"
import { useNavigate } from "react-router-dom";

export default function Sorting() {
  const [sortOption, setSortOption] = useState('')
  let navigate = useNavigate()

  function handleChange(value){
    
    setSortOption(value)
    
  }
 useEffect(
  ()=>{
    navigate(`/?sort=${sortOption}`); 
  },[sortOption]
 )
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



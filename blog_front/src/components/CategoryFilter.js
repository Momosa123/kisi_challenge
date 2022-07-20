import { useEffect, useState } from "react"
import rightArrow from "./right-arrow.png"
import bottomArrow from "./bottom-arrow.png"

export default function CategoryFilter({categories, setPosts, posts, setfilteredPosts, filteredPosts}) {
  const [displayCategories, setDisplayCategories] = useState('none')
   
  const [imageSource, setImageSource] = useState(rightArrow)

 
  const  [selectedCategories, setSelectedCategories] =useState([])
  
  const toggleCategory = (e) => {
    const selectedCategory = e.target.value
    const arrayFromSelectedCategory = [selectedCategory]
    console.log(selectedCategory)
    if(!selectedCategories.includes(selectedCategory)){
     
      setSelectedCategories(newCategories => [...newCategories,...arrayFromSelectedCategory])
      
    }
    
    else{
      setSelectedCategories(categories => categories.filter(
        category => category !== selectedCategory
      ))
    }

  };

  useEffect(
    ()=>{
      console.log('useeffect ran for filter')
      setfilteredPosts(posts.filter(post => selectedCategories.includes(post.category)))
    },[selectedCategories]
  )
  console.log(selectedCategories)
  const categoryElements = categories.map((category,i) => {
 
   return <div>
   <input key={i}  onChange={toggleCategory} name={category} type ='checkbox' value ={category} />
   <label  htmlFor={category}>{category}</label>
   </div>
    })

    function toggleCategoryFilter(){
      imageSource === rightArrow ? setImageSource(bottomArrow) :
      setImageSource(rightArrow)
       displayCategories === 'none' ? setDisplayCategories('flex') : 
       setDisplayCategories('none')
       
    }

  return (
    
    <div className="category-filter" >
      <div onClick={toggleCategoryFilter} className="category-title">
        <img className="fleche" src={imageSource} alt="" />
        <h5>Select Category</h5>
      </div>
      <div style={{display: `${displayCategories}`}} className="categories">
      {categoryElements}
      </div>
    </div>
  );
}



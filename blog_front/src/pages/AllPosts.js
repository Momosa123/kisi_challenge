import { useEffect, useState } from "react"
import CategoryFilter from "../components/CategoryFilter";
import SortFilter from "../components/SortFilter";
import ContactForm from "../components/Email";
import Post from "../components/PostPreview"

export default function AllPosts(){
 const [posts, setPosts] = useState([])
 const [filteredPosts, setfilteredPosts] = useState([])
 const [loading, setLoading] = useState(true);



 useEffect(
   ()=>{
     async function getPosts() {
  
       const res = await fetch("/api")
       const data = await res.json()
       console.log(data)
       setPosts(data.filter(post => post.mainImage != null))
       setfilteredPosts(data.filter(post => post.mainImage != null))
       setLoading(false);
   }
   getPosts()
   },[]
 )
//  const categories = [...new Set(posts.map((Val) => Val.category))];
const categories = ['tech', 'funding', 'FAANG', 'innovation']




// display posts based on the selected categories
 const postElements = filteredPosts.map(
   (post, i) => <Post
   key={i} 
   category = {post.category} 
   title = {post.title} 
   mainImage ={post.mainImage} 
   author={post.author} 
   body={post.body}  
   />
   )
 return (
  <>
    <div className="filter">
    <CategoryFilter setfilteredPosts={setfilteredPosts} filteredPosts={filteredPosts} categories={categories} setPosts={setPosts} posts={posts}/>
    <SortFilter/>
    </div>
    
    <div className="grid">
    
    
    { loading ? <h3>Loading...</h3> :
      
      postElements}
      
    </div>
    {!loading && <ContactForm/>}
   </>
 );
}
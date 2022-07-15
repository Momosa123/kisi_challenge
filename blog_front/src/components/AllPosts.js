import { useEffect, useState } from "react"
import Post from "./PostPreview"

export default function AllPosts(){
 const [posts, setPosts] = useState([])
 useEffect(
   ()=>{
     async function getPosts() {
       const res = await fetch("http://localhost:8000/")
       const data = await res.json()
       setPosts(data.filter(post => post.mainImage != null))
      console.log(posts)
   }
   getPosts()
   },[]
 )
 const postElements = posts.map(
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
   <div className="grid">
   {postElements}
   </div>
 );
}
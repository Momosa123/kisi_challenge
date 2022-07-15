import { useEffect, useState } from "react"
import Post from "./PostPreview"

export default function AllPosts(){
 const [posts, setPosts] = useState([])
 const [loading, setLoading] = useState(true);
 useEffect(
   ()=>{
     async function getPosts() {
      console.log('je suis là')
       const res = await fetch("/api")
       const data = await res.json()
       console.log(data)
       setPosts(data.filter(post => post.mainImage != null))
       setLoading(false);
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
   { loading ? <h3>Loading...</h3> :
    postElements}
   </div>
 );
}
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";

export default function PostPage(){
  const [post, setPost] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const {category, title} =  useParams()

  useEffect(
    ()=>{
      async function getPost() {
        try {const res = await fetch(`/${category}/${title}`)
        const data = await res.json()
        setPost(data)} catch(e){
          setError(true)
        }
        setLoading(false);
    }
    getPost()
    },[]
  )

  return(
    <div className="postPage">
       { loading ? (
        <h3>Loading...</h3>): error ?(
          <div>
          <Navigate replace to="/" />
          </div>
        ) :
        (
          <>
          <h2>{title}</h2>
        
            <h5><span className="article-detail">Author: </span>{post[0].author}</h5>
        
        
            <h5><span className="article-detail">Category: </span>{post[0].category}</h5>
    
          <img src={post[0].mainImage} alt="" />
          <p>{title}</p>
          <p>{post[0].body}</p>
          </>
      )
      }
    </div>
  )
}
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";

export default function PostPage(){
  const [post, setPost] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const {category, title} =  useParams()
  console.log(category, title)
  useEffect(
    ()=>{
      async function getPost() {
        try {const res = await fetch(`http://localhost:8000/${category}/${title}`)
        const data = await res.json()
        setPost(data)} catch(e){
          setError(true)
        }
        setLoading(false);
    }
    getPost()
    },[]
  )
  console.log(error)
  return(
    <div>
       { loading ? (
        <h3>Loading...</h3>): error ?(
          <div>
          <Navigate replace to="/" />
          </div>
        ) :
        (
          <>
          <h2>{title}</h2>
          <h3>{post[0].author}</h3>
          <h3>{post[0].category}</h3>
          <img src={post[0].mainImage} alt="" />
          <p>{post[0].body}</p>
          </>
      )
      }
    </div>
  )
}
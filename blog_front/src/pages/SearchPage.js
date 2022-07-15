import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';


export default function SearchPage(){


  const {search} = useLocation();
  console.log(search)
  const queryParams = useMemo(() => { 
    return new URLSearchParams(search);
  }, [search]);
  const articleToFind = queryParams.get('name')
  console.log(articleToFind);

  const [post, setPost] = useState([]);

  const [error, setError] = useState(false)

  const [loading, setLoading] = useState(true);

  useEffect(
    ()=>{ console.log('I will search the post')
      async function getPost() {
        
        try {const res = await fetch(`http://localhost:8000/${articleToFind}`)
        const data = await res.json()
        setPost(data)} catch(e){
          setError(true)
        }
        setLoading(false);
    }
    getPost()
    },[articleToFind]
  )

  console.log(post)
  return(
    <div className="postPage">
       { loading ? (
        <h3>Loading...</h3>): error ?(
          <div>
         
          </div>
        ) :
        (
          <>
          <h2>{post[0].title}</h2>
        
            <h5><span className="article-detail">Author: </span>{post[0].author}</h5>
        
        
            <h5><span className="article-detail">Category: </span>{post[0].category}</h5>
    
          <img src={post[0].mainImage} alt="" />
          <p>{post[0].title}</p>
          <p>{post[0].body}</p>
          </>
      )
      }
    </div>

      )

};



import {useState, useEffect} from 'react'
import Post from './components/post';
import './App.css';

 
function App() {
  const [posts, setPosts] = useState([])
  useEffect(
    ()=>{
      async function getPosts() {
        const res = await fetch("http://localhost:8000/")
        const data = await res.json()
        setPosts(data)
       console.log(posts)
    }
    getPosts()
    },[]
  )
  const postElements = posts.map(
    post => <Post 
    category = {post.category} 
    title = {post.title} 
    mainImage ={post.mainImage} 
    author={post.author} 
    body={post.body}  
    />
    )
  return (
    <div className="App">
    {postElements}
    </div>
  );
}

export default App;

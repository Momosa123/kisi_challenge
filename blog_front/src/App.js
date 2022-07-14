import {useState, useEffect} from 'react'
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

  return (
    <div className="App">
    <h1>Hello</h1>
    </div>
  );
}

export default App;

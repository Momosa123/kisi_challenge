import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Post from './components/Post';
import './App.css';
import AllPosts from "./components/AllPosts";
import PostPage from "./pages/PostPage";

 
function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/:category/:title" element={<PostPage />} />
        <Route path="/" element={<AllPosts />}/>
        
    </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

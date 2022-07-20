import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link, useNavigate } from "react-router-dom";


import AllPosts from "./pages/AllPosts";
import Header from "./components/Header";
import PostPage from "./pages/PostPage";
import SearchPage from "./pages/SearchPage";
import ArticleNotFound from "./pages/ArticleNotFound";
import SortingArticles from "./pages/SortingArticles";

 
function App() {
  
  return (
    <div className="App">
    <Header/>
      
      <Routes>
        <Route path="/:category/:title" element={<PostPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/:sort" element={<SortingArticles />} />
        <Route path="/article-not-found" element={<ArticleNotFound />} />
        
        <Route path="/" element={<AllPosts />}/>
        
    </Routes>
      
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import AllPosts from "./pages/AllPosts";
import Header from "./components/Header";
import PostPage from "./pages/PostPage";
import SearchPage from "./pages/SearchPage";
import ArticleNotFound from "./pages/ArticleNotFound";
import config from "./envConfig";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? config.production.baseUrl
    : config.development.baseUrl;
function App() {
  const [posts, setPosts] = useState([]);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path={`/:category/:title`}
          element={<PostPage posts={posts} setPosts={setPosts} />}
        />
        <Route
          path={`${baseUrl}/search`}
          element={<SearchPage posts={posts} setPosts={setPosts} />}
        />
        <Route path="/article-not-found" element={<ArticleNotFound />} />

        <Route
          path="/"
          element={<AllPosts posts={posts} setPosts={setPosts} />}
        />
      </Routes>
    </div>
  );
}

export default App;

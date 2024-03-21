import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import ArticleNotFound from "./ArticleNotFound";

export default function SearchPage({ posts }) {
  const { search } = useLocation();

  const queryParams = useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);
  const title = queryParams.get("name");

  const article = posts.find(post => post.title === title);

  return (
    <>
      {article ? (
        <div className="postPage">
          <h2>{article.title}</h2>

          <h5>
            <span className="article-detail">Author: </span>
            {article.author}
          </h5>

          <h5>
            <span className="article-detail">Category: </span>
            {article.category}
          </h5>

          <img src={article.mainImage} alt="" />

          <div className="body">{article.body}</div>
        </div>
      ) : (
        <ArticleNotFound />
      )}
    </>
  );
}
